import Link from "next/link";
import { HISTORY } from "@/lib/data";
import { SectionHead } from "@/components/AppShell";

function splitDate(date: string): { month: string; year: string; day: string } {
  const [d, m, y] = date.split(" ");
  return { day: d, month: m, year: y };
}

export default function RiwayatPage() {
  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 py-10 sm:px-6">
      <SectionHead title="Riwayat Perubahan" />
      <p className="mt-[-8px] max-w-3xl text-[15px] text-black/70">
        Menjawab gap 5 (perubahan informasi sulit ditelusuri). Setiap versi mencatat perubahan, pelaku, dan
        tanggal.
      </p>

      <div className="mt-8">
        <SectionHead title="Arsip per Dokumen" moreHref="/knowledge/sop-domisili" moreLabel="Buka Dokumen" />
        <ul className="grid gap-x-8 gap-y-4 md:grid-cols-2">
          {HISTORY.map((h) => {
            const { month, year, day } = splitDate(h.date);
            return (
              <li key={h.id} className="flex gap-4 border-b border-surface-muted pb-4">
                <div className="w-[20%] min-w-[76px] max-w-[110px] shrink-0">
                  <p className="event-month">{month}, {year}</p>
                  <p className="event-day">{day}</p>
                </div>
                <div className="min-w-0">
                  <p className="event-title">{h.knowledgeTitle} <span className="text-black/50">• v{h.version}</span></p>
                  <p className="mt-1 text-sm text-black/70">{h.change}</p>
                  <p className="tracking-undip mt-1 text-xs font-medium text-black/50">{h.by} ({h.role})</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-10">
        <SectionHead title="Tabel Versi — SOP Domisili" />
        <div className="overflow-x-auto rounded-[5px] ring-1 ring-black/10">
          <table className="w-full bg-white text-left text-sm">
            <thead>
              <tr className="bg-surface-muted/50">
                <th scope="col" className="tracking-undip px-4 py-2 text-xs font-semibold uppercase">Versi</th>
                <th scope="col" className="tracking-undip px-4 py-2 text-xs font-semibold uppercase">Perubahan</th>
                <th scope="col" className="tracking-undip px-4 py-2 text-xs font-semibold uppercase">Diubah oleh</th>
                <th scope="col" className="tracking-undip px-4 py-2 text-xs font-semibold uppercase">Tanggal</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["2.1", "Pembaruan persyaratan", "Pengelola SIPANDAI", "10 Sep 2026"],
                ["2.0", "Perubahan prosedur", "Pengelola SIPANDAI", "20 Agu 2026"],
                ["1.0", "Versi awal", "Pengelola SIPANDAI", "1 Jul 2026"],
              ].map(([v, c, b, d]) => (
                <tr key={v} className="border-t border-surface-muted">
                  <td className="px-4 py-2.5 font-semibold">v{v}</td>
                  <td className="px-4 py-2.5">{c}</td>
                  <td className="px-4 py-2.5 text-black/70">{b}</td>
                  <td className="px-4 py-2.5 text-black/70">{d}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Link href="/knowledge/sop-domisili" className="tombol-geser mt-4 inline-flex min-h-[44px] items-center gap-1 text-sm font-semibold text-navy">
          Buka dokumen SOP Domisili →
        </Link>
      </div>
    </div>
  );
}
