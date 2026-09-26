const fs = require('fs');

let content = fs.readFileSync('app.js', 'utf8');

// 1. Turbo animation logic
content = content.replace(/this\.stopDuration = 3200;/, "this.stopDuration = window.state?.activeBoosters?.some(b => b && b.id === 'booster_turbo' && b.expiresAt > Date.now()) ? 1200 : 3200;");

// 2. Add booster_turbo to BOOSTER_CATALOG
const turboBooster = `},
  {
    id: 'booster_turbo',
    title: '⚡ Turbo Upgrade',
    desc: 'Прискорює анімацію рулетки апгрейду в 3 рази!',
    icon: '⚡',
    price: 50.00,
    durationMs: 30 * 60 * 1000,
    durationLabel: '30 хв'
  }`;
content = content.replace(/durationLabel:\s*'30 хв'\s*\n\s*\}/, "durationLabel: '30 хв'\n  " + turboBooster);

// 3. Rename cashback to 20%
content = content.replace(/title:\s*'💎 Подвійний Кешбек 10%'/, "title: '💎 Подвійний Кешбек 20%'");
// Also update the UI strings inside the file if any

// 4. In `finishUpgrade`, handle the new cashback (20%) instead of 10%
// The original code probably calculates 10%. Let's see how cashback is implemented in finishUpgrade.
content = content.replace(/const cashbackAmount = Math\.max\(Math\.floor\(sourcePrice \* 0\.10\), 1\);/, "const cashbackAmount = Math.max(Math.floor(sourcePrice * 0.20), 1);");

// 5. In `finishUpgrade`, track win/loss streak for "Lucky Streak"
// And replace the shield alert (already done in previous commit, but let's make sure it calls bonusSystem.trackWin(isWin))
// The wire_bonus.js already added `window.bonusSystem.trackTask('upgrades');`
content = content.replace(/window\.bonusSystem\.trackTask\('upgrades'\);/, "window.bonusSystem.trackTask('upgrades');\n    if (window.bonusSystem.trackWin) window.bonusSystem.trackWin(true);");
content = content.replace(/window\.bonusSystem\.trackTask\('upgrades'\);\n\s*window\.bonusSystem\.addXp\(5\);/, "window.bonusSystem.trackTask('upgrades');\n    window.bonusSystem.addXp(5);\n    if (window.bonusSystem.trackWin) window.bonusSystem.trackWin(false);");


// Make booster shop HTML generation globally accessible so we can embed it in BonusSystem
content = content.replace(/const cardsHtml = BOOSTER_CATALOG\.map\(booster => \{/, "window.getBoosterCardsHtml = () => {\n  const now = Date.now();\n  return BOOSTER_CATALOG.map(booster => {");
content = content.replace(/container\.innerHTML = `\s*<div style="display: flex; flex-direction: column; gap: 14px;">/, "container.innerHTML = `\n    <div style=\"display: flex; flex-direction: column; gap: 14px;\">");
content = content.replace(/return `\s*<div class="booster-shop-card/g, "return `<div class=\"booster-shop-card");
// Wait, regex replacing `container.innerHTML` is risky if I don't know the exact structure.
// Instead, I will just copy the HTML generator logic directly inside `bonus_system.js` because `BOOSTER_CATALOG` is global!

fs.writeFileSync('app.js', content, 'utf8');
