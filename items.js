/**
 * UPGRADER DEMO - Catalog with REAL Steam CS2 Skin Photos
 * 100% DEMO - NO REAL MONEY - NO GAMBLING
 */

const RARITIES = {
  common: { name: 'Звичайний', color: '#8fa3bf', glow: 'rgba(143, 163, 191, 0.25)', border: '#5b6f8a' },
  rare: { name: 'Рідкісний', color: '#3b82f6', glow: 'rgba(59, 130, 246, 0.35)', border: '#2563eb' },
  epic: { name: 'Епічний', color: '#a855f7', glow: 'rgba(168, 85, 247, 0.45)', border: '#9333ea' },
  legendary: { name: 'Легендарний', color: '#f59e0b', glow: 'rgba(245, 158, 11, 0.5)', border: '#d97706' },
  mythic: { name: 'Міфічний', color: '#ef4444', glow: 'rgba(239, 68, 68, 0.6)', border: '#dc2626' },
  ancient: { name: 'Надзвичайний', color: '#ec4899', glow: 'rgba(236, 72, 153, 0.7)', border: '#db2777' }
};

const ITEM_CATALOG = [
  {
    "id": "skin_1",
    "name": "P250 | Sand Dune",
    "category": "Pistol",
    "rarity": "common",
    "price": 0.25,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLhzMOwwjFU0OGvZqBSLPmUBnPelesn5-RrSXDlwRhx5TjSwtmocCifPwQpDpshReBfsxPrk4DhNu3jshue1dy8VcXxuA"
  },
  {
    "id": "skin_2",
    "name": "Glock-18 | High Beam",
    "category": "Pistol",
    "rarity": "common",
    "price": 0.85,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1a7s24bbZ5KfecMWWc1OtJvOhuRz39zU5yt2vQntn9dC3Dbw8iDJQhF-IJ5xDqkdSxMr6251aMiI5BynqtiTQJsHhqpMNExQ"
  },
  {
    "id": "skin_3",
    "name": "MAC-10 | Ensnared",
    "category": "SMG",
    "rarity": "common",
    "price": 1.1,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8n5WxrR1Y-s2jaac8cM-DB3-ZxNF6ueZhW2fikB935ziGztj7JHyQbgIkWZsmFrJY4xTpwdOzP-Oz7laNj4lFyy2tkGoXudbL5uIf"
  },
  {
    "id": "skin_4",
    "name": "USP-S | Lead Conduit",
    "category": "Pistol",
    "rarity": "common",
    "price": 1.8,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSJ-OsG3SA_vh5vPVoSCyMmRQguynLmNyrdimTZw4mW8cmE-ZYsxewkYaxZb6z5FbfjY8RyS__iXsc6S09sfFCD_RkYnnFtg"
  },
  {
    "id": "skin_5",
    "name": "M4A4 | Magnesium",
    "category": "Rifle",
    "rarity": "common",
    "price": 2.4,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwiVI0P_6afBSI_icHneV09FxuO56Wxa_nBovp3OAzo2vdHPFPFUmCJRxRbNZ4xewx9W1Nb7j4gzXg99Ayy73iC1Aun1q_a9cBiEfMG3G"
  },
  {
    "id": "skin_6",
    "name": "Galil AR | Rocket Pop",
    "category": "Rifle",
    "rarity": "common",
    "price": 3.2,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2n5rp8SNJ0PG7V6NsLPmfD3Wv0e9kpOhqQyygqhEutDWR1Nf8eXzDP1InCMR3QucIshjrktexMOqz4QPcjo1Gz3qq2H9L5ylu4ugcEf1yh3Lp9zc"
  },
  {
    "id": "skin_7",
    "name": "AK-47 | Slate",
    "category": "Rifle",
    "rarity": "rare",
    "price": 5.5,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiVI0POlPPNSMOKcCGKD0ud5vuBlcCW6khUz_W3Sytb4cCqTOFUpWJtzTOUD5hPsw9a0Yrnrs1SK3ooXzy6shilM5311o7FVYrIufmI"
  },
  {
    "id": "skin_8",
    "name": "M4A4 | Evil Daimyo",
    "category": "Rifle",
    "rarity": "rare",
    "price": 7.2,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwiFO0P_6afBSJeaaAliUwOd7qe5WQyC0nQlp4GqGz42ucCqXaQMhDpd4R-AIsxK6ktXgZePltVPXitoRn3-tjCgd6zErvbijVJZd2Q"
  },
  {
    "id": "skin_9",
    "name": "Desert Eagle | Light Rail",
    "category": "Pistol",
    "rarity": "rare",
    "price": 9.5,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk6OGRbKFsJ_yWMWKIztF6ueZhW2fhlhlw6m-GnNyvIiiXOwQoDMR2QbZe5hi5k9KxN-vhtFbciN1FnyqskGoXuU4JtHUo"
  },
  {
    "id": "skin_10",
    "name": "AWP | Atheris",
    "category": "Sniper",
    "rarity": "rare",
    "price": 14.0,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_jdk7uW-V7JkMPWBMWuZxuZi_rZsS3zgzU8isW3dnIr6eHKfPVAhDpojEe9YsUW4xta1Nuzm5FDci4NbjXKpmWVQppo"
  },
  {
    "id": "skin_11",
    "name": "USP-S | Cyrex",
    "category": "Pistol",
    "rarity": "rare",
    "price": 18.5,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSI-WsG3SA_u1vouRxcCW6khUz_TjdzdmsJyiTZg8kX8N4ELUP5EPsw9G1YeLn5VTXjY0WxS6rhiIYuCd1o7FV2N83Spg"
  },
  {
    "id": "skin_12",
    "name": "M4A1-S | Nitro",
    "category": "Rifle",
    "rarity": "rare",
    "price": 24.0,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H-OcMWiCwOBxtd5oTCq2mwk0jDGMnYftb3nFaVQgApQiQuEOukS-x4KxP-PjsQOLjt9HzS6t2CpB6C0_4LxWBaA7uvqANEieesU"
  },
  {
    "id": "skin_13",
    "name": "AK-47 | Redline",
    "category": "Rifle",
    "rarity": "epic",
    "price": 32.0,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0POlPPNSI_-RHGavzedxuPUnFniykEtzsWWBzoyuIiifaAchDZUjTOZe4RC_w4buM-6z7wzbgokUyzK-0H08hRGDMA"
  },
  {
    "id": "skin_14",
    "name": "Glock-18 | Water Elemental",
    "category": "Pistol",
    "rarity": "epic",
    "price": 38.0,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL2kpnj9h1Y-s2pZKtuK72fB3aFxP11te99cCW6khUz_TjVyompc3-QOFR2DJQkFOMJtBbqk9LlY-7n5QLZjtkTxCWqhixPv311o7FVIf8eASQ"
  },
  {
    "id": "skin_15",
    "name": "M4A1-S | Decimator",
    "category": "Rifle",
    "rarity": "epic",
    "price": 48.0,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_eAMWrEwL9JtORqRiSygRI1jDGMnYftb3iUb1dxW5ImFLNftxCxktflZLm2tgaP2otGyn_-hytOvy9q5elQV_A7uvqA6CRSoZY"
  },
  {
    "id": "skin_16",
    "name": "AWP | Neo-Noir",
    "category": "Sniper",
    "rarity": "epic",
    "price": 65.0,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_jdk7uW-V6poL_6cB3WvzedxuPUnHirrxR4l423SyI39I3KXPwdxWZclQeNZ5EXskYfnNeyw71OMi9lNzDK-0H3r66pOTw"
  },
  {
    "id": "skin_17",
    "name": "Desert Eagle | Mecha Industries",
    "category": "Pistol",
    "rarity": "epic",
    "price": 82.0,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk6OGRbKFsJ_yWMWqVwuZ3j-1gSCGn20h042vSyY2tdyjCZwIlXJBxQeNe4EWxxoHkMOq0sQGIid5Fnyr42HtXrnE8p4gbgvE"
  },
  {
    "id": "skin_18",
    "name": "USP-S | Orion",
    "category": "Pistol",
    "rarity": "epic",
    "price": 95.0,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJKz2lu_XuWbwcuyMESA4Fdl-4nnpU7iQA3-kKn17jJk_PuibapuJeLdWGLFwL8i4eVsFiqxxUt34jmHnoysJ3qVOAYgCJZwQrRb5EPul4XlYvSiuVIHgy4Xvg"
  },
  {
    "id": "skin_19",
    "name": "AK-47 | Asiimov",
    "category": "Rifle",
    "rarity": "legendary",
    "price": 140.0,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0POlPPNSIeOaB2qf19F6ueZhW2e2wEt-t2jcytf6dymSO1JxA5oiRecLsRa5kIfkYr-241aLgotHz3-rkGoXuUp8oX57"
  },
  {
    "id": "skin_20",
    "name": "AWP | Asiimov",
    "category": "Sniper",
    "rarity": "legendary",
    "price": 175.0,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_jdk7uW-V6V-Kf2cGFidxOp_pewnF3nhxEt0sGnSzN76dH3GOg9xC8FyEORftRe-x9PuYurq71bW3d8UnjK-0H0YSTpMGQ"
  },
  {
    "id": "skin_21",
    "name": "M4A4 | The Emperor",
    "category": "Rifle",
    "rarity": "legendary",
    "price": 230.0,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwiVI0P_6afBSJf2DC3Wf09F6ueZhW2exwBh_6m3dnt36InjDPQ4oXJt1TbJeshW_mtfjN-vrsgaKiokWy333kGoXuRj4z9Nd"
  },
  {
    "id": "skin_22",
    "name": "USP-S | Kill Confirmed",
    "category": "Pistol",
    "rarity": "legendary",
    "price": 290.0,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLkjYbf7itX6vytbbZSI-WsG3SA_uV_vO1WTCa9kxQ1vjiBpYPwJiPTcFB2Xpp5TO5cskG9lYCxZu_jsVCL3o4Xnij23ClO5ik9tegFA_It8qHJz1aWe-uc160"
  },
  {
    "id": "skin_23",
    "name": "Desert Eagle | Printstream",
    "category": "Pistol",
    "rarity": "legendary",
    "price": 340.0,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL1m5fn8Sdk7OeRbKFsJ8-DHG6e1f1iouRoQha_nBovp3OGmdeqInyVP1V0XsYlRbEI50a5wNyzZr605AyI3t5MmCSohylAuC89_a9cBoMY9UkV"
  },
  {
    "id": "skin_24",
    "name": "M4A1-S | Printstream",
    "category": "Rifle",
    "rarity": "legendary",
    "price": 450.0,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwjFS4_ega6F_H_OGMWrEwL9lj_F7Rienhgk1tjyIpYPwJiPTcAAoCpsiEO5ZsUbpm9C2Zuni4VHW3o5EzSX62HxP7Sg96-hWVqYi_6TJz1aW0nxrkGs"
  },
  {
    "id": "skin_25",
    "name": "Karambit | Doppler",
    "category": "Knife",
    "rarity": "mythic",
    "price": 680.0,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Q7uCvZaZkNM-SA1iSze91u_FsTju_qhAmoT-Jn4bjJC_4Ml93UtZuRLQPsBawkNfiMbnl5AKMiopCnin7iCJBv31j4rkBBKEg-6zUjV3GY6p9v8dpLWT3Fg"
  },
  {
    "id": "skin_26",
    "name": "Butterfly Knife | Slaughter",
    "category": "Knife",
    "rarity": "mythic",
    "price": 850.0,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Z-ua6bbZrLOmsD2qv2-t0ouBWQyC0nQlp4G_dmdauIC_DPQBzDpclRLINsEXsx92yP7jq7gXd2t1NzCT3iCwc6TErvbhfNpboFw"
  },
  {
    "id": "skin_27",
    "name": "M9 Bayonet | Marble Fade",
    "category": "Knife",
    "rarity": "mythic",
    "price": 1150.0,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Wts2sab1iLvWHMWad_uN3ouNlSha1lBkijDGMnYftb3OTbVRyD8Z1RrNctkS6kobkZLzi7gTW2NpFxH33hi9Nuno65uxXAqs7uvqA7lyFHH4"
  },
  {
    "id": "skin_28",
    "name": "Sport Gloves | Vice",
    "category": "Gloves",
    "rarity": "mythic",
    "price": 1450.0,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk5UvzWCL2kpn2-DFk_OKherB0H_KfG2Kv0ed4u95lRi67gVNx4T-Bw434IHyVb1QlAsd1FOUDthG4xNznMu3m4QXXg90Wzn_33C1I8G81tLaDi_rK"
  },
  {
    "id": "skin_29",
    "name": "Specialist Gloves | Crimson Web",
    "category": "Gloves",
    "rarity": "mythic",
    "price": 1850.0,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk71ruQBH4jYLf-i5U-fe9V7d9JfOaD2uZ0vpJp-RrXBahkBkYvzSCkpu3JyiSbAQkC8d1E7YJtEXtkIazMruz4lOP3dpGmCyt23hA731v4LkKAL1lpPOyoS0Ibw"
  },
  {
    "id": "skin_30",
    "name": "Butterfly Knife | Fade",
    "category": "Knife",
    "rarity": "ancient",
    "price": 2600.0,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL6kJ_m-B1Z-ua6bbZrLOmsD2avx-9ytd5lRi67gVNwsDvSwtqqc3iXZg4kCZYjReYLtRbum9XgYuvm5wbWjtgUzCn3iSsf8G81tFEeH9rw"
  },
  {
    "id": "skin_31",
    "name": "M4A4 | Howl",
    "category": "Rifle",
    "rarity": "ancient",
    "price": 3500.0,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyL8ypexwiFO0P_6afVSKP-EAm6extF6ueZhW2exwkl2tmTXwt39eCiUPQR2DMN4TOVetUK8xoLgM-K341eM2otDnC6okGoXufBz_TAB"
  },
  {
    "id": "skin_32",
    "name": "AWP | Dragon Lore",
    "category": "Sniper",
    "rarity": "ancient",
    "price": 4950.0,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_jdk4veqYaF7IfysCnWRxuF4j-B-Xxa_nBovp3Pdwtj9cC_GaAd0DZdwQu9fuhS4kNy0NePntVTbjYpCyyT_3CgY5i9j_a9cBkcCWUKV"
  }
];

// Default starter inventory for players
const DEFAULT_USER_INVENTORY = [
  { ...ITEM_CATALOG.find(i => i.name === 'P250 | Sand Dune'), instanceId: 'inst_1' },
  { ...ITEM_CATALOG.find(i => i.name === 'Glock-18 | High Beam'), instanceId: 'inst_2' },
  { ...ITEM_CATALOG.find(i => i.name === 'USP-S | Lead Conduit'), instanceId: 'inst_3' },
  { ...ITEM_CATALOG.find(i => i.name === 'AK-47 | Slate'), instanceId: 'inst_4' },
  { ...ITEM_CATALOG.find(i => i.name === 'M4A4 | Evil Daimyo'), instanceId: 'inst_5' },
  { ...ITEM_CATALOG.find(i => i.name === 'AK-47 | Redline'), instanceId: 'inst_6' },
  { ...ITEM_CATALOG.find(i => i.name === 'AWP | Neo-Noir'), instanceId: 'inst_7' }
];
