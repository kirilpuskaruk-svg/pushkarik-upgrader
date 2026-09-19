const fs = require('fs');

let code = fs.readFileSync('app.js', 'utf8');

// 1. Update the Admin Delegation Section in renderAdminModalBody
const oldAdminDelegationSearch = `        <!-- Grant by Nickname -->
        <div style="margin-bottom: 14px;">
          <label style="font-size: 11px; font-weight: 700; color: var(--text-muted); display: block; margin-bottom: 6px;">
            1. Призначити за нікнеймом гравця:
          </label>
          <div style="display: flex; gap: 8px;">
            <input type="text" id="adminGrantNickInput" placeholder="Нікнейм або email друга..." style="flex: 1; background: #090d14; border: 1px solid var(--border-color); border-radius: 6px; padding: 8px 10px; color: #fff; font-size: 12px; outline: none;" />
            <button onclick="adminGrantByNickname()" class="admin-btn success">
              ➕ Надати Права
            </button>
          </div>
        </div>`;

const newAdminDelegationReplace = `        <!-- Grant by Nickname -->
        <div style="margin-bottom: 14px;">
          <label style="font-size: 11px; font-weight: 700; color: var(--text-muted); display: block; margin-bottom: 6px;">
            1. Призначити адміном за нікнеймом чи email:
          </label>
          <div style="display: flex; gap: 8px;">
            <input type="text" id="adminGrantNickInput" placeholder="Нікнейм або email друга..." style="flex: 1; background: #090d14; border: 1px solid var(--border-color); border-radius: 6px; padding: 8px 10px; color: #fff; font-size: 12px; outline: none;" />
            <button onclick="adminGrantByNickname()" class="admin-btn success" style="background: linear-gradient(135deg, #00ff88, #00b359); color: #000; font-weight: 800; border: none;">
              ➕ Надати Права
            </button>
          </div>
        </div>

        <!-- Revoke by Nickname directly -->
        <div style="margin-bottom: 14px;">
          <label style="font-size: 11px; font-weight: 700; color: #ff5555; display: block; margin-bottom: 6px;">
            2. Забрати права адміна за нікнеймом чи email:
          </label>
          <div style="display: flex; gap: 8px;">
            <input type="text" id="adminRevokeNickInput" placeholder="Введіть нікнейм або email того, у кого забрати права..." style="flex: 1; background: #090d14; border: 1px solid rgba(255, 85, 85, 0.4); border-radius: 6px; padding: 8px 10px; color: #fff; font-size: 12px; outline: none;" />
            <button onclick="adminRevokeByNickname()" class="admin-btn danger" style="background: linear-gradient(135deg, #ff3366, #cc0033); color: #fff; font-weight: 800; border: none; white-space: nowrap;">
              🗑️ Забрати Права
            </button>
          </div>
        </div>`;

code = code.replace(oldAdminDelegationSearch, newAdminDelegationReplace);

// 2. Update Generate Admin Key label from "2." to "3."
code = code.replace('2. Згенерувати секретний ключ для передачі другу:', '3. Згенерувати секретний ключ-запрошення:');

// 3. Update adminsList formatting with a clear empty state and bright red delete buttons
const oldAdminsListRegex = /const adminsList = \(state\.authorizedAdmins \|\| \[\]\)\.map\(\(adminName, idx\) => `[\s\S]*?`\)\.join\(''\);/;

