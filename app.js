/**
 * UPGRADER DEMO - Modern Frontend Logic with Real CS2 Photos
 * 100% DEMO - NO REAL MONEY - NO GAMBLING
 */

// ==========================================
// 1. SOUND SYNTHESIZER (Web Audio API)
// ==========================================
class SoundSynth {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playClick() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch(e) {}
  }

  playTick() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1200, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.02);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.025);
    } catch(e) {}
  }

  playWin() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.08);
        gain.gain.setValueAtTime(0, this.ctx.currentTime + idx * 0.08);
        gain.gain.linearRampToValueAtTime(0.2, this.ctx.currentTime + idx * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.08 + 0.4);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + idx * 0.08);
        osc.stop(this.ctx.currentTime + idx * 0.08 + 0.45);
      });
    } catch(e) {}
  }

  playFail() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(90, this.ctx.currentTime + 0.3);
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.35);
    } catch(e) {}
  }
}

const audio = new SoundSynth();

// ==========================================
// 2. STATE & LOCALSTORAGE
// ==========================================
const STORAGE_KEYS = {
  INVENTORY: 'upgrader_demo_inventory_v5_clean',
  BALANCE: 'upgrader_demo_balance_v5_clean',
  STATS: 'upgrader_demo_stats_v5_clean',
  HISTORY: 'upgrader_demo_history_v5_clean',
  SOUND: 'upgrader_demo_sound_v5_clean'
};

class AppState {
  constructor() {
    this.loadState();
    this.selectedSource = null;
    this.selectedTarget = null;
    this.isSpinning = false;
    this.rollDirection = 'under';
    this.activeTab = 'inventory';
    this.inventoryFilter = { search: '', rarity: 'all', sort: 'price_desc' };
    this.catalogFilter = { search: '', rarity: 'all', sort: 'price_asc' };
  }

  loadState() {
    // Inventory with auto-upgrade to real photos
    const savedInv = localStorage.getItem(STORAGE_KEYS.INVENTORY);
    if (savedInv) {
      try {
        const parsed = JSON.parse(savedInv);
        if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].image) {
          this.inventory = parsed;
        } else {
          this.inventory = [...DEFAULT_USER_INVENTORY];
          this.saveInventory();
        }
      } catch(e) {
        this.inventory = [...DEFAULT_USER_INVENTORY];
      }
    } else {
      this.inventory = [...DEFAULT_USER_INVENTORY];
      this.saveInventory();
    }

    // Balance
    const savedBal = localStorage.getItem(STORAGE_KEYS.BALANCE);
    this.balance = savedBal ? parseFloat(savedBal) : 100.00;

    // Stats
    const savedStats = localStorage.getItem(STORAGE_KEYS.STATS);
    this.stats = savedStats ? JSON.parse(savedStats) : {
      total: 0,
      wins: 0,
      losses: 0,
      bestMultiplier: 1.0,
      totalWonValue: 0
    };

    // History
    const savedHist = localStorage.getItem(STORAGE_KEYS.HISTORY);
    this.history = savedHist ? JSON.parse(savedHist) : [];

    // Sound
    const savedSound = localStorage.getItem(STORAGE_KEYS.SOUND);
    audio.enabled = savedSound !== null ? JSON.parse(savedSound) : true;
  }

  saveInventory() {
    localStorage.setItem(STORAGE_KEYS.INVENTORY, JSON.stringify(this.inventory));
  }

  saveBalance() {
    localStorage.setItem(STORAGE_KEYS.BALANCE, this.balance.toFixed(2));
  }

  saveStats() {
    localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(this.stats));
  }

  saveHistory() {
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(this.history.slice(0, 50)));
  }

  resetAll() {
    this.inventory = [...DEFAULT_USER_INVENTORY];
    this.balance = 100.00;
    this.stats = { total: 0, wins: 0, losses: 0, bestMultiplier: 1.0, totalWonValue: 0 };
    this.history = [];
    this.selectedSource = null;
    this.selectedTarget = null;
    this.saveInventory();
    this.saveBalance();
    this.saveStats();
    this.saveHistory();
  }

  calculateChance() {
    if (!this.selectedSource || !this.selectedTarget) return 0;
    // Down-grade is physically impossible in an upgrader
    if (this.selectedTarget.price <= this.selectedSource.price) return 0;
    const ratio = (this.selectedSource.price / this.selectedTarget.price) * 100;
    const demoChance = ratio * 0.95;
    return Math.min(Math.max(demoChance, 1.00), 95.00);
  }

  calculateMultiplier() {
    if (!this.selectedSource || !this.selectedTarget) return 1.0;
    if (this.selectedTarget.price <= this.selectedSource.price) return 1.0;
    const mult = this.selectedTarget.price / this.selectedSource.price;
    return Math.max(mult, 1.01);
  }
}

const state = new AppState();

