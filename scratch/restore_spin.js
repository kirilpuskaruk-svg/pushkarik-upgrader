const fs = require('fs');

let code = fs.readFileSync('app.js', 'utf8');

// 1. Update apiFetch and getAuthToken
const oldApiFetchRegex = /async function apiFetch\(endpoint, options = \{\}\) \{[\s\S]*?return data;\s*\}/;
const newApiFetch = `function getAuthToken() {
  if (window.googleAuth && window.googleAuth.idToken) {
    return window.googleAuth.idToken;
  }
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
    'Authorization': \`Bearer \${token}\`,
    ...options.headers
  };
  const response = await fetch(endpoint, { ...options, headers });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Server error');
  return data;
}`;

code = code.replace(oldApiFetchRegex, newApiFetch);

// 2. Replace handleUpgradeClick and finishUpgrade with real wheel animation
const oldUpgradeClickRegex = /async function handleUpgradeClick\(e\) \{[\s\S]*?function finishUpgrade\(isWin, roll, chance\) \{\}/;
const newUpgradeClick = `async function handleUpgradeClick(e) {
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
    alert('Апгрейд можливий тільки на дорожчий скін!');
    return;
  }

  state.isSpinning = true;
  updateUi();
  audio.playClick();
  if (particleInstance) particleInstance.startSpeed();

  try {
    const data = await apiFetch('/api/game/upgrade', {
      method: 'POST',
      body: JSON.stringify({
        sourceItemId: state.selectedSource.id,
        targetItemCatalogId: state.selectedTarget.id,
        direction: state.rollDirection,
        idempotencyKey: 'upg_' + Date.now() + Math.random().toString(36).substring(7)
      })
    });

    // SPIN THE WHEEL WITH REAL ANIMATION
    wheelInstance.spinTo(data.roll, async () => {
      await state.syncWithServer();
      finishUpgrade(data.isWin, data.roll, data.chance, data);
    });

  } catch (error) {
    console.error('Upgrade error:', error);
    alert('Помилка оновлення: ' + error.message);
    state.isSpinning = false;
    if (particleInstance) particleInstance.stopSpeed();
    updateUi();
  }
}

function finishUpgrade(isWin, roll, chance, serverData) {
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
  } else {
    state.stats.losses++;
    audio.playFail();
    if (serverData && serverData.shieldUsed) {
      alert('🛡️ ЩИТ СПАСІННЯ ВРЯТУВАВ ВАШ СКІН: Скін збережено в інвентарі!');
    }
  }

  state.history.unshift({
    timestamp: new Date().toLocaleTimeString(),
    sourceName: sourceItem ? sourceItem.name : 'Unknown',
    targetName: targetItem ? targetItem.name : 'Unknown',
    targetImage: targetItem ? targetItem.image : '',
    chance: chance,
    roll: roll,
    isWin: isWin
  });

  pushToLiveStream(targetItem, isWin, chance, null, roll, sourceItem);

  state.selectedSource = null;
  updateUi();

  showResultModal(isWin, targetItem, roll, chance, null);
}`;

code = code.replace(oldUpgradeClickRegex, newUpgradeClick);

fs.writeFileSync('app.js', code, 'utf8');
console.log('Restored wheel spin animation and added guest auth!');
