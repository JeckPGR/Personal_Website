import { motion } from 'framer-motion'
import type { IconType } from 'react-icons'
import {
  TbArrowRight,
  TbBriefcase,
  TbCertificate,
  TbFolder,
} from 'react-icons/tb'
import { Link } from 'react-router-dom'
import {
  aboutHighlights,
  aboutItem,
  aboutTechStack,
  aboutTools,
  certificationItems,
  workItems,
} from '../data/portfolio'

type ShowcaseItem = {
  title: string
  meta: string
  description: string
  route: string
  accent: string
  Icon: IconType
}

type ShowcaseSectionProps = {
  eyebrow: string
  title: string
  href: string
  Icon: IconType
  items: ShowcaseItem[]
}

type SkillSectionProps = {
  title: string
  items: Array<{
    name: string
    category: string
    Icon: IconType
  }>
}

const topWorks: ShowcaseItem[] = workItems.slice(0, 3).map((item) => ({
  title: item.title,
  meta: `${item.tag} / ${item.period}`,
  description: item.description,
  route: item.route,
  accent:
    item.slug === 'bank-mandiri'
      ? '#70aaff'
      : item.slug === 'telkom-property'
        ? '#e090c8'
        : '#60d9aa',
  Icon: item.Icon,
}))

const topProjects: ShowcaseItem[] = [
  {
    title: 'Procurement Ecosystem Mapping',
    meta: 'Enterprise workflow / PT Bank Mandiri',
    description:
      'Mapped procurement-related applications, integrations, and improvement opportunities for a strategic procurement ecosystem.',
    route: '/work/bank-mandiri',
    accent: '#70aaff',
    Icon: TbFolder,
  },
  {
    title: 'Internal Staff Management Platform',
    meta: 'Full stack platform / CAATIS F&B Group',
    description:
      'Built a centralized staff scheduling and payroll platform for multiple F&B outlets to reduce manual administration.',
    route: '/work/caatis',
    accent: '#60d9aa',
    Icon: TbFolder,
  },
  {
    title: 'IT Project Delivery Backlog',
    meta: 'Project management / Telkom Property',
    description:
      'Managed product documentation, backlog tracking, testing coordination, and delivery readiness across a technology team.',
    route: '/work/telkom-property',
    accent: '#e090c8',
    Icon: TbFolder,
  },
]

const topCertifications: ShowcaseItem[] = certificationItems
  .slice(0, 3)
  .map((item, index) => ({
    title: item.title,
    meta: `${item.issuer} / ${item.period}`,
    description: item.description,
    route: '/certification',
    accent: index === 0 ? '#c9bfff' : index === 1 ? '#70aaff' : '#c060f0',
    Icon: item.Icon,
  }))

function About() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.3 }}
      className="min-w-0"
    >
      <section className="relative mt-5 overflow-hidden rounded-[20px] border border-[rgba(201,191,255,0.12)] bg-[rgba(255,255,255,0.018)] px-5 py-7 md:px-8 md:py-10 lg:px-10">
        <div className="pointer-events-none absolute inset-0 opacity-25 bg-[radial-gradient(rgba(160,130,255,0.38)_1.2px,transparent_1.2px)] bg-size-[20px_20px]" />
        <div className="pointer-events-none absolute -right-10 top-8 font-heading text-[6rem] font-bold leading-none text-accent-lavender/[0.035] md:text-[10rem] lg:text-[15rem]">
          ABOUT
        </div>
        <div className="pointer-events-none absolute bottom-8 left-7.5 top-8 z-0 md:left-[18%]">
          <div className="h-full w-px bg-[linear-gradient(180deg,transparent,rgba(124,80,224,0.62)_10%,rgba(201,191,255,0.18)_88%,transparent)]" />
        </div>

        <div className="relative z-10 ml-10 max-w-3xl md:ml-[21%]">
          <span className="inline-flex rounded-full border border-border-accent bg-[rgba(120,80,220,0.12)] px-3 py-1 text-[10px] font-medium text-accent-lavender">
            About /&gt;
          </span>
          <h1 className="mt-4 max-w-3xl font-heading text-3xl font-bold leading-tight text-text-primary md:text-4xl lg:text-5xl">
            Product-minded builder with a practical engineering core.
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-text-secondary">
            {aboutItem.description}
          </p>
          {aboutItem.chips?.length ? (
            <div className="mt-5 flex flex-wrap gap-2">
              {aboutItem.chips.map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-[rgba(201,191,255,0.12)] bg-[rgba(255,255,255,0.026)] px-3 py-1 text-[11px] text-text-secondary"
                >
                  {chip}
                </span>
              ))}
            </div>
          ) : null}
        </div>

        <div className="relative z-10 ml-10 mt-10 grid gap-5 md:ml-[21%] md:grid-cols-3 lg:gap-3">
          {aboutHighlights.map(({ title, text, Icon }) => (
            <article
              key={title}
              className="rounded-[18px] border border-[rgba(201,191,255,0.1)] bg-[rgba(255,255,255,0.026)] p-4 backdrop-blur-sm"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[rgba(120,80,220,0.14)] text-accent-lavender">
                <Icon size={18} />
              </div>
              <h2 className="mt-4 font-heading text-sm font-semibold text-text-primary">
                {title}
              </h2>
              <p className="mt-2 text-xs leading-5 text-text-muted">{text}</p>
            </article>
          ))}
        </div>

        <div className="relative z-10 mt-10 grid gap-5 lg:grid-cols-2 lg:gap-4">
          <SkillSection title="Tech Stack" items={aboutTechStack} />
          <SkillSection title="Tools" items={aboutTools} />
        </div>

        <div className="relative z-10 mt-10 grid gap-5 lg:grid-cols-3 lg:gap-4">
          <ShowcaseSection
            eyebrow="Experience"
            title="Work Experience"
            href="/work"
            Icon={TbBriefcase}
            items={topWorks}
          />
          <ShowcaseSection
            eyebrow="Projects"
            title="My Projects"
            href="/project"
            Icon={TbFolder}
            items={topProjects}
          />
          <ShowcaseSection
            eyebrow="Learning"
            title="My Certification"
            href="/certification"
            Icon={TbCertificate}
            items={topCertifications}
          />
        </div>
      </section>
    </motion.div>
  )
}

