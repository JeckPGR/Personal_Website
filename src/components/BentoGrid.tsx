import { useMemo, useRef } from 'react'
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
import { workExperiences } from '../data/work'
import { useCopy } from '../hooks/useCopy'
import { useLocalize } from '../hooks/useLocalize'
import type { CopyKey } from '../i18n/translations'
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
  /** Longer blurb — fills the tall side panels on wide screens. */
  description?: string
}

type BentoTimelinePanelProps = {
  eyebrow: string
  title: string
  Icon: IconType
  items: BentoTimelineItem[]
  compactWide?: boolean
}

// Blurbs live on the richer work records; matched by slug rather than by
// position so reordering either list can't mismatch them.
const summaryBySlug = new Map(
  workExperiences.map(({ slug, summary }) => [slug, summary]),
)

/** Bespoke home blurbs — shorter than the project page copy, so they keep
 *  their own keys rather than reusing `projects`. */
const projectPreviewKeys: Array<{
  title: string
  metaKey: CopyKey
  detailKey: CopyKey
}> = [
  {
    title: 'Inotrive',
    metaKey: 'home.preview.inotrive.meta',
    detailKey: 'home.preview.inotrive.detail',
  },
  {
    title: 'Yayzi',
    metaKey: 'home.preview.yayzi.meta',
    detailKey: 'home.preview.yayzi.detail',
  },
  {
    title: 'PajaBarbershop',
    metaKey: 'home.preview.paja.meta',
    detailKey: 'home.preview.paja.detail',
  },
]

