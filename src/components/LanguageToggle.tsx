import { motion } from 'framer-motion'
import { useCopy } from '../hooks/useCopy'
import { useLanguage } from '../hooks/useLanguage'

/** Shows the language you'd switch *to*, so the tap has a visible outcome. */
function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage()
  const t = useCopy()
  const next = language === 'en' ? 'ID' : 'EN'

  return (
    <motion.button
      type="button"
      onClick={toggleLanguage}
      aria-label={t('language.switch')}
      title={t('language.switch')}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      className="flex h-7 shrink-0 items-center justify-center rounded-md border border-[rgba(var(--rgb-line),0.14)] bg-[rgba(var(--rgb-film),0.05)] px-2 font-heading text-[10px] font-bold uppercase tracking-[0.12em] text-text-secondary transition-colors duration-300 hover:border-[rgba(var(--rgb-line),0.32)] hover:bg-[rgba(var(--rgb-hover),0.14)] hover:text-accent-lavender sm:h-8"
    >
      {next}
    </motion.button>
  )
}

export default LanguageToggle
