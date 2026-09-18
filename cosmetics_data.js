/**
 * PUSHKARIK UPGRADER - Modular CS2 Cosmetics Architecture
 * Weapon Skins, Stickers, Charms, Collections & Wear Data
 * 100% DEMO - NO REAL MONEY - NO GAMBLING
 */

// 1. RARITIES SPECIFICATION
const COSMETIC_RARITIES = {
  common: {
    id: "common",
    name: "Армійське (Mil-Spec)",
    color: "#4b69ff",
    glow: "rgba(75, 105, 255, 0.25)",
    border: "#4b69ff"
  },
  rare: {
    id: "rare",
    name: "Заборонене (Restricted)",
    color: "#8847ff",
    glow: "rgba(136, 71, 255, 0.35)",
    border: "#8847ff"
  },
  epic: {
    id: "epic",
    name: "Засекречене (Classified)",
    color: "#d32ce6",
    glow: "rgba(211, 44, 230, 0.5)",
    border: "#d32ce6"
  },
  legendary: {
    id: "legendary",
    name: "Таємне (Covert)",
    color: "#eb4b4b",
    glow: "rgba(235, 75, 75, 0.6)",
    border: "#eb4b4b"
  },
  mythic: {
    id: "mythic",
    name: "Надзвичайне (★ Special)",
    color: "#ffd700",
    glow: "rgba(255, 215, 0, 0.7)",
    border: "#ffd700"
  },
  ancient: {
    id: "ancient",
    name: "Контрабанда / Grail",
    color: "#ffaa00",
    glow: "rgba(255, 170, 0, 0.8)",
    border: "#ffaa00"
  }
};

// 2. WEAPON CATEGORIES & COLLECTIONS
const WEAPON_CATEGORIES = {
  pistol: "Пістолети",
  rifle: "Штурмові гвинтівки",
  sniper: "Снайперські гвинтівки",
  smg: "Пістолети-кулемети",
  heavy: "Важка зброя",
  knife: "Ножі (★)",
  gloves: "Рукавиці (★)",
  agent: "Агенти",
  sticker: "Наклейки",
  charm: "Брелоки"
};

const CS_COLLECTIONS = [
  "The Armory Collection",
  "The Recoil Collection",
  "The Revolution Collection",
  "The Dreams & Nightmares Collection",
  "The Snakebite Collection",
  "The Fracture Collection",
  "The Prisma 2 Collection",
  "The Cobblestone Collection",
  "The 2021 Mirage Collection",
  "The Chop Shop Collection",
  "The Gods and Monsters Collection"
];

// 3. WEAR (FLOAT) RANGES
const WEAPON_WEARS = [
  { code: "FN", name: "Factory New", nameUa: "Прямо з заводу", min: 0.00, max: 0.07, color: "#00ff88" },
  { code: "MW", name: "Minimal Wear", nameUa: "Трохи поношене", min: 0.07, max: 0.15, color: "#00f0ff" },
  { code: "FT", name: "Field-Tested", nameUa: "Після польових випробувань", min: 0.15, max: 0.38, color: "#ffb703" },
  { code: "WW", name: "Well-Worn", nameUa: "Добре поношене", min: 0.38, max: 0.45, color: "#ff7700" },
  { code: "BS", name: "Battle-Scarred", nameUa: "Загартоване в боях", min: 0.45, max: 1.00, color: "#ff2a5f" }
];

function getWearByFloat(floatVal) {
  const f = typeof floatVal === 'number' ? floatVal : 0.05;
  for (const w of WEAPON_WEARS) {
    if (f >= w.min && f <= w.max) return w;
  }
  return WEAPON_WEARS[0];
}

