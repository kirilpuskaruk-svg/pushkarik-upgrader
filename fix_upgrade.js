const fs = require('fs');
let c = fs.readFileSync('api/game/upgrade.js', 'utf8');

const target = "if (activeBoosters.includes('MEGA_LUCK')) pureChance *= 1.25;\n    else if (activeBoosters.includes('LUCK')) pureChance *= 1.10;";

const target2 = "if (activeBoosters.includes('MEGA_LUCK')) pureChance *= 1.25;\r\n    else if (activeBoosters.includes('LUCK')) pureChance *= 1.10;";

const replacement = `
    const clientBoosters = req.body.clientBoosters;
    if (Array.isArray(clientBoosters)) {
      if (clientBoosters.includes('booster_luck_25')) activeBoosters.push('MEGA_LUCK');
      else if (clientBoosters.includes('booster_luck_10')) activeBoosters.push('LUCK');
      if (clientBoosters.includes('booster_shield')) activeBoosters.push('SHIELD');
      if (clientBoosters.includes('booster_cashback')) activeBoosters.push('CASHBACK');
    }

    if (activeBoosters.includes('MEGA_LUCK')) pureChance += 25.0;
    else if (activeBoosters.includes('LUCK')) pureChance += 10.0;
`;

if (c.includes(target)) c = c.replace(target, replacement);
else c = c.replace(target2, replacement);

fs.writeFileSync('api/game/upgrade.js', c);
