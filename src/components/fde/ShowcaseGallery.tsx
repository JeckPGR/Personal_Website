import { useState } from 'react'
import { TbMaximize } from 'react-icons/tb'
import type { CaseStudyShowcase } from '../../content/schema'
import { resolveLocalized } from '../../content/schema'
import { useLanguage } from '../../hooks/useLanguage'
import ImageLightbox from '../ImageLightbox'
import type { LightboxImage } from '../ImageLightbox'

type ShowcaseGalleryProps = {
  items: CaseStudyShowcase[]
  title: string
}

export function ShowcaseGallery({ items, title }: ShowcaseGalleryProps) {
  const { language } = useLanguage()
  const [lightbox, setLightbox] = useState<LightboxImage | null>(null)

  if (!items || items.length === 0) return null

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="grid grid-cols-1 gap-6 sm:gap-8">
        {items.map((item, index) => {
          const altText = resolveLocalized(item.alt, language)
          const captionText = resolveLocalized(item.caption, language)

          return (
            <figure
              key={`${item.src}-${index}`}
              className="group overflow-hidden rounded-2xl border border-[rgba(var(--rgb-line),0.12)] bg-[rgba(10,9,20,0.85)] p-2 sm:p-3 transition-all duration-300 hover:border-accent-lavender/40 hover:shadow-[0_0_30px_rgba(var(--rgb-glow),0.12)]"
            >
              <div
                role="button"
                tabIndex={0}
                aria-label={`Open full size: ${altText}`}
                onClick={() =>
                  setLightbox({
                    src: item.src,
                    alt: altText,
                    caption: captionText,
                    label: title,
                  })
                }
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setLightbox({
                      src: item.src,
                      alt: altText,
                      caption: captionText,
                      label: title,
                    })
                  }
                }}
                className="relative cursor-pointer overflow-hidden rounded-xl bg-black/40"
              >
                <img
                  src={item.src}
                  alt={altText}
                  loading="lazy"
                  className="w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                />

                {/* Hover overlay hint */}
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="flex items-center gap-2 rounded-full border border-white/20 bg-black/70 px-4 py-2 font-mono text-xs text-white backdrop-blur-md">
                    <TbMaximize size={16} />
                    {language === 'id' ? 'Klik untuk Memperbesar' : 'Click to Enlarge'}
                  </span>
                </div>
              </div>

              {captionText && (
                <figcaption className="mt-3 px-2 pb-1 text-xs sm:text-sm text-text-secondary leading-relaxed">
                  <span className="font-mono text-accent-lavender font-bold">↳ </span>
                  {captionText}
                </figcaption>
              )}
            </figure>
          )
        })}
      </div>

      <ImageLightbox image={lightbox} onClose={() => setLightbox(null)} />
    </div>
  )
}

export default ShowcaseGallery
