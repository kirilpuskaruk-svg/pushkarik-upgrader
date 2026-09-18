/**
 * UPGRADER DEMO - Catalog with FULL CS2 Skins, Knives, Gloves & Agents
 * 100% DEMO - NO REAL MONEY - NO GAMBLING
 */

const RARITIES = {
  "common": {
    "name": "Армійське",
    "color": "#4b69ff",
    "glow": "rgba(75, 105, 255, 0.25)",
    "border": "#4b69ff"
  },
  "rare": {
    "name": "Заборонене",
    "color": "#8847ff",
    "glow": "rgba(136, 71, 255, 0.35)",
    "border": "#8847ff"
  },
  "epic": {
    "name": "Засекречене",
    "color": "#d32ce6",
    "glow": "rgba(211, 44, 230, 0.5)",
    "border": "#d32ce6"
  },
  "legendary": {
    "name": "Таємне",
    "color": "#eb4b4b",
    "glow": "rgba(235, 75, 75, 0.6)",
    "border": "#eb4b4b"
  },
  "mythic": {
    "name": "Надзвичайне (★)",
    "color": "#ffd700",
    "glow": "rgba(255, 215, 0, 0.7)",
    "border": "#ffd700"
  },
  "ancient": {
    "name": "Контрабанда / Grail",
    "color": "#ffaa00",
    "glow": "rgba(255, 170, 0, 0.8)",
    "border": "#ffaa00"
  }
};

