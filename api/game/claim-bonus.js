const { sql } = require('@vercel/postgres');
const { getVerifiedUser, sendJson } = require('../_auth');
const crypto = require('crypto');
const items = require('../../items.js');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return sendJson(res, 405, { error: 'Method not allowed' });

  try {
    const googleUser = await getVerifiedUser(req);
    if (!googleUser) return sendJson(res, 401, { error: 'Unauthorized' });
    const { sub: googleId } = googleUser;
    const { idempotencyKey } = req.body;
    
    if (!idempotencyKey) return sendJson(res, 400, { error: 'Missing idempotencyKey' });

    const idempotencyCheck = await sql`SELECT id FROM transactions WHERE idempotency_key = ${idempotencyKey}`;
    if (idempotencyCheck.rows.length > 0) return sendJson(res, 409, { error: 'Transaction already processed' });

    // In a real app we would check cooldown here (e.g. once per 24 hours).
    // For now, we just grant it.

    const catalog = items.ITEM_CATALOG;
    const budgetSkins = catalog.filter(i => i.rarity === 'common');
    const otherSkins = catalog.filter(i => i.rarity !== 'common');

    const roll = crypto.randomInt(0, 100);
    let selectedTemplate;
    
    if (roll < 85) {
      selectedTemplate = budgetSkins[crypto.randomInt(0, budgetSkins.length)];
    } else {
      selectedTemplate = otherSkins[crypto.randomInt(0, otherSkins.length)];
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
    return sendJson(res, 500, { error: 'Internal Server Error' });
  }
};
