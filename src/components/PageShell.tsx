import { useRef } from 'react'
import type { ReactNode } from 'react'
import type { IconType } from 'react-icons'
import { motion, useScroll, useTransform } from 'framer-motion'

export type HighlightRow = {
  title: string
  text: string
  Icon: IconType
}

type PageShellProps = {
  tag: string
  title: string
  description?: string
  gradient: string
  Icon: IconType
  chips?: string[]
  highlights?: HighlightRow[]
  children?: ReactNode
}

function PageShell({
  tag,
  title,
  description,
  chips,
  highlights,
  children,
}: PageShellProps) {
  const watermark = title.split(' ')[0]?.toUpperCase() || tag.toUpperCase()

  // The watermark drifts sideways as the page scrolls, a quiet background
  // flourish. The header text itself stays put — these headers are short,
  // so a scroll-linked drift/fade left it lagging behind and visually
  // overlapping the content directly beneath it.
  const headerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ['start start', 'end start'],
  })
  const watermarkX = useTransform(scrollYProgress, [0, 1], [0, -90])

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.3 }}
      className="min-w-0"
    >

      {/* Open section — no frame, no dot pattern — matching the About page.
          No bottom padding: the page's own pb clears the floating navbar. */}
      <section className="relative mt-5 overflow-hidden px-2 pt-10 sm:px-4 md:px-6 md:pt-14 lg:px-10">
        <motion.div
          style={{ x: watermarkX }}
          className="pointer-events-none absolute -right-8 top-0 font-heading text-[6rem] font-bold leading-none text-accent-lavender/[0.035] md:text-[10rem] lg:text-[13rem]"
        >
          {watermark}
        </motion.div>

        <div ref={headerRef} className="relative z-10 max-w-3xl">
          {/* Same eyebrow as the About page: rule + label, not a pill. */}
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-accent-lavender/40" />
            <span className="font-heading text-[10px] font-bold uppercase tracking-[0.3em] text-accent-lavender/70">
              {tag} /&gt;
            </span>
          </div>
          <h1 className="mt-6 max-w-3xl wrap-break-word font-heading text-3xl font-bold leading-tight text-text-primary md:text-4xl lg:text-5xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-4 max-w-2xl wrap-break-word text-sm leading-6 text-text-secondary">
              {description}
            </p>
          ) : null}
          {chips?.length ? (
            <div className="mt-5 flex flex-wrap gap-2">
              {chips.map((chip) => (
                <span
                  key={chip}
                  className="rounded-md border border-[rgba(var(--rgb-line),0.12)] bg-[rgba(var(--rgb-film),0.026)] px-3 py-1 text-[11px] text-text-secondary"
                >
                  {chip}
                </span>
              ))}
            </div>
          ) : null}
        </div>

        {children ? <div className="relative z-10 mt-10 lg:mt-8">{children}</div> : null}

        {highlights?.length ? (
          <section className="relative z-10 mt-10 min-w-0 rounded-[18px] border border-[rgba(var(--rgb-line),0.1)] bg-[rgba(var(--rgb-film),0.022)] p-4 shadow-[0_18px_45px_rgba(0,0,0,0.16)] backdrop-blur-sm md:p-5 lg:mt-8">
            <h2 className="font-heading text-lg font-semibold text-[#e8e0ff]">
              Highlights
            </h2>
            <div className="mt-5 grid gap-5 lg:mt-4 lg:gap-3">
              {highlights.map(({ title: rowTitle, text, Icon: RowIcon }) => (
                <div
                  key={rowTitle}
                  className="flex min-w-0 gap-3 rounded-[16px] border border-[rgba(var(--rgb-line),0.1)] bg-[rgba(var(--rgb-film),0.026)] p-3"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[rgba(var(--rgb-glow),0.14)] text-accent-lavender">
                    <RowIcon size={17} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="wrap-break-word font-heading text-sm font-semibold text-text-primary">
                      {rowTitle}
                    </h3>
                    <p className="mt-1 wrap-break-word text-xs leading-5 text-text-muted">
                      {text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : null}
      </section>
    </motion.div>
  )
}

export default PageShell
