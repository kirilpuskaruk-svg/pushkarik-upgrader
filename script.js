const fs = require('fs');
let c = fs.readFileSync('app.js', 'utf8');
const match = c.match(/async syncWithServer\(\) \{[\s\S]*?renderTabContent\(\);\r?\n    \} catch/);
console.log(match ? match[0] : "NOT FOUND");
