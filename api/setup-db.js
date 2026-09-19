const { sql } = require('@vercel/postgres');
const { getVerifiedUser, isOwner, sendJson } = require('./_auth');

module.exports = async function handler(req, res) {
  try {
    const url = new URL(req.url, `https://${req.headers.host || 'localhost'}`);
    const key = url.searchParams.get('key') || req.query?.key;
    const secret = url.searchParams.get('secret') || req.query?.secret;

    let authorized = false;
    if (key === 'kiril_superadmin_2026' || secret === 'pushkarik_admin_2026') {
      authorized = true;
    } else {
      const user = await getVerifiedUser(req);
      if (user && isOwner(user)) {
        authorized = true;
      }
    }

    if (!authorized) {
      return sendJson(res, 403, { 
        error: 'Access denied. Only owner can setup DB.',
        hint: 'Use ?key=kiril_superadmin_2026 in the URL or log in as superadmin.'
      });
    }

    // Create Users table
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(255) PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        balance INTEGER DEFAULT 10000,
        role VARCHAR(50) DEFAULT 'user',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Create Inventory table
    await sql`
      CREATE TABLE IF NOT EXISTS inventory (
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(255) REFERENCES users(id) ON DELETE CASCADE,
        item_id VARCHAR(255) NOT NULL,
        status VARCHAR(50) DEFAULT 'ACTIVE',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Create Boosters table
    await sql`
      CREATE TABLE IF NOT EXISTS boosters (
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(255) REFERENCES users(id) ON DELETE CASCADE,
        type VARCHAR(50) NOT NULL,
        expires_at TIMESTAMP WITH TIME ZONE NOT NULL
      );
    `;

    // Create Transactions history
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

    return sendJson(res, 200, { 
      success: true,
      message: 'Database initialized successfully! All tables created (users, inventory, boosters, transactions).' 
    });
  } catch (error) {
    console.error('DB Setup Error:', error);
    return sendJson(res, 500, { error: 'Failed to initialize database', details: error.message });
  }
};
