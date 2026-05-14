import PageShell from '../components/PageShell'
import { aboutHighlights, aboutItem } from '../data/portfolio'

function About() {
  return (
    <PageShell
      tag={aboutItem.tag}
      title={aboutItem.title}
      description={aboutItem.description}
      gradient={aboutItem.gradient}
      Icon={aboutItem.Icon}
      chips={aboutItem.chips}
      highlights={aboutHighlights}
    />
  )
}

export default About
