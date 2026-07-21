import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
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
 * Full-screen image dialog. The image is rendered at its natural size and only
 * scaled *down* to fit the viewport, so it never gets upscaled / blurred.
 * Portalled to <body> so parent transforms can't trap the fixed positioning.
 */
function ImageLightbox({ image, onClose }: ImageLightboxProps) {
  const isOpen = Boolean(image)

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
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          onClick={onClose}
          className="fixed inset-0 z-1100 flex cursor-default items-center justify-center bg-[rgba(6,5,12,0.92)] p-4 backdrop-blur-xl sm:p-8"
        >
          <button
            type="button"
            aria-label="Close image"
            onClick={onClose}
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(201,191,255,0.18)] bg-[rgba(255,255,255,0.05)] text-text-secondary backdrop-blur-md transition duration-300 hover:rotate-90 hover:border-[rgba(201,191,255,0.4)] hover:text-accent-lavender sm:right-6 sm:top-6"
          >
            <TbX size={20} />
          </button>

          <motion.figure
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 12 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
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
                <span className="mt-1.5 block font-heading text-sm font-semibold text-text-primary sm:text-base">
                  {image.caption}
                </span>
              </figcaption>
            ) : null}
          </motion.figure>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  )
}

export default ImageLightbox
