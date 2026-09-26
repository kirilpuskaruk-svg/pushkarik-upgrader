class BonusSystem {
  constructor(stateRef) {
    this.state = stateRef;
    
    // Initialize default bonusData if missing
    if (!this.state.bonusData) {
      this.state.bonusData = {
        xp: 0,
        level: 1,
        daily: { lastClaimed: 0, streak: 0 },
        tokens: 0,
        achievements: [],
        tasks: { date: this.getTodayStr(), upgrades: 0, cases: 0 }
      };
    }
    
    this.checkDailyReset();
    
    // DOM Elements
    this.container = document.getElementById('bonusDisplayContainer');
    
    // Configs
    this.ACHIEVEMENTS = [
      { id: 'first_upg', name: 'Перший апгрейд', xp: 50, dp: 10.00, condition: () => this.state.stats.total >= 1 },
      { id: 'ten_upg', name: '10 апгрейдів', xp: 150, dp: 50.00, condition: () => this.state.stats.total >= 10 },
      { id: 'fifty_upg', name: '50 апгрейдів', xp: 500, dp: 250.00, condition: () => this.state.stats.total >= 50 },
      { id: 'first_lvl', name: 'Перший Level Up', xp: 100, dp: 25.00, condition: () => this.state.bonusData.level > 1 },
      { id: 'streak_7', name: 'Тиждень у грі (7 днів streak)', xp: 300, dp: 500.00, condition: () => this.state.bonusData.daily.streak >= 7 }
    ];
    
    this.TASKS = [
      { id: 'login', name: 'Зайди на сайт сьогодні', goal: 1, get progress() { return 1; }, xp: 25, dp: 5.00 },
      { id: 'upgrades', name: 'Зроби 3 апгрейди', goal: 3, get progress() { return window.bonusSystem.state.bonusData.tasks.upgrades || 0; }, xp: 50, dp: 15.00 },
      { id: 'cases', name: 'Відкрий 1 кейс', goal: 1, get progress() { return window.bonusSystem.state.bonusData.tasks.cases || 0; }, xp: 40, dp: 10.00 }
    ];
    
    // Level scaling (XP required for next level: base 100 * level^1.2)
    this.getXpForNextLevel = (lvl) => Math.floor(100 * Math.pow(lvl, 1.2));
  }
  
  getTodayStr() {
    return new Date().toISOString().split('T')[0];
  }
  
  checkDailyReset() {
    const today = this.getTodayStr();
    if (this.state.bonusData.tasks.date !== today) {
      this.state.bonusData.tasks = { date: today, upgrades: 0, cases: 0, claimed: [] };
      this.save();
    }
    if (!this.state.bonusData.tasks.claimed) {
      this.state.bonusData.tasks.claimed = [];
    }
  }

  save() {
    // Only save to localStorage (this syncs immediately for demo users)
    // Real authenticated users will sync via API
    localStorage.setItem('pushkarik_bonus_data', JSON.stringify(this.state.bonusData));
    
    // Push state securely to server if needed
    if (window.apiFetch && getAuthToken() && !getAuthToken().startsWith('guest_')) {
      apiFetch('/api/game/bonus-action', {
        method: 'POST',
        body: JSON.stringify({ action: 'sync_state', payload: this.state.bonusData })
      }).catch(e => console.warn('Failed to sync bonus data', e));
    }
  }
  
  load() {
    const saved = localStorage.getItem('pushkarik_bonus_data');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        this.state.bonusData = { ...this.state.bonusData, ...parsed };
      } catch(e){}
    }
  }

  async addXp(amount) {
    this.state.bonusData.xp += amount;
    showNotification(`⭐ +${amount} XP!`, 'success');
    await this.checkLevelUp();
    this.save();
    this.render();
  }

  async checkLevelUp() {
    let leveledUp = false;
    let req = this.getXpForNextLevel(this.state.bonusData.level);
    
    while (this.state.bonusData.xp >= req) {
      this.state.bonusData.xp -= req;
      this.state.bonusData.level++;
      leveledUp = true;
      req = this.getXpForNextLevel(this.state.bonusData.level);
      
      const levelReward = 50.00 * (this.state.bonusData.level - 1);
      this.state.balance += levelReward;
      showNotification(`🎉 LEVEL UP! Рівень ${this.state.bonusData.level}! Отримано ${levelReward.toFixed(2)} DP!`, 'success');
      if (window.audio) window.audio.playWin();
      if (window.particleInstance) window.particleInstance.burst();
    }
    
    if (leveledUp) {
      this.state.saveBalance();
      if (window.updateUi) window.updateUi();
    }
  }

  trackTask(type, count = 1) {
    this.checkDailyReset();
    if (this.state.bonusData.tasks[type] !== undefined) {
      this.state.bonusData.tasks[type] += count;
      this.save();
      this.checkAchievements();
      if (this.state.activeTab === 'bonus') this.render();
    }
  }

  async checkAchievements() {
    for (let ach of this.ACHIEVEMENTS) {
      if (!this.state.bonusData.achievements.includes(ach.id) && ach.condition()) {
        this.state.bonusData.achievements.push(ach.id);
        this.state.balance += ach.dp;
        this.state.saveBalance();
        showNotification(`🏆 ДОСЯГНЕННЯ РОЗБЛОКОВАНО: ${ach.name}! (+${ach.xp} XP, +${ach.dp} DP)`, 'success');
        if (window.audio) window.audio.playWin();
        if (window.particleInstance) window.particleInstance.burst();
        await this.addXp(ach.xp);
      }
    }
  }

  async claimDaily() {
    if (window.isClaimingDaily) return;
    window.isClaimingDaily = true;
    
    try {
      const btn = document.getElementById('claimDailyBtn');
      if(btn) { btn.disabled = true; btn.innerText = 'Отримання...'; }
      
      const res = await apiFetch('/api/game/bonus-action', {
        method: 'POST',
        body: JSON.stringify({ action: 'daily' })
      });
      
      if (res.mock) {
        // DEMO logic
        const now = Date.now();
        const lastClaimed = this.state.bonusData.daily.lastClaimed || 0;
        const hoursSince = (now - lastClaimed) / (1000 * 60 * 60);
        if (hoursSince < 24) throw new Error('Щоденний бонус ще не готовий');
        
        let streak = this.state.bonusData.daily.streak || 0;
        if (hoursSince > 48) streak = 0;
        streak++;
        if (streak > 7) streak = 1;
        
        const rewards = [0, 25, 35, 50, 65, 80, 100, 150];
        const rewardDP = rewards[streak] || 25;
        
        this.state.balance += rewardDP;
        this.state.bonusData.daily = { lastClaimed: now, streak: streak };
        this.state.bonusData.tokens = (this.state.bonusData.tokens || 0) + 1;
        
        showNotification(`🎁 Отримано щоденний бонус: ${rewardDP} DP та 1 Bonus Token!`, 'success');
      } else if (res.success) {
        this.state.balance += res.rewardDP;
        this.state.bonusData.daily = { lastClaimed: res.serverTime, streak: res.streak };
        this.state.bonusData.tokens = res.tokens;
        showNotification(`🎁 Отримано щоденний бонус: ${res.rewardDP} DP та 1 Bonus Token!`, 'success');
      }
      
      if (window.audio) window.audio.playWin();
      if (window.particleInstance) window.particleInstance.burst();
      
      this.state.saveBalance();
      await this.addXp(50); // XP for daily
      this.save();
      this.render();
      if (window.updateUi) window.updateUi();
      
    } catch(e) {
      showNotification(e.message || 'Помилка отримання бонусу', 'error');
      const btn = document.getElementById('claimDailyBtn');
      if(btn) { btn.disabled = false; btn.innerText = 'Отримати бонус'; }
    }
    
    window.isClaimingDaily = false;
  }

  async spinWheel() {
    if (window.isSpinningWheel) return;
    if (this.state.bonusData.tokens < 1) {
      showNotification('❌ Немає жетонів! Заходь завтра або виконай завдання.', 'error');
      return;
    }
    
    window.isSpinningWheel = true;
    
    const wheelCanvas = document.getElementById('bonusWheelCanvas');
    if (wheelCanvas) {
      wheelCanvas.style.transition = 'transform 3s cubic-bezier(0.2, 0.8, 0.2, 1)';
      wheelCanvas.style.transform = `rotate(${360 * 5 + Math.random() * 360}deg)`;
    }
    
    try {
      const res = await apiFetch('/api/game/bonus-action', {
        method: 'POST',
        body: JSON.stringify({ action: 'wheel' })
      });
      
      setTimeout(async () => {
        let rewardType, rewardAmount;
        
        if (res.mock) {
          this.state.bonusData.tokens--;
          const roll = Math.random() * 100;
          if (roll < 40) { rewardType = 'dp'; rewardAmount = 10; }
          else if (roll < 70) { rewardType = 'dp'; rewardAmount = 20; }
          else if (roll < 85) { rewardType = 'dp'; rewardAmount = 30; }
          else if (roll < 95) { rewardType = 'xp'; rewardAmount = 50; }
          else { rewardType = 'token'; rewardAmount = 1; }
          
          if (rewardType === 'dp') this.state.balance += rewardAmount;
          if (rewardType === 'token') this.state.bonusData.tokens += rewardAmount;
          if (rewardType === 'xp') await this.addXp(rewardAmount);
          
        } else if (res.success) {
          rewardType = res.rewardType;
          rewardAmount = res.rewardAmount;
          this.state.bonusData.tokens = res.tokens;
          if (res.newXp) {
            const added = res.newXp - this.state.bonusData.xp;
            if (added > 0) await this.addXp(added);
          }
          if (rewardType === 'dp') this.state.balance += rewardAmount;
        }
        
        let msg = '';
        if (rewardType === 'dp') msg = `🎡 Виграш: ${rewardAmount} DP!`;
        if (rewardType === 'token') msg = `🎡 Виграш: ${rewardAmount} Bonus Token!`;
        if (rewardType === 'xp') msg = `🎡 Виграш: ${rewardAmount} XP!`;
        
        showNotification(msg, 'success');
        if (window.audio) window.audio.playWin();
        if (window.particleInstance) window.particleInstance.burst();
        
        this.state.saveBalance();
        this.save();
        this.render();
        if (window.updateUi) window.updateUi();
        
        if (wheelCanvas) {
          wheelCanvas.style.transition = 'none';
          wheelCanvas.style.transform = 'rotate(0deg)';
        }
        window.isSpinningWheel = false;
      }, 3000); // Wait for animation
      
    } catch(e) {
      showNotification(e.message || 'Помилка', 'error');
      window.isSpinningWheel = false;
      if (wheelCanvas) {
        wheelCanvas.style.transition = 'none';
        wheelCanvas.style.transform = 'rotate(0deg)';
      }
    }
  }
  
  claimTask(taskId) {
    this.checkDailyReset();
    if (this.state.bonusData.tasks.claimed.includes(taskId)) return;
    
    const task = this.TASKS.find(t => t.id === taskId);
    if (!task) return;
    
    if (task.progress >= task.goal) {
      this.state.bonusData.tasks.claimed.push(taskId);
      this.state.balance += task.dp;
      this.state.saveBalance();
      showNotification(`🎯 Завдання виконано! (+${task.xp} XP, +${task.dp} DP)`, 'success');
      this.addXp(task.xp);
      this.save();
      this.render();
      if (window.updateUi) window.updateUi();
    }
  }

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
      timeStr = `(через ${h}г ${m}хв)`;
    }
    
    // Daily Grid
    const rewards = [25, 35, 50, 65, 80, 100, 150];
    const streak = this.state.bonusData.daily.streak || 0;
    let daysHtml = '';
    for (let i = 0; i < 7; i++) {
      let cl = 'day-box';
      if (i < streak) cl += ' claimed';
      else if (i === streak && canClaimDaily) cl += ' current';
      daysHtml += `<div class="${cl}">День ${i+1}<br/><b>+${rewards[i]} DP</b></div>`;
    }

    // Tasks HTML
    let tasksHtml = '';
    for (let t of this.TASKS) {
      const claimed = this.state.bonusData.tasks.claimed.includes(t.id);
      const pct = Math.min(100, (t.progress / t.goal) * 100);
      let btnHtml = '';
      if (claimed) {
        btnHtml = `<button class="quick-action-btn" disabled style="opacity:0.5;">Виконано</button>`;
      } else if (t.progress >= t.goal) {
        btnHtml = `<button class="primary-btn" onclick="window.bonusSystem.claimTask('${t.id}')">Забрати (+${t.dp} DP)</button>`;
      } else {
        btnHtml = `<div class="xp-bar-bg" style="width:100%; height:8px; margin-top:5px;"><div class="xp-bar-fill" style="width:${pct}%"></div></div><div style="font-size:10px;text-align:right;">${t.progress}/${t.goal}</div>`;
      }
      tasksHtml += `
        <div class="task-card">
          <div class="task-info">
            <div class="task-name">${t.name}</div>
            <div class="task-reward">+${t.xp} XP | +${t.dp} DP</div>
          </div>
          <div class="task-action">${btnHtml}</div>
        </div>
      `;
    }

    // Ach HTML
    let achHtml = '';
    for (let a of this.ACHIEVEMENTS) {
      const unlocked = this.state.bonusData.achievements.includes(a.id);
      achHtml += `
        <div class="ach-badge ${unlocked ? 'unlocked' : ''}" title="${a.name}\nНагорода: ${a.xp} XP / ${a.dp} DP">
          🏆<br/><span>${a.name}</span>
        </div>
      `;
    }

    this.container.innerHTML = `
      <div class="bonus-header">
        <div class="level-badge">
          <span style="font-size: 10px; color: #aaa;">РІВЕНЬ</span>
          <span style="font-size: 24px; font-weight: 800; color: #fff;">${this.state.bonusData.level}</span>
        </div>
        <div class="xp-progress">
          <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 5px;">
            <span>XP Прогрес</span>
            <span>${Math.floor(this.state.bonusData.xp)} / ${xpReq}</span>
          </div>
          <div class="xp-bar-bg">
            <div class="xp-bar-fill" style="width: ${xpPercent}%"></div>
          </div>
        </div>
        <div class="token-box">
          🎡 Жетони: <b style="color:var(--neon-cyan);">${this.state.bonusData.tokens}</b>
        </div>
      </div>

      <div class="bonus-grid">
        <!-- Daily -->
        <div class="bonus-panel">
          <h3>🎁 Щоденний бонус</h3>
          <div class="daily-days-grid">${daysHtml}</div>
          <div style="text-align:center; margin-top:15px;">
            <button id="claimDailyBtn" class="${canClaimDaily ? 'primary-btn' : 'quick-action-btn'}" 
                    style="width: 100%;" 
                    ${canClaimDaily ? '' : 'disabled'}
                    onclick="window.bonusSystem.claimDaily()">
              ${canClaimDaily ? 'Отримати бонус' : 'Доступно ' + timeStr}
            </button>
          </div>
          <div style="margin-top: 15px; text-align: center; color: var(--neon-orange); font-weight: bold;">
            🔥 Серія входів: ${streak} днів
          </div>
        </div>

        <!-- Wheel -->
        <div class="bonus-panel" style="text-align: center;">
          <h3>🎡 Колесо Фортуни</h3>
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

        <!-- Tasks -->
        <div class="bonus-panel">
          <h3>🎯 Щоденні завдання</h3>
          <div class="tasks-list">${tasksHtml}</div>
        </div>

        <!-- Achievements -->
        <div class="bonus-panel" style="grid-column: 1 / -1;">
          <h3>🏆 Досягнення</h3>
          <div class="ach-grid">${achHtml}</div>
        </div>
      </div>
    `;
  }
}
