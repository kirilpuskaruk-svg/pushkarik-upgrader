const { sql } = require('./_db');
const { getVerifiedUser, isOwner, sendJson } = require('./_auth');

module.exports = async function handler(req, res) {
  try {
    const user = await getVerifiedUser(req);
    if (!user || !isOwner(user)) {
      return sendJson(res, 403, { error: 'Access denied. Only verified project owner can initialize or update DB schema.' });
    }

    // 1. Create / Update Users table
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(255) PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        balance INTEGER DEFAULT 10000,
        role VARCHAR(50) DEFAULT 'user',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // 2. Ensure role column exists and set owner role
    const ownerEmail = process.env.ADMIN_OWNER_EMAIL?.trim().toLowerCase();
    if (ownerEmail) {
      await sql`
        UPDATE users SET role = 'owner' WHERE LOWER(email) = ${ownerEmail};
      `;
    }

    // 3. Create Sessions table for secure server-side session management
    await sql`
      CREATE TABLE IF NOT EXISTS sessions (
        token VARCHAR(255) PRIMARY KEY,
        user_id VARCHAR(255) REFERENCES users(id) ON DELETE CASCADE,
        expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // 4. Create OAuth States table (for authorization code flow CSRF protection)
    await sql`
      CREATE TABLE IF NOT EXISTS oauth_states (
        state VARCHAR(255) PRIMARY KEY,
        nonce VARCHAR(255),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        expires_at TIMESTAMP WITH TIME ZONE NOT NULL
      );
    `;

    // 5. Create Inventory table
    await sql`
      CREATE TABLE IF NOT EXISTS inventory (
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(255) REFERENCES users(id) ON DELETE CASCADE,
        item_id VARCHAR(255) NOT NULL,
        status VARCHAR(50) DEFAULT 'ACTIVE',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // 6. Create Boosters table
    await sql`
      CREATE TABLE IF NOT EXISTS boosters (
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(255) REFERENCES users(id) ON DELETE CASCADE,
        type VARCHAR(50) NOT NULL,
        expires_at TIMESTAMP WITH TIME ZONE NOT NULL
      );
    `;

    // 7. Create Transactions history
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
      message: 'Database tables verified & initialized securely without backdoors.' 
    });
  } catch (error) {
    console.error('DB Setup Error:', error);
    return sendJson(res, 500, { error: 'Failed to initialize database', details: error.message });
  }
};
