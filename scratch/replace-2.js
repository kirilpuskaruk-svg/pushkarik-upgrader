const fs = require('fs');
let lines = fs.readFileSync('app-secure.js', 'utf8').split('\n');

const startIndex = 1287 - 1;
const endIndex = 1424 - 2;

lines.splice(startIndex, endIndex - startIndex + 1, `
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
    if(btn) { btn.disabled = true; btn.textContent = 'ОБРОБКА СЕРВЕРОМ...'; }

    const data = await apiFetch('/api/game/upgrade', {
      method: 'POST',
      body: JSON.stringify({
        sourceItemId: state.selectedSource.id,
        targetItemCatalogId: state.selectedTarget.id,
        direction: state.rollDirection,
        idempotencyKey: 'upgrade_' + Date.now() + Math.random().toString(36).substring(7)
      })
    });

    // Simulate wheel spin purely visually (we skip complex wheel animation for server-side demo here, 
    // or just use a timeout)
    const spinDuration = 3000;
    
    // update wheel UI to show roll somehow (simple)
    const wheelValEl = document.getElementById('wheelRollValue');
    if(wheelValEl) {
      wheelValEl.textContent = "ROLLING...";
      setTimeout(() => { wheelValEl.textContent = data.roll.toFixed(2); }, spinDuration);
    }
    
    await new Promise(r => setTimeout(r, spinDuration));
    
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
}`);

fs.writeFileSync('app-secure.js', lines.join('\n'), 'utf8');
console.log('Done 2');
