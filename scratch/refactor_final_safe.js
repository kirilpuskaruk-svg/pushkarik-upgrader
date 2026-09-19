const fs = require('fs');
let code = fs.readFileSync('app.js', 'utf8');

function doReplace(desc, search, replace) {
  if (code.includes(search)) {
    code = code.replace(search, replace);
    console.log('[OK] ' + desc);
  } else {
    console.error('[FAIL] ' + desc);
  }
}

// 1. Add apiFetch
const escapeHtmlFn = "function escapeHtml(str) {";
const apiFetch = `
async function apiFetch(endpoint, options = {}) {
  if (!window.googleAuth || !window.googleAuth.idToken) {
    const modal = document.getElementById('googleAuthModal');
    if (modal) modal.classList.add('open');
    throw new Error('Увійдіть через Google (Токен відсутній)');
  }
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': \`Bearer \${window.googleAuth.idToken}\`,
    ...options.headers
  };
  const response = await fetch(endpoint, { ...options, headers });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Server error');
  return data;
}

`;
doReplace('apiFetch', escapeHtmlFn, apiFetch + escapeHtmlFn);

// 2. Fix GoogleAuthManager Login
const loginSearch = `  login(userObj) {
    this.user = userObj;
    localStorage.setItem('upgrader_demo_google_user_v10_real_only', JSON.stringify(userObj));
    updateUi();
    audio.playWin();
    if (particleInstance) particleInstance.burst();
  }`;
const loginReplace = `  login(userObj, idToken = null) {
    this.user = userObj;
    if (idToken) this.idToken = idToken;
    localStorage.setItem('upgrader_demo_google_user_v10_real_only', JSON.stringify(userObj));
    if (idToken) localStorage.setItem('upgrader_google_token', idToken);
    
    if (typeof state !== 'undefined' && state.syncWithServer) {
      state.syncWithServer().then(() => {
        updateUi();
        audio.playWin();
        if (particleInstance) particleInstance.burst();
      });
    } else {
      updateUi();
    }
  }`;
doReplace('Google Login', loginSearch, loginReplace);

// 3. Fix GoogleAuthManager LoadUser
const loadUserSearch = `  loadUser() {
    const saved = localStorage.getItem('upgrader_demo_google_user_v10_real_only');
    if (saved) {
      try {
        this.user = JSON.parse(saved);
      } catch(e) {
        this.user = null;
      }
    }
  }`;
const loadUserReplace = `  loadUser() {
    const saved = localStorage.getItem('upgrader_demo_google_user_v10_real_only');
    const savedToken = localStorage.getItem('upgrader_google_token');
    if (saved && savedToken) {
      try {
        this.user = JSON.parse(saved);
        this.idToken = savedToken;
      } catch(e) {
        this.user = null;
        this.idToken = null;
      }
    }
  }`;
doReplace('Google LoadUser', loadUserSearch, loadUserReplace);

// 4. Pass idToken in window.onGoogleSignIn
// The code in app.js has:
const googleSignInSearch = `        googleAuth.login({
          name: payload.name || 'Google User',
          email: payload.email || 'user@gmail.com',
          picture: payload.picture || 'https://lh3.googleusercontent.com/a/default-user',
          sub: payload.sub
        });`;
const googleSignInReplace = `        googleAuth.login({
          name: payload.name || 'Google User',
          email: payload.email || 'user@gmail.com',
          picture: payload.picture || 'https://lh3.googleusercontent.com/a/default-user',
          sub: payload.sub
        }, response.credential);`;
doReplace('onGoogleSignIn', googleSignInSearch, googleSignInReplace);


// 5. Add syncWithServer to AppState
const loadAllSearch = `  loadAll() {`;
const loadAllReplace = `  async syncWithServer() {
    if (!window.googleAuth || !window.googleAuth.idToken) return;
    try {
      const data = await apiFetch('/api/user/sync', { method: 'POST' });
      this.balance = data.user.balance / 100;
      
      this.inventory = data.inventory.map(dbItem => {
        const cat = ITEM_CATALOG.find(i => i.id === dbItem.id);
        return cat ? { ...cat, db_id: dbItem.db_id, instanceId: 'db_' + dbItem.db_id } : null;
      }).filter(Boolean);
      
      this.vault = data.vault.map(dbItem => {
        const cat = ITEM_CATALOG.find(i => i.id === dbItem.id);
        return cat ? { ...cat, db_id: dbItem.db_id, instanceId: 'db_' + dbItem.db_id } : null;
      }).filter(Boolean);
      
      this.activeBoosters = data.activeBoosters || [];
      updateUi();
    } catch(e) {
      console.error('Sync failed:', e);
    }
  }

  loadAll() {`;
doReplace('AppState syncWithServer', loadAllSearch, loadAllReplace);

const initLoadSearch = `this.loadAll();`;
const initLoadReplace = `this.loadAll();
    this.syncWithServer();`;
doReplace('AppState call sync', initLoadSearch, initLoadReplace);

