import { useRef, useEffect, useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { IconType } from 'react-icons'
import {
  TbArrowLeft,
  TbArrowRight,
  TbLayoutGrid,
  TbExternalLink,
  TbMapPin,
  TbCalendar,
  TbBriefcase,
  TbWorld,
  TbPhotoOff,
  TbMaximize,
} from 'react-icons/tb'
import { Link, useNavigate } from 'react-router-dom'
import ImageLightbox from './ImageLightbox'
import type { LightboxImage } from './ImageLightbox'
import FlowDiagram from './fde/FlowDiagram'
import type { FlowDiagram as FlowDiagramType } from '../content/schema'
import { useLanguage } from '../hooks/useLanguage'

gsap.registerPlugin(ScrollTrigger)

export type DetailMeta = { label: string; value: string }

export type AdjacentItem = {
  title: string
  to: string
}

export type DetailViewProps = {
  backTo: string
  backLabel: string
  prevItem?: AdjacentItem
  nextItem?: AdjacentItem
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
  /** Shown under the grid when a slot is still empty *and* `externalUrl` is set —
   *  the live site stands in for the screenshots that aren't up yet. */
  showcaseFallbackNote?: string
  /** Shown under the grid when a slot is empty and there is no link to offer */
  showcaseEmptyNote?: string
  /** The business problem and friction being solved */
  businessProblem?: string
  /** The engineering and product solution */
  solutionFit?: string
  /** End-to-end system and business flow */
  systemFlow?: FlowDiagramType
  /** Technical architecture */
  architecture?: FlowDiagramType
  /** Owned scope breakdown */
  scope?: { type: 'solo' | 'lead' | 'contributor'; summary: string }
}

/** Slot list for the showcase grid — shared so the empty-state note and the
 *  grid itself can never disagree about what counts as missing. */
function buildShowcaseSlots(
  showcase?: string[],
  showcaseSlots?: number,
): string[] {
  return showcaseSlots
    ? Array.from({ length: showcaseSlots }, (_, i) => showcase?.[i] ?? '')
    : showcase?.slice(0, 3) ?? []
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

/* ─── Magnetic Link Component ─── */
function MagneticLink({ to, children, className, ...props }: React.ComponentProps<typeof Link>) {
  const ref = useRef<HTMLAnchorElement>(null)

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
    <Link
      ref={ref}
      to={to}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </Link>
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
  const slots = buildShowcaseSlots(showcase, showcaseSlots)

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
            className={`group relative m-0 overflow-hidden rounded-3xl border bg-[rgba(var(--rgb-film),0.02)] ${src
              ? 'border-[rgba(var(--rgb-line),0.1)]'
              : 'border-dashed border-[rgba(var(--rgb-line),0.14)]'
              } ${isFull
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
  prevItem,
  nextItem,
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
  showcaseFallbackNote,
  showcaseEmptyNote,
  businessProblem,
  solutionFit,
  systemFlow,
  architecture,
  scope,
}: DetailViewProps) {
  const navigate = useNavigate()
  const { language } = useLanguage()
  const containerRef = useRef<HTMLElement>(null)
  const bannerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const [lightbox, setLightbox] = useState<LightboxImage | null>(null)

  // Keyboard navigation for previous & next item
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = (document.activeElement?.tagName || '').toUpperCase()
      if (['INPUT', 'TEXTAREA'].includes(activeTag)) return
      if (lightbox) return

      if (e.key === 'ArrowLeft' && prevItem) {
        navigate(prevItem.to)
      } else if (e.key === 'ArrowRight' && nextItem) {
        navigate(nextItem.to)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [prevItem, nextItem, lightbox, navigate])

  const hasEmptyShowcaseSlot = buildShowcaseSlots(showcase, showcaseSlots).some(
    (src) => !src,
  )

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

  // ─── Table of Contents (ON THIS PAGE) ───
  const tocItems = useMemo(() => {
    const items: Array<{ id: string; label: string }> = [
      { id: 'overview', label: language === 'id' ? 'Ringkasan' : 'Overview' },
    ]
    if (businessProblem) {
      items.push({ id: 'problem', label: language === 'id' ? 'Masalah Bisnis' : 'Problem' })
    }
    if (solutionFit) {
      items.push({ id: 'solution', label: language === 'id' ? 'Solusi Produk / Sistem' : 'Solution Fit' })
    }
    if (systemFlow?.nodes?.length) {
      items.push({ id: 'flow', label: language === 'id' ? 'Alur Produk' : 'Product Flow' })
    }
    if (architecture?.nodes?.length) {
      items.push({ id: 'architecture', label: language === 'id' ? 'Arsitektur' : 'Architecture' })
    }
    if (tags?.length) {
      items.push({ id: 'tech-stack', label: 'Tech Stack' })
    }
    if (points?.length) {
      items.push({ id: 'contribution', label: language === 'id' ? 'Kontribusi' : 'Contribution' })
    }
    if (highlights?.length) {
      items.push({ id: 'highlights', label: language === 'id' ? 'Hasil Utama' : 'Key Results' })
    }
    if (showcaseSlots || showcase?.length) {
      items.push({ id: 'gallery', label: language === 'id' ? 'Galeri Bukti' : 'Gallery' })
    }
    if (quote) {
      items.push({ id: 'reflection', label: language === 'id' ? 'Refleksi' : 'Reflection' })
    }
    return items
  }, [
    businessProblem,
    solutionFit,
    systemFlow,
    architecture,
    tags,
    points,
    highlights,
    showcaseSlots,
    showcase,
    quote,
    language,
  ])

  const [activeSection, setActiveSection] = useState<string>('overview')

  useEffect(() => {
    let ticking = false

    const updateActiveSection = () => {
      // If user reached near the bottom of the page, activate the last section
      const isAtBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100

      if (isAtBottom && tocItems.length > 0) {
        setActiveSection(tocItems[tocItems.length - 1].id)
        ticking = false
        return
      }

      // Threshold for activating a section as it scrolls into the upper reading area
      const threshold = 180
      let current = tocItems[0]?.id ?? 'overview'
      for (const item of tocItems) {
        const el = document.getElementById(item.id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= threshold) {
            current = item.id
          }
        }
      }
      setActiveSection(current)
      ticking = false
    }

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateActiveSection)
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    updateActiveSection()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [tocItems])

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
        <MagneticLink
          to={backTo}
          className="group inline-flex items-center gap-2.5 rounded-md border border-[rgba(var(--rgb-line),0.15)] bg-[var(--app-panel-strong)] px-5 py-2.5 font-heading text-[11px] font-bold uppercase tracking-[0.08em] text-accent-lavender backdrop-blur-xl transition-all duration-300 hover:border-[rgba(var(--rgb-line),0.4)] hover:bg-[rgba(var(--rgb-hover),0.12)] hover:shadow-[0_0_30px_rgba(var(--rgb-hover),0.15)]"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[rgba(var(--rgb-hover),0.1)] transition-transform duration-300 group-hover:-translate-x-1">
            <TbArrowLeft size={14} />
          </span>
          {backLabel}
        </MagneticLink>
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
        <div className="relative mt-12 sm:mt-16 lg:grid lg:grid-cols-[1fr_210px] xl:grid-cols-[1fr_230px] gap-10 xl:gap-14 items-start">
          {/* Main Content Column (All sections w-full for unified, harmonious width) */}
          <div className="min-w-0 w-full space-y-16 sm:space-y-20">
            {/* 00. Summary Executive Project / Product */}
            <section id="overview" className="scroll-mt-28 w-full">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative overflow-hidden rounded-3xl border border-[rgba(var(--rgb-line),0.12)] bg-[var(--app-panel)] p-6 sm:p-9 lg:p-11 backdrop-blur-md shadow-xl w-full"
              >
                {/* Metadata Badges Row */}
                <div className="mb-8 flex flex-wrap items-center gap-3">
                  {meta.map(({ label, value }) => {
                    const MetaIcon = metaIcons[label] || TbBriefcase
                    return (
                      <div
                        key={label}
                        className="inline-flex items-center gap-2.5 rounded-xl border border-[rgba(var(--rgb-line),0.12)] bg-[rgba(var(--rgb-film),0.02)] px-4 py-2 transition-all hover:border-[rgba(var(--rgb-line),0.25)] hover:bg-[rgba(var(--rgb-film),0.04)]"
                      >
                        <MetaIcon size={14} style={{ color: accent }} />
                        <span className="font-heading text-[10px] font-bold uppercase tracking-[0.2em] text-accent-lavender/70">
                          {label}:
                        </span>
                        <span className="text-[13px] font-medium text-text-primary">
                          {value}
                        </span>
                      </div>
                    )
                  })}
                </div>

                {/* Executive Summary Thesis / Description */}
                <div className="relative mb-8">
                  <span
                    className="absolute -left-3 -top-7 font-heading text-[100px] font-black leading-none opacity-[0.04] select-none pointer-events-none"
                    style={{ color: accent }}
                  >
                    "
                  </span>
                  <p className="relative text-[15px] sm:text-[17px] font-light leading-[1.9] text-text-secondary lg:text-[18px]">
                    {description}
                  </p>
                </div>

                {/* Owned Scope Strip (LEAD / Core Ownership) */}
                {scope ? (
                  <div className="rounded-2xl border border-[rgba(var(--rgb-line),0.12)] bg-[rgba(var(--rgb-hover),0.05)] p-5 sm:p-6 transition-all">
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-2.5">
                      <span className="font-heading text-[10.5px] font-bold uppercase tracking-[0.2em] text-accent-lavender">
                        {language === 'id' ? 'Tanggung Jawab yang Dipegang' : 'Owned Engineering Responsibility'}
                      </span>
                      <span className="rounded-full border border-[rgba(var(--rgb-line),0.2)] bg-[rgba(var(--rgb-hover),0.12)] px-3.5 py-0.5 font-heading text-[10px] font-bold uppercase tracking-wider text-accent-lavender">
                        {scope.type}
                      </span>
                    </div>
                    <p className="text-[13.5px] sm:text-[14.5px] leading-relaxed text-text-primary">
                      {scope.summary}
                    </p>
                  </div>
                ) : null}
              </motion.div>
            </section>

            {/* 01. Business Problem */}
            {businessProblem ? (
              <section id="problem" className="scroll-mt-28 w-full">
                <h2 className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight text-text-primary">
                  {language === 'id' ? 'Masalah Bisnis' : 'Problem'}
                </h2>
                <p className="mt-4 text-[15px] sm:text-[16.5px] leading-[1.85] text-text-secondary">
                  {businessProblem}
                </p>
              </section>
            ) : null}

            {/* 02. The Engineering Solution Fit */}
            {solutionFit ? (
              <section id="solution" className="scroll-mt-28 w-full">
                <h2 className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight text-text-primary">
                  {language === 'id' ? 'Solusi Produk / Sistem' : 'Solution Fit'}
                </h2>
                <p className="mt-4 text-[15px] sm:text-[16.5px] leading-[1.85] text-text-secondary">
                  {solutionFit}
                </p>
              </section>
            ) : null}

            {/* 03. Business & Product Flow */}
            {systemFlow?.nodes?.length ? (
              <section id="flow" className="scroll-mt-28 w-full">
                <div className="mb-6">
                  <h2 className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight text-text-primary">
                    {language === 'id' ? 'Alur Bisnis & Proses Produk' : 'Product & Business Flow'}
                  </h2>
                  <p className="mt-1.5 text-[12.5px] text-text-muted">
                    {language === 'id' ? 'Visualisasi alur sistem dari pemicu awal hingga output selesai' : 'End-to-end operational pipeline from initial trigger to completed output'}
                  </p>
                </div>

                <div className="w-full">
                  <FlowDiagram diagram={systemFlow} mode="system" />
                </div>
              </section>
            ) : null}

            {/* 04. Technical Architecture (only if present) */}
            {architecture?.nodes?.length ? (
              <section id="architecture" className="scroll-mt-28 w-full">
                <div className="mb-6">
                  <h2 className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight text-text-primary">
                    {language === 'id' ? 'Arsitektur Teknis & Topologi' : 'Technical Architecture'}
                  </h2>
                  <p className="mt-1.5 text-[12.5px] text-text-muted">
                    {language === 'id' ? 'Topologi software, inferensi sistem, dan batas keamanan' : 'Service topology, system inference, and security boundaries'}
                  </p>
                </div>

                <div className="w-full">
                  <FlowDiagram diagram={architecture} mode="architecture" />
                </div>
              </section>
            ) : null}

            {/* 05. Core Tech Stack */}
            {tags?.length ? (
              <section id="tech-stack" className="scroll-mt-28 w-full">
                <h2 className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight text-text-primary mb-6">
                  {tagsHeading}
                </h2>

                <div className="w-full rounded-2xl border border-[rgba(var(--rgb-line),0.12)] bg-[var(--app-panel)] p-6 sm:p-8 backdrop-blur-md shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                    <span className="font-heading text-[10.5px] font-bold uppercase tracking-[0.2em] text-accent-lavender">
                      {language === 'id' ? 'Tools & Technology Stack' : 'Core Technology Stack & Tools'}
                    </span>
                    <span className="font-mono text-[10.5px] text-text-muted">
                      {tags.length} Technologies
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-lg border border-[rgba(var(--rgb-line),0.15)] bg-[rgba(var(--rgb-hover),0.08)] px-3.5 py-1.5 font-mono text-[11.5px] font-medium text-accent-lavender hover:border-[rgba(var(--rgb-line),0.3)] hover:bg-[rgba(var(--rgb-hover),0.15)] transition-all"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </section>
            ) : null}

            {/* 06. Key Points / Contribution */}
            {points?.length ? (
              <section id="contribution" className="scroll-mt-28 w-full">
                <h2 className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight text-text-primary">
                  {pointsHeading || (language === 'id' ? 'Kontribusi' : 'Contribution')}
                </h2>

                <div className="mt-6 divide-y divide-[rgba(var(--rgb-line),0.12)] border-t border-[rgba(var(--rgb-line),0.12)] w-full">
                  {points.map((point, index) => (
                    <motion.div
                      key={point}
                      className="py-5 sm:py-6 flex items-start gap-5 sm:gap-6 group"
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-20px' }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                    >
                      <span className="font-mono text-xs sm:text-sm font-bold text-accent-lavender tracking-wider shrink-0 pt-0.5">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <p className="text-[14px] sm:text-[15.5px] leading-[1.8] text-text-secondary transition-colors duration-200 group-hover:text-text-primary">
                        {point}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </section>
            ) : null}

            {/* 07. Highlights Section (Results) */}
            {highlights?.length ? (
              <section id="highlights" className="highlights-container scroll-mt-28 w-full">
                <h2 className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight text-text-primary mb-6">
                  {highlightsHeading || (language === 'id' ? 'Hasil Utama' : 'Results')}
                </h2>

                <div className="flex w-full flex-wrap gap-3">
                  {highlights.map((item, i) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06 }}
                      whileHover={{ scale: 1.03, y: -2 }}
                      className="highlight-chip group flex items-center gap-3 rounded-xl border border-[rgba(var(--rgb-line),0.12)] bg-[var(--app-panel)] px-5 py-3.5 transition-all duration-300 hover:border-[rgba(var(--rgb-line),0.25)] hover:bg-[rgba(var(--rgb-hover),0.1)] shadow-sm"
                    >
                      <span
                        className="h-2 w-2 shrink-0 rounded-full transition-shadow duration-300 group-hover:shadow-[0_0_12px]"
                        style={{ background: accent, boxShadow: `0 0 8px ${accentRgba40}` }}
                      />
                      <p className="text-[13.5px] font-medium text-text-secondary transition-colors group-hover:text-text-primary">
                        {item}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </section>
            ) : null}

            {/* 08. Showcase Section */}
            {showcaseSlots || showcase?.length ? (
              <section id="gallery" className="scroll-mt-28 w-full">
                <h2 className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight text-text-primary mb-6">
                  {showcaseHeading ?? (language === 'id' ? 'Galeri Bukti' : 'Gallery')}
                </h2>

                <div className="w-full">
                  <ShowcaseGrid
                    showcase={showcase}
                    showcaseSlots={showcaseSlots}
                    title={title}
                    proofLabel={proofLabel}
                    accent={accent}
                    Icon={Icon}
                    onOpen={setLightbox}
                  />

                  {hasEmptyShowcaseSlot && (externalUrl ? showcaseFallbackNote : showcaseEmptyNote) ? (
                    <motion.p
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.15 }}
                      className="mt-6 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-2xl border border-dashed border-[rgba(var(--rgb-line),0.12)] bg-[rgba(var(--rgb-film),0.015)] px-5 py-4 text-center text-[12px] font-light leading-relaxed text-text-muted"
                    >
                      <TbPhotoOff size={15} className="shrink-0 text-accent-lavender/40" />
                      {externalUrl ? (
                        <>
                          {showcaseFallbackNote}
                          <a
                            href={externalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/note inline-flex items-center gap-1.5 font-medium underline decoration-dotted underline-offset-4 transition-colors"
                            style={{ color: accent }}
                          >
                            {prettyUrl(externalUrl)}
                            <TbExternalLink
                              size={12}
                              className="transition-transform duration-300 group-hover/note:-translate-y-0.5 group-hover/note:translate-x-0.5"
                            />
                          </a>
                        </>
                      ) : (
                        showcaseEmptyNote
                      )}
                    </motion.p>
                  ) : null}
                </div>
              </section>
            ) : null}

            {/* 09. Quote Section */}
            {quote ? (
              <section id="reflection" className="scroll-mt-28 w-full">
                <h2 className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight text-text-primary mb-6">
                  {quoteHeading ?? (language === 'id' ? 'Refleksi' : 'Reflection')}
                </h2>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="relative overflow-hidden rounded-3xl border border-[rgba(var(--rgb-line),0.1)] bg-[rgba(var(--rgb-film),0.02)] p-8 sm:p-12 w-full"
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
                    <span
                      className="absolute -left-2 -top-8 font-heading text-[80px] font-black leading-none opacity-[0.08] sm:text-[100px]"
                      style={{ color: accent }}
                    >
                      &ldquo;
                    </span>
                    <p className="relative max-w-5xl text-lg font-light italic leading-[1.9] text-text-secondary sm:text-xl">
                      {quote}
                    </p>

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
                </motion.div>
              </section>
            ) : null}
          </div>

          {/* Sticky Sidebar: ON THIS PAGE */}
          <aside className="sticky top-28 hidden lg:block self-start w-full z-20 max-h-[calc(100vh-9rem)] overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <div className="font-mono text-[10.5px] font-bold uppercase tracking-[0.25em] text-text-muted mb-4 px-2">
              {language === 'id' ? 'DI HALAMAN INI' : 'ON THIS PAGE'}
            </div>
            <nav className="flex flex-col space-y-1">
              {tocItems.map((item) => {
                const isActive = activeSection === item.id
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault()
                        ; (e.currentTarget as HTMLElement).blur()
                      const el = document.getElementById(item.id)
                      if (el) {
                        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                        window.history.replaceState(null, '', `#${item.id}`)
                        setActiveSection(item.id)
                      }
                    }}
                    className={`group relative flex items-center gap-2.5 rounded-lg px-3 py-1.5 text-[12.5px] outline-none focus:outline-none focus-visible:outline-none select-none transition-colors duration-200 ${isActive
                        ? 'text-white font-medium'
                        : 'text-text-muted hover:text-text-primary hover:bg-[rgba(var(--rgb-film),0.03)] font-normal'
                      }`}
                  >
                    {isActive ? (
                      <motion.div
                        layoutId="active-toc-pill"
                        className="pointer-events-none absolute inset-0 rounded-lg border border-purple-500/50 bg-purple-500/10 shadow-[0_0_15px_rgba(168,85,247,0.2)]"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    ) : null}

                    <span className="relative z-10 flex h-2 w-2 shrink-0 items-center justify-center">
                      {isActive ? (
                        <motion.span
                          layoutId="active-toc-dot"
                          className="h-1.5 w-1.5 rounded-[2px] bg-purple-400 shadow-[0_0_8px_#c084fc]"
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        />
                      ) : (
                        <span className="h-1.5 w-1.5 rounded-full border border-zinc-500/80 bg-transparent transition-colors duration-200 group-hover:border-zinc-300" />
                      )}
                    </span>
                    <span className="relative z-10 truncate">{item.label}</span>
                  </a>
                )
              })}
            </nav>
          </aside>
        </div>

        {/* ─── Bottom Navigation: Prev / Back / Next ─── */}
        <motion.nav
          aria-label="Navigation"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 border-t border-[rgba(var(--rgb-line),0.12)] pt-10"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-stretch sm:justify-between">
            {/* Previous Item */}
            {prevItem ? (
              <Link
                to={prevItem.to}
                className="group relative flex flex-1 items-center gap-4 rounded-2xl border border-[rgba(var(--rgb-line),0.14)] bg-[var(--app-panel)] p-4 sm:p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(var(--rgb-line),0.35)] hover:bg-[rgba(var(--rgb-hover),0.1)] hover:shadow-[0_12px_36px_rgba(var(--rgb-hover),0.15)]"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[rgba(var(--rgb-line),0.15)] bg-[rgba(var(--rgb-hover),0.1)] text-accent-lavender transition-all duration-300 group-hover:scale-105 group-hover:-translate-x-1 group-hover:border-accent-lavender/50 group-hover:bg-[rgba(var(--rgb-hover),0.2)]">
                  <TbArrowLeft size={20} />
                </span>
                <div className="min-w-0 flex-1">
                  <span className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted transition-colors group-hover:text-accent-lavender">
                    <span>{language === 'id' ? 'SEBELUMNYA' : 'PREVIOUS'}</span>
                    <kbd className="hidden sm:inline-block rounded border border-[rgba(var(--rgb-line),0.15)] bg-black/20 px-1.5 py-0.5 text-[9px] text-text-muted opacity-75 group-hover:border-accent-lavender/40 group-hover:text-accent-lavender">
                      ←
                    </kbd>
                  </span>
                  <span className="mt-1 block truncate font-heading text-sm font-semibold text-text-primary transition-colors group-hover:text-white sm:text-[15px]">
                    {prevItem.title}
                  </span>
                </div>
              </Link>
            ) : null}

            {/* Back Button (Center) */}
            <div className="flex items-center justify-center sm:self-center">
              <Link
                to={backTo}
                className="group inline-flex items-center gap-2.5 rounded-xl border border-[rgba(var(--rgb-line),0.15)] bg-[rgba(var(--rgb-film),0.03)] px-6 py-3 font-heading text-[11.5px] font-bold uppercase tracking-[0.12em] text-accent-lavender backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-[rgba(var(--rgb-line),0.35)] hover:bg-[rgba(var(--rgb-hover),0.12)] hover:shadow-[0_8px_25px_rgba(var(--rgb-hover),0.14)]"
              >
                <TbLayoutGrid size={15} className="transition-transform duration-300 group-hover:rotate-12" />
                <span>{backLabel}</span>
              </Link>
            </div>

            {/* Next Item */}
            {nextItem ? (
              <Link
                to={nextItem.to}
                className="group relative flex flex-1 items-center justify-between gap-4 rounded-2xl border border-[rgba(var(--rgb-line),0.14)] bg-[var(--app-panel)] p-4 sm:p-5 text-right backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(var(--rgb-line),0.35)] hover:bg-[rgba(var(--rgb-hover),0.1)] hover:shadow-[0_12px_36px_rgba(var(--rgb-hover),0.15)]"
              >
                <div className="min-w-0 flex-1">
                  <span className="flex items-center justify-end gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted transition-colors group-hover:text-accent-lavender">
                    <kbd className="hidden sm:inline-block rounded border border-[rgba(var(--rgb-line),0.15)] bg-black/20 px-1.5 py-0.5 text-[9px] text-text-muted opacity-75 group-hover:border-accent-lavender/40 group-hover:text-accent-lavender">
                      →
                    </kbd>
                    <span>{language === 'id' ? 'SELANJUTNYA' : 'NEXT'}</span>
                  </span>
                  <span className="mt-1 block truncate font-heading text-sm font-semibold text-text-primary transition-colors group-hover:text-white sm:text-[15px]">
                    {nextItem.title}
                  </span>
                </div>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[rgba(var(--rgb-line),0.15)] bg-[rgba(var(--rgb-hover),0.1)] text-accent-lavender transition-all duration-300 group-hover:scale-105 group-hover:translate-x-1 group-hover:border-accent-lavender/50 group-hover:bg-[rgba(var(--rgb-hover),0.2)]">
                  <TbArrowRight size={20} />
                </span>
              </Link>
            ) : null}
          </div>
        </motion.nav>
      </div>

      <ImageLightbox image={lightbox} onClose={() => setLightbox(null)} />
    </motion.main>
  )
}

export default DetailView