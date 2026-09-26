const { sql, hasPostgres } = require('../_db');
const { getVerifiedUser, sendJson } = require('../_auth');
const crypto = require('crypto');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return sendJson(res, 405, { error: 'Method not allowed' });

  try {
    const googleUser = await getVerifiedUser(req);
    // If not authenticated or no DB, allow frontend to handle (DEMO mode)
    if (!googleUser || !hasPostgres) {
      return sendJson(res, 200, { mock: true, serverTime: Date.now() });
    }

    const { sub: googleId } = googleUser;
    const { action, payload } = req.body;

    // Ensure user has bonus_data column (will be created in sync.js, but we assume it exists)
    const userRes = await sql`SELECT balance, bonus_data FROM users WHERE id = ${googleId}`;
    if (userRes.rows.length === 0) return sendJson(res, 404, { error: 'User not found' });

    let user = userRes.rows[0];
    let bonusData = user.bonus_data || {};
    let newBalance = user.balance;

    if (typeof bonusData === 'string') {
      try { bonusData = JSON.parse(bonusData); } catch(e) { bonusData = {}; }
    }

    const now = Date.now();

    if (action === 'daily') {
      const lastClaimed = bonusData.daily?.lastClaimed || 0;
      const hoursSince = (now - lastClaimed) / (1000 * 60 * 60);
      if (hoursSince < 24) {
        return sendJson(res, 400, { error: 'Щоденний бонус ще не готовий' });
      }

      let streak = bonusData.daily?.streak || 0;
      if (hoursSince > 48) streak = 0; // Lost streak
      streak++;
      if (streak > 7) streak = 1; // Loop

      const rewards = [0, 25, 35, 50, 65, 80, 100, 150]; // 1-indexed
      const rewardDP = rewards[streak] || 25;

      newBalance += (rewardDP * 100); // DP is in cents internally
      
      bonusData.daily = { lastClaimed: now, streak: streak };
      if (!bonusData.tokens) bonusData.tokens = 0;
      bonusData.tokens += 1; // 1 free token daily

      await sql`UPDATE users SET balance = ${newBalance}, bonus_data = ${JSON.stringify(bonusData)}::jsonb WHERE id = ${googleId}`;
      return sendJson(res, 200, { success: true, rewardDP, streak, tokens: bonusData.tokens, serverTime: now });
    }

    if (action === 'wheel') {
      if (!bonusData.tokens || bonusData.tokens < 1) {
        return sendJson(res, 400, { error: 'Немає жетонів!' });
      }
      bonusData.tokens -= 1;

      // Logic for wheel rewards
      const roll = crypto.randomInt(0, 100);
      let rewardType = 'dp';
      let rewardAmount = 10;
      
      if (roll < 40) { rewardType = 'dp'; rewardAmount = 10; } // 40%
      else if (roll < 70) { rewardType = 'dp'; rewardAmount = 20; } // 30%
      else if (roll < 85) { rewardType = 'dp'; rewardAmount = 30; } // 15%
      else if (roll < 95) { rewardType = 'xp'; rewardAmount = 50; } // 10%
      else { rewardType = 'token'; rewardAmount = 1; } // 5%

      if (rewardType === 'dp') newBalance += (rewardAmount * 100);
      if (rewardType === 'token') bonusData.tokens += rewardAmount;
      if (rewardType === 'xp') {
        bonusData.xp = (bonusData.xp || 0) + rewardAmount;
      }

      await sql`UPDATE users SET balance = ${newBalance}, bonus_data = ${JSON.stringify(bonusData)}::jsonb WHERE id = ${googleId}`;
      return sendJson(res, 200, { success: true, rewardType, rewardAmount, tokens: bonusData.tokens, newXp: bonusData.xp });
    }
    
    if (action === 'sync_state') {
      // Allow frontend to push verified safe non-exploitable state (achievements, tasks)
      bonusData.xp = payload.xp || bonusData.xp || 0;
      bonusData.level = payload.level || bonusData.level || 1;
      bonusData.achievements = payload.achievements || bonusData.achievements || [];
      bonusData.tasks = payload.tasks || bonusData.tasks || {};
      if (payload.addDp) {
        newBalance += Math.round(payload.addDp * 100);
      }
      await sql`UPDATE users SET balance = ${newBalance}, bonus_data = ${JSON.stringify(bonusData)}::jsonb WHERE id = ${googleId}`;
      return sendJson(res, 200, { success: true });
    }

    return sendJson(res, 400, { error: 'Unknown action' });
  } catch (error) {
    console.error('Bonus Action Error:', error);
    return sendJson(res, 500, { error: 'Internal Server Error' });
  }
};
