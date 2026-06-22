const rupiah = (value) => `Rp${new Intl.NumberFormat('id-ID').format(value)}`;

const scrollToTarget = (target) => {
  const element = typeof target === 'string' ? document.querySelector(target) : target;
  element?.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'center' });
};

const setExclusiveState = (buttons, activeButton, className = 'active') => {
  buttons.forEach((button) => {
    const isActive = button === activeButton;
    button.classList.toggle(className, isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });
};

const flashButton = (button, message, duration = 1100) => {
  const original = button.innerHTML;
  button.disabled = true;
  button.textContent = message;
  window.setTimeout(() => {
    button.innerHTML = original;
    button.disabled = false;
  }, duration);
};

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    event.preventDefault();
    history.replaceState(null, '', link.getAttribute('href'));
    scrollToTarget(target);
  });
});

// Owner dashboard
const ownerSearch = document.querySelector('#owner .search-box input');
ownerSearch?.addEventListener('input', () => {
  const query = ownerSearch.value.trim().toLowerCase();
  document.querySelectorAll('#owner tbody tr, #owner .bar-list > div').forEach((item) => {
    item.hidden = query !== '' && !item.textContent.toLowerCase().includes(query);
  });
});

document.querySelector('#owner .primary-button')?.addEventListener('click', () => scrollToTarget('#pos'));
document.querySelector('#owner .ghost-button')?.addEventListener('click', () => scrollToTarget('#pos'));
document.querySelector('#owner .text-button')?.addEventListener('click', () => scrollToTarget('#owner .transaction-panel'));

const ownerStatusFilter = document.querySelector('#owner .filter-button');
ownerStatusFilter?.addEventListener('click', () => {
  const completedOnly = ownerStatusFilter.dataset.completed !== 'true';
  ownerStatusFilter.dataset.completed = String(completedOnly);
  ownerStatusFilter.textContent = completedOnly ? 'Selesai saja ⌄' : 'Semua status ⌄';
});

document.querySelectorAll('#owner .icon-button').forEach((button) => {
  button.addEventListener('click', () => flashButton(button, button.textContent.trim() === '?' ? 'Bantuan aktif' : 'Tidak ada notifikasi'));
});

// POS Kasir
let posTotal = 34000;
const updatePosTotal = () => {
  ['#subtotal', '#total', '#pay-total'].forEach((selector) => {
    document.querySelector(selector).textContent = rupiah(posTotal);
  });
};

document.querySelectorAll('.add-item').forEach((button) => {
  button.addEventListener('click', () => {
    const card = button.closest('.food-card');
    const name = card.dataset.name;
    const price = Number(card.dataset.price);
    posTotal += price;

    const item = document.createElement('div');
    item.className = 'order-item';
    item.innerHTML = `<span class="qty">1</span><div><strong>${name}</strong><small>Baru ditambahkan</small></div><b>${rupiah(price)}</b>`;
    document.querySelector('#order-list').appendChild(item);
    updatePosTotal();
    flashButton(button, '✓', 800);
  });
});

const posCards = [...document.querySelectorAll('#pos .food-card')];
const posSearch = document.querySelector('#pos .pos-search-row input');
let posCategory = 'semua';
const filterPosCards = () => {
  const query = posSearch.value.trim().toLowerCase();
  posCards.forEach((card) => {
    const matchesCategory = posCategory === 'semua' || card.dataset.category === posCategory;
    const matchesSearch = !query || card.textContent.toLowerCase().includes(query);
    card.hidden = !(matchesCategory && matchesSearch);
  });
};

posSearch?.addEventListener('input', filterPosCards);
const posCategoryButtons = [...document.querySelectorAll('#pos .category-chip')];
posCategoryButtons.forEach((button) => {
  button.addEventListener('click', () => {
    posCategory = button.dataset.filter;
    setExclusiveState(posCategoryButtons, button);
    filterPosCards();
  });
});

const tableButtons = [...document.querySelectorAll('#pos .table-chip')];
tableButtons.forEach((button, index) => {
  button.setAttribute('aria-pressed', String(index === 0));
  button.addEventListener('click', () => {
    setExclusiveState(tableButtons, button, 'table-selected');
    const tableName = button.querySelector('b').textContent;
    document.querySelector('#pos .checkout-head h2').textContent = tableName;
  });
});

const paymentButtons = [...document.querySelectorAll('#pos .payment-options button')];
paymentButtons.forEach((button) => {
  button.addEventListener('click', () => setExclusiveState(paymentButtons, button, 'selected'));
});

document.querySelector('#pos .outline-button')?.addEventListener('click', (event) => {
  const button = event.currentTarget;
  const held = button.dataset.held !== 'true';
  button.dataset.held = String(held);
  button.textContent = held ? 'Pesanan ditahan ✓' : 'Tahan pesanan';
});

document.querySelector('#pos .add-note')?.addEventListener('click', (event) => {
  const note = window.prompt('Catatan pesanan:');
  if (!note?.trim()) return;
  event.currentTarget.textContent = `Catatan: ${note.trim()}`;
});

