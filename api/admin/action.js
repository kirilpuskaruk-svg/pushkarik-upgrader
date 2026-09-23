const { sql } = require('../_db');
const { getVerifiedUser, isAdmin, isOwner, readAdmins, writeAdmins, sendJson } = require('../_auth');
const { ITEM_CATALOG } = require('../../items.js');

module.exports = async function handler(req, res) {
  try {
    const user = await getVerifiedUser(req);
    if (!user) {
      return sendJson(res, 401, { isOwner: false, isAdmin: false, error: 'Sign in required' });
    }

    const owner = isOwner(user);
    const hasAdmin = await isAdmin(user);

    // 0. ADMIN LIST MANAGEMENT (GET & DELETE for backwards-compatibility with /api/admins)
    if (req.method === 'GET') {
      const url = new URL(req.url, `https://${req.headers.host || 'localhost'}`);
      if (url.searchParams.get('check') === 'session') {
        let forceWin = false;
        if (hasAdmin && user.sub) {
          try {
            const dbRes = await sql`SELECT force_win FROM users WHERE id = ${user.sub} LIMIT 1`;
            if (dbRes.rows.length > 0) forceWin = Boolean(dbRes.rows[0].force_win);
          } catch (e) {}
        }
        return sendJson(res, 200, {
          isOwner: owner,
          isAdmin: hasAdmin,
          email: user.email,
          role: user.role || (owner ? 'owner' : (hasAdmin ? 'admin' : 'user')),
          forceWin
        });
      }

      if (!owner) {
        return sendJson(res, 403, { error: 'Only the project owner can view admin roster' });
      }
      const admins = await readAdmins();
      try {
        const dbAdmins = await sql`SELECT email FROM users WHERE role = 'admin' OR role = 'owner'`;
        const combined = [...new Set([...admins, ...dbAdmins.rows.map(r => r.email.toLowerCase())])];
        return sendJson(res, 200, { admins: combined });
      } catch (e) {
        return sendJson(res, 200, { admins });
      }
    }

    if (req.method === 'DELETE') {
      if (!owner) {
        return sendJson(res, 403, { error: 'Only the project owner can manage admins' });
      }
      const url = new URL(req.url, `https://${req.headers.host || 'localhost'}`);
      const email = String(url.searchParams.get('email') || req.body?.email || '').trim().toLowerCase();
      const ownerEmail = process.env.ADMIN_OWNER_EMAIL?.toLowerCase().trim();
      if (!email || email === user.email || email === ownerEmail) {
        return sendJson(res, 400, { error: 'Cannot remove owner or invalid email' });
      }

      const admins = await readAdmins();
      try {
        await writeAdmins(admins.filter(admin => admin !== email));
      } catch (e) {}

      try {
        await sql`UPDATE users SET role = 'user' WHERE LOWER(email) = ${email}`;
      } catch (e) {}

      return sendJson(res, 200, { success: true, removed: email });
    }

    if (req.method !== 'POST') {
      return sendJson(res, 405, { error: 'Method not allowed' });
    }

    // Check if this is an admin-session verification request
    const { action, payload } = req.body || {};
    if (action === 'CHECK_SESSION' || (!action && req.body && Object.keys(req.body).length === 0)) {
      let forceWin = false;
      if (hasAdmin && user.sub) {
        try {
          const dbRes = await sql`SELECT force_win FROM users WHERE id = ${user.sub} LIMIT 1`;
          if (dbRes.rows.length > 0) forceWin = Boolean(dbRes.rows[0].force_win);
        } catch (e) {}
      }
      return sendJson(res, 200, {
        isOwner: owner,
        isAdmin: hasAdmin,
        email: user.email,
        role: user.role || (owner ? 'owner' : (hasAdmin ? 'admin' : 'user')),
        forceWin
      });
    }

    // Direct admin check for actions
    if (!hasAdmin) {
      return sendJson(res, 403, { error: 'Forbidden. Admin privileges required.' });
    }

    // Support legacy POST to add admin if action is omitted but email is provided
    if (!action && req.body?.email) {
      if (!owner) {
        return sendJson(res, 403, { error: 'Only the owner can add admins' });
      }
      const email = String(req.body.email).trim().toLowerCase();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return sendJson(res, 400, { error: 'Valid email required' });
      
      const admins = await readAdmins();
      try { await writeAdmins([...admins, email]); } catch (e) {}
      try { await sql`UPDATE users SET role = 'admin' WHERE LOWER(email) = ${email}`; } catch (e) {}
      return sendJson(res, 200, { success: true, email });
    }

    if (!action) {
      return sendJson(res, 400, { error: 'Action is required' });
    }

    // 1. ADD BALANCE
    if (action === 'ADD_BALANCE') {
      const amount = parseInt(payload?.amount, 10);
      if (isNaN(amount) || amount <= 0 || amount > 100000000) {
        return sendJson(res, 400, { error: 'Invalid amount' });
      }
      const targetUserId = payload?.targetUserId || user.sub;
      await sql`
        UPDATE users SET balance = balance + ${amount} WHERE id = ${targetUserId};
      `;
      const updated = await sql`SELECT balance FROM users WHERE id = ${targetUserId}`;
      return sendJson(res, 200, { success: true, newBalance: updated.rows[0]?.balance });
    }

    // 2. SET INFINITE / FIXED BALANCE
    if (action === 'SET_BALANCE') {
      const balance = parseInt(payload?.balance, 10);
      if (isNaN(balance) || balance < 0) return sendJson(res, 400, { error: 'Invalid balance' });
      const targetUserId = payload?.targetUserId || user.sub;
      await sql`UPDATE users SET balance = ${balance} WHERE id = ${targetUserId};`;
      return sendJson(res, 200, { success: true, newBalance: balance });
    }

    // 2.1 TOGGLE FORCE WIN
    if (action === 'TOGGLE_FORCE_WIN') {
      const targetUserId = payload?.targetUserId || user.sub;
      const currentRes = await sql`SELECT force_win FROM users WHERE id = ${targetUserId} LIMIT 1`;
      const currentVal = currentRes.rows.length > 0 ? Boolean(currentRes.rows[0].force_win) : false;
      const newVal = payload?.forceWin !== undefined ? Boolean(payload.forceWin) : !currentVal;
      await sql`UPDATE users SET force_win = ${newVal} WHERE id = ${targetUserId};`;
      return sendJson(res, 200, { success: true, forceWin: newVal });
    }

    // 3. SPAWN SELECTED SKIN
    if (action === 'SPAWN_SKIN') {
      const itemId = payload?.itemId;
      const catalogItem = ITEM_CATALOG.find(i => i.id === itemId);
      if (!catalogItem) return sendJson(res, 400, { error: 'Item not found in catalog' });

      const targetUserId = payload?.targetUserId || user.sub;
      const insertRes = await sql`
        INSERT INTO inventory (user_id, item_id, status)
        VALUES (${targetUserId}, ${catalogItem.id}, 'ACTIVE')
        RETURNING id, item_id;
      `;
      return sendJson(res, 200, { 
        success: true, 
        spawnedItem: { db_id: insertRes.rows[0].id, id: insertRes.rows[0].item_id, name: catalogItem.name } 
      });
    }

    // 4. SPAWN GRAIL PACK (TOP 10 KNIVES & GLOVES)
    if (action === 'SPAWN_GRAIL_PACK') {
      const targetUserId = payload?.targetUserId || user.sub;
      const topSkins = [...ITEM_CATALOG].sort((a, b) => b.price - a.price).slice(0, 10);

      for (const item of topSkins) {
        await sql`
          INSERT INTO inventory (user_id, item_id, status)
          VALUES (${targetUserId}, ${item.id}, 'ACTIVE');
        `;
      }
      return sendJson(res, 200, { success: true, count: topSkins.length });
    }

    // 5. GRANT ADMIN ROLE (Owner only)
    if (action === 'GRANT_ADMIN_ROLE') {
      if (!owner) {
        return sendJson(res, 403, { error: 'Only the project owner can grant admin roles.' });
      }
      const targetEmail = String(payload?.email || '').toLowerCase().trim();
      if (!targetEmail) return sendJson(res, 400, { error: 'Email required' });

      const admins = await readAdmins();
      try { await writeAdmins([...admins, targetEmail]); } catch (e) {}
      await sql`UPDATE users SET role = 'admin' WHERE LOWER(email) = ${targetEmail};`;
      return sendJson(res, 200, { success: true, message: `Admin role granted to ${targetEmail}` });
    }

    // 6. REVOKE ADMIN ROLE (Owner only)
    if (action === 'REVOKE_ADMIN_ROLE') {
      if (!owner) {
        return sendJson(res, 403, { error: 'Only the project owner can revoke admin roles.' });
      }
      const targetEmail = String(payload?.email || '').toLowerCase().trim();
      const ownerEmail = process.env.ADMIN_OWNER_EMAIL?.toLowerCase().trim();
      if (targetEmail === ownerEmail) {
        return sendJson(res, 400, { error: 'Cannot revoke rights of the project owner.' });
      }

      const admins = await readAdmins();
      try { await writeAdmins(admins.filter(a => a !== targetEmail)); } catch (e) {}
      await sql`UPDATE users SET role = 'user' WHERE LOWER(email) = ${targetEmail};`;
      return sendJson(res, 200, { success: true, message: `Admin role revoked from ${targetEmail}` });
    }

    return sendJson(res, 400, { error: 'Unknown admin action' });

  } catch (error) {
    console.error('Admin action error:', error);
    return sendJson(res, 500, { error: 'Internal Server Error', details: error.message });
  }
};
