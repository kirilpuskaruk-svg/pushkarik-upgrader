// 7. CASES CATALOG
const CASES_CATALOG = [
  {
    id: 'case_charms',
    name: 'Chroma 2 Case',
    price: 350.00,
    image: 'https://community.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJKz2lu_XsnXwtmkJjSU91dh8bj35VTqVBP4io_fqmwOuKD2PqI6caDBWDeUkO8uteM9SnDglklw6miEn9j6IHKfblNxA5pxW6dU5UH4LtBe/256fx256f',
    description: '����������� ���� �� ���������� ������ �� ���������.',
    type: 'case',
    containsType: 'charm'
  },
  {
    id: 'case_stickers',
    name: 'Gamma Case',
    price: 150.00,
    image: 'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXU5A1PIYQNqhpOSV-fRPasw8rsUFJ5KBFZv668FFYxnPAceDHQxN6wwdXxxqelY-mJwD9Tvccij-_A9I_x31DnqEI_Zmzxd4fGcFE3NwzT_VK_xb-5hMDvyCNt/256fx256f',
    description: '���� �� ��������� ������ �� �������� ��������.',
    type: 'case',
    containsType: 'sticker'
  },
  {
    id: 'case_dreams',
    name: 'Dreams & Nightmares Case',
    price: 450.00,
    image: 'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8gulRYQU_bTvT_m86QW1B5NQx-rL2qJ1VnnaecJGsMvtylwtSExPPyNrbXkGwFscp12-qSoInyigDgqUpuNTzxLIGRdlQ7ZFqE-lTtxuy6jJ676p2bzSdqvic8pSdd1-8S2A/256fx256f',
    description: '������������ ���� �� �������� ������ (Gamma Doppler).',
    type: 'case',
    containsType: 'dreams'
  },
  {
    id: 'case_grail',
    name: 'Operation Bravo Case',
    price: 2500.00,
    image: 'https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXQ9QVcJY8gulRYQU_bTvT_m86QW1B5NQx-rL2qJ1R3l_b3eD5G7I3im4uPzvLxZb2AwD5UupV1j7rA8Nmmi1Cw8hBsNWjwJNHEdFBsZliE-1Tsl-7shsfotZ3IzHIxsicn4y6InETj1RgaP-c71-veFwt5vSM4/256fx256f',
    description: '����������� ����. ����� ����� �� Covert.',
    type: 'case',
    containsType: 'grail'
  }
];

/**
 * PUSHKARIK UPGRADER - Modular CS2 Cosmetics Architecture
 * Weapon Skins, Stickers, Charms, Collections & Wear Data
 * 100% DEMO - NO REAL MONEY - NO GAMBLING
 */

// 1. RARITIES SPECIFICATION
const COSMETIC_RARITIES = {
  common: {
    id: "common",
    name: "РђСЂРјС–Р№СЃСЊРєРµ (Mil-Spec)",
    color: "#4b69ff",
    glow: "rgba(75, 105, 255, 0.25)",
    border: "#4b69ff"
  },
  rare: {
    id: "rare",
    name: "Р—Р°Р±РѕСЂРѕРЅРµРЅРµ (Restricted)",
    color: "#8847ff",
    glow: "rgba(136, 71, 255, 0.35)",
    border: "#8847ff"
  },
  epic: {
    id: "epic",
    name: "Р—Р°СЃРµРєСЂРµС‡РµРЅРµ (Classified)",
    color: "#d32ce6",
    glow: "rgba(211, 44, 230, 0.5)",
    border: "#d32ce6"
  },
  legendary: {
    id: "legendary",
    name: "РўР°С”РјРЅРµ (Covert)",
    color: "#eb4b4b",
    glow: "rgba(235, 75, 75, 0.6)",
    border: "#eb4b4b"
  },
  mythic: {
    id: "mythic",
    name: "РќР°РґР·РІРёС‡Р°Р№РЅРµ (в… Special)",
    color: "#ffd700",
    glow: "rgba(255, 215, 0, 0.7)",
    border: "#ffd700"
  },
  ancient: {
    id: "ancient",
    name: "РљРѕРЅС‚СЂР°Р±Р°РЅРґР° / Grail",
    color: "#ffaa00",
    glow: "rgba(255, 170, 0, 0.8)",
    border: "#ffaa00"
  }
};

