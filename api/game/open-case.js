const ITEM_CATALOG = require('../_catalog.json');
const { sql, hasPostgres } = require('../_db');
const { getVerifiedUser, sendJson } = require('../_auth');
const crypto = require('crypto');

// Authoritative Case Catalog Specification
const CASES_CATALOG = [
  { id: 'case_charms', containsType: 'charm', price: 350.00 },
  { id: 'case_stickers', containsType: 'sticker', price: 150.00 },
  { id: 'case_dreams', containsType: 'dreams', price: 450.00 },
  { id: 'case_grail', containsType: 'grail', price: 2500.00 }
];

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
    const user = await getVerifiedUser(req);
    if (!user) return sendJson(res, 401, { error: 'Unauthorized' });
    const { sub: googleId, email } = user;
    const { caseId, idempotencyKey } = req.body || {};

    const caseObj = CASES_CATALOG.find(c => c.id === caseId);
    if (!caseObj) return sendJson(res, 400, { error: 'Invalid case ID' });

    const priceCents = Math.floor(caseObj.price * 100);

    // 1. If running with Postgres, enforce strict idempotency and atomic balance check
    let newBalanceCents = 10000;
    if (hasPostgres) {
      await ensureUserExists(googleId, email || googleId + '@guest.pushkarik');

      if (idempotencyKey) {
        const idemp = await sql`SELECT id FROM transactions WHERE idempotency_key = ${idempotencyKey} LIMIT 1`;
        if (idemp.rows.length > 0) {
          return sendJson(res, 409, { error: 'Transaction already processed' });
        }
      }

      // ATOMIC BALANCE DEDUCTION
      const updateRes = await sql`
        UPDATE users 
        SET balance = balance - ${priceCents} 
        WHERE id = ${googleId} AND balance >= ${priceCents} 
        RETURNING balance;
      `;

      if (updateRes.rows.length === 0) {
        return sendJson(res, 400, { error: 'Недостатньо DP для відкриття кейсу' });
      }

      newBalanceCents = updateRes.rows[0].balance;
    }

    // 2. Authoritative Pool Selection
    let dropPool = ITEM_CATALOG.filter(i => {
      if (caseObj.containsType === 'charm') return i.type === 'charm';
      if (caseObj.containsType === 'sticker') return i.type === 'sticker';
      if (caseObj.containsType === 'grail') return ['legendary', 'mythic', 'ancient'].includes(i.rarity);
      if (caseObj.containsType === 'dreams') return ['common', 'rare', 'epic'].includes(i.rarity);
      return true;
    });

    if (dropPool.length === 0) dropPool = ITEM_CATALOG.filter(i => i.rarity === 'common');

    // 3. Cryptographically Secure Server-side RNG
    const rand = crypto.randomInt(0, 10000) / 100; // 0.00 to 99.99
    let targetRarity = 'common';
    if (rand > 70) targetRarity = 'rare';
    if (rand > 90) targetRarity = 'epic';
    if (rand > 98) targetRarity = 'legendary';
    if (rand > 99.5) targetRarity = 'mythic';

    let rarityPool = dropPool.filter(i => i.rarity === targetRarity);
    if (rarityPool.length === 0) rarityPool = dropPool;

    const wonItemTemplate = rarityPool[crypto.randomInt(0, rarityPool.length)];
    const wonItem = { 
      ...wonItemTemplate, 
      instanceId: 'inst_case_' + Date.now() + '_' + Math.random().toString(36).substring(7) 
    };

    // 4. Save to Database
    if (hasPostgres) {
      await sql`INSERT INTO inventory (user_id, item_id, status) VALUES (${googleId}, ${wonItem.id}, 'ACTIVE')`;
      const idempKey = idempotencyKey || ('case_' + Date.now() + '_' + Math.random().toString(36).substring(7));
      await sql`
        INSERT INTO transactions (user_id, action, cost, result_item, idempotency_key) 
        VALUES (${googleId}, 'OPEN_CASE', ${priceCents}, ${wonItem.id}, ${idempKey})
      `;
    }

    return sendJson(res, 200, {
      success: true,
      item: wonItem,
      newBalance: newBalanceCents / 100
    });

  } catch (error) {
    console.error('Open Case Error:', error);
    return sendJson(res, 500, { error: 'Internal Server Error', details: error.message });
  }
};
