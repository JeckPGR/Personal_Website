import type { TechStackGroup } from '../../content/schema'
import { useLanguage } from '../../hooks/useLanguage'

type TechStackGroupsProps = {
  groups: TechStackGroup[]
  hasClassified?: boolean
}

export function TechStackGroups({ groups, hasClassified = false }: TechStackGroupsProps) {
  const { language } = useLanguage()

  if (!groups || groups.length === 0) return null

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {groups.map((group) => (
          <div
            key={group.group}
            className="rounded-2xl border border-[rgba(var(--rgb-line),0.1)] bg-[rgba(10,9,20,0.65)] p-4 sm:p-5"
          >
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-accent-lavender mb-3">
              {group.group}
            </h4>
            <div className="flex flex-wrap gap-2">
              {group.items.map((tool) => (
                <span
                  key={tool}
                  className="inline-flex items-center rounded-lg border border-[rgba(var(--rgb-line),0.14)] bg-[rgba(var(--rgb-line),0.04)] px-2.5 py-1 text-xs font-medium text-text-primary transition-colors hover:border-accent-lavender/40"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {hasClassified && (
        <p className="font-mono text-[11px] text-text-muted italic">
          {language === 'id'
            ? '* Beberapa komponen pendukung dirahasiakan (Undisclosed).'
            : '* Some supporting components are undisclosed.'}
        </p>
      )}
    </div>
  )
}

export default TechStackGroups