// 6. Rewrite handleUpgradeClick
const handleUpgradeSearchRegex = /function handleUpgradeClick\(e\) \{[\s\S]*?function showResultModal/m;
const handleUpgradeReplace = `async function handleUpgradeClick(e) {
  if (state.isSpinning) return;
  if (!state.selectedSource || !state.selectedTarget) return alert('Оберіть предмети');
  if (state.selectedTarget.price <= state.selectedSource.price) return alert('Не можна робити даунгрейд!');

  state.isSpinning = true;
  updateUi();
  audio.playClick();
  if (particleInstance) particleInstance.startSpeed();

  try {
    const btn = document.getElementById('upgradeBtn');
    if(btn) { btn.disabled = true; btn.textContent = 'ОБРОБКА...'; }

    const data = await apiFetch('/api/game/upgrade', {
      method: 'POST',
      body: JSON.stringify({
        sourceItemId: state.selectedSource.id,
        targetItemCatalogId: state.selectedTarget.id,
        direction: state.rollDirection,
        idempotencyKey: 'upg_' + Date.now() + Math.random().toString(36).substring(7)
      })
    });

    const wheelValEl = document.getElementById('wheelRollValue');
    if(wheelValEl) wheelValEl.textContent = "ROLLING...";
    await new Promise(r => setTimeout(r, 2000));
    if(wheelValEl) wheelValEl.textContent = data.roll.toFixed(2);
    
    await state.syncWithServer();
    
    let resultItem = data.isWin ? state.selectedTarget : null;
    showResultModal(data.isWin, resultItem, data.roll, data.chance, null);

  } catch (error) {
    alert('Помилка оновлення: ' + error.message);
  } finally {
    state.isSpinning = false;
    if (particleInstance) particleInstance.stopSpeed();
    updateUi();
  }
}

function finishUpgrade(isWin, roll, chance) {}

function showResultModal`;
if (code.match(handleUpgradeSearchRegex)) {
  code = code.replace(handleUpgradeSearchRegex, handleUpgradeReplace);
  console.log('[OK] handleUpgradeClick');
} else {
  console.error('[FAIL] handleUpgradeClick');
}

// 7. Rewrite buyTemporaryBooster
const buyBoosterSearchRegex = /function buyTemporaryBooster\(boosterId\) \{[\s\S]*?updateUi\(\);\s*\}/;
const buyBoosterReplace = `function buyTemporaryBooster(boosterId) {
    const btn = event.target;
    if (btn) btn.disabled = true;
    let type = 'LUCK';
    if(boosterId === 'mega_luck') type = 'MEGA_LUCK';
    if(boosterId === 'shield') type = 'SHIELD';
    if(boosterId === 'cashback') type = 'CASHBACK';

    apiFetch('/api/game/buy-booster', {
      method: 'POST',
      body: JSON.stringify({ type: type, idempotencyKey: 'boo_' + Date.now() + Math.random() })
    }).then(async () => {
      await state.syncWithServer();
      showToast('Бустер активовано!', 'success');
      const modal = document.getElementById('boosterShopModal');
      if (modal) modal.classList.remove('open');
    }).catch(err => {
      alert('Помилка: ' + err.message);
    }).finally(() => {
      if (btn) btn.disabled = false;
      updateUi();
    });
}`;
if (code.match(buyBoosterSearchRegex)) {
  code = code.replace(buyBoosterSearchRegex, buyBoosterReplace);
  console.log('[OK] buyBooster');
} else {
  console.error('[FAIL] buyBooster');
}

// 8. Rewrite handleSellVaultItem
const sellVaultSearchRegex = /function handleSellVaultItem\(instanceId\) \{[\s\S]*?updateUi\(\);\s*\}/;
const sellVaultReplace = `function handleSellVaultItem(instanceId) {
  const item = state.vault.find(i => i.instanceId === instanceId);
  if (!item || !item.db_id) return alert('Помилка предмету');
  
  apiFetch('/api/game/sell', {
    method: 'POST',
    body: JSON.stringify({ itemDbId: item.db_id, idempotencyKey: 'sel_' + Date.now() + Math.random() })
  }).then(async () => {
    await state.syncWithServer();
    showToast('Предмет продано', 'success');
    renderVaultWithdrawModalContent();
  }).catch(e => alert('Помилка продажу: ' + e.message));
}`;
if (code.match(sellVaultSearchRegex)) {
  code = code.replace(sellVaultSearchRegex, sellVaultReplace);
  console.log('[OK] handleSellVaultItem');
} else {
  console.error('[FAIL] handleSellVaultItem');
}

// 9. Rewrite claimDemoBonus
const claimBonusSearchRegex = /function claimDemoBonus\(\) \{[\s\S]*?openDemoPackModal\(newItem\);\s*\}/;
const claimBonusReplace = `function claimDemoBonus() {
  apiFetch('/api/game/claim-bonus', {
    method: 'POST',
    body: JSON.stringify({ idempotencyKey: 'bon_' + Date.now() + Math.random() })
  }).then(async (data) => {
    await state.syncWithServer();
    audio.playWin();
    if (particleInstance) particleInstance.burst();
    const newItem = state.inventory.find(i => i.db_id === data.item.db_id);
    if (newItem) openDemoPackModal(newItem);
  }).catch(e => alert('Помилка: ' + e.message));
}`;
if (code.match(claimBonusSearchRegex)) {
  code = code.replace(claimBonusSearchRegex, claimBonusReplace);
  console.log('[OK] claimDemoBonus');
} else {
  console.error('[FAIL] claimDemoBonus');
}

// 10. Disable local saves
code = code.replace(/saveBalance\(\) \{[\s\S]*?\}\s*saveInventory/g, `saveBalance() { /* server */ }\n  saveInventory`);
code = code.replace(/saveInventory\(\) \{[\s\S]*?\}\s*saveVault/g, `saveInventory() { /* server */ }\n  saveVault`);

fs.writeFileSync('app.js', code, 'utf8');
console.log('ALL DONE!');
