import { Navigate, useParams } from 'react-router-dom'
import DetailView from '../components/DetailView'
import { workExperiences } from '../data/work'

function WorkDetail() {
  const { slug } = useParams()
  const item = workExperiences.find((work) => work.slug === slug)

  if (!item) return <Navigate to="/work" replace />

  return (
    <DetailView
      backTo="/work"
      backLabel="Back to Work"
      eyebrow={item.tag}
      title={item.company}
      description={item.summary}
      accent={item.accent}
      Icon={item.Icon}
      image={item.image}
      showcase={item.proof}
      externalUrl={item.website}
      meta={[
        { label: 'Role', value: item.role },
        { label: 'Period', value: item.period },
        { label: 'Location', value: item.location },
      ]}
      tags={item.tags}
      tagsHeading="Focus Areas"
      points={item.bullets}
      pointsHeading="Responsibilities & Impact"
      highlights={item.highlights}
      highlightsHeading="Key Results"
      quote={item.reflection}
      quoteHeading="Reflection"
    />
  )
}

export default WorkDetail