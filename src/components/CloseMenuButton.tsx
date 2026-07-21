import { useState } from 'react'
import { motion } from 'framer-motion'
import { ICON_EASE, ICON_MORPH_DURATION, ICON_SPRING } from '../lib/icon-motion'
import IconHalo from './IconHalo'

type CloseMenuButtonProps = {
  onClick: () => void
  label?: string
  className?: string
}

/**
 * A hand-drawn X, icon-only — no border, no tile, matching GridMenuButton's
 * bare footprint. Its two strokes sit fixed at ±45°; on hover the whole
 * glyph itself rotates an extra 45° while the strokes lengthen, so an X
 * spins into a crisp "+" and springs back into an X on the way out. Same
 * spring and glow as the menu icon, different trick.
 */
const VIEWBOX = 22
const CENTER = VIEWBOX / 2
const THICKNESS = 3
const LENGTH_REST = 13
const LENGTH_HOVER = 17

function Stroke({ hovered, rotate }: { hovered: boolean; rotate: number }) {
  const length = hovered ? LENGTH_HOVER : LENGTH_REST

  return (
    <motion.rect
      y={CENTER - THICKNESS / 2}
      height={THICKNESS}
      rx={THICKNESS / 2}
      style={{ rotate }}
      animate={{ width: length, x: CENTER - length / 2 }}
      transition={{ duration: ICON_MORPH_DURATION, ease: ICON_EASE }}
    />
  )
}

function CloseMenuButton({ onClick, label, className = '' }: CloseMenuButtonProps) {
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
      whileTap={{ scale: 0.9 }}
      className={`relative flex h-11 w-11 items-center justify-center rounded-xl text-text-secondary transition-colors duration-200 hover:text-accent-lavender focus-visible:text-accent-lavender focus-visible:outline-none ${className}`}
    >
      <IconHalo hovered={hovered} />
      <motion.svg
        width={26}
        height={26}
        viewBox={`0 0 ${VIEWBOX} ${VIEWBOX}`}
        fill="currentColor"
        animate={{ rotate: hovered ? 45 : 0, scale: hovered ? 1.15 : 1 }}
        transition={ICON_SPRING}
        className="relative"
      >
        <Stroke hovered={hovered} rotate={45} />
        <Stroke hovered={hovered} rotate={-45} />
      </motion.svg>
    </motion.button>
  )
}

export default CloseMenuButton
