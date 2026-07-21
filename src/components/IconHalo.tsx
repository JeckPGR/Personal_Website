import { motion } from 'framer-motion'
import { ICON_EASE } from '../lib/icon-motion'

/** Soft halo that blooms behind a hovered nav icon. */
function IconHalo({ hovered }: { hovered: boolean }) {
  return (
    <motion.span
      aria-hidden
      animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.6 }}
      transition={{ duration: 0.35, ease: ICON_EASE }}
      className="pointer-events-none absolute -inset-2 rounded-xl bg-[radial-gradient(circle,rgba(var(--rgb-glow),0.3),transparent_70%)]"
    />
  )
}

export default IconHalo
