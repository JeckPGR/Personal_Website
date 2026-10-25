import type { CaseStudy } from './schema'

/**
 * FDE Case Study Template
 * -------------------------------------------------------------
 * Every entry reads as an owned problem taken to production.
 *
 * Writing Guidelines:
 * - Outcome first, plain language, short sentences, no buzzwords, no filler.
 * - First person ("I", "my") only in scope summary and reflection.
 * - Do NOT invent facts or numbers. Anything unknown MUST be marked with "TODO: ...".
 * - Any string containing "TODO:" is automatically excluded from the public site.
 *
 * Kind-specific emphasis:
 * - Web App:
 *     Focus on user workflow friction, usage metrics, and time taken to finish tasks.
 * - Mobile:
 *     Focus on platform constraints (offline mode, push notifications, memory/battery),
 *     release/store status, active users, and crash-free sessions.
 * - Automation & Bot:
 *     Focus on manual process replaced, volume handled per day, hours saved weekly,
 *     error rate, cost per execution, and failure handling (retries, queue, human fallback).
 * - Work Experience:
 *     Focus on organizational context (domain, team size, operational scale),
 *     the specific problem you owned, and production outcomes.
 */

export const templateCaseStudy: CaseStudy = {
  slug: 'example-case-study',
  kind: 'project', // 'work' | 'project'
  category: 'web-app', // 'web-app' | 'mobile' | 'automation-bot' (required for projects)
  title: {
    en: 'System or Project Name',
    id: 'Nama Sistem atau Proyek',
  },
  // Tagline formula: [Problem / Trigger] → [What was built & Outcome]
  tagline: {
    en: 'High manual overhead in document verification → Automated AI validation pipeline in 20 minutes',
    id: 'Beban manual verifikasi dokumen yang tinggi → Pipeline validasi AI otomatis dalam 20 menit',
  },
  status: 'live', // 'live' | 'beta' | 'internal' | 'archived'
  period: {
    start: '2025-01',
    end: '2025-04', // or 'present'
  },
  org: {
    name: 'Organization or Client Name',
    role: 'Forward Deployed Engineer / Lead',
    domain: 'Enterprise Procurement / B2B SaaS',
  },
  link: {
    label: 'Visit Live Product',
    url: 'https://example.com',
  },
  scope: {
    type: 'lead', // 'solo' | 'lead' | 'contributor'
    summary: {
      en: 'I owned the end-to-end architecture, API integration, and production deployment.',
      id: 'Saya memegang arsitektur end-to-end, integrasi API, dan deployment ke produksi.',
    },
  },

  // 1. Business Problem: 2-3 sentences. Who struggles, in which process, what it costs (time, money, errors).
  businessProblem: {
    en: 'Operations staff spent over 15 hours each week manually cross-checking procurement clauses across disparate PDFs. The repetitive manual process introduced high error rates and caused delivery bottlenecks before contract signing.',
    id: 'Staf operasional menghabiskan lebih dari 15 jam per minggu untuk mencocokkan klausul pengadaan antar PDF secara manual. Proses manual yang berulang ini memicu tingkat kesalahan tinggi dan penundaan sebelum penandatanganan kontrak.',
  },

  // 2. Product-to-Solution Fit: 3-4 sentences. Why this approach fits vs. manual or off-the-shelf.
  solutionFit: {
    en: 'Off-the-shelf document tools could not parse customized internal SOP clauses and posed data confidentiality risks. We built a specialized validation service pairing local OCR with fine-tuned LLM prompts, keeping documents bounded to private enterprise VPC while automating clause compliance checks.',
    id: 'Perangkat lunak siap pakai tidak mampu memproses klausul SOP internal khusus dan berisiko terhadap kerahasiaan data. Kami membangun layanan validasi terfokus yang memadukan OCR dengan prompt LLM terarah, menjaga data tetap di dalam VPC pribadi sembari mengotomasi verifikasi kepatuhan klausul.',
  },

  // 3. The System (User-facing flow diagram)
  system: {
    direction: 'auto', // 'horizontal' | 'vertical' | 'auto'
    nodes: [
      {
        id: 'user',
        type: 'actor',
        label: { en: 'Operations Lead', id: 'Lead Operasional' },
        description: { en: 'Uploads incoming supplier agreements', id: 'Mengunggah draf perjanjian supplier' },
      },
      {
        id: 'extraction',
        type: 'step',
        label: { en: 'Document Parsing', id: 'Parsing Dokumen' },
        description: { en: 'Extracts tabular and textual clauses', id: 'Mengekstrak klausul tabel dan teks' },
      },
      {
        id: 'compliance',
        type: 'ai',
        label: { en: 'Compliance Engine', id: 'Mesin Kepatuhan' },
        description: { en: 'Compares extracted clauses against active SOP rules', id: 'Mencocokkan klausul dengan aturan SOP aktif' },
      },
      {
        id: 'audit-report',
        type: 'step',
        label: { en: 'Audit & Output', id: 'Laporan Audit' },
        description: { en: 'Generates flagged variance summary', id: 'Menghasilkan ringkasan anomali' },
      },
    ],
    edges: [
      { from: 'user', to: 'extraction', label: { en: 'Upload PDF', id: 'Unggah PDF' } },
      { from: 'extraction', to: 'compliance' },
      { from: 'compliance', to: 'audit-report', label: { en: 'Flag discrepancies', id: 'Tandai ketidakcocokan' } },
    ],
  },

  // 4. Architecture (Technical implementation diagram)
  // CLASSIFIED RULE:
  // For types 'service', 'data', 'ai', 'external':
  // If `tools` is omitted or empty (and `hideTools` is not true), a "Classified" badge is rendered.
  // If `tools` has items, they render as chips.
  // If `hideTools: true`, no tool line renders at all.
  architecture: {
    direction: 'auto',
    nodes: [
      {
        id: 'web-client',
        type: 'service',
        label: { en: 'Admin Web App', id: 'Aplikasi Web Admin' },
        description: { en: 'Frontend dashboard for review and override', id: 'Dashboard frontend untuk review' },
        tools: ['React', 'Next.js', 'TailwindCSS'],
      },
      {
        id: 'api-service',
        type: 'service',
        label: { en: 'API Gateway & Orchestrator', id: 'Gateway API & Orkestrator' },
        description: { en: 'Handles authentication and background task scheduling', id: 'Menangani autentikasi dan antrean' },
        tools: ['Node.js', 'NestJS'],
      },
      {
        id: 'ai-engine',
        type: 'ai',
        label: { en: 'Document Intelligence LLM', id: 'LLM Pemrosesan Dokumen' },
        description: { en: 'Enterprise LLM endpoint for clause checking', id: 'Endpoint LLM untuk validasi klausul' },
        // Leaving tools empty here triggers the "Classified" badge!
        tools: [],
      },
      {
        id: 'database',
        type: 'data',
        label: { en: 'Relational & Audit Store', id: 'Database & Log Audit' },
        description: { en: 'Stores sanitized audit logs and validation history', id: 'Menyimpan riwayat dan log audit' },
        tools: ['PostgreSQL'],
      },
    ],
    edges: [
      { from: 'web-client', to: 'api-service', label: { en: 'REST / HTTPS', id: 'REST / HTTPS' } },
      { from: 'api-service', to: 'ai-engine', label: { en: 'JSON RPC', id: 'JSON RPC' } },
      { from: 'api-service', to: 'database', label: { en: 'Prisma ORM', id: 'Prisma ORM' } },
    ],
  },

  // 5. Results: 2-4 cards with evidence labels ('measured' | 'estimated' | 'qualitative')
  results: [
    {
      value: '15 h -> 30 min',
      label: { en: 'Weekly manual check time reduced', id: 'Pengurangan waktu pengecekan manual mingguan' },
      evidence: 'measured',
      note: { en: 'Measured across 4 weeks of operational trials', id: 'Diukur selama 4 minggu uji operasional' },
    },
    {
      value: '99.2%',
      label: { en: 'Clause mismatch detection rate', id: 'Tingkat akurasi deteksi anomali klausul' },
      evidence: 'measured',
      note: { en: 'Benchmarked against 120 historical contracts', id: 'Diuci terhadap 120 kontrak historis' },
    },
    {
      value: '0 Leaks',
      label: { en: 'Zero external data exposure', id: 'Tidak ada kebocoran data eksternal' },
      evidence: 'qualitative',
      note: { en: 'All inference contained in private VPC', id: 'Seluruh inferensi tertutup dalam VPC privat' },
    },
  ],

  // 6. Showcase: Up to 3-4 screenshots with captions
  showcase: [
    {
      src: '/Projects/example-preview.png',
      alt: { en: 'Verification dashboard showing clause comparison', id: 'Dashboard verifikasi perbandingan klausul' },
      caption: { en: 'Real-time diff view highlighting mismatched vendor terms', id: 'Tampilan perbandingan real-time menandai klausul vendor' },
    },
  ],

  // 7. Tech Stack: Grouped by functional layer
  // Note: Only disclosed tools will be listed. If any node has classified tools,
  // a note "Some components are undisclosed." is automatically shown.
  techStack: [
    { group: 'Frontend', items: ['React', 'Next.js', 'TailwindCSS'] },
    { group: 'Backend', items: ['NestJS', 'Node.js'] },
    { group: 'Data', items: ['PostgreSQL'] },
    { group: 'Infra', items: ['Docker', 'Vercel'] },
  ],

  // 8. Reflection: Optional trade-offs and retrospective
  reflection: {
    en: 'Building for enterprise operations reinforced that speed without auditability is useless. Providing a transparent diff view was far more important to users than pure automation without human review.',
    id: 'Membangun untuk operasional enterprise membuktikan bahwa kecepatan tanpa auditabilitas tidak ada artinya. Menyediakan tampilan diff yang transparan jauh lebih penting bagi pengguna dibandingkan otomatisasi penuh tanpa kendali manusia.',
  },

  featured: true,
}

export default templateCaseStudy