// 4. STICKERS CATALOG (Real CS2 Steam CDN Assets)
const STICKERS_CATALOG = [
  {
    id: "sticker_titan_holo",
    name: "Sticker | Titan (Holo) | Katowice 2014",
    type: "sticker",
    category: "Sticker",
    subType: "Holo",
    rarity: "ancient",
    price: 45000.00,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzn4_v8ydP0P27V6VsOf-fC2O52_J0uL9qSnK-rBhptWzZy936In-Tbw8kB9QjE947f_s2YIrg7g",
    description: "Легендарна голографічна наклейка Katowice 2014 з насиченим блакитним сяйвом."
  },
  {
    id: "sticker_ibuypower_holo",
    name: "Sticker | iBUYPOWER (Holo) | Katowice 2014",
    type: "sticker",
    category: "Sticker",
    subType: "Holo",
    rarity: "ancient",
    price: 52000.00,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzn4_v8ydP0Pu7V6VsOf-fC2O6wfp1vbFzTnu_rBhptWzZy9r6InOUPlYqDZR1E7U5f_tnYIoWbL7",
    description: "Одна з найбажаніших та найдорожчих червоних голографічних наклейок у грі."
  },
  {
    id: "sticker_howling_dawn",
    name: "Sticker | Howling Dawn",
    type: "sticker",
    category: "Sticker",
    subType: "Contraband",
    rarity: "ancient",
    price: 1850.00,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzn4_v8ydP0Pu3V6VsOf-fC2O7w-N0u7N0SHW_rBhptWzZyNn9JX6RaVIqCZR2QuM6ffszYIorGz19",
    description: "Контрабандна наклейка з зображенням палаючого вовка з легендарного M4A4 Howl."
  },
  {
    id: "sticker_crown_foil",
    name: "Sticker | Crown (Foil)",
    type: "sticker",
    category: "Sticker",
    subType: "Foil",
    rarity: "legendary",
    price: 680.00,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzn4_v8ydP0PW-V6VsOf-fC2O7wfBxuL9sSHW4rBhptWzZyNv7I36XPw8qCJRyQ7U7ceU2YIoxQ-Bf",
    description: "Золота металізована корона Foil, класичний символ престижу."
  },
  {
    id: "sticker_navi_gold_stockholm",
    name: "Sticker | Natus Vincere (Gold) | Stockholm 2021",
    type: "sticker",
    category: "Sticker",
    subType: "Gold",
    rarity: "legendary",
    price: 240.00,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzn4_v8ydP0PW7V6ZqMvCWBG7n1fN_tON_Ti-m8lh9t2iH84_5cneRbgV0D5NzE7ZcuhG6x4awZe6n4FHR2Y8",
    description: "Золота наклейка NAVI на честь тріумфального чемпіонства на мейджорі в Стокгольмі."
  },
  {
    id: "sticker_cloud9_holo_cologne",
    name: "Sticker | Cloud9 G2A (Holo) | Cologne 2014",
    type: "sticker",
    category: "Sticker",
    subType: "Holo",
    rarity: "epic",
    price: 135.00,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzn4_v8ydP0PW4V6ZsOf-dC3Ov0vp5vuR-Tjq7qhEutDWR1Nr6IHuXOgMkWcQiQ7YK5hG7wYfgYuOx5gSN2YNCyHn-2Cof5i5isL0cEf1yJefVwLI",
    description: "Яскравий блакитний голографічний логотип Cloud9 з Cologne 2014."
  },
  {
    id: "sticker_liquid_fire_holo",
    name: "Sticker | Liquid Fire (Holo)",
    type: "sticker",
    category: "Sticker",
    subType: "Holo",
    rarity: "rare",
    price: 45.00,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzn4_v8ydP0PW6V6ZsOf-dC3Ov0vp5vuR-Tjq7qhEutDWR1Nr6IHuXOgMkWcQiQ7YK5hG7wYfgYuOx5gSN2YNCyHn-2Cof5i5isL0cEf1yJefVwLI",
    description: "Голографічний переливчастий кінь Team Liquid у полум'ї."
  },
  {
    id: "sticker_headhunter_foil",
    name: "Sticker | Headhunter (Foil)",
    type: "sticker",
    category: "Sticker",
    subType: "Foil",
    rarity: "epic",
    price: 95.00,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzn4_v8ydP0P24V6VsOf-fC2O6w_VxuLBzTnW_rBhptWzZyNvyJHyXbwYqDZR2ROo_e_U0YIovrW3j",
    description: "Сяючий золотий череп з мішенню — класичний вибір для снайперів."
  },
  {
    id: "sticker_flammable_foil",
    name: "Sticker | Flammable (Foil)",
    type: "sticker",
    category: "Sticker",
    subType: "Foil",
    rarity: "rare",
    price: 78.00,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzn4_v8ydP0Pu4V6VsOf-fC2O6wfB1uLBzTne_rBhptWzZyNn9J3-TP1IqCZR0ROg6fftnYIoq61e4",
    description: "Небезпечний знак вогню у металевому виконанні Foil."
  },
  {
    id: "sticker_battle_scarred_holo",
    name: "Sticker | Battle Scarred (Holo)",
    type: "sticker",
    category: "Sticker",
    subType: "Holo",
    rarity: "common",
    price: 18.50,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzn4_v8ydP0PW-V6ZqMvCWBG7n1fN_tON_Ti-m8lh9t2iH84_5cneRbgV0D5NzE7ZcuhG6x4awZe6n4FHR2Y8",
    description: "Імітація глибоких кігтів із райдужним переливом."
  }
];

