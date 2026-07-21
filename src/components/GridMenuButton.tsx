import { motion } from 'framer-motion'

type GridMenuButtonProps = {
  onClick: () => void
  isOpen?: boolean
  label?: string
  text?: string
  className?: string
}

// Each of the 9 dots swells on hover so the grid tightens into a
// connected, rounded "knot" — the container also rotates 45° so the
// whole thing reads as one liquid shape (à la Sharlee).
const dotVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.55 },
}

const gridVariants = {
  rest: { rotate: 0, scale: 1 },
  hover: { rotate: 45, scale: 0.94 },
}

function GridMenuButton({
  onClick,
  isOpen,
  label = 'Open navigation menu',
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
        <span className="hidden font-heading text-xs font-semibold uppercase tracking-[0.18em] sm:inline">
          {text}
        </span>
      ) : null}
      <motion.span
        className="grid grid-cols-3 place-items-center gap-[3px]"
        variants={gridVariants}
        transition={{ type: 'spring', stiffness: 260, damping: 18 }}
      >
        {Array.from({ length: 9 }).map((_, i) => (
          <motion.span
            key={i}
            className="h-[3px] w-[3px] rounded-md bg-current"
            variants={dotVariants}
            transition={{ type: 'spring', stiffness: 340, damping: 15 }}
          />
        ))}
      </motion.span>
    </motion.button>
  )
}

export default GridMenuButton
