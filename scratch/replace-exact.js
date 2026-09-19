const fs = require('fs');
let code = fs.readFileSync('app.js', 'utf8');

const apiFetchCode = `
// SERVER-SIDE API HELPER
async function apiFetch(endpoint, options = {}) {
  if (!googleAuth || !googleAuth.idToken) {
    const modal = document.getElementById('googleAuthModal');
    if (modal) modal.classList.add('open');
    throw new Error('Not logged in');
  }
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': \`Bearer \${googleAuth.idToken}\`,
    ...options.headers
  };
  const response = await fetch(endpoint, { ...options, headers });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Server error');
  return data;
}
`;

code = code.replace("function escapeHtml(str) {", apiFetchCode + "\nfunction escapeHtml(str) {");

fs.writeFileSync('app-secure.js', code, 'utf8');
console.log('Done 1');
