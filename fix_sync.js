const fs = require('fs');
let c = fs.readFileSync('app.js', 'utf8');

const target1 = `        if (Array.isArray(data.inventory) && data.inventory.length > 0) {
          this.inventory = data.inventory.map(srvItem => {
            const catalogItem = ITEM_CATALOG.find(i => i.id === srvItem.id);
            if (catalogItem) {
              return { ...catalogItem, db_id: srvItem.db_id, instanceId: 'db_' + srvItem.db_id };
            }
            return { id: srvItem.id, db_id: srvItem.db_id, name: srvItem.id, price: 10, rarity: 'common', image: 'gungnir.png', instanceId: 'db_' + srvItem.db_id };
          });
          this.saveInventory();
        }
        if (Array.isArray(data.vault) && data.vault.length > 0) {
          this.vault = data.vault.map(srvItem => {
            const catalogItem = ITEM_CATALOG.find(i => i.id === srvItem.id);
            if (catalogItem) {
              return { ...catalogItem, db_id: srvItem.db_id, instanceId: 'vault_db_' + srvItem.db_id };
            }
            return { id: srvItem.id, db_id: srvItem.db_id, name: srvItem.id, price: 10, rarity: 'common', image: 'gungnir.png', instanceId: 'vault_db_' + srvItem.db_id };
          });
          this.saveVault();
        }`;

const target2 = target1.replace(/\n/g, '\r\n');

if (c.includes(target1)) {
  c = c.replace(target1, "/* Server inventory sync disabled to preserve local cosmetics/vault state */");
} else if (c.includes(target2)) {
  c = c.replace(target2, "/* Server inventory sync disabled to preserve local cosmetics/vault state */");
} else {
  console.log("NOT FOUND");
}

fs.writeFileSync('app.js', c);
