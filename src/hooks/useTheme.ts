import { createContext, useContext } from 'react'

export type Theme = 'dark' | 'light'

/** Kept in sync with the pre-paint script in index.html. */
export const THEME_STORAGE_KEY = 'dzaky-theme'

export type ThemeContextValue = {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)

/** Dark is the product's base; light is the opt-in revert of it. */
export function readStoredTheme(): Theme {
  if (typeof window === 'undefined') return 'dark'

  try {
    return window.localStorage.getItem(THEME_STORAGE_KEY) === 'light'
      ? 'light'
      : 'dark'
  } catch {
    // Private mode / blocked storage — fall back to the base theme.
    return 'dark'
  }
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error('useTheme must be used inside a ThemeProvider')
  }

  return context
}
