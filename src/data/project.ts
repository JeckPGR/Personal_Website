import type { IconType } from 'react-icons'
import {
  TbDeviceDesktop,
  TbDeviceMobile,
  TbMap,
  TbSparkles,
  TbWorld,
} from 'react-icons/tb'
import type { Localized } from '../i18n/localized'

export type ProjectCategory = 'Web-App' | 'Mobile App'

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
]

export const projects: ProjectItem[] = [
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
    stack: ['AI', 'Product', 'Content Strategy'],
    accent: '#63d848',
    Icon: TbSparkles,
    thumbnail: '/Projects/Inotrive.png',
    website: 'https://inotrive.com',
    keyPoints: {
      en: [
        'Turns early content ideas into structured, ready-to-execute concepts for creators, personal brands, and MSMEs.',
        'Guides content angle discovery, hook structuring, and problem–solution framing.',
        'Generates section-based scripts and prepares visual cues for production.',
        'Produces supporting elements such as captions, hashtags, and sound references.',
      ],
      id: [
        'Mengubah ide konten awal menjadi konsep terstruktur yang siap dieksekusi bagi kreator, personal brand, dan UMKM.',
        'Memandu pencarian angle konten, penyusunan hook, dan pembingkaian masalah–solusi.',
        'Menghasilkan naskah per bagian sekaligus menyiapkan petunjuk visual untuk produksi.',
        'Menyediakan elemen pendukung seperti caption, hashtag, dan referensi sound.',
      ],
    },
    resultHighlights: {
      en: [
        'Structured content concepts',
        'Faster ideation for creators',
        'AI-assisted scripting & assets',
      ],
      id: [
        'Konsep konten terstruktur',
        'Ideasi kreator lebih cepat',
        'Naskah & aset dibantu AI',
      ],
    },
    finalOutput: {
      en: 'Building Inotrive pushed me to treat AI as a practical product layer — reducing the friction creators feel at the very start of the content process, not just automating the output.',
      id: 'Membangun Inotrive mendorong saya memperlakukan AI sebagai lapisan alat bantu yang praktis, mengurangi hambatan yang dirasakan kreator di awal proses konten, bukan sekadar mengotomasi hasil akhirnya.',
    },
  },
  {
    slug: 'yayzi',
    route: '/project/yayzi',
    title: 'Yayzi',
    category: 'Web-App',
    context: 'Personal Product / Idea Validation Platform',
    description: {
      en: 'A temporary idea validation platform that prioritizes privacy and security, where creators can upload products, designs, concepts, or ideas, and gather quick feedback in the form of “Agree” or “Disagree” from real people—complete with an admin dashboard for in-depth insights and data ready for AI processing. No login or registration is required for creators or voters; there are no lengthy surveys, and no data is stored permanently.',
      id: 'Sebuah platform validasi ide sementara yang mengutamakan privasi dan keamanan, tempat para kreator dapat mengunggah produk, desain, konsep, atau ide, serta mengumpulkan umpan balik cepat berupa “Setuju” atau “Tidak Setuju” dari orang-orang sungguhan, dilengkapi dengan dasbor admin untuk wawasan mendalam dan data yang siap diolah oleh AI. Tidak perlu login atau mendaftar bagi kreator maupun pemberi suara, tidak ada survei panjang, dan tidak ada data permanen.',
    },
    stack: ['NextJS', 'Vercel', 'Supabase'],
    accent: '#f0a860',
    Icon: TbWorld,
    thumbnail: '/Projects/Yayzi.png',
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
      id: 'Yayzi dibangun untuk menjawab satu pertanyaan dengan cepat, apakah orang-orang benar-benar menginginkan ini? — dan peluncurannya secara langsung mengubah pertanyaan itu menjadi alat yang nyata dan dapat digunakan, alih-alih sekadar ide lain yang tertahan di tahap perencanaan',
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
  stack: ['NextJS', 'React', 'Express', 'TailwindCSS', 'Vercel'],
  accent: '#D3D3D3',
  Icon: TbWorld,
  thumbnail: '/Projects/PajaBarbershop.png',
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
    en: 'Paja Barbershop was a real client engagement that pushed beyond solo development — managing a 4-person team while balancing client communication taught how to translate business needs into a coordinated technical delivery, spanning both a customer-facing site and an internal backoffice system.',
    id: 'Paja Barbershop adalah proyek klien nyata yang menuntut lebih dari sekadar kerja solo — mengelola tim 4 orang sambil menjaga komunikasi dengan klien mengajarkan cara menerjemahkan kebutuhan bisnis menjadi delivery teknis yang terkoordinasi, mencakup situs pelanggan sekaligus sistem backoffice internal.',
  },
  },
  {
    slug: 'watch-site',
    route: '/project/watch-site',
    title: 'WatchSite',
    category: 'Web-App',
    context: 'Personal Learning Project / Movie Discovery App',
    description: {
      en: 'A self-driven learning project for exploring movies — browsing titles, watching trailers, and reading synopses, powered by The Movie Database (TMDB) API.',
      id: 'Proyek belajar mandiri untuk menjelajahi film — menelusuri judul, menonton trailer, dan membaca sinopsis, ditenagai oleh API The Movie Database (TMDB).',
    },
    stack: ['NextJS', 'Vercel', 'TMDB API'],
    accent: '#c060f0',
    Icon: TbWorld,
    thumbnail: '/Projects/WatchSite.webp',
    website: 'https://watch-site.vercel.app',
    keyPoints: {
      en: [
        'Integrated the TMDB API to fetch and display movie data, trailers, and synopses in real time.',
        'Built a browsing experience for discovering both classic and latest movie releases.',
        'Used this project as a hands-on way to learn API integration and data fetching patterns.',
        'Deployed on Vercel for quick iteration and easy sharing.',
      ],
      id: [
        'Mengintegrasikan API TMDB untuk mengambil dan menampilkan data film, trailer, serta sinopsis secara real time.',
        'Membangun pengalaman penelusuran untuk menemukan film klasik maupun rilisan terbaru.',
        'Menjadikan proyek ini latihan langsung untuk mempelajari integrasi API dan pola pengambilan data.',
        'Dideploy di Vercel agar iterasi cepat dan mudah dibagikan.',
      ],
    },
    resultHighlights: {
      en: [
        'Live on Vercel',
        'TMDB API integration',
        'Movie browsing & trailers',
      ],
      id: [
        'Live di Vercel',
        'Integrasi API TMDB',
        'Penelusuran film & trailer',
      ],
    },
    finalOutput: {
      en: 'WatchSite was built purely as a learning exercise — working with a real-world API like TMDB taught more about handling external data than any tutorial could, and turned theory into a working, browsable app.',
      id: 'WatchSite dibangun murni sebagai latihan — bekerja dengan API nyata seperti TMDB mengajarkan pengelolaan data eksternal jauh lebih baik daripada tutorial mana pun, dan mengubah teori menjadi aplikasi yang benar-benar bisa dijelajahi.',
    },
  },
  {
    slug: 'procurement-ecosystem-mapping',
    route: '/project/procurement-ecosystem-mapping',
    title: 'Procurement OCR & AI Compliance Checker (PoC)',
    category: 'Web-App',
    context: 'PT Bank Mandiri / Enterprise Workflow',
    description: {
      en: 'Built out of a recurring problem in daily procurement work — missing written clauses and mismatched data between documents. Developed an MVP using Azure Document Intelligence (OCR) and Generative AI (Vertex AI) as an early guard to catch these errors before they slip through.',
      id: 'Berangkat dari masalah yang berulang dalam pekerjaan procurement sehari-hari — klausul yang tidak tertulis dan data yang tidak cocok antar dokumen. Membangun MVP dengan Azure Document Intelligence (OCR) dan Generative AI (Vertex AI) sebagai penjaga awal untuk menangkap kesalahan tersebut sebelum lolos.',
    },
    stack: [
      'Google Apps Script',
      'Azure Document Intelligence (OCR)',
      'Vertex AI (Generative AI)',
      'System Mapping',
      'Workflow Analysis',
    ],
    accent: '#70aaff',
    Icon: TbMap,
    thumbnail: '/Projects/mandiri-1.png',
    showcase: [],
    keyPoints: {
      en: [
        'Noticed a recurring problem in daily procurement work: missing written information and data mismatches between related documents.',
        'Mapped the procurement application ecosystem and document flow to understand where these inconsistencies originated.',
        'Built an MVP in Google Apps Script integrating Azure Document Intelligence (OCR) and Generative AI (Vertex AI) as an early guard to automatically flag missing or conflicting information against SOP requirements.',
        'Validated the Proof of Concept using anonymized past documents, with sensitive figures and data removed or altered, to demonstrate feasibility without exposing confidential information.',
      ],
      id: [
        'Menemukan masalah yang berulang dalam pekerjaan procurement sehari-hari: informasi yang tidak tertulis dan ketidakcocokan data antar dokumen terkait.',
        'Memetakan ekosistem aplikasi procurement dan alur dokumennya untuk memahami dari mana ketidakkonsistenan itu berasal.',
        'Membangun MVP di Google Apps Script yang memadukan Azure Document Intelligence (OCR) dan Generative AI (Vertex AI) sebagai penjaga awal untuk menandai informasi yang hilang atau bertentangan dengan ketentuan SOP secara otomatis.',
        'Memvalidasi Proof of Concept memakai dokumen lampau yang dianonimkan — angka dan data sensitif dihapus atau diubah — untuk membuktikan kelayakannya tanpa membuka informasi rahasia.',
      ],
    },
    resultHighlights: {
      en: [
        'Working MVP built on Google Apps Script',
        'Early-guard checkpoint against document errors',
        'Validated PoC using anonymized historical documents',
      ],
      id: [
        'MVP berjalan di Google Apps Script',
        'Titik jaga awal terhadap kesalahan dokumen',
        'PoC tervalidasi dengan dokumen historis anonim',
      ],
    },
    finalOutput: {
      en: 'This project started from a problem I lived with daily, not one assigned to me — repeatedly catching missing clauses or mismatched data between documents. Turning that frustration into a working MVP taught me how everyday friction, if paid attention to, can become the seed of a real product solution.',
      id: 'Proyek ini berawal dari masalah yang saya alami sendiri setiap hari, bukan tugas yang diberikan kepada saya — berulang kali menemukan klausul yang hilang atau data yang tidak cocok antar dokumen. Mengubah rasa frustrasi itu menjadi MVP yang berjalan mengajarkan saya bahwa gesekan sehari-hari, kalau diperhatikan, bisa menjadi benih solusi produk yang nyata.',
    },
  },
  {
    slug: 'edulocal',
    route: '/project/edulocal',
    title: 'EduLocal',
    category: 'Mobile App',
    context: 'College Group Assignments / Course Discovery',
    description: {
      en: 'A mobile app that helps users discover English and Mathematics courses around Bandung, with detailed pricing, class options, syllabus, and categories — plus a location-based feature that surfaces the nearest course providers first.',
      id: 'Aplikasi mobile yang membantu pengguna menemukan kursus Bahasa Inggris dan Matematika di sekitar Bandung, lengkap dengan rincian harga, pilihan kelas, silabus, dan kategori — ditambah fitur berbasis lokasi yang menampilkan penyedia kursus terdekat lebih dulu.',
    },
    stack: ['Mobile', 'Location-based', 'UX'],
    accent: '#70aaff',
    Icon: TbDeviceMobile,
    keyPoints: {
      en: [
        'Helps users discover English and Mathematics courses around Bandung.',
        'Presents detailed course information: pricing, class options, syllabus, and categories.',
        'Location-based feature highlights the nearest course providers from the main menu.',
        'Improves accessibility to relevant local learning options.',
      ],
      id: [
        'Membantu pengguna menemukan kursus Bahasa Inggris dan Matematika di sekitar Bandung.',
        'Menyajikan informasi kursus secara rinci: harga, pilihan kelas, silabus, dan kategori.',
        'Fitur berbasis lokasi menyorot penyedia kursus terdekat langsung dari menu utama.',
        'Meningkatkan akses ke pilihan pembelajaran lokal yang relevan.',
      ],
    },
    resultHighlights: {
      en: [
        'Location-first discovery',
        'Detailed course information',
        'Better local learning access',
      ],
      id: [
        'Penemuan berbasis lokasi',
        'Informasi kursus terperinci',
        'Akses belajar lokal lebih mudah',
      ],
    },
    finalOutput: {
      en: 'EduLocal taught me how much location context shapes a good discovery experience — the right information matters, but surfacing what is nearby first is what makes it genuinely useful.',
      id: 'EduLocal mengajarkan betapa besar pengaruh konteks lokasi pada pengalaman penemuan yang baik — informasi yang tepat itu penting, tetapi menampilkan yang terdekat lebih dulu yang membuatnya benar-benar berguna.',
    },
  },
]
