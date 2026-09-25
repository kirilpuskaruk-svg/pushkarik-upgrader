const fs = require('fs');
let itemsJs = fs.readFileSync('items.js', 'utf8');
const match = itemsJs.match(/const ITEM_CATALOG = (\[[\s\S]*?\]);\s*const DEFAULT/);
if (!match) {
  console.log("Regex failed");
} else {
  let catalogStr = match[1];
  let cat;
  try {
    cat = eval(catalogStr);
    let missing = cat.filter(i => !i.id);
    console.log("Missing ID count:", missing.length);
  } catch(e) {
    console.log("Eval failed", e.message);
  }
}