// 5. CHARMS CATALOG (CS2 The Armory 2024 Charms)
const CHARMS_CATALOG = [
  {
    id: "charm_semi_precious",
    name: "Charm | Semi-Precious",
    type: "charm",
    category: "Charm",
    rarity: "legendary",
    price: 320.00,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzn4_v8ydP0PW5V6FmPPCGDGWn0fB_teR_Ti6j8Fk44WiC84_8cnGUbwJ1CZV4ErY5f_tnYIrv0l1q",
    description: "Дорогоцінний кристал у металевій оправі, що прикріплюється до ствольної коробки зброї."
  },
  {
    id: "charm_baby_karat_ct",
    name: "Charm | Baby Karat CT",
    type: "charm",
    category: "Charm",
    rarity: "legendary",
    price: 245.00,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzn4_v8ydP0PW3V6FmPPCGDGWn0fB_teR_Ti6j8Fk44WiC84_8cnGUbwJ1CZV4ErY5f_tnYIrv0l1q",
    description: "Мініатюрна золота фігурка бійця спецпідрозділу з рухомими ніжками."
  },
  {
    id: "charm_baby_karat_t",
    name: "Charm | Baby Karat T",
    type: "charm",
    category: "Charm",
    rarity: "legendary",
    price: 260.00,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzn4_v8ydP0PW1V6FmPPCGDGWn0fB_teR_Ti6j8Fk44WiC84_8cnGUbwJ1CZV4ErY5f_tnYIrv0l1q",
    description: "Мініатюрна золота фігурка терориста з фірмовою маскою."
  },
  {
    id: "charm_hot_howl",
    name: "Charm | Hot Howl",
    type: "charm",
    category: "Charm",
    rarity: "epic",
    price: 110.00,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzn4_v8ydP0PW2V6FmPPCGDGWn0fB_teR_Ti6j8Fk44WiC84_8cnGUbwJ1CZV4ErY5f_tnYIrv0l1q",
    description: "Вогняний міні-вовк у стилі культового Howl, що гойдається під час стрільби."
  },
  {
    id: "charm_die_cast_ak",
    name: "Charm | Die-cast AK",
    type: "charm",
    category: "Charm",
    rarity: "rare",
    price: 65.00,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzn4_v8ydP0PW4V6FmPPCGDGWn0fB_teR_Ti6j8Fk44WiC84_8cnGUbwJ1CZV4ErY5f_tnYIrv0l1q",
    description: "Металевий міні-автомат Калашникова на кільці для кріплення."
  },
  {
    id: "charm_lil_monster",
    name: "Charm | Lil' Monster",
    type: "charm",
    category: "Charm",
    rarity: "rare",
    price: 42.00,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzn4_v8ydP0PW6V6FmPPCGDGWn0fB_teR_Ti6j8Fk44WiC84_8cnGUbwJ1CZV4ErY5f_tnYIrv0l1q",
    description: "Кумедний монстрик, що додає зброї унікальної харизми."
  },
  {
    id: "charm_stitch_loaded",
    name: "Charm | Stitch-Loaded",
    type: "charm",
    category: "Charm",
    rarity: "common",
    price: 19.50,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzn4_v8ydP0PW7V6FmPPCGDGWn0fB_teR_Ti6j8Fk44WiC84_8cnGUbwJ1CZV4ErY5f_tnYIrv0l1q",
    description: "Текстильний брелок ручної роботи у вигляді патрона."
  }
];

