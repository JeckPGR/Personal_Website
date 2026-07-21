import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

/** Curtain travel time before the route content is swapped underneath. */
export const COVER_MS = 540
/** Beat where the panel sits fully opaque so the HUD can be read. */
export const HOLD_MS = 150
export const SWAP_MS = COVER_MS + HOLD_MS

/**
 * Holds the rendered location one beat behind the real one so the route can be
 * swapped while the curtain is opaque. Feed `displayLocation` to <Routes location>
 * — everything inside then reads the frozen location through useLocation().
 */
export function usePageTransition() {
  const location = useLocation()
  const [displayLocation, setDisplayLocation] = useState(location)

  // Derived, not stored: the curtain is up whenever the two locations disagree.
  const isTransitioning = location.pathname !== displayLocation.pathname

  useEffect(() => {
    if (!isTransitioning) return

    const timer = window.setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'auto' })
      setDisplayLocation(location)
    }, SWAP_MS)

    return () => window.clearTimeout(timer)
  }, [isTransitioning, location])

  return { displayLocation, isTransitioning, target: location.pathname }
}
