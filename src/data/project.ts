import type { IconType } from 'react-icons'
import {
  TbBrandMeta,
  TbBrandTelegram,
  TbDeviceDesktop,
  TbDeviceMobile,
  TbMap,
  TbRobot,
  TbSparkles,
  TbWorld,
} from 'react-icons/tb'
import type { Localized } from '../i18n/localized'

export type ProjectCategory = 'Web-App' | 'Mobile App' | 'Automation & Bot'

export type ProjectItem = {
  slug: string
  route: string
  title: string
  category: ProjectCategory
  context: string
  description: Localized
  stack: string[]
  accent: string
  Icon: IconType
  /** Cover/thumbnail — the list-row preview and the detail hero banner. One image. */
  thumbnail?: string
  /**
   * Up to 3 showcase images for the detail page — these are *different*
   * pictures from the thumbnail. Empty slots render a "no image" placeholder.
   */
  showcase?: string[]
  keyPoints: Localized<string[]>
  finalOutput: Localized
  resultHighlights?: Localized<string[]>
  /** External website URL; the visit link only appears when this is set */
  website?: string
}

export const tabs: Array<{ label: ProjectCategory; Icon: IconType }> = [
  { label: 'Web-App', Icon: TbDeviceDesktop },
  { label: 'Mobile App', Icon: TbDeviceMobile },
  { label: 'Automation & Bot', Icon: TbRobot },
]

