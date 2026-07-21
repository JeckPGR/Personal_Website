import { useMemo, useState } from 'react'
import { TbFolder } from 'react-icons/tb'
import PageShell from '../components/PageShell'
import RevealList from '../components/RevealList'
import type { RevealItem } from '../components/RevealList'
import { projects, tabs } from '../data/project'
import type { ProjectCategory } from '../data/project'
import { workItem } from '../data/portfolio'

function Project() {
  const [activeTab, setActiveTab] = useState<ProjectCategory>('Web-App')

  const visibleItems = useMemo<RevealItem[]>(
    () =>
      projects
        .filter((project) => project.category === activeTab)
        .map((project) => ({
          id: project.slug,
          title: project.title,
          meta: project.context.split(' / ')[1] ?? project.category,
          sub: project.context.split(' / ')[0],
          to: project.route,
          accent: project.accent,
          Icon: project.Icon,
          image: project.thumbnail,
        })),
    [activeTab],
  )

  return (
    <PageShell
      tag="Projects"
      title="Project Showcase"
      description="Selected project work grouped by platform. Hover a row for a quick preview, click to open the full case."
      gradient={workItem.gradient}
      Icon={TbFolder}
    >
      <div className="flex flex-wrap gap-3 lg:gap-2">
        {tabs.map(({ label, Icon }) => {
          const isActive = activeTab === label

          return (
            <button
              key={label}
              type="button"
              onClick={() => setActiveTab(label)}
              className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-xs font-semibold transition duration-200 ${
                isActive
                  ? 'border-[rgba(201,191,255,0.24)] bg-[rgba(124,80,224,0.24)] text-accent-lavender shadow-[0_0_22px_rgba(124,80,224,0.14)]'
                  : 'border-[rgba(201,191,255,0.12)] bg-[rgba(255,255,255,0.026)] text-text-muted hover:border-[rgba(201,191,255,0.22)] hover:text-text-secondary'
              }`}
            >
              <Icon size={16} />
              {label}
            </button>
          )
        })}
      </div>

      <div className="mt-7">
        <RevealList items={visibleItems} countLabel={activeTab} />
      </div>
    </PageShell>
  )
}

export default Project
