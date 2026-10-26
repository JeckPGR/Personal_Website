import type { CaseStudyResult, EvidenceType } from '../../content/schema'
import { resolveLocalized } from '../../content/schema'
import { useLanguage } from '../../hooks/useLanguage'

type ResultCardProps = {
  result: CaseStudyResult
}

const EVIDENCE_CONFIG: Record<
  EvidenceType,
  { label: { en: string; id: string }; badgeClass: string; dotClass: string }
> = {
  measured: {
    label: { en: 'MEASURED PROOF', id: 'BUKTI TERUKUR' },
    badgeClass: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/25',
    dotClass: 'bg-emerald-400',
  },
  estimated: {
    label: { en: 'ESTIMATED IMPACT', id: 'ESTIMASI TERUKUR' },
    badgeClass: 'bg-amber-500/10 text-amber-300 border-amber-500/25',
    dotClass: 'bg-amber-400',
  },
  qualitative: {
    label: { en: 'QUALITATIVE SHIFT', id: 'PERUBAHAN KUALITATIF' },
    badgeClass: 'bg-blue-500/10 text-blue-300 border-blue-500/25',
    dotClass: 'bg-blue-400',
  },
}

export function ResultCard({ result }: ResultCardProps) {
  const { language } = useLanguage()
  const conf = EVIDENCE_CONFIG[result.evidence]
  const labelText = resolveLocalized(result.label, language)
  const noteText = resolveLocalized(result.note, language)

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl border border-[rgba(var(--rgb-line),0.12)] bg-[rgba(10,9,20,0.85)] p-5 sm:p-6 transition-all duration-300 hover:border-accent-lavender/40 hover:shadow-[0_0_24px_rgba(var(--rgb-glow),0.12)]">
      {/* Evidence Tag */}
      <div className="flex items-center justify-between">
        <span
          className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 font-heading text-[10px] font-bold tracking-wide ${conf.badgeClass}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${conf.dotClass}`} />
          {conf.label[language]}
        </span>
      </div>

      {/* Main Metric Value */}
      <div className="my-4">
        <p className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight text-text-primary">
          {result.value}
        </p>
        <p className="mt-2 text-xs sm:text-sm text-text-secondary leading-relaxed">
          {labelText}
        </p>
      </div>

      {/* Measurement Note */}
      {noteText && (
        <div className="mt-2 border-t border-[rgba(var(--rgb-line),0.08)] pt-2.5 text-[11px] text-text-muted leading-normal">
          <span className="font-mono text-accent-lavender/60">ℹ </span>
          {noteText}
        </div>
      )}
    </div>
  )
}

export default ResultCard
