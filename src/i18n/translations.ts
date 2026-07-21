import type { Language } from '../hooks/useLanguage'

/**
 * Interface copy only.
 *
 * Long-form portfolio content — work summaries, bullets, reflections, project
 * and certification descriptions — lives in the data files instead, authored in
 * both languages as `Localized` `{ en, id }` fields and read through
 * `useLocalize()`.
 */
const copy = {
  // ─── Navigation & chrome ───
  'nav.home': { en: 'Home', id: 'Beranda' },
  'nav.about': { en: 'About', id: 'Tentang' },
  'nav.work': { en: 'Work', id: 'Pengalaman' },
  'nav.project': { en: 'Project', id: 'Proyek' },
  'nav.certification': { en: 'Certification', id: 'Sertifikasi' },
  'nav.menu': { en: 'Menu', id: 'Menu' },
  'nav.closeMenu': {
    en: 'Close navigation menu',
    id: 'Tutup menu navigasi',
  },
  'nav.openMenu': {
    en: 'Open navigation menu',
    id: 'Buka menu navigasi',
  },

  // ─── Contact & CV ───
  'contact.email': { en: 'Email', id: 'Email' },
  'contact.location': {
    en: 'South Jakarta, Indonesia',
    id: 'Jakarta Selatan, Indonesia',
  },
  'cv.label': { en: 'See my Resume', id: 'Lihat Resume Saya' },
  'cv.short': { en: 'CV', id: 'CV' },

  // ─── Theme & language toggles ───
  'theme.toLight': { en: 'Switch to light theme', id: 'Ganti ke tema terang' },
  'theme.toDark': { en: 'Switch to dark theme', id: 'Ganti ke tema gelap' },
  'theme.light': { en: 'Light mode', id: 'Mode terang' },
  'theme.dark': { en: 'Dark mode', id: 'Mode gelap' },
  'language.switch': {
    en: 'Switch language to Indonesian',
    id: 'Ganti bahasa ke Inggris',
  },

  // ─── About page ───
  'about.tag': { en: 'About', id: 'Tentang' },
  'about.headline': {
    en: 'Product-minded builder with a practical engineering core.',
    id: 'Membangun produk dengan pola pikir tajam dan fondasi teknis yang kuat.',
  },
  'about.stats.roles': { en: 'Roles', id: 'Peran' },
  'about.stats.projects': { en: 'Projects', id: 'Proyek' },
  'about.stats.certifications': { en: 'Certifications', id: 'Sertifikasi' },
  'about.section.toolkit': { en: 'Toolkit', id: 'Alat yang digunakan' },
  'about.section.experience': {
    en: 'Professional Experience',
    id: 'Pengalaman Profesional',
  },
  'about.section.projects': { en: 'Projects', id: 'Proyek' },
  'about.section.certifications': {
    en: 'Certifications',
    id: 'Sertifikasi',
  },
  'about.techStack': { en: 'Tech Stack', id: 'Tech Stack' },
  'about.tools': { en: 'Tools', id: 'Tools' },
  'about.entries': { en: 'entries', id: 'entri' },
  'about.seeLess': { en: 'See less', id: 'Lihat lebih sedikit' },
  'about.seeMore': { en: 'See more', id: 'Lihat selengkapnya' },
  'about.allExperience': { en: 'All experience', id: 'Semua pengalaman' },
  'about.allProjects': { en: 'All projects', id: 'Semua proyek' },
  'about.allCertifications': {
    en: 'All certifications',
    id: 'Semua sertifikasi',
  },

  // ─── Work page ───
  'work.tag': { en: 'Work', id: 'Pengalaman' },
  'work.title': { en: 'Work experience.', id: 'Pengalaman kerja.' },
  'work.description': {
    en: 'Roles across enterprise teams and internal platform work. Hover a row for a quick preview, click to open the full breakdown.',
    id: 'Peran di tim enterprise dan pengembangan platform internal. Arahkan kursor untuk pratinjau, klik untuk membuka rinciannya.',
  },
  'work.count': { en: 'All experience', id: 'Semua pengalaman' },

  // ─── Project page ───
  'project.tag': { en: 'Projects', id: 'Proyek' },
  'project.title': { en: 'Project Showcase', id: 'Tampilan Proyek' },
  'project.description': {
    en: 'Selected project work grouped by platform. Hover a row for a quick preview, click to open the full case.',
    id: 'Pilihan proyek yang dikelompokkan per platform. Arahkan kursor untuk pratinjau, klik untuk membuka studi kasusnya.',
  },

  // ─── Certification page ───
  'certification.tag': { en: 'Certification', id: 'Sertifikasi' },
  'certification.title': { en: 'Certification', id: 'Sertifikasi' },
  'certification.description': {
    en: 'A compact record of product, project, and technology learning that supports my work across discovery, delivery, and implementation.',
    id: 'Catatan ringkas pembelajaran produk, proyek, dan teknologi yang menopang kerja saya dari discovery sampai implementasi.',
  },
  'certification.count': { en: 'Learning', id: 'Pembelajaran' },

  // ─── Detail pages ───
  'detail.back': { en: 'Back', id: 'Kembali' },
  'detail.focusAreas': { en: 'Focus Areas', id: 'Area Fokus' },
  'detail.responsibilities': {
    en: 'Responsibilities & Impact',
    id: 'Tanggung Jawab & Dampak',
  },
  'detail.keyResults': { en: '3 Key Results', id: '3 Hasil Utama' },
  'detail.reflection': { en: 'Reflection', id: 'Refleksi' },
  'detail.journeyProof': { en: 'Journey & Proof', id: 'Perjalanan & Bukti' },
  'detail.journey': { en: 'Journey', id: 'Perjalanan' },
  'detail.projectShowcase': { en: 'Project Showcase', id: 'Tampilan Proyek' },
  'detail.showcase': { en: 'Showcase', id: 'Etalase' },
  'detail.techStack': { en: 'Tech Stack', id: 'Tech Stack' },
  'detail.whatIDid': { en: 'What I Did', id: 'Yang Saya Kerjakan' },
  'detail.keyPoints': { en: '3 Key Points', id: '3 Poin Utama' },
  'detail.speech': { en: 'Speech from Dzaky', id: 'Kata Dzaky' },
  'detail.noImageNote': {
    en: 'Some visuals have not been uploaded yet — you can see the real thing here:',
    id: 'Sebagian gambar belum diunggah, kamu bisa melihat versi aslinya melalui link ini:',
  },
  'detail.noImagePending': {
    en: 'Visuals for this section have not been uploaded yet.',
    id: 'Gambar untuk bagian ini belum diunggah.',
  },

  // ─── Home bento ───
  'home.profile': { en: 'Profile', id: 'Profil' },
  'home.aboutMe': { en: 'About me', id: 'Tentang saya' },
  'home.experience': { en: 'Experience', id: 'Pengalaman' },
  'home.workExperience': { en: 'Work Experience', id: 'Pengalaman Kerja' },
  'home.projects': { en: 'Projects', id: 'Proyek' },
  'home.learning': { en: 'Learning', id: 'Pembelajaran' },
  'home.certification': { en: 'Certification', id: 'Sertifikasi' },
  'home.openToWork': { en: 'Open to Work', id: 'Terbuka untuk Kerja' },
  'home.findMore': { en: 'Find more', id: 'Selengkapnya' },
  'home.tagline': {
    en: 'Product-minded builder for digital systems.',
    id: 'Pembangun sistem digital dengan pola pikir produk.',
  },
  'home.taglineSub': {
    en: 'Developer, project manager, and aspiring Product Manager, working across discovery, delivery, and development.',
    id: 'Developer, project manager, dan calon Product Manager yang bekerja lintas discovery, delivery, dan pengembangan.',
  },
  'home.aboutBlurb': {
    en: 'Information Technology graduate with 2 years of experience in full-stack development and hands-on experience in project management, I’m now also deepening my knowledge in Product Management. I build products like Inotrive and Yayzi to practice creating real value, while keeping my technical understanding sharp so I stay aware of what’s technologically possible. My goal is to be a Product Manager with strong product sense and flexible technical depth.',
    id: 'Lulusan Teknologi Informasi dengan 2 tahun pengalaman di pengembangan full-stack dan pengalaman langsung mengelola proyek, kini saya juga memperdalam Product Management. Saya membangun produk seperti Inotrive dan Yayzi untuk melatih diri menciptakan nilai nyata, sambil menjaga pemahaman teknis tetap tajam agar selalu paham apa yang mungkin secara teknologi. Tujuan saya adalah menjadi Product Manager dengan product sense yang kuat dan kedalaman teknis yang lentur.',
  },
  'home.heroSub': {
    en: 'Product-minded engineer focused on digitalization, workflow automation, and operational efficiency',
    id: 'Engineer dengan pola pikir produk yang fokus pada digitalisasi, otomasi alur kerja, dan efisiensi operasional',
  },

  // ─── Home floating cards ───
  'home.techSystems': { en: 'Tech Systems', id: 'Sistem Teknologi' },
  'home.techSystemsSub': {
    en: 'Code / API / Automation',
    id: 'Kode / API / Otomasi',
  },
  'home.productThinking': { en: 'Product Thinking', id: 'Pola Pikir Produk' },
  'home.productThinkingSub': {
    en: 'Discovery / Users / Data',
    id: 'Discovery / Pengguna / Data',
  },

  // ─── Home project previews ───
  'home.preview.inotrive.meta': {
    en: 'AI TikTok Script Intelligence | Personal Product',
    id: 'Naskah TikTok Berbasis AI | Produk Pribadi',
  },
  'home.preview.inotrive.detail': {
    en: 'AI-powered platform that turns raw ideas into structured TikTok scripts, hooks, and production cues.',
    id: 'Platform bertenaga AI yang mengubah ide mentah menjadi naskah TikTok, hook, dan petunjuk produksi yang terstruktur.',
  },
  'home.preview.yayzi.meta': {
    en: 'Temporary Room for Idea Validation | Personal Product',
    id: 'Ruang Sementara untuk Validasi Ide | Produk Pribadi',
  },
  'home.preview.yayzi.detail': {
    en: 'A no-login, auto-expiring room where creators drop an idea and collect quick Yay/Nay feedback.',
    id: 'Ruang tanpa login yang kedaluwarsa otomatis, tempat kreator melempar ide dan mengumpulkan masukan Yay/Nay dengan cepat.',
  },
  'home.preview.paja.meta': {
    en: 'Booking & Backoffice System | Client Project',
    id: 'Sistem Pemesanan & Backoffice | Proyek Klien',
  },
  'home.preview.paja.detail': {
    en: 'End-to-end booking platform and staff backoffice for a barbershop chain, built with a 4-person team.',
    id: 'Platform pemesanan end-to-end dan backoffice staf untuk jaringan barbershop, dibangun bersama tim 4 orang.',
  },

  // ─── Lists ───
  'list.index': { en: 'Index', id: 'Indeks' },

  // ─── Not found ───
  'notFound.eyebrow': { en: 'Page not found', id: 'Halaman tidak ditemukan' },
  'notFound.backHome': { en: 'Back to home', id: 'Kembali ke beranda' },
} as const

export type CopyKey = keyof typeof copy

export function translate(key: CopyKey, language: Language): string {
  return copy[key][language]
}

export default copy
