const fs = require('fs');
let c = fs.readFileSync('app.js', 'utf8');
c = c.replace(/b\.id === booster\.id/g, "b && b.id === booster.id");
c = c.replace(/b\.id === boosterId/g, "b && b.id === boosterId");
c = c.replace(/b => b\.id === 'booster_luck_10'/g, "b => b && b.id === 'booster_luck_10'");
c = c.replace(/b => b\.id === 'booster_luck_25'/g, "b => b && b.id === 'booster_luck_25'");
c = c.replace(/b => b\.id === 'booster_shield'/g, "b => b && b.id === 'booster_shield'");
fs.writeFileSync('app.js', c);
