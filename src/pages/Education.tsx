import PageShell from '../components/PageShell'
import { educationHighlights, educationItem } from '../data/portfolio'

function Education() {
  return (
    <PageShell
      tag={educationItem.tag}
      title={educationItem.title}
      gradient={educationItem.gradient}
      Icon={educationItem.Icon}
      highlights={educationHighlights}
    />
  )
}

export default Education
