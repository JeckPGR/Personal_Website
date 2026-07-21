import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { IconType } from 'react-icons'
import { TbArrowLeft, TbExternalLink, TbMapPin, TbCalendar, TbBriefcase, TbWorld, TbPhotoOff, TbMaximize } from 'react-icons/tb'
import { Link } from 'react-router-dom'
import ImageLightbox from './ImageLightbox'
import type { LightboxImage } from './ImageLightbox'

gsap.registerPlugin(ScrollTrigger)

export type DetailMeta = { label: string; value: string }

export type DetailViewProps = {
  backTo: string
  backLabel: string
  eyebrow: string
  title: string
  description: string
  accent: string
  Icon: IconType
  meta: DetailMeta[]
  tags?: string[]
  tagsHeading?: string
  /** "What I did" style bullet list */
  points?: string[]
  pointsHeading?: string
  /** Result / output chips */
  highlights?: string[]
  highlightsHeading?: string
  /** Closing reflection quote */
  quote?: string
  quoteHeading?: string
  /** Optional cover image; falls back to a themed gradient banner */
  image?: string
  /** Optional external link */
  externalUrl?: string
  /** Optional showcase images shown beside the description; falls back to a branded visual panel */
  showcase?: string[]
  /** When set, always render this many showcase slots, filling missing ones with a "no image" template */
  showcaseSlots?: number
  /** Heading label shown above the showcase (e.g. "Showcase" / "Journey & Proof") */
  showcaseHeading?: string
  /** Caption suffix on each showcase slot (e.g. "Key Point" / "Key Results") */
  proofLabel?: string
}

/* ─── Utility: hex → rgba string ─── */
function hexToRgba(hex: string, alpha: number): string {
  const h = hex.replace('#', '')
  const bigint = parseInt(h.length === 3 ? h.split('').map(c => c + c).join('') : h, 16)
  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

/* ─── Utility: readable label for an external URL ─── */
function prettyUrl(url: string): string {
  try {
    const { hostname, pathname } = new URL(url)
    const path = pathname.replace(/\/$/, '')
    return (hostname + path).replace(/^www\./, '')
  } catch {
    return url.replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/$/, '')
  }
}

/* ─── Magnetic Button Component ─── */
function MagneticButton({ children, className, ...props }: React.ComponentProps<'button'>) {
  const ref = useRef<HTMLButtonElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    gsap.to(ref.current, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: 'power2.out' })
  }

  const handleMouseLeave = () => {
    if (!ref.current) return
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' })
  }

  return (
    <button
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </button>
  )
}

