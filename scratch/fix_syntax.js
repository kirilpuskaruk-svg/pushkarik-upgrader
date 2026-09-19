const fs = require('fs');
let code = fs.readFileSync('app.js', 'utf8');
code = code.replace("    }\n  }\n  }\n\n  login(userObj) {", "    }\n  }\n\n  login(userObj) {");
code = code.replace("    }\r\n  }\r\n  }\r\n\r\n  login(userObj) {", "    }\r\n  }\r\n\r\n  login(userObj) {");
fs.writeFileSync('app.js', code);
console.log('Fixed extra brace');
