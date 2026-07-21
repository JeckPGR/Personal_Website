import { useEffect, useState } from 'react'
import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
} from 'framer-motion'

type SplashScreenProps = {
  onDone: () => void
}

const WIPE_EASE = [0.76, 0, 0.24, 1] as const

/** Each milestone the counter stops at, with the line it reveals there. */
const STEPS = [
  { at: 0, text: 'Searching Dzaky Razi...' },
  { at: 25, text: '2 years as Full Stack Developer' },
  { at: 45, text: 'Experienced Project Manager' },
  { at: 75, text: 'Deepening knowledge in Product Management' },
  { at: 90, text: 'Innovation & Digitalization enthusiast' },
  { at: 99, text: 'Extract completed' },
]

/** Seconds spent climbing to a milestone, resting on it, and the final push. */
const TRAVEL = 0.7
const HOLD = 1.05
const FINISH = 0.55
/** How long 100% stays on screen before the curtain lifts. */
const COMPLETE_HOLD_MS = 1100
/** Milliseconds per typed character. Must clear TRAVEL + HOLD on the longest line. */
const TYPE_SPEED_MS = 34

/**
 * Keyframes that climb, then sit still while the line types itself out.
 * Repeating each value produces the pause without a timer per step.
 */
const { values: KEYFRAMES, times: TIMES, total: TOTAL } = (() => {
  const values: number[] = []
  const stamps: number[] = []
  let elapsed = 0

  STEPS.forEach((step, index) => {
    if (index > 0) elapsed += TRAVEL
    values.push(step.at)
    stamps.push(elapsed)

    elapsed += HOLD
    values.push(step.at)
    stamps.push(elapsed)
  })

  elapsed += FINISH
  values.push(100)
  stamps.push(elapsed)

  return {
    values,
    times: stamps.map((stamp) => stamp / elapsed),
    total: elapsed,
  }
})()

/** Types a line out one character at a time, chatbot style. */
function Typewriter({ text, instant }: { text: string; instant: boolean }) {
  const [count, setCount] = useState(instant ? text.length : 0)

  useEffect(() => {
    if (count >= text.length) return
    // setState lives in the timer callback, so this never cascades renders.
    const timer = window.setTimeout(
      () => setCount((value) => value + 1),
      TYPE_SPEED_MS,
    )
    return () => window.clearTimeout(timer)
  }, [count, text.length])

  return <>{text.slice(0, count)}</>
}