// ==========================================
// 3. RADIAL GAUGE CANVAS ENGINE
// ==========================================
class RadialWheel {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.currentAngle = 0;
    this.animating = false;
    this.lastTickAngle = 0;

    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.draw();
  }

  resize() {
    if (!this.canvas || !this.canvas.parentElement) return;
    const rect = this.canvas.parentElement.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;
    this.ctx.scale(dpr, dpr);
    this.size = rect.width;
    this.center = this.size / 2;
    this.radius = Math.max(this.center - 24, 20);
    this.draw();
  }

  draw() {
    const ctx = this.ctx;
    const center = this.center;
    const radius = this.radius;

    ctx.clearRect(0, 0, this.size, this.size);

    // Track ring
    ctx.beginPath();
    ctx.arc(center, center, radius, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 14;
    ctx.stroke();

    const chance = state.calculateChance();
    const chanceAngle = (chance / 100) * 360;

    // Winning Arc
    if (chance > 0) {
      let startDeg, endDeg;
      if (state.rollDirection === 'under') {
        startDeg = -90;
        endDeg = -90 + chanceAngle;
      } else {
        startDeg = -90 + (360 - chanceAngle);
        endDeg = 270;
      }

      const startRad = (startDeg * Math.PI) / 180;
      const endRad = (endDeg * Math.PI) / 180;

      ctx.save();
      ctx.beginPath();
      ctx.arc(center, center, radius, startRad, endRad);
      const grad = ctx.createLinearGradient(0, 0, this.size, this.size);
      grad.addColorStop(0, '#00ff88');
      grad.addColorStop(0.5, '#00f0ff');
      grad.addColorStop(1, '#b026ff');
      ctx.strokeStyle = grad;
      ctx.lineWidth = 14;
      ctx.lineCap = 'round';
      ctx.shadowColor = 'rgba(0, 240, 255, 0.6)';
      ctx.shadowBlur = 15;
      ctx.stroke();
      ctx.restore();
    }

    // Ticks
    const numTicks = 60;
    for (let i = 0; i < numTicks; i++) {
      const angle = (i * 360 / numTicks - 90) * (Math.PI / 180);
      const tickInner = radius + 11;
      const tickOuter = tickInner + (i % 5 === 0 ? 6 : 3);
      ctx.beginPath();
      ctx.moveTo(center + Math.cos(angle) * tickInner, center + Math.sin(angle) * tickInner);
      ctx.lineTo(center + Math.cos(angle) * tickOuter, center + Math.sin(angle) * tickOuter);
      ctx.strokeStyle = i % 5 === 0 ? 'rgba(255, 255, 255, 0.25)' : 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    this.drawNeedle(this.currentAngle);
  }

  drawNeedle(angleDeg) {
    const ctx = this.ctx;
    const center = this.center;
    const rad = ((angleDeg - 90) * Math.PI) / 180;
    const needleLength = this.radius + 14;

    ctx.save();
    const tipX = center + Math.cos(rad) * needleLength;
    const tipY = center + Math.sin(rad) * needleLength;

    ctx.beginPath();
    ctx.arc(tipX, tipY, 5, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = '#00f0ff';
    ctx.shadowBlur = 12;
    ctx.fill();

    const innerX = center + Math.cos(rad) * (this.radius - 12);
    const innerY = center + Math.sin(rad) * (this.radius - 12);
    ctx.beginPath();
    ctx.moveTo(innerX, innerY);
    ctx.lineTo(tipX, tipY);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.restore();
  }

  spinTo(finalRollPercentage, onComplete) {
    this.animating = true;
    state.isSpinning = true;
    updateUi();

    const rollAngle = (finalRollPercentage / 100) * 360;
    const extraRotations = 4 * 360;
    const startAngle = this.currentAngle % 360;
    const targetDelta = extraRotations + (360 - startAngle) + rollAngle;
    const endAngle = this.currentAngle + targetDelta;

    const duration = 4200;
    const startTime = performance.now();
    this.lastTickAngle = this.currentAngle;

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);

      this.currentAngle = startAngle + targetDelta * easedProgress;

      if (Math.abs(this.currentAngle - this.lastTickAngle) > 18) {
        audio.playTick();
        this.lastTickAngle = this.currentAngle;
      }

      this.draw();

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        this.currentAngle = endAngle % 360;
        this.animating = false;
        state.isSpinning = false;
        this.draw();
        onComplete();
      }
    };

    requestAnimationFrame(step);
  }
}

// ==========================================
// 4. PARTICLE CONFETTI ENGINE
// ==========================================
class ParticleSystem {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.active = false;
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  burst(x, y) {
    this.resize();
    this.particles = [];
    const colors = ['#00ff88', '#00f0ff', '#b026ff', '#ffd700', '#ffffff'];
    for (let i = 0; i < 90; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 12 + 4;
      this.particles.push({
        x: x || window.innerWidth / 2,
        y: y || window.innerHeight / 2,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 4,
        size: Math.random() * 6 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 1.0,
        decay: Math.random() * 0.015 + 0.01,
        rotation: Math.random() * 360,
        rotSpeed: Math.random() * 10 - 5
      });
    }
    if (!this.active) {
      this.active = true;
      this.loop();
    }
  }

  loop() {
    if (!this.active) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.35;
      p.vx *= 0.97;
      p.life -= p.decay;
      p.rotation += p.rotSpeed;

      if (p.life <= 0) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.globalAlpha = p.life;
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate((p.rotation * Math.PI) / 180);
      this.ctx.fillStyle = p.color;
      this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      this.ctx.restore();
    }

    if (this.particles.length > 0) {
      requestAnimationFrame(() => this.loop());
    } else {
      this.active = false;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }
}

// ==========================================
// 5. LIVE DROPS STREAM & PLAYER FEED SIMULATION
// ==========================================
const MOCK_USERS_DATA = [
  { name: 'NeonSamurai', avatar: 'https://ui-avatars.com/api/?name=NeonSamurai&background=eb4b4b&color=fff', verified: true },
  { name: 'CyberGhost_UA', avatar: 'https://ui-avatars.com/api/?name=CyberGhost&background=4285F4&color=fff', verified: true },
  { name: 'ApexHunter', avatar: 'https://ui-avatars.com/api/?name=ApexHunter&background=d32ce6&color=fff', verified: false },
  { name: 'Valkyrie99', avatar: 'https://ui-avatars.com/api/?name=Valkyrie99&background=8847ff&color=fff', verified: true },
  { name: 'ShadowKev', avatar: 'https://ui-avatars.com/api/?name=ShadowKev&background=ffd700&color=fff', verified: false },
  { name: 'PixelStorm', avatar: 'https://ui-avatars.com/api/?name=PixelStorm&background=00f0ff&color=fff', verified: true },
  { name: 'QuackLord', avatar: 'https://ui-avatars.com/api/?name=QuackLord&background=00ff88&color=fff', verified: true },
  { name: 'SlayerPro', avatar: 'https://ui-avatars.com/api/?name=SlayerPro&background=ffaa00&color=fff', verified: false },
  { name: 'QuantumZero', avatar: 'https://ui-avatars.com/api/?name=QuantumZero&background=ff4444&color=fff', verified: true },
  { name: 'HyperGlitch', avatar: 'https://ui-avatars.com/api/?name=HyperGlitch&background=1a73e8&color=fff', verified: false }
];

let totalUpgradesCounterValue = 438920;

function getRarityTierClass(rarity, price) {
  if (price >= 500) return 'gold-tier';
  switch (rarity) {
    case 'ancient': return 'ancient-tier';
    case 'mythic': return 'gold-tier';
    case 'legendary': return 'covert-tier';
    case 'epic': return 'classified-tier';
    case 'rare': return 'restricted-tier';
    default: return 'milspec-tier';
  }
}

