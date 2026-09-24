const fs = require('fs');
let c = fs.readFileSync('app.js', 'utf8');
c = c.replace(/b => b\.expiresAt > now/g, "b => b && b.expiresAt > now");
fs.writeFileSync('app.js', c);