/* ─── Staggered Text Reveal ─── */
function RevealText({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  return (
    <motion.span
      className={`inline-block overflow-hidden ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          variants={{
            hidden: { y: '100%', opacity: 0 },
            visible: { y: 0, opacity: 1 },
          }}
          transition={{ duration: 0.5, delay: delay + i * 0.03, ease: [0.22, 1, 0.36, 1] }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  )
}

/* ─── Showcase / proof image grid ─── */
type ShowcaseGridProps = {
  showcase?: string[]
  showcaseSlots?: number
  title: string
  proofLabel: string
  accent: string
  Icon: IconType
  onOpen: (image: LightboxImage) => void
}

function ShowcaseGrid({
  showcase,
  showcaseSlots,
  title,
  proofLabel,
  accent,
  Icon,
  onOpen,
}: ShowcaseGridProps) {
  // With showcaseSlots, always render that many slots (missing → "no image").
  // Otherwise use provided images, or fall back to the branded panel.
  const slots = showcaseSlots
    ? Array.from({ length: showcaseSlots }, (_, i) => showcase?.[i] ?? '')
    : showcase?.slice(0, 3) ?? []

  if (!slots.length) {
    return (
      <div
        className="relative flex h-full min-h-[300px] items-center justify-center overflow-hidden rounded-3xl border border-[rgba(var(--rgb-line),0.1)]"
        style={{
          background: `linear-gradient(135deg, ${hexToRgba(accent, 0.1)} 0%, rgba(var(--rgb-film),0.015) 55%, rgba(10,9,20,0.6) 100%)`,
        }}
      >
        {/* Grid pattern */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.05] bg-[linear-gradient(rgba(var(--rgb-line),.6)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--rgb-line),.6)_1px,transparent_1px)] [background-size:32px_32px]" />
        {/* Floating orbs */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.45, 0.25] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full blur-[70px]"
          style={{ background: `radial-gradient(circle, ${accent}, transparent 70%)` }}
        />
        <motion.div
          animate={{ scale: [1.15, 1, 1.15], opacity: [0.15, 0.35, 0.15] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full blur-[60px]"
          style={{ background: `radial-gradient(circle, ${accent}, transparent 70%)` }}
        />
        {/* Icon watermark */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="relative flex h-24 w-24 items-center justify-center rounded-3xl border border-[rgba(var(--rgb-line),0.16)] bg-[var(--app-panel)] backdrop-blur-md"
          style={{ boxShadow: `0 0 60px ${hexToRgba(accent, 0.2)}, inset 0 1px 0 rgba(var(--rgb-film),0.08)` }}
        >
          <Icon size={44} style={{ color: accent }} />
        </motion.div>
      </div>
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {slots.map((src, idx) => {
        // 1 slot → full width. 3 slots → first is a full-width lead.
        const isFull = slots.length === 1 || (slots.length === 3 && idx === 0)
        const caption = `${String(idx + 1).padStart(2, '0')} / ${proofLabel}`

        return (
          <motion.figure
            key={`${idx}-${src}`}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className={`group relative m-0 overflow-hidden rounded-3xl border bg-[rgba(var(--rgb-film),0.02)] ${
              src
                ? 'border-[rgba(var(--rgb-line),0.1)]'
                : 'border-dashed border-[rgba(var(--rgb-line),0.14)]'
            } ${
              isFull
                ? 'min-h-[280px] sm:col-span-2 md:min-h-[420px]'
                : 'min-h-[220px] md:min-h-[300px]'
            }`}
          >
            {src ? (
              <>
                <button
                  type="button"
                  aria-label={`View ${proofLabel} ${idx + 1} full size`}
                  onClick={() =>
                    onOpen({
                      src,
                      alt: `${title} — ${proofLabel} ${idx + 1}`,
                      caption: title,
                      label: caption,
                      accent,
                    })
                  }
                  className="absolute inset-0 h-full w-full cursor-pointer"
                >
                  <img
                    src={src}
                    alt={`${title} — ${proofLabel} ${idx + 1}`}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,9,20,0.5)] to-transparent" />
                  <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-md border border-[rgba(var(--rgb-line),0.18)] bg-[rgba(10,9,20,0.6)] text-accent-lavender opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100 max-md:opacity-80">
                    <TbMaximize size={16} />
                  </span>
                </button>
                <figcaption
                  className="pointer-events-none absolute bottom-3 left-3 rounded-md border border-[rgba(var(--rgb-line),0.15)] bg-[rgba(10,9,20,0.6)] px-2.5 py-1 font-heading text-[9px] font-bold uppercase tracking-[0.16em] backdrop-blur-md"
                  style={{ color: accent }}
                >
                  {caption}
                </figcaption>
              </>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5">
                <div className="pointer-events-none absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(var(--rgb-line),1)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--rgb-line),1)_1px,transparent_1px)] [background-size:26px_26px]" />
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-dashed border-[rgba(var(--rgb-line),0.2)] bg-[rgba(var(--rgb-film),0.02)]">
                  <TbPhotoOff size={18} className="text-accent-lavender/40" />
                </div>
                <span className="font-heading text-[9px] font-bold uppercase tracking-[0.2em] text-accent-lavender/30">
                  No image
                </span>
              </div>
            )}
          </motion.figure>
        )
      })}
    </div>
  )
}

function DetailView({
  backTo,
  backLabel,
  eyebrow,
  title,
  description,
  accent,
  Icon,
  meta,
  tags,
  tagsHeading = 'Tech Stack',
  points,
  pointsHeading = 'What I Did',
  highlights,
  highlightsHeading = '3 Key Points',
  quote,
  quoteHeading = 'Reflection',
  image,
  externalUrl,
  showcase,
  showcaseSlots,
  showcaseHeading,
  proofLabel = 'Proof',
}: DetailViewProps) {
  const containerRef = useRef<HTMLElement>(null)
  const bannerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const [lightbox, setLightbox] = useState<LightboxImage | null>(null)

  const accentRgba10 = hexToRgba(accent, 0.1)
  const accentRgba20 = hexToRgba(accent, 0.2)
  const accentRgba40 = hexToRgba(accent, 0.4)

  /* GSAP Scroll Animations */
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax banner
      gsap.to(bannerRef.current, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: bannerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const metaIcons: Record<string, IconType> = {
    Role: TbBriefcase,
    Period: TbCalendar,
    Location: TbMapPin,
  }

  return (
    <motion.main
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="min-w-0 pb-20"
    >
      {/* ─── Floating Back Button ─── */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="fixed left-6 top-6 z-50"
      >
        <MagneticButton
          className="group inline-flex items-center gap-2.5 rounded-md border border-[rgba(var(--rgb-line),0.15)] bg-[var(--app-panel-strong)] px-5 py-2.5 font-heading text-[11px] font-bold uppercase tracking-[0.08em] text-accent-lavender backdrop-blur-xl transition-all duration-300 hover:border-[rgba(var(--rgb-line),0.4)] hover:bg-[rgba(var(--rgb-hover),0.12)] hover:shadow-[0_0_30px_rgba(var(--rgb-hover),0.15)]"
          onClick={() => window.history.back()}
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[rgba(var(--rgb-hover),0.1)] transition-transform duration-300 group-hover:-translate-x-1">
            <TbArrowLeft size={14} />
          </span>
          {backLabel}
        </MagneticButton>
      </motion.div>

      {/* ─── Hero Banner ─── */}
      <div className="relative h-[70vh] min-h-[500px] w-full overflow-hidden">
        {/* Background Image/Gradient */}
        <div
          ref={bannerRef}
          className="absolute inset-0 scale-105 md:scale-110"
          style={
            image
              ? undefined
              : {
                  background: `linear-gradient(135deg, ${accent}20 0%, rgba(10,9,20,0.98) 60%, #0a0914 100%)`,
                }
          }
        >
          {image && (
            <>
              {/* Blurred fill so letterboxed areas on mobile stay on-brand */}
              <div
                className="absolute inset-0 scale-125 opacity-30 blur-2xl md:hidden"
                style={{ background: `url(${image}) center/cover no-repeat` }}
              />
              <img
                src={image}
                alt={title}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-contain object-center md:object-cover"
              />
            </>
          )}
          {!image && (
            <>
              {/* Animated gradient orbs */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full blur-[120px]"
                style={{ background: `radial-gradient(circle, ${accent}, transparent 70%)` }}
              />
              <motion.div
                animate={{
                  scale: [1.2, 1, 1.2],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                className="absolute -bottom-32 -left-32 h-[400px] w-[400px] rounded-full blur-[100px]"
                style={{ background: `radial-gradient(circle, ${accent}, transparent 70%)` }}
              />
            </>
          )}
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(10,9,20,0.3)] to-[#0a0914]" />

        {/* Grid Pattern */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.04] bg-[linear-gradient(rgba(var(--rgb-line),.5)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--rgb-line),.5)_1px,transparent_1px)] [background-size:60px_60px]" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-12 lg:p-16">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-4 flex items-center gap-3"
          >
            <span className="h-px w-8 bg-white/50" />
            <span className="font-heading text-[11px] font-bold uppercase tracking-[0.3em] text-white/80">
              {eyebrow}
            </span>
          </motion.div>

          {/* Title */}
          <h1
            ref={titleRef}
            className="max-w-4xl font-heading text-[clamp(1.75rem,6vw,5rem)] font-black uppercase leading-[1.02] tracking-tight text-white sm:leading-[0.95]"
          >
            <RevealText text={title} delay={0.4} />
          </h1>

          {/* External Link */}
          {externalUrl && (
            <motion.a
              href={externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="group/link mt-6 inline-flex w-fit items-center gap-2.5 rounded-md border border-[rgba(var(--rgb-line),0.18)] bg-[var(--app-panel)] py-2 pl-3 pr-4 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-[rgba(var(--rgb-line),0.4)] hover:bg-[rgba(var(--rgb-hover),0.14)] hover:shadow-[0_8px_28px_rgba(var(--rgb-hover),0.18)]"
            >
              <span
                className="flex h-6 w-6 items-center justify-center rounded-md"
                style={{ background: accentRgba20, color: accent }}
              >
                <TbWorld size={13} />
              </span>
              <span className="text-[12px] font-medium text-accent-lavender/80 transition-colors group-hover/link:text-accent-lavender">
                {prettyUrl(externalUrl)}
              </span>
              <TbExternalLink
                size={12}
                className="text-accent-lavender/50 transition-all duration-300 group-hover/link:translate-x-0.5 group-hover/link:text-accent-lavender"
              />
            </motion.a>
          )}
        </div>

        {/* Expand cover — opens the full, unscaled image */}
        {image ? (
          <motion.button
            type="button"
            aria-label="View cover image"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            onClick={() => setLightbox({ src: image, alt: title, caption: title, label: eyebrow, accent })}
            className="absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-md border border-[rgba(var(--rgb-line),0.18)] bg-[var(--app-panel)] text-accent-lavender backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-[rgba(var(--rgb-line),0.45)] hover:bg-[rgba(var(--rgb-hover),0.16)] sm:right-8 sm:top-8"
          >
            <TbMaximize size={18} />
          </motion.button>
        ) : null}
      </div>

      {/* ─── Content Area ─── */}
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Meta + Description Grid */}
        <div className="meta-grid mt-16 grid gap-12 lg:grid-cols-[320px_1fr] lg:gap-16">
          {/* Meta Sidebar */}
          <div className="space-y-6">
            {meta.map(({ label, value }) => {
              const MetaIcon = metaIcons[label] || TbBriefcase
              return (
                <motion.div
                  key={label}
                  className="meta-item group relative overflow-hidden rounded-2xl border border-[rgba(var(--rgb-line),0.08)] bg-[rgba(var(--rgb-film),0.02)] p-5 transition-all duration-300 hover:border-[rgba(var(--rgb-line),0.2)] hover:bg-[rgba(var(--rgb-film),0.04)]"
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ x: 4 }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                      style={{ background: accentRgba10 }}
                    >
                      <MetaIcon size={18} style={{ color: accent }} />
                    </div>
                    <div>
                      <dt
                        className="font-heading text-[10px] font-bold uppercase tracking-[0.2em]"
                        style={{ color: accent }}
                      >
                        {label}
                      </dt>
                      <dd className="mt-1 text-[13px] font-medium leading-relaxed text-text-primary">
                        {value}
                      </dd>
                    </div>
                  </div>
                </motion.div>
              )
            })}

            {/* Tags */}
            {tags?.length ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="rounded-2xl border border-[rgba(var(--rgb-line),0.08)] bg-[rgba(var(--rgb-film),0.02)] p-5"
              >
                <h3
                  className="mb-4 font-heading text-[10px] font-bold uppercase tracking-[0.2em]"
                  style={{ color: accent }}
                >
                  {tagsHeading}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, i) => (
                    <motion.span
                      key={tag}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="cursor-default rounded-lg border border-[rgba(var(--rgb-line),0.12)] bg-[rgba(var(--rgb-hover),0.06)] px-3 py-1.5 text-[11px] font-medium text-accent-lavender/80 transition-colors hover:border-[rgba(var(--rgb-line),0.25)] hover:bg-[rgba(var(--rgb-hover),0.12)] hover:text-accent-lavender"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ) : null}
          </div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col"
          >
            <div className="relative">
              <span
                className="absolute -left-4 -top-8 font-heading text-[120px] font-black leading-none opacity-[0.03] select-none"
                style={{ color: accent }}
              >
                "
              </span>
              <p className="relative text-[15px] font-light leading-[2] text-text-secondary lg:text-[16px]">
                {description}
              </p>
            </div>

            {/* Decorative line */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
              className="mt-8 h-px w-24 origin-left bg-gradient-to-r"
              style={{ backgroundImage: `linear-gradient(to right, ${accent}, transparent)` }}
            />
          </motion.div>
        </div>

        {/* ─── Points Section ─── */}
        {points?.length ? (
          <section className="mt-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10 flex items-center gap-4"
            >
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[rgba(var(--rgb-line),0.1)]" />
              <h2 className="text-center font-heading text-sm font-bold uppercase tracking-[0.25em] text-text-primary">
                {pointsHeading}
              </h2>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[rgba(var(--rgb-line),0.1)]" />
            </motion.div>

            <div className="points-grid mx-auto grid max-w-5xl gap-4 sm:grid-cols-2">
              {points.map((point, index) => (
                <motion.div
                  key={point}
                  className="point-card group relative overflow-hidden rounded-2xl border border-[rgba(var(--rgb-line),0.06)] bg-[rgba(var(--rgb-film),0.015)] p-6 transition-all duration-500 hover:border-[rgba(var(--rgb-line),0.18)]"
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -4, transition: { duration: 0.3 } }}
                >
                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${accentRgba10}, transparent 40%)`,
                    }}
                  />
                  
                  <div className="relative flex gap-5">
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-heading text-[12px] font-bold transition-all duration-300 group-hover:scale-110"
                      style={{
                        background: accentRgba10,
                        color: accent,
                        boxShadow: `0 0 20px ${accentRgba20}`,
                      }}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <p className="pt-1 text-[13px] font-light leading-[1.8] text-text-secondary transition-colors duration-300 group-hover:text-text-primary">
                      {point}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        ) : null}

        {/* ─── Highlights Section ─── */}
        {highlights?.length ? (
          <section className="highlights-container mt-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10 flex items-center gap-4"
            >
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[rgba(var(--rgb-line),0.1)]" />
              <h2 className="text-center font-heading text-sm font-bold uppercase tracking-[0.25em] text-text-primary">
                {highlightsHeading}
              </h2>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[rgba(var(--rgb-line),0.1)]" />
            </motion.div>

            <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-3">
              {highlights.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="highlight-chip group flex items-center gap-3 rounded-md border border-[rgba(var(--rgb-line),0.1)] bg-[rgba(var(--rgb-film),0.02)] px-5 py-3 transition-all duration-300 hover:border-[rgba(var(--rgb-line),0.25)] hover:bg-[rgba(var(--rgb-film),0.05)]"
                >
                  <span
                    className="h-2 w-2 shrink-0 rounded-full transition-shadow duration-300 group-hover:shadow-[0_0_12px]"
                    style={{ background: accent, boxShadow: `0 0 8px ${accentRgba40}` }}
                  />
                  <p className="text-[13px] font-medium text-text-secondary transition-colors group-hover:text-text-primary">
                    {item}
                  </p>
                </motion.div>
              ))}
            </div>
          </section>
        ) : null}

        {/* ─── Showcase Section — sits under "Key Points" ─── */}
        {showcaseSlots || showcase?.length ? (
          <section className="mt-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10 flex items-center gap-4"
            >
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[rgba(var(--rgb-line),0.1)]" />
              <h2 className="text-center font-heading text-sm font-bold uppercase tracking-[0.25em] text-text-primary">
                {showcaseHeading ?? 'Showcase'}
              </h2>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[rgba(var(--rgb-line),0.1)]" />
            </motion.div>

            <div className="mx-auto max-w-5xl">
              <ShowcaseGrid
                showcase={showcase}
                showcaseSlots={showcaseSlots}
                title={title}
                proofLabel={proofLabel}
                accent={accent}
                Icon={Icon}
                onOpen={setLightbox}
              />
            </div>
          </section>
        ) : null}

        {/* ─── Quote Section ─── */}
        {quote ? (
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative mt-20 overflow-hidden rounded-[32px] border border-[rgba(var(--rgb-line),0.08)] bg-[rgba(var(--rgb-film),0.015)] p-10 sm:p-14"
          >
            {/* Animated background glow */}
            <motion.div
              animate={{
                x: [0, 30, 0],
                y: [0, -20, 0],
              }}
              transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
              className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-20 blur-[80px]"
              style={{ background: `radial-gradient(circle, ${accent}, transparent 70%)` }}
            />
            <motion.div
              animate={{
                x: [0, -20, 0],
                y: [0, 30, 0],
              }}
              transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
              className="pointer-events-none absolute -bottom-20 -left-20 h-48 w-48 rounded-full opacity-15 blur-[60px]"
              style={{ background: `radial-gradient(circle, ${accent}, transparent 70%)` }}
            />

            <div className="relative">
              <p
                className="mb-6 font-heading text-[10px] font-bold uppercase tracking-[0.3em]"
                style={{ color: accent }}
              >
                {quoteHeading}
              </p>

              <div className="relative">
                <span
                  className="absolute -left-2 -top-8 font-heading text-[80px] font-black leading-none opacity-[0.08] sm:text-[100px]"
                  style={{ color: accent }}
                >
                  &ldquo;
                </span>
                <p className="relative max-w-6xl text-lg font-light italic leading-[1.9] text-text-secondary sm:text-xl">
                  {quote}
                </p>
              </div>

              {/* Decorative signature line */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
                className="mt-8 h-px w-16 origin-left"
                style={{ background: accent }}
              />
            </div>
          </motion.section>
        ) : null}

        {/* ─── Bottom Navigation ─── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 flex justify-center"
        >
          <Link
            to={backTo}
            className="group inline-flex items-center gap-3 rounded-md border border-[rgba(var(--rgb-line),0.12)] bg-[rgba(var(--rgb-hover),0.05)] px-8 py-3 font-heading text-[12px] font-semibold uppercase tracking-[0.1em] text-accent-lavender transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(var(--rgb-line),0.3)] hover:bg-[rgba(var(--rgb-hover),0.12)] hover:shadow-[0_10px_40px_rgba(var(--rgb-hover),0.15)]"
          >
            <TbArrowLeft
              size={16}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
            {backLabel}
          </Link>
        </motion.div>
      </div>

      <ImageLightbox image={lightbox} onClose={() => setLightbox(null)} />
    </motion.main>
  )
}

export default DetailView