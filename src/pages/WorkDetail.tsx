import { Navigate, useParams } from 'react-router-dom'
import DetailView from '../components/DetailView'
import { useCopy } from '../hooks/useCopy'
import { useLocalize } from '../hooks/useLocalize'
import { workExperiences } from '../data/work'

function WorkDetail() {
  const t = useCopy()
  const L = useLocalize()
  const { slug } = useParams()
  const item = workExperiences.find((work) => work.slug === slug)

  if (!item) return <Navigate to="/work" replace />

  return (
    <DetailView
      backTo="/work"
      backLabel={t('detail.back')}
      eyebrow={item.tag}
      title={item.company}
      description={L(item.summary)}
      accent={item.accent}
      Icon={item.Icon}
      image={item.thumbnail}
      showcase={item.showcase}
      showcaseSlots={3}
      showcaseHeading={t('detail.journeyProof')}
      proofLabel={t('detail.journey')}
      showcaseFallbackNote={t('detail.noImageNote')}
      showcaseEmptyNote={t('detail.noImagePending')}
      externalUrl={item.website}
      meta={[
        { label: 'Role', value: item.role },
        { label: 'Period', value: L(item.period) },
        { label: 'Location', value: item.location },
      ]}
      tags={item.tags}
      tagsHeading={t('detail.focusAreas')}
      points={L(item.bullets)}
      pointsHeading={t('detail.responsibilities')}
      highlights={L(item.highlights)}
      highlightsHeading={t('detail.keyResults')}
      quote={L(item.reflection)}
      quoteHeading={t('detail.reflection')}
    />
  )
}

export default WorkDetail