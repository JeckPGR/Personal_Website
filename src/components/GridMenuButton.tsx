import { useState } from 'react'
import { motion } from 'framer-motion'
import { ICON_EASE, ICON_MORPH_DURATION, ICON_SPRING } from '../lib/icon-motion'
import IconHalo from './IconHalo'

type GridMenuButtonProps = {
  /** Receives the click event so the caller can read where on screen the
   *  click landed — e.g. to anchor a circular reveal there. */
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
  isOpen?: boolean
  label?: string
  text?: string
  className?: string
}

/**
 * On hover the 3×3 dot grid melts into the three stacked bars of a classic
 * menu icon: in each row, the left dot grows into a bar while its two
 * neighbours are pulled toward it and fade, top row first. Leaving reverses
 * the wave bottom-up, so it always unmelts the way it came.
 *
 * Driven by one `hovered` boolean rather than Framer's variant propagation —
 * with 9 independently-morphing rects, propagating `custom()` functions
 * through several nested motion components proved fragile (a spring
 * overshoot on `width` briefly went negative, which is invalid for an SVG
 * rect and corrupted the shape). Each rect's `animate` target is computed
 * directly here instead, with a plain ease tween that can't overshoot past
 * its bounds, so there's no ambiguity about what state any element chases.
 */
const VIEWBOX = 22
const DOT = 3
const GAP = 3
const PITCH = DOT + GAP
const OFFSET = (VIEWBOX - (DOT * 3 + GAP * 2)) / 2
const COLS = [OFFSET, OFFSET + PITCH, OFFSET + PITCH * 2]
const BAR_WIDTH = DOT * 3 + GAP * 2
const ROW_STAGGER = 0.05

function GridMenuButton({
  onClick,
  isOpen,
  label,
  text,
  className = '',
}: GridMenuButtonProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.button
      type="button"
      onClick={onClick}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      aria-label={label}
      aria-expanded={isOpen}
      whileTap={{ scale: 0.94 }}
      className={`group inline-flex shrink-0 items-center gap-2.5 rounded-xl px-1.5 py-1 text-text-secondary transition-colors duration-200 hover:text-accent-lavender focus-visible:text-accent-lavender focus-visible:outline-none ${className}`}
    >
      {text ? (
        <motion.span
          animate={{ x: hovered ? -2 : 0 }}
          transition={ICON_SPRING}
          className="hidden font-heading text-xs font-semibold uppercase tracking-[0.18em] sm:inline"
        >
          {text}
        </motion.span>
      ) : null}

      <span className="relative inline-flex items-center justify-center">
        <IconHalo hovered={hovered} />
        <motion.svg
          width={20}
          height={20}
          viewBox={`0 0 ${VIEWBOX} ${VIEWBOX}`}
          fill="currentColor"
          animate={{ rotate: hovered ? -6 : 0, scale: hovered ? 1.05 : 1 }}
          transition={ICON_SPRING}
          className="relative"
        >
          {COLS.map((rowY, row) =>
            COLS.map((colX, col) => {
              const delay = (hovered ? row : 2 - row) * ROW_STAGGER

              return col === 0 ? (
                <motion.rect
                  key={`${row}-${col}`}
                  x={colX}
                  y={rowY}
                  height={DOT}
                  rx={DOT / 2}
                  animate={{ width: hovered ? BAR_WIDTH : DOT }}
                  transition={{ duration: ICON_MORPH_DURATION, ease: ICON_EASE, delay }}
                />
              ) : (
                <motion.rect
                  key={`${row}-${col}`}
                  x={colX}
                  y={rowY}
                  width={DOT}
                  height={DOT}
                  rx={DOT / 2}
                  animate={{
                    opacity: hovered ? 0 : 1,
                    x: hovered ? -(colX - COLS[0]) * 0.4 : 0,
                  }}
                  transition={{
                    duration: hovered ? ICON_MORPH_DURATION * 0.7 : ICON_MORPH_DURATION,
                    ease: ICON_EASE,
                    delay,
                  }}
                />
              )
            }),
          )}
        </motion.svg>
      </span>
    </motion.button>
  )
}

export default GridMenuButton