let ITEM_CATALOG = [
  {
    "id": "agent_1",
    "name": "Sir Bloody Miami Darryl | The Professionals",
    "category": "Agent",
    "rarity": "legendary",
    "price": 88,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIa-2lmxU-LR0dnuNm6E8Vl45Iv181z1fgn8oYby8iRe_OGnZ6psLM-FD3WWj-gn47Q-GH7qxkhwsWjWyN6pJynGZld0CJR3QOdbtRa4lIGxY7_g7wfAy9USZdxTISw"
  },
  {
    "id": "agent_2",
    "name": "Special Agent Ava | FBI Special Agent",
    "category": "Agent",
    "rarity": "legendary",
    "price": 14.5,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIa-2lmxU-LR0dnuNm6E8Vl45Iv181z1fh7lk6nm_ytk-fO8YaVjNPLdXz6TkLdw5LY4Hnmwl0wktj7dn4r9I3OWPFApC5F1QeAO5xi4lIDiM_SiuVKk3V4ZcQ"
  },
  {
    "id": "agent_3",
    "name": "Cmdr. Mae 'Dead Cold' Jamison | SWAT",
    "category": "Agent",
    "rarity": "legendary",
    "price": 11.8,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIa-2lmxU-LR0dnuNm6E8Vl45Iv181z1fh7lk6nz6iNP0OSveq1sLuSWQDGVlbx34-Q8HC3nk012tWzTzY79JHiQOgYpW8B3EeYN40HtxtzlNuz8p1uJLMIs6sE"
  },
  {
    "id": "agent_4",
    "name": "Bloody Darryl The Strapped | The Professionals",
    "category": "Agent",
    "rarity": "epic",
    "price": 22,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIa-2lmxU-LR0dnuNm6E8Vl45Iv181z1fgn8oYby8iRe_OGnZ6psLM-FD3WWlKAhtLhqHXDilxgm4z7dztesJH2SbgApCMchFrQNsRSxw4XhYeK0swbYlcsbmucxTysR"
  },
  {
    "id": "agent_5",
    "name": "Safecracker Voltzmann | The Professionals",
    "category": "Agent",
    "rarity": "epic",
    "price": 16.5,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIa-2lmxU-LR0dnuNm6E8Vl45Iv181z1fgn8oYby8iRe_OGnZ6psLM-FD3WXj7536LVoFivmkEghsWXQmd37IniRPwUoCMFwEeAItxCwkdXvNr624wXAy9USEc8H9qQ"
  },
  {
    "id": "agent_6",
    "name": "1st Lieutenant Farlow | SWAT",
    "category": "Agent",
    "rarity": "epic",
    "price": 8.2,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIa-2lmxU-LR0dnuNm6E8Vl45Iv181z1fh7lk6nz6iNP0OSveq1sLuSVQGLFx7h0tbU6GHG1lERz62WEm9j6cimebgB0WZd4Ee4Ks0a-lNbjZrj8p1uJLRQDiME"
  },
  {
    "id": "agent_7",
    "name": "Rezan the Redshirt | Sabre",
    "category": "Agent",
    "rarity": "epic",
    "price": 6.5,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIa-2lmxU-LR0dnuNm6E8Vl45Iv181z1fgn8oZTh8Sla4c24abZkIf6HBSnClrkg5eBoGSvikU915G_dyo2vcimTOFAoX8cmR7MDsBS_m4G2Zui2-UWA3FkeyBmz"
  },
  {
    "id": "agent_8",
    "name": "'Two Times' McCoy | TACP Cavalry",
    "category": "Agent",
    "rarity": "epic",
    "price": 9.5,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIa-2lmxU-LR0dnuNm6E8Vl45Iv181z1fh7lk6nz6XRk-fO8YaVjNPzdCGbJxb1zs-JvGCrql0h3tm7cyov_JS-XblImDcAhQe8OtBK4k4bgZPSiuVIHzmbjrQ"
  },
  {
    "id": "agent_9",
    "name": "John 'Van Healen' Kask | SWAT",
    "category": "Agent",
    "rarity": "rare",
    "price": 4.8,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIa-2lmxU-LR0dnuNm6E8Vl45Iv181z1fh7lk6nz6iNP0OSveq1sLuSUQDLIle0jtOM-SXm2xBkjsW_dyImhc3iWOgcmAsR0TLVe4BjrkIWzN-P8p1uJ4p5BSY8"
  },
  {
    "id": "agent_10",
    "name": "Sergeant Bombson | SWAT",
    "category": "Agent",
    "rarity": "rare",
    "price": 3.9,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIa-2lmxU-LR0dnuNm6E8Vl45Iv181z1fh7lk6nz6iNP0OSveq1sLuSaQD6Umbp15-RtHX21kxl-sG-Gy9f6ci2XPA8lDMAiTbJc5BfuwNXgYbn8p1uJ3rbO8bk"
  },
  {
    "id": "agent_11",
    "name": "'Blueberries' Buckshot | NSWC SEAL",
    "category": "Agent",
    "rarity": "rare",
    "price": 4.2,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIa-2lmxU-LR0dnuNm6E8Vl45Iv181z1fh7lk6nz6XRk-fO8YaVjNPrdXWLElL5ytbBsTXrqzUxzsWmHzN-gI3-TbwQmC5pzQLELsUbrx9bmP_SiuVJe8Pfo4Q"
  },
  {
    "id": "agent_12",
    "name": "Bio-Haz Specialist | SWAT",
    "category": "Agent",
    "rarity": "common",
    "price": 3.1,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIa-2lmxU-LR0dnuNm6E8Vl45Iv181z1fh7lk6nz6iNP0OSveq1sLuSbQDPGkO0i4bE4THq1xRh3sjuEz9muJX7EZlIiC8RyQbIPsBPtk9fmNrj8p1uJwRLd8H0"
  },
  {
    "id": "agent_13",
    "name": "Chem-Haz Specialist | SWAT",
    "category": "Agent",
    "rarity": "common",
    "price": 2.8,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIa-2lmxU-LR0dnuNm6E8Vl45Iv181z1fh7lk6nz6iNP0OSveq1sLuSZQGKRmOpyseJsF3rkzR4ht2_TwtugcH7DbAQgW5VyFLIDuxnqmtPiNb78p1uJZinYneA"
  },
  {
    "id": "skin_14",
    "name": "★ Hand Wraps | Spruce DDPAT",
    "category": "Gloves",
    "rarity": "mythic",
    "price": 800,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu4vx603vRA_Olpfu-TVJ7uK9V6xsLvSEHGaA_u13ve5WSDu2jCIrujqNjsH_InuUaQQmDJd2Fu4NshO7kIGyYeu24Affg98UxCX_iXhJ5i465bwHT-N7rXbV3WG0"
  },
  {
    "id": "skin_15",
    "name": "★ Hand Wraps | Desert Shamagh",
    "category": "Gloves",
    "rarity": "mythic",
    "price": 825,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu4vx603vRA_Olpfu-TVJ7uK9V6xsLvSEHGaA_uh3svNgTBa7mggpty6RlYDtKRTILFd-XccfGb5d6lSmwdS1Zrzr4Q3Ygo5Ayiur23lL5idr5eZQBapzqPDRignHY-U058QHLOHnE0oCUw1MCg"
  },
  {
    "id": "skin_16",
    "name": "★ Hand Wraps | Badlands",
    "category": "Gloves",
    "rarity": "mythic",
    "price": 850,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu4vx603vRA_Olpfu-TVJ7uK9V6xsLvSEHGaA_uh3svNgTBa8hxwptDi6mY70LhTLN1F4ToxyQuIK5EPqkobkZrjm5lGI2NoTni-vhnwd5iZp4-YHAqJxq6DRhlzIL_Rjthe3KNwq"
  },
  {
    "id": "skin_17",
    "name": "★ Hand Wraps | CAUTION!",
    "category": "Gloves",
    "rarity": "mythic",
    "price": 875,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu4vx603vRA_Olpfu-TVJ7uK9V6xsLvSEHGaA_uJzsfVhSjuqqh4mpimMlYHGLSLANkI-CcBxQeIMtEHsl4CyNOjm4QDa3dgTniWvjnhJ7Hk54bsEV_Ak-KWE3BaBb-Pt8HWajg"
  },
  {
    "id": "skin_18",
    "name": "★ Hand Wraps | Duct Tape",
    "category": "Gloves",
    "rarity": "mythic",
    "price": 900,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu4vx603vRA_Olpfu-TVJ7uK9V6xsLvSEHGaA_uJzsfVhSjuqqhkysCmRm5_8HifOOV5kFJF5R7IIskW_kIXnNriz7w3eg4hMzCX-2nxP6SZo4u0LBKAi-aXV2V7fcepqgxTHW6A"
  },
  {
    "id": "skin_19",
    "name": "★ Hand Wraps | Cobalt Skulls",
    "category": "Gloves",
    "rarity": "mythic",
    "price": 925,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu4vx603vRA_Olpfu-TVJ7uK9V6xsLvSEHGaA_uJzsfVhSjuqqhsmsS-MmbD7LT7CAUV7T84sBohW60fg1srnZb6zsw2Ng41MmST43C1L7is9574CBKIh_q2Big_IMOdutcNRd_iuU13QD7PQAmaY"
  },
  {
    "id": "skin_20",
    "name": "★ Hand Wraps | Overprint",
    "category": "Gloves",
    "rarity": "mythic",
    "price": 950,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu4vx603vRA_Olpfu-TVJ7uK9V6xsLvSEHGaA_uJzsfVhSjuqqhsmsS-MmbD-JCTKO0JiU8EfF7tP53_ky4O_c_Ti4wTe3t4Uy3j6jSxM5ic-4usBA6Mj-qTejAzJMbc14MRWd_v0SE-PRlxR734mHNkv"
  },
  {
    "id": "skin_21",
    "name": "★ Hand Wraps | Giraffe",
    "category": "Gloves",
    "rarity": "mythic",
    "price": 975,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu4vx603vRA_Olpfu-TVJ7uK9V6xsLvSEHGaA_uJzsfVhSjuqqhsmsS-MmbD-KDnGOFB1Zc4pEr9OrBm6w9bgM-Pi4wLe34tNnCT3jCxJ53s_6rsBUqQkq63V2wnBZOJo55YdZKHw2FL19Wg"
  },
  {
    "id": "skin_22",
    "name": "★ Hand Wraps | Arboreal",
    "category": "Gloves",
    "rarity": "mythic",
    "price": 1000,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu4vx603vRA_Olpfu-TVJ7uK9V6xsLvSEHGaA_uJzsfVhSjuqqhsmsS-MmbD-My7CMGlzW88vKrtT5Uj8jIblMbnksQfb2IlAzXqojCpP6ylp67kLAKBz_6aFjFnCN-I66ZQHdv-5DUPZjQpqjqQ"
  },
  {
    "id": "skin_23",
    "name": "★ Hand Wraps | Leather",
    "category": "Gloves",
    "rarity": "mythic",
    "price": 1025,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu4vx603vRA_Olpfu-TVJ7uK9V6xsLvSEHGaA_uJzsfVhSjuqqhEutDWR1NiodnmUPFNxX5B3TOFcuhfqktPvYe_h4AHWjolNnHn3iC1Puiw-sL0cEf1y0Sy-Ca0"
  },
  {
    "id": "skin_24",
    "name": "★ Hand Wraps | Constrictor",
    "category": "Gloves",
    "rarity": "mythic",
    "price": 1050,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu4vx603vRA_Olpfu-TVJ7uK9V6xsLvSEHGaA_uJzsfVhSjuqqg4psjaAiYTwLxTILFd-XccfGb5d6lSmlYDiY-_r7gzc2IJGmX6t3CMb6iY5te0BBKt0-qDVhwyXYrU_6MQDIuHnE0r2o5Rb7g"
  },
  {
    "id": "skin_25",
    "name": "★ Hand Wraps | Slaughter",
    "category": "Gloves",
    "rarity": "mythic",
    "price": 1075,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu4vx603vRA_Olpfu-TVJ7uK9V6xsLvSEHGaA_vxztN56QyimkhUzti-6lob-KT-Jb1UjX5t0ROIN5xW9l9e2ZOmw5QWLi41Fmy6r3Sgb7C1o5etUBfcgqbqX0V-0bsdMFQ"
  },
  {
    "id": "skin_26",
    "name": "★ Moto Gloves | Eclipse",
    "category": "Gloves",
    "rarity": "mythic",
    "price": 1100,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu4r7_lb1QgTykpPf-i5U-fe9V6liNP-BDX6TzetJsuB6RiqMlxEmsDa6lob-KT-JaQMpDpFzFOdY4EO8lIDnMLjr5ALZjN1Dnyj7iyhAvXo55ucKWadx87qX0V_LSR8vSA"
  },
  {
    "id": "skin_27",
    "name": "★ Moto Gloves | Turtle",
    "category": "Gloves",
    "rarity": "mythic",
    "price": 1125,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu4r7_lb1QgTykpPf-i5U-fe9V6liNP-BDX6TzetJsuB6RiqMkg8itjO6lZ34LyzCAVp5Xco0W7VftBjqxILkZbvi4FfYitpEynj6jSgc5i4_tegLV_F0q6SFhwDJMuUjoc5UdYAe6j0"
  },
  {
    "id": "skin_28",
    "name": "★ Moto Gloves | Blood Pressure",
    "category": "Gloves",
    "rarity": "mythic",
    "price": 1150,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu4r7_lb1QgTykpPf-i5U-fe9V6liNP-BDX6TzetJs-B7TSa9kxQlti-6iIr9HifOOV5kFJp2TeYOsxWxm9OyM7zl5AKIio0XyyiojiJA6C866-YFV6oi_6GBhwHfcepqnQk3Qfo"
  },
  {
    "id": "skin_29",
    "name": "★ Moto Gloves | Finish Line",
    "category": "Gloves",
    "rarity": "mythic",
    "price": 1175,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu4r7_lb1QgTykpPf-i5U-fe9V6liNP-BDX6TzetJs-lsTCK2hyIhvzyCpY31NC74OUR1X8wfGb5d6lSmkNW1Y-m0sgTciIxCz376i3lN63lu67wHV6Fx-qaCi1nAZbJr4MQBIeHnE0rhxc4-zg"
  },
  {
    "id": "skin_30",
    "name": "★ Moto Gloves | POW!",
    "category": "Gloves",
    "rarity": "mythic",
    "price": 1200,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu4r7_lb1QgTykpPf-i5U-fe9V6liNP-BDX6TzetJs-lmTCaMlxIovgKJk4jxNWXBPAZ2CpYmTOAO4UWwltOxP-3qswPdgopMzXiviSwavytpsO4FUvEh5OSJ2LE4Jnt4"
  },
  {
    "id": "skin_31",
    "name": "★ Moto Gloves | 3rd Commando Company",
    "category": "Gloves",
    "rarity": "mythic",
    "price": 1225,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu4r7_lb1QgTykpPf-i5U-fe9V6liNP-BDX6TzetJs-5kQii9kRIYuC6OpYPwJiPTcAZyDMd2F-YIu0a4ktTjP--35Vfb3oMTyy_-iCtM7Hpq5elTBaYirKTJz1aWk_tQEIo"
  },
  {
    "id": "skin_32",
    "name": "★ Moto Gloves | Spearmint",
    "category": "Gloves",
    "rarity": "mythic",
    "price": 1250,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu4r7_lb1QgTykpPf-i5U-fe9V6liNP-BDX6TzetJvehnWxanhxQmvTqJn7D1KCzPKhgnW5UmRO4DsxXrlYbhPurmtAXai98UzS73in5I6S5p4OsAU_Zx-KHWkUifZsxBQgc2"
  },
  {
    "id": "skin_33",
    "name": "★ Moto Gloves | Boom!",
    "category": "Gloves",
    "rarity": "mythic",
    "price": 1275,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu4r7_lb1QgTykpPf-i5U-fe9V6liNP-BDX6TzetJve5nQBaxmhIqjDGMnYftb3ufaQNxA5MiEeVb5kW5ldPiZuPj5lOKjt9BxCutiSlO5ys5sL1UUPU7uvqAf72SBgc"
  },
  {
    "id": "skin_34",
    "name": "★ Moto Gloves | Smoke Out",
    "category": "Gloves",
    "rarity": "mythic",
    "price": 1300,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu4r7_lb1QgTykpPf-i5U-fe9V6liNP-BDX6TzetJo-xmRCyMmRQguynLztircXjCaAAkDZp0TO4OsRW8xtznP-7mswXYj4wTnyysiHkc5n5p5PFCD_SXL_AlqA"
  },
  {
    "id": "skin_35",
    "name": "★ Moto Gloves | Cool Mint",
    "category": "Gloves",
    "rarity": "mythic",
    "price": 450,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu4r7_lb1QgTykpPf-i5U-fe9V6liNP-BDX6TzetJpPNgTie0mRgYsTGQn7D1KCzPKhgiXMZwRuNe5xS5wYLvY-K3s1GN344Wz3ioiypK6X1p4e1WUKZ0q6WCkUifZln3nIr8"
  },
  {
    "id": "skin_36",
    "name": "★ Moto Gloves | Polygon",
    "category": "Gloves",
    "rarity": "mythic",
    "price": 475,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu4r7_lb1QgTykpPf-i5U-fe9V6liNP-BDX6TzetJpPNgSDu6kSIlvyiApYPwJiPTcA92A5QlFu4N4ES4ktblMrvg5lSN34hEmHitinhLvHo64uhUUvVwqPDJz1aWhdr_Brk"
  },
  {
    "id": "skin_37",
    "name": "★ Moto Gloves | Transport",
    "category": "Gloves",
    "rarity": "mythic",
    "price": 500,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu4r7_lb1QgTykpPf-i5U-fe9V6liNP-BDX6TzetJqeRlQyakqh4mvjK6lob-KT-JbwZzCsR0RrYK4ETrwIbkYe_l4gSM2YNEniv73XxKvyhj4u0DVKMi_rqX0V9cNOIfoA"
  },
  {
    "id": "skin_38",
    "name": "★ Driver Gloves | Brocade Crane",
    "category": "Gloves",
    "rarity": "mythic",
    "price": 525,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5T441rsfhr9kYDl7h1c4_24bZtpMvmFC3Wvw_x5s-BtShawhxwptgKXn4vGLSLANkI-XMN2Qu4OsEG6lYK2M-OwtgPf2IMRzXio3yMY7yhptbxRAKIkq_bVhhaBb-OYO4AFQA"
  },
  {
    "id": "skin_39",
    "name": "★ Driver Gloves | Brocade Flowers",
    "category": "Gloves",
    "rarity": "mythic",
    "price": 550,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5T441rsfhr9kYDl7h1c4_24bZtpMvmFC3Wvw_x5s-BtSha1mRIwti-6iIr9HifOOV5kFJJ5TeMK5xTsltSyM-m07wLW2Y4Uy32ohiJKuy9r4L1UWKAj-qGF3gzfcepq2gO2jDs"
  },
  {
    "id": "skin_40",
    "name": "★ Driver Gloves | Dragon Fists",
    "category": "Gloves",
    "rarity": "mythic",
    "price": 575,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5T441rsfhr9kYDl7h1c4_24bZtpMvmFC3Wvxfx3t-5ncDqwlBEijC-AnrD1KCzPKhgkCZdwTeIL4ES5wdXjPrm251Pdi98QzST3jy0d6nxp4e5QAKsk_q3RkUifZohUdPsK"
  },
  {
    "id": "skin_41",
    "name": "★ Driver Gloves | Garden",
    "category": "Gloves",
    "rarity": "mythic",
    "price": 600,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5T441rsfhr9kYDl7h1c4_24bZtpMvmFC3WvxON0ou5gSyyhkBkYtTGKjYrrMhTTO1d8Zc4pEr9OrES-w9exZuzrsgyLi4lEzij2in9KvHpj6u9XU6J2_aGDjwzCY709t8YdZKHwRXCqB8U"
  },
  {
    "id": "skin_42",
    "name": "★ Driver Gloves | Hand Sweaters",
    "category": "Gloves",
    "rarity": "mythic",
    "price": 625,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5T441rsfhr9kYDl7h1c4_24bZtpMvmFC3WvyuB_pN5oXS6qmRgYtC-An4HGLSLANkI-CZJzROEM4xa7lYbgM7i07lOP3okXmCn4iypM7idt4udXU6p0rqHS3haBb-PCGCVNWw"
  },
  {
    "id": "skin_43",
    "name": "★ Driver Gloves | Plum Quill",
    "category": "Gloves",
    "rarity": "mythic",
    "price": 650,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5T441rsfhr9kYDl7h1c4_24bZtpMvmFC3Wvzv1iouhqRxajgA83vzi6lob-KT-JawEjXMZyQuQMs0Xpl4fvMrvn4FOI2N5Dnn78jnxI5yZj5-tXWfEs8rqX0V_DSgKUxA"
  },
  {
    "id": "skin_44",
    "name": "★ Driver Gloves | Seigaiha",
    "category": "Gloves",
    "rarity": "mythic",
    "price": 675,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5T441rsfhr9kYDl7h1c4_24bZtpMvmFC3Wv0u13vO1mXxa-kAkmvzGMmbD7LT7CAVp5Xco0W-dZuhe6wNDuP-q05g2NiYlFmSn5iS1N7yxj4LxUWPJx-6yCiFqUNOIjoc5UtEcI9GU"
  },
  {
    "id": "skin_45",
    "name": "★ Driver Gloves | Wave Chaser",
    "category": "Gloves",
    "rarity": "mythic",
    "price": 700,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5T441rsfhr9kYDl7h1c4_24bZtpMvmFC3Wv0ud6u95tXSi0mhMYpDWMjorGLSLANkI-ApsmQrFbtkPux4bgMuvg7gzWjI0Xnyz-23lI6i5s4bpWUqMl-6PQ2xaBb-Mdlpgj5g"
  },
  {
    "id": "skin_46",
    "name": "★ Driver Gloves | Lunar Weave",
    "category": "Gloves",
    "rarity": "mythic",
    "price": 725,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5T441rsfhr9kYDl7h1I4_utY5tvLPGQBVicyOl-pK8xTizrzER1t2rczNj9JSqRZg92CZZ2RrRetBi7kYDhZeLl7wDajo9C02yg2YX5gL0s"
  },
  {
    "id": "skin_47",
    "name": "★ Driver Gloves | Snow Leopard",
    "category": "Gloves",
    "rarity": "mythic",
    "price": 750,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5T441rsfhr9kYDl7h1I4_utY5tnIfeGD3Wv1uZ_pORWQyC0nQlp4TnUw9f6J3PCOw4oW8ZxRuEOshK8l9fgZbnqswHX3owXmSisjCIfuzErvbiEoDwfJQ"
  },
  {
    "id": "skin_48",
    "name": "★ Driver Gloves | Queen Jaguar",
    "category": "Gloves",
    "rarity": "mythic",
    "price": 775,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5T441rsfhr9kYDl7h1I4_utY5tnIfeGD3Wv2Ot6vO5-cCW6khUz_WSHm4qteC2XOg4jDcN0EOZbthDsxoDnN7m24laI3d8QnCv6hn5PvHx1o7FVsUpsiR4"
  },
  {
    "id": "skin_49",
    "name": "★ Driver Gloves | Convoy",
    "category": "Gloves",
    "rarity": "mythic",
    "price": 800,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5T441rsfhr9kYDl7h1I4_utY5tgKfyaGmaC2NF6ueZhW2e1wER0smuGyd__dn6VOwd1A5JwQOFY5hi8ktKzNryx5wyPiYwTxX74kGoXue1G57tl"
  },
  {
    "id": "skin_50",
    "name": "★ Driver Gloves | Imperial Plaid",
    "category": "Gloves",
    "rarity": "mythic",
    "price": 825,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5T441rsfhr9kYDl7h1I4_utY5t9LPGaCliA1PxmvORWQyC0nQlp4W-Hw9-ocy2fbwB2X8YkFucCtRe4xNzhYrjl4Fff39lMyn78iiJLuzErvbgqDAMwGQ"
  },
  {
    "id": "skin_51",
    "name": "★ Driver Gloves | Crimson Weave",
    "category": "Gloves",
    "rarity": "mythic",
    "price": 850,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5T441rsfhr9kYDl7h1I4_utY5t_JfSsAm6Xyfo4trVoSnGxlh9x5DmEzt6rJS2RagYiA5siQ-MLthW9xtDlM7uxtFCNgpUFk3thcTnRAg"
  },
  {
    "id": "skin_52",
    "name": "★ Driver Gloves | Rezan the Red",
    "category": "Gloves",
    "rarity": "mythic",
    "price": 875,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5T441rsfhr9kYDl7h1I4_utY5t_JeqSAFicyOl-pK9sHnrhxx5wsm2Ezo39cXufbVdzD8ZzReILtRfqm9OyMbzjtlfdio5A02yg2fWAU4q4"
  },
  {
    "id": "skin_53",
    "name": "★ Driver Gloves | King Snake",
    "category": "Gloves",
    "rarity": "mythic",
    "price": 850,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5T441rsfhr9kYDl7h1I4_utY5t-LvGYC3SbyOBJp-lgWyyMmRQguynLz4r6Iy7EbFchApNyR-dbtEbuw4XkN7jq7gHdjtoQzi37hiwYvytvt_FCD_Ql24JgJg"
  },
  {
    "id": "skin_54",
    "name": "★ Driver Gloves | Diamondback",
    "category": "Gloves",
    "rarity": "mythic",
    "price": 925,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5T441rsfhr9kYDl7h1I4_utY5t-LvGYC3SbyOBJqeRlQyakqhEutDWR1N77ICqXZw4iApJ1ReRb5Bi-k4fjYb7mtgPdgooXyyusiS9A7Shv674cEf1yI93CpRI"
  },
  {
    "id": "skin_55",
    "name": "★ Driver Gloves | Overtake",
    "category": "Gloves",
    "rarity": "mythic",
    "price": 950,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5T441rsfhr9kYDl7h1I4_utY5t-NPmHDW-VxdF0vOBqRBa8hxwptDi6lob-KT-JOwYkXppzQO4OsRbqltfiMOvm41TYi44XySqqj35OvS4_57oKA6cl_LqX0V9d-bhOMA"
  },
  {
    "id": "skin_56",
    "name": "★ Driver Gloves | Black Tie",
    "category": "Gloves",
    "rarity": "mythic",
    "price": 975,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5T441rsfhr9kYDl7h1I4_utY5t-NPmHDW-VxdF0vOBqRBaknRQztgKJk4jxNWXBbwdxDcZwFrFY40XrktLgNr7q4AKM2owQmX6ojSpMuCo_tulQB6ss5OSJ2E_SKQx-"
  },
  {
    "id": "skin_57",
    "name": "★ Driver Gloves | Racing Green",
    "category": "Gloves",
    "rarity": "mythic",
    "price": 1000,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5T441rsfhr9kYDl7h1I4_utY5t-NPmHDW-VxdFxouRsQRa0hxg-jDGMnYftb3mXblQnWJclRuNYtETux9DlYr-wtVaK2IsTmCT-jC4Y6ihjtr0FUaA7uvqAQikoKDk"
  },
  {
    "id": "skin_58",
    "name": "★ Specialist Gloves | Lime Polycam",
    "category": "Gloves",
    "rarity": "mythic",
    "price": 1025,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk71ruQBH4jYLf-i5U-fe9V6NhL-aWMXSAxO1_se1gXD2MlB80py-EmZvGJjnCO1hPVssnHaMUtRTqwNK2Nrzr71aLi4sUzS_8iCJMuic54eoFVvVw-fGGiwySY7Q1t45DeqjW0uKN1w"
  },
  {
    "id": "skin_59",
    "name": "★ Specialist Gloves | Cloud Chaser",
    "category": "Gloves",
    "rarity": "mythic",
    "price": 1050,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk71ruQBH4jYLf-i5U-fe9V6NhL-aWMXSAxO1_se1gXD2MkQ8mtDKLpY31NC74Ml93UtZuQe4L40bsl9HgM-Lr5lffgtgWnCT63H5O6XxqtehUVaIl-vCDjwiXMKp9v8dT8uAEag"
  },
  {
    "id": "skin_60",
    "name": "★ Specialist Gloves | Blackbook",
    "category": "Gloves",
    "rarity": "mythic",
    "price": 1075,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk71ruQBH4jYLf-i5U-fe9V6NhL-aWMXSAxO1_se1gXD2Mkg8mtTuMjobGIyfGPV1PVssnHaMUthC9l9e2Mei25wTajN5EziT_2CodvSxs5ugBWKp2rvDX2Q6QMOc8tI5DeqjzpbB7FA"
  },
  {
    "id": "skin_61",
    "name": "★ Specialist Gloves | Chocolate Chesterfield",
    "category": "Gloves",
    "rarity": "mythic",
    "price": 1100,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk71ruQBH4jYLf-i5U-fe9V6NhL-aWMXSAxO1_se1gXD2MhAguvymAnrD7LSrENWl8U8UoAfkNu0Ttx4CxP-zr4wDbjN4XmX79j3xM7SdisbkLBPB0q6LWiwnHM7Zs_9Bdc2KEwswI"
  },
  {
    "id": "skin_62",
    "name": "★ Specialist Gloves | Pillow Punchers",
    "category": "Gloves",
    "rarity": "mythic",
    "price": 1125,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk71ruQBH4jYLf-i5U-fe9V6NhL-aWMXSAxO1_se1gXD2MhAguvymAnrDuKSLTO2l8U8UoAfkK5BKxkNyyZu7r4VGP3Y8UzSX_iC4av3trtbtWV_Vxq6SEh1mVN7c9_9Bdc6ulT-fJ"
  },
  {
    "id": "skin_63",
    "name": "★ Specialist Gloves | Sunburst",
    "category": "Gloves",
    "rarity": "mythic",
    "price": 1150,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk71ruQBH4jYLf-i5U-fe9V6NhL-aWMXSAxO1_se1gXD2MhggpsSiXiZvGMy7DAVp5Xco0W-VesRKwxtLvMbm07gLbiI1GmX33hywd7Hk45ewEAPIiqfXW2Q7FMLIjoc5U0NHpGGE"
  },
  {
    "id": "skin_64",
    "name": "★ Specialist Gloves | Big Swell",
    "category": "Gloves",
    "rarity": "mythic",
    "price": 1175,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk71ruQBH4jYLf-i5U-fe9V6NhL-aWMXSAxO1_se1gXD2MghwxtgKHlpr8HifOOV5kFJJyFOVZuhC8l9XjNL-3tgHcg41HzHr4hntBuntpse0LUvZwr_bX3QjfcepqIIhMOUI"
  },
  {
    "id": "skin_65",
    "name": "★ Specialist Gloves | Forest DDPAT",
    "category": "Gloves",
    "rarity": "mythic",
    "price": 1200,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk71ruQBH4jYLf-i5U-fe9V7d9JfOaD2uZ0vpJtOV5Tj2Mkg8itjO6mY70LhTLN1F4TowkQrFYshHsxNKyPu_ntQfYid9By3j-ii9I6StqsOlUV6Aj-aCF2guTL_RjtifunYRS"
  },
  {
    "id": "skin_66",
    "name": "★ Specialist Gloves | Emerald Web",
    "category": "Gloves",
    "rarity": "mythic",
    "price": 750,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk71ruQBH4jYLf-i5U-fe9V7d9JfOaD2uZ0vpJtexsXSi_kSIwtj-6lob-KT-Jbw4kA8d4QOBb5hnqmoHuMLmx4AWK341Bnyr93CxN6itjsb1XUfAgqLqX0V92--w69A"
  },
  {
    "id": "skin_67",
    "name": "★ Specialist Gloves | Fade",
    "category": "Gloves",
    "rarity": "mythic",
    "price": 620,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk71ruQBH4jYLf-i5U-fe9V7d9JfOaD2uZ0vpJtuBtSha_nBovp3PQy42sdX6eagIjW5AlQOVetBXuk92xNLvg4gOMjd5AmC2ointB53w__a9cBqntWBk3"
  },
  {
    "id": "skin_68",
    "name": "★ Specialist Gloves | Field Agent",
    "category": "Gloves",
    "rarity": "mythic",
    "price": 1275,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk71ruQBH4jYLf-i5U-fe9V7d9JfOaD2uZ0vpJtuNgcCW6khUz_TiHydigcXyXawRxX5QmQLQIsxC9kYfgN--w5QCLi4IRzyz42yofvCZ1o7FVbJfAqIA"
  },
  {
    "id": "skin_69",
    "name": "★ Specialist Gloves | Buckshot",
    "category": "Gloves",
    "rarity": "mythic",
    "price": 1300,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk71ruQBH4jYLf-i5U-fe9V7d9JfOaD2uZ0vpJtu57Sjqnqh81vCqLpYPwJiPTcFQhAsd5TOcDsxLqwN22ZrjqslDZg4gXnCj2jnlA7Sg54udWB_dz-qbJz1aWpqUo0Nk"
  },
  {
    "id": "skin_70",
    "name": "★ Specialist Gloves | Crimson Kimono",
    "category": "Gloves",
    "rarity": "mythic",
    "price": 1850,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk71ruQBH4jYLf-i5U-fe9V7d9JfOaD2uZ0vpJu-hkQCe8qhkusjCKlIvqHjnCOml8U8UoAfkItBLswdbuNbjr5FHdjNkUzSv73C1K5y46tu4EUvAg-6bU3FrBMOE4_9BdcyhkRns5"
  },
  {
    "id": "skin_71",
    "name": "★ Specialist Gloves | Marble Fade",
    "category": "Gloves",
    "rarity": "mythic",
    "price": 475,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk71ruQBH4jYLf-i5U-fe9V7d9JfOaD2uZ0vpJveB7TSW2qhsmtzi6lob-KT-JOlUhC8Z2QOUDsxa6xIe0N7nk5ALWjolMm3793SxAvX0_5-sBUaNz-rqX0V-xn3he8w"
  },
  {
    "id": "skin_72",
    "name": "★ Specialist Gloves | Foundation",
    "category": "Gloves",
    "rarity": "mythic",
    "price": 500,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk71ruQBH4jYLf-i5U-fe9V7d9JfOaD2uZ0vpJv_NoQS62qgovuimApYPwJiPTcFMgWJVwFLIPthDpkt3vN7ux5QTWitkTm3r5iiMc7nw6sukBBfV38vDJz1aWnrr9eTA"
  },
  {
    "id": "skin_73",
    "name": "★ Specialist Gloves | Lt. Commander",
    "category": "Gloves",
    "rarity": "mythic",
    "price": 525,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk71ruQBH4jYLf-i5U-fe9V7d9JfOaD2uZ0vpJouhqRDqygiIksjCKpYPwJiPTcFJzApV0F-cL5kHuk9CxP7u3sgDYgo1BzX76jixM7Cw-selXBacn-PHJz1aWiwi0X-Y"
  },
  {
    "id": "skin_74",
    "name": "★ Specialist Gloves | Tiger Strike",
    "category": "Gloves",
    "rarity": "mythic",
    "price": 550,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk71ruQBH4jYLf-i5U-fe9V7d9JfOaD2uZ0vpJpOhuSjuMmg8mvTqApYPwJiPTcAYkDMZ3EOUJ4Ra9w4W2NOyx4wGNjYtDy3763H4bvCY6t-sFUap3_KDJz1aW0GG4fIQ"
  },
  {
    "id": "skin_75",
    "name": "★ Specialist Gloves | Crimson Web",
    "category": "Gloves",
    "rarity": "mythic",
    "price": 575,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk71ruQBH4jYLf-i5U-fe9V7d9JfOaD2uZ0vpJp-RrXBahkBkYvzSCkpu3JyiSbAQkC8d1E7YJtEXtkIazMruz4lOP3dpGmCyt23hA731v4LkKAL1lpPOyoS0Ibw"
  },
  {
    "id": "skin_76",
    "name": "★ Specialist Gloves | Mogul",
    "category": "Gloves",
    "rarity": "mythic",
    "price": 600,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk71ruQBH4jYLf-i5U-fe9V7d9JfOaD2uZ0vpJp-hnWyyhnRg_jDGMnYftb3qWagQlX8EjF7YIuhK9m9XiNO2x7gOPjY5HzHj7iiwcv3xi4-pQAPc7uvqAbB4ER4o"
  },
  {
    "id": "skin_77",
    "name": "★ Sport Gloves | Violet Beadwork",
    "category": "Gloves",
    "rarity": "mythic",
    "price": 625,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk5UvzWCL2kpn2-DFk6P6hfqFSM-CcHHOvw-t3tPZmXSKMkRQmvjKLnpzGMT7VLlp1Zc4pEr9OrBWxxofvNOLitQKPid5Hznr-3C9JvHtu4uxTVKMlqaPQilrAM7Fr6cQdZKHwBJ-GjQo"
  },
  {
    "id": "skin_78",
    "name": "★ Sport Gloves | Frosty",
    "category": "Gloves",
    "rarity": "mythic",
    "price": 650,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk5UvzWCL2kpn2-DFk6P6hfqFSM-CcHHOvwu97v95-RienkA8YvzSCkpu3dXqfbA5zW5N0F-dcu0K8ldDnMuPk4wHdjN9EniWthn4av31v4eoHWL1lpPOyBkNpPQ"
  },
  {
    "id": "skin_79",
    "name": "★ Sport Gloves | Blaze",
    "category": "Gloves",
    "rarity": "mythic",
    "price": 675,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk5UvzWCL2kpn2-DFk6P6hfqFSM-CcHHOvx-J3veR6cCahlBMgtgKJk4jxNWWXblAgDJUiTeJZtBHpktDuY7m2sQPf2YNAxXn5iysf6Cc_67oGA6Ah5OSJ2AmILwG6"
  },
  {
    "id": "skin_80",
    "name": "★ Sport Gloves | Creme Pinstripe",
    "category": "Gloves",
    "rarity": "mythic",
    "price": 700,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk5UvzWCL2kpn2-DFk6P6hfqFSM-CcHHOv0ed4o_V7Rjm2qh8rsj6OpYPwJiPTcAdzW5V2E-4IsBnswNHuZbznsQfXg4NCny_4hnhOvS04suoDVvZx86zJz1aWnYsnB-o"
  },
  {
    "id": "skin_81",
    "name": "★ Sport Gloves | Red Racer",
    "category": "Gloves",
    "rarity": "mythic",
    "price": 725,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk5UvzWCL2kpn2-DFk6P6hfqFSM-CcHHOv0-91tfNWXSy3qhEutDWR1I77dC7GbQ4kWZNwEOJY5xLtwYHuN7yz7lPe2YgTniz2jn5Nv3lj5O0cEf1yHxfMKhM"
  },
  {
    "id": "skin_82",
    "name": "★ Sport Gloves | Ultra Violent",
    "category": "Gloves",
    "rarity": "mythic",
    "price": 750,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk5UvzWCL2kpn2-DFk6P6hfqFSM-CcHHOv1et1uN5uXSi3nBgppwKHiIb-KT_4Ml93UtZuTOcLtUW8lNDvZL634FfYi4pCyiX5iXka6Htr4uhQVqt3_vfRiAzDZap9v8fuC2Vr0A"
  },
  {
    "id": "skin_83",
    "name": "★ Sport Gloves | Occult",
    "category": "Gloves",
    "rarity": "mythic",
    "price": 775,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk5UvzWCL2kpn2-DFk6P6hfqFSM-CcHHOv1-t6puR9cDu2kSIrujqNjsGody2XPQVzWZslEe5euxS_lYC0Yu7l4wLfj99MmCv4jXka6Slp6-4ET-N7rUuG7GIq"
  },
  {
    "id": "skin_84",
    "name": "★ Sport Gloves | Omega",
    "category": "Gloves",
    "rarity": "mythic",
    "price": 800,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk5UvzWCL2kpn2-DFk_OKherB0H_KfD2Sb_vlzsuNgQS6MjBgrvzKSpYPwJiPTcFAkC5UiRrRZ5BO9ktDnM-q37wCMjN5GxCqvhngb6Chj6u0CVvAj-6fJz1aW3nluLgw"
  },
  {
    "id": "skin_85",
    "name": "★ Sport Gloves | Vice",
    "category": "Gloves",
    "rarity": "mythic",
    "price": 2200,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk5UvzWCL2kpn2-DFk_OKherB0H_KfG2Kv0ed4u95lRi67gVNx4T-Bw434IHyVb1QlAsd1FOUDthG4xNznMu3m4QXXg90Wzn_33C1I8G81tLaDi_rK"
  },
  {
    "id": "skin_86",
    "name": "★ Sport Gloves | Hedge Maze",
    "category": "Gloves",
    "rarity": "mythic",
    "price": 2800,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk5UvzWCL2kpn2-DFk_OKherB0H_eBC2Ke_uJ_t-l9AX21whwi4Gndnov9JH_FblMlCJYjRbFZtkWww4HnNbjr7wWN39gUmH7gznQeohQBtY8"
  },
  {
    "id": "skin_87",
    "name": "★ Sport Gloves | Scarlet Shamagh",
    "category": "Gloves",
    "rarity": "mythic",
    "price": 875,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk5UvzWCL2kpn2-DFk_OKherB0H_icG2mU0vp5v_VhcDu2kSIrujqNjsGqIC-SalIhW8B2Q7MNs0G9x4W0NeKwtALa3ohEyi2oiCpI5yZo4OcFT-N7rZxgqiT0"
  },
  {
    "id": "skin_88",
    "name": "★ Sport Gloves | Big Game",
    "category": "Gloves",
    "rarity": "mythic",
    "price": 900,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk5UvzWCL2kpn2-DFk_OKherB0H_iGAHOV09F6ueZhW2fil0tx4T7RnouodXjCaAMjWJshQOAOsEG8l9bgMrvr5QfXjotHyyWtkGoXucEGPk8i"
  },
  {
    "id": "skin_89",
    "name": "★ Sport Gloves | Nocts",
    "category": "Gloves",
    "rarity": "mythic",
    "price": 925,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk5UvzWCL2kpn2-DFk_OKherB0H_qSCXKR09F6ueZhW2fqlBly4GWGm9ivcXjFPFImWJQhEeRc5EXqkNGyMOzm51fY3dlAxCr9kGoXuaq1SOh9"
  },
  {
    "id": "skin_90",
    "name": "★ Sport Gloves | Superconductor",
    "category": "Gloves",
    "rarity": "mythic",
    "price": 950,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk5UvzWCL2kpn2-DFk_OKherB0H_yaCW-E_ux6peRWQyC0nQlp4jjRyt-vJX6QblMgApt0R-5c5hLsktO2Nu_h4QaLg4MXyCmr2ClP7jErvbiwB_ADaw"
  },
  {
    "id": "skin_91",
    "name": "★ Sport Gloves | Arid",
    "category": "Gloves",
    "rarity": "mythic",
    "price": 975,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk5UvzWCL2kpn2-DFk_OKherB0H_2aAm6EwPxvj-1gSCGn20h3sTvVyoqheX2TbA9zDcFwQOQLtBnpw4bvM-rm4ACMiY5Cnn_63CNXrnE8hMDc76M"
  },
  {
    "id": "skin_92",
    "name": "★ Sport Gloves | Amphibious",
    "category": "Gloves",
    "rarity": "mythic",
    "price": 950,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk5UvzWCL2kpn2-DFk_OKherB0H-CcB3Sfz9Fwou5ucCu_gBgYpDWMjorGLSLANkI-W5R4E7JZtxbskNWxZeLi4QPejdgTmSn62iwbvyw957kDAqog_fXWjBaBb-Pahe96zA"
  },
  {
    "id": "skin_93",
    "name": "★ Sport Gloves | Bronze Morph",
    "category": "Gloves",
    "rarity": "mythic",
    "price": 1025,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk5UvzWCL2kpn2-DFk_OKherB0H-CcB3Sfz9Fwou5ucDu2kSIgoTiAlLD1KCzPKhghDJBzTLMCukW6kNblNe-2tlGKj45GyCWrii8f73k95e4HA_AjrvbSkUifZkDjXxpJ"
  },
  {
    "id": "skin_94",
    "name": "★ Sport Gloves | Pandora's Box",
    "category": "Gloves",
    "rarity": "mythic",
    "price": 3500,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk5UvzWCL2kpn2-DFk_OKherB0H-CGHHecxNF6ueZhW2exk01w4j7cmYn4eHPCbAMhApdwTOIN5BPsx9yyYu605FTeid0Uy3j3kGoXueKyz5wo"
  },
  {
    "id": "skin_95",
    "name": "★ Sport Gloves | Slingshot",
    "category": "Gloves",
    "rarity": "mythic",
    "price": 1075,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tk5UvzWCL2kpn2-DFk_OKherB0H-OfB2mX0uZ5pN5lRi67gVN24DzSw479dnuTbAckWcElRbJctkW9ktPlNu2w51Dc2oNAmCWo2ioa8G81tMaI-Tzs"
  },
  {
    "id": "skin_96",
    "name": "★ Bloodhound Gloves | Charred",
    "category": "Gloves",
    "rarity": "mythic",
    "price": 1100,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tg_13jRBnOnJrv8iZT4OegbJtqLP-FC3Svw-J5v-VhQDy9kSIlvzyGkbDqKCfRO0RPVssnHaMUsES-k9HjNrixsgbd3YIRni7-inlO5i5t6-pRAqIs_aOFjg_JZbU5sI5Deqh-Veq-pA"
  },
  {
    "id": "skin_97",
    "name": "★ Bloodhound Gloves | Guerrilla",
    "category": "Gloves",
    "rarity": "mythic",
    "price": 1125,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tg_13jRBnOnJrv8iZT4OegbJtqLP-FC3Svw-J5v-VhQDy9kSIgpjiXiIb1LSr4Ml93UtZuR7QKthCwl4fkNuqw4lPXgosRzi78inwdvyk45e5UUqQkq_aDi1rEZap9v8fy7GQdug"
  },
  {
    "id": "skin_98",
    "name": "★ Bloodhound Gloves | Bronzed",
    "category": "Gloves",
    "rarity": "mythic",
    "price": 1150,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tg_13jRBnOnJrv8iZT4OegbJtqLP-FC3Svw-J5v-VhQDy9kSIqtimEloPwIhTLN1F4Tox2Q7UJ4RLrltDkMuyz4ASIg4kUxCr5jy8fvC46sLtWWaojqKze2giTL_Rjtvi23tdj"
  },
  {
    "id": "skin_99",
    "name": "★ Bloodhound Gloves | Snakebite",
    "category": "Gloves",
    "rarity": "mythic",
    "price": 1175,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tg_13jRBnOnJrv8iZT4OegbJtqLP-FC3Svw-J5v-VhQDy9kSI0vTyOn5zyKCX4PERxSdEfGb5d6lSmxIfuMezmtFfb39lAxCivh3hI6Chi4eYGWfAt8vXTiw_EM7Q_t5NWIeHnE0qrynbE1A"
  },
  {
    "id": "skin_100",
    "name": "★ Broken Fang Gloves | Needle Point",
    "category": "Gloves",
    "rarity": "mythic",
    "price": 1200,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tg_13jRBnOnITv9idV6fOgb5tqLP-FC3Svzv5zouB9Ria9xE0YtTGKiI71HifOOV5kFJQlQbUL4RHukofjY-227wDaidpHnCqs3H5K6So95ekLVKck__bW3Q_fcepqSI673wM"
  },
  {
    "id": "skin_101",
    "name": "★ Broken Fang Gloves | Jade",
    "category": "Gloves",
    "rarity": "mythic",
    "price": 1225,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tg_13jRBnOnITv9idV6fOgb5tqLP-FC3Svzv5zouB9Ria9xE0YvjiRm4PwIhTALFN1VP0sHLBS9g65w9exM-Pl5gaKidkRziX22yNIv306571QA6pwrKGDiluTZLxs5ZdXOr_5GlzOqAIa"
  },
  {
    "id": "skin_102",
    "name": "★ Broken Fang Gloves | Yellow-banded",
    "category": "Gloves",
    "rarity": "mythic",
    "price": 1250,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tg_13jRBnOnITv9idV6fOgb5tqLP-FC3Svzv5zouB9Ria9xE0YozKMiYD3Hi3VMVFPWM4hFrxl-0XkzougWLa7sF2alYpAyX__iClA5ntstuoEUqUirKeG2w3IYrZo4JRSLa2vRRvdWhwJsa98BNe077TKBCc"
  },
  {
    "id": "skin_103",
    "name": "★ Broken Fang Gloves | Unhinged",
    "category": "Gloves",
    "rarity": "mythic",
    "price": 1275,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tg_13jRBnOnITv9idV6fOgb5tqLP-FC3Svzv5zouB9Ria9xE0YoDOEkYrqKiLJAVR8W8ErKrtT5Uj8jNfuN-2wtgeNioNDxS7_jS4av31j5L4CVqV0rvLTigzCNeE5tZkCJqm5DUPZGadTirc"
  },
  {
    "id": "skin_104",
    "name": "★ Hydra Gloves | Emerald",
    "category": "Gloves",
    "rarity": "mythic",
    "price": 1300,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tg_13jRBnOlo_k7yNk6P6hfqF-H_KfAWiUyeFjvuVWRzC3hxwYsTGEmYTGJjnCO1hPVssnHaMU4EG6ktGyPryz5A3fiIwUyin3h3lJ5nlq5-xQVPIk-6HWjVmQOeFptI5DeqjsQUewWg"
  },
  {
    "id": "skin_105",
    "name": "★ Hydra Gloves | Case Hardened",
    "category": "Gloves",
    "rarity": "mythic",
    "price": 450,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tg_13jRBnOlo_k7yNk6P6hfqF-H_KfAWiUyeFjvuVWRzC3hxwYsDyWn7DxIDnDO1h1Xv0sHLBS9g7ul9zmMbi35FHYgolMmSj9jS8fvC5jte9RAqctqKCC2QHBYrU64MMCOr_5GlPhveuZ"
  },
  {
    "id": "skin_106",
    "name": "★ Hydra Gloves | Mangrove",
    "category": "Gloves",
    "rarity": "mythic",
    "price": 475,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tg_13jRBnOlo_k7yNk6P6hfqF-H_KfAWiUyeFjvuVWRzC3hxwYtC-An4HGLS7GKl51SP0tEKRS3UL6w5ekWLa7sF2alY9MzyX92ixAvCs-sutWWKd08qDRh17CZOI86JcBcffyH0iGUR9asfh8BNe0yN2QCJM"
  },
  {
    "id": "skin_107",
    "name": "★ Hydra Gloves | Rattler",
    "category": "Gloves",
    "rarity": "mythic",
    "price": 500,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Tg_13jRBnOlo_k7yNk6P6hfqF-H_KfAWiUyeFjvuVWRzC3hxwYoDOEkYrqKiLJAVRiW9EzKrtT5Uj8jNOyZb_i5QHcg40Unyz-ji5LvX1v6-kEV_Ek8vCFjguUYOU_tJVWd6y5DUPZHBGjgbE"
  },
  {
    "id": "skin_108",
    "name": "AK-47 | AUTOEXEC",
    "category": "Rifle",
    "rarity": "legendary",
    "price": 167,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiNQu6WRabF5L_WLC2Svwu97v95lRi67gVN16mzSwtigdn2QPAElXpskQOQIthC8xIXiM-7k4gHfgoMWySyo2y4b8G81tI8PUinm"
  },
  {
    "id": "skin_109",
    "name": "AK-47 | Crane Flight",
    "category": "Rifle",
    "rarity": "epic",
    "price": 26.85,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiNQu6WRa7ZsLvWsCGuZxuZij-1gSCGn20wksT7Xzo6ueX6VOgUmWZQiTO5btxDrldbmNru05QLfiN5EmHmsj3hXrnE8mi375M8"
  },
  {
    "id": "skin_110",
    "name": "AK-47 | Searing Rage",
    "category": "Rifle",
    "rarity": "epic",
    "price": 28.5,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiNQu6WRbbx9LP-AB3GV_uJ_t-l9AXu2lk1xsD-EnI3_JHmeaAV1CZB1RbEJtxfuxNHuMuq251PY3o4UxXjgznQeg4Qz-rg"
  },
  {
    "id": "skin_111",
    "name": "AK-47 | Consequence of the Jinn",
    "category": "Rifle",
    "rarity": "legendary",
    "price": 212.75,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiNQu6WRYq1jLs-QAWmDxP9jte9qSha_nBovp3OHm9v6IHuTOgYiA5ZzE-Bb40O6loK2MeLnswff2ogRyS732ywduyc4_a9cBtOamUv2"
  },
  {
    "id": "skin_112",
    "name": "AK-47 | The Oligarch",
    "category": "Rifle",
    "rarity": "legendary",
    "price": 228,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiNQu6WReLFrJvWBMWSF0vp5vd5lRi67gVNz4Tvdn4qoJC3Ba1V1WcdxTbFcsEbpxoHhNunnsVPYitlFm3392C4f8G81tEVBuxrI"
  },
  {
    "id": "skin_113",
    "name": "AK-47 | The Outsiders",
    "category": "Rifle",
    "rarity": "epic",
    "price": 33.45,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiNQu6WRfJtvNeOsAm6Xyfo4tbg7G3-wxxwl5mzRyYqodSrBagMjCZJxELMPthi8lNLgYuzltgHc3ZUFk3sO-7HKrg"
  },
  {
    "id": "skin_114",
    "name": "AK-47 | Inheritance",
    "category": "Rifle",
    "rarity": "legendary",
    "price": 258.5,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiNQ0OKheqdoLPGaAFicyOl-pK8xGH_nwUt1sGrSz9ivcHKQOAcjXMYkRu5Yuxe4lYCyZOq25VSM2oMT02yg2UxBSEgA"
  },
  {
    "id": "skin_115",
    "name": "AK-47 | Hydroponic",
    "category": "Rifle",
    "rarity": "epic",
    "price": 36.75,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiNW0PCvZaZiL8-ZG2mXzetJvOhuRz39lk0m4Dncztz7Jy2fagIoC5t5QeNbskW6xNLgZu-24AXZgt4Xyi_4izQJsHjOr8RS6A"
  },
  {
    "id": "skin_116",
    "name": "AK-47 | Cartel",
    "category": "Rifle",
    "rarity": "epic",
    "price": 38.4,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiNK0POlPPNSI_GBGmKc_uJ_t-l9ASuywktwtW3dwt79eX6fZlUiCJJ1RbUPtkW8w4LiZe_i4ATYjN8WmH7gznQeZkk4ehM"
  },
  {
    "id": "skin_117",
    "name": "AK-47 | Case Hardened",
    "category": "Rifle",
    "rarity": "legendary",
    "price": 450,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiNK0P2nZKFpH_yaCW-Ej7sk5bE8Sn-2lEpz4zndzoyvdHuUPwFzWZYiE7EK4Bi4k9TlY-y24FbAy9USGSiZd5Q"
  },
  {
    "id": "skin_118",
    "name": "AK-47 | Phantom Disruptor",
    "category": "Rifle",
    "rarity": "epic",
    "price": 41.7,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0POlJfA6H-CbD2mEzuNJtOh6XTyjgRI1jDGMnYftb3qTbQMpCZVxF-8Ku0Xtw4XkYu2xtQSL3d5FxSz-3H5Ovy895epRA6E7uvqAsbzZtpo"
  },
  {
    "id": "skin_119",
    "name": "AK-47 | Neon Revolution",
    "category": "Rifle",
    "rarity": "legendary",
    "price": 334.75,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0POlPPNSIf6SHGSY2NF6ueZhW2e3w0524mjQzomreXqVbAAhWJF3RuZfuxC5x920Yurh7gONjY0RxHr4kGoXuT5bpI-V"
  },
  {
    "id": "skin_120",
    "name": "AK-47 | Legion of Anubis",
    "category": "Rifle",
    "rarity": "rare",
    "price": 24,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0POlPPNSIf6GDG6D_uJ_t-l9AX_nzBhw4TvWwo6udC2QbgZyWcN2RuMP4xHrlYDnYezm7geP3d5FyH3gznQeY_Oe4QY"
  },
  {
    "id": "skin_121",
    "name": "AK-47 | Asiimov",
    "category": "Rifle",
    "rarity": "epic",
    "price": 95,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0POlPPNSIeOaB2qf19F6ueZhW2e2wEt-t2jcytf6dymSO1JxA5oiRecLsRa5kIfkYr-241aLgotHz3-rkGoXuUp8oX57"
  },
  {
    "id": "skin_122",
    "name": "AK-47 | Uncharted",
    "category": "Rifle",
    "rarity": "common",
    "price": 1.12,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0POlPPNSIeqHC2SvzedxuPUnFnCwwBl_5D_Syon8dnyUaQUlD5oiQ7ECuxW7l920ZL-w4AfX2IlByTK-0H0PRM7cOA"
  },
  {
    "id": "skin_123",
    "name": "AK-47 | Redline",
    "category": "Rifle",
    "rarity": "epic",
    "price": 16.95,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0POlPPNSI_-RHGavzedxuPUnFniykEtzsWWBzoyuIiifaAchDZUjTOZe4RC_w4buM-6z7wzbgokUyzK-0H08hRGDMA"
  },
  {
    "id": "skin_124",
    "name": "AK-47 | Ice Coaled",
    "category": "Rifle",
    "rarity": "epic",
    "price": 18.6,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0POlPPNSI_-UGm-Zz-llj-1gSCGn2x4l5z_RyNj6JXnEbgFzXMYjEOUIsBe5m9exP-zg4leMj4pGxXn7jCJXrnE84asPq_0"
  },
  {
    "id": "skin_125",
    "name": "AK-47 | Aquamarine Revenge",
    "category": "Rifle",
    "rarity": "legendary",
    "price": 121.25,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0POlPPNSI_-GHGaXxNF3vPVWQyC0nQlp4WvVzturJ3qVb1B1DMd3Q7EO5xW_l9O2ZOLg5gyP2N9BxST_jXwY7TErvbj-FmM1dA"
  },
  {
    "id": "skin_126",
    "name": "AK-47 | Elite Build",
    "category": "Rifle",
    "rarity": "common",
    "price": 1.76,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0POlPPNSLfGAGmKC2NF6ueZhW2e2wh9y5GjTztirdSqfP1dyCpclR7FZ5xe9wNbhZei25FGPjokXxC2vkGoXuQLr5jvs"
  },
  {
    "id": "skin_127",
    "name": "AK-47 | Nightwish",
    "category": "Rifle",
    "rarity": "legendary",
    "price": 151.75,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0POlPPNSLvmUBnOHyP1-j-1gSCGn20glt2nXnt78cnKUbwN2XJp2R-ZbuxHqlNXlMLiw5AHc3toWnCur23hXrnE8p0T2bx4"
  },
  {
    "id": "skin_128",
    "name": "AK-47 | Point Disarray",
    "category": "Rifle",
    "rarity": "epic",
    "price": 25.2,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0POlPPNSMP-aAHOvxedlsfN7TjCMmRQguynLnIz_dXnEbFcoDsNzQLMN40S7mte0Zuzl5gbY34JEnnr52ChA7ytisPFCD_Rw7udDlA"
  },
  {
    "id": "skin_129",
    "name": "AK-47 | Vulcan",
    "category": "Rifle",
    "rarity": "legendary",
    "price": 650,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0POlPPNSMuWRDGKC_uJ_t-l9AXCxxEh14zjTztivci2ePQZ2W8NzTecD4BKwloLiYeqxtAOIj9gUyyngznQeF7I6QE8"
  },
  {
    "id": "skin_130",
    "name": "AK-47 | Frontside Misty",
    "category": "Rifle",
    "rarity": "epic",
    "price": 28.5,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0POlPPNSN_mdGmKC_v1mv_N9cCW6khUz_WvRm9r8JS-SaFMmWcN5ReMD4BDsltDkN-Prs1DfjN9Cn3r_jC4YvHl1o7FVgJsyBlQ"
  },
  {
    "id": "skin_131",
    "name": "AK-47 | Head Shot",
    "category": "Rifle",
    "rarity": "epic",
    "price": 65,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0POlV6xoIfSsHW-f1dF-v-1mcCW6khUz_TzRnNigd3-SOg4lAsF1QOQN4xS4wdHnMu-0swaMjIxExSSoiyof6ih1o7FVGHIdVhw"
  },
  {
    "id": "skin_132",
    "name": "AK-47 | Wild Lotus",
    "category": "Rifle",
    "rarity": "ancient",
    "price": 3200,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0POlV61-LPGdCliWzeFkse1WQyC0nQlpsDuGyt-pdnyRPA4hDcYkR-QPuhi-wdPuYbyx5AaMidkQnC_-2ilIuzErvbi4ijV5Mw"
  },
  {
    "id": "skin_133",
    "name": "AK-47 | Panthera onca",
    "category": "Rifle",
    "rarity": "epic",
    "price": 33.45,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0POlV65sJ-WSHFicyOl-pK9sSS-2wEV25z_Qw4mqcn3EOgclCpJ3TbRctELtm9HmNLix4wHc3o5H02yg2Q50xEQx"
  },
  {
    "id": "skin_134",
    "name": "AK-47 | Neon Rider",
    "category": "Rifle",
    "rarity": "legendary",
    "price": 258.5,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0POlV6poL_6sHG6UxPxJvOhuRz39xkQhsTnVzoygdy7Ea1UoCZQkRe9bs0brl9TvN-m0tVHYjY5CyS35jjQJsHhk4o5zcA"
  },
  {
    "id": "skin_135",
    "name": "AK-47 | X-Ray",
    "category": "Rifle",
    "rarity": "legendary",
    "price": 273.75,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0POlV7x_IemsAm6Xyfo44OQ_Tn3il08k4GzVyo2qeSnDaQAlXpF1RuZZsUO4kNLjNO2w51HWjJUFk3tTkVsnkA"
  },
  {
    "id": "skin_136",
    "name": "AK-47 | Fire Serpent",
    "category": "Rifle",
    "rarity": "legendary",
    "price": 1150,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0PSneqF-JeKDC2mE_u995LZWTTuygxIYvzSCkpu3cnvFPQB2DpUkROFY4Rntw93lP7i241DbiI1BxSuviHlKunk_6-sHU71lpPMTRLyP4Q"
  },
  {
    "id": "skin_137",
    "name": "AK-47 | Crossfade",
    "category": "Rifle",
    "rarity": "common",
    "price": 3.52,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0PW8abRlKfOsAXGV0-J3qd5oRH3kqhEutDWR1N6vdi2Wb1IjA5V5FrUPuhW6ldGzMe7htQTd2YoRzyn83HhPvys65eocEf1y0nVviGs"
  },
  {
    "id": "skin_138",
    "name": "AK-47 | First Class",
    "category": "Rifle",
    "rarity": "rare",
    "price": 11.05,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0PW8baFjH_yWD3OYxPxJseo9GBa_nBovp3PXmNmpdymUZwMnX8EhEeBbtBnrk4LjZLzi7wbe3opNmCn8iH8YvX5i_a9cBikeWj5H"
  },
  {
    "id": "skin_139",
    "name": "AK-47 | B the Monster",
    "category": "Rifle",
    "rarity": "legendary",
    "price": 334.75,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0P24bbZ9IeOAMWqfz_1itfNWTiLnwiIrujqNjsGocC6QPQNyA8FxReZYtEHrw4ezMe_nsgbWjYIXni782ipA5yxv5OkET-N7rajaE730"
  },
  {
    "id": "skin_140",
    "name": "AK-47 | Jaguar",
    "category": "Rifle",
    "rarity": "legendary",
    "price": 45,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0OKvZrBlJeKsD2zEltF6ueZhW2fhzUwi4WuBzNv6dCiWPVUgApV0TLIM40SwxNLuN-Pl71fdjogXmy79kGoXuYeqaPqj"
  },
  {
    "id": "skin_141",
    "name": "AK-47 | Emerald Pinstripe",
    "category": "Rifle",
    "rarity": "rare",
    "price": 2.98,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0OKnZrd5MvmDC1iRyrohj-1gSCGn20t-422Bn4v6eH_FaFcpWcFyRrRbsRK9xN3lNOK0tFPX2YJBmS_4iytXrnE8zwmR9Cc"
  },
  {
    "id": "skin_142",
    "name": "AK-47 | Wasteland Rebel",
    "category": "Rifle",
    "rarity": "legendary",
    "price": 75.5,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0Oa8YaZ4NPWsD2zEltF6ueZhW2fgkEh35m3cmIusIn6TbwMpWJJxReMKtBHsw4HhM7nh4gTc3YJCxXr2kGoXudZyw1tq"
  },
  {
    "id": "skin_143",
    "name": "AK-47 | Jet Set",
    "category": "Rifle",
    "rarity": "epic",
    "price": 16.95,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiFO0OWrZKhSNOKSGGKcxOpJseo9GBa_nBovp3ODydescy_FbVcoDZMkReYP4xC8w93jY7u35AeK2IhMmC__2itN73pv_a9cBpGGBr1j"
  },
  {
    "id": "skin_144",
    "name": "AK-47 | Leet Museo",
    "category": "Rifle",
    "rarity": "epic",
    "price": 42,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiVI0POlPPNSIfKAGnWRwvpJvOhuRz39xEly6jmHmdiqeS6UawMmCsBzFrRb4BLtx9DgPr635A3Xj45GySj5jzQJsHjwtGRbjQ"
  },
  {
    "id": "skin_145",
    "name": "AK-47 | Bloodsport",
    "category": "Rifle",
    "rarity": "legendary",
    "price": 115,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiVI0POlPPNSIvycAWOD0eFkpN5lRi67gVN15mmDw9egci_EPFAkDMQlTeZe4EXplNa0Yrvr5wbd345GyHioiC4b8G81tFuqg_k_"
  },
  {
    "id": "skin_146",
    "name": "AK-47 | The Empress",
    "category": "Rifle",
    "rarity": "epic",
    "price": 85,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiVI0POlPPNSJf2DHGKD0tF6ueZhW2exxEt152rWzI7_Ii-Ubw90DMB0Ee4C5xOwx9GxZbjk71PXgogWn36tkGoXudZeYvlo"
  },
  {
    "id": "skin_147",
    "name": "AK-47 | Gold Arabesque",
    "category": "Rifle",
    "rarity": "legendary",
    "price": 2100,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiVI0POlPPNSJ_-fCliR0-90tfJ4WiyMmRQguynLntmvICieOARzCpMhF-BYsRe-xoHvYu_g5lSNj4NDyy2viCwY6Hlu5_FCD_Q1jEqYuQ"
  },
  {
    "id": "skin_148",
    "name": "AK-47 | Rat Rod",
    "category": "Rifle",
    "rarity": "rare",
    "price": 6.3,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiVI0POlPPNSLvmRDGuV09F6ueZhW2fklBx362TTnN36dHiRa1AmW5QlQuVftxO9k4HhZuvksVDc398Rzy32kGoXuR34FNLu"
  },
  {
    "id": "skin_149",
    "name": "AK-47 | Slate",
    "category": "Rifle",
    "rarity": "rare",
    "price": 6.77,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiVI0POlPPNSMOKcCGKD0ud5vuBlcCW6khUz_W3Sytb4cCqTOFUpWJtzTOUD5hPsw9a0Yrnrs1SK3ooXzy6shilM5311o7FVYrIufmI"
  },
  {
    "id": "skin_150",
    "name": "AK-47 | Steel Delta",
    "category": "Rifle",
    "rarity": "common",
    "price": 2.4,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiVI0POlPPNSM-SBAWmV_uJ_t-l9AXqyk0hy5GWEyduhdC2TPAEjDptzQbRf5EHrmoWyZu22sQLciokQyyzgznQesAEGx_A"
  },
  {
    "id": "skin_151",
    "name": "AK-47 | Fuel Injector",
    "category": "Rifle",
    "rarity": "legendary",
    "price": 340,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiVI0POlPPNSM-WDC3WTye9kt-RtcCW6khUz_WuGy9_8dHuRbg5xW5IjQ-BYshK9mta0NLmw4lDa2o0Wni_3iy4f6np1o7FVB0pWHHg"
  },
  {
    "id": "skin_152",
    "name": "AK-47 | Orbit Mk01",
    "category": "Rifle",
    "rarity": "rare",
    "price": 8.2,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiVI0POlV6diLP-dFzfB_vxztN5lRi67gVMk4TmEn9n_c3PGPwZyDMckTO8JsEPuktG1ZOrjsgPX2IwUyiyv3S0f8G81tLnuvOvF"
  },
  {
    "id": "skin_153",
    "name": "AK-47 | Aphrodite",
    "category": "Rifle",
    "rarity": "legendary",
    "price": 243.25,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wiVI7PqRaa9SJPqaB2mvzedxuPUnGCi3wktzt2rRn92pdXuXbA4iDcdxQOIMsBK4k9S2Zeiw4lTdjdhNyTK-0H1wmrL4zA"
  },
  {
    "id": "skin_154",
    "name": "AK-47 | Olive Polycam",
    "category": "Rifle",
    "rarity": "common",
    "price": 1.87,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wipP0OKhZL1SI_GeAViRyrohj-1gSCGn201-4G7dyo2oeXORaAIpCcFwTeEK4ELskNa0NeKxtVTXiItDySms3XxXrnE8JD9gyYo"
  },
  {
    "id": "skin_155",
    "name": "AK-47 | Blue Laminate",
    "category": "Rifle",
    "rarity": "rare",
    "price": 9.62,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wipC0POlPPNhIf2sDGuFxNF6ueZhW2fhzE5_5G7dnt_7JXufa1J0DZAkE-cKtBaxl9WzPuyz5lDY3YpAzCn9kGoXuZPu7T4u"
  },
  {
    "id": "skin_156",
    "name": "AK-47 | Black Laminate",
    "category": "Rifle",
    "rarity": "common",
    "price": 3.36,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wipC0POlPPNhIf2sDHCvzedxuPUnGnzjlh51sTyAzomrICnEbQByWcciTOQIsBG_m9LiZOLh7wfdi91DnzK-0H1Z7oynag"
  },
  {
    "id": "skin_157",
    "name": "AK-47 | Green Laminate",
    "category": "Rifle",
    "rarity": "common",
    "price": 3.52,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wipC0POlPPNhIf2sCXWVxOBJvOhuRz39xUgj4WmByIuqInLCag8jWZJ3F-AL4xi6wd22Ne3rtQLZjYNEnHj92zQJsHgD_GLtVg"
  },
  {
    "id": "skin_158",
    "name": "AK-47 | Red Laminate",
    "category": "Rifle",
    "rarity": "epic",
    "price": 41.7,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wipC0POlPPNhIf2sAm6Xyfo4tucxS3rjwRx_42zRwo6pdSnCPwAmX5ohFOIJsUTqwdThNOi0s1TajZUFk3t5vdi_Cw"
  },
  {
    "id": "skin_159",
    "name": "AK-47 | Safety Net",
    "category": "Rifle",
    "rarity": "rare",
    "price": 11.53,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wipC0P-re6xSM_GVC3OJzvx3vuZscCW6khUz_W3RyI2tdyjFaAUlW5J5QeNc4BS_xoKzYePi4QSIgoJDynn4jS9Mvyh1o7FVeAmr1N8"
  },
  {
    "id": "skin_160",
    "name": "AK-47 | Baroque Purple",
    "category": "Rifle",
    "rarity": "common",
    "price": 0.4,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wipC0OSrZqF5L8-DG3WAzetJvOhuRz39wEgl6jyBwtqtJS6QbFRzApIkR-YLsRe6wdDvZung4gHbjd4XyH7_iTQJsHhGzMbuTA"
  },
  {
    "id": "skin_161",
    "name": "AK-47 | Nouveau Rouge",
    "category": "Rifle",
    "rarity": "epic",
    "price": 13.65,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wipC6s2vY_A6H_6cG3GVwPtJvOhuRz39zBsm5j-HyNqpd32fPVd1AsB3RbEP4xntwdPuM-jl4QaK2NpCzX_23DQJsHjpyGbntg"
  },
  {
    "id": "skin_162",
    "name": "AK-47 | Breakthrough",
    "category": "Rifle",
    "rarity": "rare",
    "price": 3.45,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wipC6s20baB-H_yaCW-Ej-olseI8Gyq1kBkh4GrVz4queXySPAd0XJEkQ7UMu0TrldaxYbzjsw3Ay9USrh0CgFA"
  },
  {
    "id": "skin_163",
    "name": "AK-47 | Midnight Laminate",
    "category": "Rifle",
    "rarity": "rare",
    "price": 3.92,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wjFU6s2neq1pJeOQC2mE_v5jovFlSha_nBovp3PRnt36d36UOlUmCcF2TOZfsRC_ldW1ML625AbZ2dhHyn_7jSgauCtp_a9cBpVVSdXG"
  },
  {
    "id": "skin_164",
    "name": "AK-47 | Wintergreen",
    "category": "Rifle",
    "rarity": "common",
    "price": 1.44,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wjFU6s2jbbBsLPyaDViX0-tzvt47cCW6khUz_W-Ay96seSrBaQcnDJRyTbMDuxTsw9bmNLy0sQPb34JNyn_-jS9N6n51o7FVK4Nkj6A"
  },
  {
    "id": "skin_165",
    "name": "AK-47 | VariCamo Grey",
    "category": "Rifle",
    "rarity": "common",
    "price": 0.93,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wjFU6s24abZkI_GeAVicyOl-pK8_TXvhxh5_626Bn477dn-fbQcnXMZzEeMPtxe_w9DhY-OztAXc2IsT02yg2Vc0ERtW"
  },
  {
    "id": "skin_166",
    "name": "AK-47 | Safari Mesh",
    "category": "Rifle",
    "rarity": "common",
    "price": 1.03,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wjFL0P-re6xSNPGdMWuZxuZi_rIxSirkkElyt2qEzI2heXiTaVIiX5siROQJtxnul4XnYbvgswOMgolbjXKpnRk9Yjk"
  },
  {
    "id": "skin_167",
    "name": "AK-47 | Jungle Spray",
    "category": "Rifle",
    "rarity": "common",
    "price": 1.14,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wjFL0OG-eqV0H_qGAGCcxNF6ueZhW2ewlhhz5T6ByY2oIi2XZgVxX8Z0FrFfsxnrl9bkMu625lbb2o9DzSyvkGoXuXE-297B"
  },
  {
    "id": "skin_168",
    "name": "AK-47 | Predator",
    "category": "Rifle",
    "rarity": "common",
    "price": 1.24,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwlcK3wjFL0OirarZsI_GeMWuZxuZi_uMwF3i3xkh25W_VzNevICqTP1QoXpJ2E-MM40bpldXvY7yw4wXb3olbjXKpy8jW9Xo"
  },
  {
    "id": "skin_169",
    "name": "AUG | Amber Fade",
    "category": "Rifle",
    "rarity": "common",
    "price": 2.24,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwi5Hf_CNk6fOqbZtgJeSSAmuZwtF6ueZhW2fizUlwsmuEytmvJHzGaQJyXMclEbYCuhPtkdHmPrvqsVaL3osTmyj6kGoXuZFFysy6"
  },
  {
    "id": "skin_170",
    "name": "AUG | Death by Puppy",
    "category": "Rifle",
    "rarity": "epic",
    "price": 28.5,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwi5Hf_C9k7uepV6BoIeSbMWWJ_up5t-ZwcCW6khUz_W7RnNegdyqRPAcpDZdwQOAO5xW4w4C0ZemwtgHYjoNHniX6iSsd7Cx1o7FVmQFtzuc"
  },
  {
    "id": "skin_171",
    "name": "AUG | Ricochet",
    "category": "Rifle",
    "rarity": "common",
    "price": 2.56,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwi5Hf_C9k7uepV654LfKfC1icyOl-pK9tHi-wxUp0sTyGw4z8dXqfb1IlWcd1QedctUbpwNHgPrnjtFeLj4tD02yg2euRXb9L"
  },
  {
    "id": "skin_172",
    "name": "AUG | Midnight Lily",
    "category": "Rifle",
    "rarity": "rare",
    "price": 8.2,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwi5Hf_C9k7f6hZ6lSIvyGC1icyOl-pK8-FnDrlE8k62uAytipeSqRaFcoC8BwQbIM5xjtwdWzMr6ztAPd2YNA02yg2RS7P3lf"
  },
  {
    "id": "skin_173",
    "name": "AUG | Random Access",
    "category": "Rifle",
    "rarity": "rare",
    "price": 8.68,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwi5Hf_C9k7Pu8a7FkNPKcD3WU_uFkse9uSha_nBovp3PcnImuIi2RbA8iD5B5FLYNtULqwdLuYbvg4w2Ng9hAziSvjnhBv31v_a9cBkz61Qws"
  },
  {
    "id": "skin_174",
    "name": "AUG | Surveillance",
    "category": "Rifle",
    "rarity": "common",
    "price": 1.09,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwi5Hf_C9k5vy6bahhKfeWAGSV_ulktfhWQyC0nQlp42TWmI2seXOUb1UgXJp3F-ZbsxixltbiNLvl7gza3olCyST-i3wa6zErvbj9bg91yA"
  },
  {
    "id": "skin_175",
    "name": "AUG | Carved Jade",
    "category": "Rifle",
    "rarity": "common",
    "price": 3.2,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwi5Hf_C9k5fOqbZthKfebGimWkLlytrI5TXrlwBx-sGyGw9-gcC-fZgAhCpRwQbRbtxe4kdSxP7vm-UWA3MgZU-ku"
  },
  {
    "id": "skin_176",
    "name": "AUG | Flame Jörmungandr",
    "category": "Rifle",
    "rarity": "rare",
    "price": 10.1,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwi5Hf_C9k5f28ZZtiMvGdCWKvzedxuPUnTn7glkly423Xy4yoJHOWaFR0A5YlQrNc5xXrm93hZejntQWN3YNCzzK-0H2szzSoFw"
  },
  {
    "id": "skin_177",
    "name": "AUG | Anodized Navy",
    "category": "Rifle",
    "rarity": "common",
    "price": 3.52,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwi5Hf_Cxk4fO4cZtvMvGFAVicyOl-pK8wSnngwk8msDnRz9yseXzDZ1R0XJAhEbYN4RW9xNTiM-vmslOPjd5M02yg2bwhPrnn"
  },
  {
    "id": "skin_178",
    "name": "AUG | Hot Rod",
    "category": "Rifle",
    "rarity": "common",
    "price": 3.68,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwi5Hf_Cxk_feqV6hkJ_iHQDCVkuxz5bY_H3znlhtz5jzTztigeXLBbwRyD8ckTOZbt0G8wNOyZuL8p1uJa1KD__k"
  },
  {
    "id": "skin_179",
    "name": "AUG | Steel Sentinel",
    "category": "Rifle",
    "rarity": "common",
    "price": 2.4,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwi5Hf_Ddc0PGhZKBSM_WdGm6exOJJvOhuRz39xRsltT6Hw92peX6SaAYpX8RwFuFf5BPuktLiZuKztVTYid9GyCqtiTQJsHi4iDvrNw"
  },
  {
    "id": "skin_180",
    "name": "AUG | Signal Scanner",
    "category": "Rifle",
    "rarity": "common",
    "price": 0.8,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwi5Hf_Ddc0PWmZ7d5H-OaCWmRzdF6ueZhW2exw0gj5jvXmNv9dirDbAN0ApIiROcJ5Ea9m9ezZLvm41fe3Y5Em379kGoXubvUs0-D"
  },
  {
    "id": "skin_181",
    "name": "AUG | Lapis Lazuli",
    "category": "Rifle",
    "rarity": "rare",
    "price": 2.98,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwi5Hf_Ddc0P6veK1-H_ySFHKcyNF6ueZhW2frwkUi426Dw9asIHuSbQZxA5VyQ-MPsxjtkNexMOnk4QCL2YxByCn5kGoXuRkVR5wo"
  },
  {
    "id": "skin_182",
    "name": "AUG | Luxe Trim",
    "category": "Rifle",
    "rarity": "common",
    "price": 1.12,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwi5Hf_Ddc0OK7bqJoMs-fB2CY1aAntOUwSivrwksmtTyBnI2udijFZ1cmDZt0QeUCsRG7xoWzNu3r5gPelcsbmlZvKhNj"
  },
  {
    "id": "skin_183",
    "name": "AUG | Trigger Discipline",
    "category": "Rifle",
    "rarity": "common",
    "price": 1.28,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwi5Hf_Ddc0Oa8YaNqJeKsCm6DwudmvOhnShalkBEkvAKJk4jxNWXEbwMhDpMkELUP4BSxxt2zYeuw71ff3d9AxHn5hyxL7nlrsr4HU6pz5OSJ2GiAbBJR"
  },
  {
    "id": "skin_184",
    "name": "AUG | Akihabara Accept",
    "category": "Rifle",
    "rarity": "legendary",
    "price": 106,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwi5Hf_jdk7vynZaFSIeWUMWuZxuZi_rZvSXDgzUV_tWWAydyqI3mQbVMiWJolTLQOtBS4w4a1MuznsVHa3YlbjXKpUc8HttI"
  },
  {
    "id": "skin_185",
    "name": "AUG | Chameleon",
    "category": "Rifle",
    "rarity": "legendary",
    "price": 121.25,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwi5Hf_jdk7uepV6dlIf2WAmKfz-9_ouRWQyC0nQlpt23VztercCjGbg90C8RyQOcMs0G5x93uZLm37wbe2owTz3j9iShI6TErvbi7ZmzWCw"
  },
  {
    "id": "skin_186",
    "name": "AUG | Momentum",
    "category": "Rifle",
    "rarity": "epic",
    "price": 21.9,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwi5Hf_jdk7uepV6liLfWdGnKd_uJ_t-l9ASi2zUp042SBno6sICrFbFMnCZR5EedftkPqk9ayMr_j71fXjo8XmXrgznQeFjVtTWM"
  },
  {
    "id": "skin_187",
    "name": "AUG | Triqua",
    "category": "Rifle",
    "rarity": "common",
    "price": 1.92,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwi5Hf_jdk7uepV6t_If6UC1iE0-d3vuZlSha_nBovp3OGyd-hdXzDZwApApYjF7UJtUK5l9LnYe_g4wDWjd5NmHqojnxJuCw-_a9cBrjnwKiq"
  },
  {
    "id": "skin_188",
    "name": "AUG | Torque",
    "category": "Rifle",
    "rarity": "rare",
    "price": 6.3,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwi5Hf_jdk7uepV7R_L_eBC3SDyPhJvOhuRz39lxhxsm_WzN37Iy7CbAcmC8B2QuYPtRCwx9HvNr-xtQPaj95EmS__3TQJsHjrLu4xbg"
  },
  {
    "id": "skin_189",
    "name": "AUG | Fleet Flock",
    "category": "Rifle",
    "rarity": "epic",
    "price": 26.85,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwi5Hf_jdk7uepV7d6IfyfAXCD_uJ_t-l9AXnmw0t252TVztercCmTZ1AmDMZ2RuBftRnsx4LhN-O0s1DYi9pEmCTgznQesuSvNik"
  },
  {
    "id": "skin_190",
    "name": "AUG | Arctic Wolf",
    "category": "Rifle",
    "rarity": "rare",
    "price": 7.25,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwi5Hf_jdk7uepV7NlKeSWCGaextF6ueZhW2frxxtxsGrTw46sI33BOAUiXMElFO4L50O9xNLvNOyz4lDd3olMzX6skGoXude_sLiC"
  },
  {
    "id": "skin_191",
    "name": "AUG | Eye of Zapems",
    "category": "Rifle",
    "rarity": "rare",
    "price": 7.72,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwi5Hf_jdk4OSrerRsM-OsCXWRx9F3peZWQyC0nQlp6m7WyNescHuQOlIiXMd3F7UMtxfuwdSxMunh5waMjdhAzSutj3hBvTErvbhjFS7Ncw"
  },
  {
    "id": "skin_192",
    "name": "AUG | Aristocrat",
    "category": "Rifle",
    "rarity": "rare",
    "price": 8.2,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwi5Hf-jFk7uepV6V_KeOHAWSCwPpJvOhuRz39w00j5WSDytyqI3_CPwAgXMd2E-Vc4US-koCxNOzq5AaMithNyij32DQJsHjdc8VZyg"
  },
  {
    "id": "skin_193",
    "name": "AUG | Plague",
    "category": "Rifle",
    "rarity": "common",
    "price": 2.88,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwi5Hf-jFk7uepV7RhIfeGC1icyOl-pK8_GH7hzUx04WSByNj4JXuRaQJzXJclEO8MthHpl9DhYejjtAeL2YMU02yg2aipyCXk"
  },
  {
    "id": "skin_194",
    "name": "AUG | Sand Storm",
    "category": "Rifle",
    "rarity": "rare",
    "price": 9.15,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwi5Hf-jFk7uepV7dsLvSsHXOf0-NJvOhuRz39kxtzt2jcyNqsdy2TawElApolF7Zf50bsl9fvZuq05waMi44XyX3-2zQJsHjlDs_LaQ"
  },
  {
    "id": "skin_195",
    "name": "AUG | Stymphalian",
    "category": "Rifle",
    "rarity": "epic",
    "price": 36.75,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwi5Hf-jFk7uepV7d5Of2DBmacyO94j-NgXS2gqhEutDWR1Iz6cnqXOA8mD5shTOEPuhm-moHlZLnj4gLWjdhEzimr2n8bvC5q4e8cEf1yYjdCpmM"
  },
  {
    "id": "skin_196",
    "name": "AUG | Syd Mead",
    "category": "Rifle",
    "rarity": "epic",
    "price": 38.4,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwi5Hf-jFk7uepV7d0JM-eC2aU_uJ_t-l9AX_rkU9-5j_Ry42qcnuQbw5zCcMhQrINtRO-xIHvY-Ow4gPY2Y4UmSngznQeqqNNbYw"
  },
  {
    "id": "skin_197",
    "name": "AUG | Tom Cat",
    "category": "Rifle",
    "rarity": "common",
    "price": 3.52,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwi5Hf-jFk7uepV7BlNf6XC3WD1eFkvd5lRi67gVMm5GrRzt2sJXqUag4kDZAmFuBYtUTslIXuPui2s1Hb2o4Wyir2hy1N8G81tF6C_jtH"
  },
  {
    "id": "skin_198",
    "name": "AUG | Lil' Pig",
    "category": "Rifle",
    "rarity": "epic",
    "price": 41.7,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwi5Hf-jFk4_uieK1qH_GGCVicyOl-pK84TXCwxRhx627SmNj6J3PFaQV2X5R1R7JctBixldfvY7u24ATY2owX02yg2cUR6r7A"
  },
  {
    "id": "skin_199",
    "name": "AUG | Amber Slipstream",
    "category": "Rifle",
    "rarity": "common",
    "price": 3.84,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwi5Hf9Ttk7uepV7BiMv6sAXWRz-lzj-1gSCGn2x8msm2Dn9-oeSnGbAAiXppxE-cMs0Prm9a0Mrnqtg2L3dgQzS2vh3lXrnE8QYlxFJI"
  },
  {
    "id": "skin_200",
    "name": "AUG | Copperhead",
    "category": "Rifle",
    "rarity": "common",
    "price": 0.8,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwi5Hf9Ttk7P2-eKF_KPWSClicyOl-pK9oTCvmk0hw5TzXytqodXzEOgYlCsMjQ7YDshG_wdbkNLjltgPb39pM02yg2WdB2M5V"
  },
  {
    "id": "skin_201",
    "name": "AUG | Spalted Wood",
    "category": "Rifle",
    "rarity": "common",
    "price": 0.51,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwi5Hf9Ttk6-C3V7NiL_SsAm6Xyfo44-JsFiy3wBkl6miBmNz9IHrEbAZxDZciEO8Kuxbtm93gP-Lgtlbe35UFk3vZ4ja9kg"
  },
  {
    "id": "skin_202",
    "name": "AUG | Snake Pit",
    "category": "Rifle",
    "rarity": "common",
    "price": 0.29,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwi5Hf9Ttk6-egbZt5MvGDMWuZxuZi_rg4S3rqwxgltjyEy9r_cH7GbFBxXpd2RbEPukLtxoXgNOLg7gXe2thbjXKpZivzOLA"
  },
  {
    "id": "skin_203",
    "name": "AUG | Wings",
    "category": "Rifle",
    "rarity": "common",
    "price": 1.28,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwi5Hf9Ttk6fevfKxoMuOsD3KX_uJ_t-l9AX7qzE5_sGmEw9uoJCrBOgMoDsN2ReMI4EPrm4fvY-m04ASPgt8Uz3_gznQePzx-iqc"
  },
  {
    "id": "skin_204",
    "name": "AUG | Commando Company",
    "category": "Rifle",
    "rarity": "common",
    "price": 0.42,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwi5Hf9Ttk6f6ra695IeKdMWuZxuZi_rQwHHrlxRl_smzQn4qqIiqePAAmDcZyEbNYthW-k9y0Zem2swzbi9hbjXKptZgodME"
  },
  {
    "id": "skin_205",
    "name": "AUG | Navy Murano",
    "category": "Rifle",
    "rarity": "common",
    "price": 0.49,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwi5Hf9Ttk4ue8aapiH_KfG2KvzedxuPUnF3rgl0R-5DjXn4z7Ii_GbQEhC5VzQrNZuxW5l9ayY77g4gDa2tgWmzK-0H0vbAfLTQ"
  },
  {
    "id": "skin_206",
    "name": "AUG | Bengal Tiger",
    "category": "Rifle",
    "rarity": "epic",
    "price": 21.9,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwi5Hf9Ttk-_upbbZSLPmUBnPeme1z5LU7F3_gxk9xtj6Em4yveCrDOgIiW5cjRrIL5hnuk9TkM-rr5hue1dxoTofnTA"
  },
  {
    "id": "skin_207",
    "name": "AUG | Contractor",
    "category": "Rifle",
    "rarity": "common",
    "price": 0.62,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwi5Hf7i1k__-tV6hkJ_iHQGWWxOx04LlsGn7lwElytW3cnNihdnqTaFMhWJZxQeYLsUXpxoeyZOv8p1uJ4uPpmuk"
  },
  {
    "id": "skin_208",
    "name": "AUG | Colony",
    "category": "Rifle",
    "rarity": "common",
    "price": 0.69,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwi5Hf7i1k_OKva6FSLfGBB2mV_uJ_t-l9ASjnk0p06jmHmIyveCmWPFAiCZUlF-BcsEW4wYW2ZO3q4QLf3Y9NmC3gznQeEvKGZSQ"
  },
  {
    "id": "skin_209",
    "name": "AUG | Storm",
    "category": "Rifle",
    "rarity": "common",
    "price": 0.76,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwi5Hf7i1k_OaheqlrMv-dGlicyOl-pK84GCzkxEkisDnUz42qc32WaVckW5AhQeVYs0W9wIfuP7i34laK2d9G02yg2S19fQbA"
  },
  {
    "id": "skin_210",
    "name": "AUG | Creep",
    "category": "Rifle",
    "rarity": "common",
    "price": 2.4,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwi5Hf7i1e0PO7b5tuMvWWHlicyOl-pK9oSnnnkRl34WqBwtavcH6TagRxWZR2E7FYuhm9wIblZr60slHXjYtM02yg2RFs1ez8"
  },
  {
    "id": "skin_211",
    "name": "AUG | Daedalus",
    "category": "Rifle",
    "rarity": "common",
    "price": 0.89,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwi5Hf7jJk4_OscbZkLuSbXVicyOl-pK8wGyy3zEl25jjVwtareXqUbQN0CpZzTLNYuhm7kYe1MLy3tAzei4JG02yg2fD5c25_"
  },
  {
    "id": "skin_212",
    "name": "AUG | Condemned",
    "category": "Rifle",
    "rarity": "common",
    "price": 1.66,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwi5Hf7jJk4ve9YJtrL-KWHXOvx-dktd5lRi67gVNztmXQz92qcyiWPQAiDZZ1ELUD5kG8wNW0P762tVaMjopBxCX3jiMc8G81tDi9HBdS"
  },
  {
    "id": "skin_213",
    "name": "AUG | Sweeper",
    "category": "Rifle",
    "rarity": "common",
    "price": 1.03,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwi5Hf7jJk4ve9YJt-IfaWGn6Sze91u95lRi67gVNysGXWwt78dXmVawMnC5t5EeFftkTpk9S1Zu6xswbai4MWyy-rjngb8G81tGCvNXTC"
  },
  {
    "id": "skin_214",
    "name": "AUG | Radiation Hazard",
    "category": "Rifle",
    "rarity": "common",
    "price": 1.87,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwi5Hf7jJk4eelbbd5MvmDC1if0-94t-RWTjy0qhEutDWR1N__dX2WOlIoX8N4QOYDu0K6kILuM-m05ASP3YJFz3r3jy0buio_4uYcEf1yDazvhM4"
  },
  {
    "id": "skin_215",
    "name": "AWP | Fade",
    "category": "Sniper",
    "rarity": "legendary",
    "price": 273.75,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_CNk7uW-V6JsJPWsAm6Xyfo45-c5GXDnwB534DuEwtuoIHOfaAYiAsYjF-QItUaxmoC0MO_h5ALcjJUFk3sEzfdk4w"
  },
  {
    "id": "skin_216",
    "name": "AWP | Man-o'-war",
    "category": "Sniper",
    "rarity": "legendary",
    "price": 289,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_C9k7uW-V6NhL-KKMWuZxuZi_uM5HXG3xhh_t2iBnI2ucn3EZwEjDpJ0Q-dY5EPrxNTiYevj7gXa2IhbjXKpQIFOiXU"
  },
  {
    "id": "skin_217",
    "name": "AWP | PAW",
    "category": "Sniper",
    "rarity": "rare",
    "price": 10.57,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_C9k7uW-V7RsN-CSGVicyOl-pK84Tn-3xkgltWWGnI39c3LDaA4lD5V0QO8It0LqktfuMOrq7gDajYJG02yg2bUm5WIV"
  },
  {
    "id": "skin_218",
    "name": "AWP | Graphite",
    "category": "Sniper",
    "rarity": "epic",
    "price": 41.7,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_C9k7OC7ZbRhJc-RHGaGztF6ueZhW2e2k0l2sW_WzN7_cS6SbgV1CsF3TOEI4EOwloGzNLzg5g3fiIpHxC78kGoXuTqeOjwH"
  },
  {
    "id": "skin_219",
    "name": "AWP | Lightning Strike",
    "category": "Sniper",
    "rarity": "legendary",
    "price": 334.75,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_C9k4_upYLBjKf6UMWaH0dF6ueZhW2frwU1_sW2EmNyvc32RZwMpCpcjQ-EJ4xbtmt3gYezk4wzb3tpAy3mrkGoXubsGIfVN"
  },
  {
    "id": "skin_220",
    "name": "AWP | Silk Tiger",
    "category": "Sniper",
    "rarity": "epic",
    "price": 12,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_C9k-_upbbZ-H_KfG2KvzedxuPUnTXywkU1x4DvXztz_dH2WZlQkXMEhFrFY5BDrm9HhMurq4AfdiYxAnDK-0H0fPMTeBA"
  },
  {
    "id": "skin_221",
    "name": "AWP | Worm God",
    "category": "Sniper",
    "rarity": "rare",
    "price": 2.98,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_DNk7uW-V7B6Kf6WMWuZxuZi_uRoGH3iw0wh4j7cnt6ucSqSZwUkCMB5TLIPsES_kNbuYeOwtgXai4NbjXKpZ4kj0o0"
  },
  {
    "id": "skin_222",
    "name": "AWP | Black Box",
    "category": "Sniper",
    "rarity": "rare",
    "price": 3.45,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_DVL0PCiaadmH_KcFlicyOl-pK9tSXjikEgk6z-Ey9j9JXLDbFMhD8N4ELQJ5BLrk93hM-6ztg3WiI5E02yg2W_lAA_2"
  },
  {
    "id": "skin_223",
    "name": "AWP | Ice Coaled",
    "category": "Sniper",
    "rarity": "epic",
    "price": 16.95,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_DVL0PutbZtuL_GfC2OvzedxuPUnS3u3wR8lsTzTn4qqcXuXOlQmCpUiQOdYtUG_ltXgP-u04wWL3Y9NnjK-0H2dw8uldQ"
  },
  {
    "id": "skin_224",
    "name": "AWP | LongDog",
    "category": "Sniper",
    "rarity": "legendary",
    "price": 106,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_DVL0P6hZqNpL_esAm6Xyfo44rNtFi_kxhx-4WvWnImoJ3mTblJzDJFzR-QP4EK4m9XjZbvk7lCLiZUFk3u2JoT1UA"
  },
  {
    "id": "skin_225",
    "name": "AWP | Printstream",
    "category": "Sniper",
    "rarity": "legendary",
    "price": 121.25,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_DVL0OK8Yap5M-SBC2ad_uJ_t-l9AX_qlk4k5GyAzo6ocC-QZgZxX8AjEbZY5xnrxtPjM7vnsgGIj9oTmXngznQeg3pfcPs"
  },
  {
    "id": "skin_226",
    "name": "AWP | Queen's Gambit",
    "category": "Sniper",
    "rarity": "legendary",
    "price": 136.5,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_DVL0OO7baFjM8-UD2qSyPpJvOhuRz39kUpw42zWntiteSiVaQYhCJJzEeIOukSwl4XmPrmw4VHXjtpExC_33zQJsHjNnJgjQA"
  },
  {
    "id": "skin_227",
    "name": "AWP | Sovereign Flame",
    "category": "Sniper",
    "rarity": "legendary",
    "price": 151.75,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_DVL0OGhfqF_JfmUAFiWze97td5lRi67gVNz5zvRnN-qcHKfPFcjXpUmRuILukW9ldHlNOjn5Q2PitoWmSiv3C0a8G81tAj27FZA"
  },
  {
    "id": "skin_228",
    "name": "AWP | Chrome Cannon",
    "category": "Sniper",
    "rarity": "legendary",
    "price": 160,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_DVL0OarZbRoMvWXMWuZxuZi_uM6SXngxR5-smTXw4ugIi6RbVcpXsN1ELUDtxPrktOyNL7h4g2P2tpbjXKpKIbjbD4"
  },
  {
    "id": "skin_229",
    "name": "AWP | Asiimov",
    "category": "Sniper",
    "rarity": "legendary",
    "price": 125,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_jdk7uW-V6V-Kf2cGFidxOp_pewnF3nhxEt0sGnSzN76dH3GOg9xC8FyEORftRe-x9PuYurq71bW3d8UnjK-0H0YSTpMGQ"
  },
  {
    "id": "skin_230",
    "name": "AWP | Chromatic Aberration",
    "category": "Sniper",
    "rarity": "legendary",
    "price": 197.5,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_jdk7uW-V6dlMv-eD1iAyOB9j-1gSCGn2x50tT_Tm9f4cXORPA4oWJckFOMLtha_x9e1Nu-35QfbjYtHyiythitXrnE8ylr09zg"
  },
  {
    "id": "skin_231",
    "name": "AWP | Redline",
    "category": "Sniper",
    "rarity": "epic",
    "price": 30.15,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_jdk7uW-V6diIuKSMWuZxuZi_rUxHS3lzUwm5DjWy976dSiRagd1WJB1RLQP4RK-mtazM-3itQeL2INbjXKpw2eVIZ0"
  },
  {
    "id": "skin_232",
    "name": "AWP | Oni Taiji",
    "category": "Sniper",
    "rarity": "legendary",
    "price": 228,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_jdk7uW-V6xsLv6KD1icyOl-pK9vGCqwkx524G_WnNmsInyXOAVyXJJ0TbNb5EOxxIflYbzj4gDdiNlC02yg2XaKgrAq"
  },
  {
    "id": "skin_233",
    "name": "AWP | Hyper Beast",
    "category": "Sniper",
    "rarity": "epic",
    "price": 72,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_jdk7uW-V6x0MPWBMWWVwP1ij-1gSCGn20pxtm_WzNuoeHKeaFAnCZUiTe5bt0HqxofmZOrm5Q2IjoMQzS_5iShXrnE8NzWs__c"
  },
  {
    "id": "skin_234",
    "name": "AWP | Elite Build",
    "category": "Sniper",
    "rarity": "epic",
    "price": 35.1,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_jdk7uW-V6lsM-SWHH6vzedxuPUnSnHmk0Qh4G6HmN-scXmSaQRxXJpwRuZYsxTqxtTnM7nl4gTW2dlFyjK-0H0d8XeEBg"
  },
  {
    "id": "skin_235",
    "name": "AWP | Neo-Noir",
    "category": "Sniper",
    "rarity": "epic",
    "price": 45,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_jdk7uW-V6poL_6cB3WvzedxuPUnHirrxR4l423SyI39I3KXPwdxWZclQeNZ5EXskYfnNeyw71OMi9lNzDK-0H3r66pOTw"
  },
  {
    "id": "skin_236",
    "name": "AWP | Fever Dream",
    "category": "Sniper",
    "rarity": "epic",
    "price": 38.4,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_jdk7uW-V7R-OfObAXeR1eZJvOhuRz39kE1w4jiAzNiod3qTOgcgXpAlQ-ML5hjqxtHjZOrrtlHWit9EyCj9iDQJsHhCZP-wUg"
  },
  {
    "id": "skin_237",
    "name": "AWP | Capillary",
    "category": "Sniper",
    "rarity": "common",
    "price": 3.52,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_jdk7uW-V7JoKf6sAm6Xyfo44bE5HSrmlx5z4GTUzt__I3yebQAgA8R3FuFfsBTqx9W2Y7vq5lbfjZUFk3ugIlCuqg"
  },
  {
    "id": "skin_238",
    "name": "AWP | Atheris",
    "category": "Sniper",
    "rarity": "rare",
    "price": 11.05,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_jdk7uW-V7JkMPWBMWuZxuZi_rZsS3zgzU8isW3dnIr6eHKfPVAhDpojEe9YsUW4xta1Nuzm5FDci4NbjXKpmWVQppo"
  },
  {
    "id": "skin_239",
    "name": "AWP | Containment Breach",
    "category": "Sniper",
    "rarity": "legendary",
    "price": 140,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_jdk7uW-V7JkMuWAMWuZxuZi_rQ6SXq1xURysj_Vw4uhJHOVPQ8oCZt4QrRbtRi6ldPlPu_g4FHaiYNbjXKpcPI_17A"
  },
  {
    "id": "skin_240",
    "name": "AWP | Wildfire",
    "category": "Sniper",
    "rarity": "epic",
    "price": 88,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_jdk7uW-V7NkLPSVB3WV_uJ_t-l9AX7rxhl-tmzSwomtdC6TPwQnW5UkR-YD5kK-ltCzP-Ox4FfXiNoQyyrgznQeu9L0PzQ"
  },
  {
    "id": "skin_241",
    "name": "AWP | Corticera",
    "category": "Sniper",
    "rarity": "epic",
    "price": 13.65,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_jdk6fO4bahsH_GEHlicyOl-pK8xTSzqwU1-5jjWno6hJHyeOg91A5R2TOEOtRS-kIG2ZeO25lDYg90U02yg2USK57Qn"
  },
  {
    "id": "skin_242",
    "name": "AWP | Dragon Lore",
    "category": "Sniper",
    "rarity": "ancient",
    "price": 4200,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_jdk4veqYaF7IfysCnWRxuF4j-B-Xxa_nBovp3Pdwtj9cC_GaAd0DZdwQu9fuhS4kNy0NePntVTbjYpCyyT_3CgY5i9j_a9cBkcCWUKV"
  },
  {
    "id": "skin_243",
    "name": "AWP | Medusa",
    "category": "Sniper",
    "rarity": "legendary",
    "price": 2100,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_jdk4veqfbdsH_GEHlicyOl-pK85TC23wk12tWSGnNr6JXqRPVUnA5J5RLIKshS-l4HuYbji7lfajdgU02yg2bOcOBD3"
  },
  {
    "id": "skin_244",
    "name": "AWP | Crakow!",
    "category": "Sniper",
    "rarity": "epic",
    "price": 18.6,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_jdk4OSrerRsM-OsDXWRyuFhj-B-Xxa_nBovp3OAyd34cC2VOgUoCZYmF7UCthm_kdGyMry05wHa3t0XxH_23XhP7y9q_a9cBncOjtH9"
  },
  {
    "id": "skin_245",
    "name": "AWP | Green Energy",
    "category": "Sniper",
    "rarity": "epic",
    "price": 20.25,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf_jde0Pi7ZbRSLPmdC1icyOl-pK8wTCzlxkl_tm7Vz9j6cnLEOA91C5siTOBYsRWwxtC2MOzj5g2I3Y4W02yg2VFgswq6"
  },
  {
    "id": "skin_246",
    "name": "AWP | Mortis",
    "category": "Sniper",
    "rarity": "epic",
    "price": 21.9,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf-jFk7uW-V6BoIeSbMWuZxuZi_rNtHiuwwRwismWEnNn8JymSZgUiDpd3Ru9ZsxG-xNy2NLzn41DWg41bjXKp5oOAt0A"
  },
  {
    "id": "skin_247",
    "name": "AWP | The Prince",
    "category": "Sniper",
    "rarity": "legendary",
    "price": 2800,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf-jFk7uW-V6FjIf2WAlicyOl-pK9qHXHkw093sGvTw4uqJSnDPQAkCsNyEbZcshiwxtK0Yumz4gbX2o9C02yg2f5NtC8l"
  },
  {
    "id": "skin_248",
    "name": "AWP | Exoskeleton",
    "category": "Sniper",
    "rarity": "rare",
    "price": 6.3,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf-jFk7uW-V6F1L-OYC2uV1eF4j-1gSCGn20km5zyEmd2qc3uWZwcnA5MiELIJtxa_w9OyN-nh5wKKj4kTyn78hyNXrnE83OTew2I"
  },
  {
    "id": "skin_249",
    "name": "AWP | Gungnir",
    "category": "Sniper",
    "rarity": "ancient",
    "price": 5200,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf-jFk7uW-V6N4LvedB3WvzedxuPUnHnjnzUl0sWrdztitI3rDZgJzAsZ1QOFY4UPqldDgMO_l41HXit9AmTK-0H227dAsvQ"
  },
  {
    "id": "skin_250",
    "name": "AWP | Desert Hydra",
    "category": "Sniper",
    "rarity": "legendary",
    "price": 1650,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf-jFk7uW-V6x0JOKSMWuZxuZi_uA7Syu2w0Ry4mqGzYypeH3DaAEnCpt0FuAK4RjrkoDgMb7mtFfcit5bjXKpX4RFZcA"
  },
  {
    "id": "skin_251",
    "name": "AWP | Duality",
    "category": "Sniper",
    "rarity": "epic",
    "price": 30.15,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf-jFk7uW-V6hkLfKcMXSewOVzj-1gSCGn20p_62-HnN7_cH-XblQjDZYhR-FZsETqmoXjYry2s1DX3d5AyyT62ipXrnE8bpg5yZk"
  },
  {
    "id": "skin_252",
    "name": "AWP | Phobos",
    "category": "Sniper",
    "rarity": "rare",
    "price": 8.2,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf-jFk7uW-V7RlL_KcHVicyOl-pK84GXHmwk115D6GzdqudHyUbwRxW5R3ROZbtEG8wYDiY7-x5VOKgotB02yg2bdJjfAf"
  },
  {
    "id": "skin_253",
    "name": "AWP | Black Nile",
    "category": "Sniper",
    "rarity": "common",
    "price": 2.88,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf-jFk7uW-V7d5Mv-dC1icyOl-pK89Gyvhlhsit2-BwoyrICmWPQcmDpEkQOdeskOxwNKzN7vm4VeP2oMR02yg2Z2CmmVC"
  },
  {
    "id": "skin_254",
    "name": "AWP | CMYK",
    "category": "Sniper",
    "rarity": "legendary",
    "price": 258.5,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf-jFk5vyqbbRoLvSWMWaH0dF6ueZhW2e1zElxtmzQmIv8J3qQalRzW5t0RrYOsBCwlte2Mbmw5AbXiYlAnnn4kGoXuYBQOb0Q"
  },
  {
    "id": "skin_255",
    "name": "AWP | BOOM",
    "category": "Sniper",
    "rarity": "epic",
    "price": 36.75,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf9Ttk7f6vZZt-Kf2DAmKvzedxuPUnTX7mkxhy62iDzYqhdiqXbw4oWZEkE-IDsRa9lIXlMejktFOMi49MmDK-0H2AgUnw_w"
  },
  {
    "id": "skin_256",
    "name": "AWP | Pink DDPAT",
    "category": "Sniper",
    "rarity": "rare",
    "price": 10.1,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf9Ttk6_a-abBSMPmdBVicyOl-pK9qHXC2zUpz5DiBn9arJCmXOFd0DZpxQOUDtBC6wNK0MOzl4wXWjYpG02yg2c9nQ1pb"
  },
  {
    "id": "skin_257",
    "name": "AWP | Electric Hive",
    "category": "Sniper",
    "rarity": "epic",
    "price": 40.05,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf9Ttk5_u4bZthKfebGinElLtytLVtG362x05wsWyByt2scHrGOgd1WZJ1ROBc4xi_ld3gNO7g-UWA3Kwc2RVq"
  },
  {
    "id": "skin_258",
    "name": "AWP | Acheron",
    "category": "Sniper",
    "rarity": "common",
    "price": 3.68,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf9Ttk4eetZKFsMs-ABXKczf1JouRtTSWmkCIrujqNjsH4eC-ROFMkDccjR7EDsBCxlN2xZu7jtlaNj4pMxSr8hiIc53tt67kHT-N7rafi4HxI"
  },
  {
    "id": "skin_259",
    "name": "AWP | Pit Viper",
    "category": "Sniper",
    "rarity": "rare",
    "price": 11.53,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf9Ttk_PyvY6F-K_mdMWuZxuZi_rQ_GS3mxRwk4jvTyNv6eC-RPQV1W5AlTOZb4xLtw9fuNriw51Hd3otbjXKp4cSTTIs"
  },
  {
    "id": "skin_260",
    "name": "AWP | POP AWP",
    "category": "Sniper",
    "rarity": "rare",
    "price": 2.5,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf9Ttk-_etYKpiN_GBMXWHw9F6ueZhW2fikxgjtmjTzd-ucXOXbgEiCZN1QOcKtka_l9PgY7jrswbe2t5NyC_6kGoXuXrlRr9k"
  },
  {
    "id": "skin_261",
    "name": "AWP | Arsenic Spill",
    "category": "Sniper",
    "rarity": "common",
    "price": 0.96,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf9Ttk-fO8YadsLf-sHW6d0eJzj_hsQyW8giIrujqNjsH8eS2ePANxXJN3Q-NbtxDtkNexMeri5lfd3doTnij7hiJMuy5jtutQT-N7rTqLZycV"
  },
  {
    "id": "skin_262",
    "name": "AWP | Sun in Leo",
    "category": "Sniper",
    "rarity": "common",
    "price": 0.61,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf9Ttk9f2qYaVucs-fB2CY1aAnteVqHCzgkRsh4TnXyY2vIH-QaVcpA5F3TOdct0S_wNO0Zri05wbXlcsbmn9hB4gb"
  },
  {
    "id": "skin_263",
    "name": "AWP | Exothermic",
    "category": "Sniper",
    "rarity": "rare",
    "price": 3.92,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf9Tte0PSneqF6L-KYMXeR1e1-tfJWQyC0nQlp4W7Xzd-qcH_DO1N0W5FzQuEP5kW8ltfnM-q24wzYgt0RmC_7jSlL5jErvbgX7dER8Q"
  },
  {
    "id": "skin_264",
    "name": "AWP | The End",
    "category": "Sniper",
    "rarity": "epic",
    "price": 18.6,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf7i1e0PC5V7BlJc-WAGOvwPlmj-1gSCGn20hytjzSy4r_cy_FZlB1DJdxE7QN50bql4LuNL7g4gTYj9lGnir9iyJXrnE8dWNkiOM"
  },
  {
    "id": "skin_265",
    "name": "AWP | Safari Mesh",
    "category": "Sniper",
    "rarity": "common",
    "price": 0.93,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf7jJk4ve9YJt5If6sAm6Xyfo45uU7HS_nzU914z_dzImtdXyQZlMjCJIkFOUI5ES9k9PkPriz71bdiJUFk3tlgygeXw"
  },
  {
    "id": "skin_266",
    "name": "AWP | Snake Camo",
    "category": "Sniper",
    "rarity": "common",
    "price": 1.76,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLwiYbf7jJk_PyvY6FSLPmUBnPexb10sbk8HXixk09-smqEyIytci7GPwFxCZt0RLMLtBG4xNHuPr-3tRue1dy_ONei3w"
  },
  {
    "id": "skin_267",
    "name": "★ Bayonet | Fade",
    "category": "Knife",
    "rarity": "mythic",
    "price": 1000,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzn4_v8ydP0POvV6JsJPWsAm6Xyfo45-BrHniwzUh24jjVm4qgInnCOA4mDscmEeVcsBXtkN22P-yx5waNg5UFk3tAoG85FQ"
  },
  {
    "id": "skin_268",
    "name": "★ Bayonet | Doppler",
    "category": "Knife",
    "rarity": "mythic",
    "price": 1025,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzn4_v8ydP0POjV6ZhIfOYHmKR0-JJveB7TSW2nAcitwKJk4jxNWWVZ1AmDJIlQuZcu0btx9e0Y-205gOL3dhGzS333CpBvHxi6ucEBfcg5OSJ2MqXuBCE"
  },
  {
    "id": "skin_269",
    "name": "★ Bayonet | Gamma Doppler",
    "category": "Knife",
    "rarity": "mythic",
    "price": 1050,
    "image": "https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpotLu8JAllx8zJfAJH4dmklYyPqPr1Ibndk2JL7cFOhuDG_Zi73VG2qUQ_am36LNKWcwM2Ml3X_FS8wL3vhMC0vJXOn3ZkuSAl7HiOmwv3308XDHXucw"
  },
  {
    "id": "skin_270",
    "name": "★ Bayonet | Marble Fade",
    "category": "Knife",
    "rarity": "mythic",
    "price": 1075,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzn4_v8ydP0POjV6lsMvKfC1iWwOpzj-1gSCGn2xhysWrTn42rdH2SawQnDccjE-ELsxa-mtTjMejr7wXZgoxFn3n2hnhXrnE8oMvxYMA"
  },
  {
    "id": "skin_271",
    "name": "★ Bayonet | Freehand",
    "category": "Knife",
    "rarity": "mythic",
    "price": 1100,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzn4_v8ydP0POjV6lsMvuWCliF0dF6ueZhW2e1zUh36zuEnteqeSqTOlUnXMYhFOcDuxfpkIblM-zj4gSLi45EniSqkGoXuTHKXCgo"
  },
  {
    "id": "skin_272",
    "name": "★ Bayonet | Slaughter",
    "category": "Knife",
    "rarity": "mythic",
    "price": 1125,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzn4_v8ydP0POjV75oIuKSMWuZxuZi_uU7HyjhwUh-tm_Xydmuc3nGbwN2ApAmQeNfsUXtktOzYuLm5FPajN9bjXKpLQ8HVlE"
  },
  {
    "id": "skin_273",
    "name": "★ Bayonet | Tiger Tooth",
    "category": "Knife",
    "rarity": "mythic",
    "price": 1150,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzn4_v8ydP0POgV7BkJ_WBMWiCwOBxtd5lRi67gVMhsGrTntn4ci-ROAYlXMBwE7YL5BaxxIHjY-vq7w3X398RxS78iylK8G81tBow9RWL"
  },
  {
    "id": "skin_274",
    "name": "★ Bayonet | Blue Steel",
    "category": "Knife",
    "rarity": "mythic",
    "price": 1175,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzn4_v8ydP0PO_V6ZhNfWXMWuZxuZi_rgwTH21kxt24TvXwo6vdXmfbgdyDpV5RORYuxS5m4KzY7605FPejohbjXKpq_wJOWQ"
  },
  {
    "id": "skin_275",
    "name": "★ Bayonet | Damascus Steel",
    "category": "Knife",
    "rarity": "mythic",
    "price": 1200,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzn4_v8ydP0PO_V6BsLfGADXKD_uJ_t-l9ASu2zE904DnQyY34JSrGPQAmDsdxQ7MKsRK7k9CxNLnnswDY2tpNmCzgznQe52NAd0k"
  },
  {
    "id": "skin_276",
    "name": "★ Bayonet | Stained",
    "category": "Knife",
    "rarity": "mythic",
    "price": 1225,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzn4_v8ydP0PO_V6JiMvOWClicyOl-pK88SSq1xEV35muBm9qvcSrDbgZzDZVwROAM5EOwldflZbu27wWN2IhM02yg2UseboeH"
  },
  {
    "id": "skin_277",
    "name": "★ Bayonet | Case Hardened",
    "category": "Knife",
    "rarity": "mythic",
    "price": 1250,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzn4_v8ydP0PO_V6tkLPWXMWuZxuZi_uRrSXDlzUtw4WTRwtj4eX6XPAd0XsEiROcNthm-w4HhP-Pq7waKiItbjXKppDMdu0I"
  },
  {
    "id": "skin_278",
    "name": "★ Bayonet | Rust Coat",
    "category": "Knife",
    "rarity": "mythic",
    "price": 1275,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzn4_v8ydP0PO_V7d5JfWfMWyeyOhzj-xsSyCmmFN0tWzXntuhJHyROw8jWMAhQeFf4ELrlYC1Me_r4QCN3d1HyX38hn8b8G81tKs8v05y"
  },
  {
    "id": "skin_279",
    "name": "★ Bayonet | Lore",
    "category": "Knife",
    "rarity": "mythic",
    "price": 1300,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzn4_v8ydP0PG7V6ZsOf-dC3OvzeFktd5lRi67gVMj5GnXzt__JH-SawdyDJF1ROcCu0K5xNOxZeqx5AOI2oNGnnn23ylJ8G81tNZRAs3w"
  },
  {
    "id": "skin_280",
    "name": "★ Bayonet | Black Laminate",
    "category": "Knife",
    "rarity": "mythic",
    "price": 450,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzn4_v8ydP0PG7V6ZsOf-dC3Ov0vp5vuR-Tjq7qhEutDWR1Nr6IHuXOgMkWcQiQ7YK5hG7wYfgYuOx5gSN2YNCyHn-2Cof5i5isL0cEf1yJefVwLI"
  },
  {
    "id": "skin_281",
    "name": "★ Bayonet | Autotronic",
    "category": "Knife",
    "rarity": "mythic",
    "price": 475,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzn4_v8ydP0PW9V6ZsOf-dC3OvwPtiv_V7QCe6liIrujqNjsGodirBZlckD5B1FLMDtka7m9DuZL7i4ADf39lNxSqqjXgc5ihstrkAT-N7rfe3-Xhk"
  },
  {
    "id": "skin_282",
    "name": "★ Bayonet | Forest DDPAT",
    "category": "Knife",
    "rarity": "mythic",
    "price": 500,
    "image": "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzn4_v8ydP0Pq3V6BpMPGHMWuZxuZi_rZrTSu3kxt_t2vSnN-rcn-SOA51WJN3Q7YMuxa9kdHlM77q4wKI2o5bjXKpkgWK6yM"
  }
];

