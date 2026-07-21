import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, animate, motion, useMotionValue, useReducedMotion, useTransform } from 'framer-motion'
import { SWAP_MS } from '../hooks/usePageTransition'

const WIPE_EASE = [0.76, 0, 0.24, 1] as const

/** "/work/telkom-property" → "TELKOM PROPERTY", "/" → "HOME" */
function routeLabel(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean)
  const last = segments[segments.length - 1]
  if (!last) return 'Home'
  return last.replace(/-/g, ' ')
}

type OverlayProps = {
  active: boolean
  /** Destination pathname — drives the HUD label */
  target: string
}

function PageTransitionOverlay({ active, target }: OverlayProps) {
  const reduceMotion = useReducedMotion()

  return createPortal(
    <AnimatePresence>
      {active ? (
        <motion.div
          key="page-transition"
          aria-hidden
          className="pointer-events-none fixed inset-0 z-9998 overflow-hidden"
        >
          {/* Layer 1 — accent sheet, leads the sweep */}
          <motion.div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, #c060f0 0%, #7c50e0 45%, #2a1358 100%)',
            }}
            initial={reduceMotion ? { opacity: 0 } : { clipPath: 'inset(100% 0% 0% 0%)' }}
            animate={reduceMotion ? { opacity: 1 } : { clipPath: 'inset(0% 0% 0% 0%)' }}
            exit={reduceMotion ? { opacity: 0 } : { clipPath: 'inset(0% 0% 100% 0%)' }}
            transition={{ duration: reduceMotion ? 0.2 : 0.46, ease: WIPE_EASE, delay: reduceMotion ? 0 : 0.09 }}
          />

          {/* Layer 2 — the dark stage the HUD lives on, trails by a beat */}
          <motion.div
            className="absolute inset-0 bg-[#07060f]"
            initial={reduceMotion ? { opacity: 0 } : { clipPath: 'inset(100% 0% 0% 0%)' }}
            animate={reduceMotion ? { opacity: 1 } : { clipPath: 'inset(0% 0% 0% 0%)' }}
            exit={reduceMotion ? { opacity: 0 } : { clipPath: 'inset(0% 0% 100% 0%)' }}
            transition={{ duration: reduceMotion ? 0.2 : 0.46, ease: WIPE_EASE, delay: reduceMotion ? 0 : 0.16 }}
          >
            <HudScene target={target} reduceMotion={Boolean(reduceMotion)} />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  )
}

function HudScene({ target, reduceMotion }: { target: string; reduceMotion: boolean }) {
  const label = routeLabel(target)

  // Motion-value counter: animates without triggering React re-renders.
  const progress = useMotionValue(0)
  const percent = useTransform(progress, (value) => String(Math.round(value)).padStart(3, '0'))

  useEffect(() => {
    const controls = animate(progress, 100, {
      duration: SWAP_MS / 1000,
      ease: [0.22, 1, 0.36, 1],
    })
    return () => controls.stop()
  }, [progress])

  return (
    <motion.div
      className="relative h-full w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2, delay: 0 } }}
      transition={{ duration: 0.22, delay: reduceMotion ? 0 : 0.28 }}
    >
      {/* Blueprint grid */}
      <div className="absolute inset-0 opacity-[0.07] bg-[linear-gradient(rgba(201,191,255,.6)_1px,transparent_1px),linear-gradient(90deg,rgba(201,191,255,.6)_1px,transparent_1px)] [background-size:48px_48px]" />

      {/* Ambient glow */}
      <div className="absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-[120px] bg-[radial-gradient(circle,#7c50e0,transparent_70%)]" />

      {/* Scanline sweep */}
      {!reduceMotion ? (
        <motion.div
          className="absolute inset-x-0 h-px bg-[linear-gradient(90deg,transparent,rgba(201,191,255,0.75),transparent)] shadow-[0_0_18px_rgba(201,191,255,0.5)]"
          initial={{ top: '-5%' }}
          animate={{ top: '105%' }}
          transition={{ duration: 1.15, ease: 'linear', repeat: Infinity }}
        />
      ) : null}

      {/* HUD corner brackets */}
      <span className="absolute left-5 top-5 h-8 w-8 border-l border-t border-[rgba(201,191,255,0.35)] sm:left-8 sm:top-8" />
      <span className="absolute right-5 top-5 h-8 w-8 border-r border-t border-[rgba(201,191,255,0.35)] sm:right-8 sm:top-8" />
      <span className="absolute bottom-5 left-5 h-8 w-8 border-b border-l border-[rgba(201,191,255,0.35)] sm:bottom-8 sm:left-8" />
      <span className="absolute bottom-5 right-5 h-8 w-8 border-b border-r border-[rgba(201,191,255,0.35)] sm:bottom-8 sm:right-8" />

      {/* Top status rail */}
      <div className="absolute inset-x-5 top-6 flex items-center justify-between font-heading text-[9px] font-bold uppercase tracking-[0.32em] text-accent-lavender/45 sm:inset-x-10 sm:top-9">
        <span>SYS // Navigate</span>
        <span className="hidden sm:inline">Dzaky Razi</span>
      </div>

      {/* Center */}
      <div className="flex h-full flex-col items-center justify-center px-6">
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="font-heading text-[10px] font-bold uppercase tracking-[0.5em] text-accent-lavender/60"
        >
          Loading
        </motion.span>

        <h2 className="mt-4 max-w-5xl text-center font-heading text-[clamp(1.9rem,8vw,5rem)] font-black uppercase leading-[0.95] tracking-tight text-text-primary">
          {label.split('').map((char, index) => (
            <motion.span
              key={`${char}-${index}`}
              className="inline-block"
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: '55%' }}
              animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.028, ease: [0.22, 1, 0.36, 1] }}
            >
              {char === ' ' ? ' ' : char}
            </motion.span>
          ))}
        </h2>

        {/* Progress rail */}
        <div className="mt-9 w-full max-w-sm">
          <div className="h-px w-full overflow-hidden bg-[rgba(201,191,255,0.14)]">
            <motion.div
              className="h-px w-full origin-left bg-[linear-gradient(90deg,#7c50e0,#c9bfff)] shadow-[0_0_12px_rgba(201,191,255,0.6)]"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: SWAP_MS / 1000, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
          <div className="mt-3 flex items-center justify-between font-heading text-[10px] font-bold uppercase tracking-[0.24em] text-accent-lavender/50">
            <span className="truncate pr-3">{target}</span>
            <motion.span className="tabular-nums text-accent-lavender/80">{percent}</motion.span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default PageTransitionOverlay
