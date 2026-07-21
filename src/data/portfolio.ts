import type { IconType } from 'react-icons'
import {
  FaFigma,
  FaGithub,
  FaNodeJs,
  FaReact,
} from 'react-icons/fa'
import {
  SiBootstrap,
  SiCanva,
  SiExpress,
  SiFigma,
  SiFirebase,
  SiGithub,
  SiGoogleappsscript,
  SiGooglecolab,
  SiJira,
  SiJavascript,
  SiLaravel,
  SiMariadb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiNotion,
  SiPostgresql,
  SiPostman,
  SiReact,
  SiShadcnui,
  SiSupabase,
  SiTailwindcss,
  SiTrello,
  SiTypescript,
} from 'react-icons/si'
import {
  TbApi,
  TbBrandAzure,
  TbBrandGoogleDrive,
  TbBrandNotion,
  TbBriefcase,
  TbBuildingBank,
  TbBuildingSkyscraper,
  TbCertificate,
  TbChartBar,
  TbChartDots,
  TbChecklist,
  TbCode,
  TbDatabase,
  TbDeviceMobile,
  TbMap,
  TbMicrophone,
  TbPresentationAnalytics,
  TbReportAnalytics,
  TbRocket,
  TbSchool,
  TbSparkles,
  TbTable,
  TbTerminal2,
  TbToolsKitchen2,
  TbUser,
  TbVideo,
} from 'react-icons/tb'

export type BentoItem = {
  title: string
  subtitle: string
  route?: string 
  tag: string
  gradient: string
  coverHeight: number
  span: 1 | 2 | 3
  Icon: IconType
  description?: string
  chips?: string[]
}

export type WorkItem = {
  slug: string
  title: string
  subtitle: string
  period: string
  route: string
  tag: string
  tagClassName: string
  gradient: string
  iconClassName: string
  Icon: IconType
  description: string
  chips: string[]
}

export type RoleItem = {
  title: string
  description: string
  Icon: IconType
}

export type ToolItem = {
  name: string
  category: string
  Icon: IconType
}

export type CertificationItem = {
  title: string
  issuer: string
  period: string
  description: string
  Icon: IconType
  image?: string
}

export type ProjectDetailItem = {
  slug: string
  title: string
  eyebrow: string
  subtitle: string
  period?: string
  organization?: string
  role?: string
  route: string
  images: string[]
  keyPoints: string[]
  tools: string[]
  finalOutput: string
  resultHighlights?: string[]
  Icon: IconType
}

export const aboutItem: BentoItem = {
  title: 'About Me',
  subtitle: 'IT graduate · Digital Product Enthusiast · builder',
  route: '/about',
  tag: 'About Me',
  gradient: 'linear-gradient(135deg, #1a0a3a, #2a1060)',
  coverHeight: 90,
  span: 2,
  Icon: TbUser,
  description:
    'IT graduate working across product management, full stack development, and business analysis with a focus on practical systems, process clarity, and useful automation.',
  chips: [
    'Product Thinking',
    'User Research',
    'Process Optimization',
    'AI & Automation',
    'Agile / Scrum',
    'Data-Driven',
  ],
}

export const whatIDoItem: BentoItem = {
  title: 'What I Do',
  subtitle: 'PM · Dev · Analyst',
  route: '/what-i-do',
  tag: 'Capabilities',
  gradient: 'linear-gradient(135deg, #0d0825, #1a0a40)',
  coverHeight: 90,
  span: 1,
  Icon: TbSparkles,
}

export const workItem: BentoItem = {
  title: 'Work & Projects',
  subtitle: '3 roles · enterprise to startup',
  route: '/work',
  tag: 'Experience',
  gradient: 'linear-gradient(135deg, #0a0520, #180830)',
  coverHeight: 80,
  span: 3,
  Icon: TbBriefcase,
  description:
    'A compact view of product, business, and engineering work across enterprise teams and internal platform development.',
}

export const techStackItem: BentoItem = {
  title: 'Tech Stack & Tools',
  subtitle: 'Dev · design · productivity',
  route: '/tech-stack',
  tag: 'Toolkit',
  gradient: 'linear-gradient(135deg, #080518, #100828)',
  coverHeight: 90,
  span: 2,
  Icon: TbTerminal2,
}

export const educationItem: BentoItem = {
  title: 'Education & Certs',
  subtitle: 'Telkom University · 2 certifications',
  route: '/education',
  tag: 'Education',
  gradient: 'linear-gradient(135deg, #0f0628, #1e0845)',
  coverHeight: 90,
  span: 1,
  Icon: TbSchool,
}

