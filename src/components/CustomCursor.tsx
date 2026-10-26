import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { TbArrowUpRight } from 'react-icons/tb'

type Variant = 'default' | 'spotlight'

/**
 * Site-wide custom cursor.
 *
 * Default state: a lagging ring with a tight center dot (spotlight idle).
 * Over any element flagged with `data-cursor="spotlight"` (the Project /
 * Work / Certification rows) the ring swells and fills in — a solid
 * spotlight — showing an arrow when the row links somewhere
 * (`data-cursor-arrow="true"`).
 *
 * Only mounts on hover-capable, fine-pointer devices.
 */
function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [variant, setVariant] = useState<Variant>('default')
  const [arrow, setArrow] = useState(false)
  const [visible, setVisible] = useState(false)

  // Raw pointer position — the center dot follows this tightly.
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  // Springed position — the ring lags a touch behind.
  const ringX = useSpring(x, { stiffness: 480, damping: 38, mass: 0.5 })
  const ringY = useSpring(y, { stiffness: 480, damping: 38, mass: 0.5 })

  const variantRef = useRef<Variant>('default')
  const visibleRef = useRef(false)

  // Only enable on devices that actually have a hovering, fine pointer.
  useEffect(() => {
    const query = window.matchMedia('(hover: hover) and (pointer: fine)')
    const update = () => setEnabled(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (!enabled) return

    const handleMove = (event: PointerEvent) => {
      x.set(event.clientX)
      y.set(event.clientY)
      if (!visibleRef.current) {
        visibleRef.current = true
        setVisible(true)
      }

      const target = event.target as Element | null
      const spot = target?.closest?.('[data-cursor="spotlight"]') ?? null
      const next: Variant = spot ? 'spotlight' : 'default'
      if (next !== variantRef.current) {
        variantRef.current = next
        setVariant(next)
        setArrow(spot?.getAttribute('data-cursor-arrow') === 'true')
      }
    }

    const hide = () => {
      visibleRef.current = false
      setVisible(false)
    }

    window.addEventListener('pointermove', handleMove, { passive: true })
    document.addEventListener('mouseleave', hide)
    window.addEventListener('blur', hide)

    return () => {
      window.removeEventListener('pointermove', handleMove)
      document.removeEventListener('mouseleave', hide)
      window.removeEventListener('blur', hide)
    }
  }, [enabled, x, y])

  if (!enabled) return null

  const isSpot = variant === 'spotlight'

  return (
    <div className="pointer-events-none fixed inset-0 z-[10000]" aria-hidden>
      {/* Spotlight follower — highlights over interactive cards/rows */}
      <motion.div
        className="absolute left-0 top-0"
        style={{ x: ringX, y: ringY }}
        animate={{ opacity: visible && isSpot ? 1 : 0 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        <motion.span
          className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-solid border-[rgba(var(--rgb-line),0.55)] bg-[rgba(var(--rgb-hover),0.2)] shadow-[0_0_34px_rgba(var(--rgb-glow),0.4)] backdrop-blur-[2px]"
          animate={{
            width: isSpot ? 64 : 32,
            height: isSpot ? 64 : 32,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 26 }}
        >
          {isSpot && arrow ? (
            <TbArrowUpRight size={22} className="text-accent-lavender" />
          ) : null}
        </motion.span>
      </motion.div>
    </div>
  )
}

export default CustomCursor