function createDropStreamCard(dropData) {
  const { user, item, win, chance } = dropData;
  const tierClass = getRarityTierClass(item.rarity, item.price);
  
  const div = document.createElement('div');
  div.className = `drop-stream-card ${tierClass}`;
  
  const isYou = user.name.includes('(You)') || (googleAuth.user && user.email === googleAuth.user.email);
  
  div.innerHTML = `
    <div class="drop-card-top">
      <div class="drop-chance-badge ${win ? 'win' : 'fail'}">
        <span>${win ? '🔥 WIN' : '❌ FAIL'}</span>
        <span>${chance.toFixed(1)}%</span>
      </div>
    </div>
    
    <div class="drop-card-img-box">
      <img src="${item.image}" alt="${item.name}" loading="lazy" />
    </div>

    <div class="drop-card-main">
      <div class="drop-skin-title" title="${item.name}">${item.name}</div>
      <div class="drop-skin-sub">${item.category}</div>
    </div>

    <div class="drop-player-row">
      <img src="${user.avatar}" class="drop-player-avatar" alt="${user.name}" onerror="this.src='https://lh3.googleusercontent.com/a/default-user'" />
      <span class="drop-player-name ${isYou ? 'is-you' : ''}">${user.name}</span>
    </div>
  `;

  div.addEventListener('click', () => {
    openDropDetailsModal(dropData);
    audio.playClick();
  });

  return div;
}

function openDropDetailsModal(dropData) {
  const modal = document.getElementById('dropDetailModal');
  const body = document.getElementById('dropDetailModalBody');
  if (!modal || !body) return;

  const { user, item, win, chance, roll, sourceItem } = dropData;
  const rarity = RARITIES[item.rarity] || RARITIES.common;
  const mult = sourceItem ? (item.price / sourceItem.price) : (item.price / Math.max(1, (item.price * (chance / 100))));

  body.innerHTML = `
    <div class="drop-profile-card">
      <img src="${user.avatar}" class="drop-profile-avatar" alt="${user.name}" onerror="this.src='https://lh3.googleusercontent.com/a/default-user'" />
      <div>
        <div style="font-weight: 800; font-size: 15px; color: #fff; display: flex; align-items: center; gap: 6px;">
          ${user.name} ${user.verified ? '<span class="google-badge">✓ Google Verified</span>' : ''}
        </div>
        <div style="font-size: 11px; color: var(--text-dim); margin-top: 2px;">Гравець UPGRADER DEMO</div>
      </div>
    </div>

    <div class="drop-showcase-box" style="border-color: ${rarity.color}; box-shadow: 0 0 25px ${rarity.glow};">
      <div style="font-size: 11px; font-weight: 800; color: ${rarity.color}; text-transform: uppercase; margin-bottom: 6px;">
        ${win ? '🔥 ВИГРАНИЙ СКІН' : '❌ СКІН ДРОПУ'} (${rarity.name})
      </div>
      <img src="${item.image}" alt="${item.name}" style="max-width: 140px; max-height: 100px; object-fit: contain; filter: drop-shadow(0 6px 12px rgba(0,0,0,0.6));" />
      <h3 style="font-size: 15px; font-weight: 900; color: #fff; margin-top: 10px;">${item.name}</h3>
      <div style="font-size: 14px; font-weight: 800; color: var(--neon-green); margin-top: 4px;">${item.price.toFixed(2)} DP</div>
    </div>

    <div class="drop-stats-row">
      <div class="drop-stat-item">
        <div class="drop-stat-label">Шанс</div>
        <div class="drop-stat-val" style="color: var(--neon-cyan);">${chance.toFixed(2)}%</div>
      </div>
      <div class="drop-stat-item">
        <div class="drop-stat-label">Множник</div>
        <div class="drop-stat-val" style="color: var(--neon-amber);">x${mult ? mult.toFixed(2) : '1.00'}</div>
      </div>
      <div class="drop-stat-item">
        <div class="drop-stat-label">Результат</div>
        <div class="drop-stat-val" style="color: ${win ? 'var(--neon-green)' : 'var(--neon-red)'};">${roll ? roll.toFixed(2) : '0.00'}%</div>
      </div>
    </div>

    <button onclick="tryThisUpgrade('${item.id}')" class="google-login-btn" style="width: 100%; margin-top: 16px; padding: 12px; font-size: 13px; justify-content: center; background: linear-gradient(135deg, var(--neon-cyan), #00a2ff); color: #000; font-weight: 900; border: none;">
      🔁 Спробувати цей апгрейд
    </button>
  `;

  modal.classList.add('open');
}

window.tryThisUpgrade = function(itemId) {
  const modal = document.getElementById('dropDetailModal');
  if (modal) modal.classList.remove('open');
  selectTargetItem(itemId);
  switchToCatalogTab();
};

function initLiveDropStream() {
  const container = document.getElementById('liveDropsStreamInner');
  if (!container) return;

  container.innerHTML = '';
  const sampleItems = ITEM_CATALOG.filter(i => ['rare', 'epic', 'legendary', 'mythic', 'ancient'].includes(i.rarity));

  for (let i = 0; i < 15; i++) {
    const user = MOCK_USERS_DATA[Math.floor(Math.random() * MOCK_USERS_DATA.length)];
    const item = sampleItems[Math.floor(Math.random() * sampleItems.length)];
    const win = Math.random() > 0.45;
    const chance = Math.random() * 65 + 15;
    const roll = win ? (Math.random() * chance) : (chance + Math.random() * (100 - chance));
    
    const card = createDropStreamCard({ user, item, win, chance, roll });
    container.appendChild(card);
  }

  // Periodic background simulation of live player drops
  setInterval(() => {
    const user = MOCK_USERS_DATA[Math.floor(Math.random() * MOCK_USERS_DATA.length)];
    const item = sampleItems[Math.floor(Math.random() * sampleItems.length)];
    const win = Math.random() > 0.45;
    const chance = Math.random() * 65 + 15;
    const roll = win ? (Math.random() * chance) : (chance + Math.random() * (100 - chance));

    pushToLiveStream(item, win, chance, user, roll);

    // Dynamic Header Counters update
    totalUpgradesCounterValue++;
    const totalEl = document.getElementById('totalUpgradesCounter');
    if (totalEl) totalEl.textContent = totalUpgradesCounterValue.toLocaleString('uk-UA');

    const onlineEl = document.getElementById('onlineCounter');
    if (onlineEl && Math.random() > 0.7) {
      const currentOnline = parseInt(onlineEl.textContent.replace(/\s/g, '')) || 4821;
      const nextOnline = currentOnline + (Math.floor(Math.random() * 7) - 3);
      onlineEl.textContent = nextOnline.toLocaleString('uk-UA');
    }
  }, 4500);
}

