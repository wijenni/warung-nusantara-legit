/* ============================================
   WARUNG NUSANTARA — logic
   ============================================ */

// ---------- Data menu ----------
const MENU_DATA = [
  { id: 1, category: "berat", region: "Sumatra Barat", name: "Rendang Daging Sapi", desc: "Daging sapi dimasak berjam-jam dengan santan dan rempah hingga kering dan empuk.", price: 38000, sold: 482, image: "images/rendang-daging-sapi.jpg" },
  { id: 2, category: "berat", region: "Yogyakarta", name: "Nasi Gudeg Komplit", desc: "Gudeg nangka muda, telur, ayam suwir, dan sambal krecek khas Jogja.", price: 27000, sold: 265, image: "images/nasi-gudeg-komplit.jpg" },
  { id: 3, category: "berat", region: "Sumatra Barat", name: "Nasi Padang Rames", desc: "Nasi dengan pilihan lauk khas Padang: rendang, ayam pop, dan sayur nangka.", price: 32000, sold: 398, image: "images/nasi-padang-rames.jpg" },
  { id: 4, category: "berat", region: "Jawa Timur", name: "Pecel Lele Sambal Terasi", desc: "Lele goreng renyah disajikan dengan lalapan dan sambal terasi pedas.", price: 22000, sold: 211, image: "images/pecel-lele.jpg" },
  { id: 5, category: "berat", region: "Jawa Tengah", name: "Nasi Liwet Solo", desc: "Nasi gurih dengan suwiran ayam, telur pindang, dan sayur labu siam.", price: 24000, sold: 173, image: "images/nasi-liwet-solo.jpg" },
  { id: 6, category: "sate", region: "Jawa Tengah", name: "Sate Ayam Bumbu Kacang", desc: "Sate ayam bakar dengan siraman bumbu kacang manis dan kecap.", price: 26000, sold: 356, image: "images/sate-ayam.jpg" },
  { id: 7, category: "sate", region: "Jawa Tengah", name: "Sate Kambing Muda", desc: "Daging kambing muda empuk dibakar dengan bumbu kecap dan bawang.", price: 34000, sold: 149, image: "images/sate-kambing.jpg" },
  { id: 8, category: "sate", region: "Nusa Tenggara Barat", name: "Ayam Bakar Taliwang", desc: "Ayam bakar khas Lombok dengan bumbu pedas manis yang meresap.", price: 30000, sold: 187, image: "images/ayam-bakar-taliwang.jpg" },
  { id: 9, category: "sup", region: "Jawa Timur", name: "Soto Ayam Lamongan", desc: "Kuah kuning gurih dengan suwiran ayam, koya, dan telur rebus.", price: 21000, sold: 302, image: "images/soto-ayam-lamongan.jpg" },
  { id: 10, category: "sup", region: "DKI Jakarta", name: "Sop Buntut Bakar", desc: "Buntut sapi empuk dalam kuah rempah, disajikan dengan pilihan bakar.", price: 42000, sold: 96, image: "images/sop-buntut-bakar.jpg" },
  { id: 11, category: "sup", region: "Sulawesi Selatan", name: "Coto Makassar", desc: "Sup daging dan jeroan sapi dengan bumbu kacang khas Makassar.", price: 29000, sold: 134, image: "images/coto-makassar.jpg" },
  { id: 12, category: "jajanan", region: "Jawa", name: "Klepon Gula Merah", desc: "Bola ketan isi gula merah cair berbalut kelapa parut.", price: 12000, sold: 221, image: "images/klepon.jpg" },
  { id: 13, category: "jajanan", region: "Nusantara", name: "Risoles Mayo Sosis", desc: "Kulit lumpia lembut isi sosis, telur, dan mayones.", price: 14000, sold: 198, image: "images/risoles-mayo-sosis.jpg" },
  { id: 14, category: "jajanan", region: "Nusantara", name: "Pisang Goreng Crispy", desc: "Pisang kepok digoreng dengan tepung crispy, disajikan hangat.", price: 13000, sold: 176, image: "images/pisang-goreng.jpg" },
  { id: 15, category: "jajanan", region: "Jawa Barat", name: "Combro Isi Oncom", desc: "Singkong parut isi oncom pedas, digoreng garing di luar.", price: 11000, sold: 88, image: "images/combro-oncom.jpg" },
  { id: 16, category: "minuman", region: "Jawa Barat", name: "Es Cendol Durian", desc: "Cendol khas dengan santan, gula aren, dan tambahan durian asli.", price: 15000, sold: 267, image: "images/es-cendol-durian.jpg" },
  { id: 17, category: "minuman", region: "Jawa Tengah", name: "Wedang Ronde Jahe", desc: "Ronde ketan isi kacang dalam kuah jahe hangat.", price: 14000, sold: 121, image: "images/wedang-ronde.jpg" },
  { id: 18, category: "minuman", region: "Nusantara", name: "Es Teh Tarik", desc: "Teh susu ditarik hingga berbusa lembut, disajikan dingin.", price: 10000, sold: 341, image: "images/es-teh-tarik.jpg" },
  { id: 19, category: "minuman", region: "Jawa", name: "Jamu Kunyit Asam", desc: "Minuman herbal segar dari kunyit, asam jawa, dan sedikit madu.", price: 12000, sold: 102, image: "images/jamu-kunyit-asam.jpg" },
];

