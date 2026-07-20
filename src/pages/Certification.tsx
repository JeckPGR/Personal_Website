import PageShell from '../components/PageShell'
import RevealList from '../components/RevealList'
import type { RevealItem } from '../components/RevealList'
import { certificationItems, educationItem } from '../data/portfolio'

const accents = ['#70aaff', '#c060f0', '#60d9aa', '#e090c8', '#c9bfff']

const certListItems: RevealItem[] = certificationItems.map((item, index) => ({
  id: `${item.issuer}-${item.title}`,
  title: item.title,
  meta: item.issuer,
  sub: item.period,
  accent: accents[index % accents.length],
  Icon: item.Icon,
  image: item.image,
}))

function Certification() {
  return (
    <PageShell
      tag="Certification"
      title="Certification"
      description="A compact record of product, project, and technology learning that supports my work across discovery, delivery, and implementation."
      gradient={educationItem.gradient}
      Icon={educationItem.Icon}
    >
      <RevealList items={certListItems} countLabel="Learning" />
    </PageShell>
  )
}

export default Certification
