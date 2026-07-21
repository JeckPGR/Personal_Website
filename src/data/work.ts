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
      en: 'Research and development work inside strategic procurement, mapping the application ecosystem and shaping improvement recommendations grounded in real user workflows.',
      id: 'Kerja riset dan pengembangan di unit strategic procurement, memetakan ekosistem aplikasi dan menyusun rekomendasi perbaikan yang berangkat dari alur kerja pengguna sebenarnya.',
    },
    tags: ['Research & Development', 'Procurement Systems', 'Enterprise'],
    bullets: {
      en: [
        'Supported procurement applications and process improvement initiatives by analyzing business workflows, user needs, and existing system limitations.',
        'Learned three core procurement workflows by working closely with internal teams across Contract, Processing, and supporting functions.',
        'Mapped 11 procurement-related applications, including their roles and integrations, to build a comprehensive understanding of the organization’s procurement ecosystem.',
        'Collaborated with cross-functional teams (Contract, Processing, and Supporting units) to identify pain points, validate user needs, and generate feature improvement ideas based on direct user feedback.',
        'Contributed to application architecture recommendations aligned with business needs, team capabilities, existing system limitations, and long-term sustainability.',
        'Participated in the validation of 280+ bank guarantees and documented recurring issues to support process evaluation and improvement.',
        'Developed and presented an evaluation report comparing four improvement options for the bank guarantee process, with a final recommendation based on TELOS framework analysis.',
      ],
      id: [
        'Mendukung aplikasi procurement dan inisiatif perbaikan proses melalui analisis alur kerja bisnis, kebutuhan pengguna, dan keterbatasan sistem yang berjalan.',
        'Mempelajari tiga alur kerja inti procurement dengan bekerja erat bersama tim internal di unit Contract, Processing, dan fungsi pendukung.',
        'Memetakan 11 aplikasi terkait procurement beserta peran dan integrasinya untuk membangun pemahaman menyeluruh atas ekosistem procurement perusahaan.',
        'Berkolaborasi dengan tim lintas fungsi (Contract, Processing, dan unit Supporting) untuk mengidentifikasi pain point, memvalidasi kebutuhan pengguna, dan merumuskan ide perbaikan fitur berdasarkan masukan langsung pengguna.',
        'Berkontribusi pada rekomendasi arsitektur aplikasi yang selaras dengan kebutuhan bisnis, kapabilitas tim, keterbatasan sistem, dan keberlanjutan jangka panjang.',
        'Terlibat dalam validasi 280+ bank garansi serta mendokumentasikan isu yang berulang untuk mendukung evaluasi dan perbaikan proses.',
        'Menyusun dan mempresentasikan laporan evaluasi yang membandingkan empat opsi perbaikan proses bank garansi, lengkap dengan rekomendasi akhir berbasis analisis kerangka TELOS.',
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
      en: 'Coordinated an IT delivery team end to end, aligning scope, backlog, and testing to keep a technology-based product on track toward release.',
      id: 'Mengoordinasikan tim delivery IT dari hulu ke hilir, menyelaraskan scope, backlog, dan pengujian agar produk berbasis teknologi tetap sesuai jalur menuju rilis.',
    },
    tags: ['IT Project Management', 'Project Manager', 'Delivery'],
    bullets: {
      en: [
        'Managed project coordination for a technology-based product by aligning scope, requirements, timelines, risks, changes, and resource allocation.',
        'Worked closely with a cross-functional technology team of 10 members including frontend, backend, mobile developers, QA, UI/UX designers, and security specialists.',
        'Managed and tracked 50+ project backlogs using internal project management tools to ensure structured task tracking and delivery.',
        'Translated business and user requirements into clear project documentation to help the development team understand product needs and expected outcomes.',
        'Coordinated system testing, performance testing, and user acceptance testing to ensure product readiness before deployment.',
        'Supported communication between technical and non-technical stakeholders to maintain alignment throughout the product development process.',
      ],
      id: [
        'Mengelola koordinasi proyek untuk produk berbasis teknologi dengan menyelaraskan scope, kebutuhan, timeline, risiko, perubahan, dan alokasi sumber daya.',
        'Bekerja erat dengan tim teknologi lintas fungsi beranggotakan 10 orang, mencakup developer frontend, backend, mobile, QA, desainer UI/UX, dan spesialis keamanan.',
        'Mengelola dan memantau 50+ backlog proyek menggunakan tools manajemen proyek internal agar pelacakan tugas dan delivery tetap terstruktur.',
        'Menerjemahkan kebutuhan bisnis dan pengguna menjadi dokumentasi proyek yang jelas agar tim pengembang memahami kebutuhan produk dan hasil yang diharapkan.',
        'Mengoordinasikan system testing, performance testing, dan user acceptance testing untuk memastikan kesiapan produk sebelum deployment.',
        'Menjembatani komunikasi antara stakeholder teknis dan non-teknis agar keselarasan terjaga sepanjang proses pengembangan produk.',
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
      en: 'Designed and built an internal staff management platform that centralized scheduling and payroll across multiple F&B outlets.',
      id: 'Merancang dan membangun platform manajemen staf internal yang memusatkan penjadwalan dan penggajian di beberapa outlet F&B.',
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
      en: 'Mentored students across web development lab classes, strengthening their grasp of core web concepts and hands-on troubleshooting.',
      id: 'Membimbing mahasiswa di kelas praktikum pengembangan web, memperkuat pemahaman mereka atas konsep inti web dan kemampuan troubleshooting langsung.',
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
      en: 'Built spreadsheet-based operational systems and automations that streamlined order management and saved the team hours of manual work each week.',
      id: 'Membangun sistem operasional berbasis spreadsheet beserta otomasinya untuk merapikan manajemen pesanan dan menghemat berjam-jam kerja manual tim setiap minggu.',
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
