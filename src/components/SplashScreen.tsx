import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { MorphingText } from './ui/morphing-text'

type SplashScreenProps = {
  onDone: () => void
}

const SCENE_DURATION_MS = 3000
const EXIT_DURATION_MS = 3000
const EXIT_START_MS = SCENE_DURATION_MS * 5

const splashTexts = [
  'From writing code to shaping products.',
  'Because great experiences are built beyond the screen.',
  'User-focused. Data-informed. Built with intention.',
  'Welcome to my Portofolio.',
]

function SplashScreen({ onDone }: SplashScreenProps) {
  useEffect(() => {
    const doneTimer = window.setTimeout(() => {
      sessionStorage.setItem('splashShown', 'true')
      onDone()
    }, EXIT_START_MS)

    return () => {
      window.clearTimeout(doneTimer)
    }
  }, [onDone])

  return (
    <motion.div
      className="fixed inset-0 z-9999 flex items-center justify-center bg-base px-6 text-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: EXIT_DURATION_MS / 1000 }}
    >
      <motion.div
        className="flex min-h-37.5 w-full max-w-230 items-center justify-center"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{
          duration: 0.8,
          ease: 'easeOut',
        }}
      >
        <MorphingText
          texts={splashTexts}
          loop={false}
          morphDuration={1.05}
          pauseDuration={2.7}
          className="h-20 max-w-225 font-heading text-[clamp(1.55rem,4vw,3.6rem)] font-semibold leading-tight text-accent-lavender md:h-24 lg:text-[clamp(2.25rem,4.2vw,4.75rem)]"
        />
      </motion.div>
    </motion.div>
  )
}

export default SplashScreen