function pushToLiveStream(item, win, chance, userOverride = null, rollVal = null, sourceItem = null) {
  const container = document.getElementById('liveDropsStreamInner');
  if (!container) return;

  let playerUser = userOverride;
  if (!playerUser) {
    if (googleAuth.user) {
      playerUser = {
        name: googleAuth.user.name,
        email: googleAuth.user.email,
        avatar: googleAuth.user.picture,
        verified: true
      };
    } else {
      playerUser = {
        name: 'Ви (You)',
        avatar: 'https://ui-avatars.com/api/?name=You&background=00f0ff&color=000',
        verified: false
      };
    }
  }

  const roll = rollVal !== null ? rollVal : (win ? Math.random() * chance : chance + Math.random() * (100 - chance));

  const card = createDropStreamCard({
    user: playerUser,
    item: item,
    win: win,
    chance: chance,
    roll: roll,
    sourceItem: sourceItem
  });

  container.insertBefore(card, container.firstChild);
  if (container.children.length > 25) {
    container.removeChild(container.lastChild);
  }
}

// ==========================================
// 6. UI RENDER & EVENT HANDLERS
// ==========================================
let wheelInstance = null;
let particleInstance = null;

document.addEventListener('DOMContentLoaded', () => {
  const closeGoogleAuthBtn = document.getElementById('closeGoogleAuthBtn');
  if (closeGoogleAuthBtn) {
    closeGoogleAuthBtn.addEventListener('click', () => {
      const modal = document.getElementById('googleAuthModal');
      if (modal) modal.classList.remove('open');
    });
  }
  wheelInstance = new RadialWheel('radialCanvas');
  particleInstance = new ParticleSystem('particleCanvas');

  initLiveDropStream();
  setupEventListeners();
  updateUi();
});

function setupEventListeners() {
  const soundBtn = document.getElementById('soundToggleBtn');
  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      audio.enabled = !audio.enabled;
      localStorage.setItem(STORAGE_KEYS.SOUND, JSON.stringify(audio.enabled));
      soundBtn.classList.toggle('active', audio.enabled);
      audio.playClick();
    });
  }

  const upgradeBtn = document.getElementById('upgradeBtn');
  if (upgradeBtn) {
    upgradeBtn.addEventListener('click', handleUpgradeClick);
  }

  const dirBtn = document.getElementById('directionToggleBtn');
  if (dirBtn) {
    dirBtn.addEventListener('click', () => {
      state.rollDirection = state.rollDirection === 'under' ? 'over' : 'under';
      dirBtn.textContent = state.rollDirection === 'under' ? '▼ Менше (< Under)' : '▲ Більше (> Over)';
      audio.playClick();
      wheelInstance.draw();
    });
  }

  document.querySelectorAll('.preset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const mult = parseFloat(btn.dataset.mult);
      applyMultiplierPreset(mult);
      audio.playClick();
    });
  });

  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.activeTab = btn.dataset.tab;
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      audio.playClick();
      renderTabContent();
    });
  });

  const searchInput = document.getElementById('itemSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      if (state.activeTab === 'inventory') {
        state.inventoryFilter.search = e.target.value.toLowerCase();
      } else {
        state.catalogFilter.search = e.target.value.toLowerCase();
      }
      renderTabContent();
    });
  }

  const sortSelect = document.getElementById('itemSortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      if (state.activeTab === 'inventory') {
        state.inventoryFilter.sort = e.target.value;
      } else {
        state.catalogFilter.sort = e.target.value;
      }
      renderTabContent();
    });
  }

  document.querySelectorAll('.rarity-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.rarity-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const rarity = pill.dataset.rarity;
      if (state.activeTab === 'inventory') {
        state.inventoryFilter.rarity = rarity;
      } else {
        state.catalogFilter.rarity = rarity;
      }
      audio.playClick();
      renderTabContent();
    });
  });

  const claimFreeBtn = document.getElementById('claimFreeBtn');
  if (claimFreeBtn) {
    claimFreeBtn.addEventListener('click', claimDemoBonus);
  }

  const invClaimBtn = document.getElementById('invClaimBonusBtn');
  if (invClaimBtn) {
    invClaimBtn.addEventListener('click', claimDemoBonus);
  }

  const resetBtn = document.getElementById('invResetBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (confirm('Скинути демонстраційний інвентар та баланс до початкового стану?')) {
        state.resetAll();
        updateUi();
        audio.playClick();
      }
    });
  }

  const profileBtn = document.getElementById('profileBtn');
  const profileModal = document.getElementById('profileModal');
  const closeProfileBtn = document.getElementById('closeProfileBtn');
  if (profileBtn && profileModal) {
    profileBtn.addEventListener('click', () => {
      renderProfileStats();
      profileModal.classList.add('open');
      audio.playClick();
    });
  }
  if (closeProfileBtn && profileModal) {
    closeProfileBtn.addEventListener('click', () => {
      profileModal.classList.remove('open');
    });
  }

  const resultModal = document.getElementById('resultModal');
  const closeResultBtn = document.getElementById('closeResultBtn');
  const resultKeepBtn = document.getElementById('resultKeepBtn');
  const resultUpgradeAgainBtn = document.getElementById('resultUpgradeAgainBtn');

  if (closeResultBtn) {
    closeResultBtn.addEventListener('click', () => resultModal.classList.remove('open'));
  }
  if (resultKeepBtn) {
    resultKeepBtn.addEventListener('click', () => resultModal.classList.remove('open'));
  }
  if (resultUpgradeAgainBtn) {
    resultUpgradeAgainBtn.addEventListener('click', () => {
      resultModal.classList.remove('open');
      if (state.lastWonItem) {
        state.selectedSource = state.lastWonItem;
        state.selectedTarget = null;
        updateUi();
      }
    });
  }

  const closeDropDetailBtn = document.getElementById('closeDropDetailBtn');
  const dropDetailModal = document.getElementById('dropDetailModal');
  if (closeDropDetailBtn && dropDetailModal) {
    closeDropDetailBtn.addEventListener('click', () => {
      dropDetailModal.classList.remove('open');
    });
  }

  window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-backdrop')) {
      e.target.classList.remove('open');
    }
  });
}

