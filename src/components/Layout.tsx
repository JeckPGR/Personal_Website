import { AnimatePresence } from 'framer-motion'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { TbBriefcase, TbHome, TbUser } from 'react-icons/tb'
import { Particles } from './ui/particles'

function Layout() {
  const location = useLocation()
  const isHome = location.pathname === '/' || location.pathname === '/home'
  const showBottomMenu = !isHome

  return (
    <div
      className={`min-h-screen overflow-x-hidden bg-base text-text-primary ${
        isHome ? 'home-page-shell' : ''
      }`}
    >
      <main
        className={`relative mx-auto flex w-full min-w-0 max-w-480 flex-1 flex-col gap-3 px-3 pt-4 sm:px-4 md:px-5 md:pt-4 lg:gap-3 ${
          showBottomMenu ? 'pb-24 md:pb-24' : 'pb-8 md:pb-4'
        } ${
          isHome ? 'home-page-main' : ''
        }`}
      >
        <Particles
          className="absolute inset-0 z-0 opacity-45"
          quantity={500}
          staticity={50}
          ease={80}
          size={0.55}
          color="#c9bfff"
        />
        <AnimatePresence mode="wait">
          <div key={location.pathname} className="relative z-10">
            <Outlet key={location.pathname} />
          </div>
        </AnimatePresence>
      </main>
      {showBottomMenu ? <BottomMenu /> : null}
    </div>
  )
}

const menuItems = [
  { label: 'Home', to: '/', Icon: TbHome, end: true },
  { label: 'About', to: '/about', Icon: TbUser, end: true },
  { label: 'Work & Project', to: '/work', Icon: TbBriefcase, end: false },
]

function BottomMenu() {
  return (
    <nav className="fixed bottom-4 left-1/2 z-999 w-[calc(100%-24px)] max-w-107.5 -translate-x-1/2 rounded-2xl border border-[rgba(201,191,255,0.14)] bg-[rgba(13,12,22,0.78)] p-1.5 shadow-[0_18px_55px_rgba(0,0,0,0.42),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl">
      <div className="grid grid-cols-3 gap-1">
        {menuItems.map(({ label, to, Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex min-w-0 items-center justify-center gap-1.5 rounded-xl px-2 py-2 text-[11px] font-medium transition duration-200 ${
                isActive
                  ? 'bg-[rgba(124,80,224,0.22)] text-accent-lavender shadow-[0_0_22px_rgba(124,80,224,0.14)]'
                  : 'text-text-muted hover:bg-[rgba(255,255,255,0.05)] hover:text-text-secondary'
              }`
            }
          >
            <Icon size={15} />
            <span className="truncate">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  )
}

export default Layout
