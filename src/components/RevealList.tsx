import { useEffect, useState } from 'react'
import type { IconType } from 'react-icons'
import { TbArrowUpRight, TbMaximize } from 'react-icons/tb'
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion'
import { Link } from 'react-router-dom'
import ImageLightbox from './ImageLightbox'
import type { LightboxImage } from './ImageLightbox'

export type RevealItem = {
  id: string
  title: string
  /** Right-aligned label (category, role, issuer …) */
  meta: string
  /** Optional small line under the title (period …) */
  sub?: string
  /** When present the whole row becomes a link */
  to?: string
  accent?: string
  Icon?: IconType
  /** Optional cover image; falls back to a themed gradient placeholder */
  image?: string
}

type RevealListProps = {
  items: RevealItem[]
  /** Small label shown on the left of the count header */
  countLabel?: string
}

type PreviewSize = { w: number; h: number }

const SMALL_PREVIEW: PreviewSize = { w: 300, h: 200 }
const LARGE_PREVIEW: PreviewSize = { w: 420, h: 280 }

function useHasHover() {
  const [hasHover, setHasHover] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(hover: hover) and (pointer: fine)')
    const update = () => setHasHover(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  return hasHover
}

/** Bigger preview card on larger laptops / desktops. */
function usePreviewSize(): PreviewSize {
  const [size, setSize] = useState<PreviewSize>(SMALL_PREVIEW)

  useEffect(() => {
    const query = window.matchMedia('(min-width: 1280px)')
    const update = () => setSize(query.matches ? LARGE_PREVIEW : SMALL_PREVIEW)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  return size
}

function PreviewCard({ item, size }: { item: RevealItem; size: PreviewSize }) {
  const accent = item.accent ?? '#7c50e0'
  const Icon = item.Icon

  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-[rgba(201,191,255,0.2)] shadow-[0_34px_90px_rgba(0,0,0,0.6)]"
      style={{
        width: size.w,
        height: size.h,
        background: `linear-gradient(135deg, ${accent}2e, rgba(12,10,24,0.94))`,
      }}
    >
      {item.image ? (
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <>
          <span
            className="pointer-events-none absolute -right-10 -top-12 h-44 w-44 rounded-full opacity-40 blur-2xl"
            style={{ background: `radial-gradient(circle, ${accent}, transparent 70%)` }}
          />
          <div className="pointer-events-none absolute inset-0 opacity-[0.08] bg-[linear-gradient(rgba(201,191,255,.6)_1px,transparent_1px),linear-gradient(90deg,rgba(201,191,255,.6)_1px,transparent_1px)] [background-size:28px_28px]" />
          {Icon ? (
            <Icon
              size={size.w >= LARGE_PREVIEW.w ? 120 : 92}
              className="absolute right-4 top-4 opacity-15"
              style={{ color: accent }}
            />
          ) : null}
        </>
      )}
      <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent,rgba(8,6,16,0.88))] p-4 pt-12">
        <p className="font-heading text-sm font-semibold leading-tight text-text-primary">
          {item.title}
        </p>
        <p className="mt-1 text-[10px] uppercase tracking-[0.16em]" style={{ color: accent }}>
          {item.meta}
        </p>
      </div>
    </div>
  )
}

