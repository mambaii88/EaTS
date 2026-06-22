const project = {
  metrics: [
    { label: 'Role pengguna', value: '4' },
    { label: 'Screen prototype', value: '4' },
    { label: 'File demo', value: '8' },
  ],
  features: [
    {
      icon: 'OD',
      title: 'Owner dashboard',
      description: 'Ringkasan omzet, transaksi harian, meja tersedia, menu terlaris, dan peringatan stok kritis.',
    },
    {
      icon: 'KS',
      title: 'POS kasir',
      description: 'Kasir dapat membuat pesanan, memilih meja, menambahkan menu, dan memproses QRIS atau tunai.',
    },
    {
      icon: 'IR',
      title: 'Inventory dan resep',
      description: 'Stok bahan baku dipantau bersama komposisi resep agar validasi pesanan lebih akurat.',
    },
    {
      icon: 'PM',
      title: 'Pembeli menu digital',
      description: 'Pembeli melihat menu, memilih meja, menambahkan item ke keranjang, lalu melanjutkan pesanan.',
    },
  ],
  screens: [
    {
      id: 'owner',
      title: 'Owner Dashboard',
      image: 'owner.png',
      description: 'Tampilan utama pemilik untuk memantau performa kantin secara cepat.',
      highlights: ['Omzet harian', 'Top menu', 'Transaksi terbaru', 'Status stok'],
    },
    {
      id: 'pos',
      title: 'POS Kasir',
      image: 'pos.png',
      description: 'Workspace kasir untuk membuat dan membayar pesanan pelanggan.',
      highlights: ['Pilih meja', 'Filter menu', 'Keranjang pesanan', 'Metode pembayaran'],
    },
    {
      id: 'inventory',
      title: 'Inventory & Recipe',
      image: 'inventory.png',
      description: 'Panel bahan baku dan resep untuk menjaga ketersediaan menu.',
      highlights: ['Level stok', 'Status kritis', 'Komposisi resep', 'Validasi otomatis'],
    },
    {
      id: 'customer',
      title: 'Customer Menu',
      image: 'customer.png',
      description: 'Menu digital untuk pembeli yang ingin pesan tanpa antre panjang.',
      highlights: ['Menu discovery', 'Pilih meja', 'Keranjang', 'Estimasi pesanan'],
    },
  ],
  files: [
    { name: 'index.html', description: 'Struktur halaman portofolio dan laporan.' },
    { name: 'styles.css', description: 'Tampilan responsif untuk desktop dan mobile.' },
    { name: 'app.js', description: 'Interaksi tab galeri, data fitur, dan konten laporan.' },
    { name: 'owner.png', description: 'Preview owner dashboard.' },
    { name: 'pos.png', description: 'Preview layar POS kasir.' },
    { name: 'inventory.png', description: 'Preview inventory dan resep.' },
    { name: 'customer.png', description: 'Preview menu pembeli.' },
    { name: 'README.md', description: 'Panduan membuka demo dan isi project.' },
  ],
  coverage: [
    'Alur owner memantau omzet, transaksi, meja, dan stok.',
    'Alur kasir membuat pesanan serta memilih metode pembayaran.',
    'Alur inventory mengecek bahan baku dan komposisi resep.',
    'Alur pembeli memilih menu digital dan melihat keranjang.',
  ],
  entities: ['WARUNG', 'KARYAWAN', 'PEMBELI', 'MENU', 'MEJA', 'BAHAN_BAKU', 'RESEP', 'TRANSAKSI', 'DETAIL_TRANSAKSI'],
  stack: ['HTML', 'CSS', 'JavaScript', 'Responsive UI', 'Prototype assets', 'PostgreSQL design'],
  timeline: [
    { phase: 'Analisis', detail: 'Memetakan proses kasir, pembeli, owner, stok, dan laporan.' },
    { phase: 'Perancangan', detail: 'Menyusun ERD, skema database, dan user flow tiap role.' },
    { phase: 'Prototype', detail: 'Membuat rancangan UI untuk dashboard, POS, inventori, dan menu pembeli.' },
    { phase: 'Demo', detail: 'Menyajikan website portofolio statis dan paket ZIP untuk presentasi.' },
  ],
};

const state = {
  project,
  activeScreen: 0,
};

const renderMetrics = () => {
  const container = document.querySelector('#quick-facts');
  container.innerHTML = state.project.metrics.map((metric) => `
    <div>
      <dt>${metric.label}</dt>
      <dd>${metric.value}</dd>
    </div>
  `).join('');
};

const renderFeatures = () => {
  const container = document.querySelector('#feature-list');
  container.innerHTML = state.project.features.map((feature) => `
    <article class="feature-item">
      <span class="feature-icon">${feature.icon}</span>
      <div>
        <h3>${feature.title}</h3>
        <p>${feature.description}</p>
      </div>
    </article>
  `).join('');
};

const setScreen = (index) => {
  state.activeScreen = index;
  const screen = state.project.screens[index];
  document.querySelector('#screen-image').src = screen.image;
  document.querySelector('#screen-image').alt = screen.title;
  document.querySelector('#screen-detail').innerHTML = `
    <small>${String(index + 1).padStart(2, '0')} / ${state.project.screens.length}</small>
    <h3>${screen.title}</h3>
    <p>${screen.description}</p>
    <ul>
      ${screen.highlights.map((item) => `<li>${item}</li>`).join('')}
    </ul>
  `;

  document.querySelectorAll('#gallery-tabs button').forEach((button, buttonIndex) => {
    button.classList.toggle('active', buttonIndex === index);
    button.setAttribute('aria-pressed', String(buttonIndex === index));
  });
};

const renderGallery = () => {
  const tabs = document.querySelector('#gallery-tabs');
  tabs.innerHTML = state.project.screens.map((screen, index) => `
    <button type="button" data-index="${index}" aria-pressed="${index === 0}">${screen.title}</button>
  `).join('');

  tabs.addEventListener('click', (event) => {
    const button = event.target.closest('button');
    if (!button) return;
    setScreen(Number(button.dataset.index));
  });

  setScreen(0);
};

const renderDemoPackage = () => {
  document.querySelector('#file-list').innerHTML = state.project.files.map((file) => `
    <div class="file-item">
      <code>${file.name}</code>
      <p>${file.description}</p>
    </div>
  `).join('');

  document.querySelector('#coverage-list').innerHTML = state.project.coverage.map((item) => `<li>${item}</li>`).join('');
};

const renderReport = () => {
  document.querySelector('#entity-list').innerHTML = state.project.entities.map((entity) => `<span>${entity}</span>`).join('');
  document.querySelector('#stack-list').innerHTML = state.project.stack.map((item) => `<span>${item}</span>`).join('');
  document.querySelector('#timeline-list').innerHTML = state.project.timeline.map((item) => `
    <li><strong>${item.phase}</strong>${item.detail}</li>
  `).join('');
};

const setupActiveNav = () => {
  const links = [...document.querySelectorAll('.main-nav a')];
  const sections = links.map((link) => document.querySelector(link.getAttribute('href'))).filter(Boolean);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((link) => {
        const active = link.getAttribute('href') === `#${entry.target.id}`;
        link.style.color = active ? 'var(--ink)' : '';
      });
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach((section) => observer.observe(section));
};

const init = () => {
  renderMetrics();
  renderFeatures();
  renderGallery();
  renderDemoPackage();
  renderReport();
  setupActiveNav();
};

init();
