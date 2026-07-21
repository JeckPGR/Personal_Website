import type { IconType } from 'react-icons'
import {
  TbBuildingBank,
  TbBuildingSkyscraper,
  TbSchool,
  TbTable,
  TbToolsKitchen2,
} from 'react-icons/tb'

export type WorkExperience = {
  slug: string
  route: string
  company: string
  location: string
  role: string
  /** Short label used on the right side of the list row */
  tag: string
  period: string
  accent: string
  Icon: IconType
  summary: string
  bullets: string[]
  /** Short focus-area labels shown in the detail sidebar */
  tags: string[]
  /** Result / output chips shown in the detail "Key Results" section */
  highlights: string[]
  /** Closing reflection quote shown at the bottom of the detail page */
  reflection: string
  /** Cover/thumbnail — the list-row preview and the detail hero banner. One image. */
  thumbnail?: string
  /**
   * Up to 3 journey/proof images for the detail page — these are *different*
   * pictures from the thumbnail. Empty slots render a "no image" placeholder.
   */
  showcase?: string[]
  /** External website URL; the visit link only appears when this is set */
  website?: string
}

export const workExperiences: WorkExperience[] = [
  {
    slug: 'bank-mandiri',
    route: '/work/bank-mandiri',
    company: 'PT Bank Mandiri (Persero) Tbk.',
    location: 'Jakarta, Indonesia',
    role: 'Research & Development Intern - Strategic Procurement',
    tag: 'Research & Devlopment',
    period: 'October 2025 - April 2026',
    accent: '#70aaff',
    Icon: TbBuildingBank,
    thumbnail: '/Works/BankMandiri.jpg',
    summary:
      'Research and development work inside strategic procurement, mapping the application ecosystem and shaping improvement recommendations grounded in real user workflows.',
    tags: ['Research & Development', 'Procurement Systems', 'Enterprise'],
    bullets: [
      'Supported procurement applications and process improvement initiatives by analyzing business workflows, user needs, and existing system limitations.',
      'Learned three core procurement workflows by working closely with internal teams across Contract, Processing, and supporting functions.',
      'Mapped 11 procurement-related applications, including their roles and integrations, to build a comprehensive understanding of the organization’s procurement ecosystem.',
      'Collaborated with cross-functional teams (Contract, Processing, and Supporting units) to identify pain points, validate user needs, and generate feature improvement ideas based on direct user feedback.',
      'Contributed to application architecture recommendations aligned with business needs, team capabilities, existing system limitations, and long-term sustainability.',
      'Participated in the validation of 280+ bank guarantees and documented recurring issues to support process evaluation and improvement.',
      'Developed and presented an evaluation report comparing four improvement options for the bank guarantee process, with a final recommendation based on TELOS framework analysis.',
    ],
    highlights: [
      '11 procurement apps mapped',
      '280+ bank guarantees validated',
      'TELOS-based recommendation',
    ],
    reflection:
      'This role taught me that meaningful system improvement starts from understanding how people actually work, mapping the ecosystem first, then letting real pain points guide the recommendations.',
  },
  {
    slug: 'telkom-property',
    route: '/work/telkom-property',
    company: 'Telkom Property',
    location: 'Jakarta, Indonesia',
    role: 'IT Project Manager',
    tag: 'IT Project Manager',
    period: 'October 2024 - February 2025',
    accent: '#e090c8',
    Icon: TbBuildingSkyscraper,
    thumbnail: '/Works/Telkom-Prop.webp',
    summary:
      'Coordinated an IT delivery team end to end, aligning scope, backlog, and testing to keep a technology-based product on track toward release.',
    tags: ['IT Project Management', 'Project Manager', 'Delivery'],
    bullets: [
      'Managed project coordination for a technology-based product by aligning scope, requirements, timelines, risks, changes, and resource allocation.',
      'Worked closely with a cross-functional technology team of 10 members including frontend, backend, mobile developers, QA, UI/UX designers, and security specialists.',
      'Managed and tracked 50+ project backlogs using internal project management tools to ensure structured task tracking and delivery.',
      'Translated business and user requirements into clear project documentation to help the development team understand product needs and expected outcomes.',
      'Coordinated system testing, performance testing, and user acceptance testing to ensure product readiness before deployment.',
      'Supported communication between technical and non-technical stakeholders to maintain alignment throughout the product development process.',
    ],
    highlights: [
      '50+ backlogs tracked',
      'Team of 10 coordinated',
      'End-to-end delivery',
    ],
    reflection:
      'Coordinating a full delivery team showed me that clarity is the real deliverable, aligning scope, people, and testing is what keeps a product moving steadily toward release.',
  },
  {
    slug: 'informatics-lab',
    route: '/work/informatics-lab',
    company: 'Informatics Laboratory Telkom University',
    location: 'Bandung, Indonesia',
    role: 'Web Development Practicum Assistant',
    tag: 'Web Dev Lab Assistant',
    period: 'September 2024 - January 2025',
    accent: '#c9bfff',
    Icon: TbSchool,
    thumbnail: '/Works/Lab.jpg',
    summary:
      'Mentored students across web development lab classes, strengthening their grasp of core web concepts and hands-on troubleshooting.',
    tags: ['Web Development', 'Mentoring', 'Lab Assistant'],
    bullets: [
      'Assisted and mentored 90+ students across three classes in web development lab classes.',
      'Guided students on web technologies including HTML, CSS, JavaScript, PHP, Laravel, WordPress, JSON, and RESTful APIs.',
      'Supported students in troubleshooting coding issues and strengthening their understanding of core web development concepts.',
      'Helped students translate functional requirements into simple web-based solutions for their final projects.',
    ],
    highlights: [
      '90+ students mentored',
      '3 classes guided',
      'Full web stack coverage',
    ],
    reflection:
      'Mentoring dozens of students sharpened how I explain technical concepts, teaching something well turned out to be the fastest way to truly understand it myself.',
  },
  {
    slug: 'caatis',
    route: '/work/caatis',
    company: 'CAATIS FnB Group',
    location: 'Bandung, Indonesia',
    role: 'Full Stack Developer',
    tag: 'Full Stack Dev',
    period: 'September 2024 - December 2024',
    accent: '#60d9aa',
    Icon: TbToolsKitchen2,
    thumbnail: '/Works/CAATIS.png',
    summary:
      'Designed and built an internal staff management platform that centralized scheduling and payroll across multiple F&B outlets.',
    tags: ['Fullstack Developer', 'Internal Platform', 'F&B Operations'],
    bullets: [
      'Designed and developed an internal staff management web application for scheduling and payroll across 4 F&B outlets with 30+ employees.',
      'Built a centralized platform that simplified payroll processing and reduced administrative workload across four outlets.',
      'Integrated external APIs to automate payroll calculations and reduce manual errors.',
      'Contributed to deploying the application on a VPS server for production use.',
    ],
    highlights: [
      '4 outlets centralized',
      '30+ employees managed',
      'Automated payroll flow',
    ],
    reflection:
      'Building an internal tool from scratch reminded me that good software should quietly remove friction from everyday operations, not add one more thing to manage.',
  },
  {
    slug: 'jokiwithsora',
    route: '/work/jokiwithsora',
    company: 'Jokiwithsora',
    location: 'Bandung, Indonesia',
    role: 'Business Process Optimization & IT Support',
    tag: 'Business Process',
    period: 'January 2023 - January 2025',
    accent: '#c060f0',
    Icon: TbTable,
    thumbnail: '/Works/Jokiwithsora.png',
    summary:
      'Built spreadsheet-based operational systems and automations that streamlined order management and saved the team hours of manual work each week.',
    tags: ['Business Process', 'Automation', 'IT Support'],
    bullets: [
      'Developed and maintained more than nine operational spreadsheets to improve order management and data tracking efficiency.',
      'Built automated formulas and workflow systems that saved the operations team more than 12 hours of manual work per week.',
      'Analyzed repetitive operational processes and created simple automation solutions to improve productivity.',
      'Provided technical support and troubleshooting for both hardware and software issues.',
    ],
    highlights: [
      '9+ operational spreadsheets',
      '12+ hours saved weekly',
      'Repetitive work automated',
    ],
    reflection:
      'Turning repetitive manual work into simple automations proved that small, well-placed systems can free up a surprising amount of a team’s time each week.',
  },
]
