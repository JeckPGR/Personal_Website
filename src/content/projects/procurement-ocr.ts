import type { CaseStudy } from '../schema'

export const procurementOcrCaseStudy: CaseStudy = {
  slug: 'procurement-ecosystem-mapping',
  kind: 'project',
  category: 'automation-bot',
  title: {
    en: 'Procurement OCR & AI Compliance Checker (PoC)',
    id: 'Procurement OCR & AI Compliance Checker (PoC)',
  },
  subtitle: {
    en: 'Enterprise PoC / R&D',
    id: 'PoC Enterprise / R&D',
  },
  tagline: {
    en: 'Silent document clause discrepancies → Automated OCR & GenAI pre-flight compliance guard',
    id: 'Ketidakcocokan klausul dokumen pengadaan → Pemeriksa kepatuhan awal otomatis berbasis OCR & GenAI',
  },
  metaLabel: {
    en: 'AI COMPLIANCE CHECKER',
    id: 'PEMERIKSA KEPATUHAN AI',
  },
  thumbnail: '/Works/BankMandiri.jpg',
  status: 'internal',
  period: {
    start: '2025-10',
    end: '2026-04',
  },
  org: {
    name: 'PT Bank Mandiri (Persero) Tbk.',
    role: 'R&D Intern - Strategic Procurement',
    domain: 'Enterprise Banking & Strategic Procurement',
  },
  scope: {
    type: 'solo',
    summary: {
      en: 'I identified the operational friction, designed the integration architecture, and built the working MVP.',
      id: 'Saya mengidentifikasi masalah operasional, merancang arsitektur integrasi, dan membangun prototipe fungsional.',
    },
  },
  businessProblem: {
    en: 'Procurement teams processed hundreds of high-value bank guarantees and vendor agreements where human reviewers repeatedly missed omitted legal clauses or numerical discrepancies across cross-referenced files. These errors were only caught downstream during contract auditing, causing severe operational delays.',
    id: 'Tim pengadaan memproses ratusan berkas jaminan bank dan kontrak vendor di mana pemeriksa manual kerap melewatkan klausul wajib atau perbedaan angka antar dokumen pendukung. Kesalahan ini baru terdeteksi di tahap akhir audit kontrak, memicu keterlambatan operasional yang signifikan.',
  },
  solutionFit: {
    en: 'Modifying core legacy enterprise procurement systems would take months of compliance reviews. I built a rapid, lightweight pre-flight MVP combining Azure Document Intelligence OCR with Google Gemini AI inside Google Apps Script. Operating as a friction-free internal PoC sandbox with no login required, Azure OCR parses raw text from uploaded PDFs, Google Gemini AI structures and matches the extracted text into a standardized JSON schema, and the system automatically outputs a clear comparison of filled valid fields against missing or non-compliant SOP clauses.',
    id: 'Mengubah sistem inti perbankan memerlukan waktu berbulan-bulan untuk persetujuan kepatuhan. Saya membangun MVP pemeriksaan awal yang ringan dan cepat menggunakan perpaduan OCR Azure Document Intelligence dan validasi Google Gemini AI di atas Google Apps Script. Berjalan sebagai sandbox PoC internal tanpa perlu login, Azure OCR membaca teks mentah dari PDF yang diunggah, Google Gemini AI menyusun dan mencocokkan teks ke field format JSON standar, lalu sistem mengembalikan perbandingan field yang terisi vs field yang kosong atau tidak sesuai SOP.',
  },
  system: {
    direction: 'auto',
    nodes: [
      {
        id: 'reviewer',
        type: 'actor',
        label: { en: 'Procurement Specialist (No Login PoC)', id: 'Spesialis Pengadaan (Sandbox PoC Tanpa Login)' },
        description: { en: 'Accesses internal sandbox with zero login overhead and uploads bank guarantee or agreement PDF', id: 'Mengakses tool sandbox internal tanpa login dan mengunggah PDF jaminan bank atau kontrak pengadaan' },
      },
      {
        id: 'ocr-extraction',
        type: 'service',
        label: { en: 'Azure Document Intelligence (OCR)', id: 'Azure Document Intelligence (OCR)' },
        description: { en: 'Reads and extracts raw unstructured text, key-value pairs, and financial tables from document', id: 'Membaca dan mengekstrak teks mentah, pasangan key-value, dan tabel keuangan dari dokumen' },
        tools: ['Azure OCR'],
      },
      {
        id: 'gemini-matching',
        type: 'ai',
        label: { en: 'Google Gemini AI (JSON Schema Extraction)', id: 'Google Gemini AI (Ekstraksi Skema JSON)' },
        description: { en: 'Aggregates raw OCR text and structures data points into standardized JSON schema fields', id: 'Mengumpulkan teks mentah OCR dan mencocokkan data ke format skema JSON terstandar' },
        tools: ['Google Gemini AI'],
      },
      {
        id: 'sop-comparator',
        type: 'step',
        label: { en: 'SOP Discrepancy & Gap Analyzer', id: 'Penganalisis Kesenjangan & SOP' },
        description: { en: 'Contrasts extracted JSON fields against required SOP rules, distinguishing filled vs unfilled/violating items', id: 'Membandingkan field JSON terhadap aturan SOP, memisahkan field terisi vs klausul kosong atau melanggar' },
      },
      {
        id: 'audit-log',
        type: 'step',
        label: { en: 'Pre-Flight Discrepancy Report', id: 'Laporan Ketidaksesuaian Pre-Flight' },
        description: { en: 'Returns instantaneous flagged matrix of verified fields and missing mandatory clauses before formal submission', id: 'Menampilkan matriks hasil verifikasi dan peringatan klausul wajib yang terlewat sebelum pengajuan formal' },
      },
    ],
    edges: [
      { from: 'reviewer', to: 'ocr-extraction', label: { en: 'Upload PDF', id: 'Unggah PDF' } },
      { from: 'ocr-extraction', to: 'gemini-matching', label: { en: 'Raw OCR text', id: 'Teks mentah OCR' } },
      { from: 'gemini-matching', to: 'sop-comparator', label: { en: 'JSON schema fields', id: 'Field skema JSON' } },
      { from: 'sop-comparator', to: 'audit-log', label: { en: 'Filled vs unfilled diff', id: 'Diff terisi vs kosong' } },
    ],
  },
  architecture: {
    direction: 'auto',
    nodes: [
      {
        id: 'gas-runtime',
        type: 'service',
        lane: 0,
        label: { en: 'Google Apps Script Engine', id: 'Engine Google Apps Script' },
        description: { en: 'Zero-install runtime natively accessible within existing enterprise workspace', id: 'Runtime otomatis tanpa instalasi yang terintegrasi di ruang kerja enterprise' },
        tools: ['Google Apps Script'],
      },
      {
        id: 'azure-ocr',
        type: 'external',
        lane: 1,
        label: { en: 'Azure Document Intelligence (OCR)', id: 'Azure Document Intelligence (OCR)' },
        description: { en: 'Enterprise-grade OCR reading raw text and extracting complex multi-page financial tables', id: 'OCR perbankan untuk membaca teks mentah dan mengekstrak tabel finansial multi-halaman' },
        tools: ['Azure OCR'],
      },
      {
        id: 'gemini-ai',
        type: 'ai',
        lane: 2,
        label: { en: 'Google Gemini AI', id: 'Google Gemini AI' },
        description: { en: 'Generative AI model aggregating raw text and matching data points into standardized JSON schema', id: 'Model AI generatif untuk merangkum teks mentah dan memetakan parameter ke skema JSON standar' },
        tools: ['Google Gemini AI'],
      },
      {
        id: 'anonymized-store',
        type: 'data',
        lane: 3,
        label: { en: 'Anonymized Validation Data', id: 'Data Validasi Anonim' },
        description: { en: 'Test records with synthetic figures ensuring zero data disclosure during PoC trials', id: 'Data uji dengan angka sintetis untuk menjamin kerahasiaan perbankan selama pengujian PoC' },
        tools: [],
      },
    ],
    edges: [
      { from: 'gas-runtime', to: 'azure-ocr', label: { en: 'Document OCR Scan', id: 'Scan Dokumen OCR' } },
      { from: 'azure-ocr', to: 'gemini-ai', label: { en: 'Raw Text to JSON Schema', id: 'Teks Mentah ke Skema JSON' } },
      { from: 'gemini-ai', to: 'anonymized-store', label: { en: 'Compliance Audit Logs', id: 'Log Audit Kepatuhan' } },
    ],
  },
  results: [
    {
      value: 'Working MVP',
      label: { en: 'Successfully automated pre-flight document error detection', id: 'Otomasi deteksi awal kesalahan dokumen berhasil dibangun' },
      evidence: 'qualitative',
    },
    {
      value: '100% Zero Leak',
      label: { en: 'Validated using historical anonymized documents without exposing bank data', id: 'Divalidasi dengan dokumen historis anonim tanpa mengekspos data bank' },
      evidence: 'measured',
    },
  ],
  showcase: [
    {
      src: '/Projects/mandiri-1.png',
      alt: { en: 'Procurement application ecosystem mapping and OCR architecture diagram', id: 'Pemetaan ekosistem procurement dan arsitektur OCR' },
      caption: { en: 'Ecosystem analysis mapping document flows and discrepancy checkpoints', id: 'Analisis ekosistem memetakan alur dokumen dan titik rawan kesalahan' },
    },
  ],
  techStack: [
    { group: 'Orchestration', items: ['Google Apps Script'] },
    { group: 'Document OCR', items: ['Azure Document Intelligence'] },
    { group: 'Generative AI', items: ['Google Gemini AI'] },
    { group: 'Data Compliance', items: ['JSON Schema Validation'] },
  ],
  reflection: {
    en: 'This Proof of Concept proved that the most valuable engineering work often begins by identifying friction you encounter personally. Building a working prototype that solves immediate pain is the quickest way to demonstrate enterprise feasibility.',
    id: 'Proof of Concept ini membuktikan bahwa solusi engineering terbaik sering kali bermula dari masalah nyata yang dialami sendiri. Membangun purwarupa yang menyelesaikan masalah langsung adalah cara tercepat membuktikan kelayakan implementasi di tingkat enterprise.',
  },
  featured: true,
}

export default procurementOcrCaseStudy
