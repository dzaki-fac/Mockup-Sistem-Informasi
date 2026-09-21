"use client";

import Link from "next/link";
import { useState } from "react";
import { HISTORY, KNOWLEDGE, NOTIFICATIONS, SUBMISSIONS } from "@/lib/data";
import HeroSlider from "@/components/HeroSlider";
import KnowledgeCard from "@/components/KnowledgeCard";
import { EventCard, SectionHead, StatusBadge, TileGrid } from "@/components/AppShell";

export default function DashboardPage() {
  const [visible, setVisible] = useState(4);
  const [loading, setLoading] = useState(false);
  const featured = [KNOWLEDGE[0], KNOWLEDGE[1], KNOWLEDGE[3]];
  const news = KNOWLEDGE.slice(0, visible);

  const more = () => {
    setLoading(true);
    window.setTimeout(() => {
      setVisible((v) => Math.min(v + 4, KNOWLEDGE.length));
      setLoading(false);
    }, 450);
  };

  return (
    <div>
      <HeroSlider slides={featured} />

      {/* Banner lebar */}
      <div className="mx-auto w-full max-w-[1200px] px-4 pt-6 sm:px-6">
        <div className="flex flex-col items-start gap-1 rounded-[5px] bg-navy px-6 py-5 text-white sm:flex-row sm:items-center">
          <p className="tracking-undip text-sm font-semibold">
            Siklus SIPANDAI: Capture → Store → Share → Apply
          </p>
          <p className="text-[13px] text-white/75 sm:ml-4">
            Acuan resmi petugas pada tahap pemeriksaan, verifikasi, dan validasi dokumen.
          </p>
          <Link href="/knowledge" className="tombol-geser mt-2 inline-flex min-h-[44px] w-full items-center justify-center gap-1 rounded-[5px] bg-white px-4 text-sm font-semibold text-navy sm:ml-auto sm:mt-0 sm:w-auto">
            Buka Knowledge Center →
          </Link>
        </div>
      </div>

      {/* Berita knowledge */}
      <section className="mx-auto w-full max-w-[1200px] px-4 pt-12 sm:px-6" aria-labelledby="berita-h">
        <div id="berita-h">
          <SectionHead title="Knowledge Terbaru" />
        </div>
        <div className="grid gap-[35px] md:grid-cols-2">
          {news.map((k) => (
            <KnowledgeCard key={k.id} item={k} />
          ))}
        </div>
        {visible < KNOWLEDGE.length && (
          <div className="mt-8 text-center">
            <button
              onClick={more}
              disabled={loading}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-[5px] bg-navy px-8 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {loading && (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden />
              )}
              {loading ? "Memuat…" : "Lebih banyak"}
            </button>
          </div>
        )}
      </section>

      {/* Pengumuman */}
      <section className="mx-auto w-full max-w-[1200px] px-4 pt-12 sm:px-6" aria-labelledby="umum-h">
        <div id="umum-h">
          <SectionHead title="Pengumuman SIPANDAI" moreHref="/review" moreLabel="Pengumuman Lainnya" />
        </div>
        <ul className="grid gap-x-8 gap-y-4 md:grid-cols-2">
          {NOTIFICATIONS.map((n) => (
            <li key={n.id} className="border-b border-surface-muted pb-4">
              <Link href="/review" className="text-[17px] font-semibold leading-snug text-black hover:text-navy hover:underline">
                {n.title}
              </Link>
              <p className="tracking-undip mt-1 text-xs font-medium text-black/50">{n.time}</p>
            </li>
          ))}
          {SUBMISSIONS.slice(0, 2).map((s) => (
            <li key={s.id} className="border-b border-surface-muted pb-4">
              <Link href="/review" className="text-[17px] font-semibold leading-snug text-black hover:text-navy hover:underline">
                {s.title}
              </Link>
              <p className="tracking-undip mt-1 text-xs font-medium text-black/50">{s.date} • {s.submitter}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Agenda review ala kartu event */}
      <section className="mx-auto w-full max-w-[1200px] px-4 pt-12 sm:px-6" aria-labelledby="agenda-h">
        <div id="agenda-h">
          <SectionHead title="Agenda Review" moreHref="/review" moreLabel="Lihat Semua Event" />
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          <EventCard month="September" year="2026" day="12" title="Batas review: Persyaratan SKU v1.4" desc="Pengelola SIPANDAI memeriksa kelengkapan usulan Petugas Pelayanan A sebelum diteruskan ke pimpinan." href="/review" />
          <EventCard month="September" year="2026" day="11" title="Kurasi: Panduan KK Pendatang Baru" desc="Hasil kurasi pengalaman lapangan Petugas Pelayanan B menunggu pemeriksaan." href="/review" />
        </div>
      </section>

      {/* Aktivitas + usulan */}
      <section className="mx-auto w-full max-w-[1200px] px-4 pt-12 sm:px-6" aria-labelledby="aktif-h">
        <div id="aktif-h">
          <SectionHead title="Aktivitas & Usulan" moreHref="/riwayat" moreLabel="Lihat Semua" />
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="tracking-undip text-sm font-semibold uppercase text-black/60">Aktivitas Terbaru</h3>
            <ul className="mt-3 space-y-4">
              {HISTORY.slice(0, 4).map((h) => (
                <li key={h.id} className="border-b border-surface-muted pb-3">
                  <p className="text-[15px] font-semibold">{h.knowledgeTitle} <span className="font-normal text-black/50">• v{h.version}</span></p>
                  <p className="text-[13px] text-black/60">{h.change} — {h.by}, {h.date}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="tracking-undip text-sm font-semibold uppercase text-black/60">Usulan Knowledge</h3>
            <ul className="mt-3 space-y-3">
              {SUBMISSIONS.slice(0, 3).map((s) => (
                <li key={s.id} className="rounded-[5px] bg-surface-muted/40 p-3">
                  <Link href="/review" className="text-[15px] font-semibold hover:underline">{s.title}</Link>
                  <p className="mt-1.5 flex items-center gap-2">
                    <StatusBadge status={s.status} />
                    <span className="text-xs text-black/50">{s.date}</span>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Tautan layanan */}
      <section className="mx-auto w-full max-w-[1200px] px-4 py-12 sm:px-6" aria-labelledby="taut-h">
        <div id="taut-h">
          <SectionHead title="Tautan Layanan" />
        </div>
        <TileGrid
          tiles={[
            { icon: "§", label: "SOP", href: "/knowledge" },
            { icon: "✓", label: "Persyaratan", href: "/knowledge" },
            { icon: "⚖", label: "Regulasi", href: "/knowledge" },
            { icon: "✎", label: "Panduan Kasus", href: "/knowledge" },
            { icon: "?", label: "FAQ", href: "/knowledge" },
            { icon: "◷", label: "Riwayat", href: "/riwayat" },
            { icon: "✉", label: "Ajukan", href: "/ajukan" },
            { icon: "○", label: "Publik", href: "/" },
          ]}
        />
      </section>
    </div>
  );
}
