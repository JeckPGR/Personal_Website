import type { CaseStudy } from '../schema.ts'

export const metaLeadBotCaseStudy: CaseStudy = {
  slug: 'meta-lead-bot',
  kind: 'project',
  category: 'automation-bot',
  title: {
    en: 'Meta AI Lead & Commerce Autoresponder',
    id: 'Bot Autoresponder Leads Meta AI',
  },
  subtitle: {
    en: 'Serverless RAG Chatbot Handling 12K Traffic Spikes for Meta Messenger & Comments',
    id: 'Chatbot RAG Serverless Menangani Lonjakan 12 Ribu Pengikut di Meta Messenger & Komentar',
  },
  tagline: {
    en: 'Automating customer inquiries, product pricing, and lead capture during viral social campaigns using Hono, Supabase Vector DB, and OpenRouter',
    id: 'Otomasi respon pesan pelanggan, harga produk, dan penangkapan prospek saat kampanye viral menggunakan Hono, Supabase Vector DB, dan OpenRouter',
  },
  metaLabel: {
    en: 'Personal Project / E-Commerce AI Bot',
    id: 'Proyek Pribadi / Bot E-Commerce AI',
  },
  accent: '#0084ff',
  status: 'live',
  period: { start: '2024', end: '2024' },
  org: {
    name: 'Meta Business Commerce',
    role: 'Full-Stack & AI Automation Engineer',
  },
  scope: {
    type: 'solo',
    summary: {
      en: 'Engineered high-concurrency webhook listener, vector database embedding pipeline, FAQ semantic search, and automated Messenger response system',
      id: 'Membangun listener webhook cepat, pipeline embedding database vektor, pencarian semantik FAQ, dan sistem balasan otomatis Messenger',
    },
  },
  businessProblem: {
    en: "Originating from my mother's online retail business on Meta (Facebook & Instagram), a promotional content surge rapidly generated over 12,000 new followers within 2–3 weeks. This viral influx caused an immediate flood of incoming personal messages and product comments. With only 1 operational staff member handling customer service, the team was completely overwhelmed, leading to delayed responses and significant missed sales leads.",
    id: 'Bermula dari akun bisnis retail online milik ibu saya di Meta (Facebook & Instagram), salah satu konten promosi meledak viral dan berhasil mendatangkan lebih dari 12.000 followers dalam waktu 2–3 minggu. Lonjakan ini memicu banjir pesan langsung (DM) dan komentar seputar produk. Dengan hanya 1 orang karyawan, operasional kewalahan membalas pesan secara manual sehingga banyak calon pembeli dan prospek penjualan (leads) terlewatkan begitu saja.',
  },
  solutionFit: {
    en: 'Engineered a high-concurrency serverless autoresponder deployed on Cloudflare Workers using Hono.js. The system integrates with Meta Graph API webhooks to intercept customer messages and comments. Product catalogs, pricing tables, and common FAQs are embedded and indexed into Supabase (pgvector). When an inquiry arrives, the bot executes cosine similarity search to retrieve relevant context and prompts Mistral via OpenRouter to formulate accurate, conversational answers in real time 24/7.',
    id: 'Membangun bot autoresponder serverless berkinerja tinggi di Cloudflare Workers menggunakan Hono.js. Sistem terhubung langsung ke webhook Meta Graph API untuk menangkap pesan dan komentar calon pelanggan. Seluruh katalog produk, daftar harga, dan bank FAQ di-embedding dan disimpan ke Supabase (pgvector). Saat ada pesan masuk, bot melakukan pencarian kemiripan vektor dan mengorkestrasi model Mistral lewat OpenRouter untuk menghasilkan jawaban natural yang akurat secara real-time 24/7.',
  },
  system: {
    direction: 'auto',
    nodes: [
      {
        id: 'customer-inquiry',
        type: 'actor',
        lane: 0,
        label: { en: 'Customer Message / Comment', id: 'Pesan / Komentar Pelanggan' },
        description: {
          en: 'Inquires about product catalog, pricing, dimensions, and ordering info via Meta DM or post comments',
          id: 'Menanyakan katalog produk, harga, ukuran, dan cara pemesanan lewat DM Meta atau komentar postingan',
        },
      },
      {
        id: 'meta-webhook',
        type: 'external',
        lane: 1,
        label: { en: 'Meta Graph API Webhook', id: 'Webhook Meta Graph API' },
        description: {
          en: 'Dispatches real-time HTTPS webhook event payloads for incoming direct messages and public comments',
          id: 'Mengirimkan payload event webhook HTTPS real-time saat ada pesan langsung atau komentar masuk',
        },
      },
      {
        id: 'hono-worker',
        type: 'service',
        lane: 2,
        label: { en: 'Hono.js Edge Router', id: 'Router Edge Hono.js' },
        description: {
          en: 'Ultra-low latency serverless handler on Cloudflare Workers validating webhook signatures and managing intent',
          id: 'Handler serverless berlatensi sangat rendah di Cloudflare Workers untuk memvalidasi signature webhook dan intent',
        },
      },
      {
        id: 'vector-rag',
        type: 'data',
        lane: 3,
        label: { en: 'Supabase pgvector (RAG)', id: 'Supabase pgvector (RAG)' },
        description: {
          en: 'Cosine similarity search retrieving exact product specifications, stock status, and curated business FAQs',
          id: 'Pencarian kesamaan kosinus untuk mengambil spesifikasi produk, status stok, dan bank FAQ bisnis',
        },
      },
      {
        id: 'ai-generation',
        type: 'ai',
        lane: 3,
        label: { en: 'Mistral LLM Synthesis', id: 'Sintesis LLM Mistral' },
        description: {
          en: 'Generates warm, natural customer-facing responses grounded strictly on retrieved context via OpenRouter',
          id: 'Menghasilkan balasan percakapan ramah dan natural yang berpijak ketat pada data produk lewat OpenRouter',
        },
      },
      {
        id: 'automated-reply',
        type: 'step',
        lane: 4,
        label: { en: 'Automated 24/7 Response', id: 'Balasan Otomatis 24/7' },
        description: {
          en: 'Sends instant structured reply back to customer DM or comments, capturing actionable sales leads',
          id: 'Mengirimkan balasan instan terstruktur ke DM atau komentar, mengamankan prospek penjualan aktif',
        },
      },
    ],
    edges: [
      { from: 'customer-inquiry', to: 'meta-webhook', label: { en: 'Send inquiry', id: 'Kirim pesan' } },
      { from: 'meta-webhook', to: 'hono-worker', label: { en: 'Webhook trigger', id: 'Pemicu webhook' } },
      { from: 'hono-worker', to: 'vector-rag', label: { en: 'Cosine search', id: 'Cari kesamaan vektor' } },
      { from: 'hono-worker', to: 'ai-generation', label: { en: 'Prompt orchestration', id: 'Orkestrasi prompt' } },
      { from: 'vector-rag', to: 'automated-reply', label: { en: 'Product context', id: 'Konteks produk & harga' } },
      { from: 'ai-generation', to: 'automated-reply', label: { en: 'Natural reply', id: 'Sintesis balasan' } },
    ],
  },
  architecture: {
    direction: 'auto',
    nodes: [
      {
        id: 'meta-platform',
        type: 'external',
        lane: 0,
        label: { en: 'Meta Business Platform', id: 'Platform Bisnis Meta' },
        description: {
          en: 'Facebook Page & Instagram Direct infrastructure broadcasting real-time message and comment webhooks',
          id: 'Infrastruktur Facebook Page & Instagram Direct pengirim webhook pesan dan komentar real-time',
        },
        tools: ['Meta Graph API'],
      },
      {
        id: 'cf-worker',
        type: 'service',
        lane: 1,
        label: { en: 'Cloudflare Workers (Hono.js)', id: 'Cloudflare Workers (Hono.js)' },
        description: {
          en: 'Edge computing runtime executing lightweight Hono.js router deployed via Wrangler with sub-second execution',
          id: 'Runtime komputasi edge yang menjalankan router Hono.js dideploy via Wrangler dengan eksekusi sub-detik',
        },
        tools: ['Hono.js', 'Cloudflare Workers', 'Wrangler'],
      },
      {
        id: 'supabase-vector',
        type: 'data',
        lane: 2,
        label: { en: 'Supabase Vector Database', id: 'Database Vektor Supabase' },
        description: {
          en: 'PostgreSQL instance with pgvector storing product catalog embeddings and business FAQ documents',
          id: 'Instance PostgreSQL dengan pgvector untuk menyimpan embedding katalog produk dan dokumen FAQ bisnis',
        },
        tools: ['Supabase', 'pgvector', 'PostgreSQL'],
      },
      {
        id: 'openrouter-gateway',
        type: 'ai',
        lane: 2,
        label: { en: 'OpenRouter AI Gateway', id: 'Gateway AI OpenRouter' },
        description: {
          en: 'Unified inference gateway handling OpenAI embedding generation and Mistral text response synthesis',
          id: 'Gateway inferensi terpadu untuk pembuatan embedding OpenAI dan sintesis respon teks model Mistral',
        },
        tools: ['OpenRouter', 'Mistral-7B', 'GPT Embeddings'],
      },
    ],
    edges: [
      { from: 'meta-platform', to: 'cf-worker', label: { en: 'HTTPS Webhook', id: 'Webhook HTTPS' } },
      { from: 'cf-worker', to: 'supabase-vector', label: { en: 'Similarity Query', id: 'Kueri Kemiripan' } },
      { from: 'cf-worker', to: 'openrouter-gateway', label: { en: 'AI Orchestration', id: 'Orkestrasi AI' } },
    ],
  },
  results: [
    {
      value: '12K+ Surge',
      label: {
        en: 'Successfully handled viral traffic surge with zero dropped inquiries or missed leads',
        id: 'Berhasil menangani lonjakan traffic viral tanpa ada pertanyaan atau leads yang terlewat',
      },
      evidence: 'measured',
    },
    {
      value: '24/7 Availability',
      label: {
        en: 'Automated instant responses to customers even outside business hours and weekends',
        id: 'Respon otomatis instan ke calon pembeli bahkan di luar jam kerja dan akhir pekan',
      },
      evidence: 'qualitative',
    },
    {
      value: '<800ms',
      label: {
        en: 'Average edge worker execution and context retrieval latency across incoming webhooks',
        id: 'Rata-rata latensi eksekusi edge worker dan retrieval konteks pada webhook masuk',
      },
      evidence: 'measured',
    },
  ],
  techStack: [
    { group: 'Edge & Runtime', items: ['Hono.js', 'Cloudflare Workers', 'Wrangler'] },
    { group: 'Vector & Database', items: ['Supabase', 'pgvector', 'PostgreSQL'] },
    { group: 'AI & Embeddings', items: ['OpenRouter', 'Mistral', 'OpenAI Embeddings'] },
    { group: 'Platform Integration', items: ['Meta Graph API', 'Webhooks'] },
  ],
  reflection: {
    en: 'Real-world traffic spikes do not wait for teams to hire more staff. Deploying a lightweight serverless RAG architecture on the edge allowed a 1-person family operation to maintain the responsiveness of a 10-person customer service team without high fixed server costs.',
    id: 'Lonjakan traffic nyata tidak menunggu tim merekrut staf baru. Menerapkan arsitektur RAG serverless ringan di edge membuktikan bahwa bisnis keluarga berskala 1 orang karyawan dapat melayani pelanggan secepat tim 10 orang tanpa biaya infrastruktur yang membengkak.',
  },
  featured: false,
}

export default metaLeadBotCaseStudy
