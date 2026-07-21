/**
 * Shared timing for every custom nav icon (menu grid, close X, …) so they
 * morph with the same feel — one ease curve, one spring. Import from here
 * instead of re-typing the numbers per icon.
 */
export const ICON_EASE = [0.22, 1, 0.36, 1] as const
export const ICON_MORPH_DURATION = 0.32
// Underdamped on purpose: rotate/scale can overshoot safely (unlike a
// width tween, a few degrees or a hair of extra scale past the target never
// produces invalid geometry), so it's spent here for a lively little bounce.
export const ICON_SPRING = { type: 'spring', stiffness: 300, damping: 16 } as const
