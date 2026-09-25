const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/v=\d+\.\d+\.\d+/g, 'v=49.0.2');
fs.writeFileSync('index.html', html);
