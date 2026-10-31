import type { CaseStudy } from '../schema'

export const caatisHrmsCaseStudy: CaseStudy = {
  slug: 'caatis-hrms',
  kind: 'project',
  category: 'web-app',
  title: {
    en: 'CAATIS Multi-Outlet Operations & Payroll Engine',
    id: 'CAATIS Multi-Outlet Operations & Payroll Engine',
  },
  subtitle: {
    en: 'Client Project',
    id: 'Proyek Klien',
  },
  tagline: {
    en: 'Fragmented branch records & error-prone manual wage logs → Centralized multi-outlet staff management platform',
    id: 'Catatan shift cabang terpisah & kalkulasi manual rawan salah → Platform terpusat manajemen staf multi-outlet',
  },
  metaLabel: {
    en: 'OPERATIONS & PAYROLL PLATFORM',
    id: 'PLATFORM OPERASIONAL & PAYROLL',
  },
  thumbnail: '/Works/CAATIS.png',
  status: 'live',
  period: {
    start: '2024-09',
    end: '2024-12',
  },
  org: {
    name: 'CAATIS FnB Group',
    role: 'Full Stack Developer',
    domain: 'Food & Beverage Multi-Branch Operations',
  },
  scope: {
    type: 'solo',
    summary: {
      en: 'I architected, built, and deployed the multi-branch scheduling and automated payroll platform on a production VPS server.',
      id: 'Saya merancang arsitektur, membangun, dan mendeploy platform penjadwalan dan penggajian multi-cabang ke server VPS produksi.',
    },
  },
  businessProblem: {
    en: 'Managing shifts and payroll across 4 physical restaurant outlets with 30+ staff was previously tracked via disconnected chat notes and manual spreadsheets. Inconsistent punch records created recurring discrepancies during month-end wage reconciliation.',
    id: 'Pengelolaan shift dan gaji di 4 outlet fisik dengan 30+ staf sebelumnya dilakukan lewat pesan chat dan spreadsheet terpisah. Catatan absensi yang tidak konsisten memicu kendala administratif rutin saat rekapitulasi gaji di akhir bulan.',
  },
  solutionFit: {
    en: 'I developed a centralized, responsive staff operations platform. The system unifies shift scheduling, logs digital attendances, and integrates automated calculation rules in PostgreSQL and Express.js to streamline payroll payouts across all branches.',
    id: 'Saya mengembangkan platform operasional staf yang terpusat dan responsif. Sistem menyatukan penjadwalan shift, mencatat absensi digital, dan mengintegrasikan formula otomatis di PostgreSQL dan Express.js untuk memproses gaji di seluruh cabang.',
  },
  system: {
    direction: 'auto',
    nodes: [
      {
        id: 'branch-staff',
        type: 'actor',
        label: { en: 'Outlet Staff (30+)', id: 'Staf Outlet (30+)' },
        description: { en: 'Logs daily clock-ins across 4 branch locations', id: 'Melakukan absensi harian di 4 lokasi cabang' },
      },
      {
        id: 'shift-scheduler',
        type: 'step',
        label: { en: 'Multi-Outlet Scheduler', id: 'Penjadwalan Multi-Outlet' },
        description: { en: 'Assigns outlet coverage and tracks overtime hours', id: 'Mengatur alokasi tugas outlet dan jam lembur' },
      },
      {
        id: 'payroll-engine',
        type: 'service',
        label: { en: 'Automated Payroll Engine', id: 'Mesin Penggajian Otomatis' },
        description: { en: 'Calculates wage totals, bonuses, and deductions based on verified attendance', id: 'Menghitung total gaji, bonus, dan potongan otomatis' },
        tools: ['Express.js', 'PostgreSQL'],
      },
      {
        id: 'management-console',
        type: 'step',
        label: { en: 'Owner Dashboard', id: 'Dasbor Manajemen' },
        description: { en: 'Reviews payroll summaries and issues batch payout reports', id: 'Memverifikasi rekapitulasi gaji dan laporan pengeluaran' },
      },
    ],
    edges: [
      { from: 'branch-staff', to: 'shift-scheduler', label: { en: 'Clock in', id: 'Absen' } },
      { from: 'shift-scheduler', to: 'payroll-engine', label: { en: 'Verified hours', id: 'Jam kerja' } },
      { from: 'payroll-engine', to: 'management-console', label: { en: 'Payroll draft', id: 'Draf gaji' } },
    ],
  },
  architecture: {
    direction: 'auto',
    nodes: [
      {
        id: 'react-frontend',
        type: 'service',
        label: { en: 'React & Tailwind Console', id: 'Konsol React & Tailwind' },
        description: { en: 'Clean administrative web interface for outlet supervisors and management', id: 'Antarmuka web admin untuk supervisor outlet dan pemilik' },
        tools: ['React', 'Tailwind CSS'],
      },
      {
        id: 'express-api',
        type: 'service',
        label: { en: 'Express.js REST API', id: 'REST API Express.js' },
        description: { en: 'Node.js backend orchestrating attendance validation and wage algorithms', id: 'Backend Node.js yang memproses validasi absensi dan algoritma gaji' },
        tools: ['Node.js', 'Express.js', 'TypeScript'],
      },
      {
        id: 'postgres-db',
        type: 'data',
        label: { en: 'PostgreSQL Relational DB', id: 'Database PostgreSQL' },
        description: { en: 'Relational storage enforcing strict foreign keys and ACID payroll audits', id: 'Penyimpanan relasional dengan integritas data dan audit transaksi gaji' },
        tools: ['PostgreSQL'],
      },
      {
        id: 'vps-server',
        type: 'service',
        label: { en: 'Nginx + VPS Server', id: 'Server VPS + Nginx' },
        description: { en: 'Self-hosted production environment with PM2 process manager and SSL', id: 'Infrastruktur VPS produksi dengan process manager PM2 dan SSL' },
        tools: ['Nginx', 'Ubuntu VPS', 'PM2'],
      },
    ],
    edges: [
      { from: 'react-frontend', to: 'express-api', label: { en: 'REST API', id: 'REST API' } },
      { from: 'express-api', to: 'postgres-db', label: { en: 'SQL Queries', id: 'Kueri SQL' } },
      { from: 'express-api', to: 'vps-server', label: { en: 'Host', id: 'Hosting' } },
    ],
  },
  results: [
    {
      value: '4 Outlets',
      label: { en: 'Unified operational shift scheduling across multiple restaurant locations', id: 'Penjadwalan terpadu untuk 4 lokasi restoran' },
      evidence: 'measured',
    },
    {
      value: '30+ Staff',
      label: { en: 'Active employees managed with standardized digital attendance records', id: 'Karyawan aktif dikelola dengan absensi digital terstandarisasi' },
      evidence: 'measured',
    },
    {
      value: 'Zero Error Payroll',
      label: { en: 'Replaced manual spreadsheet calculations with automated wage processing', id: 'Menggantikan perhitungan spreadsheet manual dengan kalkulasi otomatis' },
      evidence: 'qualitative',
    },
  ],
  showcase: [],
  techStack: [
    { group: 'Frontend', items: ['React', 'TypeScript', 'Tailwind CSS'] },
    { group: 'Backend', items: ['Node.js', 'Express.js', 'PostgreSQL'] },
    { group: 'Infrastructure', items: ['Linux VPS', 'Nginx', 'PM2'] },
  ],
  reflection: {
    en: 'Developing the CAATIS platform reinforced the value of clean data modeling and modular backend architecture. Building an internal tool that people rely on daily for accurate livelihoods demanded strict correctness and dependable system uptime.',
    id: 'Mengembangkan platform CAATIS mempertegas pentingnya pemodelan data yang bersih dan arsitektur backend yang modular. Membangun sistem yang digunakan setiap hari untuk urusan krusial seperti absensi dan gaji menuntut akurasi mutlak dan stabilitas performa tinggi.',
  },
  featured: false,
}

export default caatisHrmsCaseStudy
