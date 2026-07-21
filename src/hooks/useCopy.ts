import { useCallback } from 'react'
import { useLanguage } from './useLanguage'
import { translate } from '../i18n/translations'
import type { CopyKey } from '../i18n/translations'

/**
 * `const t = useCopy()` then `t('nav.home')`.
 * Keys are typed, so a typo is a build error rather than a blank label.
 */
export function useCopy(): (key: CopyKey) => string {
  const { language } = useLanguage()

  return useCallback((key: CopyKey) => translate(key, language), [language])
}
