const ITEM_CATALOG = require('../_catalog.json');
const { sql } = require('../_db');
const { getVerifiedUser, sendJson } = require('../_auth');
const crypto = require('crypto');

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

    const { sourceItemId, targetItemCatalogId, direction, idempotencyKey } = req.body;
    if (!sourceItemId || !targetItemCatalogId || !direction || !idempotencyKey) {
      return sendJson(res, 400, { error: 'Missing parameters' });
    }

    await ensureUserExists(googleId, email || googleId + '@guest.pushkarik');

    // 1. Check idempotency (prevent double upgrade)
    const idempotencyCheck = await sql`SELECT id FROM transactions WHERE idempotency_key = ${idempotencyKey}`;
    if (idempotencyCheck.rows.length > 0) {
      return sendJson(res, 409, { error: 'Transaction already processed' });
    }

    // 2. Find source item in DB (or register starter/catalog item if not yet synced)
    let sourceDbItem = await sql`SELECT id, item_id FROM inventory WHERE user_id = ${googleId} AND item_id = ${sourceItemId} AND status = 'ACTIVE' LIMIT 1 FOR UPDATE`;
    if (sourceDbItem.rows.length === 0) {
      const validItem = ITEM_CATALOG.find(i => i.id === sourceItemId);
      if (validItem) {
        const insertRes = await sql`INSERT INTO inventory (user_id, item_id, status) VALUES (${googleId}, ${sourceItemId}, 'ACTIVE') RETURNING id, item_id`;
        sourceDbItem = insertRes;
      } else {
        return sendJson(res, 400, { error: 'Source item not found in active inventory' });
      }
    }
    const sourceDbId = (sourceDbItem && sourceDbItem.rows && sourceDbItem.rows[0]) ? sourceDbItem.rows[0].id : 'src_' + Date.now();
    const sourceItemIdResolved = (sourceDbItem && sourceDbItem.rows && sourceDbItem.rows[0]) ? sourceDbItem.rows[0].item_id : sourceItemId;

    // 3. Find items in catalog to get prices
    const catalog = ITEM_CATALOG;
    const sourceItemCatalog = catalog.find(i => i.id === sourceItemIdResolved);
    const targetItemCatalog = catalog.find(i => i.id === targetItemCatalogId);
    if (!sourceItemCatalog || !targetItemCatalog) return sendJson(res, 400, { error: 'Invalid catalog items' });

    if (targetItemCatalog.price <= sourceItemCatalog.price) {
      return sendJson(res, 400, { error: 'Cannot downgrade' });
    }

    // 4. Calculate chance
    let pureChance = (sourceItemCatalog.price / targetItemCatalog.price) * 100;
    
    // Check boosters (LUCK, MEGA_LUCK)
    const boostersResult = await sql`SELECT type FROM boosters WHERE user_id = ${googleId} AND expires_at > CURRENT_TIMESTAMP`;
    const activeBoosters = boostersResult.rows.map(b => b.type);
    
    
    const clientBoosters = req.body.clientBoosters;
    if (Array.isArray(clientBoosters)) {
      if (clientBoosters.includes('booster_luck_25')) activeBoosters.push('MEGA_LUCK');
      else if (clientBoosters.includes('booster_luck_10')) activeBoosters.push('LUCK');
      if (clientBoosters.includes('booster_shield')) activeBoosters.push('SHIELD');
      if (clientBoosters.includes('booster_cashback')) activeBoosters.push('CASHBACK');
    }

    if (activeBoosters.includes('MEGA_LUCK')) pureChance += 25.0;
    else if (activeBoosters.includes('LUCK')) pureChance += 10.0;


    let finalChance = Math.min(Math.max(pureChance, 0.01), 95.00);

    // 5. Generate Secure RNG (0 to 100)
    let roll = crypto.randomInt(0, 10000) / 100; // 0.00 to 99.99

    // Check if user is verified admin with force_win enabled
    const { isAdmin } = require('../_auth');
    const userIsAdmin = await isAdmin(googleUser);
    let isForceWin = false;
    if (userIsAdmin) {
      const userDb = await sql`SELECT force_win FROM users WHERE id = ${googleId} LIMIT 1`;
      if (userDb.rows.length > 0 && userDb.rows[0].force_win) {
        isForceWin = true;
      }
    }
    
    let isWin = false;
    if (isForceWin) {
      isWin = true;
      roll = direction === 'under' ? Math.max(0, finalChance - 1.0) : Math.min(99.99, (100 - finalChance) + 1.0);
    } else if (direction === 'under') {
      isWin = roll <= finalChance;
    } else {
      isWin = roll >= (100 - finalChance);
    }

    // 6. Apply outcome
    if (isWin) {
      // Burn source, give target
      await sql`UPDATE inventory SET status = 'UPGRADED' WHERE id = ${sourceDbId}`;
      await sql`INSERT INTO inventory (user_id, item_id, status) VALUES (${googleId}, ${targetItemCatalogId}, 'ACTIVE')`;
      await sql`INSERT INTO transactions (user_id, action, result_item, idempotency_key) VALUES (${googleId}, 'UPGRADE_WIN', ${targetItemCatalogId}, ${idempotencyKey})`;
    } else {
      if (activeBoosters.includes('SHIELD')) {
        // Shield saves the item, just consume the transaction
        await sql`INSERT INTO transactions (user_id, action, result_item, idempotency_key) VALUES (${googleId}, 'UPGRADE_LOSS_SHIELDED', 'NONE', ${idempotencyKey})`;
        // Do not update inventory status
      } else {
        // Burn source
        await sql`UPDATE inventory SET status = 'UPGRADED' WHERE id = ${sourceDbId}`;
        
        let cashback = 0;
        if (activeBoosters.includes('CASHBACK')) {
          cashback = Math.floor(sourceItemCatalog.price * 100 * 0.2); // 20% in DP
          await sql`UPDATE users SET balance = balance + ${cashback} WHERE id = ${googleId}`;
        }
        await sql`INSERT INTO transactions (user_id, action, cost, result_item, idempotency_key) VALUES (${googleId}, 'UPGRADE_LOSS', ${cashback}, 'NONE', ${idempotencyKey})`;
      }
    }

    return sendJson(res, 200, {
      isWin,
      roll,
      chance: finalChance,
      resultItem: isWin ? targetItemCatalogId : null,
      shieldUsed: !isWin && activeBoosters.includes('SHIELD')
    });

  } catch (error) {
    console.error('Upgrade Error:', error);
    return sendJson(res, 500, { error: 'Internal Server Error', details: error.message });
  }
};
