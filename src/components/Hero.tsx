import { FaFileDownload } from 'react-icons/fa'

function Hero() {
  return (
    <section className="relative flex w-full min-w-0 max-w-full flex-col gap-4 overflow-hidden rounded-[14px] border-[0.5px] border-[rgba(var(--rgb-glow),0.22)] bg-[#10081e] px-4 py-5 sm:flex-row sm:items-center sm:gap-[22px] sm:px-[26px] sm:py-[22px]">
      <div className="absolute -right-14 -top-16 h-40 w-40 rounded-md bg-[rgba(var(--rgb-glow),0.18)]" />
      <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-md border-2 border-[rgba(180,120,255,0.35)] bg-[linear-gradient(135deg,#7c50e0,#c060f0)] font-heading text-base font-bold text-white sm:h-[58px] sm:w-[58px] sm:text-lg">
        AD
      </div>
      <div className="relative z-10 min-w-0 flex-1 overflow-hidden">
        <div className="mb-2 inline-flex items-center gap-2 rounded-md border border-[rgba(80,200,120,0.3)] bg-green-bg px-3 py-1 text-[10px] font-medium text-[#6fd99a]">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-status" />
          Open to Work
        </div>
        <h1 className="break-words font-heading text-xl font-bold text-text-primary sm:text-2xl">
          Ahmad Dzaky Ar Razi{' '}
          <span className="block pt-1 text-[11px] text-accent-lavender/30 sm:inline sm:pl-1 sm:pt-0 sm:text-xs">
            Digitalization & Automation Enthusiast
          </span>
        </h1>
        <p className="mt-1 break-words font-body text-xs leading-5 text-text-secondary">
          IT Product Manager &middot; Full Stack Developer &middot; IT Business
          Analyst
        </p>
      </div>
      <a
        href="#"
        className="relative z-10 inline-flex w-full items-center justify-center gap-2 rounded-lg border-[0.5px] border-[rgba(150,100,255,0.45)] bg-[rgba(var(--rgb-glow),0.22)] px-[14px] py-1.5 text-[11px] font-medium text-[#c4aeff] transition duration-200 hover:border-[rgba(180,130,255,0.65)] hover:text-accent-lavender sm:w-fit"
      >
        <FaFileDownload size={11} />
        Download CV
      </a>
    </section>
  )
}

export default Hero
