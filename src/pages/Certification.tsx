import PageShell from '../components/PageShell'
import { certificationItems, educationItem } from '../data/portfolio'

function Certification() {
  return (
    <PageShell
      tag="Certification"
      title="Certification"
      description="A compact record of product, project, and technology learning that supports my work across discovery, delivery, and implementation."
      gradient={educationItem.gradient}
      Icon={educationItem.Icon}
    >
      <div className="grid gap-5 md:gap-5 lg:grid-cols-3 lg:gap-4">
        {certificationItems.map(
          ({ title, issuer, period, description, Icon }, index) => (
            <article
              key={`${issuer}-${title}`}
              className="relative overflow-hidden rounded-[18px] border border-[rgba(201,191,255,0.1)] bg-[rgba(255,255,255,0.026)] p-4 shadow-[0_18px_45px_rgba(0,0,0,0.16)] backdrop-blur-sm"
            >
              <span className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,rgba(201,191,255,0.74),rgba(124,80,224,0.2),transparent)]" />
              <div className="flex items-start justify-between gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[rgba(201,191,255,0.12)] bg-[rgba(120,80,220,0.14)] text-accent-lavender">
                  <Icon size={20} />
                </div>
                <span className="text-[10px] uppercase tracking-[0.16em] text-text-muted">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              <p className="mt-5 text-[10px] font-medium uppercase tracking-[0.18em] text-accent-lavender/60">
                {issuer}
              </p>
              <h2 className="mt-2 break-words font-heading text-lg font-bold leading-tight text-text-primary">
                {title}
              </h2>
              <p className="mt-2 text-xs text-text-muted">{period}</p>
              <p className="mt-4 text-sm leading-6 text-text-secondary">
                {description}
              </p>
            </article>
          ),
        )}
      </div>
    </PageShell>
  )
}

export default Certification