function applyMultiplierPreset(multTarget) {
  if (!state.selectedSource) {
    alert('Спочатку оберіть скін із вашого інвентарю ліворуч!');
    return;
  }
  const sourcePrice = state.selectedSource.price;
  const desiredPrice = sourcePrice * multTarget;

  let closest = null;
  let minDiff = Infinity;
  for (const item of ITEM_CATALOG) {
    if (item.price > sourcePrice) {
      const diff = Math.abs(item.price - desiredPrice);
      if (diff < minDiff) {
        minDiff = diff;
        closest = item;
      }
    }
  }

  if (closest) {
    state.selectedTarget = closest;
    updateUi();
  }
}

function claimDemoBonus() {
  audio.playWin();
  const randomItems = [];
  for (let i = 0; i < 3; i++) {
    const item = ITEM_CATALOG[Math.floor(Math.random() * ITEM_CATALOG.length)];
    randomItems.push({ ...item, instanceId: 'inst_' + Date.now() + '_' + i });
  }
  state.inventory.push(...randomItems);
  state.balance += 50.00;
  state.saveInventory();
  state.saveBalance();
  updateUi();
  particleInstance.burst();
  alert('🎁 Демо-бонус отримано! Додано 3 нових скіни з реальними фото та +50.00 DP.');
}

function handleUpgradeClick() {
  if (state.isSpinning) return;
  if (!state.selectedSource) {
    alert('Оберіть предмет зі свого інвентарю для покращення!');
    return;
  }
  if (!state.selectedTarget) {
    alert('Оберіть бажаний предмет із каталогу цілей!');
    return;
  }
  if (state.selectedTarget.price <= state.selectedSource.price) {
    alert('Апгрейд можливий тільки на дорожчий скін! Обрана ціль дешевша або рівна вашому скіну.');
    return;
  }

  const chance = state.calculateChance();
  if (chance <= 0) return;

  const roll = Math.random() * 100;
  let isWin = false;

  if (state.rollDirection === 'under') {
    isWin = roll <= chance;
  } else {
    isWin = roll >= (100 - chance);
  }

  const sourceIndex = state.inventory.findIndex(i => i.instanceId === state.selectedSource.instanceId);
  if (sourceIndex > -1) {
    state.inventory.splice(sourceIndex, 1);
    state.saveInventory();
  }

  wheelInstance.spinTo(roll, () => {
    finishUpgrade(isWin, roll, chance);
  });
}

function finishUpgrade(isWin, roll, chance) {
  const sourceItem = state.selectedSource;
  const targetItem = state.selectedTarget;
  const mult = targetItem.price / sourceItem.price;

  state.stats.total++;
  if (isWin) {
    state.stats.wins++;
    state.stats.totalWonValue += targetItem.price;
    if (mult > state.stats.bestMultiplier) {
      state.stats.bestMultiplier = mult;
    }
    const newWonItem = { ...targetItem, instanceId: 'inst_' + Date.now() };
    state.inventory.unshift(newWonItem);
    state.lastWonItem = newWonItem;
    state.saveInventory();

    audio.playWin();
    particleInstance.burst();
  } else {
    state.stats.losses++;
    state.balance += 1.00;
    state.saveBalance();
    state.lastWonItem = null;

    audio.playFail();
  }

  state.history.unshift({
    timestamp: new Date().toLocaleTimeString(),
    sourceName: sourceItem.name,
    targetName: targetItem.name,
    targetImage: targetItem.image,
    chance: chance,
    roll: roll,
    isWin: isWin
  });
  state.saveStats();
  state.saveHistory();

  pushToLiveStream(targetItem, isWin, chance, null, roll, sourceItem);

  state.selectedSource = null;
  updateUi();

  showResultModal(isWin, targetItem, roll, chance);
}

function showResultModal(isWin, item, roll, chance) {
  const modal = document.getElementById('resultModal');
  const title = document.getElementById('resultStatusTitle');
  const rollInfo = document.getElementById('resultRollInfo');
  const showcase = document.getElementById('resultItemShowcase');
  const svgBox = document.getElementById('resultItemSvgBox');
  const itemName = document.getElementById('resultItemName');
  const itemPrice = document.getElementById('resultItemPrice');
  const upgradeAgainBtn = document.getElementById('resultUpgradeAgainBtn');

  if (isWin) {
    title.textContent = '🎉 УСПІШНИЙ UPGRADE!';
    title.className = 'result-status-title win';
    rollInfo.textContent = `Випало число ${roll.toFixed(2)}% (Шанс був ${chance.toFixed(2)}%)`;
    showcase.className = 'result-item-showcase win';
    upgradeAgainBtn.style.display = 'block';
  } else {
    title.textContent = '❌ НЕ ПОЩАСТИЛО';
    title.className = 'result-status-title fail';
    rollInfo.textContent = `Випало число ${roll.toFixed(2)}% (Потрібно було ${state.rollDirection === 'under' ? '< ' + chance.toFixed(2) : '> ' + (100 - chance).toFixed(2)}%)`;
    showcase.className = 'result-item-showcase fail';
    upgradeAgainBtn.style.display = 'none';
  }

  svgBox.innerHTML = `<img src="${item.image}" alt="${item.name}" class="real-skin-img" />`;
  itemName.textContent = item.name;
  itemPrice.innerHTML = `${item.price.toFixed(2)} <span>DP</span>`;

  modal.classList.add('open');
}

// ==========================================
// 7. RENDER FUNCTIONS
// ==========================================
function updateUi() {
  // STRICT SAFETY ENFORCEMENT: Target must always be more expensive than source!
  if (state.selectedSource && state.selectedTarget) {
    if (state.selectedTarget.price <= state.selectedSource.price) {
      state.selectedTarget = null;
    }
  }
  renderHeader();
  renderHeaderGoogleAuth();
  renderSlots();
  renderRadialCenter();
  renderTabContent();
  if (wheelInstance) wheelInstance.draw();
}

