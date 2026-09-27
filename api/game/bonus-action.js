const { sql, hasPostgres } = require('../_db');
const { getVerifiedUser, sendJson } = require('../_auth');
const crypto = require('crypto');

// Official Reward Schedules (Authoritative - Server Controlled)
const TASK_REWARDS = {
  login: { dpCents: 500, xp: 25 },     // 5.00 DP
  upgrades: { dpCents: 1500, xp: 50 }, // 15.00 DP
  cases: { dpCents: 1000, xp: 40 }     // 10.00 DP
};

const ACHIEVEMENT_REWARDS = {
  first_upg: { dpCents: 1000, xp: 50 },   // 10.00 DP
  ten_upg: { dpCents: 5000, xp: 150 },    // 50.00 DP
  fifty_upg: { dpCents: 25000, xp: 500 }, // 250.00 DP
  first_lvl: { dpCents: 2500, xp: 100 },  // 25.00 DP
  streak_7: { dpCents: 50000, xp: 300 }   // 500.00 DP
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
    const { action, payload, idempotencyKey } = req.body || {};

    if (!action) return sendJson(res, 400, { error: 'Missing action' });

    if (!hasPostgres) {
      // Safe demo mock response
      return sendJson(res, 200, { mock: true, serverTime: Date.now() });
    }

    await ensureUserExists(googleId, email || googleId + '@guest.pushkarik');

    const userRes = await sql`SELECT balance, bonus_data FROM users WHERE id = ${googleId} FOR UPDATE`;
    if (userRes.rows.length === 0) return sendJson(res, 404, { error: 'User not found' });

    let user = userRes.rows[0];
    let bonusData = user.bonus_data || {};
    if (typeof bonusData === 'string') {
      try { bonusData = JSON.parse(bonusData); } catch(e) { bonusData = {}; }
    }
    if (!bonusData.daily) bonusData.daily = { lastClaimed: 0, streak: 0 };
    if (!bonusData.tokens) bonusData.tokens = 0;
    if (!bonusData.achievements) bonusData.achievements = [];
    if (!bonusData.tasks) bonusData.tasks = { date: '', claimed: [] };
    if (!Array.isArray(bonusData.tasks.claimed)) bonusData.tasks.claimed = [];

    let currentBalance = user.balance;
    const now = Date.now();
    const todayStr = new Date().toISOString().split('T')[0];

    // Reset daily tasks date if needed
    if (bonusData.tasks.date !== todayStr) {
      bonusData.tasks = { date: todayStr, claimed: [], upgrades: 0, cases: 0 };
    }

    // 1. DAILY BONUS (24-hour cooldown, 7-day streak)
    if (action === 'daily') {
      const lastClaimed = bonusData.daily.lastClaimed || 0;
      const hoursSince = (now - lastClaimed) / (1000 * 60 * 60);
      if (hoursSince < 24) {
        return sendJson(res, 400, { error: 'Щоденний бонус ще не готовий' });
      }

      let streak = bonusData.daily.streak || 0;
      if (hoursSince > 48) streak = 0; // Streak broken
      streak++;
      if (streak > 7) streak = 1; // Cycle restart

      const rewardsDP = [0, 25, 35, 50, 65, 80, 100, 150];
      const rewardDP = rewardsDP[streak] || 25;
      const rewardCents = rewardDP * 100;

      currentBalance += rewardCents;
      bonusData.daily = { lastClaimed: now, streak };
      bonusData.tokens += 1; // 1 free bonus token

      await sql`
        UPDATE users 
        SET balance = ${currentBalance}, bonus_data = ${JSON.stringify(bonusData)}::jsonb 
        WHERE id = ${googleId};
      `;

      return sendJson(res, 200, {
        success: true,
        rewardDP,
        streak,
        tokens: bonusData.tokens,
        newBalance: currentBalance / 100,
        serverTime: now
      });
    }

    // 2. BONUS WHEEL (requires tokens >= 1, guaranteed reward)
    if (action === 'wheel') {
      if (bonusData.tokens < 1) {
        return sendJson(res, 400, { error: 'Немає жетонів для обертання колеса' });
      }
      bonusData.tokens -= 1;

      const roll = crypto.randomInt(0, 100);
      let rewardType = 'dp';
      let rewardAmount = 10;

      if (roll < 40) { rewardType = 'dp'; rewardAmount = 10; }
      else if (roll < 70) { rewardType = 'dp'; rewardAmount = 20; }
      else if (roll < 85) { rewardType = 'dp'; rewardAmount = 30; }
      else if (roll < 95) { rewardType = 'xp'; rewardAmount = 50; }
      else { rewardType = 'token'; rewardAmount = 1; }

      if (rewardType === 'dp') currentBalance += (rewardAmount * 100);
      if (rewardType === 'token') bonusData.tokens += rewardAmount;
      if (rewardType === 'xp') bonusData.xp = (bonusData.xp || 0) + rewardAmount;

      await sql`
        UPDATE users 
        SET balance = ${currentBalance}, bonus_data = ${JSON.stringify(bonusData)}::jsonb 
        WHERE id = ${googleId};
      `;

      return sendJson(res, 200, {
        success: true,
        rewardType,
        rewardAmount,
        tokens: bonusData.tokens,
        newXp: bonusData.xp,
        newBalance: currentBalance / 100
      });
    }

    // 3. CLAIM TASK (Authoritative Whitelist Verification)
    if (action === 'claim_task') {
      const taskId = payload?.taskId;
      const taskConfig = TASK_REWARDS[taskId];
      if (!taskConfig) return sendJson(res, 400, { error: 'Невідоме завдання' });

      if (bonusData.tasks.claimed.includes(taskId)) {
        return sendJson(res, 400, { error: 'Це завдання вже отримано сьогодні' });
      }

      bonusData.tasks.claimed.push(taskId);
      currentBalance += taskConfig.dpCents;
      bonusData.xp = (bonusData.xp || 0) + taskConfig.xp;

      await sql`
        UPDATE users 
        SET balance = ${currentBalance}, bonus_data = ${JSON.stringify(bonusData)}::jsonb 
        WHERE id = ${googleId};
      `;

      return sendJson(res, 200, {
        success: true,
        taskId,
        rewardDP: taskConfig.dpCents / 100,
        rewardXP: taskConfig.xp,
        newBalance: currentBalance / 100
      });
    }

    // 4. CLAIM ACHIEVEMENT (Authoritative Whitelist Verification)
    if (action === 'claim_achievement') {
      const achId = payload?.achievementId;
      const achConfig = ACHIEVEMENT_REWARDS[achId];
      if (!achConfig) return sendJson(res, 400, { error: 'Невідоме досягнення' });

      if (bonusData.achievements.includes(achId)) {
        return sendJson(res, 400, { error: 'Досягнення вже розблоковано' });
      }

      bonusData.achievements.push(achId);
      currentBalance += achConfig.dpCents;
      bonusData.xp = (bonusData.xp || 0) + achConfig.xp;

      await sql`
        UPDATE users 
        SET balance = ${currentBalance}, bonus_data = ${JSON.stringify(bonusData)}::jsonb 
        WHERE id = ${googleId};
      `;

      return sendJson(res, 200, {
        success: true,
        achievementId: achId,
        rewardDP: achConfig.dpCents / 100,
        rewardXP: achConfig.xp,
        newBalance: currentBalance / 100
      });
    }

    // 5. CLAIM MYSTERY BONUS (6-hour cooldown)
    if (action === 'claim_mystery') {
      const lastMystery = bonusData.lastMystery || 0;
      if (now - lastMystery < 6 * 60 * 60 * 1000) {
        return sendJson(res, 400, { error: 'Mystery Bonus ще не готовий' });
      }

      bonusData.lastMystery = now;
      const roll = crypto.randomInt(0, 100);
      let rewardText = '';

      if (roll < 50) {
        currentBalance += 2500; // 25.00 DP
        rewardText = '+25 DP';
      } else if (roll < 80) {
        bonusData.xp = (bonusData.xp || 0) + 100;
        rewardText = '+100 XP';
      } else {
        // Insert 15m Luck booster
        const expiresAt = new Date(now + 15 * 60 * 1000);
        await sql`
          INSERT INTO boosters (user_id, type, expires_at) 
          VALUES (${googleId}, 'LUCK', ${expiresAt.toISOString()});
        `;
        rewardText = '🍀 Фартовий Бустер +10% (15хв)';
      }

      await sql`
        UPDATE users 
        SET balance = ${currentBalance}, bonus_data = ${JSON.stringify(bonusData)}::jsonb 
        WHERE id = ${googleId};
      `;

      return sendJson(res, 200, {
        success: true,
        rewardText,
        newBalance: currentBalance / 100
      });
    }

    // 6. SYNC NON-EXPLOITABLE UI STATE
    if (action === 'sync_state') {
      bonusData.xp = typeof payload.xp === 'number' ? payload.xp : bonusData.xp;
      bonusData.level = typeof payload.level === 'number' ? payload.level : bonusData.level;
      if (Array.isArray(payload.achievements)) {
        bonusData.achievements = [...new Set([...bonusData.achievements, ...payload.achievements.filter(a => ACHIEVEMENT_REWARDS[a])])];
      }
      await sql`
        UPDATE users 
        SET bonus_data = ${JSON.stringify(bonusData)}::jsonb 
        WHERE id = ${googleId};
      `;
      return sendJson(res, 200, { success: true });
    }

    return sendJson(res, 400, { error: 'Unknown action' });

  } catch (error) {
    console.error('Bonus Action Error:', error);
    return sendJson(res, 500, { error: 'Internal Server Error', details: error.message });
  }
};
