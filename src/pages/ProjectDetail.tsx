import { Navigate, useParams } from 'react-router-dom'
import DetailView from '../components/DetailView'
import type { DetailMeta } from '../components/DetailView'
import { useCopy } from '../hooks/useCopy'
import { useLocalize } from '../hooks/useLocalize'
import { projects } from '../data/project'

function ProjectDetail() {
  const t = useCopy()
  const L = useLocalize()
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
      backLabel={t('detail.back')}
      eyebrow={project.context}
      title={project.title}
      description={L(project.description)}
      accent={project.accent}
      Icon={project.Icon}
      image={project.thumbnail}
      showcase={project.showcase}
      showcaseSlots={3}
      showcaseHeading={t('detail.projectShowcase')}
      proofLabel={t('detail.showcase')}
      showcaseFallbackNote={t('detail.noImageNote')}
      showcaseEmptyNote={t('detail.noImagePending')}
      externalUrl={project.website}
      meta={meta}
      tags={project.stack}
      points={L(project.keyPoints)}
      highlights={project.resultHighlights && L(project.resultHighlights)}
      quote={L(project.finalOutput)}
      quoteHeading={t('detail.speech')}
    />
  )
}

export default ProjectDetail