export const projects: ProjectItem[] = [
  {
    slug: 'fidela',
    route: '/project/fidela',
    title: 'Fidela',
    category: 'Web-App',
    context: 'SaaS / AI Virtual Photo Studio',
    description: {
      en: 'With Fidela I learned that fashion sellers care more about a result that matches the real garment than one that just looks impressive. If the fabric texture or color is off, the photo can’t be used to sell.',
      id: 'Di Fidela saya belajar bahwa bagi penjual fashion, hasil yang mirip aslinya lebih penting daripada hasil yang sekadar keren. Kalau tekstur kain atau warnanya meleset, fotonya tidak bisa dipakai untuk jualan.',
    },
    stack: ['Next.js', 'NestJS', 'TypeScript', 'Redis', 'PostgreSQL', 'Google Cloud Console'],
    accent: '#10b981',
    Icon: TbSparkles,
    thumbnail: '/Projects/Fidela.svg',
    showcase: [
      '/Projects/Fidela-Src/Fidela-1.png',
      '/Projects/Fidela-Src/Fidela-2.png',
      '/Projects/Fidela-Src/Fidela-3.png',
    ],
    website: 'https://fidela.asia',
    keyPoints: {
      en: [
        'Built an automated garment-masking and neural pose-transfer pipeline that generates virtual fashion model photos in ~30 seconds.',
        'Delivered an integrated e-commerce suite: AI Photo Studio, AI Product Description generator, and Campaign Maker.',
        'Developed an Image Eraser and an aspect-ratio tool tailored to marketplace standards (1:1, 3:4, and 9:16).',
        'Architected the backend on NestJS, Redis, PostgreSQL, and Google Cloud for fast batch processing and low latency.',
        'Preserved fabric texture, exact color hue, and marketplace-compliant lighting in every output.',
      ],
      id: [
        'Merancang arsitektur aplikasi end-to-end, dari frontend (Next.js) dan backend (NestJS) hingga database (PostgreSQL), yang siap di-scale sejak tahap awal.',
        'Mendesain skema database beserta relasi antartabel untuk seluruh aplikasi',
        'Meneliti dan menyusun system prompt yang menekan hasil generik ala "AI slop" pada foto produk.',
        'Mengembangkan seluruh fitur untuk pengguna maupun admin Fidela.',
        'Membangun orkestrasi sistem agar AI vision tetap menghasilkan output akurat meskipun pengguna tidak memberi prompt tambahan.',
        'Menerapkan SEO dasar hingga teknikal, serta GEO agar crawler AI memahami produk Fidela dengan lebih baik.',
      ],
    },
    resultHighlights: {
      en: [
        '~30s turnaround time',
        'Up to 90% cost savings',
        'Studio-grade lookbook fidelity',
      ],
      id: [
        'Proses ~30 detik',
        'Hemat biaya hingga 90%',
        'Kualitas lookbook studio',
      ],
    },
    finalOutput: {
      en: 'Building Fidela taught me that in e-commerce AI, fidelity and speed matter more than pure generative novelty — preserving exact garment texture and accurate color tones is what turns AI curiosity into a real business tool.',
      id: 'Membangun Fidela mengajarkan bahwa dalam AI e-commerce, akurasi tekstur dan kecepatan jauh lebih penting daripada sekadar efek visual — menjaga warna asli pakaian dan detail kain adalah pembeda antara eksperimen AI dan alat bisnis nyata.',
    },
  },
  {
    slug: 'inotrive',
    route: '/project/inotrive',
    title: 'Inotrive',
    category: 'Web-App',
    context: 'Personal Product / AI Content Scripting Intelligence',
    description: {
      en: 'An AI-based creative platform that helps TikTok creators, personal brands, and MSMEs turn early content ideas into structured, ready-to-execute content concepts, solving the friction of the early content creation process.',
      id: 'Platform kreatif berbasis AI yang membantu kreator TikTok, personal brand, dan UMKM mengubah ide konten awal menjadi konsep yang terstruktur dan siap dieksekusi, mengurai hambatan di tahap paling awal proses pembuatan konten.',
    },
    stack: ['React', 'TypeScript', 'Next.js', 'NestJS', 'Redis', 'PostgreSQL', 'Apify', 'OpenRouter', 'RAG'],
    accent: '#63d848',
    Icon: TbSparkles,
    thumbnail: '/Projects/Inotrive.png',
    // 3 gambar bisa ditaro disini
    showcase: [
      '/Projects/Inotrive-Src/Inotrive-1.png',
      '/Projects/Inotrive-Src/Inotrive-2.png',
      '/Projects/Inotrive-Src/Inotrive-3.png',
    ],
    website: 'https://inotrive.com',
    keyPoints: {
      en: [
        'Built Inotrive end-to-end as a solo product: product discovery, UX, frontend (Next.js), backend (NestJS), data layer, and deployment.',
        'Designed an adaptive onboarding flow: creators answer a few questions about their niche, audience, and style, and Inotrive generates three persona options tailored to those answers. The chosen persona then shapes every brainstorm and script, so output starts personalized instead of from a blank prompt.',
        'Orchestrated an ideation system: real-time Brave Web Search and trend research feed angle and viral-hook brainstorming.',
        'Built a flexible script pipeline that starts from scratch, a raw idea, a brainstormed concept, or content crawled with Apify.',
        'Benchmarked 8+ LLMs via OpenRouter (Muse, DeepSeek, Claude, ChatGPT, Gemini, Mistral, MiniMax) and chose Muse Spark 1.1 for the most natural phrasing.',
        'Implemented RAG vector retrieval and a chatbot assistant for interactive creator ideation.',
        'Built an in-house web teleprompter with synchronized pacing cues, so creators go from script to recording without leaving the app.',
      ],
      id: [
        'Membangun Inotrive end-to-end secara mandiri: riset produk, UX, frontend (Next.js), backend (NestJS), data layer, hingga deployment.',
        'Merancang alur onboarding adaptif: kreator menjawab beberapa pertanyaan seputar niche, audiens, dan gaya, lalu Inotrive menyusun tiga pilihan persona yang disesuaikan dengan jawaban tersebut. Persona yang dipilih kemudian membentuk setiap brainstorming dan naskah, sehingga hasilnya sudah personal sejak awal, bukan dari identitas kosong.',
        'Mengorkestrasi sistem : pencarian real-time Brave Web Search&Firecrawl, lalu riset tren menjadi bahan brainstorming angle dan hook viral.',
        'Membuat pipeline naskah yang fleksibel, bisa dimulai dari nol, ide mentah, konsep hasil brainstorming, atau konten hasil crawling Apify.',
        'Melakukan RnD terhadap 8+ model LLM lewat OpenRouter (Muse, DeepSeek, Claude, ChatGPT, Gemini, Mistral, MiniMax) dan memilih Muse Spark 1.1 karena hasilnya paling natural.',
        'Mengimplementasikan retrieval vektor RAG dan asisten chatbot untuk pendampingan ideasi kreator.',
        'Membangun teleprompter web in-house dengan ritme tersinkronisasi, sehingga kreator bisa langsung dari naskah ke rekaman tanpa keluar aplikasi.',
      ],
    },
    resultHighlights: {
      en: [
        'Structured content concepts',
        'Muse Spark 1.1 natural script flow',
        'Integrated in-house teleprompter',
      ],
      id: [
        'Konsep konten terstruktur',
        'Naskah natural Muse Spark 1.1',
        'Teleprompter web in-house',
      ],
    },
    finalOutput: {
      en: 'Inotrive taught me that the hardest part of making content is often the start, not knowing where to begin. So I focused on helping creators get past that point, not just on generating scripts.',
      id: 'Dari Inotrive saya belajar bahwa bagian tersulit membuat konten sering ada di awal, yaitu bingung mau mulai dari mana. Jadi fokus saya membantu kreator melewati tahap itu, bukan hanya menghasilkan naskahnya.',
    },
  },
  {
    slug: 'yayzi',
    route: '/project/yayzi',
    title: 'Yayzi',
    category: 'Web-App',
    context: 'Free Website / Idea Validation Platform',
    description: {
      en: 'A fast, temporary idea validation platform for creators. Upload a product, design, concept, or idea and get quick feedback from real people on a three-level scale: “Good”, “Good, but not sure I need it”, or “How much?”, a clear willingness-to-buy signal. Speed comes first, with privacy and security built in: no login or registration for creators or voters, no lengthy surveys, and no permanent data. An admin dashboard turns the votes into in-depth insights and AI-ready data.',
      id: 'Platform validasi ide sementara yang cepat untuk kreator. Unggah produk, desain, konsep, atau ide, lalu dapatkan umpan balik cepat dari orang sungguhan lewat tiga tingkat respons: “Bagus”, “Bagus, tapi belum yakin butuh”, atau “Berapa harganya?”, sinyal niat beli yang jelas. Kecepatan jadi prioritas utama, dengan privasi dan keamanan yang tetap terjaga: tanpa login atau pendaftaran bagi kreator maupun pemberi suara, tanpa survei panjang, dan tanpa data permanen. Dasbor admin mengubah suara menjadi wawasan mendalam dan data siap olah AI.',
    },
    stack: ['Next.js', 'Supabase'],
    accent: '#f0a860',
    Icon: TbWorld,
    thumbnail: '/Projects/Yayzi.png',
    // 3 gambar bisa ditaro disini
    showcase: [
      '/Projects/Yayzi-Src/Yayzi-1.png',
      '/Projects/Yayzi-Src/Yayzi-2.png',
      '/Projects/Yayzi-Src/Yayzi-3.png',
    ],
    website: 'https://yayzi.vercel.app',
    keyPoints: {
      en: [
        'Identified a recurring product-management pain point firsthand (fast delivery pressure, repeated trial and error, feature mismatch) and built Yayzi end-to-end to solve it.',
        'Put speed first with a no-login validation flow, since every extra step lowers response rates: creators upload an idea, get a shareable link, and voters respond in seconds.',
        'Designed a three-level feedback scale (“Good”, “Good, but not sure I need it”, “How much?”) that separates polite interest from clear willingness to buy, instead of a simple agree/disagree.',
        'Made privacy a product guarantee: sessions auto-expire (1–10 days), then all data and images are permanently deleted.',
        'Built the security layer without slowing users down: hashed voter phone numbers to block duplicate votes, hashed-PIN results dashboards, and Cloudflare Turnstile instead of disruptive CAPTCHAs.',
        'Built an admin dashboard that turns votes into insights and AI-ready data.',
      ],
      id: [
        'Menemukan masalah product management yang berulang dari pengalaman langsung (tuntutan delivery cepat, trial and error berulang, fitur yang tidak match) dan membangun Yayzi end-to-end untuk menyelesaikannya.',
        'Mengutamakan kecepatan lewat alur validasi tanpa login karena setiap langkah tambahan menurunkan jumlah respons: kreator mengunggah ide, mendapat tautan untuk dibagikan, dan pemilih merespons dalam hitungan detik.',
        'Merancang skala umpan balik tiga tingkat (“Bagus”, “Bagus, tapi belum yakin butuh”, “Berapa harganya?”) yang memisahkan minat sopan dari niat beli yang jelas, bukan sekadar setuju atau tidak setuju.',
        'Menjadikan privasi sebagai jaminan produk: sesi kedaluwarsa otomatis (1–10 hari), lalu seluruh data dan gambar dihapus permanen.',
        'Membangun lapisan keamanan tanpa memperlambat pengguna: nomor telepon pemilih di-hash untuk mencegah suara ganda, dasbor hasil dengan PIN ter-hash, dan Cloudflare Turnstile sebagai ganti CAPTCHA yang mungkin merasa mengganggu(butuh action).',
        'Membangun dasbor admin yang mengubah suara menjadi wawasan dan data siap olah AI.',
      ],
    },
    resultHighlights: {
      en: [
        'Live on Vercel',
        'No sign-up, answers in minutes',
        'Buy-intent signal, auto-expiring data',
      ],
      id: [
        'Live di Vercel',
        'Tanpa daftar, jawaban dalam menit',
        'Sinyal niat beli, data kedaluwarsa otomatis',
      ],
    },
    finalOutput: {
      en: 'Yayzi came from my own experience as a Product Manager: ideas and features are expected to move fast, and many end in trial and error or miss what users actually want. I built it so a quick signal from real people, including whether they would actually pay, takes minutes, before a team spends weeks building the wrong thing.',
      id: 'Yayzi lahir dari pengalaman saya sebagai Product Manager: ide dan fitur dituntut cepat jalan, dan banyak yang berakhir trial and error atau tidak sesuai dengan yang benar-benar dibutuhkan pengguna. Saya membuatnya agar sinyal cepat dari orang sungguhan, termasuk apakah mereka benar-benar mau membayar, bisa didapat dalam hitungan menit, sebelum tim menghabiskan waktu berminggu-minggu membangun hal yang salah.',
    },
  },
  {
    slug: 'paja-barbershop',
    route: '/project/paja-barbershop',
    title: 'Paja Barbershop',
    category: 'Web-App',
    context: 'Client Project / Team of 4 (Project Manager)',
    description: {
      en: 'A comprehensive booking and management application for Paja Barbershop, which includes a website for customers and a dedicated back-office application for staff to manage master data and handle offline bookings and orders—developed by a team of four, with me serving as Project Manager.',
      id: 'Sebuah aplikasi pemesanan dan manajemen lengkap untuk Paja Barbershop, yang mencakup situs web untuk pelanggan serta aplikasi backoffice khusus bagi staf untuk mengelola data induk dan menangani pemesanan/pesanan offline — dikembangkan oleh tim beranggotakan 4 orang, di mana saya bertindak sebagai Manajer Proyek.',
    },
    stack: ['Next.js', 'React', 'Express.js', 'PostgreSQL'],
    accent: '#D3D3D3',
    Icon: TbWorld,
    thumbnail: '/Projects/PajaBarbershop.png',
    // 3 gambar bisa ditaro disini
    showcase: [
      '/Projects/Paja-Src/Paja-1.png',
      '/Projects/Paja-Src/Paja-2.png',
      '/Projects/Paja-Src/Paja-3.png',
    ],
    website: 'https://pajabarbershop.com',
    keyPoints: {
      en: [
        'Led project planning and team coordination across a 4-person team, from feature scoping to delivery.',
        'Acted as the main point of contact with the client, translating business needs into actionable technical requirements.',
        'Delivered a customer-facing website (NextJS) with online booking/reservation, service & pricing catalog, and barber profiles with gallery.',
        'Delivered a separate backoffice application (Express + React + TailwindCSS) for staff to manage bookings, services, and promotions.',
        'Built an integrated promo system to support the client\'s marketing and customer retention efforts.',
      ],
      id: [
        'Memimpin perencanaan proyek dan koordinasi tim beranggotakan 4 orang, dari penentuan cakupan fitur hingga delivery.',
        'Menjadi titik komunikasi utama dengan klien, menerjemahkan kebutuhan bisnis menjadi kebutuhan teknis yang bisa dikerjakan.',
        'Merilis situs untuk pelanggan (NextJS) dengan pemesanan/reservasi online, katalog layanan & harga, serta profil barber beserta galerinya.',
        'Merilis aplikasi backoffice terpisah (Express + React + TailwindCSS) agar staf dapat mengelola pemesanan, layanan, dan promosi.',
        'Membangun sistem promo terintegrasi untuk mendukung upaya pemasaran dan retensi pelanggan klien.',
      ],
    },
    resultHighlights: {
      en: [
        'Live client website',
        'Online booking system',
        'Dedicated backoffice app',
        'Integrated promo system',
      ],
      id: [
        'Situs klien sudah live',
        'Sistem pemesanan online',
        'Aplikasi backoffice khusus',
        'Sistem promo terintegrasi',
      ],
    },
    finalOutput: {
      en: 'Paja Barbershop was a real client project I worked on with a team. As Project Manager, I learned that much of the job is turning what the client wants into clear tasks for the team.',
      id: 'Paja Barbershop adalah proyek klien nyata yang saya kerjakan bersama tim. Sebagai Project Manager, saya belajar bahwa pekerjaan terbesarnya ada di menerjemahkan kebutuhan klien menjadi tugas yang jelas untuk tim.',
    },
  },
  {
    slug: 'watch-site',
    route: '/project/watch-site',
    title: 'WatchSite',
    category: 'Web-App',
    context: 'Personal Learning Project / Movie Discovery App',
    description: {
      en: 'A self-driven learning project for exploring movies — browsing titles, watching trailers, and reading synopses with zero-friction direct access and no login required, powered by The Movie Database (TMDB) API.',
      id: 'Proyek belajar mandiri untuk menjelajahi film — menelusuri judul, menonton trailer, dan membaca sinopsis secara instan tanpa perlu login, ditenagai oleh API The Movie Database (TMDB).',
    },
    stack: ['React', 'Next.js', 'TMDB API', 'Vercel'],
    accent: '#c060f0',
    Icon: TbWorld,
    thumbnail: '/Projects/WatchSite.webp',
    // 3 gambar bisa ditaro disini
    showcase: [
      '/Projects/Watchsite-Src/Watchsite-1.png',
      '/Projects/Watchsite-Src/Watchsite-2.png',
      '/Projects/Watchsite-Src/Watchsite-3.png',
    ],
    website: 'https://watch-site.vercel.app',
    keyPoints: {
      en: [
        'Zero-friction instant access: No account creation or login required to explore movies, search, or stream trailers.',
        'Integrated the TMDB API to fetch real-time movie catalogs, cast metadata, synopses, and backdrop artwork.',
        'Debounced query dispatcher preventing redundant API calls during rapid search typing.',
        'Continuous deployment on Vercel edge infrastructure for low-latency media and streaming delivery.',
      ],
      id: [
        'Akses instan tanpa hambatan: Tanpa perlu registrasi atau login untuk menjelajahi film, mencari, dan menonton trailer.',
        'Mengintegrasikan API TMDB untuk mengambil katalog film, informasi pemeran, sinopsis, dan poster resolusi tinggi secara real time.',
        'Debounced query dispatcher untuk mencegah pemanggilan API berlebih saat pengguna mengetik pencarian cepat.',
        'Deployment stabil di infrastruktur edge Vercel untuk latensi rendah dan pemutaran media responsif.',
      ],
    },
    resultHighlights: {
      en: [
        'Live on Vercel',
        'No login required',
        'TMDB API integration',
      ],
      id: [
        'Live di Vercel',
        'Tanpa perlu login',
        'Integrasi API TMDB',
      ],
    },
    finalOutput: {
      en: 'I built WatchSite to learn. Working with the TMDB API directly taught me how to handle external data, like limiting API calls while someone types in the search box.',
      id: 'WatchSite saya buat untuk belajar. Dengan memakai API TMDB langsung, saya jadi paham cara menangani data dari luar, misalnya membatasi pemanggilan API saat pengguna mengetik di kolom pencarian.',
    },
  },
  {
    slug: 'procurement-ecosystem-mapping',
    route: '/project/procurement-ecosystem-mapping',
    title: 'Procurement OCR & AI Compliance Checker (PoC)',
    category: 'Automation & Bot',
    context: 'PT Bank Mandiri / Enterprise Workflow',
    description: {
      en: 'Built out of a recurring problem in daily procurement work — missing written clauses and mismatched data between documents. Developed an internal PoC sandbox with no login required using Azure Document Intelligence (OCR) to parse raw text and Google Gemini AI to map JSON fields, automatically distinguishing filled fields against missing SOP clauses.',
      id: 'Berangkat dari masalah yang berulang dalam pekerjaan procurement sehari-hari — klausul yang tidak tertulis dan data yang tidak cocok antar dokumen. Membangun sandbox PoC internal tanpa login memakai Azure Document Intelligence (OCR) untuk membaca teks mentah dan Google Gemini AI untuk memetakan skema JSON, membedakan field yang terisi vs klausul SOP yang hilang.',
    },
    stack: [
      'Azure Document Intelligence (OCR)',
      'Google Gemini AI',
      'Google Apps Script',
      'JSON Schema Validation',
      'Workflow Analysis',
    ],
    accent: '#70aaff',
    Icon: TbMap,
    thumbnail: '/Works/BankMandiri.jpg',
    // 3 gambar bisa ditaro disini
    showcase: [],
    keyPoints: {
      en: [
        'Noticed recurring friction in daily procurement work: missing written clauses and data discrepancies across cross-referenced documents.',
        'Built a zero-login internal PoC sandbox allowing procurement specialists to immediately upload bank guarantee and agreement PDFs.',
        'Integrated Azure Document Intelligence OCR to extract raw unstructured text and complex multi-page financial tables.',
        'Orchestrated Google Gemini AI to gather and match extracted text into standardized JSON schema fields.',
        'Automated discrepancy analysis, instantly contrasting filled valid fields against missing mandatory SOP clauses.',
        'Validated Proof of Concept using anonymized historical documents with zero leakage of banking data.',
      ],
      id: [
        'Menemukan masalah yang berulang dalam pekerjaan procurement sehari-hari: informasi yang tidak tertulis dan ketidakcocokan data antar dokumen terkait.',
        'Membangun sandbox PoC internal tanpa login, memungkinkan spesialis pengadaan langsung mengunggah PDF jaminan bank dan kontrak.',
        'Mengintegrasikan Azure Document Intelligence OCR untuk membaca teks mentah dan mengekstrak tabel finansial multi-halaman.',
        'Mengorkestrasi Google Gemini AI untuk mengumpulkan dan mencocokkan teks ke field format skema JSON terstandar.',
        'Analisis ketidaksesuaian otomatis, membandingkan field yang terisi valid terhadap klausul wajib SOP yang hilang.',
        'Memvalidasi Proof of Concept memakai dokumen lampau yang dianonimkan untuk membuktikan kelayakan dengan jaminan nol kebocoran data.',
      ],
    },
    resultHighlights: {
      en: [
        'Working MVP on Google Apps Script',
        'Zero-login internal PoC sandbox',
        'Azure OCR & Gemini JSON matching',
      ],
      id: [
        'MVP berjalan di Google Apps Script',
        'Sandbox PoC internal tanpa login',
        'Pencocokan JSON Azure OCR & Gemini',
      ],
    },
    finalOutput: {
      en: 'This project originated from my daily work validating guarantee documents. Manually checking the completeness of clauses and reconciling data across documents is time-consuming and prone to errors, while a single revision can delay the process by 1–2 days. I built this MVP to make these checks faster and more consistent.',
      id: 'Proyek ini berawal dari pekerjaan harian saya memvalidasi dokumen penjaminan. Memeriksa kelengkapan klausul dan mencocokkan data antar dokumen secara manual memakan waktu dan mudah terlewat, sementara satu kali revisi bisa menunda proses 1–2 hari. Saya membangun MVP ini untuk membuat pemeriksaan tersebut lebih cepat dan konsisten.',
    },
  },
  {
    slug: 'edulocal',
    route: '/project/edulocal',
    title: 'EduLocal',
    category: 'Mobile App',
    context: 'College Group Assignments / Course Discovery',
    description: {
      en: 'A cross-platform mobile application built with Flutter and Firebase that connects learners with nearby English and Mathematics courses, featuring location-based discovery for students and an onboarding & CRM lead console for course partners.',
      id: 'Aplikasi mobile multiplatform yang dibangun dengan Flutter dan Firebase untuk menghubungkan siswa dengan kursus Bahasa Inggris dan Matematika terdekat, dilengkapi penelusuran berbasis lokasi untuk siswa serta konsol pendaftaran dan CRM prospek untuk mitra kursus.',
    },
    stack: ['Flutter', 'Dart', 'Firebase', 'Cloud Firestore', 'Location-based'],
    accent: '#70aaff',
    Icon: TbDeviceMobile,
    // 3 gambar bisa ditaro disini
    showcase: [],
    keyPoints: {
      en: [
        'Engineered dual-role mobile workflows: learner discovery journey and course partner (mitra kursus) operations.',
        'Student flow: Login, dashboard, GPS location detection, nearby English & Math recommendations, syllabus check, transparent pricing, and registration form.',
        'Mitra flow: Login, course management, coordinate location pinning, 2–3 photo uploads, syllabus authoring, and course publishing.',
        'Real-time CRM lead management: Empowers tutoring partners to monitor and follow up with registered student submissions.',
        'Built cross-platform with Flutter and backed by Firebase Authentication, Cloud Firestore, and Cloud Storage.',
      ],
      id: [
        'Merancang alur mobile dua peran: pengalaman penelusuran siswa dan operasional mitra penyedia kursus.',
        'Alur siswa: Login, dashboard, deteksi lokasi GPS, rekomendasi les Bahasa Inggris & Matematika terdekat, cek silabus, cek biaya, dan formulir pendaftaran.',
        'Alur mitra: Login, kelola kursus, pin koordinat lokasi, unggah 2–3 foto tempat, susun silabus, dan terbitkan kursus.',
        'Manajemen prospek CRM real-time: Memudahkan mitra kursus memantau dan mem-follow up siswa yang mendaftar.',
        'Dibangun cross-platform dengan Flutter ditenagai Firebase Auth, Cloud Firestore, dan Firebase Storage.',
      ],
    },
    resultHighlights: {
      en: [
        'Location-first course discovery',
        'Dual student & partner workflows',
        'Direct CRM lead follow-up',
      ],
      id: [
        'Penemuan kursus berbasis lokasi',
        'Alur terpadu siswa & mitra',
        'Follow-up prospek CRM langsung',
      ],
    },
    finalOutput: {
      en: 'With EduLocal I learned that complete information isn’t enough. Users are better served when the closest courses show up first.',
      id: 'Di EduLocal saya belajar bahwa informasi yang lengkap saja belum cukup. Pengguna lebih terbantu kalau kursus yang paling dekat dengan mereka ditampilkan lebih dulu.',
    },
  },
  {
    slug: 'meta-lead-bot',
    route: '/project/meta-lead-bot',
    title: 'Meta AI Commerce Autoresponder',
    category: 'Automation & Bot',
    context: 'Personal Project / E-Commerce AI Bot',
    description: {
      en: 'A high-concurrency serverless autoresponder built with Hono.js on Cloudflare Workers and Supabase pgvector, designed to handle viral social campaign spikes across Meta Messenger and comments with 24/7 RAG answers.',
      id: 'Bot autoresponder serverless berkinerja tinggi yang dibangun dengan Hono.js di Cloudflare Workers dan Supabase pgvector, dirancang untuk menangani lonjakan kampanye viral di Meta Messenger dan komentar dengan balasan RAG 24/7.',
    },
    stack: ['Hono.js', 'Cloudflare Workers', 'Wrangler', 'Supabase Vector', 'OpenRouter', 'Mistral'],
    accent: '#0084ff',
    Icon: TbBrandMeta,
    showcase: [],
    keyPoints: {
      en: [
        "Built to solve a sudden viral surge on my mother's Meta business account that gained 12K followers in 2–3 weeks.",
        'Eliminated customer service backlog where 1 staff member was overwhelmed by incoming personal messages and leads.',
        'Engineered edge webhook listener using Hono.js on Cloudflare Workers deployed via Wrangler for ultra-low latency.',
        'Integrated Supabase pgvector cosine similarity search to retrieve exact product catalogs, pricing, and business FAQs.',
        'Orchestrated OpenRouter with Mistral-7B to synthesize friendly, context-accurate responses directly to customer DMs.',
      ],
      id: [
        'Dibuat untuk mengatasi lonjakan konten viral di akun bisnis Meta milik ibu saya yang meraih 12 ribu followers dalam 2–3 minggu.',
        'Mengatasi keterbatasan 1 orang staf karyawan yang kewalahan membalas banjir chat personal dan pertanyaan produk.',
        'Membangun listener webhook edge memakai Hono.js di Cloudflare Workers dideploy dengan Wrangler untuk latensi sub-detik.',
        'Mengintegrasikan pencarian kemiripan kosinus Supabase pgvector untuk mengambil data katalog produk, harga, dan FAQ.',
        'Mengorkestrasi OpenRouter dengan Mistral-7B untuk menyusun balasan percakapan yang ramah dan akurat langsung ke DM pelanggan.',
      ],
    },
    resultHighlights: {
      en: [
        'Handled 12K+ follower traffic spike',
        '24/7 instant lead capture',
        '<800ms edge response latency',
      ],
      id: [
        'Menangani lonjakan 12K+ followers',
        'Penangkapan leads instan 24/7',
        'Latensi respon edge <800ms',
      ],
    },
    finalOutput: {
      en: 'I built this bot because my mom business account suddenly got blew up, and only one staff member was replying to messages and also keep the store. The bot answers automatically from product data and the FAQ, so no potential buyer gets missed and server costs didn’t go up.',
      id: 'Bot ini saya buat karena akun bisnis ibu saya tiba-tiba ramai, sementara hanya ada satu staf yang membalas pesan dan menjaga toko sekalian. Bot menjawab otomatis dari data produk dan FAQ, jadi tidak ada calon pembeli yang terlewat dan biaya server tidak ikut naik.',
    },
  },
  {
    slug: 'telegram-pos-bot',
    route: '/project/telegram-pos-bot',
    title: 'Telegram POS & Cashier Bot',
    category: 'Automation & Bot',
    context: 'Personal Project / Serverless Retail POS',
    description: {
      en: 'A serverless conversational cashier terminal built on Cloudflare Workers and Neon PostgreSQL, featuring two-tier parsing (deterministic regex rules + Claude Haiku AI recovery), pre-upload summaries, debt tracking, and PIN-secured profit reports.',
      id: 'Terminal kasir percakapan serverless di Cloudflare Workers dan Neon PostgreSQL, dilengkapi parser dua tahap (aturan regex deterministik + pemulihan AI Claude Haiku), ringkasan pre-upload, buku utang bon, dan rekap laba ber-PIN.',
    },
    stack: ['Telegram Bot API', 'Hono.js', 'Cloudflare Workers', 'Neon Tech', 'PostgreSQL', 'Claude Haiku 3.5'],
    accent: '#2AABEE',
    Icon: TbBrandTelegram,
    showcase: [],
    keyPoints: {
      en: [
        'Engineered 6 core retail modules: Penjualan (/jual), Pembelian (/beli), Rekap Harian (/rekapharian), Utang & Bon (/utangbon), Manajemen Akun (/manajemenakun), and Rekap Full (/rekapfull).',
        'Streamlined sales command workflow: Cashiers type natural shorthand strings (e.g. jual [product] harga [xxx] modal [xxx] metode [cash/qris]).',
        'Two-tier parsing architecture: Fast deterministic regex rules match standard inputs; automatic Claude Haiku 3.5 fallback repairs broken syntax and typos.',
        'Interactive transaction review: Generates pre-upload summary messages with Edit and Cancel buttons before asking final confirmation.',
        'Real-time automated accounting: Commits ACID records to Neon Serverless PostgreSQL and immediately broadcasts the updated daily recap.',
        'PIN-protected admin audit: Restricts sensitive full profit-and-loss margins and net revenue analytics to authorized store owners.',
      ],
      id: [
        'Membangun 6 modul kasir esensial: Penjualan (/jual), Pembelian (/beli), Rekap Harian (/rekapharian), Utang & Bon (/utangbon), Manajemen Akun (/manajemenakun), dan Rekap Full (/rekapfull).',
        'Alur perintah jual terstandar: Kasir mengetik format ringkas (contoh: jual [produk] harga [xxx] modal [xxx] metode [cash/qris]).',
        'Arsitektur parsing dua tahap: Regex deterministik cepat untuk input standar; fallback otomatis Claude Haiku 3.5 untuk memperbaiki salah ketik atau format bebas.',
        'Review transaksi interaktif: Menampilkan ringkasan pre-upload dengan tombol Edit dan Batal sebelum konfirmasi final.',
        'Pembukuan otomatis real-time: Menyimpan transaksi ACID ke Neon Serverless PostgreSQL dan langsung menampilkan rekapan harian terbaru.',
        'Audit laba ber-PIN: Mengunci laporan keuangan komprehensif dan perhitungan keuntungan bersih hanya untuk pemilik toko ber-PIN.',
      ],
    },
    resultHighlights: {
      en: [
        '6 complete retail POS modules',
        'Rules + Claude Haiku hybrid parser',
        'PIN-secured profit analytics',
      ],
      id: [
        '6 modul kasir retail lengkap',
        'Parser hybrid Aturan + Claude Haiku',
        'Analisis laba bersih berproteksi PIN',
      ],
    },
    finalOutput: {
      en: 'I wanted cashiers to record sales without dedicated POS hardware, just through Telegram. The cashier types a short message, regex rules read the standard format, and AI only steps in when there’s a typo. Recording stays fast and the daily recap shows up right away.',
      id: 'Saya ingin kasir bisa mencatat penjualan tanpa alat POS khusus, cukup lewat Telegram. Kasir mengetik pesan singkat, aturan regex membaca format yang standar, dan AI hanya turun tangan kalau ada salah ketik. Pencatatan tetap cepat dan rekap harian langsung muncul..',
    },
  },
]

