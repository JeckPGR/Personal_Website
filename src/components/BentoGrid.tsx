import { useRef, useState } from 'react'
import { FaInstagram, FaLinkedinIn, FaTiktok } from 'react-icons/fa'
import {
  TbBriefcase,
  TbFolder,
  TbMessageCircle,
  TbRobot,
  TbSend,
  TbSparkles,
  TbUser,
} from 'react-icons/tb'
import { Link } from 'react-router-dom'
import meImage from '../assets/Me.png'
import { workItems } from '../data/portfolio'
import { AnimatedBeam } from './ui/animated-beam'

const socialLinks = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/ahmad-dzaky-67b630248/',
    Icon: FaLinkedinIn,
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/dzaky_arrazy',
    Icon: FaInstagram,
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@jeckyyes0',
    Icon: FaTiktok,
  },
]

type BentoCardProps = {
  children: React.ReactNode
  className?: string
  to?: string
}

function BentoCard({ children, className = '', to }: BentoCardProps) {
  const sharedClassName = `group relative min-w-0 max-w-full overflow-hidden rounded-[18px] border border-[rgba(201,191,255,0.12)] bg-[rgba(255,255,255,0.025)] shadow-[inset_0_1px_0_rgba(255,255,255,0.025)] transition duration-200 hover:border-[rgba(160,130,255,0.32)] ${className}`

  if (to) {
    return (
      <Link to={to} className={sharedClassName}>
        {children}
        <span className="pointer-events-none absolute bottom-4 right-4 z-20 inline-flex translate-y-2 items-center gap-2 rounded-full border border-[rgba(201,191,255,0.12)] bg-[rgba(12,10,24,0.72)] px-3 py-1.5 text-[10px] font-medium text-accent-lavender opacity-0 shadow-[0_10px_30px_rgba(0,0,0,0.24),0_0_22px_rgba(124,80,224,0.12)] backdrop-blur-md transition duration-300 ease-out group-hover:translate-y-0 group-hover:border-[rgba(201,191,255,0.24)] group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
          Find more
          <span className="translate-x-0 transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </span>
        <span className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 translate-y-8 bg-[linear-gradient(180deg,transparent,rgba(124,80,224,0.1))] opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100" />
      </Link>
    )
  }

  return <article className={sharedClassName}>{children}</article>
}

