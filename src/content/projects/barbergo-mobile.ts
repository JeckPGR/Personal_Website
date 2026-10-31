import type { CaseStudy } from '../schema'

export const barbergoMobileCaseStudy: CaseStudy = {
  slug: 'barbergo-mobile',
  kind: 'project',
  category: 'mobile',
  title: {
    en: 'BarberGo Mobile Grooming & Real-Time Booking',
    id: 'BarberGo Mobile Grooming & Real-Time Booking',
  },
  subtitle: {
    en: 'Personal Project',
    id: 'Proyek Pribadi',
  },
  tagline: {
    en: 'Manual waiting queues & phone reservations → Real-time slot availability & cross-platform Flutter booking app',
    id: 'Antrean manual di tempat & reservasi via telepon → Ketersediaan slot real-time & aplikasi Flutter multiplatform',
  },
  metaLabel: {
    en: 'CROSS-PLATFORM FLUTTER APP',
    id: 'APLIKASI FLUTTER MULTIPLATFORM',
  },
  thumbnail: '/Projects/PajaBarbershop.png',
  status: 'live',
  period: {
    start: '2024-03',
    end: '2024-05',
  },
  org: {
    name: 'Personal Mobile Development Exploration',
    role: 'Mobile Software Engineer',
    domain: 'On-Demand Lifestyle & Real-Time Scheduling',
  },
  scope: {
    type: 'solo',
    summary: {
      en: 'I architected and developed the cross-platform mobile client with Flutter, Riverpod, and Supabase Realtime synchronization.',
      id: 'Saya merancang arsitektur dan mengembangkan aplikasi mobile cross-platform memakai Flutter, Riverpod, dan Supabase Realtime.',
    },
  },
  businessProblem: {
    en: 'Customers visiting modern barbershops frequently face unpredictable in-shop wait times, while calling by phone produces double-booking conflicts and poor visibility into individual barber work schedules.',
    id: 'Pelanggan barbershop sering kali menghadapi antrean panjang yang tidak pasti di lokasi, sedangkan reservasi via telepon rawan bentrok jadwal dan tidak transparan mengenai ketersediaan kapster.',
  },
  solutionFit: {
    en: 'I developed BarberGo as a reactive, cross-platform mobile application using Flutter and Supabase. Customers browse barbers, view haircut galleries, and claim real-time open slots that immediately sync across all active mobile clients.',
    id: 'Saya mengembangkan BarberGo sebagai aplikasi mobile reaktif multiplatform menggunakan Flutter dan Supabase. Pelanggan dapat memilih kapster, melihat galeri potongan rambut, dan memesan slot jadwal real-time yang langsung tersinkronisasi ke seluruh pengguna.',
  },
  system: {
    direction: 'auto',
    nodes: [
      {
        id: 'customer',
        type: 'actor',
        label: { en: 'Mobile App User', id: 'Pengguna Aplikasi Mobile' },
        description: { en: 'Browses barbers, service catalogs, and open time slots', id: 'Menjelajahi kapster, katalog servis, dan slot jam kosong' },
      },
      {
        id: 'booking-flow',
        type: 'step',
        label: { en: 'Interactive Booking Funnel', id: 'Alur Reservasi Interaktif' },
        description: { en: 'Multi-step wizard selecting service tier and barber preference', id: 'Panduan multi-step memilih paket layanan dan kapster' },
      },
      {
        id: 'supabase-realtime',
        type: 'service',
        label: { en: 'Supabase Realtime Sync', id: 'Sinkronisasi Realtime Supabase' },
        description: { en: 'Locks the chosen slot instantly via PostgreSQL row-level subscriptions', id: 'Mengunci slot terpilih secara instan lewat langganan event PostgreSQL' },
        tools: ['Supabase', 'PostgreSQL'],
      },
      {
        id: 'confirmation',
        type: 'step',
        label: { en: 'Instant Confirmation & Reminder', id: 'Konfirmasi & Pengingat Instan' },
        description: { en: 'Issues booking pass with push reminder schedule', id: 'Menerbitkan tiket booking dengan jadwal notifikasi pengingat' },
      },
    ],
    edges: [
      { from: 'customer', to: 'booking-flow', label: { en: 'Select haircut', id: 'Pilih layanan' } },
      { from: 'booking-flow', to: 'supabase-realtime', label: { en: 'Lock slot', id: 'Kunci slot' } },
      { from: 'supabase-realtime', to: 'confirmation', label: { en: 'Generate pass', id: 'Terbitkan tiket' } },
    ],
  },
  architecture: {
    direction: 'auto',
    nodes: [
      {
        id: 'flutter-client',
        type: 'service',
        label: { en: 'Flutter Cross-Platform App', id: 'Aplikasi Flutter Multiplatform' },
        description: { en: 'Single codebase compiled for Android and iOS using Riverpod state management', id: 'Satu basis kode untuk Android dan iOS dengan state management Riverpod' },
        tools: ['Flutter', 'Dart', 'Riverpod'],
      },
      {
        id: 'supabase-backend',
        type: 'service',
        label: { en: 'Supabase BaaS & Auth', id: 'Backend as a Service Supabase' },
        description: { en: 'Manages user authentication, row-level security policies, and webhooks', id: 'Mengelola autentikasi pengguna, aturan RLS, dan webhook' },
        tools: ['Supabase', 'PostgreSQL'],
      },
      {
        id: 'sqlite-cache',
        type: 'data',
        label: { en: 'Local SQLite Storage', id: 'Penyimpanan SQLite Lokal' },
        description: { en: 'Offline-first cache storing haircut history and user preferences', id: 'Penyimpanan offline menyimpan riwayat booking dan preferensi gaya' },
        tools: ['SQLite'],
      },
    ],
    edges: [
      { from: 'flutter-client', to: 'supabase-backend', label: { en: 'Realtime WSS & REST', id: 'Realtime WSS & REST' } },
      { from: 'flutter-client', to: 'sqlite-cache', label: { en: 'Offline Cache', id: 'Cache Offline' } },
    ],
  },
  results: [
    {
      value: 'Cross-Platform',
      label: { en: 'Unified Flutter codebase running natively on Android and iOS', id: 'Basis kode Flutter tunggal berjalan mulus di Android dan iOS' },
      evidence: 'qualitative',
    },
    {
      value: '<500ms Sync',
      label: { en: 'Real-time slot lock across all active connected devices', id: 'Sinkronisasi penguncian slot <500ms di semua perangkat' },
      evidence: 'measured',
    },
    {
      value: 'Offline-First',
      label: { en: 'Instant appointment history retrieval even without internet', id: 'Akses riwayat reservasi instan meski tanpa koneksi internet' },
      evidence: 'qualitative',
    },
  ],
  showcase: [],
  techStack: [
    { group: 'Mobile App', items: ['Flutter', 'Dart', 'Riverpod'] },
    { group: 'Backend & Data', items: ['Supabase', 'PostgreSQL Realtime'] },
    { group: 'Local Storage', items: ['SQLite', 'Offline-First Caching'] },
  ],
  reflection: {
    en: 'Building BarberGo demonstrated the sheer efficiency of Flutter and Riverpod for reactive state management. Delivering a polished mobile experience with zero real-time sync conflicts reinforced the value of clean, event-driven state boundaries.',
    id: 'Membangun BarberGo membuktikan efisiensi Flutter dan Riverpod dalam manajemen state reaktif. Menghadirkan antarmuka mobile yang mulus tanpa konflik sinkronisasi jadwal memperkuat pentingnya pemisahan arsitektur state yang bersih.',
  },
  featured: false,
}

export default barbergoMobileCaseStudy
