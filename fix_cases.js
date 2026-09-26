const fs = require('fs');

const casesText = `const CASES_CATALOG = [
  {
    id: "case_charms",
    name: "Chroma 2 Case",
    price: 350.00,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJKz2lu_XsnXwtmkJjSU91dh8bj35VTqVBP4io_fqmwOuKD2PqI6caDBWDeUkO8uteM9SnDglklw6miEn9j6IHKfblNxA5pxW6dU5UH4LtBe",
    description: "Оригінальний кейс із класичними скінами та шармиками.",
    type: "case",
    containsType: "charm"
  },
  {
    id: "case_stickers",
    name: "Gamma Case",
    price: 150.00,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJKz2lu_XsnXwtmkJjSU91dh8bj35VTqVBP4io_frHEVtvP5bPZrd6XECmOSxe0v4bRoTnnjwBkitWrRm4yoeX3GagMnCZZ2FPlK7EcEv22BnQ",
    description: "Кейс із яскравими скінами та рідкісними наліпками.",
    type: "case",
    containsType: "sticker"
  },
  {
    id: "case_dreams",
    name: "Dreams & Nightmares Case",
    price: 450.00,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJKz2lu_XsnXwtmkJjSU91dh8bj35VTqVBP4io_frnIV7Kb5OaU-JqfHDzXFle0u4LY8Gy_kkRgisGzcm4v4J3vDOAQmDMdyRvlK7EcmeCU3yw",
    description: "Ексклюзивний кейс із топовими скінами (Gamma Doppler).",
    type: "case",
    containsType: "dreams"
  },
  {
    id: "case_grail",
    name: "Operation Bravo Case",
    price: 2500.00,
    image: "https://community.akamai.steamstatic.com/economy/image/i0CoZ81Ui0m-9KwlBY1L_18myuGuq1wfhWSaZgMttyVfPaERSR0Wqmu7LAocGJKz2lu_XsnXwtmkJjSU91dh8bj7-lz1QAn4kZjf9CsVuvf7OfQ5IabBVzbHlb915bcwHCjikEp_sTnTn4z6eH6RblQlC8RwFPlK7EdXSP0Ibg",
    description: "Легендарний кейс. Високі шанси на Covert.",
    type: "case",
    containsType: "grail"
  }
];`;

let content = fs.readFileSync('cosmetics_data.js', 'utf8');
content = content.replace(/const CASES_CATALOG = \[\s*\{[\s\S]*?\];/, casesText);
fs.writeFileSync('cosmetics_data.js', content, 'utf8');
console.log('Fixed cosmetics_data.js');
