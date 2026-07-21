import { useMemo } from 'react'
import { TbBriefcase } from 'react-icons/tb'
import PageShell from '../components/PageShell'
import { useCopy } from '../hooks/useCopy'
import { useLocalize } from '../hooks/useLocalize'
import RevealList from '../components/RevealList'
import type { RevealItem } from '../components/RevealList'
import { workExperiences } from '../data/work'

function Work() {
  const t = useCopy()
  const L = useLocalize()

  const workListItems = useMemo<RevealItem[]>(
    () =>
      workExperiences.map((item) => ({
        id: item.slug,
        title: item.company,
        meta: item.tag,
        sub: L(item.period),
        to: item.route,
        accent: item.accent,
        Icon: item.Icon,
        image: item.thumbnail,
      })),
    [L],
  )

  return (
    <PageShell
      tag={t('work.tag')}
      title={t('work.title')}
      description={t('work.description')}
      gradient="linear-gradient(135deg, #0a0520, #180830)"
      Icon={TbBriefcase}
    >
      <RevealList items={workListItems} countLabel={t('work.count')} />
    </PageShell>
  )
}

export default Work
