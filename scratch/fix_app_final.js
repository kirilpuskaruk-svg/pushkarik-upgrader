const fs = require('fs');

function fixAppJs() {
  let code = fs.readFileSync('app.js', 'utf8');

  // 1. Fix the syntax error: remove the extra brace before login
  code = code.replace("    }\n  }\n  }\n\n  login(userObj) {", "    }\n  }\n\n  login(userObj) {");
  code = code.replace("    }\r\n  }\r\n  }\r\n\r\n  login(userObj) {", "    }\r\n  }\r\n\r\n  login(userObj) {");

  // 2. Fix login
  code = code.replace(/login\(userObj\) \{[\s\S]*?particleInstance\.burst\(\);\s*\}/,
  `login(userObj, idToken = null) {
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
  }`);

  // 3. Fix loadUser
  code = code.replace(/loadUser\(\) \{[\s\S]*?this\.user = null;\s*\}\s*\}\s*\}/,
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

  // 4. Fix onGoogleSignIn
  code = code.replace(/googleAuth\.login\(\{\s*name: payload\.name[\s\S]*?sub: payload\.sub\s*\}\);/,
  `googleAuth.login({
          name: payload.name || 'Google User',
          email: payload.email || 'user@gmail.com',
          picture: payload.picture || 'https://lh3.googleusercontent.com/a/default-user',
          sub: payload.sub
        }, response.credential);`);

  // 5. Fix syncWithServer
  code = code.replace(/loadAll\(\) \{/,
  `async syncWithServer() {
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

  loadAll() {`);

  code = code.replace(/this\.loadAll\(\);/, `this.loadAll();\n    this.syncWithServer();`);

  // 6. Fix buyBooster
  code = code.replace(/function buyTemporaryBooster\(boosterId\) \{[\s\S]*?updateUi\(\);\s*\}/,
  `function buyTemporaryBooster(boosterId) {
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
}`);

  // 7. Fix handleSellVaultItem
  code = code.replace(/function handleSellVaultItem\(instanceId\) \{[\s\S]*?updateUi\(\);\s*\}/,
  `function handleSellVaultItem(instanceId) {
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
}`);

  // 8. Fix handleConfirmWithdraw
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

  fs.writeFileSync('app.js', code);
  console.log('Fixed syntax and all APIs');
}

fixAppJs();