// 6. EXPANDED WEAPONS WITH FLOAT & STATTRAK CAPABILITY
const EXPANDED_WEAPON_SKINS = [
  {
    id: "weapon_ak47_gold_arabesque",
    name: "AK-47 | Gold Arabesque",
    weapon: "AK-47",
    category: "Rifle",
    type: "weapon",
    rarity: "ancient",
    price: 3400.00,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzn4_v8ydP0PW8V6VsOf-fC2O6w_R1urF3SnG4qBlwsWjWyN_8IHuTPlImCZRzReo5cfpkYIrKkX10",
    collection: "The 2021 Dust 2 Collection",
    wear: "FN",
    float: 0.0142,
    isStatTrak: false
  },
  {
    id: "weapon_m4a1s_printstream_st",
    name: "StatTrak™ M4A1-S | Printstream",
    weapon: "M4A1-S",
    category: "Rifle",
    type: "weapon",
    rarity: "legendary",
    price: 490.00,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzn4_v8ydP0PW9V6ZsOf-dC3Ov0vp5vuR-Tjq7qhEutDWR1Nr6IHuXOgMkWcQiQ7YK5hG7wYfgYuOx5gSN2YNCyHn-2Cof5i5isL0cEf1yJefVwLI",
    collection: "The Fracture Collection",
    wear: "MW",
    float: 0.0821,
    isStatTrak: true,
    statTrakKills: 1337
  },
  {
    id: "weapon_awP_desert_hydra",
    name: "AWP | Desert Hydra",
    weapon: "AWP",
    category: "Sniper",
    type: "weapon",
    rarity: "legendary",
    price: 1750.00,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzn4_v8ydP0PW6V6VsOf-fC2O7w-R1u7N3SnG_qBlwsWjWyNr6In-Tbw8kB9QjE947f_s2YIrg7g",
    collection: "The 2021 Mirage Collection",
    wear: "FN",
    float: 0.0298,
    isStatTrak: false
  },
  {
    id: "weapon_usp_kill_confirmed_st",
    name: "StatTrak™ USP-S | Kill Confirmed",
    weapon: "USP-S",
    category: "Rifle",
    type: "weapon",
    rarity: "legendary",
    price: 310.00,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzn4_v8ydP0PW1V6ZsOf-dC3Ov0vp5vuR-Tjq7qhEutDWR1Nr6IHuXOgMkWcQiQ7YK5hG7wYfgYuOx5gSN2YNCyHn-2Cof5i5isL0cEf1yJefVwLI",
    collection: "The Shadow Collection",
    wear: "FT",
    float: 0.1855,
    isStatTrak: true,
    statTrakKills: 742
  },
  {
    id: "weapon_glock_gamma_doppler",
    name: "Glock-18 | Gamma Doppler (Emerald)",
    weapon: "Glock-18",
    category: "Rifle",
    type: "weapon",
    rarity: "legendary",
    price: 280.00,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzn4_v8ydP0PW4V6VsOf-fC2O7w-R1u7N3SnG_qBlwsWjWyNr6In-Tbw8kB9QjE947f_s2YIrg7g",
    collection: "The 2021 Train Collection",
    wear: "FN",
    float: 0.0089,
    isStatTrak: false
  }
];

