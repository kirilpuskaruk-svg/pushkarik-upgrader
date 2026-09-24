const ITEM_CATALOG = require('../_catalog.json');
const { sql } = require('../_db');
const { getVerifiedUser, sendJson } = require('../_auth');
const crypto = require('crypto');

// Ensure user exists in DB (upsert), required before any inventory operation
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
    const { idempotencyKey } = req.body;
    
    if (!idempotencyKey) return sendJson(res, 400, { error: 'Missing idempotencyKey' });

    // Ensure user record exists (handles guest tokens too)
    await ensureUserExists(googleId, email || googleId + '@guest.pushkarik');

    const idempotencyCheck = await sql`SELECT id FROM transactions WHERE idempotency_key = ${idempotencyKey}`;
    if (idempotencyCheck.rows.length > 0) return sendJson(res, 409, { error: 'Transaction already processed' });

    const catalog = ITEM_CATALOG;
    const budgetSkins = catalog.filter(i => i.rarity === 'common');
    const otherSkins = catalog.filter(i => i.rarity !== 'common' && i.rarity !== 'mythic' && i.rarity !== 'ancient');

    const roll = crypto.randomInt(0, 100);
    let selectedTemplate;
    
    if (roll < 85 && budgetSkins.length > 0) {
      selectedTemplate = budgetSkins[crypto.randomInt(0, budgetSkins.length)];
    } else if (otherSkins.length > 0) {
      selectedTemplate = otherSkins[crypto.randomInt(0, otherSkins.length)];
    } else if (catalog.length > 0) {
      selectedTemplate = catalog[crypto.randomInt(0, catalog.length)];
    }

    if (!selectedTemplate) {
      return sendJson(res, 500, { error: 'Catalog is empty, cannot claim bonus' });
    }

    const bonusAmount = 5000; // 50.00 DP in cents

    // DB Updates
    const newItemResult = await sql`INSERT INTO inventory (user_id, item_id, status) VALUES (${googleId}, ${selectedTemplate.id}, 'ACTIVE') RETURNING id, item_id`;
    await sql`UPDATE users SET balance = balance + ${bonusAmount} WHERE id = ${googleId}`;
    await sql`INSERT INTO transactions (user_id, action, cost, result_item, idempotency_key) VALUES (${googleId}, 'CLAIM_BONUS', ${bonusAmount}, ${selectedTemplate.id}, ${idempotencyKey})`;

    const dbItem = newItemResult.rows[0];

    return sendJson(res, 200, {
      item: { db_id: dbItem.id, id: dbItem.item_id },
      bonusAdded: 50.00
    });

  } catch (error) {
    console.error('Bonus Error:', error);
    return sendJson(res, 500, { error: 'Internal Server Error', details: error.message });
  }
};