function renderHeader() {
  const balEl = document.getElementById('userBalanceAmount');
  if (balEl) balEl.textContent = state.balance.toFixed(2);

  const soundBtn = document.getElementById('soundToggleBtn');
  if (soundBtn) soundBtn.classList.toggle('active', audio.enabled);

  const upBtn = document.getElementById('upgradeBtn');
  if (upBtn) {
    if (state.isSpinning) {
      upBtn.disabled = true;
      upBtn.classList.add('spinning');
      upBtn.textContent = 'КРУТИТЬСЯ...';
    } else {
      upBtn.classList.remove('spinning');
      if (!state.selectedSource) {
        upBtn.disabled = true;
        upBtn.textContent = 'ОБЕРІТЬ СВІЙ СКІН';
      } else if (!state.selectedTarget) {
        upBtn.disabled = true;
        upBtn.textContent = 'ОБЕРІТЬ БАЖАНУ ЦІЛЬ';
      } else if (state.selectedTarget.price <= state.selectedSource.price) {
        upBtn.disabled = true;
        upBtn.textContent = 'ЦІЛЬ МАЄ БУТИ ДОРОЖЧОЮ';
      } else {
        upBtn.disabled = false;
        upBtn.textContent = 'UPGRADE';
      }
    }
  }
}

function renderSlots() {
  // Source Slot
  const srcContainer = document.getElementById('sourceSlotCard');
  if (srcContainer) {
    if (state.selectedSource) {
      const src = state.selectedSource;
      const rarity = RARITIES[src.rarity] || RARITIES.common;
      srcContainer.className = 'slot-item-card source has-item';
      srcContainer.innerHTML = `
        <div class="active-item-display">
          <span class="item-rarity-tag" style="background: ${rarity.glow}; color: ${rarity.color}; border: 1px solid ${rarity.border};">
            ${rarity.name}
          </span>
          <div class="item-art-preview">
            <img src="${src.image}" alt="${src.name}" class="real-skin-img" />
          </div>
          <div class="item-details-box">
            <h4 class="item-title" title="${src.name}">${src.name}</h4>
            <p class="item-cat">${src.category}</p>
            <div class="item-price-chip">${src.price.toFixed(2)} <span class="unit">DP</span></div>
          </div>
          <button class="slot-action-btn" onclick="clearSourceSlot()">✕ Змінити</button>
        </div>
      `;
    } else {
      srcContainer.className = 'slot-item-card source';
      srcContainer.innerHTML = `
        <div class="empty-placeholder" onclick="switchToInventoryTab()">
          <div class="icon-box">+</div>
          <h4>Твій скін</h4>
          <p>Оберіть скін із власного інвентарю нижче</p>
        </div>
      `;
    }
  }

  // Target Slot
  const tgtContainer = document.getElementById('targetSlotCard');
  if (tgtContainer) {
    if (state.selectedTarget) {
      const tgt = state.selectedTarget;
      const rarity = RARITIES[tgt.rarity] || RARITIES.common;
      tgtContainer.className = 'slot-item-card target has-item';
      tgtContainer.innerHTML = `
        <div class="active-item-display">
          <span class="item-rarity-tag" style="background: ${rarity.glow}; color: ${rarity.color}; border: 1px solid ${rarity.border};">
            ${rarity.name}
          </span>
          <div class="item-art-preview">
            <img src="${tgt.image}" alt="${tgt.name}" class="real-skin-img" />
          </div>
          <div class="item-details-box">
            <h4 class="item-title" title="${tgt.name}">${tgt.name}</h4>
            <p class="item-cat">${tgt.category}</p>
            <div class="item-price-chip">${tgt.price.toFixed(2)} <span class="unit">DP</span></div>
          </div>
          <button class="slot-action-btn" onclick="clearTargetSlot()">✕ Змінити</button>
        </div>
      `;
    } else {
      tgtContainer.className = 'slot-item-card target';
      tgtContainer.innerHTML = `
        <div class="empty-placeholder" onclick="switchToCatalogTab()">
          <div class="icon-box">🎯</div>
          <h4>Бажаний скін</h4>
          <p>Оберіть ціль для отримання з каталогу нижче</p>
        </div>
      `;
    }
  }
}

window.clearSourceSlot = function() {
  if (state.isSpinning) return;
  state.selectedSource = null;
  updateUi();
};

window.clearTargetSlot = function() {
  if (state.isSpinning) return;
  state.selectedTarget = null;
  updateUi();
};

