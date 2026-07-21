import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import {
  TbArrowUpRight,
  TbBrandInstagram,
  TbBrandLinkedin,
  TbBriefcase,
  TbCertificate,
  TbFileText,
  TbFolder,
  TbHome,
  TbMail,
  TbUser,
  TbX,
} from 'react-icons/tb'
import { CV_URL } from '../data/portfolio'
import GridMenuButton from './GridMenuButton'
import ThemeToggle from './ThemeToggle'

function Layout() {
  const location = useLocation()
  const isHome = location.pathname === '/' || location.pathname === '/home'

  return (
    <div
      className={`min-h-screen overflow-x-hidden bg-base text-text-primary ${
        isHome ? 'home-page-shell lg:h-dvh lg:max-h-dvh lg:overflow-hidden' : ''
      }`}
    >
      {!isHome ? <ScrollProgress /> : null}
      {/* The navbar carries the theme toggle, so it ships on every route. */}
      <TopNavbar />
      <main
        className={`relative mx-auto flex w-full min-w-0 max-w-480 flex-1 flex-col gap-3 overflow-x-hidden px-3 sm:px-4 md:px-5 lg:gap-3 ${
          isHome
            ? 'min-h-screen pb-8 pt-4 md:pb-4 md:pt-4 lg:h-dvh lg:max-h-dvh lg:min-h-0 lg:overflow-hidden lg:py-2'
            : 'pb-24 pt-8 md:pt-10'
        } ${
          isHome ? 'home-page-main' : ''
        }`}
      >
        {/* Route swaps happen behind the PageTransition curtain. */}
        <div
          key={location.pathname}
          className={`relative z-10 min-w-0 ${
            isHome ? 'min-h-0 lg:h-full lg:overflow-hidden' : ''
          }`}
        >
          <Outlet key={location.pathname} />
        </div>
      </main>
    </div>
  )
}

