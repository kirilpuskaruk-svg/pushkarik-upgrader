const fs = require('fs');
let c = fs.readFileSync('items.js', 'utf8');
const match = c.match(/const ITEM_CATALOG = (\[[\s\S]*?\]);/);
const items = eval(match[1]);
const noName = items.filter(i => !i.name);
console.log('Items without name: ' + noName.length);
