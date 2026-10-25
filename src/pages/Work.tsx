import { useMemo } from 'react'
import { TbBriefcase } from 'react-icons/tb'
import PageShell from '../components/PageShell'
import { useCopy } from '../hooks/useCopy'
import { useLocalize } from '../hooks/useLocalize'
import { useLanguage } from '../hooks/useLanguage'
import { useDocumentHead } from '../hooks/useDocumentHead'
import RevealList, { type RevealItem } from '../components/RevealList'
import { workExperiences } from '../data/work'

export function Work() {
  const t = useCopy()
  const L = useLocalize()
  const { language } = useLanguage()

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

  useDocumentHead({
    title: language === 'id' ? 'Pengalaman Kerja' : 'Work Experience',
    description:
      language === 'id'
        ? 'Rekam jejak pengalaman kerja dan kontribusi rekayasa sistem nyata.'
        : 'Track record of work experience and real-world system engineering contributions.',
  })

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