/** Page-wide scroll indicator, shared by every scrolling route. */
function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
  })

  return (
    <motion.div
      style={{ scaleX: progress }}
      className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-[linear-gradient(90deg,#7c50e0,#c060f0,#c9bfff)]"
    />
  )
}

const contactLinks = [
  {
    label: 'Email',
    href: 'mailto:dzakyrazi@gmail.com',
    Icon: TbMail,
    external: false,
  },
  {
    label: '@dzaky_arrazy',
    href: 'https://www.instagram.com/dzaky_arrazy/',
    Icon: TbBrandInstagram,
    external: true,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/ahmad-dzaky-67b630248/',
    Icon: TbBrandLinkedin,
    external: true,
  },
]

const menuItems = [
  { label: 'Home', to: '/', Icon: TbHome, end: true },
  { label: 'About', to: '/about', Icon: TbUser, end: true },
  { label: 'Work', to: '/work', Icon: TbBriefcase, end: true },
  { label: 'Project', to: '/project', Icon: TbFolder, end: true },
  { label: 'Certification', to: '/certification', Icon: TbCertificate, end: true },
]

function TopNavbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  // Lock body scroll + allow Escape to close while the full-screen menu is open.
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false)
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 bottom-0 z-999 flex justify-center px-3 pb-4 sm:px-4 md:pb-6">
        {/* max-w-full + a truncating brand name: on a narrow phone the name
            gives up width instead of the bar overflowing the screen. */}
        <motion.nav
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="pointer-events-auto relative flex w-fit max-w-full items-center gap-2 rounded-2xl border border-[rgba(var(--rgb-line),0.14)] bg-[var(--app-panel)] px-3 py-2 shadow-[0_16px_44px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:gap-4 sm:px-4 md:gap-6 md:px-5"
        >
          <NavLink
            to="/"
            end
            onClick={() => setIsOpen(false)}
            className="group flex min-w-0 items-center gap-2 rounded-xl px-1 py-1"
          >
            <span className="truncate font-heading text-sm font-semibold text-text-primary transition-colors duration-200 group-hover:text-accent-lavender">
              Dzaky Razi
            </span>
          </NavLink>

          <div className="flex shrink-0 items-center gap-1.5 md:gap-3">
            {/* CV leads the cluster and is filled, so it reads as the action
                among a row of quieter contact icons. */}
            <a
              href={CV_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="See my CV"
              title="See my CV"
              className="flex h-7 shrink-0 items-center gap-1.5 rounded-md border border-[rgba(var(--rgb-line),0.24)] bg-[rgba(var(--rgb-hover),0.14)] px-2 text-accent-lavender transition-colors duration-300 hover:border-[rgba(var(--rgb-line),0.44)] hover:bg-[rgba(var(--rgb-hover),0.24)] sm:h-8 sm:px-2.5"
            >
              <TbFileText size={15} />
              <span className="hidden font-heading text-[10px] font-semibold uppercase tracking-[0.16em] md:inline">
                CV
              </span>
            </a>

            {/* All three contacts, every breakpoint. They shrink rather than
                disappear on mobile; the overlay keeps the labelled versions. */}
            {contactLinks.map(({ label, href, Icon, external }) => (
              <a
                key={label}
                href={href}
                {...(external
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
                aria-label={label}
                title={label}
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-[rgba(var(--rgb-line),0.14)] bg-[rgba(var(--rgb-film),0.05)] text-text-secondary transition-colors duration-300 hover:border-[rgba(var(--rgb-line),0.32)] hover:bg-[rgba(var(--rgb-hover),0.14)] hover:text-accent-lavender sm:h-8 sm:w-8"
              >
                <Icon size={15} />
              </a>
            ))}

            <ThemeToggle />

            <span className="h-5 w-px bg-[rgba(var(--rgb-line),0.16)]" />

            <GridMenuButton
              isOpen={isOpen}
              onClick={() => setIsOpen(true)}
              text="Menu"
            />
          </div>
        </motion.nav>
      </header>

      <MobileMenuOverlay isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}

type MobileMenuOverlayProps = {
  isOpen: boolean
  onClose: () => void
}

function MobileMenuOverlay({ isOpen, onClose }: MobileMenuOverlayProps) {
  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          key="mobile-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed inset-0 z-1000 flex flex-col bg-[var(--app-overlay)]"
        >
          {/* Ambient background */}
          <div className="pointer-events-none absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_15%_10%,rgba(var(--rgb-glow),0.28),transparent_45%),radial-gradient(circle_at_90%_90%,rgba(var(--rgb-violet),0.18),transparent_45%)]" />
          <div className="pointer-events-none absolute inset-0 opacity-[0.04] bg-[linear-gradient(rgba(var(--rgb-line),.6)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--rgb-line),.6)_1px,transparent_1px)] bg-size-[44px_44px]" />

          {/* Top bar */}
          <div className="relative flex items-center justify-between px-5 pt-5 sm:px-6">
            <span className="font-heading text-base font-semibold text-text-primary">
              Dzaky Razi
            </span>
            <button
              type="button"
              aria-label="Close navigation menu"
              onClick={onClose}
              className="flex h-11 w-11 items-center justify-center rounded-md border border-[rgba(var(--rgb-line),0.18)] bg-[rgba(var(--rgb-film),0.04)] text-text-secondary transition hover:rotate-90 hover:border-[rgba(var(--rgb-line),0.36)] hover:text-accent-lavender"
            >
              <TbX size={20} />
            </button>
          </div>

          {/* Numbered menu list */}
          <nav className="relative flex flex-1 flex-col justify-center px-5 sm:px-6">
            {menuItems.map(({ label, to, end }, index) => (
              <motion.div
                key={to}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{
                  delay: 0.08 + index * 0.06,
                  duration: 0.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <NavLink
                  to={to}
                  end={end}
                  onClick={onClose}
                  className="group flex items-center gap-4 border-b border-[rgba(var(--rgb-line),0.1)] py-5"
                >
                  {({ isActive }) => (
                    <>
                      <span
                        className={`font-heading text-xs font-semibold tabular-nums transition-colors ${
                          isActive ? 'text-accent-violet' : 'text-accent-lavender/40'
                        }`}
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span
                        className={`font-heading text-4xl font-black uppercase tracking-tight transition-all duration-300 group-hover:translate-x-2 sm:text-5xl ${
                          isActive
                            ? 'text-accent-lavender'
                            : 'text-text-primary group-hover:text-accent-lavender'
                        }`}
                      >
                        {label}
                      </span>
                      <TbArrowUpRight
                        size={26}
                        className={`ml-auto shrink-0 transition-all duration-300 ${
                          isActive
                            ? 'text-accent-violet opacity-100'
                            : 'text-accent-lavender opacity-0 group-hover:opacity-100'
                        }`}
                      />
                    </>
                  )}
                </NavLink>
              </motion.div>
            ))}
          </nav>

          {/* CV — reachable from any route, since the menu is global */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.36, duration: 0.4 }}
            className="relative px-5 pb-6 sm:px-6"
          >
            <a
              href={CV_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 rounded-md border border-[rgba(var(--rgb-line),0.22)] bg-[rgba(var(--rgb-hover),0.12)] px-5 py-3 font-heading text-[11px] font-semibold uppercase tracking-[0.16em] text-accent-lavender transition-all duration-300 hover:-translate-y-0.5 hover:border-[rgba(var(--rgb-line),0.42)] hover:bg-[rgba(var(--rgb-hover),0.2)]"
            >
              <TbFileText size={16} />
              See my Resume
              <TbArrowUpRight
                size={15}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </motion.div>

          {/* Footer contact */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="relative flex flex-wrap items-center gap-x-5 gap-y-2 px-5 pb-8 text-[11px] uppercase tracking-[0.16em] text-text-muted sm:px-6"
          >
            {contactLinks.map(({ label, href, Icon, external }) => (
              <a
                key={label}
                href={href}
                {...(external
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
                className="inline-flex items-center gap-1.5 transition-colors hover:text-accent-lavender"
              >
                <Icon size={14} />
                {label}
              </a>
            ))}
            <span className="text-text-muted/70">South Jakarta, Indonesia</span>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

export default Layout
