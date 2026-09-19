const { sql } = require('../../_db');
const { getBearerToken, sendJson } = require('../../_auth');

module.exports = async function handler(req, res) {
  const token = getBearerToken(req);
  if (token) {
    try {
      await sql`DELETE FROM sessions WHERE token = ${token}`;
    } catch (e) {
      console.error('Logout error:', e);
    }
  }

  // Clear cookie
  res.setHeader('Set-Cookie', 'pushkarik_session=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Lax');
  return sendJson(res, 200, { success: true, message: 'Logged out successfully' });
};
