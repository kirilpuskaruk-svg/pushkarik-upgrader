const { sql } = require('../_db');
const { getVerifiedUser, sendJson } = require('../_auth');
const crypto = require('crypto');
const items = require('../../items.js'); // Assuming items.js exports ITEM_CATALOG

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return sendJson(res, 405, { error: 'Method not allowed' });

  try {
    const googleUser = await getVerifiedUser(req);
    if (!googleUser) return sendJson(res, 401, { error: 'Unauthorized' });
    const { sub: googleId } = googleUser;

    const { sourceItemId, targetItemCatalogId, direction, idempotencyKey } = req.body;
    if (!sourceItemId || !targetItemCatalogId || !direction || !idempotencyKey) {
      return sendJson(res, 400, { error: 'Missing parameters' });
    }

    // 1. Check idempotency (prevent double upgrade)
    const idempotencyCheck = await sql`SELECT id FROM transactions WHERE idempotency_key = ${idempotencyKey}`;
    if (idempotencyCheck.rows.length > 0) {
      return sendJson(res, 409, { error: 'Transaction already processed' });
    }

    // 2. Find source item in DB
    const sourceDbItem = await sql`SELECT id, item_id FROM inventory WHERE user_id = ${googleId} AND item_id = ${sourceItemId} AND status = 'ACTIVE' LIMIT 1 FOR UPDATE`;
    if (sourceDbItem.rows.length === 0) {
      return sendJson(res, 400, { error: 'Source item not found in active inventory' });
    }
    const sourceDbId = sourceDbItem.rows[0].id;

    // 3. Find items in catalog to get prices
    const catalog = items.ITEM_CATALOG;
    const sourceItemCatalog = catalog.find(i => i.id === sourceDbItem.rows[0].item_id);
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
    
    if (activeBoosters.includes('MEGA_LUCK')) pureChance *= 1.25;
    else if (activeBoosters.includes('LUCK')) pureChance *= 1.10;

    let finalChance = Math.min(Math.max(pureChance, 0.01), 95.00);

    // 5. Generate Secure RNG (0 to 100)
    const roll = crypto.randomInt(0, 10000) / 100; // 0.00 to 99.99
    
    let isWin = false;
    if (direction === 'under') isWin = roll <= finalChance;
    else isWin = roll >= (100 - finalChance);

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
    return sendJson(res, 500, { error: 'Internal Server Error' });
  }
};
