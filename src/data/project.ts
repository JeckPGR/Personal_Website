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
  images: string[]
  keyPoints: string[]
  finalOutput: string
  resultHighlights?: string[]
  /** 1–3 proof/showcase images; when empty a branded visual panel is shown instead */
  proof?: string[]
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
      'An AI-based creative platform that helps TikTok creators, personal brands, and MSMEs turn early content ideas into structured, ready-to-execute content concepts — solving the friction of the early content creation process.',
    stack: ['AI', 'Product', 'Content Strategy'],
    accent: '#c060f0',
    Icon: TbSparkles,
    images: ['/Projects/Inotrive.png'],
    proof: ['/Projects/Inotrive.png'],
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
    context: 'Personal Product / Web Application',
    description:
      'A web application designed and deployed on Vercel, focused on delivering a clean, responsive experience with a lightweight, fast-loading interface.',
    stack: ['React', 'Vercel', 'Web'],
    accent: '#f0a860',
    Icon: TbWorld,
    images: ['/Projects/Yayzi.png'],
    proof: ['/Projects/Yayzi.png'],
    website: 'https://yayzi.vercel.app',
    keyPoints: [
      'Designed and built a responsive web interface from the ground up.',
      'Deployed and hosted the application on Vercel for fast global delivery.',
      'Focused on a clean layout, smooth interactions, and quick load times.',
      'Structured the codebase to stay simple and easy to iterate on.',
    ],
    resultHighlights: [
      'Live on Vercel',
      'Responsive interface',
      'Fast load times',
    ],
    finalOutput:
      'Yayzi was a reminder that shipping something live and usable teaches more than endless planning — deploying early kept the focus on what actually matters to users.',
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
    images: [
      '/projects/mandiri-1.png',
      '/projects/mandiri-2.png',
      '/projects/mandiri-3.png',
    ],
    proof: [
      '/projects/mandiri-1.png',
      '/projects/mandiri-2.png',
      '/projects/mandiri-3.png',
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
    images: [],
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