function BentoCard({
  children,
  className = '',
  to,
  showHoverHint = true,
}: BentoCardProps) {
  const t = useCopy()
  const sharedClassName = `group relative min-w-0 max-w-full overflow-hidden rounded-[18px] border border-[rgba(var(--rgb-line),0.12)] bg-[rgba(var(--rgb-film),0.025)] shadow-[inset_0_1px_0_rgba(var(--rgb-film),0.025)] transition duration-200 hover:border-[rgba(var(--rgb-hover),0.32)] ${className}`

  if (to) {
    return (
      <Link to={to} className={sharedClassName}>
        {children}
        {showHoverHint ? (
          <>
            <span className="pointer-events-none absolute bottom-4 right-4 z-20 inline-flex translate-y-2 items-center gap-2 rounded-md border border-[rgba(var(--rgb-line),0.12)] bg-[var(--app-panel)] px-3 py-1.5 text-[10px] font-medium text-accent-lavender opacity-0 shadow-[0_10px_30px_rgba(0,0,0,0.24),0_0_22px_rgba(var(--rgb-glow),0.12)] backdrop-blur-md transition duration-300 ease-out group-hover:translate-y-0 group-hover:border-[rgba(var(--rgb-line),0.24)] group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
              {t('home.findMore')}
              <span className="translate-x-0 transition-transform duration-300 group-hover:translate-x-1">
                -&gt;
              </span>
            </span>
            <span className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 translate-y-8 bg-[linear-gradient(180deg,transparent,rgba(var(--rgb-glow),0.1))] opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100" />
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
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[rgba(var(--rgb-line),0.12)] bg-surface-hover text-accent-lavender lg:h-10 lg:w-10">
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
        <span className="absolute bottom-2 left-0 top-2 w-px bg-[linear-gradient(180deg,transparent,rgba(var(--rgb-line),0.32),transparent)] lg:hidden" />
        {items.map(({ title, meta, detail }, index) => (
          <div key={`${title}-${index}`} className="relative min-w-0 lg:pl-5">
            <span className="absolute -left-7 top-2 h-2.5 w-2.5 rounded-full border border-[rgba(var(--rgb-line),0.55)] bg-base shadow-[0_0_14px_rgba(var(--rgb-line),0.35)] lg:left-0 lg:top-1.5" />
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
      <span className="absolute bottom-8 left-0 top-2 w-px bg-[linear-gradient(180deg,transparent,rgba(var(--rgb-line),0.32),transparent)]" />
      {items.map(({ title, meta, detail, description }, index) => (
        <div key={`${title}-${index}`} className="relative min-w-0">
          <span className="absolute -left-7 top-2 h-2.5 w-2.5 rounded-full border border-[rgba(var(--rgb-line),0.55)] bg-base shadow-[0_0_14px_rgba(var(--rgb-line),0.35)]" />
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
          {description ? (
            // Two lines everywhere: enough to fill the gap, short enough that
            // three stacked entries never outgrow the fixed panel height.
            <p className="mt-2 line-clamp-2 text-[11px] leading-[1.55] text-text-muted/85 lg:mt-1.5 lg:text-[9.5px] lg:leading-[1.5] xl:text-[10px]">
              {description}
            </p>
          ) : null}
        </div>
      ))}
    </div>
  )
}

function BentoGrid() {
  const t = useCopy()
  const L = useLocalize()
  const heroContainerRef = useRef<HTMLDivElement>(null)

  const experiencePreviewItems = useMemo<BentoTimelineItem[]>(
    () =>
      workItems.slice(0, 3).map(({ slug, title, subtitle, tag, period }) => {
        const summary = summaryBySlug.get(slug)

        return {
          title,
          meta: `${subtitle} | ${tag}`,
          detail: L(period),
          description: summary && L(summary),
        }
      }),
    [L],
  )

  const projectPreviewItems = useMemo<BentoTimelineItem[]>(
    () =>
      projectPreviewKeys.map(({ title, metaKey, detailKey }) => ({
        title,
        meta: t(metaKey),
        detail: t(detailKey),
      })),
    [t],
  )

  const certificationPreviewItems = useMemo<BentoTimelineItem[]>(
    () =>
      certificationItems
        .slice(0, 3)
        .map(({ title, issuer, period, description }) => ({
          title,
          meta: issuer,
          detail: L(period),
          description: L(description),
        })),
    [L],
  )

  const techNodeRef = useRef<HTMLDivElement>(null)
  const productNodeRef = useRef<HTMLDivElement>(null)

  return (
    <section className="grid min-w-0 max-w-full grid-cols-1 gap-5 md:gap-5 lg:h-full lg:min-h-190flex-1 lg:gap-3 lg:[grid-template-areas:'about_about_tagline'_'work_profile_cert'_'work_projects_cert'] lg:grid-cols-[minmax(0,1.35fr)_minmax(0,4.3fr)_minmax(0,1.55fr)] lg:grid-rows-[minmax(178px,0.86fr)_minmax(320px,1.42fr)_minmax(126px,0.52fr)] xl:grid-cols-[minmax(0,1.4fr)_minmax(0,4.5fr)_minmax(0,1.5fr)] xl:grid-rows-[minmax(194px,0.9fr)_minmax(340px,1.45fr)_minmax(136px,0.56fr)]">
      <BentoCard
        className="order-1 flex min-h-37.5 flex-col justify-between p-5 lg:order-0 lg:min-h-0 lg:p-4 lg:[grid-area:tagline] xl:p-5"
      >
        <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-2xl border border-[rgba(var(--rgb-line),0.12)] bg-surface-hover text-accent-lavender lg:h-9 lg:w-9">
          <TbSparkles size={18} />
        </div>
        <div className="relative z-10">
          <p className="mt-2 wrap-break-words font-heading text-2xl font-bold leading-tight text-text-primary lg:text-[clamp(1rem,1.7vw,1.5rem)]">
            {t('home.tagline')}
          </p>
          <p className="mt-3 text-xs leading-5 text-text-secondary lg:mt-2 lg:line-clamp-2">
            {t('home.taglineSub')}
          </p>
        </div>
      </BentoCard>

      <BentoCard
        to="/about"
        className="order-2 lg:order-0 lg:min-h-0 lg:[grid-area:about]"
      >
        <div className="relative z-10 flex h-full min-h-29 items-center justify-between gap-4 p-5 lg:min-h-0 lg:p-5 xl:p-6">
          <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_18%_85%,var(--app-wash-a),transparent_32%),radial-gradient(circle_at_86%_15%,var(--app-wash-b),transparent_35%)]" />
          <div className="relative z-10 min-w-0">
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-accent-lavender/60 lg:text-[9px]">
              {t('home.profile')}
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-text-primary lg:text-[clamp(2rem,3.2vw,3rem)]">
              {t('home.aboutMe')}
            </h2>
            <p className="mt-1 line-clamp-4 text-xs leading-5 text-text-secondary lg:line-clamp-3 lg:text-[12px] xl:line-clamp-4">
              {t('home.aboutBlurb')}
            </p>
          </div>
          <div className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[rgba(var(--rgb-line),0.12)] bg-surface-hover text-accent-lavender lg:h-10 lg:w-10">
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
              pathColor="rgba(var(--rgb-line),0.18)"
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
              pathColor="rgba(var(--rgb-line),0.12)"
              pathWidth={1.35}
              pathOpacity={0.22}
              gradientStartColor="#c060f0"
              gradientStopColor="#c9bfff"
            />
          </div>
          <div
            ref={techNodeRef}
            className="about-float absolute left-6 top-6 z-10 hidden h-24 w-57 overflow-hidden rounded-[20px] border border-[var(--app-float-border)] bg-[var(--app-float-a)] p-4 shadow-[0_18px_50px_rgba(0,0,0,0.28),0_0_42px_rgba(var(--rgb-glow),0.18),inset_0_1px_0_rgba(var(--rgb-film),0.08)] backdrop-blur-md md:block lg:left-5 lg:top-5 xl:left-7 xl:top-7"
          >
            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-md border border-[rgba(var(--rgb-line),0.08)]" />
            <div className="absolute bottom-3 right-4 flex items-end gap-1">
              <span className="h-4 w-1.5 rounded-md bg-accent-lavender/25" />
              <span className="h-7 w-1.5 rounded-md bg-accent-lavender/45" />
              <span className="h-5 w-1.5 rounded-md bg-accent-purple/45" />
            </div>
            <div className="relative z-10 flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-2xl border border-[var(--app-float-border)] bg-[var(--app-float-chip)] text-[13px] font-semibold text-accent-lavender shadow-[0_0_24px_rgba(var(--rgb-glow),0.24)]">
                {'</>'}
              </div>
              <div>
                <p className="font-heading text-sm font-semibold text-text-primary">
                  {t('home.techSystems')}
                </p>
                <p className="mt-1 text-[10px] text-text-secondary">
                  {t('home.techSystemsSub')}
                </p>
              </div>
            </div>
          </div>

          <div
            ref={productNodeRef}
            className="about-float-delayed absolute bottom-6 right-6 z-10 hidden h-34 w-68 overflow-hidden rounded-[26px] border border-[var(--app-float-border)] bg-[var(--app-float-b)] shadow-[0_18px_54px_rgba(0,0,0,0.28),0_0_46px_rgba(var(--rgb-violet),0.16),inset_0_1px_0_rgba(var(--rgb-film),0.08)] backdrop-blur-md md:block lg:bottom-5 lg:right-5 xl:bottom-7 xl:right-7"
          >
            <div className="about-orbit absolute right-5 top-4 h-20.5 w-20.5 rounded-full border border-[rgba(var(--rgb-line),0.16)]">
              <span className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-md bg-[radial-gradient(circle,#c9bfff,rgba(var(--rgb-glow),0.42)_58%,transparent_70%)] shadow-[0_0_28px_rgba(var(--rgb-line),0.34)]" />
              <span className="absolute -left-1 top-8 h-3 w-3 rounded-full bg-accent-purple/70 shadow-[0_0_14px_rgba(var(--rgb-glow),0.55)]" />
              <span className="absolute right-3 -top-1 h-2.5 w-2.5 rounded-full bg-accent-violet/70 shadow-[0_0_14px_rgba(var(--rgb-violet),0.5)]" />
              <span className="absolute bottom-2 right-1 h-2.5 w-2.5 rounded-full bg-accent-lavender/70 shadow-[0_0_14px_rgba(var(--rgb-line),0.45)]" />
            </div>
            <div className="absolute left-4 top-4">
              <p className="font-heading text-sm font-semibold text-text-primary">
                {t('home.productThinking')}
              </p>
              <p className="mt-1 max-w-31.25 text-[10px] leading-4 text-text-secondary">
                {t('home.productThinkingSub')}
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
        <div className="absolute inset-0 z-2 bg-[var(--app-photo-veil)]" />
        <div className="relative z-10 flex h-full min-h-90 flex-col justify-end p-5 sm:min-h-107 md:min-h-125 lg:min-h-0 lg:p-4 xl:p-5">
          <span className="w-fit rounded-md border border-[rgba(80,200,120,0.3)] bg-green-bg px-3 py-1 text-[10px] font-medium text-[#6fd99a] lg:text-[9px]">
            {t('home.openToWork')}
          </span>
          <h1 className="mt-3 max-w-full wrap-break-words font-heading text-2xl font-bold leading-tight text-text-primary sm:text-3xl lg:mt-2 lg:text-[clamp(1.35rem,2.2vw,1.875rem)]">
            Ahmad Dzaky Ar Razi
          </h1>
          <p className="mt-1 max-w-full wrap-break-words text-xs leading-5 text-text-secondary lg:text-[11px]">
            {t('home.heroSub')}
          </p>
        </div>
      </BentoCard>

      <BentoCard
        to="/work"
        showHoverHint={true}
        className="order-4 p-5 lg:order-0 lg:min-h-115 lg:p-4 lg:[grid-area:work] xl:min-h-125 xl:p-5"
      >
        <BentoTimelinePanel
          eyebrow={t('home.experience')}
          title={t('home.workExperience')}
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
          eyebrow={t('home.projects')}
          title={t('home.projects')}
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
          eyebrow={t('home.learning')}
          title={t('home.certification')}
          Icon={TbCertificate}
          items={certificationPreviewItems}
        />
      </BentoCard>
    </section>
  )
}

export default BentoGrid