export const bentoItems = [
  aboutItem,
  whatIDoItem,
  workItem,
  techStackItem,
  educationItem,
]

export const roleItems: RoleItem[] = [
  {
    title: 'Product Management',
    description: 'Roadmapping, discovery, PRD, prioritization',
    Icon: TbRocket,
  },
  {
    title: 'Web Development',
    description: 'React, Node.js, Laravel, REST APIs, VPS deployment',
    Icon: TbCode,
  },
  {
    title: 'Business Analysis',
    description: 'Process mapping, TELOS framework, reports',
    Icon: TbReportAnalytics,
  },
]

export const workItems: WorkItem[] = [
  {
    slug: 'bank-mandiri',
    title: 'PT Bank Mandiri (Persero) Tbk',
    subtitle: 'Procurement Information Systems',
    period: 'October 2025 - April 2026',
    route: '/work/bank-mandiri',
    tag: 'Research And Development',
    tagClassName: 'bg-[rgba(60,140,255,0.13)] text-[#70aaff]',
    gradient: 'linear-gradient(135deg, #0a1535, #152050)',
    iconClassName: 'text-[#70aaff]',
    Icon: TbBuildingBank,
    description:
      'Research and Development role in Procurement Information Systems at PT Bank Mandiri (Persero) Tbk.',
    chips: ['Research And Development', 'Procurement Information Systems', 'Enterprise'],
  },
  {
    slug: 'telkom-property',
    title: 'Telkom Property',
    subtitle: 'IT Project Management',
    period: 'October 2024 - February 2025',
    route: '/work/telkom-property',
    tag: 'Project Manager',
    tagClassName: 'bg-[rgba(200,80,160,0.13)] text-[#e090c8]',
    gradient: 'linear-gradient(135deg, #2a0a25, #401535)',
    iconClassName: 'text-[#e090c8]',
    Icon: TbBuildingSkyscraper,
    description: 'Project Manager role in IT Project Management at Telkom Property.',
    chips: ['IT Project Management', 'Project Manager', 'Delivery'],
  },
  {
    slug: 'caatis',
    title: 'CAATIS F&B Group',
    subtitle: 'Implementation Laboratory',
    period: 'September 2024 - January 2025',
    route: '/work/caatis',
    tag: 'Fullstack Developer',
    tagClassName: 'bg-[rgba(50,190,140,0.13)] text-[#60d9aa]',
    gradient: 'linear-gradient(135deg, #082a1a, #103d28)',
    iconClassName: 'text-[#60d9aa]',
    Icon: TbToolsKitchen2,
    description:
      'Fullstack Developer role in the Implementation Laboratory at CAATIS F&B Group.',
    chips: ['Fullstack Developer', 'Implementation Laboratory', 'Internal Platform'],
  },
]

export const techTools: ToolItem[] = [
  { name: 'ReactJS', category: 'Frontend', Icon: FaReact },
  { name: 'Node.js', category: 'Backend', Icon: FaNodeJs },
  { name: 'Database', category: 'Data', Icon: TbDatabase },
  { name: 'Figma', category: 'Design', Icon: FaFigma },
  { name: 'Notion', category: 'Productivity', Icon: TbBrandNotion },
  { name: 'API', category: 'Integration', Icon: TbApi },
  { name: 'Tableau', category: 'Analytics', Icon: TbTable },
  { name: 'GitHub', category: 'Version Control', Icon: FaGithub },
]

export const aboutTechStack: ToolItem[] = [
  { name: 'React', category: 'Frontend', Icon: SiReact },
  { name: 'Next.js', category: 'Frontend', Icon: SiNextdotjs },
  { name: 'Tailwind CSS', category: 'Styling', Icon: SiTailwindcss },
  { name: 'JavaScript', category: 'Language', Icon: SiJavascript },
  { name: 'TypeScript', category: 'Language', Icon: SiTypescript },
  { name: 'Node.js', category: 'Backend', Icon: SiNodedotjs },
  { name: 'Express', category: 'Backend', Icon: SiExpress },
  { name: 'Laravel', category: 'Backend', Icon: SiLaravel },
  { name: 'Bootstrap', category: 'Styling', Icon: SiBootstrap },
  { name: 'GAS', category: 'Automation', Icon: SiGoogleappsscript },
  { name: 'Supabase', category: 'Backend as a Service', Icon: SiSupabase },
  { name: 'PostgreSQL', category: 'Database', Icon: SiPostgresql },
  { name: 'Firebase', category: 'Backend as a Service', Icon: SiFirebase },
  { name: 'MySQL', category: 'Database', Icon: SiMysql },
]

