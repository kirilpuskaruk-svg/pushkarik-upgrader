const ITEM_CATALOG = require('../_catalog.json');
const { sql } = require('../_db');
const { getVerifiedUser, sendJson } = require('../_auth');

async function ensureUserExists(googleId, email) {
  try {
    const existing = await sql`SELECT id FROM users WHERE id = ${googleId} LIMIT 1`;
    if (existing.rows.length === 0) {
      await sql`
        INSERT INTO users (id, email, balance, role)
        VALUES (${googleId}, ${email}, 10000, 'user')
        ON CONFLICT (id) DO NOTHING
      `;
    }
  } catch (e) {
    // Ignore if user already exists (race condition)
  }
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return sendJson(res, 405, { error: 'Method not allowed' });

  try {
    const googleUser = await getVerifiedUser(req);
    if (!googleUser) return sendJson(res, 401, { error: 'Unauthorized' });
    const { sub: googleId, email } = googleUser;

    const { itemDbId, idempotencyKey } = req.body;
    if (!itemDbId || !idempotencyKey) {
      return sendJson(res, 400, { error: 'Missing parameters' });
    }

    await ensureUserExists(googleId, email || googleId + '@guest.pushkarik');

    // 1. Idempotency
    const idempotencyCheck = await sql`SELECT id FROM transactions WHERE idempotency_key = ${idempotencyKey}`;
    if (idempotencyCheck.rows.length > 0) return sendJson(res, 409, { error: 'Transaction already processed' });

    // 2. Verify item
    const itemResult = await sql`SELECT id, item_id FROM inventory WHERE user_id = ${googleId} AND id = ${itemDbId} AND (status = 'ACTIVE' OR status = 'VAULT') FOR UPDATE`;
    if (itemResult.rows.length === 0) return sendJson(res, 400, { error: 'Item not found or already sold' });
    
    const dbItem = itemResult.rows[0];
    const catalogItem = ITEM_CATALOG.find(i => i.id === dbItem.item_id);
    if (!catalogItem) return sendJson(res, 400, { error: 'Invalid catalog item' });

    // 3. Update DB
    const sellPrice = Math.floor(catalogItem.price * 100); // in cents (DP)
    await sql`UPDATE inventory SET status = 'SOLD' WHERE id = ${dbItem.id}`;
    await sql`UPDATE users SET balance = balance + ${sellPrice} WHERE id = ${googleId}`;
    await sql`INSERT INTO transactions (user_id, action, cost, idempotency_key) VALUES (${googleId}, 'SELL_ITEM', ${sellPrice}, ${idempotencyKey})`;

    // 4. Return new balance
    const userResult = await sql`SELECT balance FROM users WHERE id = ${googleId}`;
    return sendJson(res, 200, { success: true, newBalance: userResult.rows[0].balance });

  } catch (error) {
    console.error('Sell Error:', error);
    return sendJson(res, 500, { error: 'Internal Server Error', details: error.message });
  }
};
