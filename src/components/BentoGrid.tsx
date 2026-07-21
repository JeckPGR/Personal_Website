import { useRef } from 'react'
import type { IconType } from 'react-icons'
import {
  TbBriefcase,
  TbCertificate,
  TbFolder,
  TbSparkles,
  TbUser,
} from 'react-icons/tb'
import { Link } from 'react-router-dom'
import meImage from '../assets/Me.png'
import { certificationItems, workItems } from '../data/portfolio'
import { AnimatedBeam } from './ui/animated-beam'

type BentoCardProps = {
  children: React.ReactNode
  className?: string
  to?: string
  showHoverHint?: boolean
}

type BentoTimelineItem = {
  title: string
  meta: string
  detail?: string
}

type BentoTimelinePanelProps = {
  eyebrow: string
  title: string
  Icon: IconType
  items: BentoTimelineItem[]
  compactWide?: boolean
}

const experiencePreviewItems: BentoTimelineItem[] = workItems
  .slice(0, 3)
  .map(({ title, subtitle, tag, period }) => ({
    title,
    meta: `${subtitle} | ${tag}`,
    detail: period,
  }))

const projectPreviewItems: BentoTimelineItem[] = [
  {
    title: 'Inotrive',
    meta: 'AI TikTok Script Intelligence | Personal Product',
    detail: 'AI-powered platform that turns raw ideas into structured TikTok scripts, hooks, and production cues.',
  },
  {
    title: 'Yayzi',
    meta: 'Temporary Room for Idea Validation | Personal Product',
    detail: 'A no-login, auto-expiring room where creators drop an idea and collect quick Yay/Nay feedback.',
  },
  {
    title: 'PajaBarbershop',
    meta: 'Booking & Backoffice System | Client Project',
    detail: 'End-to-end booking platform and staff backoffice for a barbershop chain, built with a 4-person team.',
  },
]

const certificationPreviewItems: BentoTimelineItem[] = certificationItems
  .slice(0, 3)
  .map(({ title, issuer, period }) => ({
    title,
    meta: issuer,
    detail: period,
  }))

function BentoCard({
  children,
  className = '',
  to,
  showHoverHint = true,
}: BentoCardProps) {
  const sharedClassName = `group relative min-w-0 max-w-full overflow-hidden rounded-[18px] border border-[rgba(201,191,255,0.12)] bg-[rgba(255,255,255,0.025)] shadow-[inset_0_1px_0_rgba(255,255,255,0.025)] transition duration-200 hover:border-[rgba(160,130,255,0.32)] ${className}`

  if (to) {
    return (
      <Link to={to} className={sharedClassName}>
        {children}
        {showHoverHint ? (
          <>
            <span className="pointer-events-none absolute bottom-4 right-4 z-20 inline-flex translate-y-2 items-center gap-2 rounded-full border border-[rgba(201,191,255,0.12)] bg-[rgba(12,10,24,0.72)] px-3 py-1.5 text-[10px] font-medium text-accent-lavender opacity-0 shadow-[0_10px_30px_rgba(0,0,0,0.24),0_0_22px_rgba(124,80,224,0.12)] backdrop-blur-md transition duration-300 ease-out group-hover:translate-y-0 group-hover:border-[rgba(201,191,255,0.24)] group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
              Find more
              <span className="translate-x-0 transition-transform duration-300 group-hover:translate-x-1">
                -&gt;
              </span>
            </span>
            <span className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 translate-y-8 bg-[linear-gradient(180deg,transparent,rgba(124,80,224,0.1))] opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100" />
          </>
        ) : null}
      </Link>
    )
  }

  return <article className={sharedClassName}>{children}</article>
}

function BentoTimelinePanel({
  eyebrow,
  title,
  Icon,
  items,
  compactWide = false,
}: BentoTimelinePanelProps) {
  return (
    <div className="relative z-10 flex h-full min-h-72 flex-col lg:min-h-0">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-accent-lavender/60 lg:text-[9px]">
            {eyebrow}
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold leading-tight text-text-primary md:text-4xl lg:mt-2 lg:text-[clamp(1.25rem,1.85vw,1.75rem)]">
            {title}
          </h2>
        </div>
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[rgba(201,191,255,0.12)] bg-surface-hover text-accent-lavender lg:h-10 lg:w-10">
          <Icon size={20} />
        </div>
      </div>

      <BentoTimelineList items={items} compactWide={compactWide} />
    </div>
  )
}

