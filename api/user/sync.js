const { sql } = require('@vercel/postgres');
const { getVerifiedUser, sendJson } = require('./_auth');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST' && req.method !== 'GET') {
    return sendJson(res, 405, { error: 'Method not allowed' });
  }

  try {
    const googleUser = await getVerifiedUser(req);
    if (!googleUser) {
      return sendJson(res, 401, { error: 'Unauthorized' });
    }

    const { email, sub: googleId } = googleUser;

    // Check if user exists, if not create them (initial balance 10000 DP for testing, or 0)
    let userResult = await sql`SELECT * FROM users WHERE id = ${googleId}`;
    let user = userResult.rows[0];

    if (!user) {
      // First time login
      userResult = await sql`
        INSERT INTO users (id, email, balance) 
        VALUES (${googleId}, ${email}, 10000) 
        RETURNING *;
      `;
      user = userResult.rows[0];
    }

    // Fetch active inventory
    const inventoryResult = await sql`
      SELECT id, item_id, status FROM inventory 
      WHERE user_id = ${googleId} AND (status = 'ACTIVE' OR status = 'VAULT')
      ORDER BY created_at DESC;
    `;

    // Fetch active boosters
    const boostersResult = await sql`
      SELECT id, type, expires_at FROM boosters 
      WHERE user_id = ${googleId} AND expires_at > CURRENT_TIMESTAMP;
    `;

    // Map data for frontend
    const inventory = inventoryResult.rows.filter(i => i.status === 'ACTIVE').map(i => ({ db_id: i.id, id: i.item_id }));
    const vault = inventoryResult.rows.filter(i => i.status === 'VAULT').map(i => ({ db_id: i.id, id: i.item_id }));
    const boosters = boostersResult.rows.map(b => ({
      id: b.id,
      type: b.type,
      endTime: new Date(b.expires_at).getTime()
    }));

    return sendJson(res, 200, {
      user: {
        id: user.id,
        email: user.email,
        balance: user.balance,
        role: user.role
      },
      inventory,
      vault,
      activeBoosters: boosters
    });

  } catch (error) {
    console.error('Sync Error:', error);
    return sendJson(res, 500, { error: 'Internal Server Error', details: error.message });
  }
};
