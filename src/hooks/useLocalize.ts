import { useCallback } from 'react'
import { useLanguage } from './useLanguage'
import { localize } from '../i18n/localized'
import type { Localized } from '../i18n/localized'

/**
 * `const L = useLocalize()` then `L(work.summary)`.
 * The data-file counterpart of `useCopy()`: that one resolves interface keys,
 * this one resolves authored `{ en, id }` content.
 */
export function useLocalize(): <T>(value: Localized<T>) => T {
  const { language } = useLanguage()

  return useCallback(
    <T,>(value: Localized<T>) => localize(value, language),
    [language],
  )
}
