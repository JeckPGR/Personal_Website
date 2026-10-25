import type { CaseStudy } from '../schema'

export const inotriveCaseStudy: CaseStudy = {
  slug: 'inotrive',
  kind: 'project',
  category: 'web-app',
  title: {
    en: 'Inotrive',
    id: 'Inotrive',
  },
  subtitle: {
    en: 'Personal Product',
    id: 'Produk Pribadi',
  },
  tagline: {
    en: 'Early content creation friction → Structured, ready-to-execute TikTok concepts in minutes',
    id: 'Hambatan ideasi konten awal → Konsep TikTok terstruktur dan siap eksekusi dalam hitungan menit',
  },
  metaLabel: {
    en: 'AI CONTENT SCRIPTING INTELLIGENCE',
    id: 'AI CONTENT SCRIPTING INTELLIGENCE',
  },
  thumbnail: '/Projects/Inotrive.png',
  status: 'live',
  period: {
    start: '2024-06',
    end: 'present',
  },
  org: {
    name: 'Personal Product',
    role: 'Founder & Full Stack Engineer',
    domain: 'Creator Economy / AI Scripting',
  },
  link: {
    label: 'Visit inotrive.com',
    url: 'https://inotrive.com',
  },
  scope: {
    type: 'solo',
    summary: {
      en: 'As solo founder and full-stack engineer, I architected and built Inotrive end-to-end: user persona onboarding, web research scraping, multi-model LLM benchmarking across 8+ models, RAG vector retrieval, and an integrated in-house teleprompter.',
      id: 'Sebagai founder solo dan full stack engineer, saya merancang dan membangun Inotrive end-to-end: onboarding persona pengguna, scraping riset web, benchmark 8+ model LLM, retrieval vektor RAG, hingga teleprompter in-house terintegrasi.',
    },
  },
  businessProblem: {
    en: 'TikTok creators, personal brands, and MSMEs face significant friction at the earliest stage of content ideation. Turning vague ideas into compelling hooks, structured angles, and production-ready visual cues takes hours of trial and error, often causing creators to abandon drafts before production even starts.',
    id: 'Kreator TikTok, personal brand, dan UMKM kerap menghadapi hambatan besar di tahap paling awal perumusan konten. Mengubah ide mentah menjadi hook yang memikat, sudut pandang terstruktur, dan arahan visual siap produksi membutuhkan waktu berjam-jam dan sering berujung pada draf yang tidak selesai.',
  },
  solutionFit: {
    en: 'Off-the-shelf chatbots output unstructured text walls that lack short-form video pacing and visual direction. Inotrive was architected as a complete creator ideation-to-production workflow: user persona profiling, trend brainstorming with Brave Web Search, multi-input script crafting (raw ideas, brainstormed angles, or Apify web crawlers), high-fidelity generation benchmarked across 8+ LLMs (powered by Muse Spark 1.1), and an in-house teleprompter for seamless filming.',
    id: 'Chatbot umum menghasilkan teks panjang tanpa struktur yang tidak memiliki ritme video pendek maupun arahan visual. Inotrive dirancang sebagai alur lengkap dari ideasi ke produksi: pembuatan profil persona kreator, brainstorming tren dengan Brave Web Search, pembuatan naskah multi-input (ide mentah, sudut pandang brainstorming, atau crawler Apify), generasi naskah dari benchmark 8+ model LLM (ditenagai Muse Spark 1.1), serta teleprompter in-house untuk kemudahan proses syuting.',
  },
  system: {
    direction: 'auto',
    nodes: [
      {
        id: 'creator-persona',
        type: 'actor',
        label: { en: 'Onboarding & Persona', id: 'Onboarding & Persona' },
        description: { en: 'Creates creator persona, target audience profile, and brand voice', id: 'Membuat profil persona kreator, target audiens, dan karakter suara' },
      },
      {
        id: 'brainstorm-search',
        type: 'step',
        label: { en: 'Brainstorming & Search', id: 'Brainstorming & Pencarian' },
        description: { en: 'Explores ideas and viral angles using Brave Web Search and trend tools', id: 'Mencari ide dan sudut pandang viral memakai Brave Web Search dan alat riset' },
      },
      {
        id: 'script-builder',
        type: 'step',
        label: { en: 'Multi-Input Script Builder', id: 'Builder Naskah Multi-Input' },
        description: { en: 'Builds from scratch, raw ideas, brainstormed concepts, or Apify web crawler data', id: 'Menyusun naskah dari nol, ide mentah, konsep brainstorming, atau data crawler Apify' },
      },
      {
        id: 'ai-generation',
        type: 'ai',
        label: { en: 'AI Scripting (Muse Spark 1.1)', id: 'Pembuatan Naskah AI (Muse Spark 1.1)' },
        description: { en: 'Synthesizes natural short-form scripts based on extensive benchmarks across 8+ LLMs', id: 'Menghasilkan naskah video pendek natural berdasarkan benchmark mendalam dari 8+ model LLM' },
      },
      {
        id: 'script-output',
        type: 'step',
        label: { en: 'Structured Script & Cues', id: 'Naskah Terstruktur & Panduan' },
        description: { en: 'Formats second-by-second pacing, hook formulas, visual camera cues, and sound references', id: 'Memformat ritme detik per detik, formula hook, arahan visual kamera, dan referensi audio' },
      },
      {
        id: 'teleprompter',
        type: 'step',
        label: { en: 'In-House Web Teleprompter', id: 'Teleprompter Web In-House' },
        description: { en: 'Built-in auto-scrolling teleprompter for recording video directly without third-party gear', id: 'Teleprompter internal dengan auto-scroll untuk proses rekaman langsung tanpa alat tambahan' },
      },
      {
        id: 'external-editing',
        type: 'external',
        label: { en: 'Video Post-Production', id: 'Post-Production Video' },
        description: { en: 'Recorded footage is exported for final editing in CapCut or Premiere outside the app', id: 'Rekaman video dibawa ke editor eksternal (CapCut/Premiere) untuk tahap editing akhir' },
      },
    ],
    edges: [
      { from: 'creator-persona', to: 'brainstorm-search', label: { en: 'Define niche', id: 'Tentukan niche' } },
      { from: 'brainstorm-search', to: 'script-builder', label: { en: 'Ideation feed', id: 'Ide konten' } },
      { from: 'script-builder', to: 'ai-generation', label: { en: 'Raw / crawler prompt', id: 'Prompt mentah/crawler' } },
      { from: 'ai-generation', to: 'script-output', label: { en: 'Structured script', id: 'Naskah terstruktur' } },
      { from: 'script-output', to: 'teleprompter', label: { en: 'Launch teleprompter', id: 'Buka teleprompter' } },
      { from: 'teleprompter', to: 'external-editing', label: { en: 'Record & export', id: 'Rekam & edit di luar' } },
    ],
  },
  architecture: {
    direction: 'auto',
    nodes: [
      {
        id: 'frontend',
        type: 'service',
        lane: 0,
        label: { en: 'Creator Web App', id: 'Aplikasi Web Kreator' },
        description: { en: 'Responsive web interface with real-time script preview, persona setup, and teleprompter', id: 'Interface web responsif dengan preview naskah real-time, konfigurasi persona, dan teleprompter' },
        tools: ['React', 'Next.js', 'TypeScript'],
      },
      {
        id: 'backend-api',
        type: 'service',
        lane: 1,
        label: { en: 'Core API Gateway', id: 'Gateway API Utama' },
        description: { en: 'REST API orchestrating generation tasks, user quotas, and project state', id: 'REST API pengatur antrean generasi, kuota, dan state proyek' },
        tools: ['NestJS', 'TypeScript'],
      },
      {
        id: 'web-crawler',
        type: 'external',
        lane: 2,
        label: { en: 'Web Scraping & Trend Intelligence', id: 'Scraping Web & Riset Tren' },
        description: {
          en: 'Automated data extraction pipeline pairing Apify scrapers with Brave Web Search for real-time trend mining',
          id: 'Pipeline ekstraksi data otomatis memadukan scraper Apify dan Brave Web Search untuk penelusuran tren real-time',
        },
        tools: ['Apify', 'Brave Search API'],
      },
      {
        id: 'prompt-optimizer',
        type: 'service',
        lane: 2,
        label: { en: 'Internal Script Reasoning Engine', id: 'Engine Pemroses Format Naskah' },
        description: { en: 'Proprietary pipeline shaping prompt graphs and visual cue templates', id: 'Pipeline internal pengolah grafis prompt dan template visual' },
        tools: [],
      },
      {
        id: 'redis-cache',
        type: 'data',
        lane: 3,
        label: { en: 'Cache & Queue Engine', id: 'Engine Cache & Antrean' },
        description: {
          en: 'In-memory store powering user session caching, API rate limiting, and BullMQ task queues for background operations',
          id: 'Penyimpanan in-memory untuk caching sesi pengguna, pembatasan kuota (rate limiting), dan antrean tugas BullMQ',
        },
        tools: ['Redis'],
      },
      {
        id: 'openrouter-gateway',
        type: 'ai',
        lane: 3,
        label: { en: 'Multi-Model Inference Gateway', id: 'Gateway Inferensi Multi-Model' },
        description: {
          en: 'Benchmarked 8+ leading models (Muse Spark 1.1, DeepSeek, Claude, ChatGPT, Gemini, Mistral, GPT Embedding, MiniMax). Muse Spark 1.1 was selected as the optimal model producing the most natural, human-sounding script rhythm',
          id: 'Menguji 8+ model terkemuka (Muse Spark 1.1, DeepSeek, Claude, ChatGPT, Gemini, Mistral, GPT Embedding, MiniMax). Muse Spark 1.1 dipilih sebagai model paling optimal yang menghasilkan ritme naskah paling natural dan mengalir',
        },
        tools: ['OpenRouter', 'Muse Spark 1.1'],
      },
      {
        id: 'postgres-db',
        type: 'data',
        lane: 4,
        label: { en: 'Primary Relational Database', id: 'Database Relasional Utama' },
        description: { en: 'Stores creator workspaces, script history, and user settings', id: 'Menyimpan ruang kerja kreator, riwayat naskah, dan setelan' },
        tools: ['PostgreSQL'],
      },
      {
        id: 'rag-vector',
        type: 'data',
        lane: 4,
        label: { en: 'RAG Vector Store & Embeddings', id: 'Penyimpanan Vektor & Embedding RAG' },
        description: {
          en: 'Vector database and text embedding pipeline powering contextual creator assistance and intelligent chatbot retrieval',
          id: 'Database vektor dan embedding teks untuk asisten kreator kontekstual dan retrieval chatbot cerdas',
        },
        tools: ['Vector DB', 'Embeddings'],
      },
    ],
    edges: [
      { from: 'frontend', to: 'backend-api', label: { en: 'HTTPS / REST', id: 'HTTPS / REST' } },
      { from: 'backend-api', to: 'web-crawler', label: { en: 'Trigger Research', id: 'Trigger Riset' } },
      { from: 'backend-api', to: 'prompt-optimizer', label: { en: 'Orchestrate Flow', id: 'Orkestrasi Alur' } },
      { from: 'web-crawler', to: 'redis-cache', label: { en: 'Buffer Trend Data', id: 'Buffer Data Tren' } },
      { from: 'prompt-optimizer', to: 'openrouter-gateway', label: { en: 'Model Synthesis', id: 'Sintesis Model' } },
      { from: 'redis-cache', to: 'postgres-db', label: { en: 'Session & Job Sync', id: 'Sinkronisasi Sesi' } },
      { from: 'openrouter-gateway', to: 'rag-vector', label: { en: 'Context Retrieval', id: 'Retrieval Konteks' } },
    ],
  },
  results: [
    {
      value: '3 h → 15 min',
      label: { en: 'Average time from raw concept to filming-ready script', id: 'Waktu rata-rata dari konsep mentah hingga naskah siap syuting' },
      evidence: 'measured',
      note: { en: 'Measured during creator testing workflow using built-in teleprompter', id: 'Diukur pada uji alur kerja kreator dengan teleprompter internal' },
    },
    {
      value: '500+ Scripts',
      label: { en: 'Content scripts generated during creator testing', id: 'Naskah konten yang dihasilkan selama uji kreator' },
      evidence: 'estimated',
    },
    {
      value: '8+ Models Benchmarked',
      label: { en: 'Evaluated Muse Spark 1.1, DeepSeek, Claude, ChatGPT, Gemini, Mistral, GPT Embedding, MiniMax', id: 'Evaluasi mencakup Muse Spark 1.1, DeepSeek, Claude, ChatGPT, Gemini, Mistral, GPT Embedding, MiniMax' },
      evidence: 'measured',
      note: { en: 'Muse Spark 1.1 selected for most natural script phrasing', id: 'Muse Spark 1.1 dipilih karena hasil naskah paling natural' },
    },
  ],
  showcase: [
    {
      src: '/Projects/Inotrive-Src/Inotrive-1.png',
      alt: { en: 'Inotrive landing page with product positioning and value proposition', id: 'Halaman beranda Inotrive dengan proposisi nilai produk' },
      caption: { en: 'Landing page articulating the AI script intelligence value proposition for creators', id: 'Halaman beranda menjelaskan proposisi nilai AI scripting untuk kreator' },
    },
    {
      src: '/Projects/Inotrive-Src/Inotrive-2.png',
      alt: { en: 'Inotrive ideation workspace and angle discovery console', id: 'Workspace ideasi Inotrive dan konsol pencarian angle' },
      caption: { en: 'Ideation console guiding creators through angle framing and hook selection', id: 'Konsol ideasi memandu kreator melalui pembingkaian angle dan pemilihan hook' },
    },
    {
      src: '/Projects/Inotrive-Src/Inotrive-3.png',
      alt: { en: 'Inotrive section-based script editor with synchronized visual cues', id: 'Editor naskah per bagian Inotrive dengan arahan visual sinkron' },
      caption: { en: 'Structured script output with second-by-second delivery pacing and director cues', id: 'Output naskah terstruktur dengan ritme per detik dan arahan visual sutradara' },
    },
  ],
  techStack: [
    { group: 'Frontend', items: ['React', 'Next.js', 'TypeScript'] },
    { group: 'Backend', items: ['NestJS', 'TypeScript'] },
    { group: 'Data & Cache', items: ['PostgreSQL', 'Redis', 'Vector DB (RAG)'] },
    { group: 'AI & Inference', items: ['OpenRouter', 'Muse Spark 1.1', 'Claude', 'DeepSeek'] },
    { group: 'Crawling & Search', items: ['Apify', 'Brave Search API'] },
  ],
  reflection: {
    en: 'Building Inotrive made it clear that raw generative AI is only half the battle. Creators do not want an open chat box; they need a tightly structured system that understands production constraints, camera movements, and short-form pacing.',
    id: 'Membangun Inotrive memperjelas bahwa generative AI mentah hanyalah separuh solusi. Kreator tidak membutuhkan kotak obrolan terbuka; mereka membutuhkan sistem terstruktur yang memahami kendala produksi, pergerakan kamera, dan ritme video pendek.',
  },
  featured: true,
}

export default inotriveCaseStudy