function RevealList({ items, countLabel }: RevealListProps) {
  const [active, setActive] = useState<number | null>(null)
  const [lightbox, setLightbox] = useState<LightboxImage | null>(null)
  const hasHover = useHasHover()
  const size = usePreviewSize()

  // Clamped position (drives the lagging preview card).
  const previewRawX = useMotionValue(-500)
  const previewRawY = useMotionValue(-500)

  const previewX = useSpring(previewRawX, { stiffness: 260, damping: 32, mass: 0.7 })
  const previewY = useSpring(previewRawY, { stiffness: 260, damping: 32, mass: 0.7 })

  const handleMove = (event: React.PointerEvent) => {
    if (!hasHover) return
    const x = Math.min(
      Math.max(event.clientX + 28, 12),
      window.innerWidth - size.w - 12,
    )
    const y = Math.min(
      Math.max(event.clientY - size.h / 2, 12),
      window.innerHeight - size.h - 12,
    )
    previewRawX.set(x)
    previewRawY.set(y)
  }

  const activeItem = active !== null ? items[active] : undefined
  const showOverlay = hasHover && activeItem

  return (
    <div onPointerMove={handleMove}>
      <div className="flex items-end justify-between border-b border-[rgba(201,191,255,0.16)] pb-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.24em] text-accent-lavender/60">
          {countLabel ?? 'Index'}
        </span>
        <span className="font-heading text-sm font-semibold text-accent-lavender">
          {String(items.length).padStart(2, '0')}
        </span>
      </div>

      <ul className="min-w-0">
        {items.map((item, index) => {
          const isDimmed = active !== null && active !== index
          // Rows without a destination but with a cover open the image dialog —
          // this is the only way to see the preview on touch devices.
          const canPreview = !item.to && Boolean(item.image)
          const body = (
            <>
              <span className="flex min-w-0 items-center gap-1 sm:gap-3">
                {item.to ? (
                  <span className="grid w-0 shrink-0 place-items-center overflow-hidden text-accent-lavender opacity-0 transition-all duration-300 group-hover:w-6 group-hover:opacity-100 sm:group-hover:w-8">
                    <TbArrowUpRight size={22} />
                  </span>
                ) : null}
                {canPreview ? (
                  <span
                    className={`grid shrink-0 place-items-center overflow-hidden text-accent-lavender transition-all duration-300 ${
                      hasHover
                        ? 'w-0 opacity-0 group-hover:w-6 group-hover:opacity-100 sm:group-hover:w-8'
                        : 'w-6 opacity-70'
                    }`}
                  >
                    <TbMaximize size={18} />
                  </span>
                ) : null}
                <span className="min-w-0">
                  <span className="block truncate font-heading text-lg font-bold leading-tight text-text-primary transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent-lavender sm:text-xl lg:text-2xl">
                    {item.title}
                  </span>
                  {item.sub ? (
                    <span className="mt-1 block truncate text-[11px] text-text-muted">
                      {item.sub}
                    </span>
                  ) : null}
                </span>
              </span>
              <span className="shrink-0 pl-3 text-right text-[10px] font-medium uppercase tracking-[0.16em] text-text-muted transition-colors duration-300 group-hover:text-text-secondary sm:text-xs">
                {item.meta}
              </span>
            </>
          )

          const rowClass = `group flex items-center justify-between gap-3 border-b border-[rgba(201,191,255,0.1)] py-5 transition-opacity duration-300 md:py-6 ${
            isDimmed ? 'opacity-40' : 'opacity-100'
          } ${hasHover ? 'cursor-none' : ''}`

          return (
            <li key={item.id}>
              {item.to ? (
                <Link
                  to={item.to}
                  className={rowClass}
                  data-cursor="spotlight"
                  data-cursor-arrow="true"
                  onMouseEnter={() => setActive(index)}
                  onMouseLeave={() => setActive(null)}
                >
                  {body}
                </Link>
              ) : canPreview ? (
                <button
                  type="button"
                  aria-label={`View ${item.title}`}
                  className={`${rowClass} w-full text-left`}
                  data-cursor="spotlight"
                  onMouseEnter={() => setActive(index)}
                  onMouseLeave={() => setActive(null)}
                  onClick={() =>
                    setLightbox({
                      src: item.image as string,
                      alt: item.title,
                      caption: item.title,
                      label: item.meta,
                      accent: item.accent,
                    })
                  }
                >
                  {body}
                </button>
              ) : (
                <div
                  className={rowClass}
                  data-cursor="spotlight"
                  onMouseEnter={() => setActive(index)}
                  onMouseLeave={() => setActive(null)}
                >
                  {body}
                </div>
              )}
            </li>
          )
        })}
      </ul>

      {hasHover ? (
        <>
          {/* Lagging image preview */}
          <motion.div
            className="pointer-events-none fixed left-0 top-0 z-40"
            style={{ x: previewX, y: previewY }}
          >
            <AnimatePresence>
              {showOverlay ? (
                <motion.div
                  key={active}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.24, ease: 'easeOut' }}
                >
                  <PreviewCard item={activeItem as RevealItem} size={size} />
                </motion.div>
              ) : null}
            </AnimatePresence>
          </motion.div>
        </>
      ) : null}

      <ImageLightbox image={lightbox} onClose={() => setLightbox(null)} />
    </div>
  )
}

export default RevealList
