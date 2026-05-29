import { Link } from 'react-router-dom'
import { TbArrowLeft, TbHome, TbSearch } from 'react-icons/tb'

function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-base px-5 py-16 text-text-primary">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(124,80,224,0.18),transparent_32%),radial-gradient(circle_at_80%_70%,rgba(192,96,240,0.14),transparent_34%)]" />

      <div className="pointer-events-none absolute inset-0 opacity-30 bg-[radial-gradient(rgba(201,191,255,0.28)_1px,transparent_1px)] bg-size-[22px_22px]" />

      <section className="relative z-10 w-full max-w-3xl rounded-[28px] border border-border bg-surface p-6 text-center shadow-[0_24px_80px_rgba(0,0,0,0.38),inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-xl sm:p-10">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-3xl border border-[rgba(201,191,255,0.14)] bg-surface-hover text-accent-lavender shadow-[0_0_40px_rgba(124,80,224,0.22)]">
          <TbSearch size={30} />
        </div>

        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-accent-lavender/70">
          Page not found
        </p>

        <h1 className="font-heading text-[clamp(4rem,16vw,9rem)] font-black leading-none text-text-primary">
          404
        </h1>

        <h2 className="mt-5 font-heading text-2xl font-bold leading-tight text-text-primary sm:text-4xl">
          Halaman yang kamu cari tidak ditemukan.
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-text-secondary sm:text-text-secondary">
          Sepertinya halaman ini sudah dipindahkan, dihapus, atau URL yang kamu
          masukkan kurang tepat. Tenang, kamu bisa kembali ke halaman utama.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/"
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-accent-purple to-accent-violet px-5 py-3 text-sm font-semibold text-white shadow-[0_0_28px_rgba(124,80,224,0.35)] transition duration-200 hover:scale-[1.02] sm:w-auto"
          >
            <TbHome size={18} />
            Kembali ke Home
          </Link>

          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-[rgba(201,191,255,0.14)] bg-surface px-5 py-3 text-sm font-semibold text-accent-lavender transition duration-200 hover:border-[rgba(201,191,255,0.32)] hover:bg-surface-hover sm:w-auto"
          >
            <TbArrowLeft size={18} />
            Kembali
          </button>
        </div>
      </section>
    </main>
  )
}

export default NotFound