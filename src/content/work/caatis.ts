import type { CaseStudy } from '../schema'

export const caatisCaseStudy: CaseStudy = {
  slug: 'caatis',
  kind: 'work',
  title: {
    en: 'CAATIS FnB Group',
    id: 'CAATIS FnB Group',
  },
  tagline: {
    en: 'Dispersed restaurant shift notes & error-prone payroll → Centralized multi-outlet staff management platform',
    id: 'Catatan shift restoran terpisah & penggajian rawan salah → Platform terpusat manajemen staf multi-outlet',
  },
  metaLabel: {
    en: 'FULL STACK DEV',
    id: 'FULL STACK DEV',
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
    domain: 'Food & Beverage Multi-Outlet Operations',
  },
  scope: {
    type: 'solo',
    summary: {
      en: 'I architected, built, and deployed the multi-branch scheduling and automated payroll platform on VPS.',
      id: 'Saya merancang, membangun, dan mendeploy platform penjadwalan dan penggajian multi-cabang ke server VPS.',
    },
  },
  businessProblem: {
    en: 'Managing shifts and payroll across 4 physical outlets with 30+ staff was conducted via disparate spreadsheets and paper timesheets. Inconsistent attendance records and manual wage calculations created recurring month-end administrative disputes.',
    id: 'Pengelolaan shift dan gaji di 4 outlet fisik dengan lebih dari 30 staf sebelumnya dilakukan lewat spreadsheet terpisah dan lembar absen manual. Catatan kehadiran yang tidak konsisten memicu kendala administratif rutin di akhir bulan.',
  },
  solutionFit: {
    en: 'I developed a centralized, responsive staff operations platform. The system unifies shift scheduling, logs digital attendances, and integrates automated calculation rules to streamline payroll payouts across all branches.',
    id: 'Saya mengembangkan platform operasional staf yang terpusat dan responsif. Sistem menyatukan penjadwalan shift, mencatat absensi digital, dan mengintegrasikan formula otomatis untuk memproses gaji di seluruh cabang.',
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
        description: { en: 'Assigns outlet coverage and tracks overtime', id: 'Mengatur alokasi tugas outlet dan lembur' },
      },
      {
        id: 'payroll-engine',
        type: 'service',
        label: { en: 'Automated Payroll Engine', id: 'Mesin Penggajian Otomatis' },
        description: { en: 'Calculates wage totals, bonuses, and deductions based on verified attendance', id: 'Menghitung total gaji, bonus, dan potongan otomatis' },
        hideTools: true,
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
  results: [
    {
      value: '4 Outlets',
      label: { en: 'Unified operational shift scheduling across multiple restaurant locations', id: 'Penjadwalan terpadu untuk beberapa lokasi restoran' },
      evidence: 'measured',
    },
    {
      value: '30+ Staff',
      label: { en: 'Active employees managed with standardized digital attendance records', id: 'Karyawan aktif dikelola dengan catatan absensi terstandarisasi' },
      evidence: 'measured',
    },
    {
      value: 'Automated Payroll',
      label: { en: 'Replaced manual spreadsheet calculations with automated wage processing', id: 'Menggantikan perhitungan spreadsheet manual dengan kalkulasi otomatis' },
      evidence: 'qualitative',
    },
  ],
  showcase: [
    {
      src: '/Works/CAATIS.png',
      alt: { en: 'CAATIS FnB Group brand visual', id: 'Visual brand CAATIS FnB Group' },
      caption: { en: 'Internal staff management system for CAATIS FnB Group', id: 'Sistem manajemen staf internal untuk CAATIS FnB Group' },
    },
  ],
  techStack: [
    { group: 'Application', items: ['Web Platform', 'REST APIs'] },
    { group: 'Infra', items: ['VPS Server', 'Linux Deployment'] },
  ],
  reflection: {
    en: 'Building internal tools for physical operations reminded me that effective software should quietly eliminate daily operational friction, not become yet another administrative chore.',
    id: 'Membangun sistem untuk operasional fisik membuktikan bahwa software yang efektif harus menghapus friksi harian secara senyap, bukan justru menambah beban administrasi baru.',
  },
  featured: false,
}

export default caatisCaseStudy
