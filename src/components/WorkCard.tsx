import type { MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import type { WorkItem } from '../data/portfolio'

type WorkCardProps = {
  item: WorkItem
}

function WorkCard({ item }: WorkCardProps) {
  const Icon = item.Icon

  const stopCardNavigation = (event: MouseEvent<HTMLAnchorElement>) => {
    event.stopPropagation()
  }

  return (
    <Link
      to={item.route}
      onClick={stopCardNavigation}
      className="min-w-0 overflow-hidden rounded-lg border border-border bg-surface transition duration-200 hover:border-[rgba(150,100,255,0.35)]"
    >
      <div
        className="flex h-11 items-center justify-center sm:h-[54px]"
        style={{ background: item.gradient }}
      >
        <Icon className={`text-lg opacity-70 ${item.iconClassName}`} />
      </div>
      <div className="min-w-0 p-2.5 sm:p-3">
        <span
          className={`inline-flex max-w-full rounded border border-current/25 px-2 py-0.5 text-[8px] font-semibold uppercase sm:text-[9px] ${item.tagClassName}`}
        >
          {item.tag}
        </span>
        <h3 className="mt-2 break-words font-heading text-xs font-semibold text-text-primary">
          {item.title}
        </h3>
        <p className="mt-1 break-words text-[10px] text-text-muted">
          {item.subtitle}
        </p>
      </div>
    </Link>
  )
}

export default WorkCard