// 2. WEAPON CATEGORIES & COLLECTIONS
const WEAPON_CATEGORIES = {
  pistol: "РџС–СЃС‚РѕР»РµС‚Рё",
  rifle: "РЁС‚СѓСЂРјРѕРІС– РіРІРёРЅС‚С–РІРєРё",
  sniper: "РЎРЅР°Р№РїРµСЂСЃСЊРєС– РіРІРёРЅС‚С–РІРєРё",
  smg: "РџС–СЃС‚РѕР»РµС‚Рё-РєСѓР»РµРјРµС‚Рё",
  heavy: "Р’Р°Р¶РєР° Р·Р±СЂРѕСЏ",
  knife: "РќРѕР¶С– (в…)",
  gloves: "Р СѓРєР°РІРёС†С– (в…)",
  agent: "РђРіРµРЅС‚Рё",
  sticker: "РќР°РєР»РµР№РєРё",
  charm: "Р‘СЂРµР»РѕРєРё"
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
  { code: "FN", name: "Factory New", nameUa: "РџСЂСЏРјРѕ Р· Р·Р°РІРѕРґСѓ", min: 0.00, max: 0.07, color: "#00ff88" },
  { code: "MW", name: "Minimal Wear", nameUa: "РўСЂРѕС…Рё РїРѕРЅРѕС€РµРЅРµ", min: 0.07, max: 0.15, color: "#00f0ff" },
  { code: "FT", name: "Field-Tested", nameUa: "РџС–СЃР»СЏ РїРѕР»СЊРѕРІРёС… РІРёРїСЂРѕР±СѓРІР°РЅСЊ", min: 0.15, max: 0.38, color: "#ffb703" },
  { code: "WW", name: "Well-Worn", nameUa: "Р”РѕР±СЂРµ РїРѕРЅРѕС€РµРЅРµ", min: 0.38, max: 0.45, color: "#ff7700" },
  { code: "BS", name: "Battle-Scarred", nameUa: "Р—Р°РіР°СЂС‚РѕРІР°РЅРµ РІ Р±РѕСЏС…", min: 0.45, max: 1.00, color: "#ff2a5f" }
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
    description: "Р›РµРіРµРЅРґР°СЂРЅР° РіРѕР»РѕРіСЂР°С„С–С‡РЅР° РЅР°РєР»РµР№РєР° Katowice 2014 Р· РЅР°СЃРёС‡РµРЅРёРј Р±Р»Р°РєРёС‚РЅРёРј СЃСЏР№РІРѕРј."
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
    description: "РћРґРЅР° Р· РЅР°Р№Р±Р°Р¶Р°РЅС–С€РёС… С‚Р° РЅР°Р№РґРѕСЂРѕР¶С‡РёС… С‡РµСЂРІРѕРЅРёС… РіРѕР»РѕРіСЂР°С„С–С‡РЅРёС… РЅР°РєР»РµР№РѕРє Сѓ РіСЂС–."
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
    description: "РљРѕРЅС‚СЂР°Р±Р°РЅРґРЅР° РЅР°РєР»РµР№РєР° Р· Р·РѕР±СЂР°Р¶РµРЅРЅСЏРј РїР°Р»Р°СЋС‡РѕРіРѕ РІРѕРІРєР° Р· Р»РµРіРµРЅРґР°СЂРЅРѕРіРѕ M4A4 Howl."
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
    description: "Р—РѕР»РѕС‚Р° РјРµС‚Р°Р»С–Р·РѕРІР°РЅР° РєРѕСЂРѕРЅР° Foil, РєР»Р°СЃРёС‡РЅРёР№ СЃРёРјРІРѕР» РїСЂРµСЃС‚РёР¶Сѓ."
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
    description: "Р—РѕР»РѕС‚Р° РЅР°РєР»РµР№РєР° NAVI РЅР° С‡РµСЃС‚СЊ С‚СЂС–СѓРјС„Р°Р»СЊРЅРѕРіРѕ С‡РµРјРїС–РѕРЅСЃС‚РІР° РЅР° РјРµР№РґР¶РѕСЂС– РІ РЎС‚РѕРєРіРѕР»СЊРјС–."
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
    description: "РЇСЃРєСЂР°РІРёР№ Р±Р»Р°РєРёС‚РЅРёР№ РіРѕР»РѕРіСЂР°С„С–С‡РЅРёР№ Р»РѕРіРѕС‚РёРї Cloud9 Р· Cologne 2014."
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
    description: "Р“РѕР»РѕРіСЂР°С„С–С‡РЅРёР№ РїРµСЂРµР»РёРІС‡Р°СЃС‚РёР№ РєС–РЅСЊ Team Liquid Сѓ РїРѕР»СѓРј'С—."
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
    description: "РЎСЏСЋС‡РёР№ Р·РѕР»РѕС‚РёР№ С‡РµСЂРµРї Р· РјС–С€РµРЅРЅСЋ вЂ” РєР»Р°СЃРёС‡РЅРёР№ РІРёР±С–СЂ РґР»СЏ СЃРЅР°Р№РїРµСЂС–РІ."
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
    description: "РќРµР±РµР·РїРµС‡РЅРёР№ Р·РЅР°Рє РІРѕРіРЅСЋ Сѓ РјРµС‚Р°Р»РµРІРѕРјСѓ РІРёРєРѕРЅР°РЅРЅС– Foil."
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
    description: "Р†РјС–С‚Р°С†С–СЏ РіР»РёР±РѕРєРёС… РєС–РіС‚С–РІ С–Р· СЂР°Р№РґСѓР¶РЅРёРј РїРµСЂРµР»РёРІРѕРј."
  },
  {
    id: "sticker_kato14_reason_holo",
    name: "Sticker | Reason Gaming (Holo) | Katowice 2014",
    type: "sticker",
    category: "Sticker",
    subType: "Holo",
    rarity: "ancient",
    price: 60000.00,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzn4_v8ydP0PW-V6VsOf-fC2O6w_V1ur9sSHa8qBlwsWjWyNr6In-Tbw8kB9QjE947f_s2YIrg7g",
    description: "РќР°РґР·РІРёС‡Р°Р№РЅРѕ СЂС–РґРєС–СЃРЅР° РіРѕР»РѕРіСЂР°С„С–С‡РЅР° РЅР°РєР»РµР№РєР°."
  },
  {
    id: "sticker_kato14_vox_holo",
    name: "Sticker | Vox Eminor (Holo) | Katowice 2014",
    type: "sticker",
    category: "Sticker",
    subType: "Holo",
    rarity: "ancient",
    price: 35000.00,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzn4_v8ydP0PW8V6VsOf-fC2O6w_J-vbN1SnW-qBlwsWjWyNv4IXmXPlAnDcVyRbA6ceqyYIoZqL4v",
    description: "Р›РµРіРµРЅРґР°СЂРЅР° РіРѕР»РѕРіСЂР°С„С–С‡РЅР° РЅР°РєР»РµР№РєР° Р· РљР°С‚РѕРІС–С†Рµ 2014."
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
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGI6zwki4Uf_a0IW2MHqH6lhKpcj_6WbwURPOip3u9CRe0PG8cbd5IfzdXT_Bwr4u4rU9GSrrx09042TUm4z7eXOVbFcgC5J4Q7QL4BW_x4CzMPSiuVKoeSA8mg",
    description: "Р”РѕСЂРѕРіРѕС†С–РЅРЅРёР№ РєСЂРёСЃС‚Р°Р» Сѓ РјРµС‚Р°Р»РµРІС–Р№ РѕРїСЂР°РІС–, С‰Рѕ РїСЂРёРєСЂС–РїР»СЋС”С‚СЊСЃСЏ РґРѕ СЃС‚РІРѕР»СЊРЅРѕС— РєРѕСЂРѕР±РєРё Р·Р±СЂРѕС—."
  },
  {
    id: "charm_baby_karat_ct",
    name: "Charm | Baby Karat CT",
    type: "charm",
    category: "Charm",
    rarity: "legendary",
    price: 245.00,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGI6zwki4Uf_a0IW2MHqH6lhKpcj_6WbwURPOnYLr8ytd6s2pZ6hpbqGVXWOWwLoktLFtHnDmwU4l4jnUwt6pInqSO1AiWJp1QuVeu0S4kt35d7S1otZRy58",
    description: "РњС–РЅС–Р°С‚СЋСЂРЅР° Р·РѕР»РѕС‚Р° С„С–РіСѓСЂРєР° Р±С–Р№С†СЏ СЃРїРµС†РїС–РґСЂРѕР·РґС–Р»Сѓ Р· СЂСѓС…РѕРјРёРјРё РЅС–Р¶РєР°РјРё."
  },
  {
    id: "charm_baby_karat_t",
    name: "Charm | Baby Karat T",
    type: "charm",
    category: "Charm",
    rarity: "legendary",
    price: 260.00,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGI6zwki4Uf_a0IW2MHqH6lhKpcj_6WbwURPOip3u9CRe0PWhZKAjJPOXWDGWlOgm47QxTH7jwExy5zmAw977cinCbgcgCJNzFLID50bsw8qnab1NtMpc9Q",
    description: "РњС–РЅС–Р°С‚СЋСЂРЅР° Р·РѕР»РѕС‚Р° С„С–РіСѓСЂРєР° С‚РµСЂРѕСЂРёСЃС‚Р° Р· С„С–СЂРјРѕРІРѕСЋ РјР°СЃРєРѕСЋ."
  },
  {
    id: "charm_hot_howl",
    name: "Charm | Hot Howl",
    type: "charm",
    category: "Charm",
    rarity: "epic",
    price: 110.00,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGI6zwki4Uf_a0IWsPGiE7Fhy-I764RbsQiL8l4Xz9Cxc4_ugY5tlL-efQGKTmbxztbJoFnvjkBtw4zjcw9v8ICiTOwcpDpZyF-FYsBO9k4W2Nbn8p1uJTS_m1eQ",
    description: "Р’РѕРіРЅСЏРЅРёР№ РјС–РЅС–-РІРѕРІРє Сѓ СЃС‚РёР»С– РєСѓР»СЊС‚РѕРІРѕРіРѕ Howl, С‰Рѕ РіРѕР№РґР°С”С‚СЊСЃСЏ РїС–Рґ С‡Р°СЃ СЃС‚СЂС–Р»СЊР±Рё."
  },
  {
    id: "charm_die_cast_ak",
    name: "Charm | Die-cast AK",
    type: "charm",
    category: "Charm",
    rarity: "rare",
    price: 65.00,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGI6zwki4Uf_a0IW2MHqH6lhKpcj_6WbwURPOn53f9ydX4-vgPvw_efKXXzWWkL0ksrQwGCjmlBl24DjUyNipcS-WOFQoDsd2Te9Zsg74zIPxCozwxw",
    description: "РњРµС‚Р°Р»РµРІРёР№ РјС–РЅС–-Р°РІС‚РѕРјР°С‚ РљР°Р»Р°С€РЅРёРєРѕРІР° РЅР° РєС–Р»СЊС†С– РґР»СЏ РєСЂС–РїР»РµРЅРЅСЏ."
  },
  {
    id: "charm_lil_monster",
    name: "Charm | Lil' Monster",
    type: "charm",
    category: "Charm",
    rarity: "rare",
    price: 42.00,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGI6zwki4Uf_a0IWsPGiE7Fhy-I764RbsQiL8l4Xz9Cxc4_ugY5tgL_6AGmKCj79wtOVrTijixU0m5m3UntioI3PEZldzCpd1FOJfsxXtmtCxNezk5gTAy9USJfGXAGI",
    description: "РљСѓРјРµРґРЅРёР№ РјРѕРЅСЃС‚СЂРёРє, С‰Рѕ РґРѕРґР°С” Р·Р±СЂРѕС— СѓРЅС–РєР°Р»СЊРЅРѕС— С…Р°СЂРёР·РјРё."
  },
  {
    id: "charm_stitch_loaded",
    name: "Charm | Stitch-Loaded",
    type: "charm",
    category: "Charm",
    rarity: "common",
    price: 19.50,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGI6zwki4Uf_a0IW2MHqH6lhKpcj_6WbwURPOi4Xwwjta_fzgPvNoJfPLDDDHwLcjtrdsGS3lwxwl52qGm9b_eHiVO1IgCMR4QO5Yuw74zIPBDwTYVQ",
    description: "РўРµРєСЃС‚РёР»СЊРЅРёР№ Р±СЂРµР»РѕРє СЂСѓС‡РЅРѕС— СЂРѕР±РѕС‚Рё Сѓ РІРёРіР»СЏРґС– РїР°С‚СЂРѕРЅР°."
  },
  {
    id: "charm_small_arms",
    name: "Charm | Small Arms",
    type: "charm",
    category: "Charm",
    rarity: "epic",
    price: 140.00,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGI6zwki4Uf_a0IWsPGiE7Fhy-I764RbsQiL8l4Xz9Cxc4_ugY5tjLaaWQGeXz_8HsnxR37JowgE6m4m3Um-ioI6SCAU8z1J4QONZvUS-nLaxNbSj4yZCy9USJQeH6Hnb",
    description: "РњС–РЅС–Р°С‚СЋСЂРЅР° РіСЂР°РЅР°С‚Р°."
  },
  {
    id: "charm_missing_link",
    name: "Charm | Missing Link",
    type: "charm",
    category: "Charm",
    rarity: "legendary",
    price: 420.00,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGI6zwki4Uf_a0IW2MHqH6lhKpcj_6WbwURPOip3u9CRe0PWhZKAjJPOXWDGWlOgm47QxTH7jwExy5zmAw977cinCbgcgCJNzFLID50bsw8qnab1NtMpc9Q",
    description: "РЎРµРєСЂРµС‚РЅРёР№ РєРѕРІР±Р°СЃРЅРёР№ С‡РѕР»РѕРІС–С‡РѕРє."
  },
  {
    id: "charm_diner_dog",
    name: "Charm | Diner Dog",
    type: "charm",
    category: "Charm",
    rarity: "rare",
    price: 85.00,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGI6zwki4Uf_a0IWsPGiE7Fhy-I764RbsQiL8l4Xz9Cxc4_ugY5tlL-efQGKTmbxztbJoFnvjkBtw4zjcw9v8ICiTOwcpDpZyF-FYsBO9k4W2Nbn8p1uJTS_m1eQ",
    description: "РЎРѕСЃРёСЃРєР° РІ С‚С–СЃС‚С–."
  },
  {
    id: "charm_glock_time",
    name: "Charm | Glock Time",
    type: "charm",
    category: "Charm",
    rarity: "epic",
    price: 125.00,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGI6zwki4Uf_a0IWsPGiE7Fhy-I764RbsQiL8l4Xz9Cxc4_ugY5tgL_6AGmKCj79wtOVrTijixU0m5m3UntioI3PEZldzCpd1FOJfsxXtmtCxNezk5gTAy9USJfGXAGI",
    description: "РњС–РЅС–Р°С‚СЋСЂРЅРёР№ Glock-18."
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
  if (cat.includes('knife') || cat.includes('РЅРѕР¶')) return 'knife';
  if (cat.includes('glove') || cat.includes('СЂСѓРєР°РІРёС†')) return 'gloves';
  if (cat.includes('agent') || cat.includes('Р°РіРµРЅС‚')) return 'agent';
  if (cat.includes('sticker') || cat.includes('РЅР°РєР»РµР№')) return 'sticker';
  if (cat.includes('charm') || cat.includes('Р±СЂРµР»РѕРє')) return 'charm';
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
  window.CASES_CATALOG = CASES_CATALOG;
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
    CASES_CATALOG,
    EXPANDED_WEAPON_SKINS,
    getItemBroadType,
    enrichWeaponProperties,
    getWearByFloat,
    mergeAllCosmeticsIntoCatalog
  };
}




