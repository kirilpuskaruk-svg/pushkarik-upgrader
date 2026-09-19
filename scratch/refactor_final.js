const fs = require('fs');
let code = fs.readFileSync('app.js', 'utf8');

const apiFetch = `
async function apiFetch(endpoint, options = {}) {
  if (!googleAuth || !googleAuth.idToken) {
    const modal = document.getElementById('googleAuthModal');
    if (modal) modal.classList.add('open');
    throw new Error('Увійдіть через Google');
  }
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': \`Bearer \${googleAuth.idToken}\`,
    ...options.headers
  };
  const response = await fetch(endpoint, { ...options, headers });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Server error');
  return data;
}
`;
code = code.replace(/function escapeHtml\(str\) \{/, apiFetch + '\nfunction escapeHtml(str) {');

code = code.replace(/login\(userObj, idToken = null\) \{[\s\S]*?particleInstance\.burst\(\);\s*\}/, 
`login(userObj, idToken = null) {
    this.user = userObj;
    this.idToken = idToken;
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
  }`);

code = code.replace(/loadUser\(\) \{[\s\S]*?\}\s*\}/, 
`loadUser() {
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
  }`);

code = code.replace(/loadAll\(\) \{/, 
`
  async syncWithServer() {
    if (!googleAuth || !googleAuth.idToken) return;
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

  loadAll() {
`);

code = code.replace(/this\.loadAll\(\);/, `this.loadAll(); this.syncWithServer();`);
code = code.replace(/saveBalance\(\) \{[\s\S]*?\}\s*saveInventory/g, `saveBalance() { /* server */ }\n  saveInventory`);
code = code.replace(/saveInventory\(\) \{[\s\S]*?\}\s*saveVault/g, `saveInventory() { /* server */ }\n  saveVault`);

const upgradeLogicRegex = /function handleUpgradeClick\(e\) \{[\s\S]*?function showResultModal/m;
const newUpgradeLogic = `
async function handleUpgradeClick(e) {
  if (state.isSpinning) return;
  if (!state.selectedSource || !state.selectedTarget) {
      alert('Оберіть предмети');
      return;
  }
  if (state.selectedTarget.price <= state.selectedSource.price) {
      alert('Не можна робити даунгрейд!');
      return;
  }

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

code = code.replace(upgradeLogicRegex, newUpgradeLogic);

code = code.replace(/function handleBuyBooster\(type\) \{[\s\S]*?updateUi\(\);\s*\}/, 
`function handleBuyBooster(type) {
    const btn = event.target;
    if (btn) btn.disabled = true;
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
}`);

code = code.replace(/function handleSellVaultItem\(instanceId\) \{[\s\S]*?updateUi\(\);\s*\}/, 
`function handleSellVaultItem(instanceId) {
  const item = state.vault.find(i => i.instanceId === instanceId);
  if (!item || !item.db_id) return alert('Помилка предмету');
  
  apiFetch('/api/game/sell', {
    method: 'POST',
    body: JSON.stringify({ itemDbId: item.db_id, idempotencyKey: 'sel_' + Date.now() + Math.random() })
  }).then(async () => {
    await state.syncWithServer();
    showToast(\`Предмет продано\`, 'success');
    renderVaultWithdrawModalContent();
  }).catch(e => alert('Помилка продажу: ' + e.message));
}`);

code = code.replace(/function handleConfirmWithdraw\(\) \{[\s\S]*?showToast\('Переміщено в активний інвентар', 'success'\);\s*\}[\s\S]*?\}/, 
`function handleConfirmWithdraw() {
  if (!vaultState.selectedItem || !vaultState.selectedItem.db_id) return;
  const item = vaultState.selectedItem;
  const isCurrentlyInVault = vaultState.withdrawMode === 'return';
  const targetStatus = isCurrentlyInVault ? 'ACTIVE' : 'VAULT';

  apiFetch('/api/game/vault-withdraw', {
    method: 'POST',
    body: JSON.stringify({
      itemDbIds: [item.db_id],
      targetStatus: targetStatus,
      idempotencyKey: 'vlt_' + Date.now() + Math.random()
    })
  }).then(async () => {
    await state.syncWithServer();
    const modal = document.getElementById('vaultWithdrawModal');
    if (modal) modal.classList.remove('open');
    showToast('Переміщено успішно', 'success');
  }).catch(e => alert('Помилка: ' + e.message));
}`);

code = code.replace(/function claimDemoBonus\(\) \{[\s\S]*?openDemoPackModal\(newItem\);\s*\}/, 
`function claimDemoBonus() {
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
}`);

fs.writeFileSync('app.js', code, 'utf8');
console.log('Modified app.js successfully!');
