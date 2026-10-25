import type { CaseStudy } from '../schema'

export const bankMandiriCaseStudy: CaseStudy = {
  slug: 'bank-mandiri',
  kind: 'work',
  title: {
    en: 'PT Bank Mandiri (Persero) Tbk.',
    id: 'PT Bank Mandiri (Persero) Tbk.',
  },
  tagline: {
    en: 'Disparate procurement systems & recurring guarantee errors → Ecosystem mapping & TELOS evaluation for 11 enterprise apps',
    id: 'Sistem pengadaan terfragmentasi & anomali bank garansi → Pemetaan ekosistem & evaluasi TELOS untuk 11 aplikasi enterprise',
  },
  metaLabel: {
    en: 'RESEARCH & DEVELOPMENT',
    id: 'RESEARCH & DEVELOPMENT',
  },
  thumbnail: '/Works/BankMandiri.jpg',
  status: 'internal',
  period: {
    start: '2025-10',
    end: '2026-04',
  },
  org: {
    name: 'PT Bank Mandiri (Persero) Tbk.',
    role: 'Research & Development Intern - Strategic Procurement',
    domain: 'Enterprise Banking / Strategic Procurement',
  },
  scope: {
    type: 'contributor',
    summary: {
      en: 'I owned user workflow analysis across 3 units, mapped integrations for 11 applications, and formulated the TELOS recommendation.',
      id: 'Saya memegang analisis alur kerja di 3 unit kerja, memetakan integrasi 11 aplikasi, dan menyusun rekomendasi kerangka TELOS.',
    },
  },
  businessProblem: {
    en: 'Procurement operations across Contract, Processing, and Supporting teams were split across 11 siloed enterprise systems. Recurring data inconsistencies in 280+ bank guarantees caused administrative rework, audit bottlenecks, and prolonged supplier validation cycles.',
    id: 'Operasi pengadaan di unit Kontrak, Pemrosesan, dan Pendukung terpecah di 11 sistem enterprise terpisah. Inkonsistensi data berulang pada lebih dari 280 jaminan bank menimbulkan kerja ulang administratif dan memperlambat siklus validasi supplier.',
  },
  solutionFit: {
    en: 'Rather than proposing a disruptive rip-and-replace, I mapped the end-to-end data flow of all 11 interconnected systems, identified root friction points, and conducted a structured TELOS framework analysis (Technical, Economic, Legal, Operational, Schedule) to present four evaluated modernization pathways.',
    id: 'Alih-alih merombak seluruh sistem yang berisiko tinggi, saya memetakan aliran data hulu-ke-hilir dari 11 sistem terkait, mengidentifikasi titik friksi utama, dan menerapkan analisis kerangka TELOS untuk menyajikan empat opsi modernisasi terukur.',
  },
  system: {
    direction: 'auto',
    nodes: [
      {
        id: 'units',
        type: 'actor',
        label: { en: 'Cross-Functional Units', id: 'Unit Lintas Fungsi' },
        description: { en: 'Contract, Processing, and Supporting teams managing daily procurement', id: 'Tim Kontrak, Pemrosesan, dan Pendukung pengadaan' },
      },
      {
        id: 'workflow-study',
        type: 'step',
        label: { en: 'Workflow & Friction Analysis', id: 'Analisis Alur & Friksi' },
        description: { en: 'In-depth interviews documenting friction across 3 core procurement flows', id: 'Wawancara mendalam mencatat hambatan di 3 alur kerja' },
      },
      {
        id: 'ecosystem-map',
        type: 'step',
        label: { en: '11-App Ecosystem Map', id: 'Peta Ekosistem 11 Aplikasi' },
        description: { en: 'Comprehensive data-flow topology tracing guarantee validation gaps', id: 'Topologi aliran data melacak celah validasi jaminan' },
      },
      {
        id: 'telos-framework',
        type: 'step',
        label: { en: 'TELOS Decision Matrix', id: 'Matriks Keputusan TELOS' },
        description: { en: 'Evaluates 4 modernization options across Technical, Economic, and Operational feasibility', id: 'Mengevaluasi 4 opsi kelayakan teknis dan operasional' },
      },
    ],
    edges: [
      { from: 'units', to: 'workflow-study', label: { en: 'Pain points', id: 'Kendala' } },
      { from: 'workflow-study', to: 'ecosystem-map', label: { en: 'Map dependencies', id: 'Petakan sistem' } },
      { from: 'ecosystem-map', to: 'telos-framework', label: { en: 'Formulate options', id: 'Rumuskan opsi' } },
    ],
  },
  architecture: {
    direction: 'auto',
    nodes: [
      {
        id: 'procurement-apps',
        type: 'service',
        label: { en: '11 Enterprise Procurement Apps', id: '11 Aplikasi Pengadaan Enterprise' },
        description: { en: 'Legacy and modern internal banking platforms handling supplier onboarding and contracts', id: 'Platform internal perbankan untuk supplier dan kontrak' },
        hideTools: true,
      },
      {
        id: 'guarantee-data',
        type: 'data',
        label: { en: 'Bank Guarantee Records (280+)', id: 'Berkas Jaminan Bank (280+)' },
        description: { en: 'Historical financial guarantees analyzed for recurring defect patterns', id: 'Data jaminan historis untuk evaluasi pola anomali' },
        hideTools: true,
      },
      {
        id: 'telos-model',
        type: 'step',
        label: { en: 'TELOS Evaluation Model', id: 'Model Evaluasi TELOS' },
        description: { en: 'Scoring framework for Technical, Economic, Legal, Operational, and Schedule viability', id: 'Kerangka skoring kelayakan teknis dan operasional' },
        hideTools: true,
      },
    ],
    edges: [
      { from: 'procurement-apps', to: 'guarantee-data', label: { en: 'Data flow', id: 'Alur data' } },
      { from: 'guarantee-data', to: 'telos-model', label: { en: 'Evaluate', id: 'Evaluasi' } },
    ],
  },
  results: [
    {
      value: '11 Systems',
      label: { en: 'Procurement applications mapped with end-to-end integration topology', id: 'Aplikasi pengadaan dipetakan dengan topologi integrasi lengkap' },
      evidence: 'measured',
    },
    {
      value: '280+ Guarantees',
      label: { en: 'Bank guarantees validated to uncover systematic clause discrepancy causes', id: 'Jaminan bank divalidasi untuk mengungkap penyebab anomali' },
      evidence: 'measured',
    },
    {
      value: 'TELOS Framework',
      label: { en: 'Presented 4 evaluated modernization pathways to internal leadership', id: 'Mempresentasikan 4 jalur modernisasi terstruktur kepada pimpinan' },
      evidence: 'qualitative',
    },
  ],
  showcase: [
    {
      src: '/Works/BankMandiri.jpg',
      alt: { en: 'PT Bank Mandiri headquarters and strategic procurement workspace', id: 'Gedung PT Bank Mandiri dan lingkungan strategic procurement' },
      caption: { en: 'Strategic Procurement operations at PT Bank Mandiri (Persero) Tbk.', id: 'Operasional Strategic Procurement di PT Bank Mandiri (Persero) Tbk.' },
    },
  ],
  techStack: [
    { group: 'Strategy', items: ['TELOS Framework', 'System Mapping', 'Workflow Analysis'] },
    { group: 'Domain', items: ['Enterprise Banking', 'Procurement Systems'] },
  ],
  reflection: {
    en: 'Meaningful system improvement in enterprise banking starts from understanding how teams actually operate on the ground. Mapping the ecosystem first and listening to user pain points ensures technical recommendations are sustainable.',
    id: 'Perbaikan sistem enterprise di perbankan berawal dari memahami cara kerja tim di lapangan. Memetakan ekosistem terlebih dahulu dan mendengar kendala pengguna menjamin rekomendasi teknis dapat dijalankan secara berkelanjutan.',
  },
  featured: true,
}

export default bankMandiriCaseStudy
