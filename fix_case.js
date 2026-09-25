const fs = require('fs');
let c = fs.readFileSync('app.js', 'utf8');

const target1 = `function startCaseOpening(caseObj) {
  if (state.balance < caseObj.price) {
    if (typeof showNotification === 'function') {
      showNotification('Недостатньо DP для відкриття кейсу!', 'error');
    } else {
      alert('Недостатньо DP для відкриття кейсу!');
    }
    return;
  }
  
  state.balance -= caseObj.price;
  if (typeof updateBalanceDisplay === 'function') updateBalanceDisplay();
  if (typeof saveGameState === 'function') saveGameState();
  
  // Determine drops based on caseObj.containsType
  let dropPool = ITEM_CATALOG.filter(i => {
    if (caseObj.containsType === 'charm') return i.type === 'charm';
    if (caseObj.containsType === 'sticker') return i.type === 'sticker';
    if (caseObj.containsType === 'grail') return ['legendary', 'mythic', 'ancient'].includes(i.rarity);
    if (caseObj.containsType === 'dreams') return ['common', 'rare', 'epic'].includes(i.rarity);
    return true; // default pool
  });
  
  if (dropPool.length === 0) dropPool = ITEM_CATALOG.filter(i => i.rarity === 'common');
  
  // Generate random items for the strip
  const TOTAL_ITEMS = 40;
  const WIN_INDEX = 35; // 35th item is the winner
  
  // Weighted winning item
  const rand = Math.random() * 100;
  let targetRarity = 'common';
  if (rand > 70) targetRarity = 'rare';
  if (rand > 90) targetRarity = 'epic';
  if (rand > 98) targetRarity = 'legendary';
  if (rand > 99.5) targetRarity = 'mythic';
  
  let rarityPool = dropPool.filter(i => i.rarity === targetRarity);
  if (rarityPool.length === 0) rarityPool = dropPool; // fallback
  
  const wonItemTemplate = rarityPool[Math.floor(Math.random() * rarityPool.length)];
  const wonItem = { ...wonItemTemplate, instanceId: 'inst_won_' + Date.now() + '_' + Math.floor(Math.random() * 1000) };
  if (window.enrichWeaponProperties) window.enrichWeaponProperties(wonItem);

  const stripItems = [];
  for (let i = 0; i < TOTAL_ITEMS; i++) {
    if (i === WIN_INDEX) {
      stripItems.push(wonItem);
    } else {
      const junk = dropPool[Math.floor(Math.random() * dropPool.length)];
      stripItems.push(junk);
    }
  }
  
  // Build UI`;

const target1_cr = target1.replace(/\n/g, '\r\n');

const replacement1 = `function startCaseOpening(caseObj) {
  if (state.balance < caseObj.price) {
    if (typeof showNotification === 'function') showNotification('Недостатньо DP для відкриття кейсу!', 'error');
    else alert('Недостатньо DP для відкриття кейсу!');
    return;
  }
  
  state.balance -= caseObj.price;
  if (typeof updateBalanceDisplay === 'function') updateBalanceDisplay();
  if (typeof saveGameState === 'function') saveGameState();

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

  // Fast client-side fallback roll in case server fails
  let fallbackItemTemplate = dropPool[Math.floor(Math.random() * dropPool.length)];
  let wonItem = { ...fallbackItemTemplate, instanceId: 'inst_won_' + Date.now() };

  // Call server immediately but don't block the modal UI creation
  const serverRollPromise = apiFetch('/api/game/open-case', {
    method: 'POST',
    body: JSON.stringify({ caseId: caseObj.id })
  }).then(res => {
    if (res && res.item) wonItem = res.item;
  }).catch(() => {});

  const stripItems = [];
  for (let i = 0; i < TOTAL_ITEMS; i++) {
    if (i === WIN_INDEX) {
      stripItems.push(wonItem); // Placeholder, will be replaced before show
    } else {
      stripItems.push(dropPool[Math.floor(Math.random() * dropPool.length)]);
    }
  }

  // Build UI`;

if (c.includes(target1)) c = c.replace(target1, replacement1);
else if (c.includes(target1_cr)) c = c.replace(target1_cr, replacement1);

// Now patch the timeout block where it shows the item
const target2 = `  setTimeout(() => {
    if (typeof audio !== 'undefined' && audio.playWin) audio.playWin();
    const wonModal = document.createElement('div');
    wonModal.className = 'case-won-modal';
    const rarCol = RARITIES[wonItem.rarity] ? RARITIES[wonItem.rarity].color : '#fff';
    wonModal.innerHTML = \`
      <h2 style="color:\${rarCol}">\${wonItem.name}</h2>
      <img src="\${wonItem.image}" />
      <p style="margin: 15px 0;">Вартість: \${wonItem.price.toFixed(2)} DP</p>
      <button class="primary-btn" style="margin-top: 15px; border-color:var(--neon-green); color:var(--neon-green);">
        Забрати в інвентар
      </button>
    \`;
    
    wonModal.querySelector('button').addEventListener('click', () => {
      state.inventory.push(wonItem);
      if (typeof saveInventory === 'function') saveInventory();
      if (typeof updateTotalItemsBadges === 'function') updateTotalItemsBadges();
      if (state.activeTab === 'inventory') renderTabContent();
      modal.remove();
    });
    
    modal.appendChild(wonModal);
  }, 8100);`;

const target2_cr = target2.replace(/\n/g, '\r\n');

const replacement2 = `  setTimeout(async () => {
    try { await Promise.race([serverRollPromise, new Promise(r => setTimeout(r, 500))]); } catch(e){}

    // Update the winning item visually in the DOM strip before it stops
    const winItemDiv = stripDiv.children[WIN_INDEX];
    if (winItemDiv) {
      const rarColor = RARITIES[wonItem.rarity] ? RARITIES[wonItem.rarity].color : '#fff';
      winItemDiv.style.borderBottom = '4px solid ' + rarColor;
      winItemDiv.innerHTML = \`<img src="\${wonItem.image}" /><span style="color:\${rarColor}">\${wonItem.name}</span>\`;
    }

    if (typeof audio !== 'undefined' && audio.playWin) audio.playWin();
    const wonModal = document.createElement('div');
    wonModal.className = 'case-won-modal';
    const rarCol = RARITIES[wonItem.rarity] ? RARITIES[wonItem.rarity].color : '#fff';
    wonModal.innerHTML = \`
      <h2 style="color:\${rarCol}">\${wonItem.name}</h2>
      <img src="\${wonItem.image}" />
      <p style="margin: 15px 0;">Вартість: \${wonItem.price.toFixed(2)} DP</p>
      <button class="primary-btn" style="margin-top: 15px; border-color:var(--neon-green); color:var(--neon-green);">
        Забрати в інвентар
      </button>
    \`;
    
    wonModal.querySelector('button').addEventListener('click', () => {
      state.inventory.push(wonItem);
      if (typeof saveInventory === 'function') saveInventory();
      if (typeof updateTotalItemsBadges === 'function') updateTotalItemsBadges();
      if (state.activeTab === 'inventory') renderTabContent();
      modal.remove();
    });
    
    modal.appendChild(wonModal);
  }, 8100);`;

if (c.includes(target2)) c = c.replace(target2, replacement2);
else if (c.includes(target2_cr)) c = c.replace(target2_cr, replacement2);

fs.writeFileSync('app.js', c);
