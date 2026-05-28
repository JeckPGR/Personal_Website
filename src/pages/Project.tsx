import { useMemo, useState } from 'react'
import type { IconType } from 'react-icons'
import {
  TbBrowser,
  TbDeviceDesktop,
  TbDeviceMobile,
  TbExternalLink,
  TbFolder,
  TbLayoutDashboard,
  TbWorldWww,
} from 'react-icons/tb'
import PageShell from '../components/PageShell'
import { workItem } from '../data/portfolio'

type ProjectCategory = 'Web-App' | 'Mobile App' | 'Landing Page'

type ProjectItem = {
  title: string
  category: ProjectCategory
  context: string
  description: string
  stack: string[]
  accent: string
  Icon: IconType
}

const tabs: Array<{ label: ProjectCategory; Icon: IconType }> = [
  { label: 'Web-App', Icon: TbDeviceDesktop },
  { label: 'Mobile App', Icon: TbDeviceMobile },
  { label: 'Landing Page', Icon: TbWorldWww },
]

const projects: ProjectItem[] = [
  {
    title: 'Procurement Ecosystem Mapping',
    category: 'Web-App',
    context: 'PT Bank Mandiri / Enterprise workflow',
    description:
      'Mapped procurement applications, integration flow, user pain points, and improvement options for strategic procurement systems.',
    stack: ['System Mapping', 'TELOS', 'User Feedback'],
    accent: '#70aaff',
    Icon: TbLayoutDashboard,
  },
  {
    title: 'Internal Staff Management Platform',
    category: 'Web-App',
    context: 'CAATIS F&B Group / Internal platform',
    description:
      'Designed and developed scheduling and payroll workflow support for multiple F&B outlets with centralized staff data.',
    stack: ['Laravel', 'API', 'Database'],
    accent: '#60d9aa',
    Icon: TbBrowser,
  },
  {
    title: 'IT Delivery Backlog Workspace',
    category: 'Web-App',
    context: 'Telkom Property / Project delivery',
    description:
      'Organized project backlog, delivery documentation, testing flow, and cross-functional coordination for IT implementation.',
    stack: ['Backlog', 'UAT', 'Documentation'],
    accent: '#e090c8',
    Icon: TbLayoutDashboard,
  },
  {
    title: 'Mobile Product Analytics Case',
    category: 'Mobile App',
    context: 'UXCam / Product learning',
    description:
      'Explored mobile product behavior, analytics signals, and user journey evaluation for product improvement decisions.',
    stack: ['Analytics', 'Journey', 'Experiment'],
    accent: '#70aaff',
    Icon: TbDeviceMobile,
  },
  {
    title: 'Portfolio Mobile Experience',
    category: 'Mobile App',
    context: 'Personal portfolio / Responsive interface',
    description:
      'Responsive portfolio experience optimized for compact screens, section order, readable cards, and mobile navigation.',
    stack: ['React', 'Tailwind', 'Responsive'],
    accent: '#c9bfff',
    Icon: TbDeviceMobile,
  },
  {
    title: 'Operational Dashboard Concept',
    category: 'Mobile App',
    context: 'Internal tools / Mobile access',
    description:
      'A compact mobile dashboard concept for checking operational status, staff activity, and recurring workflow tasks.',
    stack: ['Dashboard', 'UX Flow', 'Data'],
    accent: '#60d9aa',
    Icon: TbDeviceMobile,
  },
  {
    title: 'Product Portfolio Landing',
    category: 'Landing Page',
    context: 'Personal brand / Case showcase',
    description:
      'A focused landing structure for presenting product thinking, delivery experience, projects, certifications, and tools.',
    stack: ['React', 'Visual System', 'Content'],
    accent: '#c060f0',
    Icon: TbWorldWww,
  },
  {
    title: 'F&B Internal Tool Landing',
    category: 'Landing Page',
    context: 'CAATIS F&B Group / Platform intro',
    description:
      'Landing page concept for explaining internal staff management benefits, payroll flow, and operational efficiency.',
    stack: ['Copywriting', 'Layout', 'Benefits'],
    accent: '#60d9aa',
    Icon: TbWorldWww,
  },
  {
    title: 'Research Recommendation Brief',
    category: 'Landing Page',
    context: 'Procurement systems / Recommendation',
    description:
      'Single-page recommendation format for summarizing system options, tradeoffs, and a TELOS-based decision path.',
    stack: ['Research', 'TELOS', 'Report'],
    accent: '#70aaff',
    Icon: TbWorldWww,
  },
]

function Project() {
  const [activeTab, setActiveTab] = useState<ProjectCategory>('Web-App')
  const visibleProjects = useMemo(
    () => projects.filter((project) => project.category === activeTab),
    [activeTab],
  )

  return (
    <PageShell
      tag="Projects"
      title="Project Showcase"
      description="Selected project work grouped by platform and presentation format, from internal web applications to mobile product cases and landing page concepts."
      gradient={workItem.gradient}
      Icon={TbFolder}
    >
      <div className="flex flex-wrap gap-3 lg:gap-2">
        {tabs.map(({ label, Icon }) => {
          const isActive = activeTab === label

          return (
            <button
              key={label}
              type="button"
              onClick={() => setActiveTab(label)}
              className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-xs font-semibold transition duration-200 ${
                isActive
                  ? 'border-[rgba(201,191,255,0.24)] bg-[rgba(124,80,224,0.24)] text-accent-lavender shadow-[0_0_22px_rgba(124,80,224,0.14)]'
                  : 'border-[rgba(201,191,255,0.12)] bg-[rgba(255,255,255,0.026)] text-text-muted hover:border-[rgba(201,191,255,0.22)] hover:text-text-secondary'
              }`}
            >
              <Icon size={16} />
              {label}
            </button>
          )
        })}
      </div>

      <div className="mt-6 grid gap-5 md:gap-5 lg:grid-cols-3 lg:gap-4">
        {visibleProjects.map(
          ({ title, context, description, stack, accent, Icon }, index) => (
            <article
              key={title}
              className="relative min-w-0 overflow-hidden rounded-[18px] border border-[rgba(201,191,255,0.1)] bg-[rgba(255,255,255,0.026)] p-4 shadow-[0_18px_45px_rgba(0,0,0,0.16)] backdrop-blur-sm"
            >
              <span
                className="absolute inset-x-0 top-0 h-px"
                style={{
                  background: `linear-gradient(90deg, ${accent}, rgba(201,191,255,0.14), transparent)`,
                }}
              />
              <div className="flex items-start justify-between gap-3">
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[rgba(201,191,255,0.12)] bg-[rgba(120,80,220,0.14)]"
                  style={{ color: accent }}
                >
                  <Icon size={20} />
                </div>
                <span className="text-[10px] uppercase tracking-[0.16em] text-text-muted">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              <p className="mt-5 text-[10px] font-medium uppercase tracking-[0.18em] text-accent-lavender/60">
                {context}
              </p>
              <h2 className="mt-2 break-words font-heading text-lg font-bold leading-tight text-text-primary">
                {title}
              </h2>
              <p className="mt-4 text-sm leading-6 text-text-secondary">
                {description}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {stack.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-[rgba(201,191,255,0.12)] bg-[rgba(255,255,255,0.026)] px-3 py-1 text-[11px] text-text-secondary"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <div className="mt-5 flex items-center justify-between border-t border-[rgba(201,191,255,0.1)] pt-4 text-[11px] font-medium text-accent-lavender">
                <span>{activeTab}</span>
                <TbExternalLink size={15} />
              </div>
            </article>
          ),
        )}
      </div>
    </PageShell>
  )
}

export default Project
