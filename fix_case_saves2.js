const fs = require('fs');
let c = fs.readFileSync('app.js', 'utf8');

c = c.replace("if (typeof updateBalanceDisplay === 'function') updateBalanceDisplay();", "updateUi();");
c = c.replace("if (typeof saveGameState === 'function') saveGameState();", "state.saveBalance();");

c = c.replace("if (typeof saveInventory === 'function') saveInventory();", "state.saveInventory();");
c = c.replace("if (typeof updateTotalItemsBadges === 'function') updateTotalItemsBadges();", "updateUi();");

fs.writeFileSync('app.js', c);
