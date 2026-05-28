import { AnimatePresence, motion } from 'framer-motion'
import gsap from 'gsap'
import { useEffect, useRef, useState } from 'react'
import {
  TbBriefcase,
  TbBuildingBank,
  TbBuildingSkyscraper,
  TbCalendar,
  TbMapPin,
  TbSchool,
  TbTable,
  TbToolsKitchen2,
  TbX,
} from 'react-icons/tb'

type Experience = {
  company: string
  location: string
  role: string
  period: string
  accent: string
  Icon: typeof TbBriefcase
  bullets: string[]
}

const experiences: Experience[] = [
  {
    company: 'PT Bank Mandiri (Persero) Tbk.',
    location: 'Jakarta, Indonesia',
    role: 'Research & Development Intern - Strategic Procurement',
    period: 'October 2025 - April 2026',
    accent: '#70aaff',
    Icon: TbBuildingBank,
    bullets: [
      'Learned three core procurement workflows by working closely with internal teams across Contract, Processing, and supporting functions.',
      'Mapped 11 procurement-related applications, including their roles and integrations, to understand the procurement ecosystem.',
      'Collaborated with cross-functional teams to identify pain points, validate user needs, and generate feature improvement ideas from direct feedback.',
      'Contributed to application architecture recommendations aligned with business needs, team capabilities, system limitations, and sustainability.',
      'Participated in the validation of 250+ bank guarantees and documented recurring issues for procurement process improvements.',
      'Developed and presented an evaluation report comparing four improvement options with a TELOS-based final recommendation.',
    ],
  },
  {
    company: 'Telkom Property',
    location: 'Jakarta, Indonesia',
    role: 'Project Manager',
    period: 'October 2024 - February 2025',
    accent: '#e090c8',
    Icon: TbBuildingSkyscraper,
    bullets: [
      'Managed project documentation and coordinated with cross-functional teams on scope, requirements, timelines, risks, changes, and resources.',
      'Worked closely with a 10-member technology team across frontend, backend, mobile, QA, UI/UX, and security functions.',
      'Managed and tracked 50+ project backlogs using internal project management tools.',
      'Oversaw system, performance, and user acceptance testing to ensure product readiness before deployment.',
    ],
  },
  {
    company: 'Informatics Laboratory Telkom University',
    location: 'Bandung, Indonesia',
    role: 'Web Development Practicum Assistant',
    period: 'September 2024 - January 2025',
    accent: '#c9bfff',
    Icon: TbSchool,
    bullets: [
      'Assisted and mentored 90+ students across three web development lab classes.',
      'Guided students on HTML, CSS, JavaScript, PHP, Laravel, WordPress, JSON, and RESTful APIs.',
      'Supported troubleshooting and strengthened students understanding of core web development concepts.',
    ],
  },
  {
    company: 'CAATIS FnB Group',
    location: 'Bandung, Indonesia',
    role: 'Full Stack Developer',
    period: 'September 2024 - December 2024',
    accent: '#60d9aa',
    Icon: TbToolsKitchen2,
    bullets: [
      'Designed and developed an internal staff management web application for scheduling and payroll across 4 F&B outlets with 30+ employees.',
      'Built a centralized platform that simplified payroll processing and reduced administrative workload across four outlets.',
      'Integrated external APIs to automate payroll calculations and reduce manual errors.',
      'Contributed to deploying the application on a VPS server for production use.',
    ],
  },
  {
    company: 'Jokiwithsora',
    location: 'Bandung, Indonesia',
    role: 'Business Process Optimization & IT Support',
    period: 'January 2023 - January 2025',
    accent: '#c060f0',
    Icon: TbTable,
    bullets: [
      'Developed and maintained more than nine operational spreadsheets to improve order management and data tracking efficiency.',
      'Built automated formulas and workflow systems that saved the operations team more than 12 hours of manual work per week.',
      'Provided technical support and troubleshooting for hardware and software issues.',
    ],
  },
]

const stairOffsets = [
  'md:ml-[0%] lg:ml-[2%] xl:ml-[4%]',
  'md:ml-[10%] lg:ml-[20%] xl:ml-[22%]',
  'md:ml-[20%] lg:ml-[38%] xl:ml-[40%]',
  'md:ml-[30%] lg:ml-[54%] xl:ml-[56%]',
  'md:ml-[40%] lg:ml-[66%] xl:ml-[68%]',
]