function SkillSection({ title, items }: SkillSectionProps) {
  return (
    <section className="min-w-0 rounded-[18px] border border-[rgba(201,191,255,0.1)] bg-[rgba(255,255,255,0.022)] p-4 shadow-[0_18px_45px_rgba(0,0,0,0.16)] backdrop-blur-sm">
      <h2 className="font-heading text-xl font-bold text-text-primary">
        {title}
      </h2>
      <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-4">
        {items.map(({ name, category, Icon }) => (
          <div
            key={name}
            className="flex min-w-0 items-center gap-2 rounded-[14px] border border-[rgba(201,191,255,0.1)] bg-[rgba(255,255,255,0.026)] p-2.5"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[rgba(120,80,220,0.14)] text-accent-lavender">
              <Icon size={18} />
            </div>
            <div className="min-w-0">
              <p className="truncate font-heading text-xs font-semibold text-text-primary">
                {name}
              </p>
              <p className="mt-0.5 truncate text-[10px] text-text-muted">
                {category}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function ShowcaseSection({
  eyebrow,
  title,
  href,
  Icon,
  items,
}: ShowcaseSectionProps) {
  return (
    <section className="min-w-0 rounded-[18px] border border-[rgba(201,191,255,0.1)] bg-[rgba(255,255,255,0.022)] p-4 shadow-[0_18px_45px_rgba(0,0,0,0.16)] backdrop-blur-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-accent-lavender/60">
            {eyebrow}
          </p>
          <h2 className="mt-2 font-heading text-xl font-bold text-text-primary">
            {title}
          </h2>
        </div>
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-[rgba(201,191,255,0.12)] bg-surface-hover text-accent-lavender">
          <Icon size={18} />
        </div>
      </div>

      <div className="mt-5 grid gap-5 lg:gap-3">
        {items.map((item, index) => {
          const ItemIcon = item.Icon

          return (
            <Link
              key={`${item.title}-${index}`}
              to={item.route}
              className="group relative overflow-hidden rounded-[16px] border border-[rgba(201,191,255,0.1)] bg-[rgba(255,255,255,0.026)] p-3 transition duration-300 hover:-translate-y-1 hover:border-[rgba(201,191,255,0.28)] hover:bg-[rgba(255,255,255,0.045)]"
            >
              <span
                className="absolute inset-x-0 top-0 h-px"
                style={{
                  background: `linear-gradient(90deg, ${item.accent}, rgba(201,191,255,0.14), transparent)`,
                }}
              />
              <div className="flex min-w-0 gap-3">
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[rgba(201,191,255,0.1)] bg-[rgba(255,255,255,0.035)]"
                  style={{ color: item.accent }}
                >
                  <ItemIcon size={17} />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] uppercase tracking-[0.12em] text-text-muted">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <h3 className="mt-1 wrap-break-word font-heading text-sm font-semibold leading-tight text-text-primary transition group-hover:text-accent-lavender">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-[11px] leading-4 text-text-muted">
                    {item.meta}
                  </p>
                </div>
              </div>
              <p className="mt-3 line-clamp-3 text-xs leading-5 text-text-secondary">
                {item.description}
              </p>
            </Link>
          )
        })}
      </div>

      <Link
        to={href}
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[rgba(201,191,255,0.12)] bg-[rgba(124,80,224,0.16)] px-4 py-2.5 text-xs font-semibold text-accent-lavender transition duration-200 hover:border-[rgba(201,191,255,0.26)] hover:bg-[rgba(124,80,224,0.24)]"
      >
        Lihat semua
        <TbArrowRight size={15} />
      </Link>
    </section>
  )
}

export default About
