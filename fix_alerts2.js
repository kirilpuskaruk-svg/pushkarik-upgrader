const fs = require('fs');

let content = fs.readFileSync('app.js', 'utf8');

const js = `
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
      overlay.innerHTML = \`
        <div class="custom-confirm-modal">
          <div class="custom-confirm-msg" id="custom-confirm-msg"></div>
          <div class="custom-confirm-btns">
            <button class="btn-no" id="custom-confirm-no">Ні, скасувати</button>
            <button class="btn-yes" id="custom-confirm-yes">Так, підтвердити</button>
          </div>
        </div>
      \`;
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
// GOOGLE AUTHENTICATION MANAGER`;

// Inject custom functions
content = content.replace(/\/\/\s*==========================================\s*\n\/\/\s*GOOGLE AUTHENTICATION MANAGER/, js);

// Replace alert with showNotification
content = content.replace(/\balert\((.*?)\)/g, "showNotification($1, 'info')");
content = content.replace(/showNotification\('Shield used: Item preserved!', 'info'\)/g, "showNotification('Shield used: Item preserved!', 'success')");

// Fix specific usages in startCaseOpening (it had `else alert(...)`)
content = content.replace(/else showNotification\('Недостатньо DP для відкриття кейсу!', 'info'\);/g, "else showNotification('Недостатньо DP для відкриття кейсу!', 'error');");
content = content.replace(/else showNotification\(err.message \|\| 'Помилка відкриття кейсу', 'info'\);/g, "else showNotification(err.message || 'Помилка відкриття кейсу', 'error');");


// Refactor confirms
content = content.replace(/resetBtn\.addEventListener\('click',\s*\(\)\s*=>\s*\{/, "resetBtn.addEventListener('click', async () => {");
content = content.replace(/if\s*\(\s*confirm\((.*?)\)\s*\)/g, "if (await showConfirm($1))");

content = content.replace(/window\.sellVaultItem\s*=\s*function\s*\((.*?)\)\s*\{/, "window.sellVaultItem = async function($1) {");
content = content.replace(/window\.sellAllVault\s*=\s*function\s*\(\)\s*\{/, "window.sellAllVault = async function() {");

// `if (!confirm(msg)) return;` might be transformed to `if (!await showConfirm(msg)) return;` which is handled by the generic regex above?
// The generic regex was `if (confirm(...))`
content = content.replace(/if\s*\(!confirm\((.*?)\)\s*\)/g, "if (!(await showConfirm($1)))");

fs.writeFileSync('app.js', content, 'utf8');
console.log('Fixed alerts completely in app.js via Node');
