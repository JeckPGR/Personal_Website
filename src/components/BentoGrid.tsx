import { useMemo } from 'react'
import type { IconType } from 'react-icons'
import {
  TbBriefcase,
  TbCertificate,
  TbFolder,
  TbUser,
} from 'react-icons/tb'
import { Link } from 'react-router-dom'
import meImage from '../assets/Me.png'
import RotatingTechOrbit from './RotatingTechOrbit'
import { certificationItems, workItems } from '../data/portfolio'
import { workExperiences } from '../data/work'
import { useCopy } from '../hooks/useCopy'
import { useLocalize } from '../hooks/useLocalize'
import type { CopyKey } from '../i18n/translations'

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
  /** Tech stack tags/pills */
  tags?: string[]
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
  tags?: string[]
}> = [
  {
    title: 'Fidela',
    metaKey: 'home.preview.fidela.meta',
    detailKey: 'home.preview.fidela.detail',
    tags: ['Next.js', 'NestJS', 'TypeScript', 'Redis', 'PostgreSQL'],
  },
  {
    title: 'Inotrive',
    metaKey: 'home.preview.inotrive.meta',
    detailKey: 'home.preview.inotrive.detail',
    tags: ['NestJS', 'React', 'Next.js', 'Redis', 'PostgreSQL', 'Apify'],
  },
  {
    title: 'Yayzi',
    metaKey: 'home.preview.yayzi.meta',
    detailKey: 'home.preview.yayzi.detail',
    tags: ['Next.js', 'Supabase'],
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
    <div
      className={`relative z-10 flex h-full flex-col justify-between ${
        compactWide
          ? 'p-3 sm:p-3.5 lg:p-2.5 lg:px-4 xl:p-3 xl:px-4'
          : 'min-h-64 p-4.5 sm:p-5 lg:min-h-0 lg:p-3.5 xl:p-4'
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p
            className={`font-medium uppercase tracking-[0.18em] text-accent-lavender/60 ${
              compactWide ? 'text-[9px] lg:text-[8px]' : 'text-[10px] lg:text-[8.5px]'
            }`}
          >
            {eyebrow}
          </p>
          <h2
            className={`font-heading font-bold leading-tight text-text-primary ${
              compactWide
                ? 'mt-0.5 text-xl lg:text-[1.15rem]'
                : 'mt-1.5 text-2xl md:text-3xl lg:mt-0.5 lg:text-[clamp(1.1rem,1.5vw,1.45rem)]'
            }`}
          >
            {title}
          </h2>
        </div>
        <div
          className={`flex shrink-0 items-center justify-center rounded-2xl border border-[rgba(var(--rgb-line),0.12)] bg-surface-hover text-accent-lavender ${
            compactWide ? 'h-7.5 w-7.5 rounded-xl lg:h-7 lg:w-7' : 'h-9 w-9 lg:h-8 lg:w-8'
          }`}
        >
          <Icon size={compactWide ? 15 : 17} />
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
      <div className="relative mt-2 grid gap-2 pl-6 lg:mt-1 lg:grid-cols-3 lg:gap-3 lg:pl-0">
        <span className="absolute bottom-1 left-0 top-1 w-px bg-[linear-gradient(180deg,transparent,rgba(var(--rgb-line),0.32),transparent)] lg:hidden" />
        {items.map(({ title, meta, detail }, index) => (
          <div key={`${title}-${index}`} className="relative min-w-0 lg:pl-3.5">
            <span className="absolute -left-7 top-1 h-1.5 w-1.5 rounded-full border border-[rgba(var(--rgb-line),0.55)] bg-base shadow-[0_0_10px_rgba(var(--rgb-line),0.35)] lg:left-0 lg:top-1" />
            <p className="font-heading text-xs font-semibold leading-tight text-text-primary lg:truncate lg:text-[11px] xl:text-[11.5px]">
              {title}
            </p>
            <p className="mt-0.5 text-[9.5px] font-medium leading-3.5 text-accent-lavender/85 lg:truncate lg:text-[8.5px]">
              {meta}
            </p>
            {detail ? (
              <p className="mt-0.5 text-[8.5px] leading-3 text-text-muted lg:truncate lg:text-[8px]">
                {detail}
              </p>
            ) : null}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="relative mt-4 flex min-h-0 flex-1 flex-col justify-between gap-3 pl-6 pb-2 pt-1 lg:mt-2.5 lg:gap-2.5 lg:pb-1.5 lg:pt-0.5 xl:pb-2">
      <span className="absolute bottom-2.5 left-0 top-2 w-px bg-[linear-gradient(180deg,transparent,rgba(var(--rgb-line),0.32),transparent)]" />
      {items.map(({ title, meta, detail, description, tags }, index) => (
        <div key={`${title}-${index}`} className="relative min-w-0">
          <span className="absolute -left-7 top-1.5 h-2 w-2 rounded-full border border-[rgba(var(--rgb-line),0.55)] bg-base shadow-[0_0_12px_rgba(var(--rgb-line),0.35)]" />
          <p className="font-heading text-sm font-semibold leading-tight text-text-primary lg:text-[11.5px] xl:text-[12.5px]">
            {title}
          </p>
          <p className="mt-0.5 text-[10.5px] font-medium leading-4 text-accent-lavender/85 lg:text-[9px] xl:text-[9.5px]">
            {meta}
          </p>
          {detail ? (
            <p className="mt-0.5 text-[9.5px] leading-4 text-text-muted lg:text-[8.5px]">
              {detail}
            </p>
          ) : null}
          {description ? (
            <p className="mt-0.5 line-clamp-2 text-[11px] leading-[1.45] text-text-muted/85 lg:text-[8.5px] lg:leading-[1.35] xl:text-[9.5px]">
              {description}
            </p>
          ) : null}
          {tags && tags.length > 0 ? (
            <div className="mt-1.5 flex flex-wrap items-center gap-1">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded border border-[rgba(var(--rgb-line),0.2)] bg-[rgba(var(--rgb-film),0.06)] px-1.5 py-0.5 text-[8px] font-medium text-accent-lavender backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      ))}
    </div>
  )
}

function BentoGrid() {
  const t = useCopy()
  const L = useLocalize()

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
      projectPreviewKeys.map(({ title, metaKey, detailKey, tags }) => ({
        title,
        meta: t(metaKey),
        detail: t(detailKey),
        tags,
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

  return (
    <section className="grid min-w-0 max-w-full grid-cols-1 gap-4 md:gap-4 lg:h-full lg:min-h-0 flex-1 lg:gap-2.5 lg:[grid-template-areas:'about_about_about'_'work_profile_projects'_'work_cert_projects'] lg:grid-cols-[minmax(0,1.35fr)_minmax(0,4.3fr)_minmax(0,1.55fr)] lg:grid-rows-[minmax(158px,0.78fr)_minmax(270px,1.4fr)_minmax(105px,0.48fr)] xl:gap-3 xl:grid-cols-[minmax(0,1.4fr)_minmax(0,4.5fr)_minmax(0,1.5fr)] xl:grid-rows-[minmax(165px,0.8fr)_minmax(290px,1.42fr)_minmax(115px,0.52fr)]">
      {/* 1. About Me Card (Top Row, 158px Height) */}
      <BentoCard
        to="/about"
        className="order-1 lg:order-0 lg:min-h-0 lg:[grid-area:about]"
      >
        <div className="relative z-10 flex h-full min-h-24 flex-col justify-between p-4.5 sm:p-5 lg:p-4.5 xl:p-5">
          <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_18%_85%,var(--app-wash-a),transparent_32%),radial-gradient(circle_at_86%_15%,var(--app-wash-b),transparent_35%)]" />
          <div className="relative z-10 flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-accent-lavender/60 lg:text-[8.5px]">
                {t('home.profile')}
              </p>
              <h2 className="mt-1 font-heading text-2xl font-bold text-text-primary lg:text-[clamp(1.5rem,2.2vw,2.25rem)]">
                {t('home.aboutMe')}
              </h2>
            </div>
            <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl border border-[rgba(var(--rgb-line),0.12)] bg-surface-hover text-accent-lavender lg:h-8.5 lg:w-8.5">
              <TbUser size={18} />
            </div>
          </div>
          <p className="relative z-10 mt-1 line-clamp-3 text-xs leading-relaxed text-text-secondary sm:text-[12.5px] lg:text-[11.5px] xl:text-[12.5px]">
            {t('home.aboutBlurb')}
          </p>
        </div>
      </BentoCard>

      {/* 2. Center Profile Card: Clean Photo */}
      <BentoCard
        to="/about"
        className="order-2 min-h-85 sm:min-h-95 md:min-h-105 lg:order-0 lg:min-h-0 lg:[grid-area:profile]"
      >
        <RotatingTechOrbit />
        <img
          src={meImage}
          alt="Ahmad Dzaky Ar Razi"
          loading="lazy"
          decoding="async"
          className="pointer-events-none absolute inset-0 z-2 h-full w-full object-cover object-[center_20%] lg:object-[center_20%]"
        />
        <div className="pointer-events-none absolute inset-0 z-3 bg-[var(--app-photo-veil)]" />
        <div className="relative z-10 flex h-full min-h-85 flex-col justify-end p-4 sm:min-h-95 md:min-h-105 lg:min-h-0 lg:p-3.5 xl:p-4">
          <span className="w-fit rounded-md border border-[rgba(80,200,120,0.3)] bg-green-bg px-2.5 py-0.5 text-[9.5px] font-medium text-[#6fd99a] lg:text-[8.5px]">
            {t('home.openToWork')}
          </span>
          <h1 className="mt-2 max-w-full wrap-break-words font-heading text-2xl font-bold leading-tight text-text-primary sm:text-3xl lg:mt-1.5 lg:text-[clamp(1.25rem,2vw,1.75rem)]">
            Ahmad Dzaky Ar Razi
          </h1>
          <p className="mt-0.5 max-w-full wrap-break-words text-xs leading-5 text-text-secondary lg:text-[10.5px]">
            {t('home.heroSub')}
          </p>
        </div>
      </BentoCard>

      {/* 3. Left Column: Work Experience */}
      <BentoCard
        to="/work"
        showHoverHint={true}
        className="order-3 p-4.5 sm:p-5 lg:order-0 lg:min-h-0 lg:p-0 lg:[grid-area:work]"
      >
        <BentoTimelinePanel
          eyebrow={t('home.experience')}
          title={t('home.workExperience')}
          Icon={TbBriefcase}
          items={experiencePreviewItems}
        />
      </BentoCard>

      {/* 4. Right Column: Projects (With Inotrive Tech Stack) */}
      <BentoCard
        to="/project"
        showHoverHint={true}
        className="order-4 p-4.5 sm:p-5 lg:order-0 lg:min-h-0 lg:p-0 lg:[grid-area:projects]"
      >
        <BentoTimelinePanel
          eyebrow={t('home.projects')}
          title={t('home.projects')}
          Icon={TbFolder}
          items={projectPreviewItems}
        />
      </BentoCard>

      {/* 5. Bottom Center: Certification (Swapped & Clearly Visible) */}
      <BentoCard
        to="/certification"
        showHoverHint={true}
        className="order-5 p-4.5 sm:p-5 lg:order-0 lg:min-h-0 lg:p-0 lg:[grid-area:cert]"
      >
        <BentoTimelinePanel
          eyebrow={t('home.learning')}
          title={t('home.certification')}
          Icon={TbCertificate}
          items={certificationPreviewItems}
          compactWide
        />
      </BentoCard>
    </section>
  )
}

export default BentoGrid
