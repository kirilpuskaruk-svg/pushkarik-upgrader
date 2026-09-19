const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, '../app.js');
let code = fs.readFileSync(appPath, 'utf8');

// 1. Add apiFetch helper at the top (after consts)
const apiFetchCode = `
// SERVER-SIDE API HELPER
async function apiFetch(endpoint, options = {}) {
  if (!googleAuth || !googleAuth.idToken) {
    alert('Помилка: Ви не авторизовані. Увійдіть через Google.');
    const modal = document.getElementById('googleAuthModal');
    if (modal) modal.classList.add('open');
    throw new Error('Not logged in');
  }

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': \`Bearer \${googleAuth.idToken}\`,
    ...options.headers
  };

  const response = await fetch(endpoint, { ...options, headers });
  const data = await response.json();
  if (!response.ok) {
    console.error('API Error:', data.error || 'Unknown error');
    throw new Error(data.error || 'Server error');
  }
  return data;
}
`;
code = code.replace(/const GOOGLE_CLIENT_ID = '.*';/, match => match + '\n' + apiFetchCode);

// 2. Fix GoogleAuthManager to persist token
code = code.replace(/login\(userObj, idToken = null\) \{[\s\S]*?\}/, `login(userObj, idToken = null) {
    this.user = userObj;
    this.idToken = idToken;
    localStorage.setItem('upgrader_demo_google_user_v10_real_only', JSON.stringify(userObj));
    if (idToken) localStorage.setItem('upgrader_google_token', idToken);
    
    // Sync with server immediately upon login
    state.syncWithServer().then(() => {
      updateUi();
      audio.playWin();
      if (particleInstance) particleInstance.burst();
    }).catch(e => console.error(e));
  }`);

