const { sql, hasPostgres } = require('../_db');
const { getVerifiedUser, sendJson } = require('../_auth');

// Authoritative Booster Catalog Specification
const BOOSTER_CONFIG = {
  booster_luck_10: {
    type: 'LUCK',
    title: '🍀 Фартовий Бустер +10%',
    icon: '🍀',
    priceCents: 5000, // 50.00 DP
    durationMs: 15 * 60 * 1000
  },
  booster_luck_25: {
    type: 'MEGA_LUCK',
    title: '👑 Мега-Удача +25%',
    icon: '👑',
    priceCents: 15000, // 150.00 DP
    durationMs: 10 * 60 * 1000
  },
  booster_shield: {
    type: 'SHIELD',
    title: '🛡️ Щит Спасіння Скіна',
    icon: '🛡️',
    priceCents: 10000, // 100.00 DP
    durationMs: 20 * 60 * 1000
  },
  booster_cashback: {
    type: 'CASHBACK',
    title: '💎 Подвійний Кешбек 20%',
    icon: '💎',
    priceCents: 7500, // 75.00 DP
    durationMs: 30 * 60 * 1000
  },
  booster_turbo: {
    type: 'TURBO',
    title: '⚡ Turbo Upgrade',
    icon: '⚡',
    priceCents: 5000, // 50.00 DP
    durationMs: 30 * 60 * 1000
  }
};

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
  } catch (e) {}
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return sendJson(res, 405, { error: 'Method not allowed' });

  try {
    const googleUser = await getVerifiedUser(req);
    if (!googleUser) return sendJson(res, 401, { error: 'Unauthorized' });
    const { sub: googleId, email } = googleUser;

    const { boosterId, type, idempotencyKey } = req.body || {};
    const key = boosterId || type;
    const config = BOOSTER_CONFIG[key] || Object.values(BOOSTER_CONFIG).find(b => b.type === key);

    if (!config || !idempotencyKey) {
      return sendJson(res, 400, { error: 'Invalid booster ID or missing idempotencyKey' });
    }

    if (!hasPostgres) {
      // Safe demo mock response
      return sendJson(res, 200, {
        success: true,
        mock: true,
        booster: {
          id: key,
          type: config.type,
          title: config.title,
          icon: config.icon,
          expiresAt: Date.now() + config.durationMs
        }
      });
    }

    await ensureUserExists(googleId, email || googleId + '@guest.pushkarik');

    // 1. Idempotency Check
    const idempotencyCheck = await sql`SELECT id FROM transactions WHERE idempotency_key = ${idempotencyKey} LIMIT 1`;
    if (idempotencyCheck.rows.length > 0) {
      return sendJson(res, 409, { error: 'Transaction already processed' });
    }

    // 2. Atomic Balance Deduction (prevents race conditions)
    const updateRes = await sql`
      UPDATE users 
      SET balance = balance - ${config.priceCents} 
      WHERE id = ${googleId} AND balance >= ${config.priceCents} 
      RETURNING balance;
    `;

    if (updateRes.rows.length === 0) {
      return sendJson(res, 400, { error: 'Недостатньо DP на балансі' });
    }

    const newBalanceCents = updateRes.rows[0].balance;
    const expiresAt = new Date(Date.now() + config.durationMs);

    // 3. Record Booster in DB
    const boosterResult = await sql`
      INSERT INTO boosters (user_id, type, expires_at) 
      VALUES (${googleId}, ${config.type}, ${expiresAt.toISOString()})
      RETURNING id, type, expires_at;
    `;

    // 4. Record Transaction
    await sql`
      INSERT INTO transactions (user_id, action, cost, idempotency_key) 
      VALUES (${googleId}, 'BUY_BOOSTER_' || ${config.type}, ${-config.priceCents}, ${idempotencyKey});
    `;

    return sendJson(res, 200, {
      success: true,
      newBalance: newBalanceCents / 100,
      booster: {
        id: key,
        type: config.type,
        title: config.title,
        icon: config.icon,
        expiresAt: expiresAt.getTime()
      }
    });

  } catch (error) {
    console.error('Booster Purchase Error:', error);
    return sendJson(res, 500, { error: 'Internal Server Error', details: error.message });
  }
};
