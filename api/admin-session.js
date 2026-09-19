const { getVerifiedUser, isOwner, readAdmins, sendJson } = require('./_auth');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return sendJson(res, 405, { error: 'Method not allowed' });
  const user = await getVerifiedUser({ ...req, headers: { ...req.headers, authorization: `Bearer ${req.body?.credential || ''}` } });
  if (!user) return sendJson(res, 401, { error: 'Google sign-in could not be verified' });
  try {
    const owner = isOwner(user);
    const admins = await readAdmins();
    return sendJson(res, 200, { isOwner: owner, isAdmin: owner || admins.includes(user.email) });
  } catch (error) {
    return sendJson(res, 503, { error: 'Admin access is not configured' });
  }
};
