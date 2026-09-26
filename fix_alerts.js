const fs = require('fs');

let content = fs.readFileSync('app.js', 'utf8');

// Replace standard alert( with showNotification(
// I have to be careful not to replace things like .alert
content = content.replace(/\balert\((.*?)\)/g, "showNotification($1, 'info')");

// We should also replace 'error' for some obvious error strings? Actually 'info' is fine, or we can just pass 'info' for all for now, 
// except when it's an error. 
// "Shield used: Item preserved!" should be 'success' or 'info'.
content = content.replace(/showNotification\('Shield used: Item preserved!', 'info'\)/g, "showNotification('Shield used: Item preserved!', 'success')");

// For confirm:
// resetBtn.addEventListener('click', () => {
content = content.replace(/resetBtn\.addEventListener\('click',\s*\(\)\s*=>\s*\{/, "resetBtn.addEventListener('click', async () => {");
content = content.replace(/if\s*\(\s*confirm\((.*?)\)\s*\)/g, "if (await showConfirm($1))");

// sellVaultItem
content = content.replace(/window\.sellVaultItem\s*=\s*function\s*\((.*?)\)\s*\{/, "window.sellVaultItem = async function($1) {");

// sellAllVault
content = content.replace(/window\.sellAllVault\s*=\s*function\s*\(\)\s*\{/, "window.sellAllVault = async function() {");

fs.writeFileSync('app.js', content, 'utf8');
console.log('Replaced alerts and confirms in app.js');