function SplashScreen({ onDone }: SplashScreenProps) {
  const reduceMotion = useReducedMotion()
  const progress = useMotionValue(0)
  // The rail rides the raw value, so it glides instead of stepping per whole %.
  const railScale = useTransform(progress, [0, 100], [0, 1])
  const [percent, setPercent] = useState(0)

  useMotionValueEvent(progress, 'change', (value) => {
    setPercent(Math.round(value))
  })

  useEffect(() => {
    if (reduceMotion) {
      // Jump straight to the end; the counter subscription carries the state.
      progress.set(100)
      return
    }

    const controls = animate(progress, KEYFRAMES, {
      duration: TOTAL,
      times: TIMES,
      ease: 'easeInOut',
    })

    return () => controls.stop()
  }, [progress, reduceMotion])

  const complete = percent >= 100

  // Hold on 100% for a beat, then hand the screen over.
  useEffect(() => {
    if (!complete) return

    const timer = window.setTimeout(
      () => {
        sessionStorage.setItem('splashShown', 'true')
        onDone()
      },
      reduceMotion ? 200 : COMPLETE_HOLD_MS,
    )

    return () => window.clearTimeout(timer)
  }, [complete, onDone, reduceMotion])

  // Derived during render — no effect, no extra state to fall out of sync.
  const stepIndex = STEPS.reduce(
    (current, step, index) => (percent >= step.at ? index : current),
    0,
  )
  const activeStep = STEPS[stepIndex]

  return (
    <motion.div
      className="fixed inset-0 z-9999 overflow-hidden bg-[var(--app-curtain)]"
      initial={{ opacity: 1, scale: 1 }}
      // The curtain and the app underneath share a background, so a soft
      // fade-and-lift reads as one continuous move instead of a hard cut.
      exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.05 }}
      transition={{ duration: reduceMotion ? 0.25 : 0.75, ease: WIPE_EASE }}
    >
      {/* Blueprint grid — shared vocabulary with the route transition */}
      <div className="absolute inset-0 opacity-[0.07] bg-[linear-gradient(rgba(var(--rgb-line),.6)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--rgb-line),.6)_1px,transparent_1px)] [background-size:48px_48px]" />

      {/* Ambient glow, brightening as the extract completes */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[130px] bg-[radial-gradient(circle,#7c50e0,transparent_70%)]"
        animate={{ opacity: complete ? 0.34 : 0.24 }}
        transition={{ duration: 0.6 }}
      />

      {/* HUD corner brackets */}
      <span className="absolute left-5 top-5 h-8 w-8 border-l border-t border-[rgba(var(--rgb-line),0.35)] sm:left-8 sm:top-8" />
      <span className="absolute right-5 top-5 h-8 w-8 border-r border-t border-[rgba(var(--rgb-line),0.35)] sm:right-8 sm:top-8" />
      <span className="absolute bottom-5 left-5 h-8 w-8 border-b border-l border-[rgba(var(--rgb-line),0.35)] sm:bottom-8 sm:left-8" />
      <span className="absolute bottom-5 right-5 h-8 w-8 border-b border-r border-[rgba(var(--rgb-line),0.35)] sm:bottom-8 sm:right-8" />

      {/* Signature — centred at the bottom, clear of the corner brackets */}
      <div className="absolute inset-x-0 bottom-7 flex justify-center px-6 font-heading text-[11px] font-medium uppercase tracking-[0.28em] text-accent-lavender/40 sm:bottom-10">
        &copy; 2026 Dzaky Razi
      </div>

      <motion.div
        className="relative flex h-full flex-col justify-center px-6 sm:px-10"
        animate={
          complete && !reduceMotion ? { y: -18, opacity: 0.9 } : { y: 0, opacity: 1 }
        }
        transition={{ duration: 0.55, ease: WIPE_EASE }}
      >
        <div className="mx-auto w-full max-w-2xl">
          {/* Active line on the left, counter on the right, sharing a baseline */}
          <div className="flex items-end justify-between gap-6">
            <motion.p
              key={activeStep.text}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex min-w-0 items-center gap-2.5 text-[13px] leading-5 text-accent-lavender sm:text-[15px]"
            >
              <motion.span
                className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent-lavender shadow-[0_0_10px_rgba(var(--rgb-line),0.8)]"
                animate={reduceMotion ? undefined : { opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
              />
              <span className="min-w-0">
                <Typewriter
                  key={activeStep.text}
                  text={activeStep.text}
                  instant={Boolean(reduceMotion)}
                />
                <motion.span
                  className="ml-0.5 inline-block h-3.5 w-1.5 translate-y-0.5 bg-accent-lavender/80"
                  animate={reduceMotion ? undefined : { opacity: [1, 0, 1] }}
                  transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
                />
              </span>
            </motion.p>

            {/* No zero padding — the third digit only ever shows up at 100. */}
            <span className="shrink-0 font-heading text-[clamp(1.5rem,3.5vw,2.25rem)] font-bold leading-none tabular-nums tracking-tight text-text-primary">
              {percent}
              <span className="ml-1 text-[0.55em] font-bold text-accent-lavender/50">
                %
              </span>
            </span>
          </div>

          {/* Progress rail */}
          <div className="mt-4 h-px w-full overflow-hidden bg-[rgba(var(--rgb-line),0.14)]">
            <motion.div
              className="h-px w-full origin-left bg-[linear-gradient(90deg,var(--app-accent-purple),var(--app-accent-violet))] shadow-[0_0_12px_rgba(var(--rgb-line),0.6)]"
              style={{ scaleX: railScale }}
            />
          </div>

          {/* Captured log, centred under the rail. Height is reserved so the
              vertically-centred block never shifts as lines land. */}
          <div className="mt-7 flex min-h-44 flex-col items-center gap-2.5 text-center sm:min-h-36">
            {STEPS.slice(0, stepIndex).map((step) => (
              <motion.p
                key={step.text}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-2.5 text-[12px] leading-5 text-text-muted sm:text-[13px]"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent-lavender/30" />
                {step.text}
              </motion.p>
            ))}
          </div>
        </div>
      </motion.div>

      {/* A single accent line sweeps up as the curtain lifts — the old
          full-bleed magenta sheet flashed far brighter than either the splash
          or the app it hands over to. */}
      <motion.div
        className="pointer-events-none absolute inset-x-0 h-px bg-[linear-gradient(90deg,transparent,rgba(var(--rgb-line),0.7),transparent)] shadow-[0_0_24px_rgba(var(--rgb-hover),0.5)]"
        initial={{ top: '100%', opacity: 0 }}
        animate={
          complete && !reduceMotion
            ? { top: '-2%', opacity: [0, 1, 1, 0] }
            : { top: '100%', opacity: 0 }
        }
        transition={{ duration: 0.7, ease: WIPE_EASE }}
      />
    </motion.div>
  )
}

export default SplashScreen
