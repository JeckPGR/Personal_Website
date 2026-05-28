import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import {
  TbBriefcase,
  TbCertificate,
  TbFolder,
  TbHome,
  TbMenu2,
  TbUser,
  TbX,
} from 'react-icons/tb'

function Layout() {
  const location = useLocation()
  const isHome = location.pathname === '/' || location.pathname === '/home'

  return (
    <div
      className={`min-h-screen overflow-x-hidden bg-base text-text-primary ${
        isHome ? 'home-page-shell lg:h-dvh lg:max-h-dvh lg:overflow-hidden' : ''
      }`}
    >
      {!isHome ? <TopNavbar /> : null}
      <main
        className={`relative mx-auto flex w-full min-w-0 max-w-480 flex-1 flex-col gap-3 overflow-x-hidden px-3 sm:px-4 md:px-5 lg:gap-3 ${
          isHome
            ? 'min-h-screen pb-8 pt-4 md:pb-4 md:pt-4 lg:h-dvh lg:max-h-dvh lg:min-h-0 lg:overflow-hidden lg:py-2'
            : 'pb-8 pt-22 md:pt-24'
        } ${
          isHome ? 'home-page-main' : ''
        }`}
      >
        <AnimatePresence mode="wait">
          <div
            key={location.pathname}
            className={`relative z-10 min-w-0 ${
              isHome ? 'min-h-0 lg:h-full lg:overflow-hidden' : ''
            }`}
          >
            <Outlet key={location.pathname} />
          </div>
        </AnimatePresence>
      </main>
    </div>
  )
}

const menuItems = [
  { label: 'Home', to: '/', Icon: TbHome, end: true },
  { label: 'About', to: '/about', Icon: TbUser, end: true },
  { label: 'Work', to: '/work', Icon: TbBriefcase, end: true },
  { label: 'Project', to: '/project', Icon: TbFolder, end: true },
  { label: 'Certification', to: '/certification', Icon: TbCertificate, end: true },
]

function TopNavbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-999 px-3 pt-3 sm:px-4 md:px-5">
      <nav className="mx-auto max-w-480 rounded-2xl border border-[rgba(201,191,255,0.14)] bg-[rgba(13,12,22,0.78)] px-3 py-2 shadow-[0_18px_55px_rgba(0,0,0,0.42),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl">
        <div className="flex items-center justify-between gap-3">
          <NavLink
            to="/"
            end
            onClick={() => setIsOpen(false)}
            className="flex min-w-0 items-center gap-2"
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-[rgba(201,191,255,0.14)] bg-[rgba(124,80,224,0.18)] font-heading text-sm font-bold text-accent-lavender">
              DZ
            </span>
            <span className="truncate font-heading text-sm font-semibold text-text-primary">
              Dzaky
            </span>
          </NavLink>

          <div className="hidden items-center gap-1 md:flex">
            {menuItems.map(({ label, to, Icon, end }) => (
              <MenuLink
                key={to}
                label={label}
                to={to}
                Icon={Icon}
                end={end}
                onClick={() => setIsOpen(false)}
              />
            ))}
          </div>

          <button
            type="button"
            aria-label="Open navigation menu"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((current) => !current)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[rgba(201,191,255,0.12)] bg-[rgba(255,255,255,0.04)] text-text-secondary transition hover:border-[rgba(201,191,255,0.28)] hover:text-accent-lavender md:hidden"
          >
            {isOpen ? <TbX size={19} /> : <TbMenu2 size={19} />}
          </button>
        </div>

        <AnimatePresence>
          {isOpen ? (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="mt-2 grid gap-1 border-t border-[rgba(201,191,255,0.1)] pt-2 md:hidden"
            >
              {menuItems.map(({ label, to, Icon, end }) => (
                <MenuLink
                  key={to}
                  label={label}
                  to={to}
                  Icon={Icon}
                  end={end}
                  onClick={() => setIsOpen(false)}
                />
              ))}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </nav>
    </header>
  )
}

type MenuLinkProps = {
  label: string
  to: string
  Icon: typeof TbHome
  end: boolean
  onClick: () => void
}

function MenuLink({ label, to, Icon, end, onClick }: MenuLinkProps) {
  return (
    <NavLink
      to={to}
      end={end}
      onClick={onClick}
      className={({ isActive }) =>
        `flex min-w-0 items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium transition duration-200 ${
          isActive
            ? 'bg-[rgba(124,80,224,0.22)] text-accent-lavender shadow-[0_0_22px_rgba(124,80,224,0.14)]'
            : 'text-text-muted hover:bg-[rgba(255,255,255,0.05)] hover:text-text-secondary'
        }`
      }
    >
      <Icon size={15} />
      <span className="truncate">{label}</span>
    </NavLink>
  )
}

export default Layout
