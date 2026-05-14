import PageShell from '../components/PageShell'
import { roleItems, whatIDoItem } from '../data/portfolio'

function WhatIDo() {
  return (
    <PageShell
      tag={whatIDoItem.tag}
      title={whatIDoItem.title}
      gradient={whatIDoItem.gradient}
      Icon={whatIDoItem.Icon}
    >
      <div className="mt-6 grid gap-3 md:grid-cols-3">
        {roleItems.map(({ title, description, Icon }) => (
          <article
            key={title}
            className="rounded-lg border border-border bg-[rgba(255,255,255,0.02)] p-4"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[rgba(120,80,220,0.14)] text-accent-lavender">
              <Icon size={19} />
            </div>
            <h2 className="mt-4 font-heading text-sm font-semibold text-text-primary">
              {title}
            </h2>
            <p className="mt-2 text-xs leading-5 text-text-muted">
              {description}
            </p>
          </article>
        ))}
      </div>
    </PageShell>
  )
}

export default WhatIDo
