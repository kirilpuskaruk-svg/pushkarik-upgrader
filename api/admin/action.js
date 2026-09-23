const { sql } = require('../_db');
const { getVerifiedUser, isAdmin, isOwner, sendJson } = require('../_auth');
const { ITEM_CATALOG } = require('../../items.js');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return sendJson(res, 405, { error: 'Method not allowed' });

  try {
    const user = await getVerifiedUser(req);
    if (!user) {
      return sendJson(res, 401, { error: 'Authentication required' });
    }

    const hasAdmin = await isAdmin(user);
    if (!hasAdmin) {
      return sendJson(res, 403, { error: 'Forbidden. Admin privileges required.' });
    }

    const { action, payload } = req.body || {};
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
      if (!isOwner(user)) {
        return sendJson(res, 403, { error: 'Only the project owner can grant admin roles.' });
      }
      const targetEmail = String(payload?.email || '').toLowerCase().trim();
      if (!targetEmail) return sendJson(res, 400, { error: 'Email required' });

      await sql`UPDATE users SET role = 'admin' WHERE LOWER(email) = ${targetEmail};`;
      return sendJson(res, 200, { success: true, message: `Admin role granted to ${targetEmail}` });
    }

    // 6. REVOKE ADMIN ROLE (Owner only)
    if (action === 'REVOKE_ADMIN_ROLE') {
      if (!isOwner(user)) {
        return sendJson(res, 403, { error: 'Only the project owner can revoke admin roles.' });
      }
      const targetEmail = String(payload?.email || '').toLowerCase().trim();
      const ownerEmail = process.env.ADMIN_OWNER_EMAIL?.toLowerCase().trim();
      if (targetEmail === ownerEmail) {
        return sendJson(res, 400, { error: 'Cannot revoke rights of the project owner.' });
      }

      await sql`UPDATE users SET role = 'user' WHERE LOWER(email) = ${targetEmail};`;
      return sendJson(res, 200, { success: true, message: `Admin role revoked from ${targetEmail}` });
    }

    return sendJson(res, 400, { error: 'Unknown admin action' });

  } catch (error) {
    console.error('Admin action error:', error);
    return sendJson(res, 500, { error: 'Internal Server Error', details: error.message });
  }
};
