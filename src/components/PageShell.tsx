import type { ReactNode } from 'react'
import type { IconType } from 'react-icons'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

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
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.3 }}
      className="flex min-w-0 flex-col gap-3 md:gap-[14px]"
    >
      <Link
        to="/"
        className="inline-flex w-fit items-center rounded-lg border border-border bg-surface px-3 py-2 text-xs font-medium text-text-secondary transition duration-200 hover:border-[rgba(150,100,255,0.35)] hover:text-accent-lavender"
      >
        &larr; Back
      </Link>
      <section
        className="relative flex h-36 items-center justify-center overflow-hidden rounded-[14px] border border-border sm:h-[200px]"
        style={{ background: gradient }}
      >
        <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(rgba(160,130,255,0.45)_1.4px,transparent_1.4px)] [background-size:18px_18px]" />
        <Icon className="relative z-10 text-[46px] text-accent-lavender opacity-40 sm:text-[58px]" />
      </section>
      <section className="min-w-0 rounded-[13px] border border-border bg-surface p-4 md:p-6">
        <span className="inline-flex rounded-full border border-border-accent bg-[rgba(120,80,220,0.12)] px-3 py-1 text-[10px] font-medium text-accent-lavender">
          {tag}
        </span>
        <h1 className="mt-4 break-words font-heading text-2xl font-bold text-text-primary md:text-4xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-4 max-w-3xl break-words text-sm leading-6 text-text-secondary">
            {description}
          </p>
        ) : null}
        {chips?.length ? (
          <div className="mt-5 flex flex-wrap gap-2">
            {chips.map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-border bg-surface-hover px-3 py-1 text-[11px] text-text-secondary"
              >
                {chip}
              </span>
            ))}
          </div>
        ) : null}
        {children}
      </section>
      {highlights?.length ? (
        <section className="min-w-0 rounded-[13px] border border-border bg-surface p-4 md:p-6">
          <h2 className="font-heading text-lg font-semibold text-[#e8e0ff]">
            Highlights
          </h2>
          <div className="mt-4 grid gap-3">
            {highlights.map(({ title: rowTitle, text, Icon: RowIcon }) => (
              <div
                key={rowTitle}
                className="flex min-w-0 gap-3 rounded-lg border border-border bg-[rgba(255,255,255,0.02)] p-3"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[rgba(120,80,220,0.14)] text-accent-lavender">
                  <RowIcon size={17} />
                </div>
                <div className="min-w-0">
                  <h3 className="break-words font-heading text-sm font-semibold text-text-primary">
                    {rowTitle}
                  </h3>
                  <p className="mt-1 break-words text-xs leading-5 text-text-muted">
                    {text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </motion.div>
  )
}

export default PageShell
