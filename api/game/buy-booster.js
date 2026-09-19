const { sql } = require('../_db');
const { getVerifiedUser, sendJson } = require('../_auth');

const BOOSTER_PRICES = {
  LUCK: 5000,      // 50 DP
  MEGA_LUCK: 15000, // 150 DP
  SHIELD: 25000,   // 250 DP
  CASHBACK: 10000  // 100 DP
};

const BOOSTER_DURATION_MS = 15 * 60 * 1000; // 15 minutes

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return sendJson(res, 405, { error: 'Method not allowed' });

  try {
    const googleUser = await getVerifiedUser(req);
    if (!googleUser) return sendJson(res, 401, { error: 'Unauthorized' });
    const { sub: googleId } = googleUser;

    const { type, idempotencyKey } = req.body;
    if (!type || !idempotencyKey || !BOOSTER_PRICES[type]) {
      return sendJson(res, 400, { error: 'Invalid parameters or booster type' });
    }

    const idempotencyCheck = await sql`SELECT id FROM transactions WHERE idempotency_key = ${idempotencyKey}`;
    if (idempotencyCheck.rows.length > 0) return sendJson(res, 409, { error: 'Transaction already processed' });

    // Check balance
    const userResult = await sql`SELECT balance FROM users WHERE id = ${googleId} FOR UPDATE`;
    const user = userResult.rows[0];
    if (!user || user.balance < BOOSTER_PRICES[type]) {
      return sendJson(res, 400, { error: 'Insufficient balance' });
    }

    const expiresAt = new Date(Date.now() + BOOSTER_DURATION_MS);

    // Update DB
    await sql`UPDATE users SET balance = balance - ${BOOSTER_PRICES[type]} WHERE id = ${googleId}`;
    const boosterResult = await sql`
      INSERT INTO boosters (user_id, type, expires_at) 
      VALUES (${googleId}, ${type}, ${expiresAt.toISOString()})
      RETURNING id, type, expires_at
    `;
    await sql`INSERT INTO transactions (user_id, action, cost, idempotency_key) VALUES (${googleId}, 'BUY_BOOSTER_' || ${type}, ${-BOOSTER_PRICES[type]}, ${idempotencyKey})`;

    const newBooster = boosterResult.rows[0];

    return sendJson(res, 200, { 
      success: true,
      newBalance: user.balance - BOOSTER_PRICES[type],
      booster: {
        id: newBooster.id,
        type: newBooster.type,
        endTime: new Date(newBooster.expires_at).getTime()
      }
    });

  } catch (error) {
    console.error('Booster Error:', error);
    return sendJson(res, 500, { error: 'Internal Server Error' });
  }
};
