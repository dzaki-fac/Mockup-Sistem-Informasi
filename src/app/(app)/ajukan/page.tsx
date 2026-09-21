"use client";

import Link from "next/link";
import { useState } from "react";
import { SectionHead } from "@/components/AppShell";

const TYPES = ["SOP", "Persyaratan", "Regulasi", "Panduan Kasus", "FAQ"];

const field =
  "min-h-[44px] w-full rounded-[5px] border border-navy/30 bg-white px-4 text-[15px] text-black outline-none placeholder:text-black/40 focus:border-navy";

export default function AjukanPage() {
  const [submitted, setSubmitted] = useState<null | "draft" | "review">(null);
  const [title, setTitle] = useState("");
  const [type, setType] = useState(TYPES[0]);

  if (submitted) {
    return (
      <div className="mx-auto w-full max-w-[800px] px-4 py-10 sm:px-6">
        <SectionHead title="Status Pengajuan" />
        <div className="rounded-[5px] bg-white p-8 text-center shadow-[0_1px_6px_rgba(0,0,0,0.12)] ring-1 ring-black/5">
          <p className="tracking-undip inline-block rounded-[3px] bg-navy px-2 py-1 text-xs font-medium text-white">
            {submitted === "draft" ? "Draft" : "Menunggu Review"}
          </p>
          <h1 className="mt-3 text-2xl font-bold">
            {submitted === "draft" ? "Draft berhasil disimpan." : "Usulan berhasil dikirim."}
          </h1>
          <p className="mx-auto mt-2 max-w-md text-[15px] text-black/70">
            {submitted === "draft"
              ? "Draft dapat dilanjutkan kapan saja sebelum diajukan ke Pengelola KMS."
              : `“${title || "Usulan knowledge"}” (${type}) telah diteruskan ke Pengelola KMS.`}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <Link href="/review" className="inline-flex min-h-[44px] items-center rounded-[5px] bg-navy px-6 text-sm font-semibold text-white">
              Lihat Status Pengajuan →
            </Link>
            <button
              onClick={() => setSubmitted(null)}
              className="tombol-geser inline-flex min-h-[44px] items-center gap-1 rounded-[5px] border border-navy/30 px-6 text-sm font-semibold"
            >
              Buat Usulan Baru →
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[800px] px-4 py-10 sm:px-6">
      <SectionHead title="Formulir Pengajuan Knowledge" />
      <p className="mt-[-8px] max-w-2xl text-[15px] text-black/70">
        Tahap Capture: pengalaman petugas dan temuan layanan dikumpulkan di sini (Task 3 usability).
        Kolom bertanda * wajib diisi.
      </p>

      <form className="mt-6 rounded-[5px] bg-white p-5 shadow-[0_1px_6px_rgba(0,0,0,0.12)] ring-1 ring-black/5 sm:p-8" onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-5">
          <div>
            <label className="tracking-undip mb-1 block text-sm font-semibold" htmlFor="judul">Judul *</label>
            <input id="judul" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="cth: Pembaruan Persyaratan SKU — penegasan bukti usaha" className={field} />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="tracking-undip mb-1 block text-sm font-semibold" htmlFor="jenis">Jenis knowledge *</label>
              <select id="jenis" value={type} onChange={(e) => setType(e.target.value)} className={field}>
                {TYPES.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="tracking-undip mb-1 block text-sm font-semibold" htmlFor="sumber">Sumber *</label>
              <input id="sumber" placeholder="cth: Temuan layanan 12 Sep 2026" className={field} />
            </div>
          </div>
          <div>
            <label className="tracking-undip mb-1 block text-sm font-semibold" htmlFor="isi">Isi / Deskripsi *</label>
            <textarea id="isi" rows={5} placeholder="Tulis isi knowledge atau uraian perubahan. Untuk panduan kasus: jangan memasukkan data pribadi masyarakat." className={field} />
          </div>
          <div>
            <span className="tracking-undip mb-1 block text-sm font-semibold" id="lampiran-label">Lampiran</span>
            <div className="rounded-[5px] border border-dashed border-navy/30 bg-surface-muted/30 px-4 py-8 text-center text-sm text-black/60" role="group" aria-labelledby="lampiran-label">
              Klik untuk memilih berkas (dummy — PDF/DOC maks. 10 MB)
            </div>
          </div>
          <div>
            <label className="tracking-undip mb-1 block text-sm font-semibold" htmlFor="alasan">Alasan pengajuan *</label>
            <textarea id="alasan" rows={3} placeholder="cth: Banyak pemohon menanyakan bukti usaha; perlu penegasan agar verifikasi konsisten." className={field} />
          </div>
          <p className="rounded-[5px] bg-surface-muted/40 p-4 text-sm text-black/75">
            Alur status: <strong className="text-black">Draft → Menunggu Review → Perlu Revisi / Disetujui / Ditolak.</strong> Hanya
            versi yang <strong className="text-black">Disetujui pimpinan</strong> yang diterbitkan sebagai acuan aktif.
          </p>
          <div className="flex flex-col gap-2 border-t border-surface-muted pt-5 sm:flex-row">
            <button type="button" onClick={() => setSubmitted("draft")} className="min-h-[44px] flex-1 rounded-[5px] border border-navy/30 text-sm font-semibold transition-colors hover:bg-navy hover:text-white">
              Simpan Draft
            </button>
            <button type="button" onClick={() => setSubmitted("review")} className="min-h-[44px] flex-1 rounded-[5px] bg-navy text-sm font-semibold text-white transition-opacity hover:opacity-90">
              Ajukan untuk Review →
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
