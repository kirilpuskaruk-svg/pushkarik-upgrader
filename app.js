/**
 * UPGRADER DEMO - Modern Frontend Logic with Real CS2 Photos
 * 100% DEMO - NO REAL MONEY - NO GAMBLING
 */


function getAuthToken() {
  if (window.googleAuth) {
    if (window.googleAuth.sessionToken) return window.googleAuth.sessionToken;
    if (window.googleAuth.idToken) return window.googleAuth.idToken;
  }
  const sessionToken = localStorage.getItem('pushkarik_session_token');
  if (sessionToken) return sessionToken;
  const savedGoogleToken = localStorage.getItem('upgrader_google_token');
  if (savedGoogleToken) return savedGoogleToken;

  let guestToken = localStorage.getItem('upgrader_guest_token');
  if (!guestToken) {
    guestToken = 'guest_' + Math.random().toString(36).slice(2) + Date.now().toString(36);
    localStorage.setItem('upgrader_guest_token', guestToken);
  }
  return guestToken;
}

async function apiFetch(endpoint, options = {}) {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    ...options.headers
  };
  const response = await fetch(endpoint, { ...options, headers });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Server error');
  return data;
}

function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/[&<>"']/g, function(m) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m];
  });
}


// ==========================================
// UI NOTIFICATIONS & ALERTS
// ==========================================
function showNotification(msg, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = 'toast-message ' + type;
  
  let icon = 'ℹ️';
  if (type === 'error') icon = '❌';
  if (type === 'success') icon = '✅';
  
  toast.innerHTML = '<span>' + icon + '</span><span>' + escapeHtml(msg) + '</span>';
  container.appendChild(toast);
  
  setTimeout(() => toast.classList.add('show'), 10);
  
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}
window.showNotification = showNotification;

function showConfirm(msg) {
  return new Promise((resolve) => {
    let overlay = document.getElementById('custom-confirm-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'custom-confirm-overlay';
      overlay.className = 'custom-confirm-overlay';
      overlay.innerHTML = `
        <div class="custom-confirm-modal">
          <div class="custom-confirm-msg" id="custom-confirm-msg"></div>
          <div class="custom-confirm-btns">
            <button class="btn-no" id="custom-confirm-no">Ні, скасувати</button>
            <button class="btn-yes" id="custom-confirm-yes">Так, підтвердити</button>
          </div>
        </div>
      `;
      document.body.appendChild(overlay);
    }
    
    document.getElementById('custom-confirm-msg').innerText = msg;
    overlay.classList.add('open');
    
    const onYes = () => { cleanup(); resolve(true); };
    const onNo = () => { cleanup(); resolve(false); };
    
    const yesBtn = document.getElementById('custom-confirm-yes');
    const noBtn = document.getElementById('custom-confirm-no');
    
    const cleanup = () => {
      overlay.classList.remove('open');
      yesBtn.removeEventListener('click', onYes);
      noBtn.removeEventListener('click', onNo);
    };
    
    yesBtn.addEventListener('click', onYes);
    noBtn.addEventListener('click', onNo);
  });
}
window.showConfirm = showConfirm;

// ==========================================
// GOOGLE AUTHENTICATION MANAGER
// ==========================================
class GoogleAuthManager {
  constructor() {
    this.user = null;
    this.idToken = null;
    this.sessionToken = null;
    this.handleUrlHashAuth();
    this.loadUser();
  }

  handleUrlHashAuth() {
    try {
      if (window.location.hash && window.location.hash.includes('session=')) {
        const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ''));
        const session = hashParams.get('session');
        const userRaw = hashParams.get('user');
        if (session) {
          this.sessionToken = session;
          localStorage.setItem('pushkarik_session_token', session);
          if (userRaw) {
            try {
              const parsedUser = JSON.parse(decodeURIComponent(userRaw));
              this.user = parsedUser;
              localStorage.setItem('upgrader_demo_google_user_v10_real_only', JSON.stringify(parsedUser));
            } catch(e) {}
          }
          history.replaceState(null, document.title, window.location.pathname + window.location.search);
        }
      }
    } catch (e) {
      console.warn('OAuth Hash parse error:', e);
    }
  }

  loadUser() {
    const saved = localStorage.getItem('upgrader_demo_google_user_v10_real_only');
    const savedToken = localStorage.getItem('upgrader_google_token');
    const savedSession = localStorage.getItem('pushkarik_session_token');
    if (savedSession) {
      this.sessionToken = savedSession;
    }
    if (saved) {
      try {
        this.user = JSON.parse(saved);
        if (savedToken) this.idToken = savedToken;
      } catch(e) {
        this.user = null;
      }
    }
  }

  login(userObj, idToken = null, sessionToken = null) {
    this.user = userObj;
    if (idToken) {
      this.idToken = idToken;
      localStorage.setItem('upgrader_google_token', idToken);
    }
    if (sessionToken) {
      this.sessionToken = sessionToken;
      localStorage.setItem('pushkarik_session_token', sessionToken);
    }
    localStorage.setItem('upgrader_demo_google_user_v10_real_only', JSON.stringify(userObj));
    
    if (typeof state !== 'undefined' && state.syncWithServer) {
      state.syncWithServer().then(() => {
        updateUi();
        audio.playWin();
        if (particleInstance) particleInstance.burst();
      });
    } else {
      updateUi();
    }
  }

  updateProfile(name, picture) {
    if (!this.user) {
      this.user = {
        name: name || 'Демо Гравець',
        email: 'user@upgrader.demo',
        picture: picture || REAL_HUMAN_AVATARS[0],
        sub: 'custom_' + Date.now()
      };
    } else {
      if (name) this.user.name = name;
      if (picture) this.user.picture = picture;
    }
    localStorage.setItem('upgrader_demo_google_user_v10_real_only', JSON.stringify(this.user));
    updateUi();
    audio.playClick();
  }

  async logout() {
    try {
      await fetch('/api/auth/google/logout', { method: 'POST', headers: { 'Authorization': 'Bearer ' + getAuthToken() } });
    } catch(e) {}
    this.user = null;
    this.idToken = null;
    this.sessionToken = null;
    localStorage.removeItem('upgrader_demo_google_user_v10_real_only');
    localStorage.removeItem('upgrader_google_token');
    localStorage.removeItem('pushkarik_session_token');
    if (typeof state !== 'undefined') {
      state.adminMode = false;
      state.isOwner = false;
      state.userRole = 'user';
    }
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
window.googleAuth = googleAuth;


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
  VAULT: 'upgrader_demo_vault_v1_clean',
  BALANCE: 'upgrader_demo_balance_v5_clean',
  STATS: 'upgrader_demo_stats_v5_clean',
  HISTORY: 'upgrader_demo_history_v5_clean',
  SOUND: 'upgrader_demo_sound_v5_clean'
};

class AppState {

  constructor() {
    this.loadState();
    // Auto-select starting items so the user can immediately see and run the upgrade animation
    if (this.inventory && this.inventory.length > 0) {
      this.selectedSource = this.inventory[0];
      const catalog = (typeof ITEM_CATALOG !== 'undefined') ? ITEM_CATALOG : (window.ITEM_CATALOG || []);
      const minPrice = this.selectedSource.price * 1.5;
      this.selectedTarget = catalog.find(i => i.price >= minPrice && i.price <= minPrice * 3) || catalog[6] || null;
    } else {
      this.selectedSource = null;
      this.selectedTarget = null;
    }
    this.isSpinning = false;
    this.rollDirection = 'under';
    this.activeTab = 'inventory';
    this.inventoryFilter = { search: '', rarity: 'all', type: 'all', sort: 'price_desc' };
    this.catalogFilter = { search: '', rarity: 'all', type: 'all', sort: 'price_asc' };
  }

  loadState() {
    // 1. User Inventory (with float & cosmetics enrichment)
    const savedInv = localStorage.getItem(STORAGE_KEYS.INVENTORY);
    if (savedInv !== null) {
      try {
        const parsed = JSON.parse(savedInv);
        if (Array.isArray(parsed)) {
          this.inventory = parsed.map(item => {
            const enriched = typeof enrichWeaponProperties === 'function' ? enrichWeaponProperties(item) : item;
            if (!enriched.instanceId) {
              enriched.instanceId = 'inst_' + (enriched.id || 'item') + '_' + Math.random().toString(36).slice(2, 8);
            }
            return enriched;
          });
        } else {
          this.inventory = [...DEFAULT_USER_INVENTORY].map(item => typeof enrichWeaponProperties === 'function' ? enrichWeaponProperties(item) : item);
          this.saveInventory();
        }
      } catch(e) {
        console.warn('Failed to parse saved inventory:', e);
        this.inventory = [...DEFAULT_USER_INVENTORY].map(item => typeof enrichWeaponProperties === 'function' ? enrichWeaponProperties(item) : item);
        this.saveInventory();
      }
    } else {
      this.inventory = [...DEFAULT_USER_INVENTORY].map(item => typeof enrichWeaponProperties === 'function' ? enrichWeaponProperties(item) : item);
      this.saveInventory();
    }

    // 2. Virtual Vault Inventory
    const savedVault = localStorage.getItem(STORAGE_KEYS.VAULT);
    if (savedVault !== null) {
      try {
        const parsedVault = JSON.parse(savedVault);
        this.vault = Array.isArray(parsedVault) ? parsedVault.map(item => typeof enrichWeaponProperties === 'function' ? enrichWeaponProperties(item) : item) : [];
      } catch(e) {
        this.vault = [];
      }
    } else {
      this.vault = [];
    }

    // 3. Balance
    const savedBal = localStorage.getItem(STORAGE_KEYS.BALANCE);
    this.balance = (savedBal !== null && !isNaN(parseFloat(savedBal))) ? parseFloat(savedBal) : 100.00;

    // Admin Authorization: Strictly server-verified
    this.adminMode = false;
    this.isOwner = false;
    this.userRole = 'user';
    this.authorizedAdmins = [];
    this.adminKeys = [];
    const savedForceWin = localStorage.getItem('upgrader_demo_admin_force_win');
    this.adminForceWin = savedForceWin !== null ? JSON.parse(savedForceWin) : false;

    // 4. Stats
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

    // Temporary Boosters purchased with DP currency from sold vault skins
    try {
      const savedBoosters = localStorage.getItem('pushkarik_active_boosters_v1');
      this.activeBoosters = savedBoosters ? JSON.parse(savedBoosters) : [];
      this.cleanExpiredBoosters();
    } catch(e) {
      this.activeBoosters = [];
    }
  }

  cleanExpiredBoosters() {
    if (!this.activeBoosters) {
      this.activeBoosters = [];
      return;
    }
    const now = Date.now();
    const initialLen = this.activeBoosters.length;
    this.activeBoosters = this.activeBoosters.filter(b => b && b.expiresAt > now);
    if (this.activeBoosters.length !== initialLen) {
      this.saveBoosters();
    }
  }

  saveBoosters() {
    localStorage.setItem('pushkarik_active_boosters_v1', JSON.stringify(this.activeBoosters));
  }

  async syncWithServer() {
    try {
      const data = await apiFetch('/api/user/sync', { method: 'POST' });
      if (data && data.user) {
        this.balance = data.user.balance / 100;
        this.userRole = data.user.role || 'user';
        this.isOwner = Boolean(data.user.isOwner);
        this.adminMode = Boolean(data.user.isAdmin);

/* Server inventory sync disabled to preserve local cosmetics/vault state */
        updateUi();
      }
    } catch(err) {
      console.warn('Sync with server skipped:', err.message);
    }
  }

  saveInventory() {
    try {
      localStorage.setItem(STORAGE_KEYS.INVENTORY, JSON.stringify(this.inventory));
    } catch (e) {
      console.warn('Failed to save inventory to localStorage:', e);
    }
  }
  saveVault() {
    localStorage.setItem(STORAGE_KEYS.VAULT, JSON.stringify(this.vault));
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
    this.vault = [];
    this.balance = 100.00;
    this.stats = { total: 0, wins: 0, losses: 0, bestMultiplier: 1.0, totalWonValue: 0 };
    this.history = [];
    this.activeBoosters = [];
    this.selectedSource = null;
    this.selectedTarget = null;
    this.saveInventory();
    this.saveVault();
    this.saveBalance();
    this.saveStats();
    this.saveHistory();
    this.saveBoosters();
  }

  calculateChance() {
    if (!this.selectedSource || !this.selectedTarget) return 0;
    // Down-grade is physically impossible in an upgrader
    if (this.selectedTarget.price <= this.selectedSource.price) return 0;
    // 100% PURE FAIR MATHEMATICAL RATIO: (Source Price / Target Price) * 100
    let pureChance = (this.selectedSource.price / this.selectedTarget.price) * 100;
    
    // Apply Active Temporary Boosters
    this.cleanExpiredBoosters();
    const luckBooster = (this.activeBoosters || []).find(b => b && b.id === 'booster_luck_10');
    if (luckBooster) {
      pureChance += 10.0; // +10% Chance Booster
    }
    const megaLuckBooster = (this.activeBoosters || []).find(b => b && b.id === 'booster_luck_25');
    if (megaLuckBooster) {
      pureChance += 25.0; // +25% Mega Chance Booster
    }

    return Math.min(Math.max(pureChance, 0.01), 95.00);
  }

  calculateMultiplier() {
    if (!this.selectedSource || !this.selectedTarget) return 1.0;
    if (this.selectedTarget.price <= this.selectedSource.price) return 1.0;
    const mult = this.selectedTarget.price / this.selectedSource.price;
    return Math.max(mult, 1.01);
  }
}

const state = new AppState();
window.state = state;
window.AppState = AppState;


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
    if (!this.canvas) return;
    const parent = this.canvas.parentElement;
    const rect = parent ? parent.getBoundingClientRect() : null;
    const width = (rect && rect.width > 20) ? rect.width : 270;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    this.canvas.width = Math.round(width * dpr);
    this.canvas.height = Math.round(width * dpr);
    if (this.ctx) {
      this.ctx.setTransform(1, 0, 0, 1, 0, 0);
      this.ctx.scale(dpr, dpr);
    }
    this.size = width;
    this.center = width / 2;
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

  startSpin() {
    this.animating = true;
    this.spinState = 'spinning';
    this.spinStartTime = performance.now();
    this.lastFrameTime = performance.now();
    this.lastTickAngle = this.currentAngle;

    const step = (now) => {
      if (!this.animating) return;

      if (this.spinState === 'spinning') {
        const dt = Math.min((now - this.lastFrameTime) / 1000, 0.1);
        this.lastFrameTime = now;
        this.currentAngle = (this.currentAngle + dt * 850) % 3600000;

        if (Math.abs(this.currentAngle - this.lastTickAngle) >= 16) {
          audio.playTick();
          this.lastTickAngle = this.currentAngle;
        }

        this.draw();
        requestAnimationFrame(step);
      } else if (this.spinState === 'stopping') {
        const elapsed = now - this.stopStartTime;
        const progress = Math.min(elapsed / this.stopDuration, 1);
        // Cubic deceleration curve for ultra-smooth realistic friction
        const easedProgress = 1 - Math.pow(1 - progress, 3);

        this.currentAngle = this.stopStartAngle + this.targetDelta * easedProgress;

        if (Math.abs(this.currentAngle - this.lastTickAngle) >= 16) {
          audio.playTick();
          this.lastTickAngle = this.currentAngle;
        }

        this.draw();

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          this.currentAngle = (this.stopStartAngle + this.targetDelta) % 360;
          this.animating = false;
          this.spinState = 'idle';
          this.draw();
          if (typeof this.onStopCallback === 'function') {
            this.onStopCallback();
          }
        }
      }
    };

    requestAnimationFrame(step);
  }

  landOn(finalRollPercentage, onComplete) {
    this.onStopCallback = onComplete;
    const rollAngle = (finalRollPercentage / 100) * 360;
    const currentNorm = this.currentAngle % 360;
    let diff = rollAngle - currentNorm;
    if (diff <= 0) diff += 360;

    this.stopStartAngle = this.currentAngle;
    // 3 complete fast spins + exact landing angle
    this.targetDelta = 3 * 360 + diff;
    this.stopStartTime = performance.now();
    this.stopDuration = 3200;
    this.spinState = 'stopping';
  }

  spinTo(finalRollPercentage, onComplete) {
    this.startSpin();
    setTimeout(() => {
      this.landOn(finalRollPercentage, onComplete);
    }, 400);
  }
}

