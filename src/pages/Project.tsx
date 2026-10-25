import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { TbFolder } from 'react-icons/tb'
import PageShell from '../components/PageShell'
import RevealList, { type RevealItem } from '../components/RevealList'
import { useCopy } from '../hooks/useCopy'
import { useLanguage } from '../hooks/useLanguage'
import { useDocumentHead } from '../hooks/useDocumentHead'
import { projects, tabs, type ProjectCategory } from '../data/project'
import { workItem } from '../data/portfolio'

export function Project() {
  const t = useCopy()
  const { language } = useLanguage()
  const [searchParams, setSearchParams] = useSearchParams()

  const categoryParam = searchParams.get('category')
  const initialTab: ProjectCategory = tabs.some(
    (tab) => tab.label.toLowerCase() === categoryParam?.toLowerCase(),
  )
    ? tabs.find((tab) => tab.label.toLowerCase() === categoryParam?.toLowerCase())!.label
    : 'Web-App'

  const [activeTab, setActiveTab] = useState<ProjectCategory>(initialTab)

  const handleSelectTab = (label: ProjectCategory) => {
    setActiveTab(label)
    if (label === 'Web-App') {
      searchParams.delete('category')
      setSearchParams(searchParams, { replace: true })
    } else {
      searchParams.set('category', label.toLowerCase())
      setSearchParams(searchParams, { replace: true })
    }
  }

  const visibleItems = useMemo<RevealItem[]>(
    () =>
      projects
        .filter((project) => project.category === activeTab)
        .map((project) => {
          const parts = project.context.split(' / ')
          return {
            id: project.slug,
            title: project.title,
            meta: parts[1] ?? project.category,
            sub: parts[0] ?? '',
            to: project.route,
            accent: project.accent,
            Icon: project.Icon,
            image: project.thumbnail,
          }
        }),
    [activeTab],
  )

  useDocumentHead({
    title: language === 'id' ? 'Showcase Proyek' : 'Project Showcase',
    description:
      language === 'id'
        ? 'Kumpulan proyek pilihan berdasarkan platform. Arahkan kursor untuk pratinjau cepat, klik untuk membuka studi kasus lengkap.'
        : 'Selected project work grouped by platform. Hover a row for a quick preview, click to open the full case.',
  })

  return (
    <PageShell
      tag={t('project.tag')}
      title={t('project.title')}
      description={t('project.description')}
      gradient={workItem.gradient}
      Icon={TbFolder}
    >
      <div className="flex flex-wrap gap-3 lg:gap-2" role="tablist">
        {tabs.map(({ label, Icon }) => {
          const isActive = activeTab === label
          return (
            <button
              key={label}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => handleSelectTab(label)}
              className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-xs font-semibold transition duration-200 ${
                isActive
                  ? 'border-[rgba(var(--rgb-line),0.24)] bg-[rgba(var(--rgb-glow),0.24)] text-accent-lavender shadow-[0_0_22px_rgba(var(--rgb-glow),0.14)]'
                  : 'border-[rgba(var(--rgb-line),0.12)] bg-[rgba(var(--rgb-film),0.026)] text-text-muted hover:border-[rgba(var(--rgb-line),0.22)] hover:text-text-secondary'
              }`}
            >
              <Icon size={16} />
              {label}
            </button>
          )
        })}
      </div>

      <div className="mt-7">
        <RevealList items={visibleItems} countLabel={activeTab.toUpperCase()} />
      </div>
    </PageShell>
  )
}

export default Project
