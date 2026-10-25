import type { CaseStudy } from '../schema'

export const pajaBarbershopCaseStudy: CaseStudy = {
  slug: 'paja-barbershop',
  kind: 'project',
  category: 'web-app',
  title: {
    en: 'Paja Barbershop',
    id: 'Paja Barbershop',
  },
  subtitle: {
    en: 'Client Project',
    id: 'Proyek Klien',
  },
  tagline: {
    en: 'Disjointed manual haircut bookings → Dual-app ecosystem: Customer booking & staff backoffice',
    id: 'Pemesanan cukur manual yang terpisah → Ekosistem dua aplikasi: Booking pelanggan & backoffice staf',
  },
  metaLabel: {
    en: 'TEAM OF 4 (PROJECT MANAGER)',
    id: 'TIM 4 ORANG (PROJECT MANAGER)',
  },
  thumbnail: '/Projects/PajaBarbershop.png',
  status: 'live',
  period: {
    start: 'TODO: 2024',
    end: 'TODO: 2024',
  },
  org: {
    name: 'Paja Barbershop',
    role: 'IT Project Manager & Delivery Lead',
    domain: 'Retail & Service Management',
  },
  link: {
    label: 'Visit pajabarbershop.com',
    url: 'https://pajabarbershop.com',
  },
  scope: {
    type: 'lead',
    summary: {
      en: 'I led technical scoping, sprint planning, and client communication for a 4-person delivery team.',
      id: 'Saya memimpin penentuan cakupan teknis, perencanaan sprint, dan komunikasi klien untuk tim delivery 4 orang.',
    },
  },
  businessProblem: {
    en: 'Paja Barbershop relied on ad-hoc WhatsApp messages and physical walk-in books to coordinate client reservations across barbers. Double-booking, missed promotional campaigns, and manual revenue reconciliation placed heavy daily operational strain on shop staff.',
    id: 'Paja Barbershop mengandalkan pesan WhatsApp dan buku catatan fisik untuk mengelola reservasi pelanggan di berbagai barber. Terjadinya jadwal ganda, kampanye promosi yang terlewat, dan rekapitulasi manual menimbulkan beban operasional harian yang berat bagi staf.',
  },
  solutionFit: {
    en: 'Rather than forcing an expensive proprietary POS subscription, we delivered a custom dual-application architecture tailored to their exact workflow: a fast, mobile-first customer booking portal coupled with a dedicated staff backoffice for scheduling and master promotion control.',
    id: 'Alih-alih memaksakan langganan POS siap pakai yang mahal, kami membangun arsitektur dua aplikasi khusus yang selaras dengan alur kerja mereka: portal booking pelanggan yang cepat dan responsif serta backoffice staf untuk penjadwalan dan pengelolaan promosi.',
  },
  system: {
    direction: 'auto',
    nodes: [
      {
        id: 'customer',
        type: 'actor',
        lane: 0,
        label: { en: 'Customer', id: 'Pelanggan' },
        description: { en: 'Selects barber, service tier, and available time slot on mobile', id: 'Memilih barber, layanan, dan jam reservasi melalui browser HP' },
      },
      {
        id: 'staff',
        type: 'actor',
        lane: 0,
        label: { en: 'Barbershop Staff', id: 'Staf & Barber' },
        description: { en: 'Handles walk-in queue, shift scheduling, and promo management', id: 'Mengelola antrean walk-in, jadwal shift, dan voucher promo' },
      },
      {
        id: 'booking-portal',
        type: 'step',
        lane: 1,
        label: { en: 'Online Reservation Flow', id: 'Alur Reservasi Online' },
        description: { en: 'Validates real-time barber availability and issues unique booking code', id: 'Validasi jadwal barber real-time dan menerbitkan kode booking unik' },
      },
      {
        id: 'staff-backoffice',
        type: 'step',
        lane: 1,
        label: { en: 'Staff Backoffice Console', id: 'Konsol Backoffice Staf' },
        description: { en: 'Administrative dashboard for chair assignments and appointment confirmations', id: 'Dashboard operasional untuk pengaturan kursi barber dan konfirmasi antrean' },
      },
      {
        id: 'master-data',
        type: 'data',
        lane: 2,
        label: { en: 'Operational Database', id: 'Database Operasional' },
        description: { en: 'Synchronizes real-time schedules, service catalogs, and client history', id: 'Sinkronisasi jadwal real-time, katalog layanan, dan riwayat pelanggan' },
      },
    ],
    edges: [
      { from: 'customer', to: 'booking-portal', label: { en: 'Book slot & barber', id: 'Pilih slot & barber' } },
      { from: 'staff', to: 'staff-backoffice', label: { en: 'Walk-in & shift admin', id: 'Admin walk-in & shift' } },
      { from: 'booking-portal', to: 'master-data', label: { en: 'Reserve slot', id: 'Kunci slot' } },
      { from: 'staff-backoffice', to: 'master-data', label: { en: 'Sync calendar', id: 'Sinkronisasi kalender' } },
    ],
  },
  architecture: {
    direction: 'auto',
    nodes: [
      {
        id: 'customer-app',
        type: 'service',
        lane: 0,
        label: { en: 'Customer Portal (Next.js)', id: 'Portal Pelanggan (Next.js)' },
        description: { en: 'Public website optimized for mobile booking and barber portfolios', id: 'Situs publik dengan portofolio barber dan booking mobile' },
        tools: ['Next.js', 'React'],
      },
      {
        id: 'backoffice-app',
        type: 'service',
        lane: 0,
        label: { en: 'Staff Console (React)', id: 'Konsol Staf (React)' },
        description: { en: 'Internal administrative interface for shift and discount management', id: 'Antarmuka internal untuk shift dan promo' },
        tools: ['React', 'TailwindCSS'],
      },
      {
        id: 'api-server',
        type: 'service',
        lane: 1,
        label: { en: 'Express.js Backend API', id: 'Backend API Express.js' },
        description: { en: 'RESTful API handling authentication, bookings, and reporting', id: 'REST API untuk autentikasi, pemesanan, dan laporan' },
        tools: ['Express.js', 'Node.js'],
      },
      {
        id: 'postgres',
        type: 'data',
        lane: 2,
        label: { en: 'PostgreSQL Database', id: 'Database PostgreSQL' },
        description: { en: 'Relational data store for barbers, appointments, and audit records', id: 'Database relasional untuk data barber dan pemesanan' },
        tools: ['PostgreSQL'],
      },
    ],
    edges: [
      { from: 'customer-app', to: 'api-server', label: { en: 'REST API', id: 'REST API' } },
      { from: 'backoffice-app', to: 'api-server', label: { en: 'Auth Session', id: 'Sesi Terautentikasi' } },
      { from: 'api-server', to: 'postgres', label: { en: 'SQL queries', id: 'Kueri SQL' } },
    ],
  },
  results: [
    {
      value: '2 Applications',
      label: { en: 'Coordinated production delivery covering customer and backoffice operations', id: 'Delivery dua aplikasi produksi untuk pelanggan dan staf' },
      evidence: 'measured',
    },
    {
      value: '100% Digital',
      label: { en: 'Shifted appointment management from WhatsApp books to live database', id: 'Migrasi jadwal dari catatan WhatsApp ke database terpadu' },
      evidence: 'qualitative',
    },
  ],
  showcase: [
    {
      src: '/Projects/Paja-Src/Paja-1.png',
      alt: { en: 'Paja Barbershop customer landing page with booking callout', id: 'Beranda Paja Barbershop dengan booking online' },
      caption: { en: 'Customer-facing storefront highlighting services and online reservation flow', id: 'Tampilan utama pelanggan dengan katalog layanan dan alur reservasi' },
    },
    {
      src: '/Projects/Paja-Src/Paja-2.png',
      alt: { en: 'Paja Barbershop barber selection and gallery', id: 'Pemilihan barber dan galeri portofolio' },
      caption: { en: 'Barber profile view showing individual portfolios and availability', id: 'Profil barber yang menampilkan portofolio dan ketersediaan jadwal' },
    },
    {
      src: '/Projects/Paja-Src/Paja-3.png',
      alt: { en: 'Paja Barbershop backoffice staff portal', id: 'Portal backoffice staf Paja Barbershop' },
      caption: { en: 'Internal management interface for slot confirmation and pricing adjustments', id: 'Antarmuka administrasi internal untuk konfirmasi pemesanan' },
    },
  ],
  techStack: [
    { group: 'Frontend', items: ['Next.js', 'React', 'TailwindCSS'] },
    { group: 'Backend', items: ['Express.js', 'Node.js'] },
    { group: 'Data', items: ['PostgreSQL'] },
  ],
  reflection: {
    en: 'Managing a 4-person delivery team taught me how critical clear requirements are before writing code. Translating the owner’s business wishes into concrete API contracts prevented scope creep and kept delivery on target.',
    id: 'Mengelola tim delivery 4 orang menegaskan pentingnya spesifikasi kebutuhan yang jelas sebelum coding. Menerjemahkan kebutuhan pemilik bisnis menjadi kontrak API konkret mencegah terjadinya pembengkakan ruang lingkup.',
  },
  featured: false,
}

export default pajaBarbershopCaseStudy
