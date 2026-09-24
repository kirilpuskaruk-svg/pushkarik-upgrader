const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8');
app = app.replace("idempotencyKey: 'upg_' + Date.now() + Math.random().toString(36).substring(7)\r\n    })", "idempotencyKey: 'upg_' + Date.now() + Math.random().toString(36).substring(7),\r\n      clientBoosters: (state.activeBoosters || []).map(b => b && b.id).filter(Boolean)\r\n    })");
fs.writeFileSync('app.js', app);
