import Link from "next/link";
import { SERVICES } from "@/lib/data";
import { SectionHead, TileGrid } from "@/components/AppShell";

export default async function PublicInfoPage({
  searchParams,
}: {
  searchParams: Promise<{ layanan?: string }>;
}) {
  const { layanan } = await searchParams;
  const active = SERVICES.find((s) => s.id === layanan) ?? SERVICES[0];

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-black">
      <a href="#layanan" className="sr-only focus:not-sr-only focus:bg-navy focus:px-4 focus:py-2 focus:text-white">
        Lewati ke konten
      </a>
      <div className="bg-navy-deep text-white">
        <div className="mx-auto flex w-full max-w-[1200px] items-center px-4 py-1.5 text-xs sm:px-6">
          <span className="tracking-undip">Portal Informasi Pelayanan — data prototype bersifat dummy</span>
          <Link href="/login" className="ml-auto font-semibold underline underline-offset-2">
            Login Petugas
          </Link>
        </div>
      </div>
      <header className="bg-navy text-white">
        <div className="mx-auto flex w-full max-w-[1200px] items-center gap-3 px-4 py-4 sm:px-6">
          <Link href="/" className="flex items-center" aria-label="Informasi Pelayanan — Beranda">
            <span className="leading-tight">
              <span className="tracking-undip block text-base font-semibold">INFORMASI PELAYANAN</span>
              <span className="block text-xs text-white/75">Kelurahan Tembalang, Kota Semarang</span>
            </span>
          </Link>
          <nav className="mx-auto hidden items-center lg:flex" aria-label="Navigasi layanan">
            {SERVICES.map((s) => (
              <Link
                key={s.id}
                href={`/?layanan=${s.id}`}
                aria-current={s.id === active.id ? "page" : undefined}
                className={`tracking-undip flex min-h-[44px] items-center px-4 text-sm font-medium hover:opacity-75 ${
                  s.id === active.id ? "underline decoration-2 underline-offset-8" : ""
                }`}
              >
                {s.name.replace("Surat Keterangan ", "")}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Banner */}
      <div className="bg-navy">
        <div className="mx-auto w-full max-w-[1200px] px-4 pb-8 sm:px-6">
          <div className="relative overflow-hidden rounded-[5px] bg-navy-deep px-6 py-8 sm:px-10">
            <div className="absolute inset-0 bg-black/45" aria-hidden />
            <div className="relative">
              <p>
                <span className="tracking-undip inline-block rounded-[3px] bg-white-20 px-2 py-1 text-xs font-medium text-white">
                  Layanan Masyarakat
                </span>
              </p>
              <h1 className="mt-3 max-w-2xl text-3xl font-bold leading-tight text-white sm:text-4xl">
                {active.name}
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-white/80">
                {active.description} Terakhir dimutakhirkan: {active.updatedAt}.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {SERVICES.map((s) => (
                  <Link
                    key={s.id}
                    href={`/?layanan=${s.id}`}
                    aria-pressed={s.id === active.id}
                    className={`tracking-undip flex min-h-[44px] items-center rounded-[5px] px-3 text-[13px] font-medium transition-colors ${
                      s.id === active.id ? "bg-white text-navy" : "bg-white-20 text-white hover:bg-white hover:text-navy"
                    }`}
                  >
                    {s.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <main id="layanan" className="mx-auto w-full max-w-[1200px] flex-1 px-4 py-10 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="space-y-10 lg:col-span-2">
            <section aria-labelledby="syarat-h">
              <div id="syarat-h"><SectionHead title="Persyaratan" /></div>
              <ol className="list-decimal space-y-2 pl-6 text-[15px] leading-relaxed">
                {active.requirements.map((r, i) => (
                  <li key={i} className="border-b border-surface-muted pb-2 last:border-0">{r}</li>
                ))}
              </ol>
            </section>
            <section aria-labelledby="pros-h">
              <div id="pros-h"><SectionHead title="Prosedur Pelayanan" /></div>
              <ol className="list-decimal space-y-2 pl-6 text-[15px] leading-relaxed">
                {active.procedure.map((p, i) => (
                  <li key={i} className="border-b border-surface-muted pb-2 last:border-0">{p}</li>
                ))}
              </ol>
            </section>
            <section aria-labelledby="faq-h">
              <div id="faq-h"><SectionHead title="Pertanyaan Umum (FAQ)" /></div>
              <div className="divide-y divide-surface-muted">
                {active.faq.map((f, i) => (
                  <div key={i} className="py-3">
                    <p className="text-[15px] font-semibold">Tanya {i + 1}: {f.q}</p>
                    <p className="mt-1 text-[15px] text-black/70"><strong className="text-black">Jawab:</strong> {f.a}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
          <aside className="space-y-6">
            <div className="rounded-[5px] bg-surface-muted/40 p-5">
              <h2 className="tracking-undip text-sm font-semibold uppercase text-black/60">Kontak Kelurahan</h2>
              <ul className="mt-2 space-y-1 text-[13px] text-black/75">
                <li>Jl. Sirojudin No. 1, Tembalang (dummy)</li>
                <li>(024) 000-0000 (dummy)</li>
                <li>Senin–Jumat 08.00–14.00 (dummy)</li>
              </ul>
            </div>
            <div className="rounded-[5px] bg-navy p-5 text-white">
              <h2 className="tracking-undip text-sm font-semibold uppercase">Catatan Privasi</h2>
              <p className="mt-2 text-[13px] text-white/80">
                Panduan penanganan kasus internal tidak dipublikasikan di sini demi privasi dan keseragaman informasi.
              </p>
            </div>
          </aside>
        </div>

        <div className="pt-12" aria-label="Tautan layanan">
          <SectionHead title="Layanan Lainnya" />
          <TileGrid
            tiles={SERVICES.filter((s) => s.id !== active.id).map((s) => ({
              label: s.name,
              href: `/?layanan=${s.id}`,
              icon: "§",
            })).concat([{ label: "SIPANDAI Internal", href: "/dashboard", icon: "≡" }])}
          />
        </div>
      </main>

      <footer className="bg-navy text-white">
        <p className="mx-auto w-full max-w-[1200px] px-4 py-3 text-center text-xs text-white/70 sm:px-6">
          Copyright © Kelurahan Tembalang | 2026 — Alur: Informasi Publik → Layanan → Persyaratan / Prosedur / FAQ.
        </p>
      </footer>
    </div>
  );
}
