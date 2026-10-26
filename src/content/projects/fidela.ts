import type { CaseStudy } from '../schema.ts'

export const fidelaCaseStudy: CaseStudy = {
  slug: 'fidela',
  kind: 'project',
  category: 'web-app',
  title: {
    en: 'Fidela',
    id: 'Fidela',
  },
  subtitle: {
    en: 'Personal Product',
    id: 'Produk Pribadi',
  },
  tagline: {
    en: 'Expensive physical model photoshoot overhead → AI Virtual Photo Studio generating e-commerce catalog models in 30 seconds',
    id: 'Biaya sewa studio dan model fisik yang mahal → Studio foto virtual AI pengubah foto pakaian biasa menjadi model katalog profesional dalam 30 detik',
  },
  metaLabel: {
    en: 'AI VIRTUAL PHOTO STUDIO',
    id: 'STUDIO FOTO AI VIRTUAL',
  },
  thumbnail: '/Projects/Fidela.svg',
  status: 'live',
  period: {
    start: '2024-10',
    end: 'present',
  },
  org: {
    name: 'Fidela',
    role: 'Full Stack Engineer & AI Architect',
    domain: 'AI E-Commerce & Virtual Fashion Photography',
  },
  link: {
    label: 'Visit fidela',
    url: 'https://fidela.asia',
  },
  scope: {
    type: 'lead',
    summary: {
      en: 'I engineered the web platform, multi-feature AI creative suite, virtual model fitting pipeline, and high-throughput rendering workflow.',
      id: 'Saya merancang platform web, rangkaian fitur kreatif AI, alur fitting model virtual, dan workflow rendering berkecepatan tinggi.',
    },
  },
  businessProblem: {
    en: 'Fashion and e-commerce sellers on Shopee, TikTok Shop, and Tokopedia face prohibitive operational expenses renting photography studios, hiring models, and managing manual post-production. Producing lookbooks often costs millions of rupiah per batch and takes weeks, creating huge delays for new product launches.',
    id: 'Penjual busana dan e-commerce di Shopee, TikTok Shop, dan Tokopedia menghadapi biaya operasional tinggi untuk sewa studio foto, fotografer, dan model profesional. Pembuatan katalog lookbook seringkali menelan biaya jutaan rupiah per sesi dan memakan waktu berminggu-minggu, memperlambat peluncuran produk baru.',
  },
  solutionFit: {
    en: 'Fidela provides an instant AI photo studio and comprehensive e-commerce creative suite tailored specifically for Indonesian fashion retailers. Merchants login to a centralized hub offering four core capabilities: an AI Photo Studio synthesizing realistic human models from hanger photos in 30 seconds, AI Product Description copywriting for marketplace SEO, a Campaign Maker for promotional assets, and an Image Eraser & Aspect Ratio tool optimizing outputs for 1:1, 3:4, and 9:16 platforms.',
    id: 'Fidela menghadirkan studio foto AI instan dan rangkaian fitur kreatif e-commerce terpadu bagi penjual fashion di Indonesia. Penjual masuk ke hub terpusat dengan empat fitur utama: AI Photo Studio yang menghasilkan model manusia realistis dari foto gantungan baju dalam 30 detik, AI Product Description untuk copywriting SEO marketplace, Campaign Maker untuk materi promo, serta Image Eraser & Aspect Ratio untuk optimasi format 1:1, 3:4, dan 9:16.',
  },
  system: {
    direction: 'auto',
    nodes: [
      {
        id: 'merchant',
        type: 'actor',
        lane: 0,
        label: { en: 'Merchant Login', id: 'Login Penjual' },
        description: { en: 'Authenticates into Fidela workspace to access the e-commerce creative suite', id: 'Masuk ke ruang kerja Fidela untuk mengakses rangkaian fitur kreatif' },
      },
      {
        id: 'feature-hub',
        type: 'step',
        lane: 1,
        label: { en: 'E-Commerce Creative Hub', id: 'Hub Kreatif E-Commerce' },
        description: { en: 'Centralized workspace directing merchant workflow across specialized production tools', id: 'Workspace terpusat yang mengarahkan alur kerja penjual ke berbagai alat produksi' },
      },
      {
        id: 'photo-studio',
        type: 'ai',
        lane: 2,
        label: { en: 'AI Photo Studio', id: 'Studio Foto AI' },
        description: { en: 'Renders natural garment fitting across virtual models with studio-grade lighting in ~30s', id: 'Merender fitting pakaian alami pada model virtual dengan pencahayaan studio dalam ~30 detik' },
      },
      {
        id: 'product-desc',
        type: 'ai',
        lane: 2,
        label: { en: 'AI Product Description', id: 'Deskripsi Produk AI' },
        description: { en: 'Generates SEO-optimized catalog copy, selling points, and specifications for marketplaces', id: 'Membuat deskripsi katalog teroptimasi SEO, poin penjualan, dan spesifikasi marketplace' },
      },
      {
        id: 'campaign-maker',
        type: 'step',
        lane: 3,
        label: { en: 'Campaign Maker', id: 'Campaign Maker' },
        description: { en: 'Assembles seasonal campaign visuals, promotional angles, and launch copy', id: 'Menyusun materi visual kampanye musiman, angle promosi, dan copy peluncuran produk' },
      },
      {
        id: 'image-tools',
        type: 'step',
        lane: 3,
        label: { en: 'Image Eraser & Aspect Ratio', id: 'Penghapus Objek & Rasio Foto' },
        description: { en: 'Magic brush eraser for unwanted objects and multi-ratio exports (1:1, 3:4, 9:16)', id: 'Magic eraser untuk menghapus objek yang tidak diinginkan dan ekspor multi-rasio (1:1, 3:4, 9:16)' },
      },
    ],
    edges: [
      { from: 'merchant', to: 'feature-hub', label: { en: 'Open workspace', id: 'Buka workspace' } },
      { from: 'feature-hub', to: 'photo-studio', label: { en: 'Model fitting flow', id: 'Alur fitting model' } },
      { from: 'feature-hub', to: 'product-desc', label: { en: 'SEO copywriting', id: 'Copywriting SEO' } },
      { from: 'photo-studio', to: 'campaign-maker', label: { en: 'Campaign visuals', id: 'Visual kampanye' } },
      { from: 'product-desc', to: 'image-tools', label: { en: 'Multi-ratio export', id: 'Ekspor multi-rasio' } },
    ],
  },
  // Technical Architecture is strictly confidential (omitted)
  results: [
    {
      value: '~30 Seconds',
      label: { en: 'Average turnaround from raw hanger photo to studio-grade lookbook', id: 'Waktu rata-rata dari foto pakaian mentah hingga katalog siap rilis' },
      evidence: 'measured',
      note: { en: 'Measured across production rendering queue benchmarks', id: 'Diukur pada benchmark antrean rendering produksi' },
    },
    {
      value: 'Up to 90%',
      label: { en: 'Estimated production cost savings compared to physical photoshoot hire', id: 'Estimasi penghematan biaya dibanding sewa fotografer dan model fisik' },
      evidence: 'estimated',
      note: { en: 'Calculated against standard studio and model rental rates per 20-garment batch', id: 'Dihitung terhadap tarif sewa studio dan model standar per 20 pakaian' },
    },
    {
      value: 'High Fidelity',
      label: { en: 'Preserves exact clothing fabric texture, pattern alignment, and color hue', id: 'Menjaga akurasi tekstur kain, motif pakaian, dan warna asli' },
      evidence: 'qualitative',
    },
  ],
  showcase: [
    {
      src: '/Projects/Fidela-Logo.webp',
      alt: { en: 'Fidela AI Studio professional virtual model output', id: 'Hasil foto model virtual profesional Fidela AI Studio' },
      caption: { en: 'High-fidelity AI generated virtual model wearing customer blazer with natural fabric draping', id: 'Hasil generasi model virtual AI mengenakan blazer dengan lipatan kain alami' },
    },
    {
      src: '/Projects/fidela-raw.webp',
      alt: { en: 'Raw input garment photograph taken on simple studio hanger', id: 'Foto pakaian mentah awal di gantungan baju' },
      caption: { en: 'Raw input photo taken with standard smartphone on a basic hanger prior to AI photoshoot', id: 'Foto pakaian input awal dari kamera HP sebelum diproses oleh studio AI' },
    },
  ],
  techStack: [
    { group: 'Frontend', items: ['Next.js', 'React', 'TypeScript', 'TailwindCSS'] },
    { group: 'Backend', items: ['NestJS', 'TypeScript'] },
    { group: 'Data & Cache', items: ['PostgreSQL', 'Redis'] },
    { group: 'Cloud & Infrastructure', items: ['Google Cloud Console', 'Dedicated GPU Cluster'] },
  ],
  reflection: {
    en: 'Building an AI product for e-commerce sellers taught me that realism alone is not enough; speed and color accuracy are non-negotiable. If the AI changes the shade of the fabric, the merchant receives customer returns. Fidelity must take precedence over pure creativity.',
    id: 'Membangun produk AI untuk pedagang e-commerce membuktikan bahwa realisme saja tidak cukup; kecepatan dan akurasi warna adalah harga mati. Jika AI sedikit saja mengubah warna kain, penjual akan menghadapi retur barang. Presisi dan keselarasan kain harus diutamakan di atas kreativitas bebas.',
  },
  featured: true,
}

export default fidelaCaseStudy
