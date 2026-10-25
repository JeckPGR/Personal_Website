import type { CaseStudy } from '../schema'

export const watchSiteCaseStudy: CaseStudy = {
  slug: 'watch-site',
  kind: 'project',
  category: 'web-app',
  title: {
    en: 'WatchSite',
    id: 'WatchSite',
  },
  subtitle: {
    en: 'Personal Product',
    id: 'Produk Pribadi',
  },
  tagline: {
    en: 'Learning real-world API data integration → Fast, serverless movie discovery platform',
    id: 'Mempelajari integrasi API nyata → Platform penelusuran film serverless yang cepat',
  },
  metaLabel: {
    en: 'MOVIE DISCOVERY APP',
    id: 'APLIKASI PENELUSURAN FILM',
  },
  thumbnail: '/Projects/WatchSite.webp',
  status: 'live',
  period: {
    start: '2024-01',
    end: '2024-03',
  },
  org: {
    name: 'Personal Learning Project',
    role: 'Frontend Developer',
    domain: 'Entertainment & Media API',
  },
  link: {
    label: 'Visit watch-site.vercel.app',
    url: 'https://watch-site.vercel.app',
  },
  scope: {
    type: 'solo',
    summary: {
      en: 'I built and deployed the full application to master external API integration, asynchronous states, and edge caching with zero auth friction.',
      id: 'Saya membangun dan mendeploy aplikasi untuk menguasai integrasi API eksternal, state asinkron, dan edge caching tanpa hambatan autentikasi.',
    },
  },
  businessProblem: {
    en: 'Learning modern web development through static mock data hides real-world challenges: handling external API rate limits, dynamic media payloads, asynchronous loading states, and edge caching for high-latency external endpoints.',
    id: 'Mempelajari pengembangan web hanya dengan data tiruan menyembunyikan tantangan dunia nyata: penanganan batas kuota API eksternal, aset media dinamis, status loading asinkron, dan caching.',
  },
  solutionFit: {
    en: 'WatchSite acts as a hands-on production playground leveraging The Movie Database (TMDB) API. Architected with a zero-friction, no-login model, visitors jump directly into discovering trending releases, debounced live search, synopsis details, and embedded trailer playback.',
    id: 'WatchSite menjadi sarana latihan langsung mengintegrasikan API The Movie Database (TMDB). Dirancang tanpa hambatan dan tanpa perlu login, pengunjung dapat langsung menemukan rilis film tren, pencarian instan tersinkronisasi, sinopsis lengkap, dan pemutaran trailer video.',
  },
  system: {
    direction: 'auto',
    nodes: [
      {
        id: 'user',
        type: 'actor',
        label: { en: 'Direct Movie Explorer (No Login)', id: 'Penelusur Film (Tanpa Login)' },
        description: { en: 'Instantly opens the app with zero sign-up or login barriers to explore cinema catalog', id: 'Langsung mengakses aplikasi tanpa hambatan pendaftaran atau login untuk menelusuri katalog film' },
      },
      {
        id: 'search-engine',
        type: 'step',
        label: { en: 'Debounced Query Dispatcher', id: 'Pencarian Terjadwal' },
        description: { en: 'Prevents redundant API calls during rapid typing', id: 'Mencegah pemanggilan API berlebih saat mengetik' },
      },
      {
        id: 'tmdb',
        type: 'external',
        label: { en: 'TMDB API Gateway', id: 'Gateway API TMDB' },
        description: { en: 'Returns trailers, synopses, cast details, and backdrop media', id: 'Mengambil sinopsis, trailer, dan daftar pemain' },
        tools: ['TMDB API'],
      },
      {
        id: 'detail-view',
        type: 'step',
        label: { en: 'Trailer & Synopsis View', id: 'Tampilan Trailer & Sinopsis' },
        description: { en: 'Interactive media player and cast metadata', id: 'Pemutar trailer interaktif dan informasi film' },
      },
    ],
    edges: [
      { from: 'user', to: 'search-engine', label: { en: 'Query input', id: 'Input judul' } },
      { from: 'search-engine', to: 'tmdb', label: { en: 'Fetch data', id: 'Ambil data' } },
      { from: 'tmdb', to: 'detail-view', label: { en: 'Stream media', id: 'Tampilkan video' } },
    ],
  },
  architecture: {
    direction: 'auto',
    nodes: [
      {
        id: 'nextjs-app',
        type: 'service',
        label: { en: 'React / Next.js Frontend', id: 'Frontend React / Next.js' },
        description: { en: 'Fast React application with optimized image rendering and zero-login client router', id: 'Aplikasi React dengan rendering gambar optimal dan alur tanpa login' },
        tools: ['React', 'Next.js'],
      },
      {
        id: 'tmdb-api',
        type: 'external',
        label: { en: 'The Movie Database (TMDB)', id: 'The Movie Database (TMDB)' },
        description: { en: 'Global movie and TV catalog service delivering streaming endpoints and media posters', id: 'Penyedia katalog film dan serial global dengan endpoint trailer dan poster' },
        tools: ['TMDB API'],
      },
      {
        id: 'vercel-edge',
        type: 'service',
        label: { en: 'Vercel Deployment', id: 'Hosting Vercel' },
        description: { en: 'Global CDN edge hosting ensuring rapid asset caching', id: 'Hosting CDN global dengan caching aset berkecepatan tinggi' },
        tools: ['Vercel'],
      },
    ],
    edges: [
      { from: 'nextjs-app', to: 'tmdb-api', label: { en: 'HTTPS REST', id: 'HTTPS REST' } },
      { from: 'nextjs-app', to: 'vercel-edge', label: { en: 'Edge Deploy', id: 'Edge Deploy' } },
    ],
  },
  results: [
    {
      value: 'Live in Production',
      label: { en: 'Continuous deployment on Vercel with responsive streaming', id: 'Deployment stabil di Vercel dengan streaming responsif' },
      evidence: 'qualitative',
    },
    {
      value: 'Zero Friction',
      label: { en: 'Instant catalog access with no registration or authentication requirement', id: 'Akses instan tanpa keharusan mendaftar atau login' },
      evidence: 'qualitative',
    },
  ],
  showcase: [
    {
      src: '/Projects/Watchsite-Src/Watchsite-1.png',
      alt: { en: 'WatchSite home hero section with featured movies', id: 'Beranda WatchSite dengan film unggulan' },
      caption: { en: 'Dynamic movie carousel powered by real-time TMDB trending feeds', id: 'Carousel film dinamis dari data tren TMDB' },
    },
    {
      src: '/Projects/Watchsite-Src/Watchsite-2.png',
      alt: { en: 'WatchSite movie catalog and filter view', id: 'Katalog film dan filter genre WatchSite' },
      caption: { en: 'Browsing interface supporting genre filtering and rating badges', id: 'Antarmuka penelusuran dengan filter kategori dan rating' },
    },
    {
      src: '/Projects/Watchsite-Src/Watchsite-3.png',
      alt: { en: 'WatchSite movie synopsis and embedded video player', id: 'Sinopsis film dan pemutar video WatchSite' },
      caption: { en: 'Detailed film overview with embedded YouTube trailer integration', id: 'Tampilan detail film dengan integrasi trailer video' },
    },
  ],
  techStack: [
    { group: 'Frontend', items: ['React', 'Next.js'] },
    { group: 'External API', items: ['TMDB API'] },
    { group: 'Deployment & Infra', items: ['Vercel Edge Network'] },
  ],
  reflection: {
    en: 'Integrating third-party services is the fastest way to turn abstract frontend theories into real-world engineering skills. It forces you to deal with unpredictable payloads, network latency, and fallback states.',
    id: 'Mengintegrasikan layanan pihak ketiga adalah cara tercepat mengubah teori frontend menjadi keahlian praktis. Anda dituntut menangani latensi jaringan dan penanganan error secara matang.',
  },
  featured: false,
}

export default watchSiteCaseStudy