code = code.replace(/loadUser\(\) \{[\s\S]*?\}/, `loadUser() {
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

// 3. AppState modifications
code = code.replace(/class AppState \{[\s\S]*?constructor\(\) \{[\s\S]*?this\.loadAll\(\);[\s\S]*?\}/, match => {
  return match + `
  async syncWithServer() {
    if (!googleAuth.idToken) return;
    try {
      const data = await apiFetch('/api/user/sync', { method: 'POST' });
      this.balance = data.user.balance / 100; // API returns cents
      
      // Map inventory from API to catalog items
      this.inventory = data.inventory.map(dbItem => {
        const cat = ITEM_CATALOG.find(i => i.id === dbItem.id);
        return cat ? { ...cat, db_id: dbItem.db_id, instanceId: 'db_' + dbItem.db_id } : null;
      }).filter(Boolean);
      
      this.vault = data.vault.map(dbItem => {
        const cat = ITEM_CATALOG.find(i => i.id === dbItem.id);
        return cat ? { ...cat, db_id: dbItem.db_id, instanceId: 'db_' + dbItem.db_id } : null;
      }).filter(Boolean);
      
      this.activeBoosters = data.activeBoosters;
      
      updateUi();
    } catch(e) {
      console.error('Sync failed:', e);
    }
  }
  `;
});

// Remove local storage saves
code = code.replace(/saveBalance\(\) \{[\s\S]*?\}/, `saveBalance() { /* handled by server */ }`);
code = code.replace(/saveInventory\(\) \{[\s\S]*?\}/, `saveInventory() { /* handled by server */ }`);
code = code.replace(/saveVault\(\) \{[\s\S]*?\}/, `saveVault() { /* handled by server */ }`);
code = code.replace(/saveBoosters\(\) \{[\s\S]*?\}/, `saveBoosters() { /* handled by server */ }`);

// 4. Handle Upgrade Click
code = code.replace(/async function handleUpgradeClick\(e\) \{[\s\S]*?let isWin = false;[\s\S]*?finishUpgrade\(isWin, roll, chance\);[\s\S]*?\}/, `
async function handleUpgradeClick(e) {
  if (isRolling) return;
  if (!state.selectedSource || !state.selectedTarget) return;
  if (state.calculateChance() <= 0) return;

  isRolling = true;
  updateUi();
  audio.playClick();
  
  if (particleInstance) particleInstance.startSpeed();

  try {
    const btn = document.getElementById('upgradeBtn');
    if(btn) { btn.disabled = true; btn.textContent = 'ОБРОБКА СЕРВЕРОМ...'; }

    // Call SERVER
    const data = await apiFetch('/api/game/upgrade', {
      method: 'POST',
      body: JSON.stringify({
        sourceItemId: state.selectedSource.id,
        targetItemCatalogId: state.selectedTarget.id,
        direction: state.rollDirection,
        idempotencyKey: 'upgrade_' + Date.now() + Math.random().toString(36).substring(7)
      })
    });

    // Animate and show results based on Server's RNG
    await animateRoll(data.roll);
    
    // Sync to get fresh items
    await state.syncWithServer();
    
    // Show modal
    let resultItem = data.isWin ? state.selectedTarget : null;
    showResultModal(data.isWin, resultItem, data.roll, data.chance, null, data.shieldUsed);

  } catch (error) {
    alert('Помилка оновлення: ' + error.message);
  } finally {
    isRolling = false;
    if (particleInstance) particleInstance.stopSpeed();
    updateUi();
  }
}
`);

// 5. Booster buying
code = code.replace(/if \(state\.balance < BOOSTER_PRICES\[type\]\) \{[\s\S]*?showToast\('Бустер активовано!', 'success'\);/, `
    const btn = e.target.closest('button');
    if (btn) btn.disabled = true;
    
    apiFetch('/api/game/buy-booster', {
      method: 'POST',
      body: JSON.stringify({
        type: type,
        idempotencyKey: 'booster_' + Date.now() + Math.random().toString(36).substring(7)
      })
    }).then(async () => {
      await state.syncWithServer();
      showToast('Бустер активовано!', 'success');
    }).catch(err => {
      alert('Помилка: ' + err.message);
    }).finally(() => {
      if (btn) btn.disabled = false;
      updateUi();
    });
`);

// 6. Sell Vault Item
code = code.replace(/function sellVaultItem\(item\) \{[\s\S]*?updateUi\(\);[\s\S]*?\}/, `
function sellVaultItem(item) {
  if (!item || !item.db_id) {
    alert('Помилка предмету');
    return;
  }
  
  apiFetch('/api/game/sell', {
    method: 'POST',
    body: JSON.stringify({
      itemDbId: item.db_id,
      idempotencyKey: 'sell_' + Date.now() + Math.random().toString(36).substring(7)
    })
  }).then(async () => {
    await state.syncWithServer();
    showToast(\`Предмет продано за \${item.price.toFixed(2)} DP\`, 'success');
    if (state.vault.length === 0) {
      const modal = document.getElementById('vaultWithdrawModal');
      if (modal) modal.classList.remove('open');
    } else {
      openVaultWithdrawModal(); // refresh modal
    }
  }).catch(e => {
    alert('Помилка продажу: ' + e.message);
  });
}
`);

// 7. Withdraw to Vault
code = code.replace(/function handleConfirmWithdraw\(\) \{[\s\S]*?updateUi\(\);[\s\S]*?showToast\('Переміщено в активний інвентар', 'success'\);[\s\S]*?\}/, `
function handleConfirmWithdraw() {
  if (!vaultState.selectedItem || !vaultState.selectedItem.db_id) return;
  const item = vaultState.selectedItem;
  const isCurrentlyInVault = vaultState.withdrawMode === 'return';
  const targetStatus = isCurrentlyInVault ? 'ACTIVE' : 'VAULT';

  apiFetch('/api/game/vault-withdraw', {
    method: 'POST',
    body: JSON.stringify({
      itemDbIds: [item.db_id],
      targetStatus: targetStatus,
      idempotencyKey: 'vault_' + Date.now() + Math.random().toString(36).substring(7)
    })
  }).then(async () => {
    await state.syncWithServer();
    const modal = document.getElementById('vaultWithdrawModal');
    if (modal) modal.classList.remove('open');
    showToast(isCurrentlyInVault ? 'Переміщено в активний інвентар' : 'Предмет переміщено в сейф', 'success');
  }).catch(e => alert('Помилка: ' + e.message));
}
`);

// 8. Demo Bonus
code = code.replace(/function claimDemoBonus\(\) \{[\s\S]*?openDemoPackModal\(newItem\);[\s\S]*?\}/, `
function claimDemoBonus() {
  apiFetch('/api/game/claim-bonus', {
    method: 'POST',
    body: JSON.stringify({
      idempotencyKey: 'bonus_' + Date.now() + Math.random().toString(36).substring(7)
    })
  }).then(async (data) => {
    await state.syncWithServer();
    audio.playWin();
    if (particleInstance) particleInstance.burst();
    
    // Find the item in our updated inventory to show it
    const newItem = state.inventory.find(i => i.db_id === data.item.db_id);
    if (newItem) openDemoPackModal(newItem);
  }).catch(e => alert('Помилка: ' + e.message));
}
`);

fs.writeFileSync(path.join(__dirname, '../app-secure.js'), code, 'utf8');
console.log('Successfully generated app-secure.js!');
