import type { CaseStudy } from '../schema.ts'

export const telegramPosBotCaseStudy: CaseStudy = {
  slug: 'telegram-pos-bot',
  kind: 'project',
  category: 'automation-bot',
  title: {
    en: 'Telegram POS & Cashier Bot',
    id: 'Bot Kasir & POS Telegram',
  },
  subtitle: {
    en: 'Conversational POS Terminal with Rule-Based Parser & Claude Haiku Entity Extraction',
    id: 'Terminal POS Percakapan dengan Parser Aturan & Ekstraksi Entitas Claude Haiku',
  },
  tagline: {
    en: 'Serverless Telegram cashier bot handling sales, inventory purchase, debt ledgers, and PIN-protected profit analytics',
    id: 'Bot kasir serverless Telegram untuk transaksi penjualan, restock pembelian, pencatatan bon/utang, dan rekap laba ber-PIN',
  },
  metaLabel: {
    en: 'Personal Project / Serverless Retail POS',
    id: 'Proyek Pribadi / Serverless Retail POS',
  },
  accent: '#2AABEE',
  status: 'live',
  period: { start: '2024', end: '2024' },
  org: {
    name: 'Retail Micro-Merchant',
    role: 'Full-Stack & Systems Engineer',
  },
  scope: {
    type: 'solo',
    summary: {
      en: 'Architected Telegram conversational commands, hybrid rules+AI parser, Neon PostgreSQL database schema, and PIN-secured reporting',
      id: 'Merancang perintah interaktif bot Telegram, parser hybrid aturan+AI, skema database Neon PostgreSQL, dan laporan ber-PIN',
    },
  },
  businessProblem: {
    en: 'Micro-retailers and cashiers often struggle with bulky, costly desktop POS machines and complex multi-page apps. In fast-paced daily retail, shopkeepers need a zero-friction logging mechanism directly inside their most frequently used messaging app (Telegram). However, purely rigid regex templates fail whenever staff mistype or input freeform text, while purely LLM-based solutions introduce unnecessary latency and billing overhead for routine entries.',
    id: 'Pelaku usaha mikro dan kasir toko sering terbebani oleh sistem POS desktop yang mahal, lambat, dan antarmuka aplikasi yang rumit. Dalam operasional harian yang serba cepat, kasir membutuhkan alat pencatatan tanpa hambatan langsung di aplikasi pesan harian (Telegram). Namun, parser regex kaku kerap gagal saat kasir salah ketik (typo) atau memasukkan format bebas, sedangkan pemrosesan murni LLM memakan waktu dan biaya berlebih untuk transaksi rutin.',
  },
  solutionFit: {
    en: 'Built a serverless Telegram cashier bot running on Cloudflare Workers and Hono.js backed by Neon Serverless PostgreSQL. It supports 6 core retail modules: Penjualan (/jual), Pembelian (/beli), Rekap Harian (/rekapharian), Utang & Bon (/utangbon), Manajemen Akun (/manajemenakun), and Rekap Full (/rekapfull with PIN security). It utilizes an intelligent two-tier parsing engine: fast deterministic regex rules execute first; if input breaks or has formatting anomalies, Claude Haiku 3.5 via OpenRouter repairs and extracts the structured JSON. The cashier reviews an interactive pre-upload summary with Edit/Delete controls, confirms the transaction, and instantly receives the updated daily tally.',
    id: 'Membangun bot kasir serverless di Cloudflare Workers dan Hono.js dengan database Neon Serverless PostgreSQL. Memiliki 6 modul kasir esensial: Penjualan (/jual), Pembelian (/beli), Rekap Harian (/rekapharian), Utang & Bon (/utangbon), Manajemen Akun (/manajemenakun), serta Rekap Full (/rekapfull berproteksi PIN admin untuk analisis laba kotor & bersih). Dilengkapi mesin parsing dua tahap: pencocokan regex berbasis aturan dieksekusi terlebih dahulu; jika format rusak atau ambigu, model Claude Haiku 3.5 lewat OpenRouter secara cerdas memperbaiki entitas ke JSON terstruktur. Kasir dapat mereview ringkasan pre-upload interaktif (bisa edit/batal), mengonfirmasi transaksi, dan langsung menerima rekapan harian yang otomatis diperbarui.',
  },
  system: {
    direction: 'auto',
    nodes: [
      {
        id: 'cashier-input',
        type: 'actor',
        lane: 0,
        label: { en: 'Cashier Transaction Command', id: 'Input Transaksi Kasir' },
        description: {
          en: 'Types sale or purchase command using natural shorthand template (e.g., jual [item] harga [xxx] modal [xxx] metode [cash/qris])',
          id: 'Mengetik perintah jual/beli memakai template ringkas (contoh: jual [produk] harga [xxx] modal [xxx] metode [cash/qris])',
        },
      },
      {
        id: 'rule-parser',
        type: 'step',
        lane: 1,
        label: { en: 'Deterministic Regex Parser', id: 'Parser Regex Deterministik' },
        description: {
          en: 'Instant zero-latency rule matching validating strict format syntax, item tags, and numerical currencies',
          id: 'Pencocokan aturan instan tanpa latensi untuk memvalidasi sintaks format, nama barang, dan nominal angka',
        },
      },
      {
        id: 'ai-recovery',
        type: 'ai',
        lane: 1,
        label: { en: 'Claude Haiku 3.5 Recovery', id: 'Koreksi Cerdas Claude Haiku' },
        description: {
          en: 'Triggered automatically when format breaks or has typos, extracting and repairing structured transaction entities',
          id: 'Aktif otomatis jika format salah ketik atau ambigu, mengekstrak dan memperbaiki entitas transaksi ke JSON terstruktur',
        },
      },
      {
        id: 'summary-modal',
        type: 'step',
        lane: 2,
        label: { en: 'Pre-Upload Summary & Confirm', id: 'Ringkasan & Konfirmasi Transaksi' },
        description: {
          en: 'Interactive Telegram message preview with Edit and Cancel buttons asking for final user confirmation',
          id: 'Tampilan preview interaktif di Telegram dengan tombol Edit dan Batal untuk verifikasi kasir sebelum disimpan',
        },
      },
      {
        id: 'neon-db',
        type: 'data',
        lane: 3,
        label: { en: 'Neon PostgreSQL Ledger', id: 'Buku Kas Neon PostgreSQL' },
        description: {
          en: 'ACID-compliant relational store logging sales, debt/bon status, operational costs, and cashier audit logs',
          id: 'Penyimpanan relasional ACID untuk mencatat penjualan, status utang/bon, biaya modal, dan riwayat kasir',
        },
      },
      {
        id: 'daily-recap',
        type: 'step',
        lane: 4,
        label: { en: 'Live Daily Recap Broadcast', id: 'Rekap Harian Real-Time' },
        description: {
          en: 'Immediately returns the updated daily sales tally, cash on hand, and transaction breakdown',
          id: 'Langsung menampilkan rekapan total penjualan hari ini, kas masuk, dan rincian transaksi terbaru',
        },
      },
    ],
    edges: [
      { from: 'cashier-input', to: 'rule-parser', label: { en: 'Fast template match', id: 'Pencocokan template' } },
      { from: 'cashier-input', to: 'ai-recovery', label: { en: 'Fallback on syntax break', id: 'Fallback saat format salah' } },
      { from: 'rule-parser', to: 'summary-modal', label: { en: 'Parsed draft', id: 'Draf tervalidasi' } },
      { from: 'ai-recovery', to: 'summary-modal', label: { en: 'Repaired JSON', id: 'JSON terkoreksi' } },
      { from: 'summary-modal', to: 'neon-db', label: { en: 'Commit confirmation', id: 'Konfirmasi simpan' } },
      { from: 'neon-db', to: 'daily-recap', label: { en: 'Broadcast updated totals', id: 'Tampilkan rekap baru' } },
    ],
  },
  architecture: {
    direction: 'auto',
    nodes: [
      {
        id: 'telegram-client',
        type: 'service',
        lane: 0,
        label: { en: 'Telegram App Client', id: 'Aplikasi Klien Telegram' },
        description: {
          en: 'Cross-platform mobile and desktop messaging client functioning as the zero-install cashier terminal',
          id: 'Aplikasi pesan mobile dan desktop yang difungsikan sebagai terminal kasir tanpa perlu instalasi aplikasi baru',
        },
        tools: ['Telegram Bot API'],
      },
      {
        id: 'hono-worker',
        type: 'service',
        lane: 1,
        label: { en: 'Cloudflare Workers (Hono.js)', id: 'Cloudflare Workers (Hono.js)' },
        description: {
          en: 'High-speed edge webhook handler parsing commands, managing session state, and enforcing role authorization',
          id: 'Handler webhook edge berkecepatan tinggi pengatur perintah, session state, dan hak akses kasir/admin',
        },
        tools: ['Hono.js', 'Cloudflare Workers', 'Wrangler'],
      },
      {
        id: 'haiku-engine',
        type: 'ai',
        lane: 2,
        label: { en: 'OpenRouter (Claude Haiku 3.5)', id: 'OpenRouter (Claude Haiku 3.5)' },
        description: {
          en: 'Low-latency conversational NLP extracting items, prices, cost, and payment methods from unstructured inputs',
          id: 'Model NLP berlatensi rendah untuk mengekstrak barang, harga, modal, dan metode bayar dari teks tidak baku',
        },
        tools: ['OpenRouter', 'Claude Haiku 3.5'],
      },
      {
        id: 'neon-db',
        type: 'data',
        lane: 2,
        label: { en: 'Neon Tech Serverless PostgreSQL', id: 'Neon Tech Serverless PostgreSQL' },
        description: {
          en: 'Serverless PostgreSQL storing transaction ledgers, customer debts/bon, staff credentials, and PIN hashes',
          id: 'Database PostgreSQL serverless untuk mencatat buku transaksi, utang bon pelanggan, akun staf, dan PIN admin',
        },
        tools: ['Neon Tech', 'PostgreSQL'],
      },
    ],
    edges: [
      { from: 'telegram-client', to: 'hono-worker', label: { en: 'HTTPS Bot Webhook', id: 'Webhook Bot HTTPS' } },
      { from: 'hono-worker', to: 'haiku-engine', label: { en: 'Natural Entity Parsing', id: 'Ekstraksi Entitas Alami' } },
      { from: 'hono-worker', to: 'neon-db', label: { en: 'ACID Ledger Queries', id: 'Kueri Transaksi ACID' } },
    ],
  },
  results: [
    {
      value: '6 Core Modules',
      label: {
        en: 'Comprehensive retail operations: Sales, Purchases, Daily Recap, Debt/Bon, Account Management, and PIN Profit Audit',
        id: 'Operasional retail lengkap: Penjualan, Pembelian, Rekap Harian, Utang/Bon, Manajemen Akun, dan Audit Laba PIN',
      },
      evidence: 'qualitative',
    },
    {
      value: 'Hybrid Parsing',
      label: {
        en: 'Deterministic regex execution with automated Claude Haiku 3.5 AI fallback for syntax errors',
        id: 'Eksekusi regex deterministik dengan fallback AI Claude Haiku 3.5 otomatis untuk kesalahan input',
      },
      evidence: 'qualitative',
    },
    {
      value: 'Zero Hardware',
      label: {
        en: '100% serverless edge deployment on Cloudflare Workers and Neon eliminating dedicated POS hardware costs',
        id: 'Arsitektur 100% serverless di Cloudflare Workers dan Neon, meniadakan biaya pengadaan alat kasir khusus',
      },
      evidence: 'qualitative',
    },
  ],
  techStack: [
    { group: 'Bot & Runtime', items: ['Telegram Bot API', 'Hono.js', 'Cloudflare Workers', 'Wrangler'] },
    { group: 'Database & Storage', items: ['Neon Tech', 'PostgreSQL (Serverless)'] },
    { group: 'AI & Entity Parsing', items: ['OpenRouter', 'Anthropic Claude Haiku 3.5'] },
    { group: 'Security & Auth', items: ['PIN Protection', 'Role-Based Commands'] },
  ],
  reflection: {
    en: 'The most effective business software is the one that meets people where they already are. By turning Telegram into an intelligent POS with a hybrid rules+AI fallback parser, small business owners get the speed of a cash register and the precision of enterprise accounting right on their phone.',
    id: 'Perangkat lunak bisnis yang paling efektif adalah yang menemui pengguna di tempat mereka sudah terbiasa beraktivitas. Dengan mengubah Telegram menjadi POS pintar lewat parser hybrid aturan+AI, pemilik usaha kecil mendapatkan kecepatan mesin kasir dan presisi pembukuan akuntansi langsung dari HP mereka.',
  },
  featured: false,
}

export default telegramPosBotCaseStudy