document.querySelector('#pos .pay-button')?.addEventListener('click', (event) => {
  const button = event.currentTarget;
  if (posTotal <= 0) return;
  flashButton(button, 'Pembayaran berhasil ✓', 1400);
});

// Inventory & recipe
const inventoryRows = [...document.querySelectorAll('#inventory .inventory-row:not(.header)')];
const inventorySearch = document.querySelector('#inventory .search-box input');
let inventoryVendor = 'semua';
const filterInventory = () => {
  const query = inventorySearch.value.trim().toLowerCase();
  inventoryRows.forEach((row) => {
    const text = row.textContent.toLowerCase();
    const matchesVendor = inventoryVendor === 'semua' || text.includes(inventoryVendor);
    row.hidden = !matchesVendor || (query && !text.includes(query));
  });
};

inventorySearch?.addEventListener('input', filterInventory);
const inventoryFilter = document.querySelector('#inventory .filter-button');
inventoryFilter?.addEventListener('click', () => {
  const options = [
    { value: 'semua', label: 'Semua warung ⌄' },
    { value: 'warung if', label: 'Warung IF ⌄' },
    { value: 'kopi tc', label: 'Kopi TC ⌄' },
  ];
  const current = options.findIndex((option) => option.value === inventoryVendor);
  const next = options[(current + 1) % options.length];
  inventoryVendor = next.value;
  inventoryFilter.textContent = next.label;
  filterInventory();
});

document.querySelector('#inventory .dark-button')?.addEventListener('click', (event) => flashButton(event.currentTarget, 'Restock dicatat ✓'));
document.querySelector('#inventory .dark-outline')?.addEventListener('click', (event) => flashButton(event.currentTarget, 'Import siap ✓'));
document.querySelector('#inventory .recipe-button')?.addEventListener('click', (event) => {
  const button = event.currentTarget;
  const editing = button.dataset.editing !== 'true';
  button.dataset.editing = String(editing);
  document.querySelectorAll('#inventory .formula strong').forEach((field) => {
    field.contentEditable = String(editing);
  });
  button.textContent = editing ? 'Simpan komposisi resep ✓' : 'Edit komposisi resep →';
});

// Customer menu
let customerTotal = 34000;
let cartCount = 2;
const customerCartItems = document.querySelector('#customer-cart-items');
document.querySelectorAll('.customer-add').forEach((button) => {
  button.addEventListener('click', () => {
    const price = Number(button.dataset.price);
    customerTotal += price;
    cartCount += 1;

    const item = document.createElement('div');
    item.innerHTML = `<span>1×</span><p><strong>${button.dataset.name}</strong><small>Baru ditambahkan</small></p><b>${rupiah(price)}</b>`;
    customerCartItems.appendChild(item);
    document.querySelector('#customer-total').textContent = rupiah(customerTotal);
    document.querySelector('#cart-count').textContent = String(cartCount);
    flashButton(button, 'Ditambahkan ✓', 900);
  });
});

const customerCategoryButtons = [...document.querySelectorAll('#customer .category-tabs button')];
const customerCards = [...document.querySelectorAll('#customer .customer-food-card')];
customerCategoryButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    setExclusiveState(customerCategoryButtons, button);
    customerCards.forEach((card) => {
      card.hidden = filter !== 'semua' && card.dataset.category !== filter && card.dataset.vendor !== filter;
    });
  });
});

const pickupButtons = [...document.querySelectorAll('#customer .pickup-toggle button')];
pickupButtons.forEach((button) => {
  button.addEventListener('click', () => {
    setExclusiveState(pickupButtons, button);
    document.querySelector('#customer .cart-table').hidden = button.textContent.includes('Bawa pulang');
  });
});

document.querySelector('#customer .cart-button')?.addEventListener('click', () => scrollToTarget('#customer-cart'));
document.querySelector('#customer .lime-button')?.addEventListener('click', () => scrollToTarget('#customer-menu'));
document.querySelector('#customer .plain-button')?.addEventListener('click', () => scrollToTarget('#customer-hero'));
document.querySelector('#customer .checkout-button')?.addEventListener('click', (event) => flashButton(event.currentTarget, 'Pesanan siap diproses ✓', 1400));

document.querySelector('#customer .location-button')?.addEventListener('click', (event) => {
  const button = event.currentTarget;
  const isKopi = button.dataset.location === 'kopi';
  button.dataset.location = isKopi ? 'kantin' : 'kopi';
  button.innerHTML = isKopi ? '<span>●</span> Kantin Informatika ⌄' : '<span>●</span> Kopi TC ⌄';
});

document.querySelector('#customer .cart-table button')?.addEventListener('click', (event) => {
  const table = document.querySelector('#customer .cart-table');
  const number = table.querySelector('i');
  const name = table.querySelector('strong');
  const isFirst = number.textContent.trim() === '01';
  number.textContent = isFirst ? '03' : '01';
  name.textContent = isFirst ? 'Meja 003' : 'Meja 001';
  flashButton(event.currentTarget, 'Dipilih ✓', 700);
});

if (window.location.hash) {
  window.setTimeout(() => scrollToTarget(window.location.hash), 0);
}
