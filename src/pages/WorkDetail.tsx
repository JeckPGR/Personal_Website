import { Navigate, useParams } from 'react-router-dom'
import DetailView from '../components/DetailView'
import { useCopy } from '../hooks/useCopy'
import { useLocalize } from '../hooks/useLocalize'
import { useLanguage } from '../hooks/useLanguage'
import { workExperiences } from '../data/work'
import { getWorkCaseStudy } from '../content'
import { resolveLocalized } from '../content/schema.ts'
import { useDocumentHead } from '../hooks/useDocumentHead'

export function WorkDetail() {
  const t = useCopy()
  const L = useLocalize()
  const { language } = useLanguage()
  const { slug } = useParams()

  const currentIndex = workExperiences.findIndex((work) => work.slug === slug)
  const item = currentIndex !== -1 ? workExperiences[currentIndex] : undefined
  const caseStudy = slug ? getWorkCaseStudy(slug) : undefined

  useDocumentHead({
    title: item ? `${item.company} - Experience` : 'Work Experience',
    description: item ? L(item.summary) : '',
    ogType: 'article',
  })

  if (!item) return <Navigate to="/work" replace />

  // Looping next & prev based on workExperiences array order
  const prevWork = workExperiences[(currentIndex - 1 + workExperiences.length) % workExperiences.length]
  const nextWork = workExperiences[(currentIndex + 1) % workExperiences.length]
  const prevItem = {
    title: prevWork.company,
    to: `/work/${prevWork.slug}`,
  }
  const nextItem = {
    title: nextWork.company,
    to: `/work/${nextWork.slug}`,
  }

  return (
    <DetailView
      backTo="/work"
      backLabel={t('detail.back')}
      prevItem={prevItem}
      nextItem={nextItem}
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
      businessProblem={caseStudy?.businessProblem ? resolveLocalized(caseStudy.businessProblem, language) : undefined}
      solutionFit={caseStudy?.solutionFit ? resolveLocalized(caseStudy.solutionFit, language) : undefined}
      systemFlow={caseStudy?.system}
      architecture={caseStudy?.architecture}
      scope={caseStudy?.scope ? { type: caseStudy.scope.type, summary: resolveLocalized(caseStudy.scope.summary, language) } : undefined}
    />
  )
}

export default WorkDetail