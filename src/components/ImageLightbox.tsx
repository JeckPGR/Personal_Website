import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { TbX } from 'react-icons/tb'

export type LightboxImage = {
  src: string
  alt: string
  /** Small caption line under the image (title, issuer …) */
  caption?: string
  /** Uppercase label shown above the caption */
  label?: string
  accent?: string
}

type ImageLightboxProps = {
  image: LightboxImage | null
  onClose: () => void
}

/**
 * Drop-in motion: the image falls in from above the screen, settles in the
 * middle, then keeps falling out the bottom on close — so repeated opens read
 * as one continuous top → centre → bottom drop.
 *
 * The percentages below are applied to a *full-viewport* stage, so `-100%` is
 * always exactly one screen height no matter how tall the image is.
 */
/* ─── The fall ───────────────────────────────────────────────────────────────
 * Split across two elements on purpose:
 *   • the stage handles the vertical travel — it is full-viewport, so `-100%`
 *     is always exactly one screen height whatever size the image is;
 *   • the figure handles the tumble — rotation on its own element keeps the
 *     3D transform from fighting the translate.
 * The figure pivots near its bottom-left corner, so the left edge "lands"
 * first and the right side swings down after it, like a shoulder drop.
 * ───────────────────────────────────────────────────────────────────────── */

/** Hold the incoming tilt through the fall, land, rock right-side down, settle. */
const TUMBLE_TIMES = [0, 0.5, 0.72, 0.88, 1]
const TUMBLE_TRANSITION = {
  duration: 1.15,
  times: TUMBLE_TIMES,
  ease: 'easeOut' as const,
}

const STAGE_IN = {
  initial: { y: '-100%', opacity: 1 },
  animate: { y: '0%', opacity: 1 },
  // Spring with a touch of bounce = it lands and settles instead of stopping dead.
  transition: { type: 'spring' as const, duration: 0.85, bounce: 0.24 },
}

const STAGE_OUT = {
  y: '100%',
  opacity: 0,
  transition: {
    // Accelerating curve — gravity takes over and it drops away.
    y: { duration: 0.5, ease: [0.32, 0, 0.67, 0] as const },
    // Fades only in the back half of the fall, so it is already invisible by
    // the time the backdrop clears — otherwise it would visibly drop across
    // the live page behind the dialog.
    opacity: { duration: 0.2, delay: 0.26, ease: 'easeIn' as const },
  },
}

const TUMBLE_IN = {
  // Negative rotateZ = counter-clockwise = left edge low, so the left lands first.
  initial: { rotateZ: -7, rotateX: -14, rotateY: 9 },
  animate: {
    rotateZ: [-7, -7, 2.6, -0.8, 0],
    rotateX: [-14, -14, 4, -1, 0],
    rotateY: [9, 9, -2.4, 0.7, 0],
  },
  transition: {
    rotateZ: TUMBLE_TRANSITION,
    rotateX: TUMBLE_TRANSITION,
    rotateY: TUMBLE_TRANSITION,
  },
}

/** Tips onto the same left edge on the way out, so the cycle reads consistently. */
const TUMBLE_OUT = {
  rotateZ: -13,
  rotateX: 16,
  rotateY: -7,
  transition: { duration: 0.5, ease: [0.4, 0, 0.75, 0.35] as const },
}

function ImageLightbox({ image, onClose }: ImageLightboxProps) {
  const isOpen = Boolean(image)
  const reduceMotion = useReducedMotion()

  // Escape to close + body scroll lock while open.
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  return createPortal(
    <AnimatePresence>
      {image ? (
        <motion.div
          key="image-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={image.alt}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          // Held dark a beat longer than the drop so the image never falls
          // across the live page behind it.
          exit={{ opacity: 0, transition: { duration: 0.42, ease: 'easeIn' } }}
          transition={{ duration: 0.26, ease: 'easeOut' }}
          onClick={onClose}
          className="fixed inset-0 z-1100 cursor-default overflow-hidden bg-[rgba(6,5,12,0.92)] backdrop-blur-xl"
        >
          <button
            type="button"
            aria-label="Close image"
            onClick={onClose}
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-md border border-[rgba(201,191,255,0.18)] bg-[rgba(255,255,255,0.05)] text-white/70 backdrop-blur-md transition duration-300 hover:rotate-90 hover:border-[rgba(201,191,255,0.4)] hover:text-[#c9bfff] sm:right-6 sm:top-6"
          >
            <TbX size={20} />
          </button>

          {/* Falling stage — full viewport, so y percentages are screen-relative */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center p-4 sm:p-8"
            // Perspective on the parent is what makes the child's rotateX/Y read
            // as depth rather than a flat squash.
            style={{ perspective: '1500px' }}
            initial={reduceMotion ? { opacity: 0 } : STAGE_IN.initial}
            animate={reduceMotion ? { opacity: 1 } : STAGE_IN.animate}
            exit={reduceMotion ? { opacity: 0 } : STAGE_OUT}
            transition={reduceMotion ? { duration: 0.2 } : STAGE_IN.transition}
          >
            <motion.figure
              onClick={(event) => event.stopPropagation()}
              // Pivot near the bottom-left — inset from the true corner so the
              // perspective projection on a tall image stays gentle.
              style={{ transformOrigin: '20% 90%' }}
              initial={reduceMotion ? undefined : TUMBLE_IN.initial}
              animate={reduceMotion ? undefined : TUMBLE_IN.animate}
              exit={reduceMotion ? undefined : TUMBLE_OUT}
              transition={reduceMotion ? undefined : TUMBLE_IN.transition}
              className="m-0 flex max-h-full max-w-full flex-col items-center gap-4"
            >
              <img
                src={image.src}
                alt={image.alt}
                decoding="async"
                className="h-auto w-auto max-h-[78vh] max-w-full rounded-2xl border border-[rgba(201,191,255,0.14)] object-contain shadow-[0_40px_120px_rgba(0,0,0,0.7)]"
              />

              {image.caption ? (
                <figcaption className="max-w-2xl px-2 text-center">
                  {image.label ? (
                    <span
                      className="block font-heading text-[10px] font-bold uppercase tracking-[0.24em]"
                      style={{ color: image.accent ?? '#c9bfff' }}
                    >
                      {image.label}
                    </span>
                  ) : null}
                  <span className="mt-1.5 block font-heading text-sm font-semibold text-white sm:text-base">
                    {image.caption}
                  </span>
                </figcaption>
              ) : null}
            </motion.figure>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  )
}

export default ImageLightbox