// Merge with modular cosmetics data if loaded
if (typeof mergeAllCosmeticsIntoCatalog === 'function') {
  ITEM_CATALOG = mergeAllCosmeticsIntoCatalog(ITEM_CATALOG);
}

// Default starter inventory for players (Weapons with float, stickers and charms)
const DEFAULT_USER_INVENTORY = [
  { ...ITEM_CATALOG.find(i => i.name === 'P250 | Sand Dune') || ITEM_CATALOG[12], instanceId: 'inst_1' },
  { ...ITEM_CATALOG.find(i => i.name === 'Glock-18 | High Beam') || ITEM_CATALOG[11], instanceId: 'inst_2' },
  { ...ITEM_CATALOG.find(i => i.name === 'USP-S | Lead Conduit') || ITEM_CATALOG[10], instanceId: 'inst_3' },
  { ...ITEM_CATALOG.find(i => i.name === 'AK-47 | Slate') || ITEM_CATALOG[9], instanceId: 'inst_4' },
  { ...ITEM_CATALOG.find(i => i.name === 'M4A4 | Evil Daimyo') || ITEM_CATALOG[8], instanceId: 'inst_5' },
  { ...ITEM_CATALOG.find(i => i.name === 'AK-47 | Redline') || ITEM_CATALOG[7], instanceId: 'inst_6' },
  { ...ITEM_CATALOG.find(i => i.name === 'AWP | Neo-Noir') || ITEM_CATALOG[6], instanceId: 'inst_7' },
  { ...ITEM_CATALOG.find(i => i.id === 'sticker_titan_holo') || { id: 'sticker_titan_holo', name: 'Sticker | Titan (Holo)', price: 45000, rarity: 'ancient', image: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzn4_v8ydP0P27V6VsOf-fC2O52_J0uL9qSnK-rBhptWzZy936In-Tbw8kB9QjE947f_s2YIrg7g', type: 'sticker' }, instanceId: 'inst_sticker_1' },
  { ...ITEM_CATALOG.find(i => i.id === 'charm_semi_precious') || { id: 'charm_semi_precious', name: 'Charm | Semi-Precious', price: 320, rarity: 'legendary', image: 'https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGIGz3UqlXOLrxM-vMGmW8VNxu5Dx60noTyLzn4_v8ydP0PW5V6FmPPCGDGWn0fB_teR_Ti6j8Fk44WiC84_8cnGUbwJ1CZV4ErY5f_tnYIrv0l1q', type: 'charm' }, instanceId: 'inst_charm_1' }
];

if (typeof window !== 'undefined') {
  window.RARITIES = RARITIES;
  window.ITEM_CATALOG = ITEM_CATALOG;
  window.DEFAULT_USER_INVENTORY = DEFAULT_USER_INVENTORY;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    RARITIES,
    ITEM_CATALOG,
    DEFAULT_USER_INVENTORY
  };
}
