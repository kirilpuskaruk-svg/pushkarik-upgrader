const fs = require('fs');
let code = fs.readFileSync('app.js', 'utf8');

// Fix the catch block duplication
code = code.replace(/\}\)\.catch\(e => alert\('Помилка: ' \+ e\.message\)\);\r?\n\}\)\.catch\(e => alert\('Помилка: ' \+ e\.message\)\);\r?\n\}/g, 
  "}).catch(e => alert('Помилка: ' + e.message));\n}");

fs.writeFileSync('app.js', code);
