import type { IconType } from 'react-icons'
import {
  TbDeviceDesktop,
  TbDeviceMobile,
  TbLayoutDashboard,
  TbSparkles,
  TbWorld,
} from 'react-icons/tb'

export type ProjectCategory = 'Web-App' | 'Mobile App'

export type ProjectItem = {
  slug: string
  route: string
  title: string
  category: ProjectCategory
  context: string
  description: string
  stack: string[]
  accent: string
  Icon: IconType
  /** Cover/thumbnail — the list-row preview and the detail hero banner. One image. */
  thumbnail?: string
  /**
   * Up to 3 showcase images for the detail page — these are *different*
   * pictures from the thumbnail. Empty slots render a "no image" placeholder.
   */
  showcase?: string[]
  keyPoints: string[]
  finalOutput: string
  resultHighlights?: string[]
  /** External website URL; the visit link only appears when this is set */
  website?: string
}

export const tabs: Array<{ label: ProjectCategory; Icon: IconType }> = [
  { label: 'Web-App', Icon: TbDeviceDesktop },
  { label: 'Mobile App', Icon: TbDeviceMobile },
]

export const projects: ProjectItem[] = [
    {
    slug: 'inotrive',
    route: '/project/inotrive',
    title: 'Inotrive',
    category: 'Web-App',
    context: 'Personal Product / AI Content Scripting Intelligence',
    description:
      'An AI-based creative platform that helps TikTok creators, personal brands, and MSMEs turn early content ideas into structured, ready-to-execute content concepts, solving the friction of the early content creation process.',
    stack: ['AI', 'Product', 'Content Strategy'],
    accent: '#63d848',
    Icon: TbSparkles,
    thumbnail: '/Projects/Inotrive.png',
    website: 'https://inotrive.com',
    keyPoints: [
      'Turns early content ideas into structured, ready-to-execute concepts for creators, personal brands, and MSMEs.',
      'Guides content angle discovery, hook structuring, and problem–solution framing.',
      'Generates section-based scripts and prepares visual cues for production.',
      'Produces supporting elements such as captions, hashtags, and sound references.',
    ],
    resultHighlights: [
      'Structured content concepts',
      'Faster ideation for creators',
      'AI-assisted scripting & assets',
    ],
    finalOutput:
      'Building Inotrive pushed me to treat AI as a practical product layer — reducing the friction creators feel at the very start of the content process, not just automating the output.',
  },
  {
    slug: 'yayzi',
    route: '/project/yayzi',
    title: 'Yayzi',
    category: 'Web-App',
    context: 'Personal Product / Idea Validation Platform',
    description:
      'A privacy-first, temporary idea validation platform where creators upload a product concept and collect quick Yay/Nay feedback from real people — no accounts, no long surveys, no permanent data.',
    stack: ['NextJS', 'Vercel', 'Supabase'],
    accent: '#f0a860',
    Icon: TbWorld,
    thumbnail: '/Projects/Yayzi.png',
    website: 'https://yayzi.vercel.app',
    keyPoints: [
      'Built a no-login validation flow: creators upload an idea, get a shareable link, and voters respond in seconds.',
      'Implemented auto-expiring sessions (1–10 days) after which all data and images are permanently deleted.',
      'Added privacy safeguards: hashed voter phone numbers to block duplicate votes, and PIN-protected (hashed, never plaintext) results dashboards for creators.',
      'Integrated Cloudflare Turnstile for anti-spam and brute-force protection without disruptive CAPTCHAs.',
      'Designed structured feedback beyond simple likes — Yay/Nay votes with reasons and purchase intent signals.',
    ],
    resultHighlights: [
      'Live on Vercel',
      'No sign-up required',
      'Auto-expiring, privacy-first data',
    ],
    finalOutput:
      'Yayzi was built to answer one question fast — do people actually want this? — and shipping it live turned that question into a real, usable tool instead of another idea stuck in planning.',
  },
  {
    slug: 'watch-site',
    route: '/project/watch-site',
    title: 'WatchSite',
    category: 'Web-App',
    context: 'Personal Learning Project / Movie Discovery App',
    description:
      'A self-driven learning project for exploring movies — browsing titles, watching trailers, and reading synopses, powered by The Movie Database (TMDB) API.',
    stack: ['NextJS', 'Vercel', 'TMDB API'],
    accent: '#c060f0',
    Icon: TbWorld,
    thumbnail: '/Projects/WatchSite.webp',
    website: 'https://watch-site.vercel.app',
    keyPoints: [
      'Integrated the TMDB API to fetch and display movie data, trailers, and synopses in real time.',
      'Built a browsing experience for discovering both classic and latest movie releases.',
      'Used this project as a hands-on way to learn API integration and data fetching patterns.',
      'Deployed on Vercel for quick iteration and easy sharing.',
    ],
    resultHighlights: [
      'Live on Vercel',
      'TMDB API integration',
      'Movie browsing & trailers',
    ],
    finalOutput:
      'WatchSite was built purely as a learning exercise — working with a real-world API like TMDB taught more about handling external data than any tutorial could, and turned theory into a working, browsable app.',
  },
  {
  slug: 'paja-barbershop',
  route: '/project/paja-barbershop',
  title: 'Paja Barbershop',
  category: 'Web-App',
  context: 'Client Project / Team of 4 (Project Manager)',
  description:
    'A full booking and management ecosystem for Paja Barbershop, covering a public-facing website for customers and a dedicated backoffice application for staff — built with a 4-person team where I served as Project Manager.',
  stack: ['NextJS', 'React', 'Express', 'TailwindCSS', 'Vercel'],
  accent: '#f0a860',
  Icon: TbWorld,
  thumbnail: '/Projects/PajaBarbershop.png',
  website: 'https://pajabarbershop.com',
  keyPoints: [
    'Led project planning and team coordination across a 4-person team, from feature scoping to delivery.',
    'Acted as the main point of contact with the client, translating business needs into actionable technical requirements.',
    'Delivered a customer-facing website (NextJS) with online booking/reservation, service & pricing catalog, and barber profiles with gallery.',
    'Delivered a separate backoffice application (Express + React + TailwindCSS) for staff to manage bookings, services, and promotions.',
    'Built an integrated promo system to support the client\'s marketing and customer retention efforts.',
  ],
  resultHighlights: [
    'Live client website',
    'Online booking system',
    'Dedicated backoffice app',
    'Integrated promo system',
  ],
  finalOutput:
    'Paja Barbershop was a real client engagement that pushed beyond solo development — managing a 4-person team while balancing client communication taught how to translate business needs into a coordinated technical delivery, spanning both a customer-facing site and an internal backoffice system.',
  },
  {
    slug: 'watch-site',
    route: '/project/watch-site',
    title: 'WatchSite',
    category: 'Web-App',
    context: 'Personal Learning Project / Movie Discovery App',
    description:
      'A self-driven learning project for exploring movies — browsing titles, watching trailers, and reading synopses, powered by The Movie Database (TMDB) API.',
    stack: ['NextJS', 'Vercel', 'TMDB API'],
    accent: '#c060f0',
    Icon: TbWorld,
    thumbnail: '/Projects/WatchSite.webp',
    website: 'https://watch-site.vercel.app',
    keyPoints: [
      'Integrated the TMDB API to fetch and display movie data, trailers, and synopses in real time.',
      'Built a browsing experience for discovering both classic and latest movie releases.',
      'Used this project as a hands-on way to learn API integration and data fetching patterns.',
      'Deployed on Vercel for quick iteration and easy sharing.',
    ],
    resultHighlights: [
      'Live on Vercel',
      'TMDB API integration',
      'Movie browsing & trailers',
    ],
    finalOutput:
      'WatchSite was built purely as a learning exercise — working with a real-world API like TMDB taught more about handling external data than any tutorial could, and turned theory into a working, browsable app.',
  },
  {
    slug: 'procurement-ecosystem-mapping',
    route: '/project/procurement-ecosystem-mapping',
    title: 'Procurement Ecosystem Mapping',
    category: 'Web-App',
    context: 'PT Bank Mandiri / Enterprise workflow',
    description:
      'Mapped procurement applications, integration flow, user pain points, and improvement options for strategic procurement systems.',
    stack: ['System Mapping', 'TELOS', 'User Feedback'],
    accent: '#70aaff',
    Icon: TbLayoutDashboard,
    thumbnail: '/Projects/mandiri-1.png',
    showcase: [
      '/Projects/mandiri-2.png',
      '/Projects/mandiri-3.png',
    ],
    keyPoints: [
      'Mapped procurement application ecosystem and related workflow.',
      'Identified user pain points and process inefficiencies.',
      'Created visual references for procurement system flow.',
      'Prepared improvement insights based on system and user context.',
    ],
    resultHighlights: [
      'Procurement ecosystem map',
      'Pain point summary',
      'Improvement opportunity notes',
    ],
    finalOutput:
      'Through this project, I learned how to connect product thinking with enterprise system analysis. A good system improvement starts from understanding how users work, where the process breaks, and what business value the improvement should create.',
  },
  {
    slug: 'edulocal',
    route: '/project/edulocal',
    title: 'EduLocal',
    category: 'Mobile App',
    context: 'College Group Assignments / Course Discovery',
    description:
      'A mobile app that helps users discover English and Mathematics courses around Bandung, with detailed pricing, class options, syllabus, and categories — plus a location-based feature that surfaces the nearest course providers first.',
    stack: ['Mobile', 'Location-based', 'UX'],
    accent: '#70aaff',
    Icon: TbDeviceMobile,
    keyPoints: [
      'Helps users discover English and Mathematics courses around Bandung.',
      'Presents detailed course information: pricing, class options, syllabus, and categories.',
      'Location-based feature highlights the nearest course providers from the main menu.',
      'Improves accessibility to relevant local learning options.',
    ],
    resultHighlights: [
      'Location-first discovery',
      'Detailed course information',
      'Better local learning access',
    ],
    finalOutput:
      'EduLocal taught me how much location context shapes a good discovery experience — the right information matters, but surfacing what is nearby first is what makes it genuinely useful.',
  },
]