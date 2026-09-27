const ITEM_CATALOG = require('../_catalog.json');
const { sql, hasPostgres } = require('../_db');
const { getVerifiedUser, sendJson, isAdmin } = require('../_auth');
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
  } catch (e) {}
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return sendJson(res, 405, { error: 'Method not allowed' });

  try {
    const googleUser = await getVerifiedUser(req);
    if (!googleUser) return sendJson(res, 401, { error: 'Unauthorized' });
    const { sub: googleId, email } = googleUser;

    const { sourceItemId, targetItemCatalogId, direction, idempotencyKey } = req.body || {};
    if (!sourceItemId || !targetItemCatalogId || !direction || !idempotencyKey) {
      return sendJson(res, 400, { error: 'Missing required parameters' });
    }

    if (direction !== 'under' && direction !== 'over') {
      return sendJson(res, 400, { error: 'Invalid roll direction' });
    }

    // 1. Verify Catalog Items and Calculate Authoritative Chance
    const sourceItemCatalog = ITEM_CATALOG.find(i => i.id === sourceItemId);
    const targetItemCatalog = ITEM_CATALOG.find(i => i.id === targetItemCatalogId);
    if (!sourceItemCatalog || !targetItemCatalog) {
      return sendJson(res, 400, { error: 'Invalid catalog items' });
    }

    if (targetItemCatalog.price <= sourceItemCatalog.price) {
      return sendJson(res, 400, { error: 'Cannot upgrade to cheaper or equal item' });
    }

    let pureChance = (sourceItemCatalog.price / targetItemCatalog.price) * 100;

    let activeBoosters = [];
    let sourceDbId = 'src_' + Date.now();

    if (hasPostgres) {
      await ensureUserExists(googleId, email || googleId + '@guest.pushkarik');

      // 2. Check Idempotency (prevent duplicate or replayed upgrade requests)
      const idempotencyCheck = await sql`SELECT id FROM transactions WHERE idempotency_key = ${idempotencyKey} LIMIT 1`;
      if (idempotencyCheck.rows.length > 0) {
        return sendJson(res, 409, { error: 'Transaction already processed' });
      }

      // 3. Authoritatively Query Active Boosters from Database (NEVER trust clientBoosters body)
      const boostersResult = await sql`
        SELECT type FROM boosters 
        WHERE user_id = ${googleId} AND expires_at > CURRENT_TIMESTAMP
      `;
      activeBoosters = boostersResult.rows.map(b => b.type);

      // 4. Verify Source Item Ownership in Database
      let sourceDbItem = await sql`
        SELECT id, item_id FROM inventory 
        WHERE user_id = ${googleId} AND item_id = ${sourceItemId} AND status = 'ACTIVE' 
        LIMIT 1 FOR UPDATE
      `;
      if (sourceDbItem.rows.length === 0) {
        // Auto register starter item if player just began
        const insertRes = await sql`
          INSERT INTO inventory (user_id, item_id, status) 
          VALUES (${googleId}, ${sourceItemId}, 'ACTIVE') 
          RETURNING id, item_id
        `;
        sourceDbId = insertRes.rows[0].id;
      } else {
        sourceDbId = sourceDbItem.rows[0].id;
      }
    }

    // 5. Apply Active Boosters to Chance
    if (activeBoosters.includes('MEGA_LUCK')) pureChance += 25.0;
    else if (activeBoosters.includes('LUCK')) pureChance += 10.0;

    const finalChance = Math.min(Math.max(pureChance, 0.01), 95.00);

    // 6. Cryptographically Secure Server-side RNG (0.00 to 99.99)
    let roll = crypto.randomInt(0, 10000) / 100;

    // Check if verified project admin has force_win enabled
    let isForceWin = false;
    const userIsAdmin = await isAdmin(googleUser);
    if (userIsAdmin && hasPostgres) {
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

    // 7. Atomic Outcome Execution in Database
    let cashbackGranted = 0;
    let shieldUsed = false;

    if (hasPostgres) {
      if (isWin) {
        await sql`UPDATE inventory SET status = 'UPGRADED' WHERE id = ${sourceDbId}`;
        await sql`INSERT INTO inventory (user_id, item_id, status) VALUES (${googleId}, ${targetItemCatalogId}, 'ACTIVE')`;
        await sql`INSERT INTO transactions (user_id, action, result_item, idempotency_key) VALUES (${googleId}, 'UPGRADE_WIN', ${targetItemCatalogId}, ${idempotencyKey})`;
      } else {
        if (activeBoosters.includes('SHIELD')) {
          shieldUsed = true;
          await sql`INSERT INTO transactions (user_id, action, result_item, idempotency_key) VALUES (${googleId}, 'UPGRADE_LOSS_SHIELDED', 'NONE', ${idempotencyKey})`;
        } else {
          await sql`UPDATE inventory SET status = 'UPGRADED' WHERE id = ${sourceDbId}`;
          if (activeBoosters.includes('CASHBACK')) {
            cashbackGranted = Math.floor(sourceItemCatalog.price * 100 * 0.20); // 20% in cents
            await sql`UPDATE users SET balance = balance + ${cashbackGranted} WHERE id = ${googleId}`;
          }
          await sql`INSERT INTO transactions (user_id, action, cost, result_item, idempotency_key) VALUES (${googleId}, 'UPGRADE_LOSS', ${cashbackGranted}, 'NONE', ${idempotencyKey})`;
        }
      }
    } else {
      shieldUsed = !isWin && activeBoosters.includes('SHIELD');
    }

    return sendJson(res, 200, {
      success: true,
      isWin,
      roll,
      chance: finalChance,
      resultItem: isWin ? targetItemCatalogId : null,
      shieldUsed,
      cashbackGranted: cashbackGranted / 100
    });

  } catch (error) {
    console.error('Authoritative Upgrade Error:', error);
    return sendJson(res, 500, { error: 'Internal Server Error', details: error.message });
  }
};