const TOP_RANKING_COUNT = 5;
const MAX_CARD_QTY = 20;

// ---------- State ----------
let currentCategory = "semua";
let currentSearch = "";
const cart = {}; // { lineKey: { id, qty, note } }
const cardQty = {}; // { id: currentQtyOnCard } — kuantitas yang sedang dipilih di kartu sebelum ditambahkan

// ---------- Helpers ----------
function formatRupiah(number) {
  return "Rp" + number.toLocaleString("id-ID");
}

function findMenuItem(id) {
  return MENU_DATA.find((item) => item.id === id);
}

function getCardQty(id) {
  return cardQty[id] || 1;
}

function makeLineKey(id, note) {
  return `${id}::${note}`;
}

function getCartTotal() {
  return Object.values(cart).reduce((sum, line) => {
    const item = findMenuItem(line.id);
    return sum + (item ? item.price * line.qty : 0);
  }, 0);
}

function getCartCount() {
  return Object.values(cart).reduce((sum, line) => sum + line.qty, 0);
}

function escapeHTML(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

// ---------- DOM refs ----------
const rankingList = document.getElementById("rankingList");
const menuGrid = document.getElementById("menuGrid");
const menuEmpty = document.getElementById("menuEmpty");
const categoryTabs = document.getElementById("categoryTabs");
const searchInput = document.getElementById("searchInput");

const cartToggle = document.getElementById("cartToggle");
const cartDrawer = document.getElementById("cartDrawer");
const closeCart = document.getElementById("closeCart");
const overlay = document.getElementById("overlay");
const cartItemsEl = document.getElementById("cartItems");
const cartEmptyMsg = document.getElementById("cartEmptyMsg");
const cartTotalEl = document.getElementById("cartTotal");
const cartCountEl = document.getElementById("cartCount");
const checkoutBtn = document.getElementById("checkoutBtn");

const checkoutModal = document.getElementById("checkoutModal");
const closeModal = document.getElementById("closeModal");
const checkoutForm = document.getElementById("checkoutForm");
const modalSummary = document.getElementById("modalSummary");
const checkoutView = document.getElementById("checkoutView");
const confirmView = document.getElementById("confirmView");
const confirmOrderId = document.getElementById("confirmOrderId");
const confirmSummary = document.getElementById("confirmSummary");
const closeConfirm = document.getElementById("closeConfirm");

const toast = document.getElementById("toast");

const CATEGORY_ICON = {
  berat: "🍛",
  sate: "🍢",
  sup: "🍜",
  jajanan: "🍡",
  minuman: "🥤",
};

function buildThumbnailHTML(item) {
  if (item.image) {
    return `<div class="card-thumb"><img src="${item.image}" alt="${item.name}" loading="lazy"></div>`;
  }
  return `<div class="card-thumb card-thumb--placeholder">${CATEGORY_ICON[item.category] || "🍽️"}</div>`;
}

// Kontrol kuantitas + catatan yang tampil di tiap kartu sebelum masuk keranjang
function buildOrderControlsHTML(item) {
  const qty = getCardQty(item.id);
  return `
    <div class="order-controls">
      <div class="qty-stepper" data-id="${item.id}">
        <button type="button" class="qty-btn" data-step="dec" data-id="${item.id}" aria-label="Kurangi jumlah">−</button>
        <span class="qty-value" data-qty-display="${item.id}">${qty}</span>
        <button type="button" class="qty-btn" data-step="inc" data-id="${item.id}" aria-label="Tambah jumlah">+</button>
      </div>
      <input
        type="text"
        class="note-input"
        data-note-id="${item.id}"
        placeholder="Catatan, mis. bikin lebih pedas"
        maxlength="120"
      >
    </div>
  `;
}

// ---------- Rendering: top ranking favorit ----------
function getTopRankedItems() {
  return [...MENU_DATA].sort((a, b) => b.sold - a.sold).slice(0, TOP_RANKING_COUNT);
}

function renderRanking() {
  const topItems = getTopRankedItems();
  rankingList.innerHTML = "";

  topItems.forEach((item, index) => {
    const rank = index + 1;
    const card = document.createElement("article");
    card.className = `ranking-card ranking-card--${rank}`;
    card.innerHTML = `
      ${buildThumbnailHTML(item)}
      <span class="ranking-badge">#${rank}</span>
      <p class="ranking-rank-label">${item.region}</p>
      <h3>${item.name}</h3>
      <p class="ranking-sold">${item.sold} porsi terjual minggu ini</p>
      ${buildOrderControlsHTML(item)}
      <div class="ranking-card-footer">
        <span class="ranking-price">${formatRupiah(item.price)}</span>
        <button class="add-btn" data-id="${item.id}">+ Keranjang</button>
      </div>
    `;
    rankingList.appendChild(card);
  });
}

rankingList.addEventListener("click", (event) => handleCardClick(event, rankingList));

// ---------- Rendering: menu grid ----------
function renderMenu() {
  const topIds = new Set(getTopRankedItems().slice(0, 3).map((item) => item.id));
  const filtered = MENU_DATA.filter((item) => {
    const matchesCategory = currentCategory === "semua" || item.category === currentCategory;
    const matchesSearch = item.name.toLowerCase().includes(currentSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  menuGrid.innerHTML = "";
  menuEmpty.hidden = filtered.length !== 0;

  filtered.forEach((item) => {
    const card = document.createElement("article");
    card.className = "menu-card";
    card.innerHTML = `
      ${buildThumbnailHTML(item)}
      <span class="menu-card-number">No. ${String(item.id).padStart(2, "0")}</span>
      ${topIds.has(item.id) ? '<span class="menu-card-bestseller">🔥 Terlaris</span>' : ""}
      <p class="menu-card-region">${item.region}</p>
      <h3>${item.name}</h3>
      <p>${item.desc}</p>
      ${buildOrderControlsHTML(item)}
      <div class="menu-card-footer">
        <span class="menu-card-price">${formatRupiah(item.price)}</span>
        <button class="add-btn" data-id="${item.id}">+ Keranjang</button>
      </div>
    `;
    menuGrid.appendChild(card);
  });
}

menuGrid.addEventListener("click", (event) => handleCardClick(event, menuGrid));

// Delegasi klik bersama untuk kartu menu & kartu ranking:
// menangani tombol kuantitas (+/-) dan tombol tambah ke keranjang
function handleCardClick(event, container) {
  const stepBtn = event.target.closest(".qty-btn");
  if (stepBtn) {
    const id = Number(stepBtn.dataset.id);
    const delta = stepBtn.dataset.step === "inc" ? 1 : -1;
    const next = Math.min(MAX_CARD_QTY, Math.max(1, getCardQty(id) + delta));
    cardQty[id] = next;
    container.querySelectorAll(`[data-qty-display="${id}"]`).forEach((el) => {
      el.textContent = next;
    });
    return;
  }

  const addBtn = event.target.closest(".add-btn");
  if (!addBtn) return;

  const id = Number(addBtn.dataset.id);
  const card = addBtn.closest(".menu-card, .ranking-card");
  const noteInput = card ? card.querySelector(`[data-note-id="${id}"]`) : null;
  const note = noteInput ? noteInput.value.trim() : "";
  const qty = getCardQty(id);

  addToCart(id, qty, note);

  // Reset kartu ke kondisi awal setelah ditambahkan
  cardQty[id] = 1;
  container.querySelectorAll(`[data-qty-display="${id}"]`).forEach((el) => {
    el.textContent = "1";
  });
  if (noteInput) noteInput.value = "";

  addBtn.textContent = "Ditambahkan ✓";
  addBtn.classList.add("added");
  setTimeout(() => {
    addBtn.textContent = "+ Keranjang";
    addBtn.classList.remove("added");
  }, 900);
}

// ---------- Category & search ----------
categoryTabs.addEventListener("click", (event) => {
  const tab = event.target.closest(".tab");
  if (!tab) return;
  document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
  tab.classList.add("active");
  currentCategory = tab.dataset.category;
  renderMenu();
});

searchInput.addEventListener("input", (event) => {
  currentSearch = event.target.value.trim();
  renderMenu();
});

// ---------- Cart logic ----------
function addToCart(id, qty, note) {
  const item = findMenuItem(id);
  if (!item) return;

  const key = makeLineKey(id, note);
  if (cart[key]) {
    cart[key].qty += qty;
  } else {
    cart[key] = { id, qty, note };
  }

  renderCart();
  showToast(`${item.name} ditambahkan ke keranjang${qty > 1 ? ` (x${qty})` : ""}`);
}

function changeLineQty(key, delta) {
  if (!cart[key]) return;
  cart[key].qty += delta;
  if (cart[key].qty <= 0) delete cart[key];
  renderCart();
}

function renderCart() {
  const entries = Object.entries(cart);
  cartItemsEl.innerHTML = "";

  if (entries.length === 0) {
    cartItemsEl.appendChild(cartEmptyMsg);
    checkoutBtn.disabled = true;
  } else {
    checkoutBtn.disabled = false;
    entries.forEach(([key, line]) => {
      const item = findMenuItem(line.id);
      if (!item) return;
      const cartLine = document.createElement("div");
      cartLine.className = "cart-line";
      cartLine.innerHTML = `
        <div class="cart-line-info">
          <h4>${item.name}</h4>
          <span>${formatRupiah(item.price)} x ${line.qty}</span>
          ${line.note ? `<p class="cart-line-note">📝 ${escapeHTML(line.note)}</p>` : ""}
        </div>
        <div class="qty-control">
          <button data-action="dec" data-key="${key}" aria-label="Kurangi">−</button>
          <span>${line.qty}</span>
          <button data-action="inc" data-key="${key}" aria-label="Tambah">+</button>
        </div>
      `;
      cartItemsEl.appendChild(cartLine);
    });
  }

  cartTotalEl.textContent = formatRupiah(getCartTotal());
  cartCountEl.textContent = getCartCount();
}

cartItemsEl.addEventListener("click", (event) => {
  const btn = event.target.closest("button[data-action]");
  if (!btn) return;
  const key = btn.dataset.key;
  const delta = btn.dataset.action === "inc" ? 1 : -1;
  changeLineQty(key, delta);
});

// ---------- Drawer open/close ----------
function openDrawer() {
  cartDrawer.classList.add("open");
  overlay.hidden = false;
}

function closeDrawer() {
  cartDrawer.classList.remove("open");
  overlay.hidden = true;
}

cartToggle.addEventListener("click", openDrawer);
closeCart.addEventListener("click", closeDrawer);
overlay.addEventListener("click", () => {
  closeDrawer();
  closeCheckoutModal();
});

// ---------- Checkout modal ----------
function buildSummaryHTML() {
  const lines = Object.values(cart)
    .map((line) => {
      const item = findMenuItem(line.id);
      return `
        <div class="modal-summary-line">
          <span>${item.name} x${line.qty}${line.note ? `<br><small>📝 ${escapeHTML(line.note)}</small>` : ""}</span>
          <span>${formatRupiah(item.price * line.qty)}</span>
        </div>
      `;
    })
    .join("");
  const total = `<div class="modal-summary-total"><span>Total</span><span>${formatRupiah(getCartTotal())}</span></div>`;
  return lines + total;
}

function openCheckoutModal() {
  if (getCartCount() === 0) return;
  modalSummary.innerHTML = buildSummaryHTML();
  checkoutView.hidden = false;
  confirmView.hidden = true;
  checkoutModal.hidden = false;
  overlay.hidden = false;
}

function closeCheckoutModal() {
  checkoutModal.hidden = true;
}

checkoutBtn.addEventListener("click", openCheckoutModal);
closeModal.addEventListener("click", () => {
  closeCheckoutModal();
  overlay.hidden = !cartDrawer.classList.contains("open");
});

checkoutForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const orderId = "WN-" + Date.now().toString().slice(-6);
  confirmOrderId.textContent = `Nomor Pesanan: ${orderId}`;
  confirmSummary.innerHTML = buildSummaryHTML();

  checkoutView.hidden = true;
  confirmView.hidden = false;

  // Reset cart & form after order is placed
  Object.keys(cart).forEach((key) => delete cart[key]);
  renderCart();
  checkoutForm.reset();
  closeDrawer();
});

closeConfirm.addEventListener("click", () => {
  closeCheckoutModal();
  overlay.hidden = true;
});

// ---------- Toast ----------
let toastTimer = null;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

// ---------- Init ----------
renderRanking();
renderMenu();
renderCart();
