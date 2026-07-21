import { useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import type { MotionProps } from 'framer-motion'
import type { IconType } from 'react-icons'
import {
  TbArrowRight,
  TbArrowUpRight,
  TbChevronDown,
  TbFileText,
} from 'react-icons/tb'
import { Link } from 'react-router-dom'
import {
  // aboutHighlights,
  CV_URL,
  aboutItem,
  aboutTechStack,
  aboutTools,
  certificationItems,
} from '../data/portfolio'
import type { ToolItem } from '../data/portfolio'
import { useCopy } from '../hooks/useCopy'
import { useLocalize } from '../hooks/useLocalize'
import { projects } from '../data/project'
import { workExperiences } from '../data/work'

const EASE = [0.22, 1, 0.36, 1] as const
const VIEWPORT = { once: true, margin: '-60px' } as const

/** Rotating brand accents for data that carries no accent of its own. */
const CERT_ACCENTS = ['#c9bfff', '#c060f0', '#7c50e0']

type RowItem = {
  id: string
  title: string
  meta: string
  sub?: string
  to: string
  accent: string
  /** Icon tile shown when there is no image. Omit for a text-only row. */
  Icon?: IconType
  /** Logo / cover thumbnail. */
  image?: string
  /**
   * `cover` fills a wide tile — right for screenshots.
   * `contain` letterboxes inside a square — right for logos, which arrive at
   * wildly different aspect ratios and built-in padding.
   */
  fit?: 'cover' | 'contain'
}

/* ─── Data: only ever the first three of each list, the rest lives on its own page ─── */

const projectRows: RowItem[] = projects.slice(0, 3).map((project) => ({
  id: project.slug,
  title: project.title,
  meta: project.category,
  sub: project.context.split(' / ')[0],
  to: project.route,
  accent: project.accent,
  Icon: project.Icon,
  image: project.thumbnail,
  fit: 'contain' as const,
}))

const stats = [
  { value: workExperiences.length, key: 'about.stats.roles' },
  { value: projects.length, key: 'about.stats.projects' },
  { value: certificationItems.length, key: 'about.stats.certifications' },
] as const

/* ─── Word-by-word headline reveal ─── */
function RevealWords({
  text,
  className,
  delay = 0,
}: {
  text: string
  className?: string
  delay?: number
}) {
  return (
    <span className={className}>
      {text.split(' ').map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="inline-block overflow-hidden align-bottom"
        >
          <motion.span
            className="inline-block"
            initial={{ y: '110%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: delay + index * 0.045, ease: EASE }}
          >
            {word}
            {' '}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

/* ─── Centered rule + label that separates every section ─── */
function SectionHeading({ label }: { label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.6, ease: EASE }}
      className="mb-10 flex items-center gap-4"
    >
      {/* Both rules draw outward from the label as the section scrolls in. */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
        className="h-px flex-1 origin-right bg-gradient-to-r from-transparent to-[rgba(var(--rgb-line),0.14)]"
      />
      <h2 className="text-center font-heading text-sm font-bold uppercase tracking-[0.25em] text-text-primary">
        {label}
      </h2>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
        className="h-px flex-1 origin-left bg-gradient-to-l from-transparent to-[rgba(var(--rgb-line),0.14)]"
      />
    </motion.div>
  )
}

/* ─── Toolkit ─── */

/** Categories shown before the reader asks for the rest. */
const COLLAPSED_ROWS = 5

type ToolGroup = [category: string, entries: ToolItem[]]

function groupByCategory(items: ToolItem[]): ToolGroup[] {
  return [
    ...items
      .reduce((map, item) => {
        const entries = map.get(item.category)
        if (entries) entries.push(item)
        else map.set(item.category, [item])
        return map
      }, new Map<string, ToolItem[]>())
      .entries(),
    // Densest categories first, so the lone entries settle at the tail
    // instead of punching holes between the full ones — and so the collapsed
    // view leads with the richest rows.
  ].sort((a, b) => b[1].length - a[1].length)
}

/** One `label | entries` line — a category of one costs a line, not a grid cell. */
function ToolRow({
  category,
  entries,
  index,
  reveal,
}: {
  category: string
  entries: ToolItem[]
  index: number
  /** Rows past the fold are already on screen when they mount, so they cascade
   *  on mount instead of waiting for a scroll trigger that will never fire. */
  reveal: 'scroll' | 'mount'
}) {
  const revealProps: MotionProps =
    reveal === 'scroll'
      ? {
          initial: { opacity: 0, y: 12 },
          whileInView: { opacity: 1, y: 0 },
          viewport: VIEWPORT,
        }
      : { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 } }

  return (
    <motion.div
      {...revealProps}
      transition={{
        duration: 0.45,
        delay: Math.min(index, 8) * 0.04,
        ease: EASE,
      }}
      className="grid grid-cols-1 gap-x-8 gap-y-2 border-t border-[rgba(var(--rgb-line),0.06)] py-3.5 sm:grid-cols-[152px_1fr] sm:items-baseline"
    >
      <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-accent-lavender/45">
        {category}
      </p>
      <ul className="flex flex-wrap gap-x-6 gap-y-2.5">
        {entries.map(({ name, Icon }) => (
          <li
            key={name}
            className="group flex items-center gap-2 text-[13px] text-text-secondary transition-colors duration-300 hover:text-text-primary"
          >
            <Icon
              size={15}
              className="shrink-0 text-accent-lavender/55 transition-all duration-300 group-hover:scale-110 group-hover:text-accent-lavender"
            />
            {name}
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

function ToolClusters({ title, items }: { title: string; items: ToolItem[] }) {
  const t = useCopy()
  const [expanded, setExpanded] = useState(false)

  const groups = groupByCategory(items)
  const visible = groups.slice(0, COLLAPSED_ROWS)
  const rest = groups.slice(COLLAPSED_ROWS)

  return (
    <div>
      <div className="flex items-baseline gap-3">
        <h3 className="font-heading text-base font-semibold text-text-primary">
          {title}
        </h3>
        <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-text-muted">
          {String(items.length).padStart(2, '0')} {t('about.entries')}
        </span>
      </div>

      <div className="mt-5 border-b border-[rgba(var(--rgb-line),0.06)]">
        {visible.map(([category, entries], index) => (
          <ToolRow
            key={category}
            category={category}
            entries={entries}
            index={index}
            reveal="scroll"
          />
        ))}

        <AnimatePresence initial={false}>
          {expanded ? (
            <motion.div
              key="rest"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                height: { duration: 0.5, ease: EASE },
                opacity: { duration: 0.3, ease: 'easeOut' },
              }}
              className="overflow-hidden"
            >
              {rest.map(([category, entries], index) => (
                <ToolRow
                  key={category}
                  category={category}
                  entries={entries}
                  index={index}
                  reveal="mount"
                />
              ))}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      {rest.length ? (
        // Centred and padded to a real tap target rather than a bare text line.
        <div className="mt-5 flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            aria-expanded={expanded}
            className="group inline-flex items-center gap-2 rounded-md border border-[rgba(var(--rgb-line),0.1)] bg-[rgba(var(--rgb-hover),0.04)] px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.18em] text-accent-lavender/60 transition-all duration-300 hover:border-[rgba(var(--rgb-line),0.24)] hover:bg-[rgba(var(--rgb-hover),0.1)] hover:text-accent-lavender"
          >
            {expanded
              ? t('about.seeLess')
              : `${t('about.seeMore')} (${rest.length})`}
            <motion.span
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="flex"
            >
              <TbChevronDown size={14} />
            </motion.span>
          </button>
        </div>
      ) : null}
    </div>
  )
}

/* ─── Flat index rows, borrowed from the work / project listings ─── */
function IndexRows({
  items,
  href,
  viewAllLabel,
}: {
  items: RowItem[]
  href: string
  viewAllLabel: string
}) {
  return (
    <>
      <ul className="border-t border-[rgba(var(--rgb-line),0.08)]">
        {items.map((item, index) => {
          const ItemIcon = item.Icon
          const isContained = item.fit === 'contain'

          return (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.5, delay: index * 0.07, ease: EASE }}
            >
              <Link
                to={item.to}
                className="group relative flex items-center gap-4 border-b border-[rgba(var(--rgb-line),0.08)] py-5 pl-3 transition-colors duration-300 md:gap-6 md:py-6"
              >
                <span
                  className="absolute inset-y-2 left-0 w-px origin-center scale-y-0 transition-transform duration-500 group-hover:scale-y-100"
                  style={{ background: item.accent }}
                />
                <span className="w-5 shrink-0 font-heading text-[11px] font-bold tabular-nums text-text-muted transition-colors duration-300 group-hover:text-accent-lavender">
                  {String(index + 1).padStart(2, '0')}
                </span>
                {item.image || ItemIcon ? (
                  <span
                    className={`relative flex shrink-0 items-center justify-center overflow-hidden border transition-transform duration-300 group-hover:scale-105 ${
                      item.image && !isContained
                        ? 'h-12 w-19 rounded-lg'
                        : 'h-13 w-13 rounded-xl'
                    }`}
                    style={{
                      borderColor: `${item.accent}2e`,
                      background: `${item.accent}14`,
                      color: item.accent,
                    }}
                  >
                    {item.image ? (
                      <>
                        <img
                          src={item.image}
                          alt=""
                          loading="lazy"
                          decoding="async"
                          className={`h-full w-full transition-transform duration-500 ${
                            isContained
                              ? 'object-contain p-2 group-hover:scale-105'
                              : 'object-cover group-hover:scale-110'
                          }`}
                        />
                        {isContained ? null : (
                          <span
                            className="pointer-events-none absolute inset-0 opacity-40 transition-opacity duration-300 group-hover:opacity-0"
                            style={{ background: `${item.accent}1f` }}
                          />
                        )}
                      </>
                    ) : ItemIcon ? (
                      <ItemIcon size={18} />
                    ) : null}
                  </span>
                ) : null}
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-heading text-base font-semibold leading-tight text-text-primary transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent-lavender md:text-lg">
                    {item.title}
                  </span>
                  {item.sub ? (
                    <span className="mt-1 block truncate text-[11px] text-text-muted">
                      {item.sub}
                    </span>
                  ) : null}
                </span>
                <span className="hidden shrink-0 text-[10px] font-medium uppercase tracking-[0.16em] text-text-muted transition-colors duration-300 group-hover:text-text-secondary sm:block">
                  {item.meta}
                </span>
                <TbArrowUpRight
                  size={18}
                  className="shrink-0 text-accent-lavender opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                />
              </Link>
            </motion.li>
          )
        })}
      </ul>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-7 flex justify-center"
      >
        <Link
          to={href}
          className="group inline-flex items-center gap-2.5 rounded-md border border-[rgba(var(--rgb-line),0.12)] bg-[rgba(var(--rgb-hover),0.05)] px-6 py-2.5 font-heading text-[11px] font-semibold uppercase tracking-[0.1em] text-accent-lavender transition-all duration-300 hover:-translate-y-0.5 hover:border-[rgba(var(--rgb-line),0.3)] hover:bg-[rgba(var(--rgb-hover),0.12)] hover:shadow-[0_10px_34px_rgba(var(--rgb-hover),0.14)]"
        >
          {viewAllLabel}
          <TbArrowRight
            size={15}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      </motion.div>
    </>
  )
}

function About() {
  const t = useCopy()
  const L = useLocalize()
  const heroRef = useRef<HTMLElement>(null)

  const workRows = useMemo<RowItem[]>(
    () =>
      workExperiences.slice(0, 3).map((item) => ({
        id: item.slug,
        title: item.company,
        meta: item.tag,
        sub: L(item.period),
        to: item.route,
        accent: item.accent,
        Icon: item.Icon,
        image: item.thumbnail,
      })),
    [L],
  )

  const certificationRows = useMemo<RowItem[]>(
    () =>
      certificationItems.slice(0, 3).map((item, index) => ({
        id: `${item.issuer}-${item.title}`,
        title: item.title,
        meta: item.issuer,
        sub: L(item.period),
        to: '/certification',
        accent: CERT_ACCENTS[index % CERT_ACCENTS.length],
        // No tile — certifications read better as plain text rows.
      })),
    [L],
  )

  // The watermark drifts sideways as the hero scrolls, a quiet background
  // flourish. The hero text itself stays put — drifting/fading it with
  // scroll left it lagging behind and visually overlapping the Toolkit
  // section directly beneath it.
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const watermarkX = useTransform(heroProgress, [0, 1], [0, -90])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: EASE }}
      className="mx-auto min-w-0 max-w-6xl"
    >
      {/* ─── Intro ─── */}
      <header ref={heroRef} className="relative mt-5 overflow-hidden px-1 py-10 md:py-14">
        <motion.div
          style={{ x: watermarkX }}
          className="pointer-events-none absolute -right-8 top-0 font-heading text-[6rem] font-bold leading-none text-accent-lavender/[0.03] md:text-[11rem]"
        >
          ABOUT
        </motion.div>

        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="flex items-center gap-3"
          >
            <span className="h-px w-8 bg-accent-lavender/40" />
            <span className="font-heading text-[10px] font-bold uppercase tracking-[0.3em] text-accent-lavender/70">
              {t('about.tag')} /&gt;
            </span>
          </motion.div>

          <h1 className="mt-6 max-w-3xl font-heading text-3xl font-bold leading-[1.15] text-text-primary md:text-4xl lg:text-[3.25rem]">
            <RevealWords text={t('about.headline')} delay={0.15} />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
            className="mt-7 max-w-3xl text-[15px] font-light leading-[1.9] text-text-secondary"
          >
            {aboutItem.description ? L(aboutItem.description) : null}
          </motion.p>

          {aboutItem.chips ? (
            <div className="mt-8 flex flex-wrap gap-2">
              {L(aboutItem.chips).map((chip, index) => (
                <motion.span
                  key={chip}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.05 }}
                  className="cursor-default rounded-lg border border-[rgba(var(--rgb-line),0.1)] bg-[rgba(var(--rgb-hover),0.05)] px-3 py-1.5 text-[11px] font-medium text-accent-lavender/75 transition-colors duration-300 hover:border-[rgba(var(--rgb-line),0.24)] hover:bg-[rgba(var(--rgb-hover),0.12)] hover:text-accent-lavender"
                >
                  {chip}
                </motion.span>
              ))}
            </div>
          ) : null}

          {/* Counts first, so the sections below are a choice rather than a toll.
              The CV sits on the same rule, opposite the numbers. */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.85, ease: EASE }}
            className="mt-12 flex flex-wrap items-end justify-between gap-x-12 gap-y-7 border-t border-[rgba(var(--rgb-line),0.08)] pt-8"
          >
            <dl className="flex flex-wrap items-end gap-x-12 gap-y-6">
              {stats.map(({ value, key }) => (
                <div key={key}>
                  <dt className="font-heading text-2xl font-bold tabular-nums text-text-primary md:text-3xl">
                    {String(value).padStart(2, '0')}
                  </dt>
                  <dd className="mt-1 text-[10px] font-medium uppercase tracking-[0.2em] text-text-muted">
                    {t(key)}
                  </dd>
                </div>
              ))}
            </dl>

            <a
              href={CV_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 rounded-md border border-[rgba(var(--rgb-line),0.22)] bg-[rgba(var(--rgb-hover),0.12)] px-5 py-3 font-heading text-[11px] font-semibold uppercase tracking-[0.16em] text-accent-lavender transition-all duration-300 hover:-translate-y-0.5 hover:border-[rgba(var(--rgb-line),0.42)] hover:bg-[rgba(var(--rgb-hover),0.2)] hover:shadow-[0_10px_34px_rgba(var(--rgb-hover),0.18)]"
            >
              <TbFileText size={16} />
              See my Resume
              <TbArrowUpRight
                size={15}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </motion.div>
        </div>
      </header>

      {/* ─── How I work ─── */}
      {/* <section className="mt-24">
        <SectionHeading label="How I Work" />

        <div className="grid gap-4 md:grid-cols-3">
          {aboutHighlights.map(({ title, text, Icon }, index) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.55, delay: index * 0.09, ease: EASE }}
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
              className="group relative overflow-hidden rounded-2xl border border-[rgba(var(--rgb-line),0.07)] bg-[rgba(var(--rgb-film),0.015)] p-7 transition-colors duration-500 hover:border-[rgba(var(--rgb-line),0.18)]"
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(420px_circle_at_50%_0%,rgba(var(--rgb-glow),0.16),transparent_65%)]" />

              <div className="relative flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[rgba(var(--rgb-glow),0.12)] text-accent-lavender shadow-[0_0_22px_rgba(var(--rgb-glow),0.16)] transition-transform duration-300 group-hover:scale-110">
                  <Icon size={19} />
                </div>
                <span className="font-heading text-[11px] font-bold tabular-nums text-accent-lavender/25">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>

              <h3 className="relative mt-6 font-heading text-base font-semibold text-text-primary">
                {title}
              </h3>
              <p className="relative mt-2.5 text-[13px] font-light leading-[1.8] text-text-secondary transition-colors duration-300 group-hover:text-text-primary">
                {text}
              </p>
            </motion.article>
          ))}
        </div>
      </section> */}

      {/* ─── Toolkit ─── */}
      <section className="mt-24">
        <SectionHeading label={t('about.section.toolkit')} />

        <div className="space-y-14">
          <ToolClusters title={t('about.techStack')} items={aboutTechStack} />
          <ToolClusters title={t('about.tools')} items={aboutTools} />
        </div>
      </section>

      {/* ─── Selected work ─── */}
      <section className="mt-24">
        <SectionHeading label={t('about.section.experience')} />
        <IndexRows
          items={workRows}
          href="/work"
          viewAllLabel={t('about.allExperience')}
        />
      </section>

      {/* ─── Projects ─── */}
      <section className="mt-24">
        <SectionHeading label={t('about.section.projects')} />
        <IndexRows items={projectRows} href="/project" viewAllLabel={t('about.allProjects')} />
      </section>

      {/* ─── Certifications ─── */}
      <section className="mt-24">
        <SectionHeading label={t('about.section.certifications')} />
        <IndexRows
          items={certificationRows}
          href="/certification"
          viewAllLabel={t('about.allCertifications')}
        />
      </section>
    </motion.div>
  )
}

export default About
