import type { CaseStudy } from '../schema'

export const telkomPropertyCaseStudy: CaseStudy = {
  slug: 'telkom-property',
  kind: 'work',
  title: {
    en: 'Telkom Property',
    id: 'Telkom Property',
  },
  tagline: {
    en: 'Complex cross-functional delivery & timeline risk → Coordinated end-to-end IT release with 10 engineers',
    id: 'Risiko koordinasi tim lintas fungsi & timeline ketat → Delivery produk IT hulu-ke-hilir dengan 10 engineer',
  },
  metaLabel: {
    en: 'IT PROJECT MANAGER',
    id: 'IT PROJECT MANAGER',
  },
  thumbnail: '/Works/Telkom-Prop.webp',
  status: 'live',
  period: {
    start: '2024-10',
    end: '2025-02',
  },
  org: {
    name: 'Telkom Property',
    role: 'IT Project Manager',
    domain: 'Enterprise Property Technology & Asset Management',
  },
  scope: {
    type: 'lead',
    summary: {
      en: 'I led delivery management, sprint tracking, and pre-deployment testing across a 10-person cross-functional team.',
      id: 'Saya memimpin manajemen delivery, pelacakan sprint, dan koordinasi pengujian pre-deployment untuk tim 10 orang.',
    },
  },
  businessProblem: {
    en: 'Building a new property technology product involved diverse technical specializations (mobile, web, backend, QA, security) that risked misaligned priorities, divergent API contracts, and uncoordinated release cycles without dedicated technical program management.',
    id: 'Pembangunan produk proptech baru melibatkan beragam spesialisasi teknis (mobile, web, backend, QA, keamanan) yang rentan mengalami miskomunikasi prioritas dan ketidakselarasan kontrak API tanpa manajemen delivery teknis yang terstruktur.',
  },
  solutionFit: {
    en: 'I established a transparent delivery cadence: breaking business objectives into 50+ tracked backlog items, translating client expectations into concrete technical specifications, and running synchronized UAT and security audits to ensure production readiness.',
    id: 'Saya menetapkan ritme delivery yang terstruktur: memecah tujuan bisnis menjadi lebih dari 50 backlog terpantau, menerjemahkan ekspektasi klien menjadi spesifikasi teknis jelas, dan menyinkronkan pengujian UAT serta keamanan sebelum rilis produksi.',
  },
  system: {
    direction: 'auto',
    nodes: [
      {
        id: 'requirements',
        type: 'actor',
        label: { en: 'System Scope & Requirements', id: 'Spesifikasi & Kebutuhan Sistem' },
        description: { en: 'Defines architectural scope, API contracts, and release milestones', id: 'Menentukan batasan arsitektur teknis, kontrak API, dan target rilis' },
      },
      {
        id: 'backlog-planning',
        type: 'step',
        label: { en: 'Scoping & Technical Specs', id: 'Spesifikasi Teknis & Backlog' },
        description: { en: 'Translates high-level goals into 50+ sprint-ready technical user stories', id: 'Menerjemahkan sasaran menjadi 50+ user story terukur' },
      },
      {
        id: 'squad-execution',
        type: 'service',
        label: { en: '10-Person Multi-Disciplinary Squad', id: 'Tim Lintas Fungsi 10 Orang' },
        description: { en: 'Coordinated execution across Frontend, Backend, Mobile, QA, and Security', id: 'Eksekusi terkoordinasi antar Frontend, Backend, Mobile, QA, dan Security' },
        hideTools: true,
      },
      {
        id: 'testing-release',
        type: 'step',
        label: { en: 'Testing & Production Deployment', id: 'Pengujian & Deployment Produksi' },
        description: { en: 'System integration, performance benchmarks, and user acceptance sign-off', id: 'Pengujian sistem, performa, dan validasi UAT' },
      },
    ],
    edges: [
      { from: 'requirements', to: 'backlog-planning', label: { en: 'Specs & Scope', id: 'Spesifikasi & Scope' } },
      { from: 'backlog-planning', to: 'squad-execution', label: { en: 'Sprint delivery', id: 'Eksekusi sprint' } },
      { from: 'squad-execution', to: 'testing-release', label: { en: 'Release gate', id: 'Tahap rilis' } },
    ],
  },
  results: [
    {
      value: '10 Engineers',
      label: { en: 'Cross-functional squad coordinated across frontend, backend, mobile, QA, and security', id: 'Tim lintas fungsi dikoordinasikan mencakup web, backend, mobile, QA, dan sekuriti' },
      evidence: 'measured',
    },
    {
      value: '50+ Backlogs',
      label: { en: 'Feature items, bug fixes, and technical tasks tracked through to release', id: 'Item fitur, perbaikan bug, dan tugas teknis dipantau hingga rilis' },
      evidence: 'measured',
    },
    {
      value: 'End-to-End Release',
      label: { en: 'Successfully passed performance testing, security audits, and client UAT', id: 'Lolos uji performa, audit keamanan, dan UAT klien' },
      evidence: 'qualitative',
    },
  ],
  showcase: [
    {
      src: '/Works/Telkom-Prop.webp',
      alt: { en: 'Telkom Property project branding', id: 'Branding proyek Telkom Property' },
      caption: { en: 'Enterprise property technology product delivery at Telkom Property', id: 'Delivery produk teknologi properti di Telkom Property' },
    },
  ],
  techStack: [
    { group: 'Management', items: ['Agile / Scrum', 'Backlog Grooming', 'Sprint Planning'] },
    { group: 'Quality', items: ['UAT Testing', 'Performance Testing', 'Security Audit'] },
  ],
  reflection: {
    en: 'Coordinating a 10-person multi-disciplinary squad taught me that clarity is the real deliverable. Aligning scope, technical trade-offs, and rigorous pre-release testing is what keeps complex software moving steadily toward release.',
    id: 'Mengoordinasikan tim lintas disiplin 10 orang membuktikan bahwa kejelasan adalah deliverable sesungguhnya. Menyelaraskan ruang lingkup, kompromi teknis, dan pengujian ketat adalah kunci produk melaju stabil menuju rilis.',
  },
  featured: false,
}

export default telkomPropertyCaseStudy
