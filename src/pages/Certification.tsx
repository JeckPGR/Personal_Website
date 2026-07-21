import { useMemo } from 'react'
import PageShell from '../components/PageShell'
import { useCopy } from '../hooks/useCopy'
import { useLocalize } from '../hooks/useLocalize'
import RevealList from '../components/RevealList'
import type { RevealItem } from '../components/RevealList'
import { certificationItems, educationItem } from '../data/portfolio'

const accents = ['#70aaff', '#c060f0', '#60d9aa', '#e090c8', '#c9bfff']

function Certification() {
  const t = useCopy()
  const L = useLocalize()

  const certListItems = useMemo<RevealItem[]>(
    () =>
      certificationItems.map((item, index) => ({
        id: `${item.issuer}-${item.title}`,
        title: item.title,
        meta: item.issuer,
        sub: L(item.period),
        accent: accents[index % accents.length],
        Icon: item.Icon,
        image: item.image,
      })),
    [L],
  )

  return (
    <PageShell
      tag={t('certification.tag')}
      title={t('certification.title')}
      description={t('certification.description')}
      gradient={educationItem.gradient}
      Icon={educationItem.Icon}
    >
      <RevealList items={certListItems} countLabel={t('certification.count')} />
    </PageShell>
  )
}

export default Certification
