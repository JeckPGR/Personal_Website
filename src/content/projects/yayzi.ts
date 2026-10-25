import type { CaseStudy } from '../schema'

export const yayziCaseStudy: CaseStudy = {
  slug: 'yayzi',
  kind: 'project',
  category: 'web-app',
  title: {
    en: 'Yayzi',
    id: 'Yayzi',
  },
  subtitle: {
    en: 'Personal Product',
    id: 'Produk Pribadi',
  },
  tagline: {
    en: 'Idea validation paralysis → Zero-login, auto-expiring public feedback rooms in seconds',
    id: 'Keraguan validasi ide → Ruang umpan balik publik tanpa login yang kedaluwarsa otomatis dalam hitungan detik',
  },
  metaLabel: {
    en: 'IDEA VALIDATION PLATFORM',
    id: 'PLATFORM VALIDASI IDE',
  },
  thumbnail: '/Projects/Yayzi.png',
  status: 'live',
  period: {
    start: 'TODO: 2024',
    end: 'TODO: 2024',
  },
  org: {
    name: 'Personal Product',
    role: 'Founder & Full Stack Developer',
    domain: 'Idea Validation Platform',
  },
  link: {
    label: 'Visit yayzi.vercel.app',
    url: 'https://yayzi.vercel.app',
  },
  scope: {
    type: 'solo',
    summary: {
      en: 'I designed, built, and launched the full-stack validation platform from scratch.',
      id: 'Saya merancang, membangun, dan meluncurkan platform validasi ini secara mandiri dari awal.',
    },
  },
  businessProblem: {
    en: 'Founders and creators frequently stall in the planning phase, asking "Do people really want this?" without an easy way to get real feedback. Traditional surveys require accounts, lengthy questionnaires, and permanent data storage, leading to high abandonment rates and skewed sample sizes.',
    id: 'Founder dan kreator kerap mandek di tahap perencanaan dengan pertanyaan "Apakah orang benar-benar menginginkan ini?", tanpa cara mudah mengumpulkan masukan nyata. Survei konvensional memerlukan pendaftaran akun, kuesioner panjang, dan penyimpanan data permanen yang memicu tingginya angka responden yang keluar sebelum selesai.',
  },
  solutionFit: {
    en: 'Yayzi was built around a temporary, privacy-first feedback model. Creators share a link without signing up, voters cast quick binary Yay/Nay votes with purchase-intent signals, and all room data auto-expires in 1–10 days with permanent cleanup.',
    id: 'Yayzi dibangun dengan model validasi sementara yang mengutamakan privasi. Kreator membagikan tautan tanpa perlu login, pemilih memberikan suara biner Yay/Nay beserta sinyal niat beli, dan seluruh data otomatis terhapus permanen setelah 1–10 hari.',
  },
  system: {
    direction: 'auto',
    nodes: [
      {
        id: 'creator',
        type: 'actor',
        label: { en: 'Product Creator', id: 'Kreator Produk' },
        description: { en: 'Uploads design, pitch, or concept without registering', id: 'Mengunggah konsep tanpa perlu mendaftar' },
      },
      {
        id: 'room-engine',
        type: 'step',
        label: { en: 'Ephemeral Room Generation', id: 'Pembuatan Ruang Sementara' },
        description: { en: 'Generates secure share link and hashed admin PIN', id: 'Membuat link berbagi aman dan PIN admin ter-hash' },
      },
      {
        id: 'voter',
        type: 'actor',
        label: { en: 'Public Voter', id: 'Pemilih Publik' },
        description: { en: 'Submits Yay/Nay with purchase intent and feedback reason', id: 'Memberikan vote Yay/Nay dan alasan minat' },
      },
      {
        id: 'security-guard',
        type: 'service',
        label: { en: 'Bot Protection & Hash Gate', id: 'Proteksi Bot & Hash Telepon' },
        description: { en: 'Cloudflare Turnstile verification and duplicate phone hash check', id: 'Verifikasi Turnstile dan pencegahan suara ganda' },
      },
      {
        id: 'auto-cleanup',
        type: 'step',
        label: { en: 'Auto-Expiry Daemon', id: 'Penghapusan Otomatis' },
        description: { en: 'Permanently wipes room and images after chosen duration (1–10 days)', id: 'Menghapus permanen data dan gambar setelah batas waktu' },
      },
    ],
    edges: [
      { from: 'creator', to: 'room-engine', label: { en: 'Upload Idea', id: 'Unggah Ide' } },
      { from: 'room-engine', to: 'voter', label: { en: 'Share Link', id: 'Bagi Link' } },
      { from: 'voter', to: 'security-guard', label: { en: 'Cast Vote', id: 'Kirim Suara' } },
      { from: 'security-guard', to: 'auto-cleanup', label: { en: 'Expire (1-10d)', id: 'Batas 1-10 Hari' } },
    ],
  },
  architecture: {
    direction: 'auto',
    nodes: [
      {
        id: 'client',
        type: 'service',
        lane: 0,
        label: { en: 'Next.js Web Client', id: 'Klien Web Next.js' },
        description: { en: 'Fast, SSR-enabled voting interface and PIN-protected admin dashboard', id: 'Antarmuka voting cepat dan dasbor admin dengan proteksi PIN' },
        tools: ['Next.js', 'React', 'TailwindCSS'],
      },
      {
        id: 'turnstile',
        type: 'external',
        lane: 1,
        label: { en: 'Cloudflare Turnstile', id: 'Cloudflare Turnstile' },
        description: { en: 'Frictionless anti-bot and brute-force protection without CAPTCHA', id: 'Proteksi bot dan brute-force tanpa CAPTCHA yang mengganggu' },
        tools: ['Cloudflare'],
      },
      {
        id: 'hosting',
        type: 'service',
        lane: 1,
        label: { en: 'Vercel Edge Platform', id: 'Platform Vercel Edge' },
        description: { en: 'Edge deployment with serverless execution', id: 'Deployment edge serverless' },
        tools: ['Vercel'],
      },
      {
        id: 'backend-db',
        type: 'data',
        lane: 2,
        label: { en: 'Supabase PostgreSQL & Storage', id: 'Supabase Database & Storage' },
        description: { en: 'Stores hashed voter identifiers, feedback records, and uploaded assets', id: 'Menyimpan identifikasi pemilih ter-hash dan berkas gambar' },
        tools: ['Supabase', 'PostgreSQL'],
      },
    ],
    edges: [
      { from: 'client', to: 'turnstile', label: { en: 'Bot Verification', id: 'Verifikasi Bot' } },
      { from: 'client', to: 'hosting', label: { en: 'Edge Runtime Delivery', id: 'Pengiriman Edge Runtime' } },
      { from: 'turnstile', to: 'backend-db', label: { en: 'Authorized RLS Queries', id: 'Kueri RLS Terverifikasi' } },
    ],
  },
  results: [
    {
      value: '100% Zero-Login',
      label: { en: 'Frictionless survey completion for both creators and voters', id: 'Validasi tanpa registrasi bagi kreator maupun pemilih' },
      evidence: 'qualitative',
    },
    {
      value: '1–10 Days',
      label: { en: 'Automated lifecycle ensuring no permanent data footprint', id: 'Siklus hidup otomatis menjamin tidak ada jejak data permanen' },
      evidence: 'measured',
    },
  ],
  showcase: [
    {
      src: '/Projects/Yayzi-Src/Yayzi-1.png',
      alt: { en: 'Yayzi landing and idea upload screen', id: 'Layar beranda dan unggah ide Yayzi' },
      caption: { en: 'Zero-login setup interface allowing creators to launch rooms in seconds', id: 'Antarmuka peluncuran ruang validasi instan tanpa pendaftaran akun' },
    },
    {
      src: '/Projects/Yayzi-Src/Yayzi-2.png',
      alt: { en: 'Yayzi voter response screen', id: 'Layar respons pemilih Yayzi' },
      caption: { en: 'Clean voting card with binary decision and purchase intent inputs', id: 'Kartu voting terstruktur dengan opsi sinyal minat beli' },
    },
    {
      src: '/Projects/Yayzi-Src/Yayzi-3.png',
      alt: { en: 'Yayzi PIN-protected analytics dashboard', id: 'Dasbor analitik Yayzi berproteksi PIN' },
      caption: { en: 'Creator analytics dashboard displaying aggregated feedback and AI-ready export', id: 'Dasbor analitik kreator dengan ringkasan umpan balik' },
    },
  ],
  techStack: [
    { group: 'Frontend', items: ['Next.js', 'React', 'TailwindCSS'] },
    { group: 'Backend', items: ['Supabase'] },
    { group: 'Data', items: ['PostgreSQL'] },
    { group: 'Infra', items: ['Vercel', 'Cloudflare'] },
  ],
  reflection: {
    en: 'Yayzi taught me that the biggest barrier to early feedback is friction. Removing the login barrier increased response speed drastically, while privacy guarantees made users comfortable voting honestly.',
    id: 'Yayzi mengajarkan bahwa hambatan terbesar dalam validasi ide adalah friksi pendaftaran. Menghilangkan login mempercepat proses pengumpulan masukan secara drastis.',
  },
  featured: true,
}

export default yayziCaseStudy