export const aboutTools: ToolItem[] = [
  { name: 'Figma', category: 'Design', Icon: SiFigma },
  { name: 'GitHub', category: 'Version Control', Icon: SiGithub },
  { name: 'Canva', category: 'Design', Icon: SiCanva },
  { name: 'CapCut', category: 'Content Editing', Icon: TbVideo },
  { name: 'MariaDB', category: 'Database', Icon: SiMariadb },
  { name: 'Speechma', category: 'Speech Tool', Icon: TbMicrophone },
  { name: 'Google Workspace', category: 'Productivity', Icon: TbBrandGoogleDrive },
  { name: 'shadcn/ui', category: 'UI System', Icon: SiShadcnui },
  { name: 'Postman', category: 'API Testing', Icon: SiPostman },
  { name: 'Notion', category: 'Documentation', Icon: SiNotion },
  { name: 'Trello', category: 'Project Management', Icon: SiTrello },
  { name: 'Jira', category: 'Project Management', Icon: SiJira },
  { name: 'Tableau', category: 'Analytics', Icon: TbPresentationAnalytics },
  { name: 'Google Colab', category: 'Notebook', Icon: SiGooglecolab },
  { name: 'Google Trends', category: 'Market Research', Icon: TbChartDots },
  { name: 'Azure', category: 'Cloud', Icon: TbBrandAzure },
]

export const certificationItems: CertificationItem[] = [
   {
    title: 'Build an AI Agent',
    issuer: 'IBM SkillsBuild',
    period: 'July - July 2026',
    description:
      'Studying how AI applies to product management — AI fundamentals, machine learning, and NLP — to identify AI opportunities, generate product insights, and integrate AI into product strategy responsibly.',
    Icon: TbSparkles,
    image: '/Certification/IBM-3.png',
  },
   {
    title: 'Lab: Troubleshoot Your Code using Bob IDE',
    issuer: 'IBM SkillsBuild',
    period: 'July - July 2026',
    description:
      'Studying how AI applies to product management — AI fundamentals, machine learning, and NLP — to identify AI opportunities, generate product insights, and integrate AI into product strategy responsibly.',
    Icon: TbSparkles,
    image: '/Certification/IBM-2.png',
  },
   {
    title: 'Introduction to Large Language Models',
    issuer: 'IBM SkillsBuild',
    period: 'July - July 2026',
    description:
      'Studying how AI applies to product management — AI fundamentals, machine learning, and NLP — to identify AI opportunities, generate product insights, and integrate AI into product strategy responsibly.',
    Icon: TbSparkles,
    image: '/Certification/IBM-1.png',
  },
  {
    title: 'AI for Product Managers',
    issuer: 'Alison',
    period: 'June 2026 - Now',
    description:
      'Studying how AI applies to product management — AI fundamentals, machine learning, and NLP — to identify AI opportunities, generate product insights, and integrate AI into product strategy responsibly.',
    Icon: TbSparkles,
  },
  {
    title: 'PROJECT MANAGEMENT & SCRUM FRAMEWORK',
    issuer: 'MySkill',
    period: 'October - November 2025',
    description:
      'Built product and project fundamentals — product vision, discovery, user research, PRD development, and Waterfall & Agile (Scrum) delivery — through weekly product case studies.',
    Icon: TbCertificate,
    image: '/Certification/Scrum.png',
  },
  {
    title: 'Mobile Product Management',
    issuer: 'UXCam',
    period: 'September - October 2025',
    description:
      'Learned mobile product frameworks (North Star Metric, Opportunity Tree, Shape Up), user research methods, release planning, and data-driven improvement through mobile product analytics.',
    Icon: TbDeviceMobile,
    image: '/Certification/UXCam.jfif',
  },
  {
    title: 'Intensive Product & Project Development Bootcamp',
    issuer: 'MySkill',
    period: 'May - July 2025',
    description:
      'Built product and project fundamentals — product vision, discovery, user research, PRD development, and Waterfall & Agile (Scrum) delivery — through weekly product case studies.',
    Icon: TbCertificate,
    image: '/Certification/PPM.jfif',
  },
  {
    title: 'Frontend Intermediate',
    issuer: 'Dicoding',
    period: 'January 2024 - October 2027',
    description:
      'Build an web app using PHP.',
    Icon: TbCode,
    image: '/Certification/FrontEnd.jpg',
  },
  {
    title: 'Junior Web Developer',
    issuer: 'Digitalent / BNSP',
    period: 'November 2023 - November 2026',
    description:
      'Build an web app using PHP.',
    Icon: TbCode,
    image: '/Certification/Kominfo.png',
  },
  {
    title: 'Frontend - JavaScript Mastery',
    issuer: 'MySkill',
    period: 'October - December 2023',
    description:
      'Build an web app using PHP.',
    Icon: TbCode,
    image: '/Certification/Java.jpg',
  },
  {
    title: 'Java Programming',
    issuer: 'Dicoding',
    period: 'October 2023 - October 2026',
    description:
      'Build an web app using PHP.',
    Icon: TbCode,
    image: '/Certification/Java.jpg',
  },
  {
    title: 'Github Basic',
    issuer: 'Dicoding',
    period: 'September 2023 - September 2026',
    description:
      'Learned core web development with HTML, CSS, JavaScript, ReactJS, NodeJS, Git, and GitHub, building web projects across frontend, backend integration, and version control workflows.',
    Icon: TbCode,
    image: '/Certification/BasicWeb.jpg',
  },
  {
    title: 'Basic Web Programming',
    issuer: 'Dicoding',
    period: 'September 2023 - September 2026',
    description:
      'Learned core web development with HTML, CSS, JavaScript, ReactJS, NodeJS, Git, and GitHub, building web projects across frontend, backend integration, and version control workflows.',
    Icon: TbCode,
    image: '/Certification/BasicWeb.jpg',
  },
   {
    title: 'Basic SQL',
    issuer: 'Dicoding',
    period: 'September 2023 - September 2026',
    description:
      'Learned core web development with HTML, CSS, JavaScript, ReactJS, NodeJS, Git, and GitHub, building web projects across frontend, backend integration, and version control workflows.',
    Icon: TbCode,
    image: '/Certification/SQL.jpg',
  },
]

