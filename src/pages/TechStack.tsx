import PageShell from '../components/PageShell'
import { techStackItem, techTools } from '../data/portfolio'

function TechStack() {
  return (
    <PageShell
      tag={techStackItem.tag}
      title={techStackItem.title}
      gradient={techStackItem.gradient}
      Icon={techStackItem.Icon}
    >
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {techTools.map(({ name, category, Icon }) => (
          <article
            key={name}
            className="rounded-lg border border-border bg-[rgba(var(--rgb-film),0.02)] p-4"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[rgba(var(--rgb-glow),0.14)] text-[rgba(160,130,220,0.85)]">
              <Icon size={19} />
            </div>
            <h2 className="mt-4 font-heading text-sm font-semibold text-text-primary">
              {name}
            </h2>
            <p className="mt-1 text-xs text-text-muted">{category}</p>
          </article>
        ))}
      </div>
    </PageShell>
  )
}

export default TechStack