window.switchToInventoryTab = function() {
  const btn = document.querySelector('.tab-btn[data-tab="inventory"]');
  if (btn) btn.click();
  const el = document.getElementById('itemsHubSection');
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

window.switchToCatalogTab = function() {
  const btn = document.querySelector('.tab-btn[data-tab="catalog"]');
  if (btn) btn.click();
  const el = document.getElementById('itemsHubSection');
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

function renderRadialCenter() {
  const chanceValEl = document.getElementById('gaugeChanceValue');
  const multEl = document.getElementById('gaugeMultiplierChip');

  const chance = state.calculateChance();
  const mult = state.calculateMultiplier();

  if (chanceValEl) {
    chanceValEl.textContent = chance > 0 ? `${chance.toFixed(2)}%` : '0.00%';
    chanceValEl.style.color = chance > 50 ? '#00ff88' : (chance > 20 ? '#00f0ff' : '#ffb703');
  }
  if (multEl) {
    multEl.textContent = `x ${mult.toFixed(2)}`;
  }
}

function renderTabContent() {
  const grid = document.getElementById('itemsDisplayGrid');
  const historyContainer = document.getElementById('historyDisplayContainer');
  const invStatsBar = document.getElementById('inventoryStatsBar');

  if (!grid || !historyContainer) return;

  if (state.activeTab === 'history') {
    grid.style.display = 'none';
    if (invStatsBar) invStatsBar.style.display = 'none';
    historyContainer.style.display = 'block';
    renderHistoryTable();
    return;
  }

  historyContainer.style.display = 'none';
  grid.style.display = 'grid';

  if (state.activeTab === 'inventory') {
    if (invStatsBar) invStatsBar.style.display = 'flex';
    renderInventoryCards(grid);
  } else {
    if (invStatsBar) invStatsBar.style.display = 'none';
    renderCatalogCards(grid);
  }
}

function renderInventoryCards(grid) {
  const countEl = document.getElementById('invTotalItemsCount');
  const valueEl = document.getElementById('invTotalValue');
  const totalValue = state.inventory.reduce((acc, cur) => acc + cur.price, 0);

  if (countEl) countEl.textContent = state.inventory.length;
  if (valueEl) valueEl.textContent = totalValue.toFixed(2);

  let filtered = [...state.inventory];
  if (state.inventoryFilter.search) {
    filtered = filtered.filter(i => i.name.toLowerCase().includes(state.inventoryFilter.search));
  }
  if (state.inventoryFilter.rarity !== 'all') {
    filtered = filtered.filter(i => i.rarity === state.inventoryFilter.rarity);
  }
  if (state.inventoryFilter.sort === 'price_desc') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (state.inventoryFilter.sort === 'price_asc') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (state.inventoryFilter.sort === 'name') {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="empty-state-view">
        <h3>Інвентар порожній</h3>
        <p>Натисніть кнопку "+ Отримати Демо-Дроп", щоб додати нові скіни!</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(item => {
    const isSelected = state.selectedSource && state.selectedSource.instanceId === item.instanceId;
    const rarity = RARITIES[item.rarity] || RARITIES.common;
    return `
      <div class="game-item-card ${isSelected ? 'equipped-source' : ''}" style="color: ${rarity.color};" onclick="selectSourceItem('${item.instanceId}')">
        <div class="card-top-meta">
          <span class="card-rarity-badge" style="color: ${rarity.color}; background: ${rarity.glow}; border: 1px solid ${rarity.border};">
            ${rarity.name}
          </span>
          ${isSelected ? '<span class="card-selected-tag">ОБРАНО</span>' : ''}
        </div>
        <div class="card-art-box">
          <img src="${item.image}" alt="${item.name}" class="real-skin-img" loading="lazy" />
        </div>
        <div class="card-info-box">
          <h4 class="card-title" title="${item.name}">${item.name}</h4>
          <p class="card-sub">${item.category}</p>
          <div class="card-bottom-row">
            <div class="card-price">${item.price.toFixed(2)} <span>DP</span></div>
            <button class="card-use-btn">${isSelected ? 'Вибрано' : 'Вибрати'}</button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

window.selectSourceItem = function(instanceId) {
  if (state.isSpinning) return;
  const found = state.inventory.find(i => i.instanceId === instanceId);
  if (found) {
    state.selectedSource = found;
    // If current target is cheaper or equal to new source, clear it (no downgrade)
    if (state.selectedTarget && state.selectedTarget.price <= found.price) {
      state.selectedTarget = null;
    }
    audio.playClick();
    updateUi();
  }
};

function renderCatalogCards(grid) {
  let filtered = [...ITEM_CATALOG];

  // HIDE ALL CHEAPER OR EQUAL SKINS COMPLETELY WHEN A SOURCE ITEM IS SELECTED
  if (state.selectedSource) {
    filtered = filtered.filter(i => i.price > state.selectedSource.price);
  }

  if (state.catalogFilter.search) {
    filtered = filtered.filter(i => i.name.toLowerCase().includes(state.catalogFilter.search));
  }
  if (state.catalogFilter.rarity !== 'all') {
    filtered = filtered.filter(i => i.rarity === state.catalogFilter.rarity);
  }
  if (state.catalogFilter.sort === 'price_desc') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (state.catalogFilter.sort === 'price_asc') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (state.catalogFilter.sort === 'name') {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="empty-state-view">
        <h3>Немає доступних цілей для апгрейду</h3>
        <p>${state.selectedSource ? 'Всі доступні скіни в цьому розділі дешевші за ваш предмет (' + state.selectedSource.price.toFixed(2) + ' DP).' : 'Спробуйте змінити параметри пошуку або фільтри.'}</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(item => {
    const isSelected = state.selectedTarget && state.selectedTarget.id === item.id;
    const rarity = RARITIES[item.rarity] || RARITIES.common;
    const mult = state.selectedSource ? (item.price / state.selectedSource.price).toFixed(2) : null;

    return `
      <div class="game-item-card ${isSelected ? 'equipped-target' : ''}" 
           style="color: ${rarity.color};" 
           onclick="selectTargetItem('${item.id}')">
        <div class="card-top-meta">
          <span class="card-rarity-badge" style="color: ${rarity.color}; background: ${rarity.glow}; border: 1px solid ${rarity.border};">
            ${rarity.name}
          </span>
          ${isSelected ? '<span class="card-selected-tag">ЦІЛЬ</span>' : ''}
          ${mult ? `<span class="card-multiplier-preview">x${mult}</span>` : ''}
        </div>
        <div class="card-art-box">
          <img src="${item.image}" alt="${item.name}" class="real-skin-img" loading="lazy" />
        </div>
        <div class="card-info-box">
          <h4 class="card-title" title="${item.name}">${item.name}</h4>
          <p class="card-sub">${item.category}</p>
          <div class="card-bottom-row">
            <div class="card-price">${item.price.toFixed(2)} <span>DP</span></div>
            <button class="card-use-btn">${isSelected ? 'Ціль обрана' : 'Обрати'}</button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

window.selectTargetItem = function(itemId) {
  if (state.isSpinning) return;
  const found = ITEM_CATALOG.find(i => i.id === itemId);
  if (found) {
    // STRICT RULE: Upgrade target must be strictly more expensive than source item!
    if (state.selectedSource && found.price <= state.selectedSource.price) {
      audio.playFail();
      alert('❌ Неможливо обрати цей скін!\nВаш скін коштує ' + state.selectedSource.price.toFixed(2) + ' DP, а ціль — ' + found.price.toFixed(2) + ' DP.\nАпгрейд можливий ТІЛЬКИ на дорожчий скін!');
      return;
    }
    state.selectedTarget = found;
    audio.playClick();
    updateUi();
  }
};

function renderHistoryTable() {
  const container = document.getElementById('historyDisplayContainer');
  if (!container) return;

  if (state.history.length === 0) {
    container.innerHTML = `
      <div class="empty-state-view">
        <h3>Історія порожня</h3>
        <p>Виконайте свій перший Upgrade у демонстраційній арені вище!</p>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div class="history-table-wrap">
      <table class="history-table">
        <thead>
          <tr>
            <th>Час</th>
            <th>Вхідний скін</th>
            <th>Бажана ціль</th>
            <th>Шанс</th>
            <th>Результат</th>
            <th>Статус</th>
          </tr>
        </thead>
        <tbody>
          ${state.history.map(h => `
            <tr>
              <td style="color: var(--text-dim); font-size: 11px;">${h.timestamp}</td>
              <td style="font-weight: 700;">${h.sourceName}</td>
              <td style="font-weight: 700;">
                <div style="display: inline-flex; align-items: center; gap: 8px;">
                  ${h.targetImage ? `<img src="${h.targetImage}" style="width: 28px; height: 20px; object-fit: contain;" />` : ''}
                  <span>${h.targetName}</span>
                </div>
              </td>
              <td style="color: var(--neon-cyan);">${h.chance.toFixed(2)}%</td>
              <td style="font-variant-numeric: tabular-nums;">${h.roll.toFixed(2)}%</td>
              <td>
                <span class="status-pill ${h.isWin ? 'success' : 'failure'}">
                  ${h.isWin ? '🔥 Виграш' : '❌ Програш'}
                </span>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

function renderProfileStats() {
  const banner = document.getElementById('googleProfileBanner');
  if (banner) {
    if (googleAuth.user) {
      banner.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px;">
          <img src="${googleAuth.user.picture}" style="width: 40px; height: 40px; border-radius: 50%; border: 2px solid #4285f4;" />
          <div>
            <div style="font-weight: 800; color: #fff; font-size: 14px;">${googleAuth.user.name} <span class="google-badge">✓ Google</span></div>
            <div style="font-size: 11px; color: var(--text-dim);">${googleAuth.user.email}</div>
          </div>
        </div>
        <button onclick="window.logoutGoogleAccount()" class="quick-action-btn danger">Вийти</button>
      `;
    } else {
      banner.innerHTML = `
        <div style="font-size: 12px; color: var(--text-muted);">
          🔑 Граєте як <strong>Гість</strong>. Увійдіть через Google для синхронізації акаунта.
        </div>
        <button onclick="triggerGooglePrompt()" class="google-login-btn" style="padding: 4px 10px; font-size: 12px;">
          Увійти
        </button>
      `;
    }
  }
  const total = state.stats.total;
  const wins = state.stats.wins;
  const losses = state.stats.losses;
  const winrate = total > 0 ? ((wins / total) * 100).toFixed(1) : '0.0';

  const totalEl = document.getElementById('statTotalUpgrades');
  const winsEl = document.getElementById('statWins');
  const lossEl = document.getElementById('statLosses');
  const rateEl = document.getElementById('statWinRate');
  const bestMultEl = document.getElementById('statBestMult');
  const wonValEl = document.getElementById('statTotalWonVal');

  if (totalEl) totalEl.textContent = total;
  if (winsEl) winsEl.textContent = wins;
  if (lossEl) lossEl.textContent = losses;
  if (rateEl) rateEl.textContent = `${winrate}%`;
  if (bestMultEl) bestMultEl.textContent = `x${state.stats.bestMultiplier.toFixed(2)}`;
  if (wonValEl) wonValEl.textContent = `${state.stats.totalWonValue.toFixed(2)} DP`;
}


// ==========================================
// GOOGLE AUTHENTICATION MANAGER
// ==========================================
class GoogleAuthManager {
  constructor() {
    this.user = null;
    this.loadUser();
  }

  loadUser() {
    const saved = localStorage.getItem('upgrader_demo_google_user_v10_real_only');
    if (saved) {
      try {
        this.user = JSON.parse(saved);
      } catch(e) {
        this.user = null;
      }
    }
  }

  login(userObj) {
    this.user = userObj;
    localStorage.setItem('upgrader_demo_google_user_v10_real_only', JSON.stringify(userObj));
    updateUi();
    audio.playWin();
    if (particleInstance) particleInstance.burst();
  }

  logout() {
    this.user = null;
    localStorage.removeItem('upgrader_demo_google_user_v10_real_only');
    updateUi();
    audio.playClick();
  }

  decodeJwt(token) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload);
    } catch(e) {
      return null;
    }
  }
}

const googleAuth = new GoogleAuthManager();

// Google GIS Callback
window.onGoogleSignIn = function(response) {
  if (response && response.credential) {
    const payload = googleAuth.decodeJwt(response.credential);
    if (payload) {
      googleAuth.login({
        name: payload.name || 'Google User',
        email: payload.email || 'user@gmail.com',
        picture: payload.picture || 'https://lh3.googleusercontent.com/a/default-user',
        sub: payload.sub
      });
      const modal = document.getElementById('googleAuthModal');
      if (modal) modal.classList.remove('open');
    }
  }
};

function triggerGooglePrompt() {
  const modal = document.getElementById('googleAuthModal');
  if (modal) modal.classList.add('open');
}

// Render Google Auth UI components
function renderHeaderGoogleAuth() {
  const container = document.getElementById('googleHeaderContainer');
  if (!container) return;

  if (googleAuth.user) {
    container.innerHTML = `
      <div class="google-user-chip" id="profileBtn">
        <img src="${googleAuth.user.picture}" class="google-avatar-img" alt="Avatar" onerror="this.src='https://lh3.googleusercontent.com/a/default-user'" />
        <span style="font-size: 13px; font-weight: 700; max-width: 90px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${googleAuth.user.name.split(' ')[0]}</span>
        <span class="google-badge">✓ Google</span>
      </div>
    `;
    const btn = document.getElementById('profileBtn');
    if (btn) {
      btn.addEventListener('click', () => {
        renderProfileStats();
        const pModal = document.getElementById('profileModal');
        if (pModal) pModal.classList.add('open');
        audio.playClick();
      });
    }
  } else {
    container.innerHTML = `
      <button id="googleSignInTriggerBtn" class="google-login-btn">
        <svg width="18" height="18" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
        </svg>
        <span>Увійти через Google</span>
      </button>
    `;
    const triggerBtn = document.getElementById('googleSignInTriggerBtn');
    if (triggerBtn) {
      triggerBtn.addEventListener('click', () => {
        triggerGooglePrompt();
        audio.playClick();
      });
    }
  }
}


// Google 1-Click Login Helper Functions
window.loginWithGoogleAccount = function(name, email) {
  const picture = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=4285F4&color=fff&size=128`;
  googleAuth.login({
    name: name,
    email: email,
    picture: picture,
    sub: 'google_' + Date.now()
  });
  const modal = document.getElementById('googleAuthModal');
  if (modal) modal.classList.remove('open');
};

window.loginWithCustomGoogleEmail = function() {
  const input = document.getElementById('customGoogleEmail');
  if (!input || !input.value.trim()) {
    alert('Будь ласка, введіть свій Google e-mail!');
    return;
  }
  const email = input.value.trim();
  const nameParts = email.split('@')[0].split('.');
  const name = nameParts.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' ');
  window.loginWithGoogleAccount(name, email);
};


// Global window bindings for Google Logout
window.googleAuth = googleAuth;
window.logoutGoogleAccount = function() {
  googleAuth.logout();
  const profileModal = document.getElementById('profileModal');
  if (profileModal) profileModal.classList.remove('open');
};
