/* ===== 1. Ma'lumotlar =====
   n: [rus, o'zbek] nomi, d: [rus, o'zbek] izoh, img: Pexels rasm raqami */
const px = (id, w = 800) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

const SERVICES = [
  { n: ["Модельная стрижка", "Modelli soch olish"],        price: 100000, cat: "soch",      img: 2775272 },
  { n: ["Классическая стрижка", "Klassik soch olish"],     price: 80000,  cat: "soch",      img: 2061820 },
  { n: ["Детская стрижка", "Bolalar soch olishi"],         price: 60000,  cat: "soch",      img: 4969874, d: ["до 10 лет", "10 yoshgacha"] },
  { n: ["Моделирование бороды", "Soqol modellash"],        price: 50000,  cat: "soqol",     img: 2849402 },
  { n: ["Королевское бритьё", "Qirollik soqol olish"],     price: 70000,  cat: "soqol",     img: 2035308 },
  { n: ["Укладка", "Ukladka"],                             price: 60000,  cat: "soch",      img: 2076932 },
  { n: ["Окантовка", "Okantovka"],                         price: 50000,  cat: "soch",      img: 1860567 },
  { n: ["Камуфляж головы", "Bosh kamuflyaji"],             price: 50000,  cat: "soch",      img: 2035227 },
  { n: ["Камуфляж бороды", "Soqol kamuflyaji"],            price: 40000,  cat: "soqol",     img: 2849402 },
  { n: ["Уход за кожей лица", "Yuz terisi parvarishi"],    price: 140000, cat: "parvarish", img: 7518734 },
  { n: ["Стрижка отец и сын", "Ota va o'g'il"],            price: 140000, cat: "kombo",     img: 1813272, d: ["стрижка для двоих", "ikkalasiga soch olish"] },
  { n: ["Комплексное удаление воском", "Mum bilan tozalash"], price: 80000, cat: "parvarish", img: 39177405, d: ["нос, уши, брови, щёки", "burun, quloq, qosh, yonoq"] },
];

/* ===== 2. Tarjimalar =====
   HTML dagi data-i18n="kalit" ga shu yerdagi matn qo'yiladi */
const T = {
  ru: {
    title: "r.barbers — мужская парикмахерская",
    n_price: "Цены", n_contact: "Контакты", n_book: "Записаться",
    h1a: "Не стрижка,", h1b: "а репутация",
    lead: "Дух классической барбершоп-мастерской и современный стиль. Мастера подберут стрижку под форму вашего лица, а остальное скажет зеркало.",
    cta1: "Записаться", cta2: "Смотреть цены",
    t_all: "Все", t_hair: "Стрижки", t_beard: "Борода", t_care: "Уход", t_combo: "Комбо",
    h_price: "Цены",
    h_book: "Кресло ждёт вас",
    i_hours: "Часы работы", i_hours_v: "Ежедневно с 09:00 до 21:00",
    i_phone: "Телефон", arman: "Арман", i_map: "Открыть в Google Maps",
    open: "Сейчас открыто, до 21:00", closed: "Сейчас закрыто, откроемся в 09:00",
    cur: "сум",
  },
  uz: {
    title: "r.barbers — erkaklar soch turmagi",
    n_price: "Narxlar", n_contact: "Aloqa", n_book: "Yozilish",
    h1a: "Soch emas,", h1b: "obro' yasaymiz",
    lead: "Klassik ustaxona ruhi, zamonaviy uslub. Ustalarimiz yuz shaklingizga mos qirqimni topadi, qolganini ko'zgu aytadi.",
    cta1: "Bog'lanish", cta2: "Narxlarni ko'rish",
    t_all: "Hammasi", t_hair: "Soch", t_beard: "Soqol", t_care: "Parvarish", t_combo: "Kombo",
    h_price: "Narxlar",
    h_book: "Kreslo sizni kutmoqda",
    i_hours: "Ish vaqti", i_hours_v: "Har kuni 09:00 dan 21:00 gacha",
    i_phone: "Telefon", arman: "Arman", i_map: "Google Maps'da ochish",
    open: "Hozir ochiq, 21:00 gacha", closed: "Hozir yopiq, 09:00 da ochiladi",
    cur: "so'm",
  },
};

const $ = (s) => document.querySelector(s);
const fmt = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " "); // 100000 -> "100 000"

let lang = "ru";   // standart til — rus
let cat = "all";   // tanlangan toifa
try { lang = localStorage.getItem("lang") || "ru"; } catch (e) {}
if (!T[lang]) lang = "ru";
const idx = () => (lang === "ru" ? 0 : 1); // n va d massivlarida qaysi element
const tr = (k) => T[lang][k];

/* ===== 3. Narxlar: rasmli kartochkalar ===== */
const menu = $("#menu");
function render() {
  menu.innerHTML = SERVICES
    .filter((s) => cat === "all" || s.cat === cat)
    .map((s) => `
      <li class="row">
        <img class="thumb" src="${px(s.img, 600)}" alt="" loading="lazy" onerror="this.remove()">
        <span class="name">${s.n[idx()]}${s.d ? `<small>${s.d[idx()]}</small>` : ""}</span>
        <span class="price">${fmt(s.price)}<small>${tr("cur")}</small></span>
      </li>`)
    .join("");
}

$("#tabs").addEventListener("click", (e) => {
  const tab = e.target.closest(".tab");
  if (!tab) return;
  cat = tab.dataset.cat;
  document.querySelectorAll(".tab").forEach((t) => t.setAttribute("aria-selected", t === tab));
  render();
});

/* ===== 4. Til almashtirish ===== */
function updateOpen() {
  const h = new Date().getHours(), open = h >= 9 && h < 21; // ish vaqti 09:00–21:00
  $("#open").classList.toggle("closed", !open);
  $("#open span").textContent = open ? tr("open") : tr("closed");
}

function setLang(l) {
  lang = l;
  try { localStorage.setItem("lang", l); } catch (e) {}
  document.documentElement.lang = l;
  document.title = tr("title");
  document.querySelectorAll("[data-i18n]").forEach((el) => (el.textContent = tr(el.dataset.i18n)));
  document.querySelectorAll(".lang button").forEach((b) => b.setAttribute("aria-pressed", b.dataset.lang === l));
  render(); updateOpen();
}
document.querySelectorAll(".lang button").forEach((b) => b.addEventListener("click", () => setLang(b.dataset.lang)));

/* ===== 5. Dark / Light ===== */
$("#theme").addEventListener("click", () => {
  const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  try { localStorage.setItem("theme", next); } catch (e) {}
});

setLang(lang); // sahifa ochilganda tanlangan tilni qo'llash