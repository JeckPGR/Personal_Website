import type { ReactNode } from 'react'
import type { IconType } from 'react-icons'
import { motion } from 'framer-motion'

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
  gradient,
  Icon,
  chips,
  highlights,
  children,
}: PageShellProps) {
  const watermark = title.split(' ')[0]?.toUpperCase() || tag.toUpperCase()

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
        <div className="pointer-events-none absolute -right-12 top-8 font-heading text-[6rem] font-bold leading-none text-accent-lavender/[0.035] md:text-[10rem] lg:text-[15rem]">
          {watermark}
        </div>
        <div className="pointer-events-none absolute bottom-8 left-7.5 top-8 z-0 md:left-[18%]">
          <div className="h-full w-px bg-[linear-gradient(180deg,transparent,rgba(124,80,224,0.62)_10%,rgba(201,191,255,0.18)_88%,transparent)]" />
        </div>
        <div
          className="pointer-events-none absolute right-8 top-8 hidden h-28 w-28 items-center justify-center rounded-[28px] border border-[rgba(201,191,255,0.12)] opacity-70 md:flex"
          style={{ background: gradient }}
        >
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(rgba(255,255,255,0.42)_1.1px,transparent_1.1px)] bg-size-[16px_16px]" />
          <Icon className="relative z-10 text-[42px] text-accent-lavender opacity-70" />
        </div>

        <div className="relative z-10 ml-10 max-w-3xl md:ml-[21%]">
          <span className="inline-flex rounded-full border border-border-accent bg-[rgba(120,80,220,0.12)] px-3 py-1 text-[10px] font-medium text-accent-lavender">
            {tag} /&gt;
          </span>
          <h1 className="mt-4 max-w-3xl wrap-break-word font-heading text-3xl font-bold leading-tight text-text-primary md:text-4xl lg:text-5xl">
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
                  className="rounded-full border border-[rgba(201,191,255,0.12)] bg-[rgba(255,255,255,0.026)] px-3 py-1 text-[11px] text-text-secondary"
                >
                  {chip}
                </span>
              ))}
            </div>
          ) : null}
        </div>

        {children ? <div className="relative z-10 mt-10 lg:mt-8">{children}</div> : null}

        {highlights?.length ? (
          <section className="relative z-10 mt-10 min-w-0 rounded-[18px] border border-[rgba(201,191,255,0.1)] bg-[rgba(255,255,255,0.022)] p-4 shadow-[0_18px_45px_rgba(0,0,0,0.16)] backdrop-blur-sm md:p-5 lg:mt-8">
            <h2 className="font-heading text-lg font-semibold text-[#e8e0ff]">
              Highlights
            </h2>
            <div className="mt-5 grid gap-5 lg:mt-4 lg:gap-3">
              {highlights.map(({ title: rowTitle, text, Icon: RowIcon }) => (
                <div
                  key={rowTitle}
                  className="flex min-w-0 gap-3 rounded-[16px] border border-[rgba(201,191,255,0.1)] bg-[rgba(255,255,255,0.026)] p-3"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[rgba(120,80,220,0.14)] text-accent-lavender">
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
