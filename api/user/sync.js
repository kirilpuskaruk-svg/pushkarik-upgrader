const { sql } = require('../_db');
const { getVerifiedUser, sendJson } = require('../_auth');

let tablesEnsured = false;
async function ensureTables() {
  if (tablesEnsured) return;
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id VARCHAR(255) PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      balance INTEGER DEFAULT 10000,
      role VARCHAR(50) DEFAULT 'user',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS inventory (
      id SERIAL PRIMARY KEY,
      user_id VARCHAR(255) REFERENCES users(id) ON DELETE CASCADE,
      item_id VARCHAR(255) NOT NULL,
      status VARCHAR(50) DEFAULT 'ACTIVE',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS boosters (
      id SERIAL PRIMARY KEY,
      user_id VARCHAR(255) REFERENCES users(id) ON DELETE CASCADE,
      type VARCHAR(50) NOT NULL,
      expires_at TIMESTAMP WITH TIME ZONE NOT NULL
    );
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS transactions (
      id SERIAL PRIMARY KEY,
      user_id VARCHAR(255) REFERENCES users(id) ON DELETE CASCADE,
      action VARCHAR(100) NOT NULL,
      cost INTEGER,
      result_item VARCHAR(255),
      idempotency_key VARCHAR(255) UNIQUE,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;
  tablesEnsured = true;
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST' && req.method !== 'GET') {
    return sendJson(res, 405, { error: 'Method not allowed' });
  }

  try {
    const googleUser = await getVerifiedUser(req);
    if (!googleUser) {
      return sendJson(res, 401, { error: 'Unauthorized. Please sign in with Google.' });
    }

    const { email, sub: googleId } = googleUser;

    await ensureTables();

    // Check if user exists, if not create them
    let userResult = await sql`SELECT * FROM users WHERE id = ${googleId}`;
    let user = userResult.rows[0];

    if (!user) {
      userResult = await sql`
        INSERT INTO users (id, email, balance) 
        VALUES (${googleId}, ${email}, 10000) 
        RETURNING *;
      `;
      user = userResult.rows[0];

      // Auto seed default starter item
      await sql`
        INSERT INTO inventory (user_id, item_id, status)
        VALUES (${googleId}, 'agent_1', 'ACTIVE');
      `;
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
