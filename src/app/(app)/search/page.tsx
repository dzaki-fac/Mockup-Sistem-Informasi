import Link from "next/link";
import { searchKnowledge } from "@/lib/data";
import KnowledgeCard from "@/components/KnowledgeCard";
import { SectionHead } from "@/components/AppShell";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const results = searchKnowledge(q);

  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 py-10 sm:px-6">
      <Link href="/knowledge" className="tombol-geser inline-flex min-h-[44px] items-center gap-1 text-sm font-semibold text-navy">
        ← Knowledge Center
      </Link>
      <div className="mt-4">
        <SectionHead title={q ? `Hasil pencarian: “${q}”` : "Hasil pencarian"} />
      </div>
      <p className="mt-[-8px] text-[15px] text-black/70">
        Ditemukan <strong className="text-black">{results.length}</strong> dokumen — kategori, status, versi,
        dan tanggal pemutakhiran tercantum pada tiap kartu.
      </p>

      <form action="/search" method="get" role="search" className="mt-6 flex max-w-2xl gap-2">
        <label htmlFor="sq" className="sr-only">Ubah kata kunci</label>
        <input
          id="sq"
          name="q"
          defaultValue={q}
          minLength={2}
          placeholder="Cari ..."
          className="min-h-[44px] w-full rounded-[5px] border border-navy/30 bg-white px-4 text-[15px] text-black outline-none placeholder:text-black/40 focus:border-navy"
        />
        <button type="submit" className="min-h-[44px] shrink-0 rounded-[5px] bg-navy px-6 text-sm font-semibold text-white">
          Cari
        </button>
      </form>

      {results.length === 0 ? (
        <div className="mt-8 rounded-[5px] bg-surface-muted/40 p-10 text-center">
          <p className="text-xl font-semibold">Data tidak ditemukan untuk “{q}”.</p>
          <p className="mt-2 text-sm text-black/60">Coba kata kunci “domisili”, “SOP”, atau “FAQ”.</p>
        </div>
      ) : (
        <div className="mt-8 grid gap-[35px] md:grid-cols-2">
          {results.map((k) => (
            <KnowledgeCard key={k.id} item={k} />
          ))}
        </div>
      )}

      <div className="mt-8 rounded-[5px] bg-surface-muted/40 p-5 text-sm text-black/75">
        <strong className="text-black">Catatan pengujian (Task 1 &amp; 2):</strong> petugas mengetik “surat
        keterangan domisili” → menemukan SOP, Persyaratan, dan FAQ → membuka detail untuk memastikan versi
        terbaru (SOP v2.1) sebelum verifikasi berkas.
      </div>
    </div>
  );
}
