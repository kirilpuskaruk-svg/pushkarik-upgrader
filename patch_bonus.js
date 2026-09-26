const fs = require('fs');

let content = fs.readFileSync('bonus_system.js', 'utf8');

// Add streak variables to default bonusData
content = content.replace(/tasks: \{ date: this\.getTodayStr\(\), upgrades: 0, cases: 0 \}/, "tasks: { date: this.getTodayStr(), upgrades: 0, cases: 0 },\n        luckyStreak: 0");

// Add trackWin logic
const trackWinLogic = `
  trackWin(isWin) {
    if (!this.state.bonusData.luckyStreak) this.state.bonusData.luckyStreak = 0;
    
    if (isWin) {
      this.state.bonusData.luckyStreak++;
      const s = this.state.bonusData.luckyStreak;
      if (s === 3 || s === 5 || s === 10) {
        const rewardDP = s * 10;
        this.state.balance += rewardDP;
        showNotification(\`🔥 Lucky Streak \${s} WIN! Отримано +\${rewardDP} DP!\`, 'success');
      }
    } else {
      this.state.bonusData.luckyStreak = 0;
    }
    this.save();
    if (this.state.activeTab === 'bonus') this.render();
  }
`;
content = content.replace(/async checkAchievements\(\) \{/, trackWinLogic + "\n  async checkAchievements() {");

// Add claimMysteryBonus logic
const mysteryBonusLogic = `
  async claimMysteryBonus() {
    if (window.isClaimingMystery) return;
    
    const now = Date.now();
    const lastMystery = this.state.bonusData.lastMystery || 0;
    if (now - lastMystery < 6 * 60 * 60 * 1000) { // 6 hours
      showNotification('🎁 Mystery Bonus ще не готовий! (раз на 6 годин)', 'error');
      return;
    }
    
    window.isClaimingMystery = true;
    
    try {
      // Demo logic
      this.state.bonusData.lastMystery = now;
      const roll = Math.random() * 100;
      let rewardText = '';
      if (roll < 50) {
        this.state.balance += 25;
        rewardText = '+25 DP';
      } else if (roll < 80) {
        await this.addXp(100);
        rewardText = '+100 XP';
      } else {
        if (!this.state.activeBoosters) this.state.activeBoosters = [];
        this.state.activeBoosters.push({
          id: 'booster_luck_10',
          title: '🍀 Фартовий Бустер +10%',
          icon: '🍀',
          expiresAt: Date.now() + 15 * 60 * 1000
        });
        this.state.saveBoosters();
        rewardText = '🍀 Фартовий Бустер +10% (15хв)';
      }
      
      showNotification(\`🎁 Знайдено Mystery Bonus: \${rewardText}!\`, 'success');
      if (window.audio) window.audio.playWin();
      if (window.particleInstance) window.particleInstance.burst();
      
      this.state.saveBalance();
      this.save();
      this.render();
      if (window.updateUi) window.updateUi();
    } catch(e) {}
    
    window.isClaimingMystery = false;
  }
`;
content = content.replace(/async spinWheel\(\) \{/, mysteryBonusLogic + "\n  async spinWheel() {");

// Update render() to include Boosters, Lucky Streak, Mystery Bonus
const renderReplace = `
  render() {
    if (!this.container) return;
    
    this.checkDailyReset();
    
    const xpReq = this.getXpForNextLevel(this.state.bonusData.level);
    const xpPercent = Math.min(100, Math.max(0, (this.state.bonusData.xp / xpReq) * 100));
    
    const now = Date.now();
    const lastClaimed = this.state.bonusData.daily.lastClaimed || 0;
    const hoursSince = (now - lastClaimed) / (1000 * 60 * 60);
    const canClaimDaily = hoursSince >= 24;
    
    let timeStr = '';
    if (!canClaimDaily) {
      const msLeft = (24 * 60 * 60 * 1000) - (now - lastClaimed);
      const h = Math.floor(msLeft / 3600000);
      const m = Math.floor((msLeft % 3600000) / 60000);
      timeStr = \`(через \${h}г \${m}хв)\`;
    }
    
    // Mystery Bonus
    const lastMystery = this.state.bonusData.lastMystery || 0;
    const canClaimMystery = (now - lastMystery) >= 6 * 60 * 60 * 1000;
    let mysteryTimeStr = '';
    if (!canClaimMystery) {
      const msLeft = (6 * 60 * 60 * 1000) - (now - lastMystery);
      const h = Math.floor(msLeft / 3600000);
      const m = Math.floor((msLeft % 3600000) / 60000);
      mysteryTimeStr = \`(через \${h}г \${m}хв)\`;
    }

    // Daily Grid
    const rewards = [25, 35, 50, 65, 80, 100, 150];
    const streak = this.state.bonusData.daily.streak || 0;
    let daysHtml = '';
    for (let i = 0; i < 7; i++) {
      let cl = 'day-box';
      if (i < streak) cl += ' claimed';
      else if (i === streak && canClaimDaily) cl += ' current';
      daysHtml += \`<div class="\${cl}">День \${i+1}<br/><b>+\${rewards[i]} DP</b></div>\`;
    }

    // Tasks HTML
    let tasksHtml = '';
    for (let t of this.TASKS) {
      const claimed = this.state.bonusData.tasks.claimed.includes(t.id);
      const pct = Math.min(100, (t.progress / t.goal) * 100);
      let btnHtml = '';
      if (claimed) {
        btnHtml = \`<button class="quick-action-btn" disabled style="opacity:0.5;">Виконано</button>\`;
      } else if (t.progress >= t.goal) {
        btnHtml = \`<button class="primary-btn" onclick="window.bonusSystem.claimTask('\${t.id}')">Забрати (+\${t.dp} DP)</button>\`;
      } else {
        btnHtml = \`<div class="xp-bar-bg" style="width:100%; height:8px; margin-top:5px;"><div class="xp-bar-fill" style="width:\${pct}%"></div></div><div style="font-size:10px;text-align:right;">\${t.progress}/\${t.goal}</div>\`;
      }
      tasksHtml += \`
        <div class="task-card">
          <div class="task-info">
            <div class="task-name">\${t.name}</div>
            <div class="task-reward">+\${t.xp} XP | +\${t.dp} DP</div>
          </div>
          <div class="task-action">\${btnHtml}</div>
        </div>
      \`;
    }

    // Ach HTML
    let achHtml = '';
    for (let a of this.ACHIEVEMENTS) {
      const unlocked = this.state.bonusData.achievements.includes(a.id);
      achHtml += \`
        <div class="ach-badge \${unlocked ? 'unlocked' : ''}" title="\${a.name}\\nНагорода: \${a.xp} XP / \${a.dp} DP">
          🏆<br/><span>\${a.name}</span>
        </div>
      \`;
    }
    
    // Boosters HTML
    let boostersHtml = '';
    if (window.window.BOOSTER_CATALOG) {
      boostersHtml = window.window.BOOSTER_CATALOG.map(booster => {
        const active = (this.state.activeBoosters || []).find(b => b && b.id === booster.id && b.expiresAt > now);
        const timeLeftSec = active ? Math.max(0, Math.floor((active.expiresAt - now) / 1000)) : 0;
        const mins = Math.floor(timeLeftSec / 60);
        const secs = timeLeftSec % 60;
    
        return \`
          <div class="booster-shop-card \${active ? 'active-owned' : ''}">
            <div>
              <div class="booster-icon-box">\${booster.icon}</div>
              <div class="booster-title">\${booster.title}</div>
              <div class="booster-desc">\${booster.desc}</div>
            </div>
    
            <div>
              \${active ? \`
                <div style="background: rgba(0, 255, 136, 0.15); border: 1px solid var(--neon-green); border-radius: 6px; padding: 8px; text-align: center; margin-bottom: 10px;">
                  <span style="font-size: 11px; font-weight: 800; color: var(--neon-green);">
                    ⚡ АКТИВНИЙ: \${mins}хв \${secs < 10 ? '0' : ''}\${secs}с
                  </span>
                </div>
              \` : ''}
    
              <div class="booster-price-row">
                <div>
                  <div class="booster-price">\${booster.price.toFixed(2)} DP</div>
                  <div style="font-size: 10px; color: var(--text-dim);">⏰ На: \${booster.durationLabel}</div>
                </div>
                <button onclick="buyTemporaryBooster('\${booster.id}')" class="google-login-btn" style="padding: 8px 14px; font-size: 12px; font-weight: 800; background: \${this.state.balance >= booster.price ? 'linear-gradient(135deg, #ffd700, #ff8c00)' : 'rgba(255,255,255,0.1)'}; color: \${this.state.balance >= booster.price ? '#000' : 'var(--text-dim)'}; border: none; border-radius: var(--radius-sm);" \${this.state.balance < booster.price ? 'disabled' : ''}>
                  \${active ? 'ПОДОВЖИТИ ЧАС' : 'АКТИВУВАТИ'}
                </button>
              </div>
            </div>
          </div>
        \`;
      }).join('');
    }

    this.container.innerHTML = \`
      <div class="bonus-header">
        <div class="level-badge">
          <span style="font-size: 10px; color: #aaa;">РІВЕНЬ</span>
          <span style="font-size: 24px; font-weight: 800; color: #fff;">\${this.state.bonusData.level}</span>
        </div>
        <div class="xp-progress">
          <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 5px;">
            <span>⭐ VIP Прогрес</span>
            <span>\${Math.floor(this.state.bonusData.xp)} / \${xpReq}</span>
          </div>
          <div class="xp-bar-bg">
            <div class="xp-bar-fill" style="width: \${xpPercent}%"></div>
          </div>
        </div>
        <div class="token-box">
          🎡 Жетони: <b style="color:var(--neon-cyan);">\${this.state.bonusData.tokens}</b>
        </div>
      </div>
      
      <!-- LUCKY STREAK BAR -->
      <div style="background: rgba(255,165,0,0.1); border: 1px solid var(--neon-orange); border-radius: 8px; padding: 10px; margin-bottom: 20px; text-align: center;">
        <span style="color: var(--neon-orange); font-weight: bold;">🎯 Lucky Streak:</span> 
        <span style="color: #fff; font-size: 16px; margin-left: 10px;">\${this.state.bonusData.luckyStreak || 0} WIN 🔥</span>
        <div style="font-size: 10px; color: #888; margin-top: 5px;">Перемагай підряд, щоб отримати додаткові DP!</div>
      </div>

      <!-- BOOSTERS CATALOG -->
      <h3 style="color: #fff; border-bottom: 1px solid #333; padding-bottom: 10px; margin-bottom: 15px;">⚡ Магазин Бустерів</h3>
      <div class="bonus-grid" style="margin-bottom: 30px;">
        \${boostersHtml}
      </div>

      <h3 style="color: #fff; border-bottom: 1px solid #333; padding-bottom: 10px; margin-bottom: 15px;">🎁 Бонуси та Нагороди</h3>
      <div class="bonus-grid">
        <!-- Daily -->
        <div class="bonus-panel">
          <h3>🔥 Daily Boost</h3>
          <div class="daily-days-grid">\${daysHtml}</div>
          <div style="text-align:center; margin-top:15px;">
            <button id="claimDailyBtn" class="\${canClaimDaily ? 'primary-btn' : 'quick-action-btn'}" 
                    style="width: 100%;" 
                    \${canClaimDaily ? '' : 'disabled'}
                    onclick="window.bonusSystem.claimDaily()">
              \${canClaimDaily ? 'Отримати безкоштовно' : 'Доступно ' + timeStr}
            </button>
          </div>
          <div style="margin-top: 15px; text-align: center; color: var(--neon-orange); font-weight: bold;">
            🔥 Серія входів: \${streak} днів
          </div>
        </div>

        <!-- Wheel -->
        <div class="bonus-panel" style="text-align: center;">
          <h3>🎡 Bonus Wheel</h3>
          <p style="font-size: 12px; color: #aaa; margin-bottom: 15px;">1 жетон = 1 прокрутка. Гарантований виграш DP або XP!</p>
          <div class="wheel-container">
            <div id="bonusWheelCanvas" class="wheel-circle">🎡</div>
            <div class="wheel-pointer">▼</div>
          </div>
          <button class="primary-btn" style="margin-top:20px; width:100%; border-color:var(--neon-purple); color:var(--neon-purple);"
                  onclick="window.bonusSystem.spinWheel()">
            Крутити (1 жетон)
          </button>
        </div>
        
        <!-- Mystery Bonus -->
        <div class="bonus-panel" style="text-align: center;">
          <h3>🎁 Mystery Bonus</h3>
          <p style="font-size: 12px; color: #aaa; margin-bottom: 15px;">Секретна нагорода (DP, XP або Бустер). Оновлюється кожні 6 годин.</p>
          <div style="font-size: 50px; margin: 20px 0;">🎁</div>
          <button class="\${canClaimMystery ? 'primary-btn' : 'quick-action-btn'}" 
                  style="width: 100%;" 
                  \${canClaimMystery ? '' : 'disabled'}
                  onclick="window.bonusSystem.claimMysteryBonus()">
            \${canClaimMystery ? 'Відкрити Mystery Bonus' : 'Доступно ' + mysteryTimeStr}
          </button>
        </div>

        <!-- Tasks -->
        <div class="bonus-panel">
          <h3>🎯 Щоденні завдання</h3>
          <div class="tasks-list">\${tasksHtml}</div>
        </div>

        <!-- Achievements -->
        <div class="bonus-panel" style="grid-column: 1 / -1;">
          <h3>🏆 Досягнення</h3>
          <div class="ach-grid">\${achHtml}</div>
        </div>
      </div>
    \`;
  }
`;
const renderStart = content.indexOf('render() {');
if (renderStart > -1) {
  content = content.substring(0, renderStart) + renderReplace + '\n}\n';
}

fs.writeFileSync('bonus_system.js', content, 'utf8');
