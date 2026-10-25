import { Link } from 'react-router-dom'
import { TbArrowUpRight } from 'react-icons/tb'
import type { CaseStudy } from '../../content/schema'
import { resolveLocalized } from '../../content/schema'
import { useLanguage } from '../../hooks/useLanguage'

type CaseStudyCardProps = {
  caseStudy: CaseStudy
}

const SCOPE_BADGE = {
  solo: { en: 'SOLO', id: 'SOLO', class: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
  lead: { en: 'LEAD', id: 'LEAD', class: 'bg-purple-500/10 text-purple-300 border-purple-500/20' },
  contributor: { en: 'CONTRIBUTOR', id: 'KONTRIBUTOR', class: 'bg-blue-500/10 text-blue-300 border-blue-500/20' },
}

const CATEGORY_NAMES = {
  'web-app': { en: 'Web App', id: 'Web App' },
  mobile: { en: 'Mobile App', id: 'Mobile App' },
  'automation-bot': { en: 'Automation & Bot', id: 'Automation & Bot' },
}

export function CaseStudyCard({ caseStudy }: CaseStudyCardProps) {
  const { language } = useLanguage()
  const to = caseStudy.kind === 'work' ? `/work/${caseStudy.slug}` : `/project/${caseStudy.slug}`
  const titleText = resolveLocalized(caseStudy.title, language)
  const taglineText = resolveLocalized(caseStudy.tagline, language)

  // Grab the first valid result for preview
  const featuredResult = caseStudy.results && caseStudy.results.length > 0 ? caseStudy.results[0] : null
  const resultLabel = featuredResult ? resolveLocalized(featuredResult.label, language) : ''

  const scope = SCOPE_BADGE[caseStudy.scope.type]
  const categoryLabel = caseStudy.category ? CATEGORY_NAMES[caseStudy.category]?.[language] : null

  return (
    <Link
      to={to}
      className="group relative flex flex-col justify-between rounded-2xl border border-[rgba(var(--rgb-line),0.12)] bg-[rgba(10,9,20,0.7)] p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent-lavender/40 hover:bg-[rgba(12,10,24,0.88)] hover:shadow-[0_0_30px_rgba(var(--rgb-glow),0.14)]"
    >
      <div>
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 mb-4">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex items-center rounded-md border px-2 py-0.5 font-mono text-[9px] font-bold tracking-wider ${scope.class}`}
            >
              {scope[language]}
            </span>

            {categoryLabel && (
              <span className="inline-flex items-center rounded-md border border-[rgba(var(--rgb-line),0.14)] bg-white/5 px-2 py-0.5 font-mono text-[9px] font-medium text-accent-lavender">
                {categoryLabel}
              </span>
            )}

            {caseStudy.org?.name && (
              <span className="font-mono text-[10px] text-text-muted truncate max-w-[160px]">
                {caseStudy.org.name}
              </span>
            )}
          </div>

          <span className="grid h-7 w-7 place-items-center rounded-full border border-[rgba(var(--rgb-line),0.1)] text-text-muted transition-colors group-hover:border-accent-lavender/40 group-hover:bg-accent-lavender/10 group-hover:text-accent-lavender">
            <TbArrowUpRight size={16} />
          </span>
        </div>

        {/* Title */}
        <h3 className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-text-primary transition-colors group-hover:text-accent-lavender">
          {titleText}
        </h3>

        {/* One-line problem / Tagline */}
        {taglineText && (
          <p className="mt-2.5 text-xs sm:text-sm text-text-secondary leading-relaxed line-clamp-2">
            {taglineText}
          </p>
        )}
      </div>

      {/* Bottom Section: Featured Result or Period */}
      <div className="mt-6 border-t border-[rgba(var(--rgb-line),0.08)] pt-4 flex flex-wrap items-center justify-between gap-3">
        {featuredResult ? (
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="font-heading text-sm sm:text-base font-extrabold text-accent-lavender">
              {featuredResult.value}
            </span>
            <span className="font-mono text-[10px] text-text-muted truncate">
              {resultLabel}
            </span>
          </div>
        ) : (
          <span className="font-mono text-[11px] text-text-muted">
            {caseStudy.period.start} → {caseStudy.period.end}
          </span>
        )}

        <span className="font-mono text-[10px] text-accent-lavender/60 group-hover:text-accent-lavender transition-colors">
          {language === 'id' ? 'Buka Studi Kasus →' : 'Read Case Study →'}
        </span>
      </div>
    </Link>
  )
}

export default CaseStudyCard
