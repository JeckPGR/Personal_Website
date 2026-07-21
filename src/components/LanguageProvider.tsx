import { useCallback, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import {
  LANGUAGE_STORAGE_KEY,
  LanguageContext,
  readStoredLanguage,
} from '../hooks/useLanguage'
import type { Language } from '../hooks/useLanguage'

function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(readStoredLanguage)

  useEffect(() => {
    // Keep the document in sync so screen readers and translation tools
    // announce the page in the language it is actually rendered in.
    document.documentElement.lang = language

    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language)
    } catch {
      // Storage can be unavailable; the choice still applies for this session.
    }
  }, [language])

  const toggleLanguage = useCallback(() => {
    setLanguage((current) => (current === 'en' ? 'id' : 'en'))
  }, [])

  const value = useMemo(
    () => ({ language, setLanguage, toggleLanguage }),
    [language, toggleLanguage],
  )

  return <LanguageContext value={value}>{children}</LanguageContext>
}

export default LanguageProvider
