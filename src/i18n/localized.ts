import type { Language } from '../hooks/useLanguage'

/**
 * Long-form portfolio content — work summaries, bullets, reflections, project
 * and certification descriptions — is authored in both languages inside the
 * data files rather than translated in code. Wrap those fields in this shape
 * and read them through `useLocalize()`.
 */
export type Localized<T = string> = { en: T; id: T }

export function localize<T>(value: Localized<T>, language: Language): T {
  return value[language]
}
