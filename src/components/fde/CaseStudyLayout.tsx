import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { TbArrowLeft, TbExternalLink } from 'react-icons/tb'
import type { CaseStudy } from '../../content/schema'
import { resolveLocalized } from '../../content/schema'
import { useLanguage } from '../../hooks/useLanguage'
import ScopeStrip from './ScopeStrip'
import FlowDiagram from './FlowDiagram'
import ResultCard from './ResultCard'
import ShowcaseGallery from './ShowcaseGallery'
import TechStackGroups from './TechStackGroups'

type CaseStudyLayoutProps = {
  caseStudy: CaseStudy
}

type SectionLink = {
  id: string
  label: { en: string; id: string }
}

export function CaseStudyLayout({ caseStudy }: CaseStudyLayoutProps) {
  const { language } = useLanguage()
  const [activeSection, setActiveSection] = useState<string>('')

  const titleText = resolveLocalized(caseStudy.title, language)
  const taglineText = resolveLocalized(caseStudy.tagline, language)
  const businessProblemText = resolveLocalized(caseStudy.businessProblem, language)
  const solutionFitText = resolveLocalized(caseStudy.solutionFit, language)
  const reflectionText = resolveLocalized(caseStudy.reflection, language)

  // Dynamically compute valid sections that actually have data
  const sections = useMemo<SectionLink[]>(() => {
    const list: SectionLink[] = []
    if (businessProblemText) {
      list.push({ id: 'business-problem', label: { en: 'Business Problem', id: 'Masalah Bisnis' } })
    }
    if (solutionFitText) {
      list.push({ id: 'solution-fit', label: { en: 'Product-to-Solution Fit', id: 'Solusi & Keselarasan' } })
    }
    if (caseStudy.system?.nodes?.length) {
      list.push({ id: 'system-flow', label: { en: 'The System Flow', id: 'Alur Sistem' } })
    }
    if (caseStudy.architecture?.nodes?.length) {
      list.push({ id: 'architecture', label: { en: 'Technical Architecture', id: 'Arsitektur Teknis' } })
    }
    if (caseStudy.results && caseStudy.results.length > 0) {
      list.push({ id: 'results', label: { en: 'Measurable Results', id: 'Hasil & Pembuktian' } })
    }
    if (caseStudy.showcase && caseStudy.showcase.length > 0) {
      list.push({ id: 'showcase', label: { en: 'Showcase Gallery', id: 'Galeri Showcase' } })
    }
    if (caseStudy.techStack && caseStudy.techStack.length > 0) {
      list.push({ id: 'tech-stack', label: { en: 'Technology Stack', id: 'Tech Stack' } })
    }
    if (reflectionText) {
      list.push({ id: 'reflection', label: { en: 'Retrospective & Reflection', id: 'Refleksi & Evaluasi' } })
    }
    return list
  }, [caseStudy, businessProblemText, solutionFitText, reflectionText])

  // Track active section on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
            break
          }
        }
      },
      { rootMargin: '-100px 0px -60% 0px' },
    )

    sections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [sections])

  // Check if architecture has classified nodes
  const hasClassified = useMemo(() => {
    if (!caseStudy.architecture?.nodes) return false
    return caseStudy.architecture.nodes.some((n) => {
      const isClassifiable = ['service', 'data', 'ai', 'external'].includes(n.type)
      const hasNoTools = !n.tools || n.tools.length === 0
      return isClassifiable && hasNoTools && !n.hideTools
    })
  }, [caseStudy])

  const backUrl = caseStudy.kind === 'work' ? '/work' : '/project'
  const backLabel =
    caseStudy.kind === 'work'
      ? language === 'id'
        ? 'Kembali ke Riwayat Pengalaman'
        : 'Back to Work History'
      : language === 'id'
        ? 'Kembali ke Showcase Proyek'
        : 'Back to Project Showcase'

  return (
    <article className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Top Navigation Strip */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <Link
          to={backUrl}
          className="group inline-flex items-center gap-2 rounded-xl border border-[rgba(var(--rgb-line),0.12)] bg-[rgba(var(--rgb-film),0.02)] px-4 py-2 font-mono text-xs text-text-secondary transition-all hover:border-accent-lavender/40 hover:text-text-primary"
        >
          <TbArrowLeft className="transition-transform group-hover:-translate-x-1" size={16} />
          {backLabel}
        </Link>

        {caseStudy.link && (
          <a
            href={caseStudy.link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-accent-lavender/30 bg-accent-lavender/10 px-4 py-2 font-mono text-xs font-semibold text-accent-lavender transition-all hover:bg-accent-lavender/20 shadow-[0_0_20px_rgba(var(--rgb-glow),0.15)]"
          >
            <span>{caseStudy.link.label}</span>
            <TbExternalLink size={15} />
          </a>
        )}
      </div>

      {/* Hero Header */}
      <header className="mb-10 sm:mb-14">
        {caseStudy.org?.domain && (
          <p className="font-mono text-xs uppercase tracking-widest text-accent-lavender/70 mb-2">
            {caseStudy.org.domain}
          </p>
        )}
        <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-text-primary leading-[1.08]">
          {titleText}
        </h1>
        {taglineText && (
          <p className="mt-4 max-w-4xl text-base sm:text-lg md:text-xl font-medium text-text-secondary leading-relaxed">
            {taglineText}
          </p>
        )}
      </header>

      {/* 0. Scope Strip */}
      <section className="mb-12 sm:mb-16">
        <ScopeStrip caseStudy={caseStudy} />
      </section>

      {/* Main Content Layout with Sticky Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        {/* Left: Article Body Sections */}
        <div className="lg:col-span-8 xl:col-span-9 space-y-14 sm:space-y-20 min-w-0">
          {/* 1. Business Problem */}
          {businessProblemText && (
            <section id="business-problem" className="scroll-mt-28">
              <h2 className="flex items-center gap-2.5 font-heading text-lg sm:text-xl font-bold uppercase tracking-wider text-accent-lavender mb-4">
                <span className="font-mono text-xs text-accent-lavender/50">01 /</span>
                {language === 'id' ? 'Masalah Bisnis yang Dihadapi' : 'The Business Problem'}
              </h2>
              <div className="rounded-2xl border-l-2 border-accent-lavender/60 bg-[rgba(var(--rgb-line),0.02)] p-5 sm:p-7 text-sm sm:text-base leading-relaxed text-text-primary">
                {businessProblemText}
              </div>
            </section>
          )}

          {/* 2. Product-to-Solution Fit */}
          {solutionFitText && (
            <section id="solution-fit" className="scroll-mt-28">
              <h2 className="flex items-center gap-2.5 font-heading text-lg sm:text-xl font-bold uppercase tracking-wider text-accent-lavender mb-4">
                <span className="font-mono text-xs text-accent-lavender/50">02 /</span>
                {language === 'id' ? 'Pendekatan Solusi & Keselarasan' : 'Product-to-Solution Fit'}
              </h2>
              <div className="rounded-2xl border-l-2 border-accent-violet/60 bg-[rgba(var(--rgb-line),0.02)] p-5 sm:p-7 text-sm sm:text-base leading-relaxed text-text-primary">
                {solutionFitText}
              </div>
            </section>
          )}

          {/* 3. The System (Flow Diagram) */}
          {caseStudy.system?.nodes && caseStudy.system.nodes.length > 0 && (
            <section id="system-flow" className="scroll-mt-28">
              <div className="mb-2">
                <h2 className="flex items-center gap-2.5 font-heading text-lg sm:text-xl font-bold uppercase tracking-wider text-accent-lavender">
                  <span className="font-mono text-xs text-accent-lavender/50">03 /</span>
                  {language === 'id' ? 'Alur Sistem yang Dibangun' : 'The System Flow'}
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-text-secondary">
                  {language === 'id'
                    ? 'Alur operasional pengguna dan proses bisnis dari hulu ke hilir.'
                    : 'End-to-end user and business workflow orchestration.'}
                </p>
              </div>
              <FlowDiagram diagram={caseStudy.system} mode="system" />
            </section>
          )}

          {/* 4. Architecture (Technical Diagram) */}
          {caseStudy.architecture?.nodes && caseStudy.architecture.nodes.length > 0 && (
            <section id="architecture" className="scroll-mt-28">
              <div className="mb-2">
                <h2 className="flex items-center gap-2.5 font-heading text-lg sm:text-xl font-bold uppercase tracking-wider text-accent-lavender">
                  <span className="font-mono text-xs text-accent-lavender/50">04 /</span>
                  {language === 'id' ? 'Arsitektur Teknis' : 'Technical Architecture'}
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-text-secondary">
                  {language === 'id'
                    ? 'Komponen perangkat lunak, database, gateway inferensi AI, dan proteksi.'
                    : 'Software topology, database persistence, AI inference, and security boundaries.'}
                </p>
              </div>
              <FlowDiagram diagram={caseStudy.architecture} mode="architecture" />
            </section>
          )}

          {/* 5. Results (Evidence Cards) */}
          {caseStudy.results && caseStudy.results.length > 0 && (
            <section id="results" className="scroll-mt-28">
              <div className="mb-6">
                <h2 className="flex items-center gap-2.5 font-heading text-lg sm:text-xl font-bold uppercase tracking-wider text-accent-lavender">
                  <span className="font-mono text-xs text-accent-lavender/50">05 /</span>
                  {language === 'id' ? 'Hasil & Pembuktian Nyata' : 'Measurable Production Results'}
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-text-secondary">
                  {language === 'id'
                    ? 'Setiap hasil diverifikasi dengan label bukti terukur (measured, estimated, qualitative).'
                    : 'Each metric is certified with its verified evidence grade.'}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {caseStudy.results.map((r, i) => (
                  <ResultCard key={`res-${i}`} result={r} />
                ))}
              </div>
            </section>
          )}

          {/* 6. Showcase Gallery */}
          {caseStudy.showcase && caseStudy.showcase.length > 0 && (
            <section id="showcase" className="scroll-mt-28">
              <div className="mb-6">
                <h2 className="flex items-center gap-2.5 font-heading text-lg sm:text-xl font-bold uppercase tracking-wider text-accent-lavender">
                  <span className="font-mono text-xs text-accent-lavender/50">06 /</span>
                  {language === 'id' ? 'Galeri Bukti & Showcase' : 'Showcase & System Proof'}
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-text-secondary">
                  {language === 'id'
                    ? 'Tangkapan layar antarmuka fungsional di lingkungan produksi.'
                    : 'Production interface captures and workflow demonstrations.'}
                </p>
              </div>
              <ShowcaseGallery items={caseStudy.showcase} title={titleText} />
            </section>
          )}

          {/* 7. Tech Stack (Grouped) */}
          {caseStudy.techStack && caseStudy.techStack.length > 0 && (
            <section id="tech-stack" className="scroll-mt-28">
              <h2 className="flex items-center gap-2.5 font-heading text-lg sm:text-xl font-bold uppercase tracking-wider text-accent-lavender mb-5">
                <span className="font-mono text-xs text-accent-lavender/50">07 /</span>
                {language === 'id' ? 'Tumpukan Teknologi Terkelompok' : 'Grouped Tech Stack'}
              </h2>
              <TechStackGroups groups={caseStudy.techStack} hasClassified={hasClassified} />
            </section>
          )}

          {/* 8. Reflection */}
          {reflectionText && (
            <section id="reflection" className="scroll-mt-28">
              <h2 className="flex items-center gap-2.5 font-heading text-lg sm:text-xl font-bold uppercase tracking-wider text-accent-lavender mb-4">
                <span className="font-mono text-xs text-accent-lavender/50">08 /</span>
                {language === 'id' ? 'Refleksi Engineering & Evaluasi' : 'Retrospective & Engineering Reflection'}
              </h2>
              <div className="rounded-2xl border border-[rgba(var(--rgb-line),0.12)] bg-[rgba(var(--rgb-film),0.02)] p-5 sm:p-7 text-sm sm:text-base leading-relaxed text-text-secondary italic">
                "{reflectionText}"
              </div>
            </section>
          )}
        </div>

        {/* Right: Sticky Table of Contents (Desktop lg+) */}
        <aside className="hidden lg:block lg:col-span-4 xl:col-span-3">
          <div className="sticky top-28 rounded-2xl border border-[rgba(var(--rgb-line),0.1)] bg-[rgba(10,9,20,0.7)] p-5 backdrop-blur-md">
            <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-accent-lavender mb-4">
              {language === 'id' ? 'Daftar Isi' : 'On This Page'}
            </h3>
            <nav className="space-y-1.5" aria-label="Table of contents">
              {sections.map(({ id, label }) => {
                const isActive = activeSection === id
                return (
                  <a
                    key={id}
                    href={`#${id}`}
                    className={`block rounded-lg px-2.5 py-1.5 text-xs transition-colors ${
                      isActive
                        ? 'bg-accent-lavender/10 text-accent-lavender font-semibold'
                        : 'text-text-muted hover:text-text-primary hover:bg-white/5'
                    }`}
                  >
                    {label[language]}
                  </a>
                )
              })}
            </nav>
          </div>
        </aside>
      </div>
    </article>
  )
}

export default CaseStudyLayout
