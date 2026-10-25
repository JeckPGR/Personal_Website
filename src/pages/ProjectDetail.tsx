import { Navigate, useParams } from 'react-router-dom'
import DetailView from '../components/DetailView'
import type { DetailMeta } from '../components/DetailView'
import { useCopy } from '../hooks/useCopy'
import { useLocalize } from '../hooks/useLocalize'
import { useLanguage } from '../hooks/useLanguage'
import { projects } from '../data/project'
import { getProjectCaseStudy } from '../content'
import { resolveLocalized } from '../content/schema.ts'
import { useDocumentHead } from '../hooks/useDocumentHead'

export function ProjectDetail() {
  const t = useCopy()
  const L = useLocalize()
  const { language } = useLanguage()
  const { slug } = useParams()

  const currentIndex = projects.findIndex((item) => item.slug === slug)
  const project = currentIndex !== -1 ? projects[currentIndex] : undefined
  const caseStudy = slug ? getProjectCaseStudy(slug) : undefined

  useDocumentHead({
    title: project ? `${project.title} - Project` : 'Project',
    description: project ? L(project.description) : '',
    ogType: 'article',
  })

  if (!project) return <Navigate to="/not-found" replace />

  // Looping next & prev based on projects array order
  const prevProject = projects[(currentIndex - 1 + projects.length) % projects.length]
  const nextProject = projects[(currentIndex + 1) % projects.length]
  const prevItem = {
    title: prevProject.title,
    to: prevProject.route || `/project/${prevProject.slug}`,
  }
  const nextItem = {
    title: nextProject.title,
    to: nextProject.route || `/project/${nextProject.slug}`,
  }

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
      prevItem={prevItem}
      nextItem={nextItem}
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
      businessProblem={caseStudy?.businessProblem ? resolveLocalized(caseStudy.businessProblem, language) : undefined}
      solutionFit={caseStudy?.solutionFit ? resolveLocalized(caseStudy.solutionFit, language) : undefined}
      systemFlow={caseStudy?.system}
      architecture={caseStudy?.architecture}
      scope={caseStudy?.scope ? { type: caseStudy.scope.type, summary: resolveLocalized(caseStudy.scope.summary, language) } : undefined}
    />
  )
}

export default ProjectDetail