function Work() {
  const [selectedExperience, setSelectedExperience] =
    useState<Experience | null>(null)
  const pageRef = useRef<HTMLDivElement>(null)
  const markerRefs = useRef<Array<HTMLButtonElement | null>>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.work-stair-rail',
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1,
          ease: 'power3.out',
          transformOrigin: 'top center',
        },
      )

      gsap.fromTo(
        markerRefs.current.filter(Boolean),
        { opacity: 0, y: 26, rotateX: -10 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.72,
          stagger: 0.11,
          ease: 'power3.out',
          delay: 0.15,
        },
      )
    }, pageRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!selectedExperience) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedExperience(null)
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedExperience])

  return (
    <motion.div
      ref={pageRef}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.3 }}
      className="min-w-0"
    >
      <section className="relative mt-5 overflow-hidden rounded-[20px] border border-[rgba(201,191,255,0.12)] bg-[rgba(255,255,255,0.018)] px-5 py-7 md:px-8 md:py-10 lg:px-10">
        <div className="pointer-events-none absolute inset-0 opacity-25 bg-[radial-gradient(rgba(160,130,255,0.38)_1.2px,transparent_1.2px)] bg-size-[20px_20px]" />
        <div className="pointer-events-none absolute -right-16 top-8 font-heading text-[8rem] font-bold leading-none text-accent-lavender/[0.035] md:text-[12rem] lg:text-[16rem]">
          WORK
        </div>

        <div className="pointer-events-none absolute bottom-8 left-7.5 top-8 z-0 md:left-[18%] lg:left-[18%]">
          <div className="work-stair-rail h-full w-px bg-[linear-gradient(180deg,transparent,rgba(124,80,224,0.62)_10%,rgba(201,191,255,0.18)_88%,transparent)]" />
        </div>

        <div className="relative z-10 ml-10 max-w-3xl md:ml-[21%]">
          <span className="inline-flex rounded-full border border-border-accent bg-[rgba(120,80,220,0.12)] px-3 py-1 text-[10px] font-medium text-accent-lavender">
            Work /&gt;
          </span>
          <h1 className="mt-4 max-w-3xl font-heading text-3xl font-bold leading-tight text-text-primary md:text-4xl lg:text-5xl">
            Selected professional experience.
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-6 text-text-secondary">
            Click a company marker to open detailed responsibilities and impact.
          </p>
        </div>

        <div className="relative z-10 ml-10 mt-8 grid gap-4 md:ml-[21%] md:mt-10 md:gap-3 lg:gap-4">
          {experiences.map((item, index) => (
            <button
              key={`${item.company}-${item.period}`}
              ref={(node) => {
                markerRefs.current[index] = node
              }}
              type="button"
              onClick={() => setSelectedExperience(item)}
              className={`group relative w-full max-w-90 text-left md:w-75 lg:w-[320px] ${stairOffsets[index]}`}
            >
              <span
                className="absolute -left-12 top-8.25 z-20 h-3 w-3 rounded-full border bg-base md:-left-8"
                style={{
                  borderColor: item.accent,
                  boxShadow: `0 0 0 4px rgba(10,10,18,0.96), 0 0 18px ${item.accent}66`,
                }}
              />
              <span className="block rounded-[18px] border border-[rgba(201,191,255,0.1)] bg-[rgba(255,255,255,0.026)] p-4 shadow-[0_18px_45px_rgba(0,0,0,0.18)] backdrop-blur-sm transition duration-300 group-hover:-translate-y-1 group-hover:border-[rgba(201,191,255,0.28)] group-hover:bg-[rgba(255,255,255,0.045)]">
                <span className="block font-heading text-lg font-semibold leading-tight text-text-primary transition duration-300 group-hover:text-accent-lavender md:text-xl">
                  {item.company}
                </span>
                <span
                  className="mt-4 block h-px w-full transition duration-300 group-hover:w-[calc(100%+24px)]"
                  style={{
                    background: `linear-gradient(90deg, ${item.accent}, rgba(201,191,255,0.14), transparent)`,
                  }}
                />
                <span className="mt-3 flex items-center justify-between text-[11px] text-text-muted">
                  <span>{String(index).padStart(2, '0')}</span>
                  <span className="translate-x-0 transition duration-300 group-hover:translate-x-1">
                    -&gt;
                  </span>
                </span>
              </span>
            </button>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {selectedExperience ? (
          <ExperienceModal
            experience={selectedExperience}
            onClose={() => setSelectedExperience(null)}
          />
        ) : null}
      </AnimatePresence>
    </motion.div>
  )
}

type ExperienceModalProps = {
  experience: Experience
  onClose: () => void
}

function ExperienceModal({ experience, onClose }: ExperienceModalProps) {
  const Icon = experience.Icon

  return (
    <motion.div
      className="fixed inset-0 z-9998 flex items-center justify-center bg-black/68 px-4 py-6 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={onClose}
    >
      <motion.article
        className="relative max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-[22px] border border-[rgba(201,191,255,0.14)] bg-[#0d0c16] p-5 shadow-[0_30px_100px_rgba(0,0,0,0.55)] md:p-6"
        initial={{ opacity: 0, y: 28, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 18, scale: 0.97 }}
        transition={{ duration: 0.28, ease: 'easeOut' }}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{
            background: `linear-gradient(90deg, transparent, ${experience.accent}, transparent)`,
          }}
        />
        <button
          type="button"
          aria-label="Close modal"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-xl border border-[rgba(201,191,255,0.12)] bg-[rgba(255,255,255,0.04)] text-text-secondary transition hover:border-[rgba(201,191,255,0.3)] hover:text-text-primary"
        >
          <TbX size={18} />
        </button>

        <div className="flex min-w-0 gap-4 pr-10">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[rgba(201,191,255,0.12)] bg-[rgba(255,255,255,0.04)]"
            style={{ color: experience.accent }}
          >
            <Icon size={23} />
          </div>
          <div className="min-w-0">
            <h2 className="wrap-break-word font-heading text-2xl font-bold leading-tight text-text-primary">
              {experience.company}
            </h2>
            <p
              className="mt-2 text-sm font-medium leading-5"
              style={{ color: experience.accent }}
            >
              {experience.role}
            </p>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.12em] text-text-muted">
          <span className="inline-flex items-center gap-1 rounded-full border border-[rgba(201,191,255,0.1)] bg-[rgba(255,255,255,0.025)] px-3 py-1.5">
            <TbCalendar size={14} />
            {experience.period}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full border border-[rgba(201,191,255,0.1)] bg-[rgba(255,255,255,0.025)] px-3 py-1.5">
            <TbMapPin size={14} />
            {experience.location}
          </span>
        </div>

        <ul className="mt-6 grid gap-3 text-sm leading-6 text-text-secondary">
          {experience.bullets.map((bullet) => (
            <li key={bullet} className="flex gap-3">
              <span
                className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ backgroundColor: experience.accent }}
              />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </motion.article>
    </motion.div>
  )
}

export default Work
