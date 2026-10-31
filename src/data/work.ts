import type { IconType } from 'react-icons'
import {
  TbBuildingBank,
  TbBuildingSkyscraper,
  TbSchool,
  TbTable,
  TbToolsKitchen2,
} from 'react-icons/tb'
import type { Localized } from '../i18n/localized'

export type WorkExperience = {
  slug: string
  route: string
  company: string
  location: string
  role: string
  /** Short label used on the right side of the list row */
  tag: string
  period: Localized
  accent: string
  Icon: IconType
  summary: Localized
  bullets: Localized<string[]>
  /** Short focus-area labels shown in the detail sidebar */
  tags: string[]
  /** Result / output chips shown in the detail "Key Results" section */
  highlights: Localized<string[]>
  /** Closing reflection quote shown at the bottom of the detail page */
  reflection: Localized
  /** Cover/thumbnail — the list-row preview and the detail hero banner. One image. */
  thumbnail?: string
  /**
   * Up to 3 journey/proof images for the detail page — these are *different*
   * pictures from the thumbnail. Empty slots render a "no image" placeholder.
   */
  showcase?: string[]
  /** External website URL; the visit link only appears when this is set */
  website?: string
}

export const workExperiences: WorkExperience[] = [
  {
    slug: 'bank-mandiri',
    route: '/work/bank-mandiri',
    company: 'PT Bank Mandiri (Persero) Tbk.',
    location: 'Jakarta, Indonesia',
    role: 'Research & Development Intern - Strategic Procurement',
    tag: 'Research & Devlopment',
    period: {
      en: 'October 2025 - April 2026',
      id: 'Oktober 2025 - April 2026',
    },
    accent: '#70aaff',
    Icon: TbBuildingBank,
    thumbnail: '/Works/BankMandiri.jpg',
    // 3 gambar bisa ditaro disini
    showcase: [],
    summary: {
      en: 'Research and development engineering in strategic procurement, mapping enterprise application topology and architecting technical workflow improvements.',
      id: 'Kerja riset dan pengembangan rekayasa sistem di strategic procurement, memetakan topologi ekosistem aplikasi dan menyusun rekomendasi perbaikan alur kerja teknis pengguna.',
    },
    tags: ['Research & Development', 'Procurement Systems', 'Enterprise'],
    bullets: {
      en: [
        'Supported enterprise procurement applications and workflow optimization initiatives by analyzing technical pipelines, system integrations, and data flow bottlenecks.',
        'Analyzed and deconstructed three core technical procurement workflows alongside operational teams across Contract, Processing, and Supporting functions.',
        'Mapped integration topologies and data flows across 11 enterprise procurement applications to identify data exchange frictions.',
        'Collaborated with cross-functional teams to identify technical workflow bottlenecks, validate system inputs and outputs, and formulate engineering improvement solutions.',
        'Contributed to application architecture and workflow recommendations aligned with engineering capabilities, system performance, and long-term maintainability.',
        'Conducted technical validation audits on 280+ bank guarantee records, systematically logging defect patterns to inform automated validation pipelines.',
        'Engineered and presented a technical evaluation report benchmarking four architectural workflow options using the TELOS feasibility framework.',
      ],
      id: [
        'Mendukung efisiensi sistem procurement dan inisiatif optimasi proses melalui analisis alur kerja teknis, integrasi sistem, dan mitigasi bottleneck aliran data.',
        'Mempelajari dan membedah tiga alur kerja teknis inti procurement bersama tim operasional di unit Kontrak, Pemrosesan, dan unit pendukung.',
        'Memetakan topologi integrasi dan aliran data 11 aplikasi pengadaan enterprise untuk mengidentifikasi titik friksi pertukaran data antar sistem.',
        'Berkolaborasi dengan tim lintas fungsi untuk mengidentifikasi bottleneck alur kerja teknis, memvalidasi input-output sistem, dan merumuskan solusi rekayasa aplikasi.',
        'Berkontribusi pada perancangan arsitektur dan alur kerja aplikasi yang selaras dengan kapabilitas teknis tim, performa sistem, dan integrasi jangka panjang.',
        'Menjalankan audit validasi teknis pada 280+ berkas jaminan bank serta mendokumentasikan pola anomali data untuk mendukung alur kerja validasi otomatis.',
        'Menyusun dan mempresentasikan laporan evaluasi teknis yang membandingkan 4 jalur arsitektur alur kerja bank garansi berbasis analisis kerangka TELOS.',
      ],
    },
    highlights: {
      en: [
        '11 procurement apps mapped',
        '280+ bank guarantees validated',
        'TELOS-based recommendation',
      ],
      id: [
        '11 aplikasi procurement dipetakan',
        '280+ bank garansi divalidasi',
        'Rekomendasi berbasis TELOS',
      ],
    },
    reflection: {
      en: 'This role taught me that meaningful system improvement starts from understanding how people actually work, mapping the ecosystem first, then letting real pain points guide the recommendations.',
      id: 'Peran ini mengajarkan bahwa perbaikan sistem yang bermakna berawal dari memahami cara orang benar-benar bekerja — memetakan ekosistemnya lebih dulu, lalu membiarkan pain point nyata yang memandu rekomendasinya.',
    },
  },
  {
    slug: 'telkom-property',
    route: '/work/telkom-property',
    company: 'Telkom Property',
    location: 'Jakarta, Indonesia',
    role: 'IT Project Manager',
    tag: 'IT Project Manager',
    period: {
      en: 'October 2024 - February 2025',
      id: 'Oktober 2024 - Februari 2025',
    },
    accent: '#e090c8',
    Icon: TbBuildingSkyscraper,
    thumbnail: '/Works/Telkom-Prop.webp',
    // 3 gambar bisa ditaro disini
    showcase: [],
    summary: {
      en: 'Coordinated end-to-end IT delivery workflows and engineering sprints, aligning technical architecture, developer backlogs, and system testing through production release.',
      id: 'Mengoordinasikan alur kerja tim delivery IT dan sprint engineering dari hulu ke hilir, menyelaraskan arsitektur teknis, backlog pengembang, dan testing sistem menuju rilis produksi.',
    },
    tags: ['IT Project Management', 'Project Manager', 'Delivery'],
    bullets: {
      en: [
        'Managed technical delivery workflows for an integrated software product, aligning architectural scope, sprint milestones, release schedules, and module dependencies.',
        'Worked closely with a multi-disciplinary engineering squad of 10 members spanning frontend, backend, mobile developers, QA, UI/UX engineers, and security specialists.',
        'Managed and tracked 50+ technical backlog items, user stories, and bug tickets using internal workflow tracking systems to maintain structured engineering velocity.',
        'Translated operational workflows and feature specifications into unambiguous technical requirements, API contracts, and acceptance criteria for developers.',
        'Coordinated end-to-end testing pipelines including system integration testing, performance stress tests, and user acceptance testing before production rollout.',
        'Orchestrated technical communication channels and cross-module API synchronization to ensure clean system integration across all client and backend layers.',
      ],
      id: [
        'Mengelola alur kerja delivery teknis untuk sistem digital terintegrasi, menyelaraskan batasan teknis (scope), arsitektur, timeline rilis, dan dependensi antar modul.',
        'Bekerja erat dengan tim engineer lintas disiplin beranggotakan 10 orang, mencakup frontend, backend, mobile developer, QA, desainer UI/UX, dan security engineer.',
        'Mengelola dan memantau 50+ tiket backlog teknis, user stories, dan bug fixes menggunakan sistem pelacakan proyek internal agar alur kerja engineering tetap terstruktur.',
        'Menerjemahkan alur kerja sistem dan kebutuhan operasional menjadi spesifikasi teknis, skema data, dan acceptance criteria yang siap dieksekusi oleh tim developer.',
        'Mengoordinasikan alur pengujian komprehensif mencakup system integration testing, performance load testing, dan UAT sebelum deployment ke server produksi.',
        'Menjembatani alur komunikasi teknis dan sinkronisasi dependensi API antar developer untuk memastikan kelancaran integrasi sistem.',
      ],
    },
    highlights: {
      en: [
        '50+ backlogs tracked',
        'Team of 10 coordinated',
        'End-to-end delivery',
      ],
      id: [
        '50+ backlog dipantau',
        'Tim 10 orang dikoordinasikan',
        'Delivery end-to-end',
      ],
    },
    reflection: {
      en: 'Coordinating a full delivery team showed me that clarity is the real deliverable, aligning scope, people, and testing is what keeps a product moving steadily toward release.',
      id: 'Mengoordinasikan satu tim delivery penuh menunjukkan bahwa kejelasan adalah deliverable yang sesungguhnya — menyelaraskan scope, orang, dan pengujian itulah yang membuat produk terus melaju menuju rilis.',
    },
  },
    {
    slug: 'caatis',
    route: '/work/caatis',
    company: 'CAATIS FnB Group',
    location: 'Bandung, Indonesia',
    role: 'Full Stack Developer',
    tag: 'Full Stack Dev',
    period: {
      en: 'September 2024 - December 2024',
      id: 'September 2024 - Desember 2024',
    },
    accent: '#60d9aa',
    Icon: TbToolsKitchen2,
    thumbnail: '/Works/CAATIS.png',
    // 3 gambar bisa ditaro disini
    showcase: [],
    summary: {
      en: 'Designed and engineered an internal staff management web platform and automated payroll engine to streamline multi-outlet operational workflows.',
      id: 'Merancang dan membangun platform web manajemen staf internal dan sistem penggajian otomatis untuk menyederhanakan alur kerja operasional multi-outlet.',
    },
    tags: ['Fullstack Developer', 'Internal Platform', 'F&B Operations'],
    bullets: {
      en: [
        'Designed and developed an internal staff management web application for scheduling and payroll across 4 F&B outlets with 30+ employees.',
        'Built a centralized platform that simplified payroll processing and reduced administrative workload across four outlets.',
        'Integrated external APIs to automate payroll calculations and reduce manual errors.',
        'Contributed to deploying the application on a VPS server for production use.',
      ],
      id: [
        'Merancang dan mengembangkan aplikasi web manajemen staf internal untuk penjadwalan dan penggajian di 4 outlet F&B dengan 30+ karyawan.',
        'Membangun platform terpusat yang menyederhanakan proses penggajian dan mengurangi beban kerja administratif di empat outlet.',
        'Mengintegrasikan API eksternal untuk mengotomasi perhitungan penggajian dan menekan kesalahan manual.',
        'Terlibat dalam deployment aplikasi ke server VPS untuk penggunaan produksi.',
      ],
    },
    highlights: {
      en: [
        '4 outlets centralized',
        '30+ employees managed',
        'Automated payroll flow',
      ],
      id: [
        '4 outlet terpusat',
        '30+ karyawan terkelola',
        'Alur penggajian terotomasi',
      ],
    },
    reflection: {
      en: 'Building an internal tool from scratch reminded me that good software should quietly remove friction from everyday operations, not add one more thing to manage.',
      id: 'Membangun tool internal dari nol mengingatkan bahwa software yang baik seharusnya diam-diam menghapus hambatan operasional harian, bukan menambah satu hal lagi untuk diurus.',
    },
  },
  {
    slug: 'informatics-lab',
    route: '/work/informatics-lab',
    company: 'Informatics Laboratory Telkom University',
    location: 'Bandung, Indonesia',
    role: 'Web Development Practicum Assistant',
    tag: 'Web Dev Lab Assistant',
    period: {
      en: 'September 2024 - January 2025',
      id: 'September 2024 - Januari 2025',
    },
    accent: '#c9bfff',
    Icon: TbSchool,
    thumbnail: '/Works/Lab.jpg',
    // 3 gambar bisa ditaro disini
    showcase: [],
    summary: {
      en: 'Mentored students through web engineering lab sessions, reinforcing full-stack development workflows, asynchronous debugging, and RESTful API architecture.',
      id: 'Membimbing mahasiswa dalam praktikum rekayasa web, memperdalam alur kerja pengembangan full-stack, debugging asinkron, dan arsitektur RESTful API.',
    },
    tags: ['Web Development', 'Mentoring', 'Lab Assistant'],
    bullets: {
      en: [
        'Assisted and mentored 90+ students across three classes in web development lab classes.',
        'Guided students on web technologies including HTML, CSS, JavaScript, PHP, Laravel, WordPress, JSON, and RESTful APIs.',
        'Supported students in troubleshooting coding issues and strengthening their understanding of core web development concepts.',
        'Helped students translate functional requirements into simple web-based solutions for their final projects.',
      ],
      id: [
        'Mendampingi dan membimbing 90+ mahasiswa di tiga kelas praktikum pengembangan web.',
        'Mengarahkan mahasiswa pada teknologi web seperti HTML, CSS, JavaScript, PHP, Laravel, WordPress, JSON, dan RESTful API.',
        'Membantu mahasiswa menelusuri persoalan coding sekaligus memperkuat pemahaman mereka atas konsep inti pengembangan web.',
        'Membantu mahasiswa menerjemahkan kebutuhan fungsional menjadi solusi berbasis web sederhana untuk proyek akhir mereka.',
      ],
    },
    highlights: {
      en: [
        '90+ students mentored',
        '3 classes guided',
        'Full web stack coverage',
      ],
      id: [
        '90+ mahasiswa dibimbing',
        '3 kelas didampingi',
        'Cakupan web stack penuh',
      ],
    },
    reflection: {
      en: 'Mentoring dozens of students sharpened how I explain technical concepts, teaching something well turned out to be the fastest way to truly understand it myself.',
      id: 'Membimbing puluhan mahasiswa mengasah cara saya menjelaskan konsep teknis — mengajarkan sesuatu dengan baik ternyata jalan tercepat untuk benar-benar memahaminya sendiri.',
    },
  },
  {
    slug: 'jokiwithsora',
    route: '/work/jokiwithsora',
    company: 'Jokiwithsora',
    location: 'Bandung, Indonesia',
    role: 'Business Process Optimization & IT Support',
    tag: 'Business Process',
    period: {
      en: 'January 2023 - January 2025',
      id: 'Januari 2023 - Januari 2025',
    },
    accent: '#c060f0',
    Icon: TbTable,
    thumbnail: '/Works/Jokiwithsora.png',
    // 3 gambar bisa ditaro disini
    showcase: [],
    summary: {
      en: 'Engineered automated data pipelines and integrated operational workflows, eliminating manual bottlenecks and accelerating order fulfillment.',
      id: 'Membangun pipeline otomasi data dan alur kerja operasional terintegrasi untuk mengeliminasi bottleneck manual dan mempercepat pelacakan transaksi.',
    },
    tags: ['Business Process', 'Automation', 'IT Support'],
    bullets: {
      en: [
        'Developed and maintained more than nine operational spreadsheets to improve order management and data tracking efficiency.',
        'Built automated formulas and workflow systems that saved the operations team more than 12 hours of manual work per week.',
        'Analyzed repetitive operational processes and created simple automation solutions to improve productivity.',
        'Provided technical support and troubleshooting for both hardware and software issues.',
      ],
      id: [
        'Mengembangkan dan memelihara lebih dari sembilan spreadsheet operasional untuk meningkatkan efisiensi manajemen pesanan dan pelacakan data.',
        'Membangun formula otomatis dan sistem alur kerja yang menghemat lebih dari 12 jam kerja manual tim operasional per minggu.',
        'Menganalisis proses operasional yang berulang dan membuat solusi otomasi sederhana untuk meningkatkan produktivitas.',
        'Memberikan dukungan teknis dan penanganan masalah untuk kendala perangkat keras maupun perangkat lunak.',
      ],
    },
    highlights: {
      en: [
        '9+ operational spreadsheets',
        '12+ hours saved weekly',
        'Repetitive work automated',
      ],
      id: [
        '9+ spreadsheet operasional',
        '12+ jam hemat per minggu',
        'Pekerjaan berulang terotomasi',
      ],
    },
    reflection: {
      en: 'Turning repetitive manual work into simple automations proved that small, well-placed systems can free up a surprising amount of a team’s time each week.',
      id: 'Mengubah pekerjaan manual yang berulang menjadi otomasi sederhana membuktikan bahwa sistem kecil yang tepat sasaran bisa membebaskan waktu tim jauh lebih banyak dari yang dikira.',
    },
  },
]
