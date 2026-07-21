import { motion } from 'framer-motion'

type GridMenuButtonProps = {
  onClick: () => void
  isOpen?: boolean
  label?: string
  text?: string
  className?: string
}

// On hover the 3×3 dot grid morphs into the three stacked bars of a classic
// menu icon: every dot stretches sideways until it fuses with its neighbours,
// row by row from the top. Leaving reverses it from the bottom up, so the
// shape always melts back the way it came.
const ROW_STAGGER = 0.055

const dotVariants = {
  rest: (index: number) => ({
    scaleX: 1,
    scaleY: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 320,
      damping: 22,
      delay: (2 - Math.floor(index / 3)) * ROW_STAGGER,
    },
  }),
  hover: (index: number) => ({
    // 2.15 × 3px slightly overshoots the 6px cell pitch, so neighbouring dots
    // overlap into one continuous rounded bar instead of a dotted line.
    scaleX: 2.15,
    scaleY: 1.2,
    transition: {
      type: 'spring' as const,
      stiffness: 320,
      damping: 22,
      delay: Math.floor(index / 3) * ROW_STAGGER,
    },
  }),
}

const gridVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.06 },
}

// A soft halo blooms behind the bars so the morph lands on something.
const haloVariants = {
  rest: { opacity: 0, scale: 0.6 },
  hover: { opacity: 1, scale: 1 },
}

const labelVariants = {
  rest: { x: 0 },
  hover: { x: -2 },
}

function GridMenuButton({
  onClick,
  isOpen,
  label,
  text,
  className = '',
}: GridMenuButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-expanded={isOpen}
      initial="rest"
      whileHover="hover"
      whileFocus="hover"
      whileTap={{ scale: 0.95 }}
      className={`group inline-flex shrink-0 items-center gap-2.5 rounded-xl px-1.5 py-1 text-text-secondary transition-colors duration-200 hover:text-accent-lavender focus-visible:text-accent-lavender focus-visible:outline-none ${className}`}
    >
      {text ? (
        <motion.span
          variants={labelVariants}
          transition={{ type: 'spring', stiffness: 300, damping: 24 }}
          className="hidden font-heading text-xs font-semibold uppercase tracking-[0.18em] sm:inline"
        >
          {text}
        </motion.span>
      ) : null}

      <span className="relative inline-flex items-center justify-center">
        <motion.span
          aria-hidden
          variants={haloVariants}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none absolute -inset-2 rounded-xl bg-[radial-gradient(circle,rgba(var(--rgb-glow),0.3),transparent_70%)]"
        />
        <motion.span
          className="relative grid grid-cols-3 place-items-center gap-[3px]"
          variants={gridVariants}
          transition={{ type: 'spring', stiffness: 260, damping: 18 }}
        >
          {Array.from({ length: 9 }).map((_, i) => (
            <motion.span
              key={i}
              custom={i}
              className="h-[3px] w-[3px] rounded-full bg-current"
              variants={dotVariants}
            />
          ))}
        </motion.span>
      </span>
    </motion.button>
  )
}

export default GridMenuButton
