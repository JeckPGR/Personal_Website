import type { CaseStudy } from '../schema'

export const edulocalCaseStudy: CaseStudy = {
  slug: 'edulocal',
  kind: 'project',
  category: 'mobile',
  title: {
    en: 'EduLocal',
    id: 'EduLocal',
  },
  subtitle: {
    en: 'College Group Assignments',
    id: 'Tugas Kelompok Kuliah',
  },
  tagline: {
    en: 'Fragmented local course directories → Location-first English & Mathematics tutoring discovery',
    id: 'Direktori les privat lokal yang terfragmentasi → Penemuan tempat kursus Bahasa Inggris & Matematika berbasis lokasi',
  },
  metaLabel: {
    en: 'COURSE DISCOVERY',
    id: 'PENEMUAN KURSUS',
  },
  status: 'beta',
  period: {
    start: '2024-03',
    end: '2024-06',
  },
  org: {
    name: 'College Group Project',
    role: 'Mobile UI/UX & Mobile Developer',
    domain: 'EdTech & Location Services',
  },
  scope: {
    type: 'contributor',
    summary: {
      en: 'I contributed to mobile interface design and developed the core Flutter application: building the location-first course discovery workflow for students and the branch registration & lead CRM console for course partners.',
      id: 'Saya berkontribusi pada desain antarmuka mobile dan mengembangkan aplikasi Flutter utama: membangun alur pencarian kursus berbasis lokasi untuk siswa serta konsol pendaftaran cabang dan CRM prospek untuk mitra kursus.',
    },
  },
  businessProblem: {
    en: 'Students and parents seeking supplementary English and Mathematics courses around Bandung had no unified platform comparing localized curriculum, pricing tiers, and nearby branch proximities. Information was scattered across offline banners and unverified social media profiles, while local tutoring businesses struggled to capture and follow up with local student leads efficiently.',
    id: 'Pelajar dan orang tua di Bandung yang mencari kursus Bahasa Inggris dan Matematika kesulitan menemukan informasi terpadu tentang kurikulum, rincian biaya, dan jarak cabang terdekat. Informasi tersebar di spanduk jalanan dan media sosial, sementara pemilik tempat kursus lokal kesulitan menjaring serta mem-follow up calon siswa baru secara efektif.',
  },
  solutionFit: {
    en: 'EduLocal organizes fragmented tutoring directories into a dual-sided, location-aware mobile platform built with Flutter and Firebase. Students activate location detection on their dashboard to discover nearby English and Math courses, inspect syllabus details, compare transparent pricing, and register via a direct enrollment form. Simultaneously, course owners manage their listings, pinpoint GPS coordinates, upload 2–3 branch photos, input curriculum, and track registered students in a real-time CRM lead roster for prompt follow-up.',
    id: 'EduLocal menyatukan direktori kursus lokal ke dalam platform mobile dua arah berbasis lokasi yang dibangun dengan Flutter dan Firebase. Siswa mengaktifkan deteksi lokasi di dashboard untuk menemukan kursus Bahasa Inggris dan Matematika terdekat, memeriksa silabus, membandingkan rincian biaya transparan, dan mendaftar lewat formulir. Di sisi lain, mitra kursus dapat mengelola listing, menentukan koordinat GPS, mengunggah 2–3 foto cabang, memasukkan silabus, serta memantau daftar siswa pendaftar pada sistem CRM real-time untuk difollow-up.',
  },
  system: {
    direction: 'auto',
    nodes: [
      {
        id: 'student-role',
        type: 'actor',
        lane: 0,
        label: { en: 'Student / Parent', id: 'Siswa / Orang Tua' },
        description: { en: 'Logs into mobile dashboard and activates GPS device location detection', id: 'Login ke dashboard aplikasi mobile dan mengaktifkan deteksi lokasi GPS perangkat' },
      },
      {
        id: 'partner-role',
        type: 'actor',
        lane: 0,
        label: { en: 'Course Partner (Mitra)', id: 'Mitra Kursus' },
        description: { en: 'Course owner logs in to manage tutoring branches and student pipelines', id: 'Pemilik kursus login untuk mengelola cabang les dan memantau pendaftar' },
      },
      {
        id: 'geo-recs',
        type: 'step',
        lane: 1,
        label: { en: 'Nearby Course Discovery', id: 'Rekomendasi Kursus Terdekat' },
        description: { en: 'Calculates real-time proximity to surface the closest English & Mathematics tutoring branches', id: 'Menghitung jarak secara real-time untuk menampilkan cabang les Bahasa Inggris & Matematika terdekat' },
      },
      {
        id: 'course-creator',
        type: 'step',
        lane: 1,
        label: { en: 'Course Coordinates & Photos', id: 'Koordinat Lokasi & Foto' },
        description: { en: 'Pins exact geographical coordinates and uploads 2–3 branch venue photos', id: 'Menentukan koordinat lokasi geografis dan mengunggah 2–3 foto tempat kursus' },
      },
      {
        id: 'course-details',
        type: 'step',
        lane: 2,
        label: { en: 'Syllabus & Pricing Review', id: 'Tinjau Silabus & Biaya' },
        description: { en: 'Examines lesson modules, class schedules, and transparent tuition breakdown', id: 'Menelaah modul pembelajaran, jadwal kelas, dan rincian biaya yang transparan' },
      },
      {
        id: 'syllabus-management',
        type: 'step',
        lane: 2,
        label: { en: 'Syllabus & Tuition Setup', id: 'Pengaturan Silabus & Biaya' },
        description: { en: 'Structures lesson curriculum, grade levels, and pricing tiers prior to publication', id: 'Menyusun silabus pelajaran, tingkatan kelas, dan paket biaya sebelum dipublikasikan' },
      },
      {
        id: 'enrollment-form',
        type: 'step',
        lane: 3,
        label: { en: 'Course Registration Form', id: 'Formulir Pendaftaran Kursus' },
        description: { en: 'Submits student enrollment details directly into the course database', id: 'Mengirimkan formulir pendaftaran siswa langsung ke database kursus' },
      },
      {
        id: 'course-publish',
        type: 'step',
        lane: 3,
        label: { en: 'Publish Course Listing', id: 'Publikasi Listing Kursus' },
        description: { en: 'Verifies syllabus and photos to publish active listing on discovery feed', id: 'Memverifikasi silabus dan foto untuk merilis kursus ke pencarian' },
      },
      {
        id: 'partner-crm',
        type: 'step',
        lane: 4,
        label: { en: 'Enrolled Student CRM Roster', id: 'Daftar Siswa & CRM Follow-Up' },
        description: { en: 'Tracks registered student submissions in a structured CRM view for rapid follow-up', id: 'Memantau pendaftaran siswa dalam daftar CRM terstruktur untuk segera difollow-up' },
      },
    ],
    edges: [
      { from: 'student-role', to: 'geo-recs', label: { en: 'Enable GPS', id: 'Aktifkan GPS' } },
      { from: 'partner-role', to: 'course-creator', label: { en: 'Register branch', id: 'Daftar cabang' } },
      { from: 'geo-recs', to: 'course-details', label: { en: 'Select course', id: 'Pilih kursus' } },
      { from: 'course-creator', to: 'syllabus-management', label: { en: 'Input syllabus', id: 'Input silabus & harga' } },
      { from: 'course-details', to: 'enrollment-form', label: { en: 'Apply now', id: 'Daftar kursus' } },
      { from: 'syllabus-management', to: 'course-publish', label: { en: 'Publish course', id: 'Terbitkan kursus' } },
      { from: 'enrollment-form', to: 'partner-crm', label: { en: 'Lead capture', id: 'Data pendaftar' } },
      { from: 'course-publish', to: 'partner-crm', label: { en: 'Manage roster', id: 'Pantau pendaftar' } },
    ],
  },
  architecture: {
    direction: 'auto',
    nodes: [
      {
        id: 'flutter-client',
        type: 'service',
        lane: 0,
        label: { en: 'Flutter Cross-Platform App', id: 'Aplikasi Flutter Mobile' },
        description: { en: 'Cross-platform mobile client providing dual student discovery and partner management views', id: 'Aplikasi mobile multiplatform dengan tampilan penelusuran siswa dan dasbor mitra' },
        tools: ['Flutter', 'Dart'],
      },
      {
        id: 'firebase-auth',
        type: 'service',
        lane: 1,
        label: { en: 'Firebase Authentication', id: 'Autentikasi Firebase' },
        description: { en: 'Role-based authentication managing student logins and verified course owner credentials', id: 'Autentikasi berbasis peran untuk login siswa dan pemilik kursus terverifikasi' },
        tools: ['Firebase Auth'],
      },
      {
        id: 'device-gps',
        type: 'external',
        lane: 1,
        label: { en: 'Hardware Geolocation Provider', id: 'Geolokasi GPS Perangkat' },
        description: { en: 'Queries device coordinates to compute Haversine distance to registered tutoring centers', id: 'Mengecek koordinat perangkat untuk menghitung jarak ke lokasi tempat kursus terdaftar' },
        tools: ['Geolocation'],
      },
      {
        id: 'firebase-storage',
        type: 'data',
        lane: 2,
        label: { en: 'Firebase Cloud Storage', id: 'Penyimpanan Firebase Storage' },
        description: { en: 'Secure object storage hosting 2–3 branch photos and marketing banners for each tutoring center', id: 'Penyimpanan berkas untuk 2–3 foto cabang dan materi visual setiap tempat kursus' },
        tools: ['Firebase Storage'],
      },
      {
        id: 'cloud-firestore',
        type: 'data',
        lane: 2,
        label: { en: 'Cloud Firestore Database', id: 'Database Cloud Firestore' },
        description: { en: 'NoSQL document store managing course listings, syllabus trees, coordinates, and CRM lead forms', id: 'Database NoSQL untuk menyimpan data kursus, silabus, koordinat, dan formulir pendaftaran siswa' },
        tools: ['Cloud Firestore'],
      },
    ],
    edges: [
      { from: 'flutter-client', to: 'firebase-auth', label: { en: 'Sign-in & Auth Token', id: 'Login & Token Auth' } },
      { from: 'flutter-client', to: 'device-gps', label: { en: 'Device GPS Request', id: 'Kueri GPS Perangkat' } },
      { from: 'firebase-auth', to: 'firebase-storage', label: { en: 'Secured Photo Storage', id: 'Keamanan Berkas Foto' } },
      { from: 'firebase-auth', to: 'cloud-firestore', label: { en: 'Rules & CRM Leads', id: 'Hak Akses & Data CRM' } },
      { from: 'device-gps', to: 'cloud-firestore', label: { en: 'Proximity Course Filter', id: 'Filter Jarak Terdekat' } },
    ],
  },
  results: [
    {
      value: 'Location-First',
      label: { en: 'Surfaces nearby course options directly on the primary discovery feed', id: 'Menampilkan penyedia kursus terdekat langsung di halaman utama' },
      evidence: 'qualitative',
    },
    {
      value: 'Dual-Sided Flow',
      label: { en: 'Integrated student registration form with course partner CRM lead follow-up', id: 'Integrasi formulir pendaftaran siswa langsung ke CRM follow-up mitra kursus' },
      evidence: 'qualitative',
    },
  ],
  techStack: [
    { group: 'Mobile App', items: ['Flutter', 'Dart'] },
    { group: 'Backend & Cloud', items: ['Firebase Auth', 'Cloud Firestore', 'Firebase Cloud Storage'] },
    { group: 'Location Services', items: ['Geolocation API', 'Haversine Proximity'] },
  ],
  reflection: {
    en: 'EduLocal demonstrated that spatial context fundamentally changes utility. Presenting accurate data is only half the equation; sorting by physical accessibility is what makes educational directories actionable.',
    id: 'EduLocal membuktikan bahwa konteks lokasi sangat menentukan kegunaan aplikasi. Menyajikan data yang akurat hanyalah separuh solusi; mengurutkannya berdasarkan kemudahan jangkauan fisik adalah hal yang membuatnya benar-benar bermanfaat.',
  },
  featured: false,
}

export default edulocalCaseStudy
