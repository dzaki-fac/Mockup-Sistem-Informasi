"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { KNOWLEDGE, type KnowledgeType } from "@/lib/data";
import KnowledgeCard from "@/components/KnowledgeCard";
import { SectionHead } from "@/components/AppShell";

const CATEGORIES: ("Semua" | KnowledgeType)[] = [
  "Semua",
  "SOP",
  "Persyaratan",
  "Regulasi",
  "Panduan Kasus",
  "FAQ",
];

const STATUSES = ["Semua", "Aktif", "Menunggu Review", "Perlu Revisi", "Disetujui"];

export default function KnowledgeCenterPage() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("Semua");
  const [status, setStatus] = useState("Semua");
  const [visible, setVisible] = useState(6);
  const [loading, setLoading] = useState(false);

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    return KNOWLEDGE.filter((k) => {
      if (cat !== "Semua" && k.type !== cat) return false;
      if (status !== "Semua" && k.status !== status) return false;
      if (!query) return true;
      return (
        k.title.toLowerCase().includes(query) ||
        k.description.toLowerCase().includes(query) ||
        k.content.join(" ").toLowerCase().includes(query)
      );
    });
  }, [q, cat, status]);

  const shown = results.slice(0, visible);

  const more = () => {
    setLoading(true);
    window.setTimeout(() => {
      setVisible((v) => v + 6);
      setLoading(false);
    }, 450);
  };

  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 py-10 sm:px-6">
      <SectionHead title="Knowledge Center" />
      <p className="mt-[-8px] max-w-3xl text-[15px] text-black/70">
        Indeks seluruh acuan pelayanan. Setiap entri mencantumkan kategori, status, versi, dan tanggal
        pembaruan.
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          router.push(`/search?q=${encodeURIComponent(q)}`);
        }}
        role="search"
        className="mt-6 flex max-w-2xl gap-2"
      >
        <label htmlFor="kc-q" className="sr-only">Cari knowledge</label>
        <input
          id="kc-q"
          value={q}
          onChange={(e) => { setQ(e.target.value); setVisible(6); }}
          placeholder="Cari ..."
          className="min-h-[44px] w-full rounded-[5px] border border-navy/30 bg-white px-4 text-[15px] text-black outline-none placeholder:text-black/40 focus:border-navy"
        />
        <button type="submit" className="min-h-[44px] shrink-0 rounded-[5px] bg-navy px-6 text-sm font-semibold text-white">
          Cari
        </button>
      </form>

      <div className="mt-6 flex flex-wrap items-end gap-4">
        <div>
          <p id="cat-label" className="tracking-undip text-xs font-semibold uppercase text-black/50">Kategori</p>
          <div className="mt-2 flex flex-wrap gap-2" role="group" aria-labelledby="cat-label">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => { setCat(c); setVisible(6); }}
                aria-pressed={cat === c}
                className={`tracking-undip min-h-[44px] rounded-[5px] px-3 text-[13px] font-medium transition-colors ${
                  cat === c ? "bg-navy text-white" : "border border-navy/25 bg-white hover:border-navy"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label htmlFor="st" className="tracking-undip block text-xs font-semibold uppercase text-black/50">Status</label>
          <select
            id="st"
            value={status}
            onChange={(e) => { setStatus(e.target.value); setVisible(6); }}
            className="mt-2 min-h-[44px] rounded-[5px] border border-navy/25 bg-white px-3 text-sm font-medium"
          >
            {STATUSES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
        <p className="ml-auto text-sm text-black/60">
          Menampilkan <strong className="text-black">{shown.length}</strong> dari {results.length} dokumen
        </p>
      </div>

      <div className="mt-8 grid gap-[35px] md:grid-cols-2">
        {shown.map((k) => (
          <KnowledgeCard key={k.id} item={k} />
        ))}
      </div>

      {shown.length === 0 && (
        <div className="mt-8 rounded-[5px] bg-surface-muted/40 p-10 text-center">
          <p className="text-xl font-semibold">Data tidak ditemukan.</p>
          <p className="mx-auto mt-2 max-w-md text-sm text-black/60">
            Coba kata kunci lain atau ubah saringan, atau ajukan sebagai knowledge baru.
          </p>
          <button
            onClick={() => router.push("/ajukan")}
            className="mt-4 inline-flex min-h-[44px] items-center rounded-[5px] bg-navy px-6 text-sm font-semibold text-white"
          >
            Ajukan Knowledge →
          </button>
        </div>
      )}

      {visible < results.length && (
        <div className="mt-8 text-center">
          <button
            onClick={more}
            disabled={loading}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-[5px] bg-navy px-8 text-sm font-semibold text-white disabled:opacity-60"
          >
            {loading && (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden />
            )}
            {loading ? "Memuat…" : "Lebih banyak"}
          </button>
        </div>
      )}
    </div>
  );
}
