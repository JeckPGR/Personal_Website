import { useLayoutEffect, useState } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

/** Curtain travel time before the route content is swapped underneath. */
export const COVER_MS = 540
/** Beat where the panel sits fully opaque so the HUD can be read. */
export const HOLD_MS = 150
export const SWAP_MS = COVER_MS + HOLD_MS
/** Section-to-section moves (home ↔ about ↔ work …) linger a beat longer. */
export const PAGE_EXTRA_MS = 1000

/** "/work/telkom-property", "/project/vibe" — anything one level below a listing. */
const DETAIL_PATTERN = /^\/[^/]+\/[^/]+$/

/**
 * Going back should feel instant: browser/history pops, and the in-page "Back"
 * controls that drop from a detail route to the listing it belongs to.
 */
function isBackNavigation(from: string, to: string, navigationType: string) {
  if (navigationType === 'POP') return true
  return to !== '/' && from.startsWith(`${to}/`)
}

/** 0 means "swap now, no curtain". */
function swapDurationFor(from: string, to: string, navigationType: string) {
  if (isBackNavigation(from, to, navigationType)) return 0
  if (DETAIL_PATTERN.test(to)) return SWAP_MS
  return SWAP_MS + PAGE_EXTRA_MS
}

/**
 * Holds the rendered location one beat behind the real one so the route can be
 * swapped while the curtain is opaque. Feed `displayLocation` to <Routes location>
 * — everything inside then reads the frozen location through useLocation().
 */
export function usePageTransition() {
  const location = useLocation()
  const navigationType = useNavigationType()
  const [displayLocation, setDisplayLocation] = useState(location)

  // Derived, not stored: a move is pending whenever the two locations disagree.
  const pending = location.pathname !== displayLocation.pathname
  const swapMs = pending
    ? swapDurationFor(displayLocation.pathname, location.pathname, navigationType)
    : SWAP_MS
  const isTransitioning = pending && swapMs > 0

  useLayoutEffect(() => {
    if (!pending) return

    const swap = () => {
      window.scrollTo({ top: 0, behavior: 'auto' })
      setDisplayLocation(location)
    }

    if (swapMs === 0) {
      swap()
      return
    }

    const timer = window.setTimeout(swap, swapMs)
    return () => window.clearTimeout(timer)
  }, [pending, swapMs, location])

  return { displayLocation, isTransitioning, target: location.pathname, swapMs }
}
