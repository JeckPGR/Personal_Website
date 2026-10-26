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
        'Engineered an automated garment masking and neural pose-transfer pipeline for virtual fashion models with ~30s turnaround.',
        'Built an integrated e-commerce suite featuring an AI Photo Studio, AI Product Description text generator, and Campaign Maker.',
        'Developed an Image Eraser and aspect ratio tool optimized for multi-platform e-commerce standards (1:1, 3:4, and 9:16).',
        'Architected backend services on NestJS, Redis, PostgreSQL, and Google Cloud Console for rapid batching and low latency.',
        'Ensured fabric texture preservation, exact color hue fidelity, and marketplace-compliant lighting outputs.',
      ],
      id: [
        'Merancang pipeline masking pakaian otomatis dan pose-transfer neural untuk model fashion virtual dengan proses ~30 detik.',
        'Membangun rangkaian fitur e-commerce terintegrasi: AI Photo Studio, AI Product Description generator, dan Campaign Maker.',
        'Mengembangkan alat Image Eraser dan penyesuaian rasio foto standar e-commerce (1:1, 3:4, dan 9:16).',
        'Merancang layanan backend dengan NestJS, Redis, PostgreSQL, dan Google Cloud Console untuk proses batching cepat dan latensi rendah.',
        'Menjaga retensi tekstur kain, akurasi tone warna asli, dan pencahayaan studio siap katalog marketplace.',
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
        'Onboarding with custom creator persona, target audience profiling, and brand voice calibration.',
        'Brainstorms angles and viral hooks powered by real-time Brave Web Search and trend tools.',
        'Flexible script generation: builds from scratch, raw ideas, brainstormed concepts, or Apify web crawlers.',
        'Benchmarked 8+ models (Muse, DeepSeek, Claude, ChatGPT, Gemini, Mistral, MiniMax); selected Muse Spark 1.1 for most natural phrasing.',
        'Built-in in-house web teleprompter with synchronized pacing cues, ready for recording and external video editing.',
        'Integrated RAG vector retrieval and chatbot assistant for interactive creator ideation.',
      ],
      id: [
        'Onboarding dengan profil persona kreator, pemetaan audiens target, dan kalibrasi karakter suara.',
        'Brainstorming angle dan hook viral ditenagai pencarian real-time Brave Web Search dan alat riset tren.',
        'Pembuatan naskah fleksibel: dari nol, ide mentah, konsep hasil brainstorming, atau data crawler Apify.',
        'Menguji 8+ model (Muse, DeepSeek, Claude, ChatGPT, Gemini, Mistral, MiniMax); memilih Muse Spark 1.1 untuk hasil naskah paling natural.',
        'Teleprompter web in-house dengan pengaturan ritme tersinkronisasi, siap rekaman dan lanjut ke editing video di luar aplikasi.',
        'Integrasi retrieval vektor RAG dan asisten chatbot cerdas untuk pendampingan ideasi kreator.',
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
      en: 'A temporary idea validation platform that prioritizes privacy and security, where creators can upload products, designs, concepts, or ideas, and gather quick feedback in the form of “Agree” or “Disagree” from real people—complete with an admin dashboard for in-depth insights and data ready for AI processing. No login or registration is required for creators or voters; there are no lengthy surveys, and no data is stored permanently.',
      id: 'Sebuah platform validasi ide sementara yang mengutamakan privasi dan keamanan, tempat para kreator dapat mengunggah produk, desain, konsep, atau ide, serta mengumpulkan umpan balik cepat berupa “Setuju” atau “Tidak Setuju” dari orang-orang sungguhan, dilengkapi dengan dasbor admin untuk wawasan mendalam dan data yang siap diolah oleh AI. Tidak perlu login atau mendaftar bagi kreator maupun pemberi suara, tidak ada survei panjang, dan tidak ada data permanen.',
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
        'Built a no-login validation flow: creators upload an idea, get a shareable link, and voters respond in seconds.',
        'Implemented auto-expiring sessions (1–10 days) after which all data and images are permanently deleted.',
        'Added privacy safeguards: hashed voter phone numbers to block duplicate votes, and PIN-protected (hashed, never plaintext) results dashboards for creators.',
        'Integrated Cloudflare Turnstile for anti-spam and brute-force protection without disruptive CAPTCHAs.',
        'Designed structured feedback beyond simple likes — Yay/Nay votes with reasons and purchase intent signals.',
      ],
      id: [
        'Membangun alur validasi tanpa login: kreator mengunggah ide, mendapat tautan yang bisa dibagikan, dan pemilih merespons dalam hitungan detik.',
        'Menerapkan sesi yang kedaluwarsa otomatis (1–10 hari), setelahnya seluruh data dan gambar dihapus permanen.',
        'Menambahkan pengaman privasi: nomor telepon pemilih di-hash untuk mencegah suara ganda, serta dasbor hasil kreator yang dilindungi PIN (di-hash, tidak pernah plaintext).',
        'Mengintegrasikan Cloudflare Turnstile sebagai perlindungan anti-spam dan brute-force tanpa CAPTCHA yang mengganggu.',
        'Merancang umpan balik terstruktur yang melampaui sekadar like — suara Yay/Nay disertai alasan dan sinyal minat beli.',
      ],
    },
    resultHighlights: {
      en: [
        'Live on Vercel',
        'No sign-up required',
        'Auto-expiring, privacy-first data',
      ],
      id: [
        'Live di Vercel',
        'Tanpa perlu daftar akun',
        'Data kedaluwarsa otomatis, privasi utama',
      ],
    },
    finalOutput: {
      en: 'Yayzi was created to quickly answer one question—do people really want this?—and its launch immediately turned that question into a real, usable tool, rather than just another idea stuck in the planning stage.',
      id: 'Yayzi dibangun untuk menjawab satu pertanyaan dengan cepat, apakah orang-orang benar-benar menginginkan ini? Dan peluncurannya secara langsung mengubah pertanyaan itu menjadi alat yang nyata dibutuhkan dan dapat digunakan, daripada sekadar ide lain yang tertahan di tahap perencanaan.',
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

