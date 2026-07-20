import { Navigate, useParams } from 'react-router-dom'
import DetailView from '../components/DetailView'
import type { DetailMeta } from '../components/DetailView'
import { projects } from '../data/project'

function ProjectDetail() {
  const { slug } = useParams()
  const project = projects.find((item) => item.slug === slug)

  if (!project) return <Navigate to="/not-found" replace />

  const [organization, focus] = project.context.split(' / ')
  const meta: DetailMeta[] = [
    { label: 'Category', value: project.category },
    { label: 'Client', value: organization ?? project.context },
  ]
  if (focus) meta.push({ label: 'Focus', value: focus })

  return (
    <DetailView
      backTo="/project"
      backLabel="Back to Projects"
      eyebrow={project.context}
      title={project.title}
      description={project.description}
      accent={project.accent}
      Icon={project.Icon}
      image={project.images[0]}
      showcase={project.proof}
      showcaseSlots={3}
      externalUrl={project.website}
      meta={meta}
      tags={project.stack}
      points={project.keyPoints}
      highlights={project.resultHighlights}
      quote={project.finalOutput}
      quoteHeading="Speech from Dzaky"
    />
  )
}

export default ProjectDetail
