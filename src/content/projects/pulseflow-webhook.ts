import type { CaseStudy } from '../schema'

export const pulseflowWebhookCaseStudy: CaseStudy = {
  slug: 'pulseflow-webhook',
  kind: 'project',
  category: 'automation-bot',
  title: {
    en: 'PulseFlow High-Throughput Webhook Engine',
    id: 'PulseFlow High-Throughput Webhook Engine',
  },
  subtitle: {
    en: 'Personal Project',
    id: 'Proyek Pribadi',
  },
  tagline: {
    en: 'Sudden request spikes & dropping webhooks → Distributed buffering queue & HMAC verification engine',
    id: 'Lonjakan request tiba-tiba & webhook gagal diproses → Antrean terdistribusi & mesin verifikasi HMAC',
  },
  metaLabel: {
    en: 'DISTRIBUTED EVENT PIPELINE',
    id: 'PIPELINE EVENT TERDISTRIBUSI',
  },
  thumbnail: '/Projects/Inotrive.png',
  status: 'live',
  period: {
    start: '2024-05',
    end: '2024-07',
  },
  org: {
    name: 'Personal Engineering Exploration',
    role: 'Backend Systems Engineer',
    domain: 'Distributed Systems & Event Processing',
  },
  scope: {
    type: 'solo',
    summary: {
      en: 'I architected and benchmarked a high-concurrency event ingestion pipeline handling HMAC-verified webhook payloads with BullMQ and Redis.',
      id: 'Saya merancang dan menguji benchmark pipeline penerima webhook konkurensi tinggi dengan verifikasi HMAC, BullMQ, dan Redis.',
    },
  },
  businessProblem: {
    en: 'Standard webhooks and synchronous API endpoints struggle under sudden traffic bursts. Without an asynchronous buffering layer, downstream database connections saturate, causing dropped payloads, duplicate retries, and silent event losses.',
    id: 'Endpoint webhook standar sering mengalami kegagalan saat menerima lonjakan traffic mendadak. Tanpa lapisan buffer asinkron, koneksi database downstream mengalami saturasi sehingga event penting terputus atau hilang tanpa jejak.',
  },
  solutionFit: {
    en: 'I engineered PulseFlow: a decoupled event gateway that immediately validates cryptographic HMAC signatures, pushes raw payloads into Redis-backed BullMQ queues, acknowledges requests in <20ms, and processes events asynchronously through worker pools with exponential backoff retries.',
    id: 'Saya membangun PulseFlow: gateway event terpisah yang memvalidasi signature HMAC kriptografi secara instan, memasukkan payload ke antrean BullMQ Redis, mengonfirmasi request dalam <20ms, dan memproses event secara asinkron dengan retry exponential backoff.',
  },
  system: {
    direction: 'auto',
    nodes: [
      {
        id: 'external-senders',
        type: 'actor',
        label: { en: 'Third-Party Webhooks (Stripe / GitHub)', id: 'Webhook Pihak Ketiga' },
        description: { en: 'Sends bursty HTTP POST event notifications with signature headers', id: 'Mengirimkan notifikasi HTTP POST bervolume tinggi beserta header signature' },
      },
      {
        id: 'ingestion-edge',
        type: 'service',
        label: { en: 'Ingestion Gateway (Fast Ack)', id: 'Gateway Ingestion (Fast Ack)' },
        description: { en: 'Validates HMAC SHA-256 signature and returns HTTP 202 in <20ms', id: 'Memvalidasi tanda tangan HMAC SHA-256 dan membalas HTTP 202 dalam <20ms' },
        tools: ['Node.js', 'Express.js'],
      },
      {
        id: 'bullmq-redis',
        type: 'service',
        label: { en: 'BullMQ & Redis Queue Buffer', id: 'Buffer Antrean BullMQ & Redis' },
        description: { en: 'Absorbs burst traffic and provides persistent distributed task queueing', id: 'Menyerap lonjakan traffic dan menyediakan antrean tugas terdistribusi' },
        tools: ['Redis', 'BullMQ'],
      },
      {
        id: 'worker-processors',
        type: 'step',
        label: { en: 'Worker Pool & Dead Letter Queue', id: 'Worker Pool & Dead Letter Queue' },
        description: { en: 'Executes idempotent business handlers with automated exponential backoff', id: 'Mengeksekusi handler idempoten dengan mekanisme retry otomatis' },
      },
    ],
    edges: [
      { from: 'external-senders', to: 'ingestion-edge', label: { en: 'POST payload', id: 'Kirim payload' } },
      { from: 'ingestion-edge', to: 'bullmq-redis', label: { en: 'Enqueue job', id: 'Masukkan antrean' } },
      { from: 'bullmq-redis', to: 'worker-processors', label: { en: 'Consume job', id: 'Proses job' } },
    ],
  },
  architecture: {
    direction: 'auto',
    nodes: [
      {
        id: 'gateway-node',
        type: 'service',
        label: { en: 'Edge Webhook Gateway', id: 'Gateway Webhook Edge' },
        description: { en: 'Lightweight Node.js service dedicated purely to validation and enqueuing', id: 'Layanan Node.js ringan khusus untuk validasi dan enqueueing' },
        tools: ['Node.js', 'TypeScript', 'Express.js'],
      },
      {
        id: 'redis-broker',
        type: 'data',
        label: { en: 'Redis Memory Broker', id: 'Memory Broker Redis' },
        description: { en: 'In-memory data store managing BullMQ queues and worker heartbeats', id: 'Penyimpanan in-memory mengelola antrean job dan heartbeat worker' },
        tools: ['Redis'],
      },
      {
        id: 'postgres-audit',
        type: 'data',
        label: { en: 'PostgreSQL Event Store', id: 'Penyimpanan Event PostgreSQL' },
        description: { en: 'Permanent event log preserving verified transactions and dead-letter records', id: 'Log transaksi permanen menyimpan event terverifikasi dan rekaman DLQ' },
        tools: ['PostgreSQL'],
      },
      {
        id: 'docker-env',
        type: 'service',
        label: { en: 'Dockerized Infrastructure', id: 'Infrastruktur Kontainer Docker' },
        description: { en: 'Isolated multi-container environment configured via Docker Compose', id: 'Lingkungan multi-kontainer terisolasi dengan Docker Compose' },
        tools: ['Docker'],
      },
    ],
    edges: [
      { from: 'gateway-node', to: 'redis-broker', label: { en: 'BullMQ Push', id: 'BullMQ Push' } },
      { from: 'redis-broker', to: 'postgres-audit', label: { en: 'Persist Event', id: 'Simpan Event' } },
      { from: 'gateway-node', to: 'docker-env', label: { en: 'Compose', id: 'Compose' } },
    ],
  },
  results: [
    {
      value: '>2,000 req/s',
      label: { en: 'Sustained throughput benchmark without dropping incoming payloads', id: 'Throughput teruji stabil tanpa kehilangan payload yang masuk' },
      evidence: 'measured',
    },
    {
      value: '<20ms Response',
      label: { en: 'Edge acknowledgement latency preventing sender-side timeout retries', id: 'Latensi respons cepat mencegah timeout pada sistem pengirim' },
      evidence: 'measured',
    },
    {
      value: 'Zero Event Loss',
      label: { en: 'At-least-once processing guarantee backed by Dead Letter Queues', id: 'Jaminan pemrosesan at-least-once ditopang Dead Letter Queue' },
      evidence: 'qualitative',
    },
  ],
  showcase: [],
  techStack: [
    { group: 'Core', items: ['Node.js', 'TypeScript', 'Express.js'] },
    { group: 'Queue & Storage', items: ['Redis', 'BullMQ', 'PostgreSQL'] },
    { group: 'DevOps & Security', items: ['Docker', 'HMAC SHA-256'] },
  ],
  reflection: {
    en: 'PulseFlow taught me the power of asynchronous decoupling in system architecture. Treating every incoming network payload as potentially hostile or prone to bursting completely changes how you design for reliability.',
    id: 'PulseFlow mengajarkan kekuatan arsitektur decoupled berbasis asinkron. Memperlakukan setiap payload jaringan yang masuk sebagai lonjakan potensial mengubah total cara kita merancang keandalan sistem.',
  },
  featured: false,
}

export default pulseflowWebhookCaseStudy
