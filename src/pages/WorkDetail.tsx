import { Navigate, useParams } from 'react-router-dom'
import PageShell from '../components/PageShell'
import { workItems } from '../data/portfolio'

function WorkDetail() {
  const { slug } = useParams()
  const item = workItems.find((work) => work.slug === slug)

  if (!item) {
    return <Navigate to="/work" replace />
  }

  return (
    <PageShell
      tag={item.tag}
      title={item.title}
      description={item.description}
      gradient={item.gradient}
      Icon={item.Icon}
      chips={item.chips}
    />
  )
}

export default WorkDetail
