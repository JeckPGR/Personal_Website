import { TbBriefcase } from 'react-icons/tb'
import PageShell from '../components/PageShell'
import RevealList from '../components/RevealList'
import type { RevealItem } from '../components/RevealList'
import { workExperiences } from '../data/work'

const workListItems: RevealItem[] = workExperiences.map((item) => ({
  id: item.slug,
  title: item.company,
  meta: item.tag,
  sub: item.period,
  to: item.route,
  accent: item.accent,
  Icon: item.Icon,
  image: item.thumbnail,
}))

function Work() {
  return (
    <PageShell
      tag="Work"
      title="Work experience."
      description="Roles across enterprise teams and internal platform work. Hover a row for a quick preview, click to open the full breakdown."
      gradient="linear-gradient(135deg, #0a0520, #180830)"
      Icon={TbBriefcase}
    >
      <RevealList items={workListItems} countLabel="All experience" />
    </PageShell>
  )
}

export default Work
