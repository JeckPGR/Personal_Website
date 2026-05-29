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

export const educationHighlights = [
  {
    title: 'Telkom University',
    text: 'S1 Information Technology, GPA 3.61, 2021–2025',
    Icon: TbSchool,
  },
  {
    title: 'UXCam',
    text: 'Mobile Product Management, Sep–Oct 2025',
    Icon: TbDeviceMobile,
  },
  {
    title: 'MySkill',
    text: 'Product & Project Development Bootcamp, May–Jul 2025',
    Icon: TbCertificate,
  },
]

export const certificationItems: CertificationItem[] = [
  {
    title: 'Mobile Product Management',
    issuer: 'UXCam',
    period: 'September - October 2025',
    description:
      'Strengthened mobile product thinking across discovery, product analytics, experimentation, and user behavior evaluation.',
    Icon: TbDeviceMobile,
  },
  {
    title: 'Product & Project Development Bootcamp',
    issuer: 'MySkill',
    period: 'May - July 2025',
    description:
      'Built product and project fundamentals across discovery, planning, prioritization, delivery, and team coordination.',
    Icon: TbCertificate,
  },
  {
    title: 'S1 Information Technology',
    issuer: 'Telkom University',
    period: '2021 - 2025',
    description:
      'Formal information technology education with a GPA of 3.61, covering software, data, systems, and applied problem solving.',
    Icon: TbSchool,
  },
]

export const aboutHighlights = [
  { title: 'Product Thinking', text: 'Discovery, user context, and prioritization', Icon: TbChecklist },
  { title: 'Process Mapping', text: 'Operational flow, requirements, and feasibility', Icon: TbMap },
  { title: 'Data-Driven', text: 'Analysis, reporting, and practical decision support', Icon: TbChartBar },
]