export const projectDetails: ProjectDetailItem[] = [
  {
    slug: 'procurement-ecosystem-mapping',
    title: 'Procurement Ecosystem Mapping',
    eyebrow: 'PT Bank Mandiri / Enterprise Workflow',
    subtitle:
      'Mapped procurement applications, integration flow, user pain points, and improvement options for strategic procurement systems.',
    period: '2025 - 2026',
    organization: 'PT Bank Mandiri',
    role: 'Research And Development',
    route: '/project/procurement-ecosystem-mapping',
    images: [
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
    tools: [
      'System Mapping',
      'TELOS',
      'User Feedback',
      'Documentation',
      'Workflow Analysis',
    ],
    resultHighlights: [
      'Procurement ecosystem map',
      'Pain point summary',
      'Improvement opportunity notes',
    ],
    finalOutput:
      'Through this project, I learned how to connect product thinking with enterprise system analysis. A good system improvement starts from understanding how users work, where the process breaks, and what business value the improvement should create.',
    Icon: TbMap,
  },
  {
    slug: 'internal-staff-management-platform',
    title: 'Internal Staff Management Platform',
    eyebrow: 'CAATIS F&B Group / Internal Platform',
    subtitle:
      'Designed and developed scheduling and payroll workflow support for multiple F&B outlets with centralized staff data.',
    period: '2024 - 2025',
    organization: 'CAATIS F&B Group',
    role: 'Fullstack Developer',
    route: '/project/internal-staff-management-platform',
    images: [
      '/projects/caatis-1.png',
      '/projects/caatis-2.png',
      '/projects/caatis-3.png',
    ],
    keyPoints: [
      'Designed staff data structure and operational workflow.',
      'Built scheduling and payroll-related features.',
      'Created internal dashboard for easier staff monitoring.',
      'Converted manual operational workflow into a more organized system.',
    ],
    tools: ['Laravel', 'MySQL', 'API', 'Database', 'Bootstrap', 'GitHub'],
    resultHighlights: [
      'Centralized staff data',
      'Reduced manual coordination',
      'More structured scheduling workflow',
    ],
    finalOutput:
      'This project taught me that internal tools should be simple, useful, and aligned with how the team actually works every day. A system should reduce friction, not add complexity.',
    Icon: TbDatabase,
  },
]

export const aboutHighlights = [
  { title: 'Product Thinking', text: 'Discovery, user context, and prioritization', Icon: TbChecklist },
  { title: 'Process Mapping', text: 'Operational flow, requirements, and feasibility', Icon: TbMap },
  { title: 'Data-Driven', text: 'Analysis, reporting, and practical decision support', Icon: TbChartBar },
]
