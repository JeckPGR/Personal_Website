import { AnimatePresence, motion } from 'framer-motion'
import { TbMoon, TbSun } from 'react-icons/tb'
import { useTheme } from '../hooks/useTheme'

/** Inline control — it lives inside the navbar, which is on every route. */
function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Light mode' : 'Dark mode'}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-[rgba(var(--rgb-line),0.14)] sm:h-8 sm:w-8 bg-[rgba(var(--rgb-film),0.05)] text-accent-lavender transition-colors duration-300 hover:border-[rgba(var(--rgb-line),0.32)] hover:bg-[rgba(var(--rgb-hover),0.14)]"
    >
      {/* Crossfade + spin so the swap reads as one motion, not two icons. */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ opacity: 0, rotate: -70, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 70, scale: 0.6 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="flex"
        >
          {isDark ? <TbSun size={15} /> : <TbMoon size={15} />}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  )
}

export default ThemeToggle
