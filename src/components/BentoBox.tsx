import type { CSSProperties, KeyboardEvent, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import type { BentoItem } from '../data/portfolio'

type BentoBoxProps = {
  item: BentoItem
  children?: ReactNode
}

const spanClasses = {
  1: 'lg:col-span-1',
  2: 'lg:col-span-2',
  3: 'lg:col-span-3',
}

function BentoBox({ item, children }: BentoBoxProps) {
  const navigate = useNavigate()
  const Icon = item.Icon

  const openRoute = () => navigate(item.route)

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      openRoute()
    }
  }

  return (
    <article
      role="link"
      tabIndex={0}
      onClick={openRoute}
      onKeyDown={handleKeyDown}
      className={`group col-span-1 min-w-0 cursor-pointer overflow-hidden rounded-xl border border-border bg-surface transition duration-200 ease-out hover:scale-[1.01] hover:border-[rgba(150,100,255,0.35)] md:rounded-[13px] ${spanClasses[item.span]}`}
    >
      <div
        className="relative flex h-(--cover-mobile) items-center justify-center overflow-hidden border-b border-border sm:h-(--cover-height)"
        style={
          {
            '--cover-height': `${item.coverHeight}px`,
            '--cover-mobile': `${Math.max(item.coverHeight - 28, 56)}px`,
            background: item.gradient,
          } as CSSProperties
        }
      >
        <div className="absolute inset-0 opacity-35 bg-[radial-gradient(rgba(160,130,255,0.45)_1.4px,transparent_1.4px)] bg-size-[17px_17px]" />
        <Icon className="relative z-10 text-[26px] text-accent-lavender opacity-35 transition duration-200 group-hover:opacity-55 sm:text-[30px]" />
      </div>
      <div className="min-w-0 p-3 sm:p-3.5">
        <h2 className="wrap-break-word font-heading text-[13px] font-semibold text-[#e8e0ff] sm:text-sm">
          {item.title}
        </h2>
        <p className="mt-1 wrap-break-words font-body text-[11px] leading-4 text-[#7a72a8] sm:text-xs">
          {item.subtitle}
        </p>
        <p className="mt-2 text-[9px] font-medium text-[rgba(160,130,255,0.45)] sm:mt-3">
          Click to explore &rarr;
        </p>
      </div>
      {children}
    </article>
  )
}

export default BentoBox
