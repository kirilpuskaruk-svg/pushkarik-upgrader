const fs = require('fs');

let content = fs.readFileSync('app.js', 'utf8');

// 1. Initialize BonusSystem
// We need to find where state is initialized.
// "const state = new AppState();" is at the bottom, or inside some block.
// Wait, it is globally defined: "const state = new AppState();"
content = content.replace(/const state = new AppState\(\);/, "const state = new AppState();\nwindow.bonusSystem = new BonusSystem(state);\nwindow.bonusSystem.load();\nwindow.bonusSystem.trackTask('login');");

// 2. Tab logic
const tabBlock = `
  if (state.activeTab === 'bonus') {
    grid.style.display = 'none';
    if (invStatsBar) invStatsBar.style.display = 'none';
    if (vaultStatsBar) vaultStatsBar.style.display = 'none';
    historyContainer.style.display = 'none';
    if (casesContainer) casesContainer.style.display = 'none';
    const bonusContainer = document.getElementById('bonusDisplayContainer');
    if (bonusContainer) {
      bonusContainer.style.display = 'block';
      window.bonusSystem.render();
    }
    return;
  }
`;
content = content.replace(/if \(casesContainer\) casesContainer\.style\.display = 'none';/, "if (casesContainer) casesContainer.style.display = 'none';\n  const bc = document.getElementById('bonusDisplayContainer');\n  if (bc) bc.style.display = 'none';\n");

// Inject inside renderTabContent before cases block:
content = content.replace(/if \(state\.activeTab === 'cases'\) \{/, tabBlock + "\n  if (state.activeTab === 'cases') {");

// 3. Track upgrades
// In `finishUpgrade` inside `if (isWin)`
content = content.replace(/state\.stats\.wins\+\+;/, "state.stats.wins++;\n    window.bonusSystem.trackTask('upgrades');\n    window.bonusSystem.addXp(10);\n");
// In `finishUpgrade` general loss:
content = content.replace(/audio\.playFail\(\);/, "audio.playFail();\n    window.bonusSystem.trackTask('upgrades');\n    window.bonusSystem.addXp(5);\n");

// 4. Track cases
// In `startCaseOpening` success:
content = content.replace(/wonItem = res\.item;/, "wonItem = res.item;\n    window.bonusSystem.trackTask('cases');\n    window.bonusSystem.addXp(15);\n");

// 5. Replace F5 Falsy state loads:
// In `syncWithServer`, make sure to load bonusData
content = content.replace(/this\.isSpinning = false;/, "this.isSpinning = false;\n    if(window.bonusSystem) window.bonusSystem.load();\n");

// Write back
fs.writeFileSync('app.js', content, 'utf8');
console.log("Modified app.js successfully.");
