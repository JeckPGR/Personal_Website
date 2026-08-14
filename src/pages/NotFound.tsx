import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  TbArrowLeft,
  TbBriefcase,
  TbCompass,
  TbFolder,
  TbHome,
  TbTerminal2,
  TbUser,
} from 'react-icons/tb'
import { useLanguage } from '../hooks/useLanguage'
import ThemeToggle from '../components/ThemeToggle'
import LanguageToggle from '../components/LanguageToggle'

function NotFound() {
  const navigate = useNavigate()
  const { language } = useLanguage()
  const isId = language === 'id'

  const quickLinks = [
    {
      to: '/',
      label: isId ? 'Beranda' : 'Home',
      desc: isId ? 'Halaman utama & profil' : 'Main landing & overview',
      icon: TbHome,
    },
    {
      to: '/project',
      label: isId ? 'Proyek' : 'Projects',
      desc: isId ? 'Koleksi karya digital' : 'Featured works & builds',
      icon: TbFolder,
    },
    {
      to: '/work',
      label: isId ? 'Pengalaman' : 'Experience',
      desc: isId ? 'Riwayat karier & peran' : 'Career trajectory & roles',
      icon: TbBriefcase,
    },
    {
      to: '/about',
      label: isId ? 'Tentang' : 'About',
      desc: isId ? 'Latar belakang & keahlian' : 'Background & toolkit',
      icon: TbUser,
    },
  ]

  return (
    <div className="relative flex min-h-screen w-full flex-col justify-between overflow-x-hidden bg-base px-4 py-6 text-text-primary sm:px-8 sm:py-8">
      {/* Blueprint Grid across entire screen */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.08] bg-[linear-gradient(rgba(var(--rgb-line),.6)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--rgb-line),.6)_1px,transparent_1px)] [background-size:48px_48px]" />

      {/* Ambient background glows */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[550px] w-[550px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(var(--rgb-glow),0.25),transparent_70%)] blur-[120px]" />
      <div className="pointer-events-none absolute right-1/4 top-1/3 h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle,rgba(var(--rgb-violet),0.16),transparent_70%)] blur-[90px]" />

      {/* HUD Corner Brackets */}
      <span className="pointer-events-none absolute left-4 top-4 h-7 w-7 border-l border-t border-[rgba(var(--rgb-line),0.35)] sm:left-8 sm:top-8 sm:h-8 sm:w-8" />
      <span className="pointer-events-none absolute right-4 top-4 h-7 w-7 border-r border-t border-[rgba(var(--rgb-line),0.35)] sm:right-8 sm:top-8 sm:h-8 sm:w-8" />
      <span className="pointer-events-none absolute bottom-4 left-4 h-7 w-7 border-b border-l border-[rgba(var(--rgb-line),0.35)] sm:bottom-8 sm:left-8 sm:h-8 sm:w-8" />
      <span className="pointer-events-none absolute bottom-4 right-4 h-7 w-7 border-b border-r border-[rgba(var(--rgb-line),0.35)] sm:bottom-8 sm:right-8 sm:h-8 sm:w-8" />

      {/* Minimal Top Header for 404 */}
      <header className="relative z-20 flex items-center justify-between">
        <Link
          to="/"
          className="group flex items-center gap-2 rounded-lg px-1 py-1 font-heading text-sm font-bold tracking-[0.2em] uppercase text-text-primary transition-colors hover:text-accent-lavender"
        >
          <span>Dzaky Razi</span>
        </Link>

        <div className="flex items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </header>

      {/* Center 404 Hero */}
      <main className="relative z-10 mx-auto my-auto flex w-full max-w-3xl flex-col items-center justify-center py-8 text-center sm:py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="flex w-full flex-col items-center"
        >
          {/* Eyebrow Status Badge */}
          <div className="inline-flex items-center gap-2.5 rounded-full border border-[rgba(var(--rgb-line),0.2)] bg-[rgba(var(--rgb-glow),0.1)] px-3.5 py-1.5 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-500" />
            </span>
            <span className="font-heading text-[11px] font-bold uppercase tracking-[0.2em] text-accent-lavender">
              <TbTerminal2 className="mr-1 inline-block text-xs" />
              {isId ? '404 // RUTE TIDAK DITEMUKAN' : '404 // ROUTE NOT FOUND'}
            </span>
          </div>

          {/* Glowing 404 Display */}
          <div className="relative mt-3 select-none">
            <h1 className="font-heading text-[clamp(4.5rem,17vw,9.5rem)] font-black leading-none tracking-tight bg-linear-to-b from-text-primary via-accent-lavender to-accent-purple bg-clip-text text-transparent drop-shadow-[0_12px_36px_rgba(var(--rgb-glow),0.35)]">
              404
            </h1>
          </div>

          {/* Headline & Description with strong contrast */}
          <h2 className="mt-3 font-heading text-xl font-bold text-text-primary sm:text-2xl md:text-3xl">
            {isId
              ? 'Koordinat ini berada di luar jangkauan.'
              : 'These coordinates are out of reach.'}
          </h2>
          <p className="mt-3 max-w-lg text-sm sm:text-base font-normal leading-relaxed text-text-primary/80">
            {isId
              ? 'Sinyal menuju rute ini terputus atau tautan telah dipindahkan. Kamu bisa kembali ke jalur aman melalui tombol di bawah.'
              : 'The link you followed may have been updated, relocated, or simply does not exist on this server.'}
          </p>

          {/* Action Buttons */}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/"
              className="group inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-accent-purple to-accent-violet px-6 py-3 text-sm font-semibold text-white shadow-[0_0_24px_rgba(var(--rgb-glow),0.35)] transition-all duration-200 hover:scale-[1.03] hover:shadow-[0_0_36px_rgba(var(--rgb-glow),0.6)] active:scale-[0.98]"
            >
              <TbHome size={18} className="transition-transform duration-200 group-hover:-translate-y-0.5" />
              <span>{isId ? 'Kembali ke Beranda' : 'Return to Home'}</span>
            </Link>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-[rgba(var(--rgb-line),0.2)] bg-[var(--app-panel)] px-5 py-3 text-sm font-semibold text-text-primary backdrop-blur-md transition-all duration-200 hover:border-[rgba(var(--rgb-line),0.4)] hover:bg-[rgba(var(--rgb-hover),0.16)] active:scale-[0.98]"
            >
              <TbArrowLeft size={18} />
              <span>{isId ? 'Halaman Sebelumnya' : 'Go Back'}</span>
            </button>
          </div>

          {/* Quick Navigation Cards */}
          <div className="mt-10 w-full border-t border-[rgba(var(--rgb-line),0.12)] pt-6 sm:mt-12 sm:pt-8">
            <div className="mb-4 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-accent-lavender">
              <TbCompass size={14} />
              <span>{isId ? 'Navigasi Cepat' : 'Quick Navigation'}</span>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {quickLinks.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="group relative flex flex-col rounded-xl border border-[rgba(var(--rgb-line),0.14)] bg-[var(--app-panel)] p-3.5 text-left backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-[rgba(var(--rgb-glow),0.5)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.25)]"
                  >
                    <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg border border-[rgba(var(--rgb-line),0.15)] bg-[rgba(var(--rgb-glow),0.12)] text-accent-lavender transition-transform duration-200 group-hover:scale-110 group-hover:text-accent-violet">
                      <Icon size={18} />
                    </div>
                    <span className="font-heading text-sm font-bold text-text-primary group-hover:text-accent-lavender">
                      {item.label}
                    </span>
                    <span className="mt-0.5 text-xs text-text-primary/70">
                      {item.desc}
                    </span>
                  </Link>
                )
              })}
            </div>
          </div>
        </motion.div>
      </main>

      {/* Footer signature */}
      <footer className="relative z-20 flex justify-center py-2 font-heading text-[11px] font-medium uppercase tracking-[0.28em] text-accent-lavender/50">
        &copy; 2026 Dzaky Razi
      </footer>
    </div>
  )
}

export default NotFound