const fs = require('fs');
let c = fs.readFileSync('app.js', 'utf8');

const target1 = "if (typeof updateBalanceDisplay === 'function') updateBalanceDisplay();\\r\\n  if (typeof saveGameState === 'function') saveGameState();";
const target1_lf = "if (typeof updateBalanceDisplay === 'function') updateBalanceDisplay();\\n  if (typeof saveGameState === 'function') saveGameState();";

const replacement1 = "updateUi();\\n  state.saveBalance();";

c = c.replace(target1, replacement1);
c = c.replace(target1_lf, replacement1);

const target2 = "if (typeof saveInventory === 'function') saveInventory();\\r\\n      if (typeof updateTotalItemsBadges === 'function') updateTotalItemsBadges();";
const target2_lf = "if (typeof saveInventory === 'function') saveInventory();\\n      if (typeof updateTotalItemsBadges === 'function') updateTotalItemsBadges();";

const replacement2 = "state.saveInventory();\\n      updateUi();";

c = c.replace(target2, replacement2);
c = c.replace(target2_lf, replacement2);

fs.writeFileSync('app.js', c);
