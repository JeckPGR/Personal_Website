import type { CaseStudy } from '../schema'

export const informaticsLabCaseStudy: CaseStudy = {
  slug: 'informatics-lab',
  kind: 'work',
  title: {
    en: 'Informatics Laboratory Telkom University',
    id: 'Informatics Laboratory Telkom University',
  },
  tagline: {
    en: 'Bridging theoretical concepts to hands-on implementation → Mentored 90+ students in full-stack web engineering',
    id: 'Menjembatani teori dengan praktik implementasi nyata → Membimbing 90+ mahasiswa dalam rekayasa web full-stack',
  },
  thumbnail: '/Works/Lab.jpg',
  metaLabel: {
    en: 'WEB DEV LAB ASSISTANT',
    id: 'ASISTEN PRAKTIKUM WEB',
  },
  status: 'live',
  period: {
    start: '2024-09',
    end: '2025-01',
  },
  org: {
    name: 'Telkom University Informatics Laboratory',
    role: 'Web Development Practicum Assistant',
    domain: 'Higher Education & Computer Science Pedagogy',
  },
  scope: {
    type: 'contributor',
    summary: {
      en: 'I led hands-on technical sessions, code reviews, and project debugging for 3 lab classes.',
      id: 'Saya memandu sesi praktikum teknis, code review, dan penanganan bug untuk 3 kelas.',
    },
  },
  businessProblem: {
    en: 'Undergraduate computer science students frequently experience high conceptual drop-off when transitioning from textbook programming theory to multi-tier web application architecture, API integration, and asynchronous debugging.',
    id: 'Mahasiswa kerap menghadapi hambatan besar saat berpindah dari teori pemrograman buku ke arsitektur web berlapis, integrasi API, dan penanganan bug asinkron.',
  },
  solutionFit: {
    en: 'I structured interactive laboratory practicums combining real-time live coding, targeted debugging workshops, and structured milestone reviews covering foundational frontend through backend API development.',
    id: 'Saya merancang praktikum laboratorium interaktif yang memadukan live coding, workshop debugging terarah, dan evaluasi berkala dari frontend hingga RESTful API backend.',
  },
  system: {
    direction: 'auto',
    nodes: [
      {
        id: 'students',
        type: 'actor',
        label: { en: '90+ Lab Students', id: '90+ Mahasiswa Praktikan' },
        description: { en: 'Learners across 3 web engineering laboratory sections', id: 'Praktikan di 3 kelas laboratorium web' },
      },
      {
        id: 'curriculum-delivery',
        type: 'step',
        label: { en: 'Full-Stack Practical Curriculum', id: 'Kurikulum Praktikum Full-Stack' },
        description: { en: 'Hands-on instruction on REST APIs, Laravel, PHP, and modern DOM concepts', id: 'Materi langsung REST API, Laravel, PHP, dan DOM modern' },
      },
      {
        id: 'code-review',
        type: 'step',
        label: { en: 'Live Code Reviews & Debugging', id: 'Review Kode & Debugging' },
        description: { en: 'Root-cause troubleshooting of asynchronous states and database queries', id: 'Penyelesaian kendala state asinkron dan kueri database' },
      },
      {
        id: 'final-project',
        type: 'step',
        label: { en: 'Production-Grade Final Projects', id: 'Tugas Akhir Berstandar Produksi' },
        description: { en: 'Guiding functional requirements into working web applications', id: 'Membimbing spesifikasi menjadi aplikasi web fungsional' },
      },
    ],
    edges: [
      { from: 'students', to: 'curriculum-delivery', label: { en: 'Hands-on exercises', id: 'Latihan langsung' } },
      { from: 'curriculum-delivery', to: 'code-review', label: { en: 'Debug sessions', id: 'Sesi debugging' } },
      { from: 'code-review', to: 'final-project', label: { en: 'Deploy project', id: 'Rilis tugas' } },
    ],
  },
  results: [
    {
      value: '90+ Students',
      label: { en: 'Undergraduates mentored across 3 classes with measurable pass rates', id: 'Mahasiswa dibimbing di 3 kelas dengan tingkat kelulusan terukur' },
      evidence: 'measured',
    },
    {
      value: 'Full Stack Scope',
      label: { en: 'Covered HTML, CSS, JavaScript, PHP, Laravel, WordPress, and RESTful APIs', id: 'Mencakup HTML, CSS, JavaScript, PHP, Laravel, WordPress, dan REST API' },
      evidence: 'measured',
    },
  ],
  showcase: [
    {
      src: '/Works/Lab.jpg',
      alt: { en: 'Informatics Laboratory Telkom University', id: 'Laboratorium Informatika Telkom University' },
      caption: { en: 'Instructional sessions at the Informatics Laboratory', id: 'Sesi praktikum di Laboratorium Informatika' },
    },
  ],
  techStack: [
    { group: 'Stack', items: ['PHP', 'Laravel', 'JavaScript', 'HTML/CSS', 'REST APIs', 'WordPress'] },
  ],
  reflection: {
    en: 'Mentoring dozens of students sharpened how I break down complex architectures into intuitive concepts. Teaching something rigorously is the fastest way to master it deeply.',
    id: 'Membimbing puluhan mahasiswa mengasah kemampuan saya menyederhanakan arsitektur kompleks menjadi konsep yang mudah dipahami. Mengajarkan sesuatu secara mendalam adalah cara tercepat untuk menguasainya.',
  },
  featured: false,
}

export default informaticsLabCaseStudy