// ==========================================
// 4. PARTICLE CONFETTI ENGINE
// ==========================================
class ParticleSystem {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
    this.particles = [];
    this.speedParticles = [];
    this.active = false;
    this.speedMode = false;
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth || 1200;
    this.canvas.height = window.innerHeight || 800;
  }

  startSpeed() {
    this.speedMode = true;
    if (!this.active) {
      this.active = true;
      this.loop();
    }
  }

  stopSpeed() {
    this.speedMode = false;
  }

  burst(x, y) {
    this.resize();
    const colors = ['#00ff88', '#00f0ff', '#b026ff', '#ffd700', '#ffffff'];
    for (let i = 0; i < 90; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 12 + 4;
      this.particles.push({
        x: x || (window.innerWidth / 2),
        y: y || (window.innerHeight / 2),
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
    if (!this.active || !this.ctx) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Speed warp particles during active spin
    if (this.speedMode) {
      const cx = (window.innerWidth / 2) || 600;
      const cy = (window.innerHeight / 2) || 400;
      for (let s = 0; s < 3; s++) {
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.random() * 80 + 50;
        this.speedParticles.push({
          x: cx + Math.cos(angle) * dist,
          y: cy + Math.sin(angle) * dist,
          vx: Math.cos(angle) * (Math.random() * 10 + 8),
          vy: Math.sin(angle) * (Math.random() * 10 + 8),
          color: Math.random() > 0.5 ? '#00f0ff' : '#00ff88',
          life: 1.0
        });
      }
    }

    for (let i = this.speedParticles.length - 1; i >= 0; i--) {
      const sp = this.speedParticles[i];
      sp.x += sp.vx;
      sp.y += sp.vy;
      sp.life -= 0.04;
      if (sp.life <= 0) {
        this.speedParticles.splice(i, 1);
        continue;
      }
      this.ctx.save();
      this.ctx.strokeStyle = sp.color;
      this.ctx.globalAlpha = Math.max(sp.life, 0);
      this.ctx.lineWidth = 2;
      this.ctx.beginPath();
      this.ctx.moveTo(sp.x, sp.y);
      this.ctx.lineTo(sp.x - sp.vx * 0.8, sp.y - sp.vy * 0.8);
      this.ctx.stroke();
      this.ctx.restore();
    }

    // Confetti particles
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
      this.ctx.globalAlpha = Math.max(p.life, 0);
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate((p.rotation * Math.PI) / 180);
      this.ctx.fillStyle = p.color;
      this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      this.ctx.restore();
    }

    if (this.particles.length > 0 || this.speedParticles.length > 0 || this.speedMode) {
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
// Real user drops feed only (no bots/mock users)

const REAL_HUMAN_AVATARS = [
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
  'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
  'https://images.unsplash.com/photo-1628157582853-a796fa650a6a?auto=format&fit=crop&w=150&q=80',
  'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80',
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80'
];

let totalUpgradesCounterValue = 0;

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
  const item = syncItemWithCatalog(dropData.item);
  const user = dropData.user;
  const win = dropData.win;
  const chance = dropData.chance;
  const tierClass = getRarityTierClass(item.rarity, item.price);
  
  const div = document.createElement('div');
  div.className = `drop-stream-card ${tierClass}`;
  
  const safeUserName = escapeHtml(user.name);
  const safeUserAvatar = escapeHtml(user.avatar);
  const safeItemName = escapeHtml(item.name);
  const safeItemCat = escapeHtml(item.category);
  const safeItemImg = escapeHtml(item.image);
  const isYou = user.name.includes('(You)') || (googleAuth.user && user.email === googleAuth.user.email);
  
  div.innerHTML = `
    <div class="drop-card-top">
      <div class="drop-chance-badge ${win ? 'win' : 'fail'}">
        <span>${win ? '🔥 WIN' : '❌ FAIL'}</span>
        <span>${chance.toFixed(1)}%</span>
      </div>
    </div>
    
    <div class="drop-card-img-box">
      <img src="${safeItemImg}" alt="${safeItemName}" onerror="if(!this.dataset.fallback){this.dataset.fallback=1;this.src='gungnir.png';}" />
    </div>

    <div class="drop-card-main">
      <div class="drop-skin-title" title="${safeItemName}">${safeItemName}</div>
      <div class="drop-skin-sub">${safeItemCat}</div>
    </div>

    <div class="drop-player-row">
      <img src="${safeUserAvatar}" class="drop-player-avatar" alt="${safeUserName}" onerror="this.src='https://lh3.googleusercontent.com/a/default-user'" />
      <span class="drop-player-name ${isYou ? 'is-you' : ''}">${safeUserName}</span>
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

  const item = syncItemWithCatalog(dropData.item);
  const { user, win, chance, roll, sourceItem } = dropData;
  const rarity = RARITIES[item.rarity] || RARITIES.common;
  const mult = sourceItem ? (item.price / sourceItem.price) : (item.price / Math.max(1, (item.price * (chance / 100))));

  const safeUserName = escapeHtml(user.name);
  const safeUserAvatar = escapeHtml(user.avatar);
  const safeItemName = escapeHtml(item.name);
  const safeItemImg = escapeHtml(item.image);

  const isYou = user.name.includes('(You)') || (googleAuth.user && user.email === googleAuth.user.email);
  let playerInventory = [];

  if (isYou) {
    playerInventory = [...state.inventory];
  } else {
    playerInventory = [item];
  }

  const totalInvValue = playerInventory.reduce((acc, cur) => acc + (cur.price || 0), 0);

  body.innerHTML = `
    <div class="drop-profile-card">
      <img src="${safeUserAvatar}" class="drop-profile-avatar" alt="${safeUserName}" onerror="this.src='https://lh3.googleusercontent.com/a/default-user'" />
      <div>
        <div style="font-weight: 800; font-size: 15px; color: #fff; display: flex; align-items: center; gap: 6px;">
          ${safeUserName} ${user.verified ? '<span class="google-badge">✓ Google Verified</span>' : ''}
        </div>
        <div style="font-size: 11px; color: var(--text-dim); margin-top: 2px;">Гравець PUSHKARIK UPGRADER</div>
      </div>
    </div>

    <div class="drop-showcase-box" style="border-color: ${rarity.color}; box-shadow: 0 0 25px ${rarity.glow};">
      <div style="font-size: 11px; font-weight: 800; color: ${rarity.color}; text-transform: uppercase; margin-bottom: 6px;">
        ${win ? '🔥 ВИГРАНИЙ СКІН' : '❌ СКІН ДРОПУ'} (${rarity.name})
      </div>
      <img src="${safeItemImg}" alt="${safeItemName}" style="max-width: 140px; max-height: 100px; object-fit: contain; filter: drop-shadow(0 6px 12px rgba(0,0,0,0.6));" onerror="if(!this.dataset.fallback){this.dataset.fallback=1;this.src='gungnir.png';}" />
      <h3 style="font-size: 15px; font-weight: 900; color: #fff; margin-top: 10px;">${safeItemName}</h3>
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

    <!-- PLAYER INVENTORY PREVIEW SECTION -->
    <div class="player-inv-section">
      <div class="player-inv-header">
        <div class="player-inv-title">🎒 Інвентар гравця (${playerInventory.length})</div>
        <div class="player-inv-value">Оцінка: ${totalInvValue.toFixed(2)} DP</div>
      </div>
      <div class="player-inv-grid">
        ${playerInventory.map(invItem => {
          const syncedInvItem = syncItemWithCatalog(invItem);
          const skinRarity = RARITIES[syncedInvItem.rarity] || RARITIES.common;
          return `
          <div class="player-inv-card" onclick="tryThisUpgrade('${syncedInvItem.id}')" title="Клікніть щоб апгрейдити ${escapeHtml(syncedInvItem.name)}" style="border-color: ${skinRarity.border}; box-shadow: 0 0 10px ${skinRarity.glow};">
            <img src="${escapeHtml(syncedInvItem.image)}" alt="${escapeHtml(syncedInvItem.name)}" onerror="if(!this.dataset.fallback){this.dataset.fallback=1;this.src='gungnir.png';}" />
            <div class="skin-name" title="${escapeHtml(syncedInvItem.name)}">${escapeHtml(syncedInvItem.name)}</div>
            <div class="skin-price">${syncedInvItem.price.toFixed(2)} DP</div>
          </div>
        `}).join('')}
      </div>
    </div>

    <button onclick="tryThisUpgrade('${item.id}')" class="google-login-btn" style="width: 100%; margin-top: 16px; padding: 12px; font-size: 13px; justify-content: center; background: linear-gradient(135deg, var(--neon-cyan), #00a2ff); color: #000; font-weight: 900; border: none; border-radius: var(--radius-md); box-shadow: 0 4px 15px rgba(0, 240, 255, 0.4); cursor: pointer;">
      🔁 Спробувати апгрейд цього скіна
    </button>
  `;

  modal.classList.add('open');
}

window.tryThisUpgrade = function(itemId) {
  const modal = document.getElementById('dropDetailModal');
  if (modal) modal.classList.remove('open');
  const targetTemplate = ITEM_CATALOG.find(i => i.id === itemId);
  if (targetTemplate && state.selectedSource && targetTemplate.price <= state.selectedSource.price) {
    state.selectedSource = null;
  }
  selectTargetItem(itemId);
  switchToCatalogTab();
};

function syncItemWithCatalog(item) {
  if (!item) return item;
  const match = ITEM_CATALOG.find(c => (item.id && c.id === item.id) || (c.name && item.name && c.name.toLowerCase() === item.name.toLowerCase()));
  if (match) {
    return {
      ...item,
      id: match.id,
      name: match.name,
      image: match.image,
      price: item.price || match.price,
      rarity: match.rarity || item.rarity,
      category: match.category || item.category
    };
  }
  return item;
}

// Real User Live Drops Stream Sync System (Global Cross-Device Realtime + Local Fallback)
const REAL_DROPS_STORAGE_KEY = 'upgrader_demo_real_drops_stream_v18_real_only';
const GLOBAL_NTFY_TOPIC_URL = 'https://ntfy.sh/upgrader_demo_global_stream_v18_real_only';

let realLiveChannel = null;

try {
  if (typeof BroadcastChannel !== 'undefined') {
    realLiveChannel = new BroadcastChannel('upgrader_real_drops_channel');
    realLiveChannel.onmessage = (event) => {
      if (event.data) {
        renderSingleRealDropCard(event.data, true);
      }
    };
  }
} catch(e) {}

// Global Cross-Device Real-Time SSE Listener (Syncs friends across different phones & computers!)
function initGlobalRealtimeStream() {
  fetch(`${GLOBAL_NTFY_TOPIC_URL}/json?poll=1`)
    .then(res => res.text())
    .then(text => {
      if (!text.trim()) return;
      const lines = text.trim().split('\n');
      const fetchedDrops = [];
      lines.forEach(line => {
        try {
          const parsed = JSON.parse(line);
          if (parsed.message) {
            const dropData = JSON.parse(parsed.message);
            fetchedDrops.push(dropData);
          }
        } catch(e) {}
      });
      if (fetchedDrops.length > 0) {
        fetchedDrops.reverse().forEach(d => {
          saveRealDropToHistory(d);
          renderSingleRealDropCard(d, true);
        });
      }
    })
    .catch(() => {});

  try {
    const eventSource = new EventSource(`${GLOBAL_NTFY_TOPIC_URL}/sse`);
    eventSource.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data);
        if (payload.message) {
          const dropData = JSON.parse(payload.message);
          saveRealDropToHistory(dropData);
          renderSingleRealDropCard(dropData, true);
        }
      } catch(e) {}
    };
  } catch(e) {}
}

// Cross-tab storage listener fallback
window.addEventListener('storage', (e) => {
  if (e.key === REAL_DROPS_STORAGE_KEY && e.newValue) {
    try {
      const drops = JSON.parse(e.newValue);
      if (drops.length > 0) {
        renderSingleRealDropCard(drops[0], true);
      }
    } catch(err) {}
  }
});

function getSavedRealDrops() {
  try {
    const data = localStorage.getItem(REAL_DROPS_STORAGE_KEY);
    if (!data) return [];
    const list = JSON.parse(data);
    return list.map(d => ({
      ...d,
      item: syncItemWithCatalog(d.item),
      sourceItem: syncItemWithCatalog(d.sourceItem)
    }));
  } catch(e) {
    return [];
  }
}

function saveRealDropToHistory(dropData) {
  try {
    const list = getSavedRealDrops();
    if (list.some(d => d.timestamp && d.timestamp === dropData.timestamp && d.user.name === dropData.user.name)) {
      return;
    }
    list.unshift(dropData);
    if (list.length > 40) list.pop();
    localStorage.setItem(REAL_DROPS_STORAGE_KEY, JSON.stringify(list));
  } catch(e) {}
}

function renderSingleRealDropCard(dropData, isNew = false) {
  const container = document.getElementById('liveDropsStreamInner');
  if (!container) return;

  const emptyPlaceholder = container.querySelector('.empty-stream-placeholder');
  if (emptyPlaceholder) container.removeChild(emptyPlaceholder);

  if (dropData.timestamp && container.querySelector(`[data-drop-time="${dropData.timestamp}"]`)) {
    return;
  }

  const card = createDropStreamCard(dropData);
  if (dropData.timestamp) {
    card.setAttribute('data-drop-time', dropData.timestamp);
  }

  if (isNew) {
    container.insertBefore(card, container.firstChild);
    if (container.children.length > 30) {
      container.removeChild(container.lastChild);
    }
  } else {
    container.appendChild(card);
  }
}

function initLiveDropStream() {
  const container = document.getElementById('liveDropsStreamInner');
  if (!container) return;

  container.innerHTML = '';
  const savedDrops = getSavedRealDrops();

  if (savedDrops.length === 0) {
    container.innerHTML = `
      <div class="empty-stream-placeholder" style="display: flex; align-items: center; justify-content: center; width: 100%; padding: 10px; color: var(--text-dim); font-size: 13px; gap: 8px;">
        <span>🎯</span> Тут відображаються тільки реальні апгрейди гравців наживо. Зробіть свій перший апгрейд!
      </div>
    `;
  } else {
    savedDrops.forEach(dropData => renderSingleRealDropCard(dropData, false));
  }

  totalUpgradesCounterValue = savedDrops.length;
  const totalEl = document.getElementById('totalUpgradesCounter');
  if (totalEl) totalEl.textContent = totalUpgradesCounterValue.toLocaleString('uk-UA');

  initGlobalRealtimeStream();
}

function pushToLiveStream(item, win, chance, userOverride = null, rollVal = null, sourceItem = null) {
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
        name: 'Гравець (Guest)',
        avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=150&q=80',
        verified: false
      };
    }
  }

  const roll = rollVal !== null ? rollVal : (win ? Math.random() * chance : chance + Math.random() * (100 - chance));

  const dropData = {
    user: playerUser,
    item: item,
    win: win,
    chance: chance,
    roll: roll,
    sourceItem: sourceItem,
    timestamp: Date.now()
  };

  saveRealDropToHistory(dropData);

  if (realLiveChannel) {
    try {
      realLiveChannel.postMessage(dropData);
    } catch(e) {}
  }

  try {
    fetch(GLOBAL_NTFY_TOPIC_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dropData)
    }).catch(() => {});
  } catch(e) {}

  renderSingleRealDropCard(dropData, true);

  // Update total upgrades counter
  totalUpgradesCounterValue++;
  const totalEl = document.getElementById('totalUpgradesCounter');
  if (totalEl) totalEl.textContent = totalUpgradesCounterValue.toLocaleString('uk-UA');
}

// ==========================================
// 6. UI RENDER & EVENT HANDLERS
// ==========================================
let wheelInstance = null;
let particleInstance = null;

function initApp() {
  const closeGoogleAuthBtn = document.getElementById('closeGoogleAuthBtn');
  if (closeGoogleAuthBtn) {
    closeGoogleAuthBtn.addEventListener('click', () => {
      const modal = document.getElementById('googleAuthModal');
      if (modal) modal.classList.remove('open');
    });
  }
  wheelInstance = new RadialWheel('radialCanvas');
  particleInstance = new ParticleSystem('particleCanvas');
  window.wheelInstance = wheelInstance;
  window.particleInstance = particleInstance;

  initLiveDropStream();
  setupEventListeners();
  updateUi();

  // Automatic Server-Side State & Admin Sync
  if (state && typeof state.syncWithServer === 'function') {
    state.syncWithServer().then(() => {
      // Check if user came via direct admin URL: /?admin=true or /admin
      const pathname = (window.location && window.location.pathname) || '';
      const search = (window.location && window.location.search) || '';
      const isDirectAdminUrl = search.includes('admin=true') || 
                               pathname === '/admin' || 
                               pathname.startsWith('/admin/');
      if (isDirectAdminUrl) {
        if (state.adminMode) {
          openAdminPanelModal();
        } else {
          showNotification('🔒 Доступ заборонено! Для перегляду адмінки потрібен обліковий запис адміністратора.', 'info');
        }
      }
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

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

  const gaugeContainer = document.getElementById('gaugeCanvasContainer');
  if (gaugeContainer) {
    gaugeContainer.addEventListener('click', () => {
      if (state.selectedSource && state.selectedTarget && !state.isSpinning) {
        handleUpgradeClick();
      }
    });
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
      if (state.activeTab === 'inventory' || state.activeTab === 'vault') {
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
      if (state.activeTab === 'inventory' || state.activeTab === 'vault') {
        state.inventoryFilter.sort = e.target.value;
      } else {
        state.catalogFilter.sort = e.target.value;
      }
      renderTabContent();
    });
  }

  document.querySelectorAll('.type-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.type-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const cosmeticType = pill.dataset.type;
      if (state.activeTab === 'inventory' || state.activeTab === 'vault') {
        state.inventoryFilter.type = cosmeticType;
      } else {
        state.catalogFilter.type = cosmeticType;
      }
      audio.playClick();
      renderTabContent();
    });
  });

  document.querySelectorAll('.rarity-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.rarity-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const rarity = pill.dataset.rarity;
      if (state.activeTab === 'inventory' || state.activeTab === 'vault') {
        state.inventoryFilter.rarity = rarity;
      } else {
        state.catalogFilter.rarity = rarity;
      }
      audio.playClick();
      renderTabContent();
    });
  });

  const closeInspectBtn = document.getElementById('closeInspectModalBtn');
  const inspectModal = document.getElementById('itemInspectModal');
  if (closeInspectBtn && inspectModal) {
    closeInspectBtn.addEventListener('click', () => inspectModal.classList.remove('open'));
  }

  const closeCustomizeBtn = document.getElementById('closeCustomizeModalBtn');
  const customizeModal = document.getElementById('weaponCustomizeModal');
  if (closeCustomizeBtn && customizeModal) {
    closeCustomizeBtn.addEventListener('click', () => customizeModal.classList.remove('open'));
  }

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
    resetBtn.addEventListener('click', async () => {
      if (await showConfirm('Скинути демонстраційний інвентар та баланс до початкового стану?')) {
        state.resetAll();
        updateUi();
        audio.playClick();
      }
    });
  }

  const invWithdrawAllBtn = document.getElementById('invWithdrawAllBtn');
  if (invWithdrawAllBtn) {
    invWithdrawAllBtn.addEventListener('click', () => {
      window.withdrawAllToVault();
    });
  }

  const vaultReturnAllBtn = document.getElementById('vaultReturnAllBtn');
  if (vaultReturnAllBtn) {
    vaultReturnAllBtn.addEventListener('click', () => {
      window.returnAllFromVault();
    });
  }

  const vaultSellAllBtn = document.getElementById('vaultSellAllBtn');
  if (vaultSellAllBtn) {
    vaultSellAllBtn.addEventListener('click', () => {
      window.sellAllSkinsFromVault();
    });
  }

  const openBoosterShopBtn = document.getElementById('openBoosterShopBtn');
  if (openBoosterShopBtn) {
    openBoosterShopBtn.addEventListener('click', () => {
      window.openBoosterShopModal();
    });
  }

  const closeBoosterShopBtn = document.getElementById('closeBoosterShopBtn');
  const boosterShopModal = document.getElementById('boosterShopModal');
  if (closeBoosterShopBtn && boosterShopModal) {
    closeBoosterShopBtn.addEventListener('click', () => {
      boosterShopModal.classList.remove('open');
    });
  }

  const profileModal = document.getElementById('profileModal');
  const profileEditModal = document.getElementById('profileEditModal');
  const closeProfileBtn = document.getElementById('closeProfileBtn');
  const closeProfileModalBtn = document.getElementById('closeProfileModalBtn');
  if (closeProfileBtn && profileModal) {
    closeProfileBtn.addEventListener('click', () => {
      profileModal.classList.remove('open');
    });
  }
  if (closeProfileModalBtn && profileEditModal) {
    closeProfileModalBtn.addEventListener('click', () => {
      profileEditModal.classList.remove('open');
    });
  }

  const resultModal = document.getElementById('resultModal');
  const closeResultBtn = document.getElementById('closeResultBtn');
  const resultKeepBtn = document.getElementById('resultKeepBtn');
  const resultWithdrawBtn = document.getElementById('resultWithdrawBtn');
  const resultUpgradeAgainBtn = document.getElementById('resultUpgradeAgainBtn');

  if (closeResultBtn) {
    closeResultBtn.addEventListener('click', () => resultModal.classList.remove('open'));
  }
  if (resultKeepBtn) {
    resultKeepBtn.addEventListener('click', () => resultModal.classList.remove('open'));
  }
  if (resultWithdrawBtn) {
    resultWithdrawBtn.addEventListener('click', () => {
      resultModal.classList.remove('open');
      if (state.lastWonItem) {
        window.withdrawItemToVault(state.lastWonItem.instanceId);
      }
    });
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

  const closeDemoPackBtn = document.getElementById('closeDemoPackBtn');
  const demoPackModal = document.getElementById('demoPackModal');
  if (closeDemoPackBtn && demoPackModal) {
    closeDemoPackBtn.addEventListener('click', () => {
      demoPackModal.classList.remove('open');
    });
  }

  const closeWithdrawModalBtn = document.getElementById('closeWithdrawModalBtn');
  const vaultWithdrawModal = document.getElementById('vaultWithdrawModal');
  if (closeWithdrawModalBtn && vaultWithdrawModal) {
    closeWithdrawModalBtn.addEventListener('click', () => {
      vaultWithdrawModal.classList.remove('open');
    });
  }

  const adminPanelBtn = document.getElementById('adminPanelBtn');
  const adminModal = document.getElementById('adminModal');
  const closeAdminModalBtn = document.getElementById('closeAdminModalBtn');
  if (adminPanelBtn) {
    adminPanelBtn.addEventListener('click', () => {
      openAdminPanelModal();
    });
  }
  if (closeAdminModalBtn && adminModal) {
    closeAdminModalBtn.addEventListener('click', () => {
      adminModal.classList.remove('open');
    });
  }

  // KEYBOARD SHORTCUT: Ctrl + Shift + A opens Admin Panel!
  window.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a' || e.key === 'Ф' || e.key === 'ф')) {
      e.preventDefault();
      openAdminPanelModal();
    }
  });

  window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-backdrop')) {
      e.target.classList.remove('open');
    }
  });
}

function applyMultiplierPreset(multTarget) {
  if (!state.selectedSource) {
    showNotification('Спочатку оберіть скін із вашого інвентарю ліворуч!', 'info');
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
  const grantLocalBonus = () => {
    const catalog = (typeof ITEM_CATALOG !== 'undefined') ? ITEM_CATALOG : (window.ITEM_CATALOG || []);
    const budgetSkins = catalog.filter(i => i.rarity === 'common');
    const template = (budgetSkins.length > 0 && Math.random() < 0.85) 
      ? budgetSkins[Math.floor(Math.random() * budgetSkins.length)] 
      : (catalog[Math.floor(Math.random() * catalog.length)] || DEFAULT_USER_INVENTORY[0]);
    
    if (!template) return;
    const newItem = {
      ...template,
      instanceId: 'inst_bonus_' + Date.now() + '_' + Math.random().toString(36).substring(7)
    };
    state.inventory.unshift(newItem);
    state.balance += 50.00;
    state.saveInventory();
    state.saveBalance();
    updateUi();
    audio.playWin();
    if (particleInstance) particleInstance.burst();
    openDemoPackModal(newItem);
  };

  apiFetch('/api/game/claim-bonus', {
    method: 'POST',
    body: JSON.stringify({ idempotencyKey: 'bon_' + Date.now() + Math.random() })
  }).then(async (data) => {
    if (data && data.item) {
      await state.syncWithServer();
      audio.playWin();
      if (particleInstance) particleInstance.burst();
      let newItem = state.inventory.find(i => i.db_id === data.item.db_id);
      if (!newItem) {
        const catalog = (typeof ITEM_CATALOG !== 'undefined') ? ITEM_CATALOG : (window.ITEM_CATALOG || []);
        const catItem = catalog.find(i => i.id === data.item.id);
        if (catItem) {
          newItem = {
            ...catItem,
            db_id: data.item.db_id,
            instanceId: 'inst_bon_' + Date.now()
          };
          state.inventory.unshift(newItem);
          state.saveInventory();
        }
      }
      if (newItem) openDemoPackModal(newItem);
      else grantLocalBonus();
    } else {
      grantLocalBonus();
    }
  }).catch(() => {
    grantLocalBonus();
  });
}

function openDemoPackModal(droppedItem) {
  const modal = document.getElementById('demoPackModal');
  const body = document.getElementById('demoPackModalBody');
  if (!modal || !body) return;

  const rarity = RARITIES[droppedItem.rarity] || RARITIES.common;
  const safeName = escapeHtml(droppedItem.name);
  const safeImg = escapeHtml(droppedItem.image);
  const safeInstId = escapeHtml(droppedItem.instanceId);

  body.innerHTML = `
    <div style="margin-bottom: 12px; font-size: 12px; font-weight: 800; color: var(--neon-amber);">
      🎉 Твій Демо-Пак успішно відкрито!
    </div>

    <div class="drop-showcase-box" style="border-color: ${rarity.color}; box-shadow: 0 0 30px ${rarity.glow}; padding: 24px;">
      <div style="font-size: 11px; font-weight: 800; color: ${rarity.color}; text-transform: uppercase; margin-bottom: 8px;">
        ${droppedItem.rarity === 'common' ? '💩 ФІГНЯ З ДЕМО-ПАКУ' : '🎁 ДЕМО-ДРОП'} (${rarity.name})
      </div>
      <div style="margin: 14px 0;">
        <img src="${safeImg}" alt="${safeName}" style="max-width: 170px; max-height: 115px; object-fit: contain; filter: drop-shadow(0 8px 16px rgba(0,0,0,0.7));" onerror="if(!this.dataset.fallback){this.dataset.fallback=1;this.src='gungnir.png';}" />
      </div>
      <h3 style="font-size: 16px; font-weight: 900; color: #fff; margin-top: 10px;">${safeName}</h3>
      <div style="font-size: 14px; font-weight: 800; color: var(--neon-green); margin-top: 4px;">Вартість: ${droppedItem.price.toFixed(2)} DP</div>
    </div>

    <div style="background: rgba(0, 255, 136, 0.08); border: 1px solid rgba(0, 255, 136, 0.3); padding: 10px 14px; border-radius: var(--radius-md); margin-bottom: 16px; font-size: 13px; font-weight: 700; color: var(--neon-green);">
      ⚡ Бонус +50.00 DP додано на ваш баланс!
    </div>

    <div style="display: flex; gap: 10px;">
      <button onclick="document.getElementById('demoPackModal').classList.remove('open')" class="modal-btn secondary" style="flex: 1;">
        🎒 В інвентар
      </button>
      <button onclick="upgradeDroppedPackItem('${safeInstId}')" class="modal-btn primary" style="flex: 1.2;">
        ⚡ Апгрейдити скін ➔
      </button>
    </div>
  `;

  modal.classList.add('open');
}

window.upgradeDroppedPackItem = function(instanceId) {
  const modal = document.getElementById('demoPackModal');
  if (modal) modal.classList.remove('open');
  selectSourceItem(instanceId);
  switchToCatalogTab();
};

// Secure native CSPRNG reference captured at script load time (Anti-DevTools Tampering)
const _nativeGetRandomValues = (window.crypto && window.crypto.getRandomValues)
  ? window.crypto.getRandomValues.bind(window.crypto)
  : null;

function getSecureRoll() {
  if (_nativeGetRandomValues) {
    const array = new Uint32Array(1);
    _nativeGetRandomValues(array);
    return (array[0] / 4294967296) * 100;
  }
  return Math.random() * 100;
}

// Anti-Cheat / Anti-Bot Rate Limiting & Detection System
let _lastUpgradeTime = 0;
let _botAttempts = 0;
let _isBanned = false;


async function handleUpgradeClick(e) {
  if (state.isSpinning) return;

  // Auto-select starting items if user clicked without selecting
  if (!state.selectedSource && state.inventory && state.inventory.length > 0) {
    state.selectedSource = state.inventory[0];
  }
  if (!state.selectedTarget) {
    const catalog = (typeof ITEM_CATALOG !== 'undefined') ? ITEM_CATALOG : (window.ITEM_CATALOG || []);
    const minPrice = state.selectedSource ? state.selectedSource.price * 1.5 : 10;
    state.selectedTarget = catalog.find(i => i.price >= minPrice && i.price <= minPrice * 3) || catalog[6] || null;
  }

  if (!state.selectedSource || !state.selectedTarget) {
    showNotification('Оберіть предмети для апгрейду!', 'info');
    return;
  }
  if (state.selectedTarget.price <= state.selectedSource.price) {
    showNotification('Апгрейд можливий тільки на дорожчий скін!', 'info');
    return;
  }

  state.isSpinning = true;
  updateUi();
  audio.playClick();
  if (particleInstance) particleInstance.startSpeed();

  // 1. START WHEEL ROTATING IMMEDIATELY! (0ms delay!)
  wheelInstance.startSpin();

  // 2. Initial roll prediction for zero-latency start
  const chance = state.calculateChance();
  let roll = Math.floor(Math.random() * 10000) / 100;
  if (state.adminMode && state.adminForceWin) {
    roll = state.rollDirection === 'under' ? Math.max(0, chance - 1.0) : Math.min(99.99, (100 - chance) + 1.0);
  }
  let isWin = state.rollDirection === 'under' ? (roll <= chance) : (roll >= (100 - chance));
  let finalData = {
    isWin,
    roll,
    chance,
    resultItem: isWin ? state.selectedTarget.id : null
  };

  // 3. Authoritative server sync in background (wheel spins while waiting, never freezing)
  const serverPromise = apiFetch('/api/game/upgrade', {
    method: 'POST',
    body: JSON.stringify({
      sourceItemId: state.selectedSource.id,
      targetItemCatalogId: state.selectedTarget.id,
      direction: state.rollDirection,
      idempotencyKey: 'upg_' + Date.now() + Math.random().toString(36).substring(7),
      clientBoosters: (state.activeBoosters || []).map(b => b && b.id).filter(Boolean)
    })
  }).then(srvRes => {
    if (srvRes && typeof srvRes.roll === 'number') {
      finalData.roll = srvRes.roll;
      finalData.isWin = srvRes.isWin;
      finalData.chance = srvRes.chance || chance;
      finalData.resultItem = srvRes.resultItem;
      finalData.shieldUsed = srvRes.shieldUsed;
    }
  }).catch(() => {});

  // 4. Smoothly decelerate to final authoritative roll
  setTimeout(async () => {
    try {
      await Promise.race([serverPromise, new Promise(r => setTimeout(r, 600))]);
    } catch(e) {}

    wheelInstance.landOn(finalData.roll, () => {
      state.isSpinning = false;
      if (particleInstance) particleInstance.stopSpeed();
      finishUpgrade(finalData.isWin, finalData.roll, finalData.chance, finalData);
    });
  }, 700);
}
window.handleUpgradeClick = handleUpgradeClick;
window.finishUpgrade = finishUpgrade;

function finishUpgrade(isWin, roll, chance, serverData) {
  window.finishUpgrade = finishUpgrade;
  const sourceItem = state.selectedSource;
  const targetItem = state.selectedTarget;
  const mult = targetItem ? (targetItem.price / (sourceItem ? sourceItem.price : 1)) : 1.0;

  state.stats.total++;
  if (isWin) {
    state.stats.wins++;
    state.stats.totalWonValue += (targetItem ? targetItem.price : 0);
    if (mult > state.stats.bestMultiplier) {
      state.stats.bestMultiplier = mult;
    }
    audio.playWin();
    if (particleInstance) particleInstance.burst();

    // 1. Remove source item from local inventory first
    if (sourceItem) {
      const idx = state.inventory.findIndex(i => {
        if (sourceItem.instanceId && i.instanceId) return i.instanceId === sourceItem.instanceId;
        return i.id === sourceItem.id;
      });
      if (idx !== -1) state.inventory.splice(idx, 1);
    }

    // 2. Add won target item to local inventory
    if (targetItem) {
      const wonSkin = {
        ...targetItem,
        instanceId: 'inst_' + Date.now() + '_' + Math.random().toString(36).substring(7)
      };
      if (typeof enrichWeaponProperties === 'function') {
        enrichWeaponProperties(wonSkin);
      }
      state.inventory.unshift(wonSkin);
    }

    state.saveInventory();
  } else {
    state.stats.losses++;
    audio.playFail();
    if (serverData && serverData.shieldUsed) {
      showNotification('Shield used: Item preserved!', 'success');
    } else {
      // Remove source item on loss
      if (sourceItem) {
        const idx = state.inventory.findIndex(i => {
          if (sourceItem.instanceId && i.instanceId) return i.instanceId === sourceItem.instanceId;
          return i.id === sourceItem.id;
        });
        if (idx !== -1) state.inventory.splice(idx, 1);
        state.saveInventory();
      }
    }
  }
  state.saveStats();

  state.history.unshift({
    timestamp: new Date().toLocaleTimeString(),
    sourceName: sourceItem ? sourceItem.name : 'Unknown',
    targetName: targetItem ? targetItem.name : 'Unknown',
    targetImage: targetItem ? targetItem.image : '',
    chance: chance,
    roll: roll,
    isWin: isWin
  });
  state.saveHistory();

  pushToLiveStream(targetItem, isWin, chance, null, roll, sourceItem);

  state.selectedSource = null;
  updateUi();

  showResultModal(isWin, targetItem, roll, chance, null);
}

function showResultModal(isWin, item, roll, chance, consolationItem = null) {
  const modal = document.getElementById('resultModal');
  const title = document.getElementById('resultStatusTitle');
  const rollInfo = document.getElementById('resultRollInfo');
  const showcase = document.getElementById('resultItemShowcase');
  const svgBox = document.getElementById('resultItemSvgBox');
  const itemName = document.getElementById('resultItemName');
  const itemPrice = document.getElementById('resultItemPrice');
  const withdrawBtn = document.getElementById('resultWithdrawBtn');
  const keepBtn = document.getElementById('resultKeepBtn');
  const upgradeAgainBtn = document.getElementById('resultUpgradeAgainBtn');

  const safeImg = escapeHtml(item.image);
  const safeItemName = item.name;

  if (isWin) {
    title.textContent = '🎉 УСПІШНИЙ UPGRADE!';
    title.className = 'result-status-title win';
    rollInfo.innerHTML = `Випало число <strong>${roll.toFixed(2)}%</strong> (Шанс був ${chance.toFixed(2)}%)`;
    showcase.className = 'result-item-showcase win';
    svgBox.innerHTML = `<img src="${safeImg}" alt="${escapeHtml(safeItemName)}" class="real-skin-img" onerror="if(!this.dataset.fallback){this.dataset.fallback=1;this.src='gungnir.png';}" />`;
    itemName.textContent = safeItemName;
    itemPrice.innerHTML = `${item.price.toFixed(2)} <span>DP</span>`;
    if (upgradeAgainBtn) {
      upgradeAgainBtn.style.display = 'block';
      upgradeAgainBtn.textContent = 'Апгрейдити виграний скін ➔';
    }
    if (withdrawBtn) withdrawBtn.style.display = 'block';
    if (keepBtn) keepBtn.textContent = '🎒 В інвентар';
  } else if (consolationItem) {
    const safeConsolationImg = escapeHtml(consolationItem.image);
    title.textContent = '💔 ПРОГРАШ, АЛЕ ВІДКРИВСЯ КЕЙС УТІШЕННЯ!';
    title.className = 'result-status-title fail';
    
    rollInfo.innerHTML = `Випало число <strong>${roll.toFixed(2)}%</strong> (Потрібно було ${state.rollDirection === 'under' ? '< ' + chance.toFixed(2) : '> ' + (100 - chance).toFixed(2)}%)<br/><span style="color: var(--neon-cyan); font-weight: 800;">🎁 Бонусний кейс утішення подарував вам: ${escapeHtml(consolationItem.name)}!</span>`;
    showcase.className = 'result-item-showcase win';
    svgBox.innerHTML = `<img src="${safeConsolationImg}" alt="${escapeHtml(consolationItem.name)}" class="real-skin-img" onerror="if(!this.dataset.fallback){this.dataset.fallback=1;this.src='gungnir.png';}" />`;
    itemName.textContent = `🎁 ДРОП З КЕЙСУ УТІШЕННЯ: ${consolationItem.name}`;
    itemPrice.innerHTML = `${consolationItem.price.toFixed(2)} <span>DP</span>`;
    if (upgradeAgainBtn) {
      upgradeAgainBtn.style.display = 'block';
      upgradeAgainBtn.textContent = '⚡ Апгрейдити скін з кейсу утішення ➔';
    }
    if (withdrawBtn) withdrawBtn.style.display = 'block';
    if (keepBtn) keepBtn.textContent = '🎒 В інвентар';
  } else {
    title.textContent = '❌ НЕ ПОЩАСТИЛО';
    title.className = 'result-status-title fail';
    rollInfo.innerHTML = `Випало число <strong>${roll.toFixed(2)}%</strong> (Потрібно було ${state.rollDirection === 'under' ? '< ' + chance.toFixed(2) : '> ' + (100 - chance).toFixed(2)}%)`;
    showcase.className = 'result-item-showcase fail';
    svgBox.innerHTML = `<img src="${safeImg}" alt="${escapeHtml(safeItemName)}" class="real-skin-img" onerror="if(!this.dataset.fallback){this.dataset.fallback=1;this.src='gungnir.png';}" />`;
    itemName.textContent = safeItemName;
    itemPrice.innerHTML = `${item.price.toFixed(2)} <span>DP</span>`;
    if (upgradeAgainBtn) upgradeAgainBtn.style.display = 'none';
    if (withdrawBtn) withdrawBtn.style.display = 'none';
    if (keepBtn) keepBtn.textContent = 'Закрити';
  }

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
  renderActiveBoosters();
  renderTabContent();
  if (wheelInstance) wheelInstance.draw();
}

function renderHeader() {
  const balEl = document.getElementById('userBalanceAmount');
  if (balEl) balEl.textContent = state.balance.toFixed(2);

  const soundBtn = document.getElementById('soundToggleBtn');
  if (soundBtn) soundBtn.classList.toggle('active', audio.enabled);

  const adminBtn = document.getElementById('adminPanelBtn');
  if (adminBtn) {
    adminBtn.style.display = state.adminMode ? 'inline-flex' : 'none';
  }

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
      const safeName = escapeHtml(src.name);
      const safeCat = escapeHtml(src.category);
      const safeImg = escapeHtml(src.image);
      srcContainer.className = 'slot-item-card source has-item';
      srcContainer.innerHTML = `
        <div class="active-item-display">
          <span class="item-rarity-tag" style="background: ${rarity.glow}; color: ${rarity.color}; border: 1px solid ${rarity.border};">
            ${rarity.name}
          </span>
          <div class="item-art-preview">
            <img src="${safeImg}" alt="${safeName}" class="real-skin-img" onerror="if(!this.dataset.fallback){this.dataset.fallback=1;this.src='gungnir.png';}" />
          </div>
          <div class="item-details-box">
            <h4 class="item-title" title="${safeName}">${safeName}</h4>
            <p class="item-cat">${safeCat}</p>
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
      const safeName = escapeHtml(tgt.name);
      const safeCat = escapeHtml(tgt.category);
      const safeImg = escapeHtml(tgt.image);
      tgtContainer.className = 'slot-item-card target has-item';
      tgtContainer.innerHTML = `
        <div class="active-item-display">
          <span class="item-rarity-tag" style="background: ${rarity.glow}; color: ${rarity.color}; border: 1px solid ${rarity.border};">
            ${rarity.name}
          </span>
          <div class="item-art-preview">
            <img src="${safeImg}" alt="${safeName}" class="real-skin-img" onerror="if(!this.dataset.fallback){this.dataset.fallback=1;this.src='gungnir.png';}" />
          </div>
          <div class="item-details-box">
            <h4 class="item-title" title="${safeName}">${safeName}</h4>
            <p class="item-cat">${safeCat}</p>
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
  const hintEl = document.getElementById('gaugeClickHint');
  if (hintEl) {
    if (state.selectedSource && state.selectedTarget && state.selectedTarget.price > state.selectedSource.price && !state.isSpinning) {
      hintEl.style.display = 'block';
    } else {
      hintEl.style.display = 'none';
    }
  }
}

function renderTabContent() {
  const grid = document.getElementById('itemsDisplayGrid');
  const historyContainer = document.getElementById('historyDisplayContainer');
  const invStatsBar = document.getElementById('inventoryStatsBar');
  const vaultStatsBar = document.getElementById('vaultStatsBar');

  if (!grid || !historyContainer) return;

  if (state.activeTab === 'history') {
    grid.style.display = 'none';
    if (invStatsBar) invStatsBar.style.display = 'none';
    if (vaultStatsBar) vaultStatsBar.style.display = 'none';
    historyContainer.style.display = 'block';
    renderHistoryTable();
    return;
  }

  const casesContainer = document.getElementById('casesDisplayContainer');
  if (casesContainer) casesContainer.style.display = 'none';

  if (state.activeTab === 'cases') {
    grid.style.display = 'none';
    if (invStatsBar) invStatsBar.style.display = 'none';
    if (vaultStatsBar) vaultStatsBar.style.display = 'none';
    historyContainer.style.display = 'none';
    if (casesContainer) {
      casesContainer.style.display = 'grid';
      renderCasesShop();
    }
    return;
  }

  historyContainer.style.display = 'none';
  const cc = document.getElementById('casesDisplayContainer');
  if(cc) cc.style.display = 'none';
  grid.style.display = 'grid';

  if (state.activeTab === 'inventory') {
    if (invStatsBar) invStatsBar.style.display = 'flex';
    if (vaultStatsBar) vaultStatsBar.style.display = 'none';
    renderInventoryCards(grid);
  } else if (state.activeTab === 'vault') {
    if (invStatsBar) invStatsBar.style.display = 'none';
    if (vaultStatsBar) vaultStatsBar.style.display = 'flex';
    renderVaultCards(grid);
  } else {
    if (invStatsBar) invStatsBar.style.display = 'none';
    if (vaultStatsBar) vaultStatsBar.style.display = 'none';
    renderCatalogCards(grid);
  }
}

function filterItemsList(items, filterState) {
  let list = [...items];
  if (filterState.search) {
    const q = filterState.search.toLowerCase();
    list = list.filter(i => (i.name && i.name.toLowerCase().includes(q)) || (i.category && i.category.toLowerCase().includes(q)) || (i.weapon && i.weapon.toLowerCase().includes(q)));
  }
  if (filterState.rarity !== 'all') {
    list = list.filter(i => i.rarity === filterState.rarity);
  }
  if (filterState.type && filterState.type !== 'all') {
    if (filterState.type === 'knife_gloves') {
      list = list.filter(i => {
        const b = typeof getItemBroadType === 'function' ? getItemBroadType(i) : '';
        return b === 'knife' || b === 'gloves';
      });
    } else {
      list = list.filter(i => {
        const b = typeof getItemBroadType === 'function' ? getItemBroadType(i) : '';
        return b === filterState.type;
      });
    }
  }
  if (filterState.sort === 'price_desc') {
    list.sort((a, b) => b.price - a.price);
  } else if (filterState.sort === 'price_asc') {
    list.sort((a, b) => a.price - b.price);
  } else if (filterState.sort === 'name') {
    list.sort((a, b) => a.name.localeCompare(b.name));
  } else if (filterState.sort === 'float_asc') {
    list.sort((a, b) => (typeof a.float === 'number' ? a.float : 1) - (typeof b.float === 'number' ? b.float : 1));
  }
  return list;
}

function renderInventoryCards(grid) {
  const countEl = document.getElementById('invTotalItemsCount');
  const vaultBadge = document.getElementById('vaultTotalItemsCount');
  const valueEl = document.getElementById('invTotalValue');
  const totalValue = state.inventory.reduce((acc, cur) => acc + cur.price, 0);

  if (countEl) countEl.textContent = state.inventory.length;
  if (vaultBadge) vaultBadge.textContent = (state.vault || []).length;
  if (valueEl) valueEl.textContent = totalValue.toFixed(2);

  const filtered = filterItemsList(state.inventory, state.inventoryFilter);

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="empty-state-view">
        <h3>Предметів не знайдено</h3>
        <p>Спробуйте змінити фільтр або пошуковий запит, або натисніть "+ Отримати Демо-Дроп"!</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(item => {
    const isSelected = state.selectedSource && state.selectedSource.instanceId === item.instanceId;
    const rarity = RARITIES[item.rarity] || RARITIES.common;
    const safeName = escapeHtml(item.name);
    const safeCat = escapeHtml(item.category);
    const safeImg = escapeHtml(item.image);
    const safeInstId = escapeHtml(item.instanceId);
    const broadType = typeof getItemBroadType === 'function' ? getItemBroadType(item) : 'weapon';

    const stickersHtml = (item.appliedStickers || []).map(s => `
      <img src="${escapeHtml(s.image)}" title="${escapeHtml(s.name)}" class="mini-cosmetic-sticker" alt="Sticker" onerror="this.style.display='none'" />
    `).join('');

    const charmHtml = item.attachedCharm ? `
      <img src="${escapeHtml(item.attachedCharm.image)}" title="${escapeHtml(item.attachedCharm.name)}" class="mini-cosmetic-charm" alt="Charm" onerror="this.style.display='none'" />
    ` : '';

    return `
      <div class="game-item-card ${isSelected ? 'equipped-source' : ''}" style="color: ${rarity.color};" onclick="selectSourceItem('${safeInstId}')">
        <div class="card-top-meta">
          <span class="card-rarity-badge" style="color: ${rarity.color}; background: ${rarity.glow}; border: 1px solid ${rarity.border};">
            ${rarity.name}
          </span>
          <div style="display: flex; gap: 4px; align-items: center;">
            ${item.isStatTrak ? '<span class="card-stattrak-tag">ST™</span>' : ''}
            ${item.wear ? `<span class="card-wear-tag">${item.wear}</span>` : ''}
            ${isSelected ? '<span class="card-selected-tag">ОБРАНО</span>' : ''}
          </div>
        </div>
        <div class="card-art-box">
          <img src="${safeImg}" alt="${safeName}" class="real-skin-img" onerror="if(!this.dataset.fallback){this.dataset.fallback=1;this.src='gungnir.png';}" />
        </div>
        <div class="card-info-box">
          <h4 class="card-title" title="${safeName}">${safeName}</h4>
          <p class="card-sub">${safeCat} ${typeof item.float === 'number' ? '&bull; Float: ' + item.float.toFixed(4) : ''}</p>
          
          <div class="card-cosmetics-strip">
            ${stickersHtml}
            ${charmHtml}
          </div>

          <div class="card-bottom-row">
            <div class="card-price">${item.price.toFixed(2)} <span>DP</span></div>
            <div style="display: flex; gap: 4px;">
              <button class="quick-action-btn" onclick="event.stopPropagation(); openInspectModal('${safeInstId}')" title="Детальний огляд характеристик та наклейок">
                🔍
              </button>
              ${broadType === 'weapon' ? `
                <button class="quick-action-btn" onclick="event.stopPropagation(); openCustomizeModal('${safeInstId}')" title="Нанести наклейку або прикріпити брелок">
                  🎨
                </button>
              ` : ''}
              <button class="card-withdraw-btn" onclick="event.stopPropagation(); withdrawItemToVault('${safeInstId}')" title="Вивести в Сейф">
                🏦
              </button>
              <button class="card-use-btn">${isSelected ? 'Обрано' : 'Обрати'}</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function renderVaultCards(grid) {
  const vaultBadge = document.getElementById('vaultTotalItemsCount');
  const countEl = document.getElementById('invTotalItemsCount');
  const vaultValueEl = document.getElementById('vaultTotalValue');
  const vaultItems = state.vault || [];
  const totalVaultValue = vaultItems.reduce((acc, cur) => acc + cur.price, 0);

  if (countEl) countEl.textContent = state.inventory.length;
  if (vaultBadge) vaultBadge.textContent = vaultItems.length;
  if (vaultValueEl) vaultValueEl.textContent = totalVaultValue.toFixed(2);

  const filtered = filterItemsList(vaultItems, state.inventoryFilter);

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="empty-state-view">
        <h3 style="color: var(--neon-green);">🏦 Ваш Віртуальний Сейф порожній</h3>
        <p>Ви можете виводити сюди будь-які скіни, наклейки та брелоки з інвентарю для безпечного збереження!</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(item => {
    const rarity = RARITIES[item.rarity] || RARITIES.common;
    const safeName = escapeHtml(item.name);
    const safeCat = escapeHtml(item.category);
    const safeImg = escapeHtml(item.image);
    const safeInstId = escapeHtml(item.instanceId);

    const stickersHtml = (item.appliedStickers || []).map(s => `
      <img src="${escapeHtml(s.image)}" title="${escapeHtml(s.name)}" class="mini-cosmetic-sticker" alt="Sticker" onerror="this.style.display='none'" />
    `).join('');

    const charmHtml = item.attachedCharm ? `
      <img src="${escapeHtml(item.attachedCharm.image)}" title="${escapeHtml(item.attachedCharm.name)}" class="mini-cosmetic-charm" alt="Charm" onerror="this.style.display='none'" />
    ` : '';

    return `
      <div class="game-item-card" style="color: ${rarity.color}; border-color: rgba(0, 255, 136, 0.35); box-shadow: 0 4px 18px rgba(0, 255, 136, 0.08);">
        <div class="card-top-meta">
          <span class="card-rarity-badge" style="color: ${rarity.color}; background: ${rarity.glow}; border: 1px solid ${rarity.border};">
            ${rarity.name}
          </span>
          <div style="display: flex; gap: 4px; align-items: center;">
            ${item.isStatTrak ? '<span class="card-stattrak-tag">ST™</span>' : ''}
            ${item.wear ? `<span class="card-wear-tag">${item.wear}</span>` : ''}
            <span class="vault-item-badge">🔒 В СЕЙФІ</span>
          </div>
        </div>
        <div class="card-art-box">
          <img src="${safeImg}" alt="${safeName}" class="real-skin-img" onerror="if(!this.dataset.fallback){this.dataset.fallback=1;this.src='gungnir.png';}" />
        </div>
        <div class="card-info-box">
          <h4 class="card-title" title="${safeName}">${safeName}</h4>
          <p class="card-sub">${safeCat} ${typeof item.float === 'number' ? '&bull; Float: ' + item.float.toFixed(4) : ''}</p>
          
          <div class="card-cosmetics-strip">
            ${stickersHtml}
            ${charmHtml}
          </div>

          <div class="card-bottom-row">
            <div class="card-price">${item.price.toFixed(2)} <span>DP</span></div>
            <div style="display: flex; gap: 4px;">
              <button class="quick-action-btn" onclick="event.stopPropagation(); openInspectModal('${safeInstId}', true)" title="Детальний огляд">
                🔍
              </button>
              <button class="card-sell-btn" onclick="sellSkinFromVault('${safeInstId}')" title="Продати скін за ${item.price.toFixed(2)} DP">
                💰 Продати
              </button>
              <button class="card-return-btn" onclick="returnItemFromVault('${safeInstId}')" title="Повернути предмет в робочий інвентар">
                🎒 В інвентар
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Vault Selling & Booster Shop Catalog
const BOOSTER_CATALOG = [
  {
    id: 'booster_luck_10',
    title: '🍀 Фартовий Бустер +10%',
    desc: 'Додає фіксовані +10.0% до шансу успіху в усіх апгрейдах!',
    icon: '🍀',
    price: 50.00,
    durationMs: 15 * 60 * 1000, // 15 minutes
    durationLabel: '15 хв'
  },
  {
    id: 'booster_luck_25',
    title: '👑 Мега-Удача +25%',
    desc: 'Величезний бонус +25.0% до шансу успіху для підкорення найдорожчих ножів!',
    icon: '👑',
    price: 150.00,
    durationMs: 10 * 60 * 1000, // 10 minutes
    durationLabel: '10 хв'
  },
  {
    id: 'booster_shield',
    title: '🛡️ Щит Спасіння Скіна',
    desc: 'При будь-якому невдалому апгрейді ваш вхідний скін НЕ згорає, а повертається назад!',
    icon: '🛡️',
    price: 100.00,
    durationMs: 20 * 60 * 1000, // 20 minutes
    durationLabel: '20 хв'
  },
  {
    id: 'booster_cashback',
    title: '💎 Подвійний Кешбек 20%',
    desc: 'При поразці повертає 20% вартості скіна на баланс замість звичайного 1 DP!',
    icon: '💎',
    price: 75.00,
    durationMs: 30 * 60 * 1000, // 30 minutes
    durationLabel: '30 хв'
  }
];

window.sellSkinFromVault = async function(instanceId) {
  if (!state.vault) state.vault = [];
  const index = state.vault.findIndex(i => i.instanceId === instanceId);
  if (index === -1) return;

  const item = state.vault[index];
  if (!(await showConfirm(`Продати скін "${item.name}" за ${item.price.toFixed(2)} DP?\n(Отриману валюту можна використати для покупки тимчасових бустерів!)`))) {
    return;
  }

  state.vault.splice(index, 1);
  state.balance += item.price;
  state.saveVault();
  state.saveBalance();
  updateUi();
  audio.playWin();
  if (particleInstance) particleInstance.burst();

  showToastNotification(`💰 Продано "${item.name}" за +${item.price.toFixed(2)} DP!`);
};

window.sellAllSkinsFromVault = async function() {
  if (!state.vault || state.vault.length === 0) {
    showNotification('Віртуальний сейф порожній!', 'info');
    return;
  }
  const totalVal = state.vault.reduce((a, c) => a + c.price, 0);
  const count = state.vault.length;

  if (!(await showConfirm(`Продати всі скіни з сейфу (${count} шт.) на суму ${totalVal.toFixed(2)} DP?`))) {
    return;
  }

  state.vault = [];
  state.balance += totalVal;
  state.saveVault();
  state.saveBalance();
  updateUi();
  audio.playWin();
  if (particleInstance) particleInstance.burst();

  showToastNotification(`💰 Продано ${count} скінів за +${totalVal.toFixed(2)} DP!`);
};

window.openBoosterShopModal = function() {
  renderBoosterShopModalBody();
  const modal = document.getElementById('boosterShopModal');
  if (modal) modal.classList.add('open');
  audio.playClick();
};

function renderBoosterShopModalBody() {
  const container = document.getElementById('boosterShopModalBody');
  if (!container) return;

  state.cleanExpiredBoosters();
  const now = Date.now();

  const cardsHtml = BOOSTER_CATALOG.map(booster => {
    const active = (state.activeBoosters || []).find(b => b && b.id === booster.id && b.expiresAt > now);
    const timeLeftSec = active ? Math.max(0, Math.floor((active.expiresAt - now) / 1000)) : 0;
    const mins = Math.floor(timeLeftSec / 60);
    const secs = timeLeftSec % 60;

    return `
      <div class="booster-shop-card ${active ? 'active-owned' : ''}">
        <div>
          <div class="booster-icon-box">${booster.icon}</div>
          <div class="booster-title">${escapeHtml(booster.title)}</div>
          <div class="booster-desc">${escapeHtml(booster.desc)}</div>
        </div>

        <div>
          ${active ? `
            <div style="background: rgba(0, 255, 136, 0.15); border: 1px solid var(--neon-green); border-radius: 6px; padding: 8px; text-align: center; margin-bottom: 10px;">
              <span style="font-size: 11px; font-weight: 800; color: var(--neon-green);">
                АКТИВНИЙ: ще ${mins}хв ${secs < 10 ? '0' : ''}${secs}с
              </span>
            </div>
          ` : ''}

          <div class="booster-price-row">
            <div>
              <div class="booster-price">${booster.price.toFixed(2)} DP</div>
              <div style="font-size: 10px; color: var(--text-dim);">Час дії: ${booster.durationLabel}</div>
            </div>
            <button onclick="buyTemporaryBooster('${booster.id}')" class="google-login-btn" style="padding: 8px 14px; font-size: 12px; font-weight: 800; background: ${state.balance >= booster.price ? 'linear-gradient(135deg, #ffd700, #ff8c00)' : 'rgba(255,255,255,0.1)'}; color: ${state.balance >= booster.price ? '#000' : 'var(--text-dim)'}; border: none; border-radius: var(--radius-sm);" ${state.balance < booster.price ? 'disabled' : ''}>
              ${active ? '⚡ Продовжити' : 'Купити'}
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  container.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 14px;">
      
      <!-- User Balance Info -->
      <div style="background: var(--bg-surface); border: 1px solid var(--border-color); padding: 14px 18px; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: space-between;">
        <div>
          <div style="font-size: 11px; color: var(--text-dim); text-transform: uppercase; font-weight: 700;">Ваш баланс для покупок:</div>
          <div style="font-size: 20px; font-weight: 900; color: var(--neon-amber);">${state.balance.toFixed(2)} DP</div>
        </div>
        <div style="font-size: 11px; color: var(--text-muted); max-width: 280px; text-align: right;">
          💡 Продавайте збережені скіни у вкладці <strong>«Віртуальний Сейф»</strong>, щоб отримувати валюту DP на покупку будь-яких бустерів!
        </div>
      </div>

      <!-- Boosters Grid -->
      <div class="booster-shop-grid">
        ${cardsHtml}
      </div>

    </div>
  `;
}

window.buyTemporaryBooster = function(boosterId) {
  const booster = BOOSTER_CATALOG.find(b => b && b.id === boosterId);
  if (!booster) return;

  if (state.balance < booster.price) {
    showNotification(`Недостатньо валюти DP! Потрібно ${booster.price.toFixed(2, 'info')} DP. Продайте кілька скінів у Віртуальному Сейфі для поповнення балансу.`);
    return;
  }

  state.balance -= booster.price;
  state.saveBalance();

  state.cleanExpiredBoosters();
  const existing = (state.activeBoosters || []).find(b => b && b.id === boosterId);
  const now = Date.now();

  if (existing && existing.expiresAt > now) {
    existing.expiresAt += booster.durationMs;
  } else {
    if (!state.activeBoosters) state.activeBoosters = [];
    state.activeBoosters.push({
      id: booster.id,
      title: booster.title,
      icon: booster.icon,
      expiresAt: now + booster.durationMs
    });
  }

  state.saveBoosters();
  updateUi();
  renderBoosterShopModalBody();
  audio.playWin();
  if (particleInstance) particleInstance.burst();

  showToastNotification(`⚡ Активовано: ${booster.title} на ${booster.durationLabel}!`);
};

function renderActiveBoosters() {
  const container = document.getElementById('activeBoostersBar');
  if (!container) return;

  state.cleanExpiredBoosters();
  const now = Date.now();
  const activeList = state.activeBoosters || [];

  if (activeList.length === 0) {
    container.innerHTML = '';
    container.style.display = 'none';
    return;
  }

  container.style.display = 'flex';
  container.innerHTML = activeList.map(b => {
    const timeLeftSec = Math.max(0, Math.floor((b.expiresAt - now) / 1000));
    const mins = Math.floor(timeLeftSec / 60);
    const secs = timeLeftSec % 60;
    return `
      <div class="booster-active-badge" title="Активний тимчасовий бустер">
        <span>${b.icon}</span>
        <span>${escapeHtml(b.title)} (${mins}:${secs < 10 ? '0' : ''}${secs})</span>
      </div>
    `;
  }).join('');
}

// Live timer tick for active boosters
setInterval(() => {
  if (state.activeBoosters && state.activeBoosters.length > 0) {
    renderActiveBoosters();
    // Also re-render shop body if shop modal is open
    const shopModal = document.getElementById('boosterShopModal');
    if (shopModal && shopModal.classList.contains('open')) {
      renderBoosterShopModalBody();
    }
  }
}, 1000);


window.withdrawItemToVault = function(instanceId, silent = false) {
  const index = state.inventory.findIndex(i => i.instanceId === instanceId);
  if (index !== -1) {
    const item = state.inventory.splice(index, 1)[0];
    if (state.selectedSource && state.selectedSource.instanceId === instanceId) {
      state.selectedSource = null;
    }
    if (!state.vault) state.vault = [];
    state.vault.unshift(item);
    state.saveInventory();
    state.saveVault();
    updateUi();
    audio.playWin();
    if (particleInstance) particleInstance.burst();

    if (!silent) {
      showWithdrawSuccessModal(item);
    }
  }
};

window.returnItemFromVault = function(instanceId) {
  if (!state.vault) state.vault = [];
  const index = state.vault.findIndex(i => i.instanceId === instanceId);
  if (index !== -1) {
    const item = state.vault.splice(index, 1)[0];
    state.inventory.unshift(item);
    state.saveInventory();
    state.saveVault();
    updateUi();
    audio.playClick();
    showToastNotification(`🎒 "${item.name}" успішно повернуто в робочий інвентар!`);
  }
};

window.withdrawAllToVault = function() {
  if (state.inventory.length === 0) {
    showNotification('Ваш робочий інвентар порожній!', 'info');
    return;
  }
  const count = state.inventory.length;
  const totalVal = state.inventory.reduce((a, c) => a + c.price, 0);
  if (!state.vault) state.vault = [];
  state.vault.unshift(...state.inventory);
  state.inventory = [];
  state.selectedSource = null;
  state.saveInventory();
  state.saveVault();
  updateUi();
  audio.playWin();
  if (particleInstance) particleInstance.burst();

  showToastNotification(`🏦 Усі предмети (${count} шт., ${totalVal.toFixed(2)} DP) виведено у Сейф!`);
};

window.returnAllFromVault = function() {
  if (!state.vault || state.vault.length === 0) {
    showNotification('Віртуальний сейф порожній!', 'info');
    return;
  }
  const count = state.vault.length;
  state.inventory.unshift(...state.vault);
  state.vault = [];
  state.saveInventory();
  state.saveVault();
  updateUi();
  audio.playClick();
  showToastNotification(`🎒 Усі предмети (${count} шт.) повернуто у робочий інвентар!`);
};

function showWithdrawSuccessModal(item) {
  const modal = document.getElementById('vaultWithdrawModal');
  const body = document.getElementById('vaultWithdrawModalBody');
  if (!modal || !body) {
    showToastNotification(`🏦 "${item.name}" виведено у Віртуальний Сейф!`);
    return;
  }

  const rarity = RARITIES[item.rarity] || RARITIES.common;
  const safeName = escapeHtml(item.name);
  const safeImg = escapeHtml(item.image);
  const totalVaultCount = (state.vault || []).length;

  body.innerHTML = `
    <div class="withdraw-success-box">
      <div class="withdraw-step-chip">
        ✓ УСПІШНО ВИВЕДЕНО В СЕЙФ
      </div>

      <img src="${safeImg}" alt="${safeName}" class="withdraw-item-preview" onerror="if(!this.dataset.fallback){this.dataset.fallback=1;this.src='gungnir.png';}" />
      
      <h3 style="color: ${rarity.color}; font-size: 16px; font-weight: 800; margin-bottom: 6px;">
        ${safeName}
      </h3>
      <div style="font-size: 14px; font-weight: 800; color: var(--neon-green); margin-bottom: 14px;">
        ${item.price.toFixed(2)} DP
      </div>

      <p style="font-size: 12px; color: var(--text-dim); line-height: 1.5; margin-bottom: 18px;">
        Предмет перенесено у ваш <strong>Віртуальний Сейф</strong>. Він захищений від випадкового апгрейду та збереже всі нанесені наклейки, брелоки та характеристики Float!
      </p>

      <div style="display: flex; gap: 10px; justify-content: center;">
        <button onclick="switchToVaultTabAndCloseModal()" class="google-login-btn" style="padding: 10px 18px; font-size: 12px; font-weight: 800; background: linear-gradient(135deg, var(--neon-green), #00c96b); color: #000; border: none; border-radius: var(--radius-sm);">
          🏦 Переглянути Сейф (${totalVaultCount})
        </button>
        <button onclick="closeWithdrawModal()" class="quick-action-btn" style="padding: 10px 16px; font-size: 12px; font-weight: 700;">
          Продовжити гру
        </button>
      </div>
    </div>
  `;

  modal.classList.add('open');
}

window.switchToVaultTabAndCloseModal = function() {
  const modal = document.getElementById('vaultWithdrawModal');
  if (modal) modal.classList.remove('open');
  const vaultTabBtn = document.querySelector('.tab-btn[data-tab="vault"]');
  if (vaultTabBtn) vaultTabBtn.click();
  const el = document.getElementById('itemsHubSection');
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

window.closeWithdrawModal = function() {
  const modal = document.getElementById('vaultWithdrawModal');
  if (modal) modal.classList.remove('open');
};

function showToastNotification(message) {
  const existing = document.querySelector('.withdraw-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'withdraw-toast';
  toast.innerHTML = `<span>✨</span> <span>${escapeHtml(message)}</span>`;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = 'opacity 0.4s, transform 0.4s';
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => toast.remove(), 400);
  }, 3500);
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

  filtered = filterItemsList(filtered, state.catalogFilter);

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="empty-state-view">
        <h3>Немає доступних цілей для апгрейду</h3>
        <p>${state.selectedSource ? 'Всі доступні предмети в цьому розділі дешевші за ваш предмет (' + state.selectedSource.price.toFixed(2) + ' DP).' : 'Спробуйте змінити параметри пошуку або фільтри.'}</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(item => {
    const isSelected = state.selectedTarget && state.selectedTarget.id === item.id;
    const rarity = RARITIES[item.rarity] || RARITIES.common;
    const mult = state.selectedSource ? (item.price / state.selectedSource.price).toFixed(2) : null;
    const safeName = escapeHtml(item.name);
    const safeCat = escapeHtml(item.category);
    const safeImg = escapeHtml(item.image);
    const safeId = escapeHtml(item.id);

    return `
      <div class="game-item-card ${isSelected ? 'equipped-target' : ''}" 
           style="color: ${rarity.color};" 
           onclick="selectTargetItem('${safeId}')">
        <div class="card-top-meta">
          <span class="card-rarity-badge" style="color: ${rarity.color}; background: ${rarity.glow}; border: 1px solid ${rarity.border};">
            ${rarity.name}
          </span>
          <div style="display: flex; gap: 4px; align-items: center;">
            ${item.isStatTrak ? '<span class="card-stattrak-tag">ST™</span>' : ''}
            ${item.wear ? `<span class="card-wear-tag">${item.wear}</span>` : ''}
            ${isSelected ? '<span class="card-selected-tag">ЦІЛЬ</span>' : ''}
            ${mult ? `<span class="card-multiplier-preview">x${mult}</span>` : ''}
          </div>
        </div>
        <div class="card-art-box">
          <img src="${safeImg}" alt="${safeName}" class="real-skin-img" onerror="if(!this.dataset.fallback){this.dataset.fallback=1;this.src='gungnir.png';}" />
        </div>
        <div class="card-info-box">
          <h4 class="card-title" title="${safeName}">${safeName}</h4>
          <p class="card-sub">${safeCat}</p>
          <div class="card-bottom-row">
            <div class="card-price">${item.price.toFixed(2)} <span>DP</span></div>
            <div style="display: flex; gap: 4px;">
              <button class="quick-action-btn" onclick="event.stopPropagation(); openInspectModalCatalog('${safeId}')" title="Оглянути деталі">
                🔍
              </button>
              <button class="card-use-btn">${isSelected ? 'Ціль обрана' : 'Обрати'}</button>
            </div>
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
      showNotification('❌ Неможливо обрати цей скін!\nВаш скін коштує ' + state.selectedSource.price.toFixed(2, 'info') + ' DP, а ціль — ' + found.price.toFixed(2) + ' DP.\nАпгрейд можливий ТІЛЬКИ на дорожчий скін!');
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
              <td style="color: var(--text-dim); font-size: 11px;">${escapeHtml(h.timestamp)}</td>
              <td style="font-weight: 700;">${escapeHtml(h.sourceName)}</td>
              <td style="font-weight: 700;">
                <div style="display: inline-flex; align-items: center; gap: 8px;">
                  ${h.targetImage ? `<img src="${escapeHtml(h.targetImage)}" style="width: 28px; height: 20px; object-fit: contain;" />` : ''}
                  <span>${escapeHtml(h.targetName)}</span>
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


// [GoogleAuthManager moved to top for safe initialization]

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
        }, response.credential);
      const modal = document.getElementById('googleAuthModal');
      if (modal) modal.classList.remove('open');
    }
  }
};

function triggerGooglePrompt() {
  const modal = document.getElementById('googleAuthModal');
  if (modal) modal.classList.add('open');
}

function openProfileModal() {
  renderProfileModalBody();
  const modal = document.getElementById('profileEditModal');
  if (modal) modal.classList.add('open');
  audio.playClick();
}
window.openProfileModal = openProfileModal;

// Auto-open profile modal if URL contains #profile or ?profile=true
if (window.location.hash === '#profile' || (window.location.search && window.location.search.includes('profile=true'))) {
  setTimeout(() => {
    openProfileModal();
  }, 300);
}


function renderProfileModalBody() {
  const container = document.getElementById('profileModalBody');
  if (!container) return;

  const currentUser = googleAuth.user || {
    name: 'Гравець',
    email: 'user@upgrader.demo',
    picture: REAL_HUMAN_AVATARS[0]
  };

  const presetAvatarsHtml = REAL_HUMAN_AVATARS.map((url, idx) => `
    <div onclick="selectPresetAvatar('${url}')" style="cursor: pointer; position: relative; border-radius: 50%; overflow: hidden; border: 2px solid ${currentUser.picture === url ? 'var(--neon-cyan)' : 'transparent'}; transition: transform 0.2s ease;">
      <img src="${url}" style="width: 52px; height: 52px; object-fit: cover; display: block;" />
      ${currentUser.picture === url ? '<div style="position: absolute; inset: 0; background: rgba(0, 240, 255, 0.3); display: flex; align-items: center; justify-content: center; font-weight: 800; color: #fff; font-size: 14px;">✓</div>' : ''}
    </div>
  `).join('');

  container.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 18px;">
      
      <!-- Google Auth Connect / Cloud Sync Banner -->
      <div style="background: rgba(66, 133, 244, 0.12); border: 1px solid rgba(66, 133, 244, 0.4); border-radius: var(--radius-md); padding: 14px; display: flex; align-items: center; justify-content: space-between; gap: 12px;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <svg width="22" height="22" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/></svg>
          <div>
            <div style="font-weight: 700; color: #fff; font-size: 13px;">🔒 Хмарне збереження (Neon Postgres)</div>
            <div style="font-size: 11px; color: var(--text-dim);">${googleAuth.user?.email ? 'Синхронізовано з: ' + escapeHtml(googleAuth.user.email) : 'Увійдіть через Google для збереження балансу та скінів'}</div>
          </div>
        </div>
        <button onclick="triggerGooglePrompt()" class="google-login-btn" style="padding: 8px 14px; font-size: 12px; white-space: nowrap;">
          ${googleAuth.user?.email ? 'Змінити акаунт' : 'Увійти через Google'}
        </button>
      </div>
      
      <!-- Current Avatar Preview & Custom URL Input -->
      <div style="background: var(--bg-surface); border: 1px solid var(--border-color); padding: 16px; border-radius: var(--radius-md); display: flex; align-items: center; gap: 16px;">
        <img id="currentAvatarPreviewImg" src="${currentUser.picture}" style="width: 72px; height: 72px; border-radius: 50%; border: 3px solid var(--neon-cyan); object-fit: cover; box-shadow: 0 0 15px rgba(0, 240, 255, 0.3);" onerror="this.src='https://lh3.googleusercontent.com/a/default-user'" />
        <div style="flex: 1;">
          <div style="font-weight: 700; color: #fff; font-size: 14px; margin-bottom: 4px;">Ваша аватарка</div>
          <div style="font-size: 11px; color: var(--text-dim); margin-bottom: 8px;">Оберіть готовий аватар нижче або вставте посилання:</div>
          <input type="url" id="customAvatarUrlInput" value="${currentUser.picture}" placeholder="https://example.com/avatar.jpg" style="width: 100%; background: #090d14; border: 1px solid var(--border-color); border-radius: 6px; padding: 8px 10px; color: #fff; font-size: 12px; outline: none;" />
        </div>
      </div>

      <!-- Avatar Presets Gallery -->
      <div>
        <label style="font-size: 12px; font-weight: 700; color: #fff; display: block; margin-bottom: 8px;">🎨 Готові аватарки (Клікніть для вибору):</label>
        <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px; justify-items: center; background: #090d14; padding: 12px; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
          ${presetAvatarsHtml}
        </div>
      </div>

      <!-- Custom Nickname Input -->
      <div style="background: var(--bg-surface); border: 1px solid var(--border-color); padding: 16px; border-radius: var(--radius-md);">
        <label style="font-size: 12px; font-weight: 700; color: #fff; display: block; margin-bottom: 8px;">✏️ Ваш нікнейм у грі:</label>
        <input type="text" id="customNicknameInput" value="${currentUser.name}" placeholder="Введіть свій нікнейм..." maxlength="24" style="width: 100%; background: #090d14; border: 1px solid var(--border-color); border-radius: 6px; padding: 10px 12px; color: #fff; font-size: 14px; font-weight: 700; outline: none;" />
      </div>

      <!-- Player Statistics Overview -->
      <div style="background: var(--bg-surface); border: 1px solid var(--border-color); padding: 16px; border-radius: var(--radius-md);">
        <label style="font-size: 12px; font-weight: 700; color: #fff; display: block; margin-bottom: 8px;">📊 Ваша статистика апгрейдів:</label>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px;">
          <div style="background: #090d14; padding: 8px; border-radius: 6px; text-align: center; border: 1px solid var(--border-color);">
            <div style="font-size: 10px; color: var(--text-dim);">Апгрейдів</div>
            <div style="font-size: 14px; font-weight: 800; color: #fff;">${state.stats.total}</div>
          </div>
          <div style="background: #090d14; padding: 8px; border-radius: 6px; text-align: center; border: 1px solid var(--border-color);">
            <div style="font-size: 10px; color: var(--text-dim);">Перемог</div>
            <div style="font-size: 14px; font-weight: 800; color: var(--neon-green);">${state.stats.wins}</div>
          </div>
          <div style="background: #090d14; padding: 8px; border-radius: 6px; text-align: center; border: 1px solid var(--border-color);">
            <div style="font-size: 10px; color: var(--text-dim);">Вінрейт</div>
            <div style="font-size: 14px; font-weight: 800; color: var(--neon-cyan);">${state.stats.total > 0 ? ((state.stats.wins / state.stats.total) * 100).toFixed(1) : '0.0'}%</div>
          </div>
          <div style="background: #090d14; padding: 8px; border-radius: 6px; text-align: center; border: 1px solid var(--border-color);">
            <div style="font-size: 10px; color: var(--text-dim);">Поразок</div>
            <div style="font-size: 14px; font-weight: 800; color: var(--neon-red);">${state.stats.losses}</div>
          </div>
          <div style="background: #090d14; padding: 8px; border-radius: 6px; text-align: center; border: 1px solid var(--border-color);">
            <div style="font-size: 10px; color: var(--text-dim);">Топ множник</div>
            <div style="font-size: 14px; font-weight: 800; color: var(--neon-amber);">x${state.stats.bestMultiplier.toFixed(2)}</div>
          </div>
          <div style="background: #090d14; padding: 8px; border-radius: 6px; text-align: center; border: 1px solid var(--border-color);">
            <div style="font-size: 10px; color: var(--text-dim);">Виграно цінностей</div>
            <div style="font-size: 13px; font-weight: 800; color: #fff;">${state.stats.totalWonValue.toFixed(0)} DP</div>
          </div>
        </div>
      </div>

      <!-- Admin Invite Key Redemption Removed for Security -->
        <button onclick="redeemAdminKey()" class="admin-btn" style="white-space: nowrap; padding: 6px 12px; font-size: 11px;">
          Активувати
        </button>
      </div>

      <!-- Save & Logout Buttons -->
      <div style="display: flex; gap: 10px; margin-top: 6px;">
        <button onclick="saveUserProfileChanges()" class="google-login-btn" style="flex: 1; justify-content: center; padding: 12px; font-size: 14px; background: linear-gradient(135deg, #00f0ff, #0072ff); color: #000; font-weight: 800; border: none;">
          💾 Зберегти зміни
        </button>
        <button onclick="window.logoutGoogleAccount()" class="quick-action-btn danger" style="padding: 12px 18px; font-weight: 700;">
          Вийти
        </button>
      </div>

    </div>
  `;
}

window.selectPresetAvatar = function(url) {
  const input = document.getElementById('customAvatarUrlInput');
  const img = document.getElementById('currentAvatarPreviewImg');
  if (input) input.value = url;
  if (img) img.src = url;
  audio.playClick();
};

window.saveUserProfileChanges = function() {
  const nickInput = document.getElementById('customNicknameInput');
  const avatarInput = document.getElementById('customAvatarUrlInput');
  
  const nick = nickInput ? nickInput.value.trim() : '';
  const avatar = avatarInput ? avatarInput.value.trim() : '';

  if (!nick) {
    showNotification('Будь ласка, вкажіть ваш нікнейм!', 'info');
    return;
  }

  googleAuth.updateProfile(nick, avatar);
  const modal = document.getElementById('profileEditModal');
  if (modal) modal.classList.remove('open');
  audio.playWin();
};

// Render Google Auth UI components
function renderHeaderGoogleAuth() {
  const container = document.getElementById('googleHeaderContainer');
  if (!container) return;

  if (googleAuth.user) {
    container.innerHTML = `
      <div class="google-user-chip" id="profileBtn" title="Налаштувати профіль та аватарку">
        <img src="${googleAuth.user.picture}" class="google-avatar-img" alt="Avatar" onerror="this.src='https://lh3.googleusercontent.com/a/default-user'" />
        <span style="font-size: 13px; font-weight: 700; max-width: 90px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${escapeHtml(googleAuth.user.name)}</span>
        <span class="google-badge">⚙️ Профіль</span>
      </div>
    `;
    const btn = document.getElementById('profileBtn');
    if (btn) {
      btn.addEventListener('click', () => {
        openProfileModal();
      });
    }
  } else {
    container.innerHTML = `
      <button id="profileEditGuestBtn" class="google-login-btn" style="background: linear-gradient(135deg, rgba(0,240,255,0.15), rgba(0,114,255,0.15)); border: 1px solid var(--neon-cyan);">
        <span style="font-size: 16px;">👤</span>
        <span>Створити Профіль</span>
      </button>
    `;
    const btn = document.getElementById('profileEditGuestBtn');
    if (btn) {
      btn.addEventListener('click', () => {
        openProfileModal();
      });
    }
  }
}


// Official OAuth 2.0 Flow Trigger
window.loginWithGoogleOAuth = function() {
  window.location.href = '/api/auth/google/login';
};


// Global window bindings for Google Logout
window.googleAuth = googleAuth;
window.logoutGoogleAccount = function() {
  googleAuth.logout();
  const profileModal = document.getElementById('profileModal');
  if (profileModal) profileModal.classList.remove('open');
  const profileEditModal = document.getElementById('profileEditModal');
  if (profileEditModal) profileEditModal.classList.remove('open');
};

// ==========================================
// 8. ADMIN CONTROL PANEL FUNCTIONS
// ==========================================
async function openAdminPanelModal() {
  // Check authorization with backend
  try {
    const sessionRes = await apiFetch('/api/admin-session', { method: 'POST' });
    if (!sessionRes || !sessionRes.isAdmin) {
      state.adminMode = false;
      updateUi();
      showNotification('🔒 Доступ заборонено! Для входу в адмін-панель потрібен обліковий запис адміністратора.', 'info');
      return;
    }
    state.adminMode = true;
    state.isOwner = Boolean(sessionRes.isOwner);
    state.userRole = sessionRes.role || 'admin';
  } catch (err) {
    state.adminMode = false;
    updateUi();
    showNotification('🔒 Доступ заборонено! Увійдіть через Google-акаунт адміністратора.', 'info');
    return;
  }

  await renderAdminModalBody();
  const modal = document.getElementById('adminModal');
  if (modal) modal.classList.add('open');
  audio.playClick();
}

async function renderAdminModalBody() {
  const container = document.getElementById('adminModalBody');
  if (!container) return;

  // Fetch verified admin list from server if owner
  if (state.isOwner) {
    try {
      const res = await apiFetch('/api/admins', { method: 'GET' });
      if (res && Array.isArray(res.admins)) {
        state.authorizedAdmins = ['Кирило (Owner/Creator)', ...res.admins];
      }
    } catch(e) {}
  }

  const catalogOptions = ITEM_CATALOG.map(item => `
    <option value="${escapeHtml(item.id)}">${escapeHtml(item.name)} (${item.price.toFixed(2)} DP)</option>
  `).join('');

  const currentAdmins = state.authorizedAdmins || ['Кирило (Owner/Creator)'];
  const hasExtraAdmins = currentAdmins.length > 1;

  const adminsList = currentAdmins.map((adminName, idx) => `
    <div class="admin-list-item" style="display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; background: rgba(255, 255, 255, 0.03); border: 1px solid ${idx === 0 ? 'rgba(255, 215, 0, 0.3)' : 'rgba(255, 85, 85, 0.2)'}; border-radius: 8px; margin-bottom: 6px;">
      <div style="display: flex; align-items: center; gap: 10px;">
        <span style="font-size: 16px;">${idx === 0 ? '👑' : '🛡️'}</span>
        <div>
          <span style="font-weight: 700; color: #fff; font-size: 13px;">${escapeHtml(adminName)}</span>
          <div style="font-size: 10px; color: var(--text-dim);">${idx === 0 ? 'Головний творець та власник' : 'Призначений адміністратор'}</div>
        </div>
      </div>
      <div>
        ${idx === 0 
          ? '<span style="color: #00ff88; font-size: 11px; font-weight: 800; background: rgba(0, 255, 136, 0.12); border: 1px solid rgba(0, 255, 136, 0.3); padding: 4px 10px; border-radius: 6px;">ВЛАСНИК</span>' 
          : `<button onclick="adminRevokeUser(${idx})" class="admin-btn danger" style="background: linear-gradient(135deg, #ff3366, #b3002d); color: #fff; font-weight: 800; border: none; padding: 6px 14px; font-size: 12px; border-radius: 6px; cursor: pointer; display: flex; align-items: center; gap: 4px; box-shadow: 0 2px 8px rgba(255, 51, 102, 0.3);">
              🗑️ Забрати права
            </button>`
        }
      </div>
    </div>
  `).join('') + (!hasExtraAdmins ? `
    <div style="margin-top: 6px; padding: 10px 12px; background: rgba(255, 215, 0, 0.04); border: 1px dashed rgba(255, 215, 0, 0.3); border-radius: 6px; font-size: 11px; color: var(--text-dim); line-height: 1.5;">
      💡 <em>Наразі додаткових адмінів немає. Коли ви додасте друга за нікнеймом або він активує ключ, біля його імені тут з'явиться велика червона кнопка <strong>«🗑️ Забрати права»</strong>.</em>
    </div>
  ` : '');

  const keysList = (state.adminKeys || []).map((k, idx) => `
    <div class="admin-list-item" style="border-color: rgba(255, 215, 0, 0.3);">
      <div>
        <span class="admin-key-badge">${escapeHtml(k.code)}</span>
        <span style="font-size: 10px; color: var(--text-dim); margin-left: 6px;">${escapeHtml(k.note || 'Без примітки')}</span>
      </div>
      <div style="display: flex; gap: 6px;">
        <button onclick="adminCopyKey('${escapeHtml(k.code)}')" class="admin-btn" style="padding: 3px 8px; font-size: 11px;">📋 Копіювати</button>
        <button onclick="adminDeleteKey(${idx})" class="admin-btn danger" style="padding: 3px 8px; font-size: 11px;">✕</button>
      </div>
    </div>
  `).join('');

  container.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 14px;">
      
      <!-- Admin Mode Status Card -->
      <div class="admin-control-card" style="border-color: #ffd700; background: linear-gradient(135deg, rgba(255, 215, 0, 0.05), rgba(255, 170, 0, 0.02));">
        <h4>👑 Головний Адміністратор (Власник)</h4>
        <div style="display: flex; align-items: center; justify-content: space-between; gap: 10px;">
          <div>
            <div style="font-size: 13px; font-weight: 800; color: #ffd700;">
              ✅ ПОВНИЙ ДОСТУП АКТИВОВАНО
            </div>
            <div style="font-size: 11px; color: var(--text-dim); margin-top: 2px;">
              Ви маєте ексклюзивне право керувати проєктом та видавати адмінки іншим гравцям.
            </div>
          </div>
          <button onclick="adminToggleMode()" class="admin-btn" style="white-space: nowrap;">
            ${state.adminMode ? 'Вимкнути статус' : 'Увімкнути'}
          </button>
        </div>
      </div>

      <!-- Admin Delegation Section: Grant by Nickname / Generate Keys -->
      <div class="admin-control-card" style="border-color: var(--neon-cyan);">
        <h4>🎟️ Видача Адмінок (Управління Правами)</h4>
        <p style="font-size: 11px; color: var(--text-dim); margin-bottom: 12px;">
          Ви можете призначити друга адміном напряму за його нікнеймом або згенерувати секретний ключ-запрошення:
        </p>

        <!-- Grant by Nickname -->
        <div style="margin-bottom: 14px;">
          <label style="font-size: 11px; font-weight: 700; color: var(--text-muted); display: block; margin-bottom: 6px;">
            1. Призначити за нікнеймом гравця:
          </label>
          <div style="display: flex; gap: 8px;">
            <input type="text" id="adminGrantNickInput" placeholder="Нікнейм або email друга..." style="flex: 1; background: #090d14; border: 1px solid var(--border-color); border-radius: 6px; padding: 8px 10px; color: #fff; font-size: 12px; outline: none;" />
            <button onclick="adminGrantByNickname()" class="admin-btn success">
              ➕ Надати Права
            </button>
          </div>
        </div>

        <!-- List of Authorized Admins -->
        <div>
          <label style="font-size: 11px; font-weight: 700; color: #fff; display: block; margin-bottom: 6px;">
            👥 Список авторизованих адмінів:
          </label>
          <div style="display: flex; flex-direction: column; gap: 6px;">
            ${adminsList}
          </div>
        </div>
      </div>

      <!-- Force 100% Win Rate Toggle -->
      <div class="admin-control-card">
        <h4>🔥 100% FORCE WIN MODE (Підкрутка Апгрейду)</h4>
        <p style="font-size: 11px; color: var(--text-dim); margin-bottom: 10px;">
          При увімкненні цієї функції ВСІ ваші апгрейди виграватимуть зі 100% шансом незалежно від коефіцієнта!
        </p>
        <div style="display: flex; align-items: center; justify-content: space-between; gap: 10px;">
          <span style="font-size: 13px; font-weight: 800; color: ${state.adminForceWin ? 'var(--neon-green)' : 'var(--neon-red)'};">
            ${state.adminForceWin ? '🔥 FORCE WIN: 100% ВИГРАШ' : '❌ FORCE WIN: ЧЕСНИЙ ШАНС'}
          </span>
          <button onclick="adminToggleForceWin()" class="admin-btn ${state.adminForceWin ? 'danger' : ''}">
            ${state.adminForceWin ? 'Вимкнути 100% Win' : '🔥 Увімкнути 100% Win'}
          </button>
        </div>
      </div>

      <!-- Admin Financial Balance -->
      <div class="admin-control-card">
        <h4>⚡ Баланс & Фінанси Адміна</h4>
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <button onclick="adminAddBalance(1000)" class="admin-btn">+1 000 DP</button>
          <button onclick="adminAddBalance(10000)" class="admin-btn">+10 000 DP</button>
          <button onclick="adminAddBalance(100000)" class="admin-btn">+100 000 DP</button>
          <button onclick="adminSetInfiniteBalance()" class="admin-btn">∞ 999,999.00 DP</button>
        </div>
      </div>

      <!-- Skin Spawner -->
      <div class="admin-control-card">
        <h4>🎁 Спавнер Предметів (Skin Spawner)</h4>
        <p style="font-size: 11px; color: var(--text-dim); margin-bottom: 8px;">
          Оберіть будь-який предмет із 304 скінів для миттєвого додавання в інвентар:
        </p>
        <div style="display: flex; gap: 8px;">
          <select id="adminItemSelect" style="flex: 1; background: #090d14; border: 1px solid #ffd700; border-radius: 6px; padding: 8px 10px; color: #fff; font-size: 12px; outline: none;">
            ${catalogOptions}
          </select>
          <button onclick="adminSpawnSelectedSkin()" class="admin-btn">
            ⚡ Спавнити
          </button>
        </div>
      </div>

      <!-- Instant Top Knives & Gloves Pack -->
      <div class="admin-control-card">
        <h4>🗡️ Набір "Грааль Адміністратора"</h4>
        <p style="font-size: 11px; color: var(--text-dim); margin-bottom: 8px;">
          Миттєво заповнити інвентар найдорожчими предметами в грі (Dragon Lore, Gungnir, Butterfly Knife, Sport Gloves):
        </p>
        <button onclick="adminSpawnGrailPack()" class="admin-btn" style="width: 100%; justify-content: center;">
          👑 Спавнити ТОП-10 Ножів та Рукавиць
        </button>
      </div>

    </div>
  `;
}

// Admin Delegation Handlers
window.adminGrantByNickname = async function() {
  const input = document.getElementById('adminGrantNickInput');
  if (!input) return;
  const email = input.value.trim().toLowerCase();
  if (!email || !email.includes('@')) {
    showNotification('Будь ласка, введіть валідний Google e-mail користувача!', 'info');
    return;
  }
  try {
    await apiFetch('/api/admins', {
      method: 'POST',
      body: JSON.stringify({ email })
    });
    input.value = '';
    await renderAdminModalBody();
    audio.playWin();
    showNotification('👑 [ADMIN] Користувачу "' + email + '" успішно надано права Адміністратора!', 'info');
  } catch (err) {
    showNotification('Помилка: ' + err.message, 'info');
  }
};

window.adminRevokeUser = async function(idx) {
  if (idx <= 0) {
    showNotification('Головний власник не може позбавити себе прав!', 'info');
    return;
  }
  const target = state.authorizedAdmins[idx];
  if (!(await showConfirm('Ви впевнені, що хочете забрати права адміністратора у "' + target + '"?'))) return;

  try {
    await apiFetch('/api/admins?email=' + encodeURIComponent(target), { method: 'DELETE' });
    state.authorizedAdmins.splice(idx, 1);
    await renderAdminModalBody();
    audio.playClick();
    showNotification('🗑️ Права адміністратора для "' + target + '" успішно анульовано!', 'info');
  } catch (err) {
    showNotification('Помилка видалення: ' + err.message, 'info');
  }
};

window.adminRevokeByNickname = async function() {
  const input = document.getElementById('adminRevokeNickInput');
  if (!input) return;
  const name = input.value.trim();
  if (!name) {
    showNotification('Будь ласка, введіть нікнейм або email!', 'info');
    return;
  }
  const cleanName = name.toLowerCase();
  if (cleanName === 'кирило' || cleanName === 'kiril' || cleanName.includes('owner') || cleanName.includes('creator')) {
    showNotification('Неможливо забрати права у головного власника!', 'info');
    return;
  }
  const idx = state.authorizedAdmins.findIndex((a, i) => i > 0 && a.toLowerCase() === cleanName);
  if (idx === -1) {
    showNotification(`Користувача "${name}" не знайдено у списку додаткових адміністраторів.\n\nПеревірте правильність написання або видаліть через кнопку у списку нижче.`, 'info');
    return;
  }
  await window.adminRevokeUser(idx);
  input.value = '';
};

window.redeemAdminKey = function() {
  showNotification('🔒 Реєстрація адміністраторів здійснюється виключно через офіційний сервер та Google OAuth головним власником проєкту.', 'info');
};

window.adminToggleMode = async function() {
  if (!state.adminMode) {
    try {
      const sessionRes = await apiFetch('/api/admin-session', { method: 'POST' });
      if (sessionRes && sessionRes.isAdmin) {
        state.adminMode = true;
        state.isOwner = Boolean(sessionRes.isOwner);
        state.userRole = sessionRes.role || 'admin';
        showNotification('👑 Права адміністратора підтверджено сервером!', 'info');
      } else {
        showNotification('❌ У вашого облікового запису немає прав адміністратора.', 'info');
        return;
      }
    } catch(e) {
      showNotification('🔒 Потрібна авторизація облікового запису адміністратора.', 'info');
      return;
    }
  } else {
    state.adminMode = false;
  }
  updateUi();
  renderAdminModalBody();
  audio.playClick();
};

window.adminToggleForceWin = async function() {
  if (!state.adminMode) {
    showNotification('🔒 Доступ заборонено! Потрібні права адміністратора.', 'info');
    return;
  }
  try {
    const res = await apiFetch('/api/admin/action', {
      method: 'POST',
      body: JSON.stringify({ action: 'TOGGLE_FORCE_WIN', payload: { forceWin: !state.adminForceWin } })
    });
    if (res && res.success) {
      state.adminForceWin = res.forceWin;
      localStorage.setItem('upgrader_demo_admin_force_win', JSON.stringify(state.adminForceWin));
      renderAdminModalBody();
      audio.playWin();
      showToastNotification(state.adminForceWin ? '🔥 FORCE WIN: Увімкнено 100% виграш на сервері!' : '❌ FORCE WIN: Вимкнено. Чесний шанс!');
    }
  } catch (err) {
    showNotification('Помилка сервера: ' + err.message, 'info');
  }
};

window.adminAddBalance = async function(amount) {
  if (!state.adminMode) {
    showNotification('🔒 Доступ заборонено! Потрібні права адміністратора.', 'info');
    return;
  }
  try {
    const res = await apiFetch('/api/admin/action', {
      method: 'POST',
      body: JSON.stringify({ action: 'ADD_BALANCE', payload: { amount: amount * 100 } })
    });
    if (res && res.newBalance !== undefined) {
      state.balance = res.newBalance / 100;
      updateUi();
      renderAdminModalBody();
      audio.playWin();
      if (particleInstance) particleInstance.burst();
      showNotification('👑 Баланс успішно поповнено на ' + amount + ' DP!', 'info');
    }
  } catch (err) {
    showNotification('Помилка сервера: ' + err.message, 'info');
  }
};

window.adminSetInfiniteBalance = async function() {
  if (!state.adminMode) {
    showNotification('🔒 Доступ заборонено! Потрібні права адміністратора.', 'info');
    return;
  }
  try {
    const res = await apiFetch('/api/admin/action', {
      method: 'POST',
      body: JSON.stringify({ action: 'SET_BALANCE', payload: { balance: 99999900 } })
    });
    if (res && res.newBalance !== undefined) {
      state.balance = res.newBalance / 100;
      updateUi();
      renderAdminModalBody();
      audio.playWin();
      if (particleInstance) particleInstance.burst();
      showNotification('👑 Встановлено баланс 999,999.00 DP!', 'info');
    }
  } catch (err) {
    showNotification('Помилка сервера: ' + err.message, 'info');
  }
};

window.adminSpawnSelectedSkin = async function() {
  if (!state.adminMode) {
    showNotification('🔒 Доступ заборонено! Потрібні права адміністратора.', 'info');
    return;
  }
  const select = document.getElementById('adminItemSelect');
  if (!select) return;
  const itemId = select.value;
  try {
    const res = await apiFetch('/api/admin/action', {
      method: 'POST',
      body: JSON.stringify({ action: 'SPAWN_SKIN', payload: { itemId: itemId } })
    });
    if (res && res.spawnedItem) {
      await state.syncWithServer();
      audio.playWin();
      if (particleInstance) particleInstance.burst();
      showNotification('👑 [ADMIN] Успішно додано "' + res.spawnedItem.name + '" в інвентар!', 'info');
    }
  } catch (err) {
    showNotification('Помилка сервера: ' + err.message, 'info');
  }
};

window.adminSpawnGrailPack = async function() {
  if (!state.adminMode) {
    showNotification('🔒 Доступ заборонено! Потрібні права адміністратора.', 'info');
    return;
  }
  try {
    const res = await apiFetch('/api/admin/action', {
      method: 'POST',
      body: JSON.stringify({ action: 'SPAWN_GRAIL_PACK', payload: {} })
    });
    if (res && res.success) {
      await state.syncWithServer();
      audio.playWin();
      if (particleInstance) particleInstance.burst();
      showNotification('👑 [ADMIN] Спавнено ' + res.count + ' топових ножів та рукавиць!', 'info');
    }
  } catch (err) {
    showNotification('Помилка сервера: ' + err.message, 'info');
  }
};

// ==========================================
// 9. CS2 COSMETICS INSPECTION & CUSTOMIZATION
// ==========================================
window.openInspectModal = function(instanceId, isVault = false) {
  const sourceList = isVault ? (state.vault || []) : state.inventory;
  const item = sourceList.find(i => i.instanceId === instanceId);
  if (!item) return;
  renderInspectModalBody(item, false);
};

window.openInspectModalCatalog = function(itemId) {
  const template = ITEM_CATALOG.find(i => i.id === itemId);
  if (!template) return;
  const enriched = typeof enrichWeaponProperties === 'function' ? enrichWeaponProperties(template) : template;
  renderInspectModalBody(enriched, true);
};

function renderInspectModalBody(item, isCatalog = false) {
  const modal = document.getElementById('itemInspectModal');
  const body = document.getElementById('itemInspectModalBody');
  const title = document.getElementById('inspectModalTitle');
  if (!modal || !body) return;

  const rarity = RARITIES[item.rarity] || RARITIES.common;
  const safeName = escapeHtml(item.name);
  const safeCat = escapeHtml(item.category || 'Предмет');
  const safeImg = escapeHtml(item.image);
  const broadType = typeof getItemBroadType === 'function' ? getItemBroadType(item) : 'weapon';

  if (title) title.textContent = safeName;

  // 4 Sticker Position Slots
  const appliedStickers = item.appliedStickers || [];
  const stickerSlotsHtml = [1, 2, 3, 4].map(pos => {
    const sticker = appliedStickers.find(s => s.position === pos);
    if (sticker) {
      return `
        <div class="sticker-slot-box has-sticker" title="${escapeHtml(sticker.name)} (Позиція ${pos})">
          <img src="${escapeHtml(sticker.image)}" class="sticker-slot-img" alt="Sticker" />
          <span class="sticker-slot-label">Позиція ${pos}</span>
        </div>
      `;
    }
    return `
      <div class="sticker-slot-box" title="Вільне місце для наклейки (Позиція ${pos})">
        <span style="font-size: 16px; opacity: 0.3;">➕</span>
        <span class="sticker-slot-label">Позиція ${pos}</span>
      </div>
    `;
  }).join('');

  // Charm Slot
  const charm = item.attachedCharm;
  const charmSlotHtml = charm ? `
    <div style="display: flex; align-items: center; gap: 10px; background: rgba(255, 215, 0, 0.08); border: 1px solid rgba(255, 215, 0, 0.4); border-radius: 8px; padding: 10px; margin-top: 10px;">
      <img src="${escapeHtml(charm.image)}" style="width: 40px; height: 40px; object-fit: contain;" alt="Charm" />
      <div>
        <div style="font-size: 11px; color: #ffd700; font-weight: 800;">🧸 ПРИКРІПЛЕНИЙ БРЕЛОК</div>
        <div style="font-size: 13px; font-weight: 700; color: #fff;">${escapeHtml(charm.name)}</div>
      </div>
    </div>
  ` : '';

  // Float Needle % position
  const floatVal = typeof item.float === 'number' ? item.float : null;
  const floatPercent = floatVal !== null ? Math.min(Math.max(floatVal * 100, 0), 100) : 0;
  const wearObj = floatVal !== null && typeof getWearByFloat === 'function' ? getWearByFloat(floatVal) : null;

  body.innerHTML = `
    <div>
      <!-- Main Showcase -->
      <div class="inspect-showcase-box" style="border-color: ${rarity.border}; box-shadow: 0 0 25px ${rarity.glow};">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <span class="card-rarity-badge" style="color: ${rarity.color}; background: ${rarity.glow}; border: 1px solid ${rarity.border};">
            ${rarity.name}
          </span>
          <div style="display: flex; gap: 6px;">
            ${item.isStatTrak ? '<span class="card-stattrak-tag">StatTrak™ (' + (item.statTrakKills || 0) + ' kills)</span>' : ''}
            ${wearObj ? `<span class="card-wear-tag" style="color: ${wearObj.color};">${wearObj.nameUa} (${wearObj.code})</span>` : ''}
          </div>
        </div>

        <img src="${safeImg}" alt="${safeName}" class="inspect-main-img" onerror="if(!this.dataset.fallback){this.dataset.fallback=1;this.src='gungnir.png';}" />
        
        <h3 style="font-size: 17px; font-weight: 900; color: #fff; margin-top: 14px;">${safeName}</h3>
        <p style="font-size: 12px; color: var(--text-dim); margin-top: 2px;">${safeCat} ${item.collection ? '&bull; ' + escapeHtml(item.collection) : ''}</p>
        <div style="font-size: 16px; font-weight: 900; color: var(--neon-green); margin-top: 8px;">
          ${item.price.toFixed(2)} DP
        </div>
      </div>

      <!-- Float Meter if Weapon -->
      ${floatVal !== null ? `
        <div class="float-meter-wrap">
          <div style="display: flex; justify-content: space-between; font-size: 12px;">
            <span style="font-weight: 700; color: #fff;">Wear Rating (Float):</span>
            <span style="font-weight: 800; color: var(--neon-cyan);">${floatVal.toFixed(6)}</span>
          </div>
          <div class="float-meter-track">
            <div class="float-indicator-needle" style="left: ${floatPercent}%;"></div>
          </div>
          <div class="float-labels-row">
            <span>FN 0.00</span>
            <span>MW 0.07</span>
            <span>FT 0.15</span>
            <span>WW 0.38</span>
            <span>BS 0.45 - 1.00</span>
          </div>
        </div>
      ` : ''}

      <!-- Applied Stickers Positions (For Weapons) -->
      ${broadType === 'weapon' ? `
        <div style="margin-top: 12px;">
          <div style="font-size: 12px; font-weight: 800; color: #fff; margin-bottom: 6px;">🏷️ Позиції наклейок на зброї (Слоти 1 - 4):</div>
          <div class="inspect-stickers-overlay">
            ${stickerSlotsHtml}
          </div>
          ${charmSlotHtml}
        </div>
      ` : ''}

      <!-- Item Description if Sticker or Charm -->
      ${item.description ? `
        <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-color); border-radius: 8px; padding: 12px; margin-top: 12px; font-size: 12px; color: var(--text-muted); line-height: 1.5;">
          ℹ️ ${escapeHtml(item.description)}
        </div>
      ` : ''}

      <!-- Action Buttons -->
      <div style="display: flex; gap: 8px; margin-top: 18px;">
        ${!isCatalog && broadType === 'weapon' ? `
          <button onclick="document.getElementById('itemInspectModal').classList.remove('open'); openCustomizeModal('${escapeHtml(item.instanceId)}');" class="google-login-btn" style="flex: 1; justify-content: center; background: linear-gradient(135deg, var(--neon-cyan), #0072ff); color: #000; font-weight: 800;">
            🎨 Нанести наклейки / Брелок
          </button>
        ` : ''}
        <button onclick="document.getElementById('itemInspectModal').classList.remove('open');" class="quick-action-btn" style="flex: 1; justify-content: center; padding: 10px;">
          Закрити
        </button>
      </div>
    </div>
  `;

  modal.classList.add('open');
  audio.playClick();
}

window.openCustomizeModal = function(instanceId) {
  const item = state.inventory.find(i => i.instanceId === instanceId);
  if (!item) return;

  const modal = document.getElementById('weaponCustomizeModal');
  const body = document.getElementById('weaponCustomizeModalBody');
  if (!modal || !body) return;

  const ownedStickers = state.inventory.filter(i => (typeof getItemBroadType === 'function' ? getItemBroadType(i) : '') === 'sticker');
  const ownedCharms = state.inventory.filter(i => (typeof getItemBroadType === 'function' ? getItemBroadType(i) : '') === 'charm');

  const applied = item.appliedStickers || [];
  const safeInstId = escapeHtml(item.instanceId);

  body.innerHTML = `
    <div>
      <div style="display: flex; align-items: center; gap: 12px; background: var(--bg-surface); border: 1px solid var(--border-color); padding: 12px; border-radius: var(--radius-md); margin-bottom: 14px;">
        <img src="${escapeHtml(item.image)}" style="width: 80px; height: 50px; object-fit: contain;" alt="Weapon" />
        <div>
          <h4 style="font-size: 14px; color: #fff; font-weight: 800;">${escapeHtml(item.name)}</h4>
          <span style="font-size: 11px; color: var(--text-dim);">${escapeHtml(item.category)} &bull; ${item.price.toFixed(2)} DP</span>
        </div>
      </div>

      <!-- Sticker Slots Config -->
      <div style="margin-bottom: 16px;">
        <div style="font-size: 12px; font-weight: 800; color: #fff; margin-bottom: 8px;">🏷️ Слоти наклейок (4 позиції):</div>
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px;">
          ${[1, 2, 3, 4].map(pos => {
            const sticker = applied.find(s => s.position === pos);
            if (sticker) {
              return `
                <div style="background: rgba(0, 240, 255, 0.08); border: 1px solid var(--neon-cyan); border-radius: 8px; padding: 8px; text-align: center;">
                  <img src="${escapeHtml(sticker.image)}" style="width: 42px; height: 42px; object-fit: contain;" alt="Sticker" />
                  <div style="font-size: 10px; font-weight: 700; color: #fff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-top: 4px;">${escapeHtml(sticker.name)}</div>
                  <button onclick="removeStickerFromWeapon('${safeInstId}', ${pos})" class="quick-action-btn danger" style="font-size: 9px; padding: 2px 6px; margin-top: 6px;">Здерти</button>
                </div>
              `;
            }
            return `
              <div style="background: rgba(255, 255, 255, 0.02); border: 1px dashed rgba(255, 255, 255, 0.2); border-radius: 8px; padding: 8px; text-align: center;">
                <div style="font-size: 18px; opacity: 0.3; margin-top: 6px;">➕</div>
                <div style="font-size: 10px; color: var(--text-dim); margin-top: 4px;">Поз. ${pos}</div>
                <div style="font-size: 9px; color: var(--neon-cyan); margin-top: 6px;">Вільне</div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Choose Sticker to Apply -->
      <div style="margin-bottom: 16px;">
        <div style="font-size: 12px; font-weight: 800; color: #fff; margin-bottom: 6px;">
          🎒 Наклейки у вашому інвентарі (${ownedStickers.length}):
        </div>
        ${ownedStickers.length > 0 ? `
          <div class="customize-grid">
            ${ownedStickers.map(stk => `
              <div class="customize-item-card" onclick="promptApplySticker('${safeInstId}', '${escapeHtml(stk.instanceId)}')">
                <img src="${escapeHtml(stk.image)}" style="width: 48px; height: 48px; object-fit: contain;" alt="Sticker" />
                <div style="font-size: 11px; font-weight: 700; color: #fff; margin-top: 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${escapeHtml(stk.name)}</div>
                <div style="font-size: 10px; color: var(--neon-green); font-weight: 700;">${stk.price.toFixed(2)} DP</div>
                <button class="quick-action-btn" style="width: 100%; margin-top: 4px; font-size: 10px;">Наклеїти ➔</button>
              </div>
            `).join('')}
          </div>
        ` : `
          <div style="font-size: 12px; color: var(--text-dim); padding: 8px; background: rgba(255,255,255,0.02); border-radius: 6px;">
            У вас немає вільних наклейок в інвентарі. Отримайте їх через Арену Апгрейду або "+ Отримати Демо-Дроп"!
          </div>
        `}
      </div>

      <!-- Charm Config & Attachment -->
      <div>
        <div style="font-size: 12px; font-weight: 800; color: #fff; margin-bottom: 6px;">
          🧸 Брелок на зброї:
        </div>
        ${item.attachedCharm ? `
          <div style="display: flex; align-items: center; justify-content: space-between; background: rgba(255, 215, 0, 0.08); border: 1px solid rgba(255, 215, 0, 0.4); border-radius: 8px; padding: 10px; margin-bottom: 10px;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <img src="${escapeHtml(item.attachedCharm.image)}" style="width: 36px; height: 36px; object-fit: contain;" alt="Charm" />
              <div>
                <div style="font-size: 12px; font-weight: 700; color: #fff;">${escapeHtml(item.attachedCharm.name)}</div>
                <div style="font-size: 10px; color: var(--neon-green);">${item.attachedCharm.price.toFixed(2)} DP</div>
              </div>
            </div>
            <button onclick="detachCharmFromWeapon('${safeInstId}')" class="quick-action-btn danger">Зняти брелок</button>
          </div>
        ` : `
          <div style="font-size: 12px; color: var(--text-dim); margin-bottom: 8px;">Брелок не прикріплений.</div>
        `}

        ${!item.attachedCharm && ownedCharms.length > 0 ? `
          <div class="customize-grid" style="max-height: 140px;">
            ${ownedCharms.map(chm => `
              <div class="customize-item-card" onclick="attachCharmToWeapon('${safeInstId}', '${escapeHtml(chm.instanceId)}')">
                <img src="${escapeHtml(chm.image)}" style="width: 44px; height: 44px; object-fit: contain;" alt="Charm" />
                <div style="font-size: 11px; font-weight: 700; color: #fff; margin-top: 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${escapeHtml(chm.name)}</div>
                <button class="quick-action-btn" style="width: 100%; margin-top: 4px; font-size: 10px;">Прикріпити ➔</button>
              </div>
            `).join('')}
          </div>
        ` : ''}
      </div>

      <div style="margin-top: 16px;">
        <button onclick="document.getElementById('weaponCustomizeModal').classList.remove('open');" class="quick-action-btn" style="width: 100%; padding: 10px; justify-content: center;">
          Готово
        </button>
      </div>
    </div>
  `;

  modal.classList.add('open');
  audio.playClick();
};

window.promptApplySticker = function(weaponInstId, stickerInstId) {
  const weapon = state.inventory.find(i => i.instanceId === weaponInstId);
  const stickerIndex = state.inventory.findIndex(i => i.instanceId === stickerInstId);
  if (!weapon || stickerIndex === -1) return;

  const applied = weapon.appliedStickers || [];
  const availableSlots = [1, 2, 3, 4].filter(pos => !applied.some(s => s.position === pos));
  if (availableSlots.length === 0) {
    showNotification('❌ На цій зброї вже наклеєно максимум (4 наклейки)! Здеріть одну, щоб наклеїти нову.', 'info');
    return;
  }

  const slotStr = prompt(`Оберіть вільну позицію для наклейки (${availableSlots.join(', ')}):`, availableSlots[0]);
  const chosenPos = parseInt(slotStr, 10);
  if (!availableSlots.includes(chosenPos)) {
    showNotification('❌ Невірна позиція!', 'info');
    return;
  }

  const sticker = state.inventory.splice(stickerIndex, 1)[0];
  if (!weapon.appliedStickers) weapon.appliedStickers = [];
  weapon.appliedStickers.push({
    position: chosenPos,
    id: sticker.id,
    name: sticker.name,
    image: sticker.image,
    price: sticker.price
  });

  state.saveInventory();
  updateUi();
  openCustomizeModal(weaponInstId);
  audio.playWin();
  if (particleInstance) particleInstance.burst();
};

window.removeStickerFromWeapon = function(weaponInstId, position) {
  const weapon = state.inventory.find(i => i.instanceId === weaponInstId);
  if (!weapon || !weapon.appliedStickers) return;
  const idx = weapon.appliedStickers.findIndex(s => s.position === position);
  if (idx !== -1) {
    const removed = weapon.appliedStickers.splice(idx, 1)[0];
    // Return sticker to inventory
    state.inventory.unshift({
      id: removed.id,
      name: removed.name,
      category: 'Sticker',
      type: 'sticker',
      rarity: 'rare',
      price: removed.price || 50,
      image: removed.image,
      instanceId: 'inst_stk_ret_' + Date.now()
    });
    state.saveInventory();
    updateUi();
    openCustomizeModal(weaponInstId);
    audio.playClick();
  }
};

window.attachCharmToWeapon = function(weaponInstId, charmInstId) {
  const weapon = state.inventory.find(i => i.instanceId === weaponInstId);
  const charmIndex = state.inventory.findIndex(i => i.instanceId === charmInstId);
  if (!weapon || charmIndex === -1) return;

  if (weapon.attachedCharm) {
    // Return existing charm
    state.inventory.unshift({
      id: weapon.attachedCharm.id,
      name: weapon.attachedCharm.name,
      category: 'Charm',
      type: 'charm',
      rarity: 'legendary',
      price: weapon.attachedCharm.price || 150,
      image: weapon.attachedCharm.image,
      instanceId: 'inst_chm_ret_' + Date.now()
    });
  }

  const charm = state.inventory.splice(charmIndex, 1)[0];
  weapon.attachedCharm = {
    id: charm.id,
    name: charm.name,
    image: charm.image,
    price: charm.price
  };

  state.saveInventory();
  updateUi();
  openCustomizeModal(weaponInstId);
  audio.playWin();
  if (particleInstance) particleInstance.burst();
};

window.detachCharmFromWeapon = function(weaponInstId) {
  const weapon = state.inventory.find(i => i.instanceId === weaponInstId);
  if (!weapon || !weapon.attachedCharm) return;

  const detached = weapon.attachedCharm;
  weapon.attachedCharm = null;

  state.inventory.unshift({
    id: detached.id,
    name: detached.name,
    category: 'Charm',
    type: 'charm',
    rarity: 'legendary',
    price: detached.price || 150,
    image: detached.image,
    instanceId: 'inst_chm_det_' + Date.now()
  });

  state.saveInventory();
  updateUi();
  openCustomizeModal(weaponInstId);
  audio.playClick();
};


// ==================== CASES LOGIC ====================
function renderCasesShop() {
  const container = document.getElementById('casesDisplayContainer');
  if (!container) return;
  container.innerHTML = '';
  if (typeof CASES_CATALOG === 'undefined') return;

  CASES_CATALOG.forEach(c => {
    const card = document.createElement('div');
    card.className = 'item-card';
    card.style.borderColor = 'var(--neon-cyan)';
    
    card.innerHTML = `
      <div class="item-wear-badge" style="background:var(--neon-cyan)">📦 Кейс</div>
      <div class="item-name">${c.name}</div>
      <img src="${c.image}" alt="${c.name}" style="max-height: 120px;" />
      <div class="item-price">${c.price.toFixed(2)} DP</div>
      <div style="font-size: 10px; color: #aaa; margin: 5px 0; text-align: center;">${c.description}</div>
      
      <div style="font-size: 9px; text-align: center; margin-bottom: 10px; background: rgba(0,0,0,0.5); padding: 5px; border-radius: 4px;">
        <span style="color:#b0c3d9">Звичайні: 70%</span> | 
        <span style="color:#5e98d9">Рідкісні: 20%</span> <br/>
        <span style="color:#8847ff">Епічні: 8%</span> | 
        <span style="color:#d32ce6">Легендарні: 1.5%</span> | 
        <span style="color:#eb4b4b">Міфічні: 0.5%</span>
      </div>

      <button class="select-btn" style="background:var(--neon-cyan); border:none; margin-top: auto; padding: 10px; color: #000; font-weight: bold; border-radius: 4px; cursor: pointer;">
        Відкрити (${c.price} DP)
      </button>
    `;
    
    card.querySelector('button').addEventListener('click', () => {
      startCaseOpening(c);
    });
    container.appendChild(card);
  });
}

async function startCaseOpening(caseObj) {
  if (window.isOpeningCase) return;
  window.isOpeningCase = true;
  if (state.balance < caseObj.price) {
    if (typeof showNotification === 'function') showNotification('Недостатньо DP для відкриття кейсу!', 'error');
    else showNotification('Недостатньо DP для відкриття кейсу!', 'error');
    window.isOpeningCase = false;
    return;
  }
  
  // Call server securely first before local state update
  let wonItem = null;
  try {
    const res = await apiFetch('/api/game/open-case', {
      method: 'POST',
      body: JSON.stringify({ caseId: caseObj.id })
    });
    if (!res || !res.item) throw new Error('Помилка сервера');
    wonItem = res.item;
  } catch (err) {
    if (typeof showNotification === 'function') showNotification(err.message || 'Помилка відкриття кейсу', 'error');
    else showNotification(err.message || 'Помилка відкриття кейсу', 'error');
    window.isOpeningCase = false;
    return;
  }

  state.balance -= caseObj.price;
  updateUi();
  state.saveBalance();

  const TOTAL_ITEMS = 40;
  const WIN_INDEX = 35;

  let dropPool = ITEM_CATALOG.filter(i => {
    if (caseObj.containsType === 'charm') return i.type === 'charm';
    if (caseObj.containsType === 'sticker') return i.type === 'sticker';
    if (caseObj.containsType === 'grail') return ['legendary', 'mythic', 'ancient'].includes(i.rarity);
    if (caseObj.containsType === 'dreams') return ['common', 'rare', 'epic'].includes(i.rarity);
    return true;
  });
  if (dropPool.length === 0) dropPool = ITEM_CATALOG.filter(i => i.rarity === 'common');

  const stripItems = [];
  for (let i = 0; i < TOTAL_ITEMS; i++) {
    if (i === WIN_INDEX) {
      stripItems.push(wonItem);
    } else {
      stripItems.push(dropPool[Math.floor(Math.random() * dropPool.length)]);
    }
  }

  // Build UI
  const modal = document.createElement('div');
  modal.className = 'case-opening-modal';
  
  const title = document.createElement('h2');
  title.innerText = 'Відкриття ' + caseObj.name;
  title.style.color = 'var(--neon-cyan)';
  title.style.marginBottom = '20px';
  modal.appendChild(title);
  
  const windowDiv = document.createElement('div');
  windowDiv.className = 'case-opening-window';
  
  const stripDiv = document.createElement('div');
  stripDiv.className = 'case-opening-strip';
  
  stripItems.forEach(i => {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'case-strip-item';
    const rarColor = RARITIES[i.rarity] ? RARITIES[i.rarity].color : '#fff';
    itemDiv.style.borderBottom = '4px solid ' + rarColor;
    
    itemDiv.innerHTML = `<img src="${i.image}" /><span style="color:${rarColor}">${i.name}</span>`;
    stripDiv.appendChild(itemDiv);
  });
  
  const centerLine = document.createElement('div');
  centerLine.className = 'case-opening-center-line';
  
  windowDiv.appendChild(stripDiv);
  windowDiv.appendChild(centerLine);
  modal.appendChild(windowDiv);
  
  const skipBtn = document.createElement('button');
  skipBtn.className = 'primary-btn';
  skipBtn.style.marginTop = '20px';
  skipBtn.style.borderColor = '#fff';
  skipBtn.style.color = '#fff';
  skipBtn.innerText = 'Пропустити анімацію';
  modal.appendChild(skipBtn);
  
  document.body.appendChild(modal);
  
  let isSkipped = false;
  let animTimeout;
  
  const finishOpening = () => {
    if (typeof audio !== 'undefined' && audio.playWin) audio.playWin();
    skipBtn.remove();
    const wonModal = document.createElement('div');
    wonModal.className = 'case-won-modal';
    const rarCol = RARITIES[wonItem.rarity] ? RARITIES[wonItem.rarity].color : '#fff';
    wonModal.innerHTML = `
      <h2 style="color:${rarCol}">${wonItem.name}</h2>
      <img src="${wonItem.image}" />
      <p style="margin: 15px 0;">Вартість: ${wonItem.price.toFixed(2)} DP</p>
      <button class="primary-btn" style="margin-top: 15px; border-color:var(--neon-green); color:var(--neon-green);">
        Забрати в інвентар
      </button>
    `;
    
    wonModal.querySelector('button').addEventListener('click', () => {
      state.inventory.unshift(wonItem); // Add to beginning
      state.saveInventory();
      updateUi();
      if (state.activeTab === 'inventory') renderTabContent();
      modal.remove();
      window.isOpeningCase = false;
    });
    
    modal.appendChild(wonModal);
  };

  skipBtn.addEventListener('click', () => {
    isSkipped = true;
    clearTimeout(animTimeout);
    stripDiv.style.transition = 'none';
    const offset = (WIN_INDEX * 150) + 75 - (windowDiv.offsetWidth / 2);
    stripDiv.style.transform = 'translateX(-' + offset + 'px)';
    finishOpening();
  });

  // Animate
  if (typeof audio !== 'undefined' && audio.playStart) audio.playStart();
  setTimeout(() => {
    if (isSkipped) return;
    const jitter = Math.floor(Math.random() * 100) - 50; 
    const offset = (WIN_INDEX * 150) + 75 - (windowDiv.offsetWidth / 2) + jitter;
    
    stripDiv.style.transform = 'translateX(-' + offset + 'px)';
  }, 100);
  
  animTimeout = setTimeout(() => {
    if (!isSkipped) finishOpening();
  }, 8100);
}
// =====================================================




