const { getVerifiedUser, isOwner, isAdmin, sendJson } = require('./_auth');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST' && req.method !== 'GET') {
    return sendJson(res, 405, { error: 'Method not allowed' });
  }

  const user = await getVerifiedUser(req);
  if (!user) {
    return sendJson(res, 401, { isOwner: false, isAdmin: false, error: 'Sign in required' });
  }

  try {
    const owner = isOwner(user);
    const admin = await isAdmin(user);
    return sendJson(res, 200, {
      isOwner: owner,
      isAdmin: admin,
      email: user.email,
      role: user.role || (owner ? 'owner' : (admin ? 'admin' : 'user'))
    });
  } catch (error) {
    console.error('Admin session check error:', error);
    return sendJson(res, 500, { error: 'Admin check failed' });
  }
};