// Helper to determine item broad type for unified inventory & filters
function getItemBroadType(item) {
  if (!item) return 'weapon';
  if (item.type) return item.type;
  const cat = (item.category || '').toLowerCase();
  if (cat.includes('knife') || cat.includes('нож')) return 'knife';
  if (cat.includes('glove') || cat.includes('рукавиц')) return 'gloves';
  if (cat.includes('agent') || cat.includes('агент')) return 'agent';
  if (cat.includes('sticker') || cat.includes('наклей')) return 'sticker';
  if (cat.includes('charm') || cat.includes('брелок')) return 'charm';
  return 'weapon';
}

// Generate realistic Float and Wear for any weapon item if missing
function enrichWeaponProperties(item) {
  if (!item) return item;
  const broadType = getItemBroadType(item);
  
  // Clone to avoid mutating catalog template
  const enriched = { ...item, type: broadType };

  if (broadType === 'weapon' || broadType === 'knife') {
    if (typeof enriched.float !== 'number') {
      // Generate realistic deterministic float based on instanceId or id
      const seedStr = (enriched.instanceId || enriched.id || '') + 'float';
      let hash = 0;
      for (let i = 0; i < seedStr.length; i++) hash = ((hash << 5) - hash) + seedStr.charCodeAt(i);
      const randVal = Math.abs(hash % 10000) / 10000; // 0.0000 - 0.9999
      enriched.float = parseFloat((0.001 + randVal * 0.45).toFixed(4)); // Realistic low-mid floats
    }
    if (!enriched.wear) {
      enriched.wear = getWearByFloat(enriched.float).code;
    }
    if (typeof enriched.isStatTrak === 'undefined') {
      enriched.isStatTrak = enriched.name.startsWith('StatTrak™');
      if (enriched.isStatTrak && typeof enriched.statTrakKills === 'undefined') {
        enriched.statTrakKills = Math.floor(enriched.float * 1000) + 42;
      }
    }
    if (!Array.isArray(enriched.appliedStickers)) {
      enriched.appliedStickers = [];
    }
    if (typeof enriched.attachedCharm === 'undefined') {
      enriched.attachedCharm = null;
    }
  }
  return enriched;
}

// Merge everything cleanly into ITEM_CATALOG
function mergeAllCosmeticsIntoCatalog(baseCatalog) {
  const merged = [...baseCatalog];
  
  // Add new stickers
  STICKERS_CATALOG.forEach(sticker => {
    if (!merged.some(i => i.id === sticker.id)) {
      merged.push(sticker);
    }
  });

  // Add new charms
  CHARMS_CATALOG.forEach(charm => {
    if (!merged.some(i => i.id === charm.id)) {
      merged.push(charm);
    }
  });

  // Add new expanded weapon skins
  EXPANDED_WEAPON_SKINS.forEach(weapon => {
    if (!merged.some(i => i.id === weapon.id)) {
      merged.push(weapon);
    }
  });

  return merged;
}

// Export to global scope for browser & Node.js compatibility
if (typeof window !== 'undefined') {
  window.COSMETIC_RARITIES = COSMETIC_RARITIES;
  window.WEAPON_CATEGORIES = WEAPON_CATEGORIES;
  window.WEAPON_WEARS = WEAPON_WEARS;
  window.CS_COLLECTIONS = CS_COLLECTIONS;
  window.STICKERS_CATALOG = STICKERS_CATALOG;
  window.CHARMS_CATALOG = CHARMS_CATALOG;
  window.EXPANDED_WEAPON_SKINS = EXPANDED_WEAPON_SKINS;
  window.getItemBroadType = getItemBroadType;
  window.enrichWeaponProperties = enrichWeaponProperties;
  window.getWearByFloat = getWearByFloat;
  window.mergeAllCosmeticsIntoCatalog = mergeAllCosmeticsIntoCatalog;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    COSMETIC_RARITIES,
    WEAPON_CATEGORIES,
    WEAPON_WEARS,
    CS_COLLECTIONS,
    STICKERS_CATALOG,
    CHARMS_CATALOG,
    EXPANDED_WEAPON_SKINS,
    getItemBroadType,
    enrichWeaponProperties,
    getWearByFloat,
    mergeAllCosmeticsIntoCatalog
  };
}
