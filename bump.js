const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/v=\d+\.\d+\.\d+/g, 'v=48.0.0');
fs.writeFileSync('index.html', html);
