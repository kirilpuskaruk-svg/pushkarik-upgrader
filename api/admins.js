const { getVerifiedUser, isOwner, readAdmins, writeAdmins, sendJson } = require('./_auth');

module.exports = async function handler(req, res) {
  const user = await getVerifiedUser(req);
  if (!user) return sendJson(res, 401, { error: 'Sign in required' });
  if (!isOwner(user)) return sendJson(res, 403, { error: 'Only the owner can manage admins' });

  try {
    const admins = await readAdmins();
    if (req.method === 'GET') return sendJson(res, 200, { admins });

    if (req.method === 'POST') {
      const email = String(req.body?.email || '').trim().toLowerCase();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return sendJson(res, 400, { error: 'Valid email required' });
      await writeAdmins([...admins, email]);
      return sendJson(res, 200, { admins: await readAdmins() });
    }

    if (req.method === 'DELETE') {
      const email = String(req.query?.email || '').trim().toLowerCase();
      if (email === user.email) return sendJson(res, 400, { error: 'Owner cannot be removed' });
      await writeAdmins(admins.filter(admin => admin !== email));
      return sendJson(res, 200, { admins: await readAdmins() });
    }
    return sendJson(res, 405, { error: 'Method not allowed' });
  } catch (error) {
    return sendJson(res, 503, { error: 'Admin storage is not configured' });
  }
};
