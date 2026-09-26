const fs = require('fs');
let content = fs.readFileSync('app.js', 'utf8');
content = content.replace("showNotification('❌ На цій зброї вже наклеєно максимум (4 наклейки, 'info')! Здеріть одну, щоб наклеїти нову.');", "showNotification('❌ На цій зброї вже наклеєно максимум (4 наклейки)! Здеріть одну, щоб наклеїти нову.', 'info');");
fs.writeFileSync('app.js', content, 'utf8');