const newAdminsListCode = `const currentAdmins = state.authorizedAdmins || ['Кирило (Owner/Creator)'];
  const hasExtraAdmins = currentAdmins.length > 1;

  const adminsList = currentAdmins.map((adminName, idx) => \`
    <div class="admin-list-item" style="display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; background: rgba(255, 255, 255, 0.03); border: 1px solid \${idx === 0 ? 'rgba(255, 215, 0, 0.3)' : 'rgba(255, 85, 85, 0.2)'}; border-radius: 8px; margin-bottom: 6px;">
      <div style="display: flex; align-items: center; gap: 10px;">
        <span style="font-size: 16px;">\${idx === 0 ? '👑' : '🛡️'}</span>
        <div>
          <span style="font-weight: 700; color: #fff; font-size: 13px;">\${escapeHtml(adminName)}</span>
          <div style="font-size: 10px; color: var(--text-dim);">\${idx === 0 ? 'Головний творець та власник' : 'Призначений адміністратор'}</div>
        </div>
      </div>
      <div>
        \${idx === 0 
          ? '<span style="color: #00ff88; font-size: 11px; font-weight: 800; background: rgba(0, 255, 136, 0.12); border: 1px solid rgba(0, 255, 136, 0.3); padding: 4px 10px; border-radius: 6px;">ВЛАСНИК</span>' 
          : \`<button onclick="adminRevokeUser(\${idx})" class="admin-btn danger" style="background: linear-gradient(135deg, #ff3366, #b3002d); color: #fff; font-weight: 800; border: none; padding: 6px 14px; font-size: 12px; border-radius: 6px; cursor: pointer; display: flex; align-items: center; gap: 4px; box-shadow: 0 2px 8px rgba(255, 51, 102, 0.3);">
              🗑️ Забрати права
            </button>\`
        }
      </div>
    </div>
  \`).join('') + (!hasExtraAdmins ? \`
    <div style="margin-top: 6px; padding: 10px 12px; background: rgba(255, 215, 0, 0.04); border: 1px dashed rgba(255, 215, 0, 0.3); border-radius: 6px; font-size: 11px; color: var(--text-dim); line-height: 1.5;">
      💡 <em>Наразі додаткових адмінів немає. Коли ви додасте друга за нікнеймом або він активує ключ, біля його імені тут з'явиться велика червона кнопка <strong>«🗑️ Забрати права»</strong>.</em>
    </div>
  \` : '');`;

code = code.replace(oldAdminsListRegex, newAdminsListCode);

// 4. Update adminRevokeUser and add adminRevokeByNickname
const oldRevokeUserRegex = /window\.adminRevokeUser = function\(idx\) \{[\s\S]*?alert\(`❌ Права адміністратора для "\$\{removed\[0\]\}" відкликано\.`\);\s*\};/;

const newRevokeCode = `window.adminRevokeUser = async function(idx) {
  if (idx <= 0) {
    alert('Головний власник не може позбавити себе прав!');
    return;
  }
  const target = state.authorizedAdmins[idx];
  if (!confirm(\`Ви впевнені, що хочете забрати права адміністратора у "\${target}"?\`)) return;

  const removed = state.authorizedAdmins.splice(idx, 1);
  localStorage.setItem('pushkarik_authorized_admins_v1', JSON.stringify(state.authorizedAdmins));

  // Sync with server if email
  try {
    if (target.includes('@')) {
      await fetch('/api/admins?email=' + encodeURIComponent(target), { method: 'DELETE' });
    }
  } catch(e) {
    console.warn('Server sync error on revoke:', e);
  }

  renderAdminModalBody();
  audio.playClick();
  alert(\`🗑️ Права адміністратора для "\${removed[0]}" успішно анульовано!\`);
};

window.adminRevokeByNickname = async function() {
  const input = document.getElementById('adminRevokeNickInput');
  if (!input) return;
  const name = input.value.trim();
  if (!name) {
    alert('Будь ласка, введіть нікнейм або email!');
    return;
  }
  const cleanName = name.toLowerCase();
  if (cleanName === 'кирило' || cleanName === 'kiril' || cleanName.includes('owner') || cleanName.includes('creator')) {
    alert('Неможливо забрати права у головного власника!');
    return;
  }
  const idx = state.authorizedAdmins.findIndex((a, i) => i > 0 && a.toLowerCase() === cleanName);
  if (idx === -1) {
    alert(\`Користувача "\${name}" не знайдено у списку додаткових адміністраторів.\\n\\nПеревірте правильність написання або видаліть через кнопку у списку нижче.\`);
    return;
  }
  await window.adminRevokeUser(idx);
  input.value = '';
};`;

code = code.replace(oldRevokeUserRegex, newRevokeCode);

fs.writeFileSync('app.js', code, 'utf8');
console.log('Successfully upgraded admin revoke functionality!');
