import type { CaseStudy } from '../../content/schema'
import { resolveLocalized } from '../../content/schema'
import { useLanguage } from '../../hooks/useLanguage'

type ScopeStripProps = {
  caseStudy: CaseStudy
}

const SCOPE_LABELS = {
  solo: { en: 'SOLO OWNER', id: 'SOLO OWNER', class: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20' },
  lead: { en: 'LEAD', id: 'LEAD', class: 'bg-purple-500/10 text-purple-300 border-purple-500/20' },
  contributor: { en: 'CONTRIBUTOR', id: 'KONTRIBUTOR', class: 'bg-blue-500/10 text-blue-300 border-blue-500/20' },
}

const STATUS_LABELS = {
  live: { en: 'LIVE IN PRODUCTION', id: 'LIVE DI PRODUKSI', class: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
  beta: { en: 'BETA / TESTING', id: 'BETA / PENGUJIAN', class: 'text-amber-300 bg-amber-500/10 border-amber-500/20' },
  internal: { en: 'INTERNAL POC', id: 'POC INTERNAL', class: 'text-blue-300 bg-blue-500/10 border-blue-500/20' },
  archived: { en: 'ARCHIVED', id: 'ARSIP', class: 'text-text-muted bg-white/5 border-white/10' },
}

export function ScopeStrip({ caseStudy }: ScopeStripProps) {
  const { language } = useLanguage()
  const scopeConf = SCOPE_LABELS[caseStudy.scope.type]
  const statusConf = STATUS_LABELS[caseStudy.status]
  const summaryText = resolveLocalized(caseStudy.scope.summary, language)

  return (
    <div className="rounded-2xl border border-[rgba(var(--rgb-line),0.14)] bg-[rgba(var(--rgb-film),0.02)] p-4 sm:p-6 backdrop-blur-md">
      {/* Scope Metas */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[rgba(var(--rgb-line),0.08)] pb-4">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <span
            className={`inline-flex items-center rounded-lg border px-2.5 py-1 font-mono text-[10px] font-bold tracking-wider ${scopeConf.class}`}
          >
            {scopeConf[language]}
          </span>
          <span
            className={`inline-flex items-center rounded-lg border px-2.5 py-1 font-mono text-[10px] font-semibold tracking-wider ${statusConf.class}`}
          >
            {statusConf[language]}
          </span>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs text-text-muted">
          <span>{caseStudy.period.start} → {caseStudy.period.end}</span>
          {caseStudy.org?.name && (
            <>
              <span className="text-accent-lavender/30">•</span>
              <span className="text-text-secondary">{caseStudy.org.name}</span>
            </>
          )}
        </div>
      </div>

      {/* Owned Scope Sentence */}
      {summaryText && (
        <div className="mt-4 flex items-start gap-2.5 text-xs sm:text-sm leading-relaxed text-text-primary">
          <span className="mt-0.5 inline-block text-accent-lavender font-bold">↳</span>
          <p>
            <strong className="text-accent-lavender">
              {language === 'id' ? 'Tanggung Jawab yang Dipegang: ' : 'Owned Responsibility: '}
            </strong>
            {summaryText}
          </p>
        </div>
      )}
    </div>
  )
}

export default ScopeStrip