function BentoTimelineList({
  items,
  compactWide = false,
}: {
  items: BentoTimelineItem[]
  compactWide?: boolean
}) {
  if (compactWide) {
    return (
      <div className="relative mt-6 grid gap-5 pl-6 lg:mt-4 lg:grid-cols-3 lg:gap-3 lg:pl-0">
        <span className="absolute bottom-2 left-0 top-2 w-px bg-[linear-gradient(180deg,transparent,rgba(201,191,255,0.32),transparent)] lg:hidden" />
        {items.map(({ title, meta, detail }, index) => (
          <div key={`${title}-${index}`} className="relative min-w-0 lg:pl-5">
            <span className="absolute -left-7 top-2 h-2.5 w-2.5 rounded-full border border-[rgba(201,191,255,0.55)] bg-base shadow-[0_0_14px_rgba(201,191,255,0.35)] lg:left-0 lg:top-1.5" />
            <p className="font-heading text-sm font-semibold leading-tight text-text-primary lg:truncate lg:text-[12px] xl:text-[13px]">
              {title}
            </p>
            <p className="mt-1 text-[11px] leading-4 text-text-secondary lg:line-clamp-1 lg:text-[9.5px] xl:text-[10px]">
              {meta}
            </p>
            {detail ? (
              <p className="mt-1 text-[10px] leading-4 text-text-muted lg:line-clamp-1 lg:text-[9px] xl:text-[9.5px]">
                {detail}
              </p>
            ) : null}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="relative mt-7 flex min-h-0 flex-1 flex-col justify-between gap-6 pl-6 pb-6 lg:mt-5 lg:gap-4 lg:pb-7">
  <span className="absolute bottom-8 left-0 top-2 w-px bg-[linear-gradient(180deg,transparent,rgba(201,191,255,0.32),transparent)]" />
      {items.map(({ title, meta, detail }, index) => (
        <div key={`${title}-${index}`} className="relative min-w-0">
          <span className="absolute -left-7 top-2 h-2.5 w-2.5 rounded-full border border-[rgba(201,191,255,0.55)] bg-base shadow-[0_0_14px_rgba(201,191,255,0.35)]" />
          <p className="font-heading text-sm font-semibold leading-tight text-text-primary lg:text-[13px]">
            {title}
          </p>
          <p className="mt-1 text-[11px] leading-4 text-text-secondary lg:text-[10px]">
            {meta}
          </p>
          {detail ? (
            <p className="mt-1 text-[10px] leading-4 text-text-muted lg:text-[9.5px]">
              {detail}
            </p>
          ) : null}
        </div>
      ))}
    </div>
  )
}

function BentoGrid() {
  const heroContainerRef = useRef<HTMLDivElement>(null)
  const techNodeRef = useRef<HTMLDivElement>(null)
  const productNodeRef = useRef<HTMLDivElement>(null)

  return (
    <section className="grid min-w-0 max-w-full grid-cols-1 gap-5 md:gap-5 lg:h-full lg:min-h-190flex-1 lg:gap-3 lg:[grid-template-areas:'about_about_tagline'_'work_profile_cert'_'work_projects_cert'] lg:grid-cols-[minmax(0,1.35fr)_minmax(0,4.3fr)_minmax(0,1.55fr)] lg:grid-rows-[minmax(178px,0.86fr)_minmax(320px,1.42fr)_minmax(126px,0.52fr)] xl:grid-cols-[minmax(0,1.4fr)_minmax(0,4.5fr)_minmax(0,1.5fr)] xl:grid-rows-[minmax(194px,0.9fr)_minmax(340px,1.45fr)_minmax(136px,0.56fr)]">
      <BentoCard
        className="order-1 flex min-h-37.5 flex-col justify-between p-5 lg:order-0 lg:min-h-0 lg:p-4 lg:[grid-area:tagline] xl:p-5"
      >
        <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-2xl border border-[rgba(201,191,255,0.12)] bg-surface-hover text-accent-lavender lg:h-9 lg:w-9">
          <TbSparkles size={18} />
        </div>
        <div className="relative z-10">
          <p className="mt-2 wrap-break-words font-heading text-2xl font-bold leading-tight text-text-primary lg:text-[clamp(1rem,1.7vw,1.5rem)]">
            Product-minded   builder for digital systems.
          </p>
          <p className="mt-3 text-xs leading-5 text-text-secondary lg:mt-2 lg:line-clamp-2">
            Developer, project manager, and aspiring Product Manager — working across discovery, delivery, and development.
          </p>
        </div>
      </BentoCard>

      <BentoCard
        to="/about"
        className="order-2 lg:order-0 lg:min-h-0 lg:[grid-area:about]"
      >
        <div className="relative z-10 flex h-full min-h-29 items-center justify-between gap-4 p-5 lg:min-h-0 lg:p-5 xl:p-6">
          <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_18%_85%,rgba(124,80,224,0.14),transparent_32%),radial-gradient(circle_at_86%_15%,rgba(192,96,240,0.1),transparent_35%)]" />
          <div className="relative z-10 min-w-0">
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-accent-lavender/60 lg:text-[9px]">
              Profile
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-text-primary lg:text-[clamp(2rem,3.2vw,3rem)]">
              About me
            </h2>
            <p className="mt-1 text-xs text-text-secondary lg:text-[12px]">
              With 2 years of experience in full-stack development, along with hands-on experience in project management, I'm now focused on growing as a Product Manager. I build products like Inotrive and Yayzi to practice creating real value, while keeping my technical understanding sharp so I stay aware of what's technologically possible. My goa to be a Product Manager with strong product sense and flexible technical depth.
            </p>
          </div>
          <div className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[rgba(201,191,255,0.12)] bg-surface-hover text-accent-lavender lg:h-10 lg:w-10">
            <TbUser size={20} />
          </div>
        </div>
      </BentoCard>

      <BentoCard
        to="/about"
        className="order-3 min-h-90 sm:min-h-107.5 md:min-h-125 lg:order-0 lg:min-h-0 lg:[grid-area:profile]"
      >
        <div
          ref={heroContainerRef}
          className="pointer-events-none absolute inset-0 z-2 hidden overflow-hidden sm:block"
        >
          <div className="pointer-events-none absolute inset-0 z-0">
            <AnimatedBeam
              containerRef={heroContainerRef}
              fromRef={techNodeRef}
              toRef={productNodeRef}
              curvature={26}
              duration={3.6}
              startXOffset={56}
              endXOffset={-108}
              endYOffset={-10}
              pathColor="rgba(201,191,255,0.18)"
              pathWidth={1.35}
              pathOpacity={0.3}
              gradientStartColor="#7c50e0"
              gradientStopColor="#c9bfff"
            />
            <AnimatedBeam
              containerRef={heroContainerRef}
              fromRef={techNodeRef}
              toRef={productNodeRef}
              curvature={-24}
              reverse
              duration={3.6}
              delay={0.4}
              startXOffset={56}
              endXOffset={-108}
              endYOffset={10}
              pathColor="rgba(201,191,255,0.12)"
              pathWidth={1.35}
              pathOpacity={0.22}
              gradientStartColor="#c060f0"
              gradientStopColor="#c9bfff"
            />
          </div>
          <div
            ref={techNodeRef}
            className="about-float absolute left-6 top-6 z-10 hidden h-24 w-57 overflow-hidden rounded-[20px] border border-[rgba(201,191,255,0.14)] bg-[linear-gradient(135deg,rgba(124,80,224,0.2),rgba(255,255,255,0.035)_48%,rgba(10,10,18,0.16))] p-4 shadow-[0_18px_50px_rgba(0,0,0,0.28),0_0_42px_rgba(124,80,224,0.18),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md md:block lg:left-5 lg:top-5 xl:left-7 xl:top-7"
          >
            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full border border-[rgba(201,191,255,0.08)]" />
            <div className="absolute bottom-3 right-4 flex items-end gap-1">
              <span className="h-4 w-1.5 rounded-full bg-accent-lavender/25" />
              <span className="h-7 w-1.5 rounded-full bg-accent-lavender/45" />
              <span className="h-5 w-1.5 rounded-full bg-accent-purple/45" />
            </div>
            <div className="relative z-10 flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-2xl border border-[rgba(201,191,255,0.16)] bg-[rgba(10,10,18,0.54)] text-[13px] font-semibold text-accent-lavender shadow-[0_0_24px_rgba(124,80,224,0.24)]">
                {'</>'}
              </div>
              <div>
                <p className="font-heading text-sm font-semibold text-text-primary">
                  Tech Systems
                </p>
                <p className="mt-1 text-[10px] text-text-secondary">
                  Code / API / Automation
                </p>
              </div>
            </div>
          </div>

          <div
            ref={productNodeRef}
            className="about-float-delayed absolute bottom-6 right-6 z-10 hidden h-34 w-68 overflow-hidden rounded-[26px] border border-[rgba(201,191,255,0.14)] bg-[linear-gradient(135deg,rgba(192,96,240,0.14),rgba(255,255,255,0.04)_46%,rgba(10,10,18,0.14))] shadow-[0_18px_54px_rgba(0,0,0,0.28),0_0_46px_rgba(192,96,240,0.16),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md md:block lg:bottom-5 lg:right-5 xl:bottom-7 xl:right-7"
          >
            <div className="about-orbit absolute right-5 top-4 h-20.5 w-20.5 rounded-full border border-[rgba(201,191,255,0.16)]">
              <span className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,#c9bfff,rgba(124,80,224,0.42)_58%,transparent_70%)] shadow-[0_0_28px_rgba(201,191,255,0.34)]" />
              <span className="absolute -left-1 top-8 h-3 w-3 rounded-full bg-accent-purple/70 shadow-[0_0_14px_rgba(124,80,224,0.55)]" />
              <span className="absolute right-3 -top-1 h-2.5 w-2.5 rounded-full bg-accent-violet/70 shadow-[0_0_14px_rgba(192,96,240,0.5)]" />
              <span className="absolute bottom-2 right-1 h-2.5 w-2.5 rounded-full bg-accent-lavender/70 shadow-[0_0_14px_rgba(201,191,255,0.45)]" />
            </div>
            <div className="absolute left-4 top-4">
              <p className="font-heading text-sm font-semibold text-text-primary">
                Product Thinking
              </p>
              <p className="mt-1 max-w-31.25 text-[10px] leading-4 text-text-secondary">
                Discovery / Users / Data
              </p>
            </div>
            <div className="absolute bottom-4 left-4 flex gap-1.5">
              <span className="h-2 w-8 rounded-full bg-accent-purple/35" />
              <span className="h-2 w-5 rounded-full bg-accent-violet/35" />
              <span className="h-2 w-3 rounded-full bg-accent-lavender/35" />
            </div>
          </div>
        </div>
        <img
          src={meImage}
          alt="Ahmad Dzaky Ar Razi"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 z-1 h-full w-full object-cover object-[center_22%] lg:object-[center_23%]"
        />
        <div className="absolute inset-0 z-2 bg-[linear-gradient(180deg,rgba(10,10,18,0)_35%,rgba(10,10,18,0.86)_100%)]" />
        <div className="relative z-10 flex h-full min-h-90 flex-col justify-end p-5 sm:min-h-107 md:min-h-125 lg:min-h-0 lg:p-4 xl:p-5">
          <span className="w-fit rounded-full border border-[rgba(80,200,120,0.3)] bg-green-bg px-3 py-1 text-[10px] font-medium text-[#6fd99a] lg:text-[9px]">
            Open to Work
          </span>
          <h1 className="mt-3 max-w-full wrap-break-words font-heading text-2xl font-bold leading-tight text-text-primary sm:text-3xl lg:mt-2 lg:text-[clamp(1.35rem,2.2vw,1.875rem)]">
            Ahmad Dzaky Ar Razi
          </h1>
          <p className="mt-1 max-w-full wrap-break-words text-xs leading-5 text-text-secondary lg:text-[11px]">
            Product-minded engineer focused on digitalization, workflow automation, and operational efficiency
          </p>
        </div>
      </BentoCard>

      <BentoCard
        to="/work"
        showHoverHint={true}
        className="order-4 p-5 lg:order-0 lg:min-h-115 lg:p-4 lg:[grid-area:work] xl:min-h-125 xl:p-5"
      >
        <BentoTimelinePanel
          eyebrow="Experience"
          title="Work Experience"
          Icon={TbBriefcase}
          items={experiencePreviewItems}
        />
      </BentoCard>

      <BentoCard
        to="/project"
        showHoverHint={true}
        className="order-5 p-5 lg:order-0 lg:min-h-0 lg:p-4 lg:[grid-area:projects] xl:p-5"
      >
        <BentoTimelinePanel
          eyebrow="Projects"
          title="Projects"
          Icon={TbFolder}
          items={projectPreviewItems}
          compactWide
        />
      </BentoCard>

      <BentoCard
        to="/certification"
        showHoverHint={true}
        className="order-6 p-5 lg:order-0 lg:min-h-115 lg:p-4 lg:[grid-area:cert] xl:min-h-125 xl:p-5"
      >
        <BentoTimelinePanel
          eyebrow="Learning"
          title="Certification"
          Icon={TbCertificate}
          items={certificationPreviewItems}
        />
      </BentoCard>
    </section>
  )
}

export default BentoGrid
