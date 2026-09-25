const ITEM_CATALOG = require('../_catalog.json');
const { sql, hasPostgres } = require('../_db');
const { getVerifiedUser, sendJson } = require('../_auth');
const crypto = require('crypto');

// Copy CASES_CATALOG definition for backend validation
const CASES_CATALOG = [
  { id: 'case_charms', containsType: 'charm', price: 350.00 },
  { id: 'case_stickers', containsType: 'sticker', price: 150.00 },
  { id: 'case_dreams', containsType: 'dreams', price: 450.00 },
  { id: 'case_grail', containsType: 'grail', price: 2500.00 }
];

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return sendJson(res, 405, { error: 'Method not allowed' });

  try {
    const user = await getVerifiedUser(req);
    if (!user) return sendJson(res, 401, { error: 'Unauthorized' });
    const { sub: googleId } = user;
    const { caseId } = req.body;

    const caseObj = CASES_CATALOG.find(c => c.id === caseId);
    if (!caseObj) return sendJson(res, 400, { error: 'Invalid case' });

    let balance = 10000; // Mock balance
    if (hasPostgres) {
      const userDb = await sqlSELECT balance FROM users WHERE id = \;
      if (userDb.rows.length > 0) balance = userDb.rows[0].balance / 100;
    }

    if (balance < caseObj.price && hasPostgres) {
      return sendJson(res, 400, { error: 'Not enough balance' });
    }

    if (hasPostgres) {
      const priceCents = Math.floor(caseObj.price * 100);
      await sqlUPDATE users SET balance = balance - \ WHERE id = \;
    }

    let dropPool = ITEM_CATALOG.filter(i => {
      if (caseObj.containsType === 'charm') return i.type === 'charm';
      if (caseObj.containsType === 'sticker') return i.type === 'sticker';
      if (caseObj.containsType === 'grail') return ['legendary', 'mythic', 'ancient'].includes(i.rarity);
      if (caseObj.containsType === 'dreams') return ['common', 'rare', 'epic'].includes(i.rarity);
      return true;
    });

    if (dropPool.length === 0) dropPool = ITEM_CATALOG.filter(i => i.rarity === 'common');

    // Secure server-side RNG
    const rand = crypto.randomInt(0, 10000) / 100;
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

    if (hasPostgres) {
      await sqlINSERT INTO inventory (user_id, item_id, status) VALUES (\, \, 'ACTIVE');
      await sqlINSERT INTO transactions (user_id, action, cost, result_item) VALUES (\, 'OPEN_CASE', \, \);
    }

    return sendJson(res, 200, { item: wonItem });
  } catch (error) {
    return sendJson(res, 500, { error: 'Internal Server Error' });
  }
};
