import { createContext, useContext } from 'react'

export type Language = 'en' | 'id'

/** Kept in sync with the pre-paint script in index.html. */
export const LANGUAGE_STORAGE_KEY = 'dzaky-language'

export type LanguageContextValue = {
  language: Language
  setLanguage: (language: Language) => void
  toggleLanguage: () => void
}

export const LanguageContext = createContext<LanguageContextValue | null>(null)

/** English is the base; Indonesian is the opt-in. */
export function readStoredLanguage(): Language {
  if (typeof window === 'undefined') return 'en'

  try {
    return window.localStorage.getItem(LANGUAGE_STORAGE_KEY) === 'id'
      ? 'id'
      : 'en'
  } catch {
    // Private mode / blocked storage — fall back to the base language.
    return 'en'
  }
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext)

  if (!context) {
    throw new Error('useLanguage must be used inside a LanguageProvider')
  }

  return context
}
