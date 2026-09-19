const fs = require('fs');
const path = require('path');

function updateFile(filePath, dbImport) {
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace("const { sql } = require('@vercel/postgres');", `const { sql } = require('${dbImport}');`);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Updated:', filePath);
}

updateFile(path.join(__dirname, '../api/setup-db.js'), './_db');
updateFile(path.join(__dirname, '../api/user/sync.js'), '../_db');
updateFile(path.join(__dirname, '../api/game/upgrade.js'), '../_db');
updateFile(path.join(__dirname, '../api/game/sell.js'), '../_db');
updateFile(path.join(__dirname, '../api/game/buy-booster.js'), '../_db');
updateFile(path.join(__dirname, '../api/game/claim-bonus.js'), '../_db');
updateFile(path.join(__dirname, '../api/game/vault-withdraw.js'), '../_db');

console.log('All API files updated to use universal _db wrapper!');
