import type { CaseStudy } from '../schema'

export const jokiwithsoraCaseStudy: CaseStudy = {
  slug: 'jokiwithsora',
  kind: 'work',
  title: {
    en: 'Jokiwithsora',
    id: 'Jokiwithsora',
  },
  tagline: {
    en: 'Repetitive order dispatch & tracking bottlenecks → Automated spreadsheet pipelines saving 12+ hours weekly',
    id: 'Hambatan pelacakan & distribusi pesanan berulang → Pipeline spreadsheet otomatis menghemat 12+ jam per minggu',
  },
  thumbnail: '/Works/Jokiwithsora.png',
  metaLabel: {
    en: 'BUSINESS PROCESS & IT SUPPORT',
    id: 'PROSES BISNIS & IT SUPPORT',
  },
  status: 'live',
  period: {
    start: '2023-01',
    end: '2025-01',
  },
  org: {
    name: 'Jokiwithsora',
    role: 'Business Process Optimization & IT Support',
    domain: 'Digital Gaming Services & E-Commerce Operations',
  },
  scope: {
    type: 'solo',
    summary: {
      en: 'I analyzed operational bottlenecks, engineered 9+ automated spreadsheet systems, and provided IT support.',
      id: 'Saya menganalisis hambatan operasional, membangun 9+ sistem spreadsheet otomatis, dan menangani dukungan IT.',
    },
  },
  businessProblem: {
    en: 'Customer orders and fulfillment queues were manually copied between chat platforms and unstandardized logs. The repetitive manual dispatch created severe data entry delays, order status blind spots, and consumed dozens of hours of staff time each week.',
    id: 'Pesanan pelanggan dan antrean pengerjaan disalin manual antara platform chat dan catatan tidak baku. Proses manual yang berulang ini memicu keterlambatan entri data, hilangnya visibilitas status pesanan, dan menghabiskan puluhan jam kerja staf tiap minggu.',
  },
  solutionFit: {
    en: 'Rather than introducing cumbersome enterprise software with high training barriers, I engineered an interconnected ecosystem of 9+ automated operational spreadsheets with custom lookup formulas, automatic status dispatchers, and live revenue tracking.',
    id: 'Alih-alih memaksakan software enterprise rumit yang butuh waktu pelatihan lama, saya membangun ekosistem 9+ spreadsheet operasional terhubung dengan formula pencarian otomatis, pendistribusian status instan, dan pelacakan omzet real-time.',
  },
  system: {
    direction: 'auto',
    nodes: [
      {
        id: 'incoming-orders',
        type: 'actor',
        label: { en: 'Customer Orders', id: 'Pesanan Pelanggan' },
        description: { en: 'Inbound requests requiring queuing, verification, and worker assignment', id: 'Pesanan masuk yang membutuhkan verifikasi dan penugasan' },
      },
      {
        id: 'dispatch-pipeline',
        type: 'step',
        label: { en: 'Automated Dispatch Hub', id: 'Hub Distribusi Otomatis' },
        description: { en: 'Formulas and validation rules instantly routing tasks by availability', id: 'Formula dan aturan validasi membagikan tugas secara otomatis' },
      },
      {
        id: 'tracking-sheets',
        type: 'data',
        label: { en: '9+ Interconnected Spreadsheets', id: '9+ Spreadsheet Terintegrasi' },
        description: { en: 'Standardized operational logs tracking order status and worker fulfillment', id: 'Catatan operasional baku memantau status pengerjaan' },
        hideTools: true,
      },
      {
        id: 'reconciliation',
        type: 'step',
        label: { en: 'Automated Revenue Reconciliation', id: 'Rekonsiliasi Pendapatan Otomatis' },
        description: { en: 'Weekly payouts and margins computed without manual hand calculations', id: 'Perhitungan bagi hasil mingguan dan margin otomatis' },
      },
    ],
    edges: [
      { from: 'incoming-orders', to: 'dispatch-pipeline', label: { en: 'Log order', id: 'Catat order' } },
      { from: 'dispatch-pipeline', to: 'tracking-sheets', label: { en: 'Auto route', id: 'Rute otomatis' } },
      { from: 'tracking-sheets', to: 'reconciliation', label: { en: 'Aggregate', id: 'Rekapitulasi' } },
    ],
  },
  results: [
    {
      value: '12+ Hours Saved',
      label: { en: 'Weekly manual data entry and calculation overhead eliminated', id: 'Pengurangan waktu kerja manual dan input data per minggu' },
      evidence: 'measured',
      note: { en: 'Calculated across recurring weekly order processing volume', id: 'Dihitung berdasarkan volume pemrosesan pesanan mingguan' },
    },
    {
      value: '9+ Systems',
      label: { en: 'Interconnected operational spreadsheets maintaining reliable order workflows', id: 'Spreadsheet operasional terintegrasi menjaga alur kerja stabil' },
      evidence: 'measured',
    },
  ],
  showcase: [
    {
      src: '/Works/Jokiwithsora.png',
      alt: { en: 'Jokiwithsora operations branding', id: 'Branding operasional Jokiwithsora' },
      caption: { en: 'Operational optimization and workflow automation at Jokiwithsora', id: 'Otomasi alur kerja dan optimasi operasional di Jokiwithsora' },
    },
  ],
  techStack: [
    { group: 'Automation', items: ['Advanced Formulas', 'Workflow Optimization', 'Data Validation'] },
    { group: 'Infrastructure', items: ['IT Support', 'Hardware & Software Troubleshooting'] },
  ],
  reflection: {
    en: 'Turning repetitive manual work into simple, elegant automation proved that well-targeted systems deliver massive leverage without needing bloated tech stacks.',
    id: 'Mengubah pekerjaan manual berulang menjadi otomasi sederhana dan tepat sasaran membuktikan bahwa sistem yang dirancang dengan cermat memberi dampak efisiensi besar tanpa memerlukan teknologi yang berlebihan.',
  },
  featured: false,
}

export default jokiwithsoraCaseStudy