function BentoGrid() {
  const [aiPrompt, setAiPrompt] = useState('')
  const heroContainerRef = useRef<HTMLDivElement>(null)
  const techNodeRef = useRef<HTMLDivElement>(null)
  const productNodeRef = useRef<HTMLDivElement>(null)

  return (
    <section className="grid min-w-0 max-w-full grid-cols-1 gap-3 lg:h-full lg:min-h-0 lg:flex-1 lg:gap-3 lg:[grid-template-areas:'about_about_tagline'_'work_profile_chat'_'work_projects_socmed'] lg:grid-cols-[minmax(0,1.35fr)_minmax(0,4.3fr)_minmax(0,1.55fr)] lg:grid-rows-[minmax(178px,0.86fr)_minmax(0,1.42fr)_minmax(116px,0.52fr)] xl:grid-cols-[minmax(0,1.4fr)_minmax(0,4.5fr)_minmax(0,1.5fr)] xl:grid-rows-[minmax(194px,0.9fr)_minmax(0,1.45fr)_minmax(126px,0.56fr)]">
      <BentoCard
        to="/work"
        className="order-5 p-5 lg:order-0 lg:min-h-0 lg:p-4 lg:[grid-area:projects]"
      >
        <div className="relative z-10 flex h-full min-h-37.5ex-col justify-between lg:min-h-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-accent-lavender/60 lg:text-[8px]">
                Selected work
              </p>
              <h2 className="mt-3 font-heading text-3xl font-bold leading-tight text-text-primary md:text-4xl lg:mt-1 lg:text-[clamp(1.35rem,2vw,1.75rem)]">
                Projects
              </h2>
            </div>
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[rgba(201,191,255,0.12)] bg-surface-hover text-accent-lavender lg:h-8 lg:w-8">
              <TbFolder size={20} />
            </div>
          </div>
          <div className="grid gap-2 pt-6 sm:grid-cols-3 lg:gap-1.5 lg:pt-2">
            {workItems.map(({ slug, title, tag }) => (
              <div
                key={slug}
                className="min-w-0 rounded-xl border border-[rgba(201,191,255,0.1)] bg-[rgba(255,255,255,0.025)] px-3 py-2 lg:px-2.5 lg:py-1"
              >
                <p className="text-[9px] font-semibold uppercase text-text-muted lg:text-[8px]">
                  {tag}
                </p>
                <p className="mt-1 truncate font-heading text-xs font-semibold text-text-primary lg:text-[9.5px] xl:text-[10px]">
                  {title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </BentoCard>

      <BentoCard
        to="/what-i-do"
        className="order-1 flex min-h-37.5 flex-col justify-between p-5 lg:order-0 lg:min-h-0 lg:p-4 lg:[grid-area:tagline] xl:p-5"
      >
      
        <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-2xl border border-[rgba(201,191,255,0.12)] bg-surface-hover text-accent-lavender lg:h-9 lg:w-9">
          <TbSparkles size={18} />
        </div>
        <div className="relative z-10">
          <p className="mt-2 wrap-break-words font-heading text-2xl font-bold leading-tight text-text-primary lg:text-[clamp(1rem,1.7vw,1.5rem)]">
            Product-minded builder for digital systems.
          </p>
          <p className="mt-3 text-xs leading-5 text-text-secondary lg:mt-2 lg:line-clamp-2">
            PM, developer, and analyst working across discovery, delivery, and
            automation.
          </p>
        </div>
      </BentoCard>

      <BentoCard
        to="/work"
        className="order-2 p-5 lg:order-0 lg:min-h-0 lg:p-4 lg:[grid-area:work] xl:p-5"
      >
        <div className="flex h-full min-h-65 flex-col justify-between lg:min-h-0">
          <div>
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[rgba(201,191,255,0.12)] bg-surface-hover text-accent-lavender lg:h-9 lg:w-9">
              <TbBriefcase size={18} />
            </div>
            <h2 className="mt-5 font-heading text-2xl font-bold leading-tight text-text-primary lg:mt-4 lg:text-[clamp(1.1rem,1.8vw,1.5rem)]">
              Work Experience
            </h2>
          </div>
          <div className="work-timeline relative mt-8 flex min-h-57.5 flex-1 flex-col justify-between pb-2 pl-6 pt-4 lg:mt-6 lg:min-h-0">
            {workItems.map(({ slug, title, subtitle, tag, period }) => (
              <div key={slug} className="relative">
                <span className="absolute -left-7 top-2 h-2.5 w-2.5 rounded-full border border-[rgba(201,191,255,0.55)] bg-base shadow-[0_0_14px_rgba(201,191,255,0.35)]" />
                <p className="font-heading text-sm font-semibold leading-tight text-text-primary lg:text-[13px]">
                  {title}
                </p>
                <p className="mt-1 text-[11px] leading-4 text-text-secondary lg:text-[10px]">
                  {subtitle} <span className="text-text-muted">|</span> {tag}
                </p>
                <p className="mt-1 text-[10px] leading-4 text-text-muted lg:text-[9.5px]">
                  {period}
                </p>
              </div>
            ))}
          </div>
        </div>
      </BentoCard>

      <BentoCard className="order-4 min-h-90 sm:min-h-107.5 md:min-h-125 lg:order-0 lg:min-h-0 lg:[grid-area:profile]">
        <div
          ref={heroContainerRef}
          className="pointer-events-none absolute inset-0 z-2 hidden overflow-hidden sm:block"
        >
          <div className="pointer-events-none absolute inset-0 z-0">
            <AnimatedBeam
              containerRef={heroContainerRef}
              fromRef={techNodeRef}
              toRef={productNodeRef}
              curvature={26}
              duration={3.6}
              startXOffset={56}
              endXOffset={-108}
              endYOffset={-10}
              pathColor="rgba(201,191,255,0.18)"
              pathWidth={1.35}
              pathOpacity={0.3}
              gradientStartColor="#7c50e0"
              gradientStopColor="#c9bfff"
            />
            <AnimatedBeam
              containerRef={heroContainerRef}
              fromRef={techNodeRef}
              toRef={productNodeRef}
              curvature={-24}
              reverse
              duration={3.6}
              delay={0.4}
              startXOffset={56}
              endXOffset={-108}
              endYOffset={10}
              pathColor="rgba(201,191,255,0.12)"
              pathWidth={1.35}
              pathOpacity={0.22}
              gradientStartColor="#c060f0"
              gradientStopColor="#c9bfff"
            />
          </div>
          <div
            ref={techNodeRef}
            className="about-float absolute left-6 top-6 z-10 hidden h-24 w-57 overflow-hidden rounded-[20px] border border-[rgba(201,191,255,0.14)] bg-[linear-gradient(135deg,rgba(124,80,224,0.2),rgba(255,255,255,0.035)_48%,rgba(10,10,18,0.16))] p-4 shadow-[0_18px_50px_rgba(0,0,0,0.28),0_0_42px_rgba(124,80,224,0.18),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md md:block lg:left-5 lg:top-5 xl:left-7 xl:top-7"
          >
            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full border border-[rgba(201,191,255,0.08)]" />
            <div className="absolute bottom-3 right-4 flex items-end gap-1">
              <span className="h-4 w-1.5 rounded-full bg-accent-lavender/25" />
              <span className="h-7 w-1.5 rounded-full bg-accent-lavender/45" />
              <span className="h-5 w-1.5 rounded-full bg-accent-purple/45" />
            </div>
            <div className="relative z-10 flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-2xl border border-[rgba(201,191,255,0.16)] bg-[rgba(10,10,18,0.54)] text-[13px] font-semibold text-accent-lavender shadow-[0_0_24px_rgba(124,80,224,0.24)]">
                {'</>'}
              </div>
              <div>
                <p className="font-heading text-sm font-semibold text-text-primary">
                  Tech Systems
                </p>
                <p className="mt-1 text-[10px] text-text-secondary">
                  Code / API / Automation
                </p>
              </div>
            </div>
          </div>

          <div
            ref={productNodeRef}
            className="about-float-delayed absolute bottom-6 right-6 z-10 hidden h-34 w-68 overflow-hidden rounded-[26px] border border-[rgba(201,191,255,0.14)] bg-[linear-gradient(135deg,rgba(192,96,240,0.14),rgba(255,255,255,0.04)_46%,rgba(10,10,18,0.14))] shadow-[0_18px_54px_rgba(0,0,0,0.28),0_0_46px_rgba(192,96,240,0.16),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md md:block lg:bottom-5 lg:right-5 xl:bottom-7 xl:right-7"
          >
            <div className="about-orbit absolute right-5 top-4 h-20.5 w-20.5 rounded-full border border-[rgba(201,191,255,0.16)]">
              <span className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,#c9bfff,rgba(124,80,224,0.42)_58%,transparent_70%)] shadow-[0_0_28px_rgba(201,191,255,0.34)]" />
              <span className="absolute -left-1 top-8 h-3 w-3 rounded-full bg-accent-purple/70 shadow-[0_0_14px_rgba(124,80,224,0.55)]" />
              <span className="absolute right-3 -top-1 h-2.5 w-2.5 rounded-full bg-accent-violet/70 shadow-[0_0_14px_rgba(192,96,240,0.5)]" />
              <span className="absolute bottom-2 right-1 h-2.5 w-2.5 rounded-full bg-accent-lavender/70 shadow-[0_0_14px_rgba(201,191,255,0.45)]" />
            </div>
            <div className="absolute left-4 top-4">
              <p className="font-heading text-sm font-semibold text-text-primary">
                Product Thinking
              </p>
              <p className="mt-1 max-w-31.25 text-[10px] leading-4 text-text-secondary">
                Discovery / Users / Data
              </p>
            </div>
            <div className="absolute bottom-4 left-4 flex gap-1.5">
              <span className="h-2 w-8 rounded-full bg-accent-purple/35" />
              <span className="h-2 w-5 rounded-full bg-accent-violet/35" />
              <span className="h-2 w-3 rounded-full bg-accent-lavender/35" />
            </div>
          </div>

        </div>
        <img
          src={meImage}
          alt="Ahmad Dzaky Ar Razi"
          className="absolute inset-0 z-1 h-full w-full object-cover object-[center_22%] lg:object-[center_23%]"
        />
        <div className="absolute inset-0 z-2 bg-[linear-gradient(180deg,rgba(10,10,18,0)_35%,rgba(10,10,18,0.86)_100%)]" />
        <div className="relative z-10 flex h-full min-h-90 flex-col justify-end p-5 sm:min-h-107 md:min-h-125 lg:min-h-0 lg:p-4 xl:p-5">
          <span className="w-fit rounded-full border border-[rgba(80,200,120,0.3)] bg-green-bg px-3 py-1 text-[10px] font-medium text-[#6fd99a] lg:text-[9px]">
            Open to Work
          </span>
          <h1 className="mt-3 max-w-full wrap-break-words font-heading text-2xl font-bold leading-tight text-text-primary sm:text-3xl lg:mt-2 lg:text-[clamp(1.35rem,2.2vw,1.875rem)]">
            Ahmad Dzaky Ar Razi
          </h1>
          <p className="mt-1 max-w-full wrap-break-words text-xs leading-5 text-text-secondary lg:text-[11px]">
            Product-minded engineer focused on digitalization, workflow automation, and operational efficiency
          </p>
        </div>
      </BentoCard>

      <BentoCard className="order-6 p-5 lg:order-0 lg:min-h-0 lg:p-4 lg:[grid-area:chat] xl:p-5">

        <div className="relative z-10 flex h-full min-h-57.5 flex-col lg:min-h-0">
          <div className="flex items-center justify-between gap-3">
            <div className='flex items-center gap-2'>
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl border border-[rgba(201,191,255,0.12)] bg-surface-hover text-accent-lavender">
                <TbRobot size={18} />
              </div>
              <h2 className=" font-heading text-xl font-bold text-text-primary lg:text-[clamp(1rem,1.45vw,1.25rem)]">
                Ask AI about Dzaky
              </h2>
            </div>
          </div>

          <div className="mt-4 min-h-0 flex-1 rounded-2xl border border-[rgba(201,191,255,0.1)] bg-[rgba(255,255,255,0.02)] p-3">
            <div className="flex gap-2">
              <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[rgba(120,80,220,0.16)] text-accent-lavender">
                <TbMessageCircle size={15} />
              </div>
              <p className="text-[11px] leading-5 text-text-secondary">
                Ask about my experience, product work, tech stack, or project
                decisions.
              </p>
            </div>
          </div>

          <form
            className="mt-3 flex items-center gap-2 rounded-2xl border border-[rgba(201,191,255,0.1)] bg-[rgba(255,255,255,0.035)] p-1.5"
            onSubmit={(event) => event.preventDefault()}
          >
            <textarea
              aria-label="Ask Dzaky AI"
              placeholder="Ask something..."
              maxLength={90}
              value={aiPrompt}
              onChange={(event) => setAiPrompt(event.target.value)}
              rows={2}
              className="min-w-0 flex-1 min-h-12 resize-none bg-transparent px-2 py-2 text-xs text-text-primary outline-none placeholder:text-text-muted"
            />
            <span className="shrink-0 px-1 text-[10px] tabular-nums text-text-muted">
              {aiPrompt.length}/10
            </span>
            <button
              type="submit"
              aria-label="Send message"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[rgba(120,80,220,0.22)] text-accent-lavender transition hover:bg-border-accent"
            >
              <TbSend size={15} />
            </button>
          </form>
        </div>
      </BentoCard>

      <BentoCard className="hidden p-5 lg:block lg:min-h-0 lg:p-4 lg:[grid-area:socmed] xl:p-5">
        <div className="relative z-10 flex h-full min-h-37.5 flex-col justify-between lg:min-h-0">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-accent-lavender/60 lg:text-[9px]">
              Socials
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold text-text-primary lg:mt-2 lg:text-[clamp(1.35rem,2vw,1.875rem)]">
              Socmed
            </h2>
          </div>
          <div className="flex gap-3 lg:gap-2">
            {socialLinks.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[rgba(201,191,255,0.12)] bg-surface-hover text-[#a089d8] transition hover:border-[rgba(150,100,255,0.35)] hover:bg-border-accent hover:text-accent-lavender lg:h-10 lg:w-10"
              >
                <Icon size={17} />
              </a>
            ))}
          </div>
        </div>
      </BentoCard>

      <BentoCard
        to="/about"
        className="order-3 lg:order-0 lg:min-h-0 lg:[grid-area:about]"
      >
        <div className="relative z-10 flex h-full min-h-29 items-center justify-between gap-4 p-5 lg:min-h-0 lg:p-5 xl:p-6">
          <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_18%_85%,rgba(124,80,224,0.14),transparent_32%),radial-gradient(circle_at_86%_15%,rgba(192,96,240,0.1),transparent_35%)]" />
          <div className="relative z-10 min-w-0">
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-accent-lavender/60 lg:text-[9px]">
              Profile
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-text-primary lg:text-[clamp(2rem,3.2vw,3rem)]">
              About me
            </h2>
            <p className="mt-1 text-xs text-text-secondary lg:text-[12px]">
              I'm a product-minded software builder focused on creating practical digital systems, internal tools, and workflow automation.
My work combines product thinking, web development, and operational understanding to solve real business problems.
            </p>
          </div>
          <div className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[rgba(201,191,255,0.12)] bg-surface-hover text-accent-lavender lg:h-10 lg:w-10">
            <TbUser size={20} />
          </div>
        </div>
      </BentoCard>
    </section>
  )
}

export default BentoGrid
