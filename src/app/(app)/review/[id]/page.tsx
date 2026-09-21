"use client";

import Link from "next/link";
import { use, useState } from "react";
import { SUBMISSIONS } from "@/lib/data";
import { SectionHead, StatusBadge, TypeBadge } from "@/components/AppShell";

export default function ReviewDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [decision, setDecision] = useState<null | "setuju" | "revisi" | "tolak">(null);
  const [note, setNote] = useState("");

  const item = SUBMISSIONS.find((s) => s.id === id) ?? SUBMISSIONS[0];

  return (
    <div className="mx-auto w-full max-w-[800px] px-4 py-10 sm:px-6">
      <Link href="/review" className="tombol-geser inline-flex min-h-[44px] items-center gap-1 text-sm font-semibold text-navy">
        ← Review &amp; Approval
      </Link>
      <div className="mt-4">
        <SectionHead title="Lembar Pemeriksaan" />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <TypeBadge type={item.type} />
        <StatusBadge status={item.status} />
      </div>
      <h1 className="mt-3 text-2xl font-bold leading-snug sm:text-[28px]">{item.title}</h1>
      <p className="tracking-undip mt-2 text-xs font-medium text-black/50">
        {item.submitter} ({item.role}) • {item.date} • {item.version}
      </p>

      {decision && (
        <div className="mt-6 rounded-[5px] bg-navy p-5 text-white" role="status">
          <p className="text-lg font-semibold">
            {decision === "setuju" && "Keputusan: DISETUJUI — siap diterbitkan sebagai versi aktif."}
            {decision === "revisi" && "Keputusan: DIKEMBALIKAN — pengusul diminta merevisi."}
            {decision === "tolak" && "Keputusan: DITOLAK dengan catatan."}
          </p>
          {note && <p className="mt-1 text-sm text-white/80">Catatan: “{note}”</p>}
          <div className="mt-4 flex flex-wrap gap-2">
            <button onClick={() => setDecision(null)} className="min-h-[44px] rounded-[5px] border border-white/40 px-4 text-sm font-medium">
              Batalkan (demo)
            </button>
            <Link href="/review" className="inline-flex min-h-[44px] items-center rounded-[5px] bg-white px-4 text-sm font-semibold text-navy">
              Kembali ke Daftar →
            </Link>
          </div>
        </div>
      )}

      <dl className="mt-6 divide-y divide-surface-muted rounded-[5px] bg-white shadow-[0_1px_6px_rgba(0,0,0,0.12)] ring-1 ring-black/5">
        {[
          ["Alasan pengajuan", item.reason],
          ["Perubahan yang dilakukan", item.changes],
          ["Sumber", item.source],
          ["Versi", item.version],
        ].map(([k, v]) => (
          <div key={k} className="grid gap-1 px-5 py-4 sm:grid-cols-[200px_1fr]">
            <dt className="tracking-undip text-sm font-semibold">{k}</dt>
            <dd className="text-[15px] text-black/80">{v}</dd>
          </div>
        ))}
        <div className="px-5 py-4">
          <label className="tracking-undip mb-1 block text-sm font-semibold" htmlFor="catatan">
            Catatan reviewer / approver
          </label>
          <textarea
            id="catatan"
            rows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="cth: Setuju — sudah merujuk SOP v2.1. / Revisi: lampirkan nomor regulasi acuan."
            className="min-h-[44px] w-full rounded-[5px] border border-navy/30 bg-white px-4 py-2 text-[15px] text-black outline-none placeholder:text-black/40 focus:border-navy"
          />
        </div>
      </dl>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <button onClick={() => setDecision("setuju")} className="min-h-[44px] flex-1 rounded-[5px] bg-navy text-sm font-semibold text-white transition-opacity hover:opacity-90">
          Setujui
        </button>
        <button onClick={() => setDecision("revisi")} className="min-h-[44px] flex-1 rounded-[5px] bg-surface-muted text-sm font-semibold text-black transition-opacity hover:opacity-80">
          Minta Revisi
        </button>
        <button onClick={() => setDecision("tolak")} className="tombol-geser min-h-[44px] flex-1 rounded-[5px] border border-navy/30 text-sm font-semibold">
          Tolak →
        </button>
      </div>
      <p className="mt-3 text-[13px] text-black/60">
        Tata cara demo: Pengelola memeriksa lalu meneruskan; Pimpinan memberikan persetujuan akhir.
      </p>
    </div>
  );
}
