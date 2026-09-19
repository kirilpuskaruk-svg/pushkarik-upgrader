const { sql } = require('./_db');
const { getVerifiedUser, isOwner, readAdmins, writeAdmins, sendJson } = require('./_auth');

module.exports = async function handler(req, res) {
  const user = await getVerifiedUser(req);
  if (!user) return sendJson(res, 401, { error: 'Sign in required' });
  if (!isOwner(user)) return sendJson(res, 403, { error: 'Only the owner can manage admins' });

  try {
    const admins = await readAdmins();
    if (req.method === 'GET') {
      // Also fetch from DB users table with role 'admin'
      try {
        const dbAdmins = await sql`SELECT email FROM users WHERE role = 'admin' OR role = 'owner'`;
        const combined = [...new Set([...admins, ...dbAdmins.rows.map(r => r.email.toLowerCase())])];
        return sendJson(res, 200, { admins: combined });
      } catch (e) {
        return sendJson(res, 200, { admins });
      }
    }

    if (req.method === 'POST') {
      const email = String(req.body?.email || '').trim().toLowerCase();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return sendJson(res, 400, { error: 'Valid email required' });
      
      // Update KV
      try {
        await writeAdmins([...admins, email]);
      } catch (e) {}

      // Update DB role
      try {
        await sql`UPDATE users SET role = 'admin' WHERE LOWER(email) = ${email}`;
      } catch (e) {}

      return sendJson(res, 200, { success: true, email });
    }

    if (req.method === 'DELETE') {
      const email = String(req.query?.email || req.body?.email || '').trim().toLowerCase();
      const ownerEmail = process.env.ADMIN_OWNER_EMAIL?.toLowerCase().trim();
      if (email === user.email || email === ownerEmail) {
        return sendJson(res, 400, { error: 'Owner cannot be removed' });
      }

      // Update KV
      try {
        await writeAdmins(admins.filter(admin => admin !== email));
      } catch (e) {}

      // Update DB role
      try {
        await sql`UPDATE users SET role = 'user' WHERE LOWER(email) = ${email}`;
      } catch (e) {}

      return sendJson(res, 200, { success: true, removed: email });
    }

    return sendJson(res, 405, { error: 'Method not allowed' });
  } catch (error) {
    console.error('Admins API error:', error);
    return sendJson(res, 500, { error: 'Failed to manage admins', details: error.message });
  }
};
