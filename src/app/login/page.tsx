"use client";

import Link from "next/link";
import { useState } from "react";

const inputCls =
  "min-h-[44px] w-full rounded-[5px] border border-navy/30 bg-white px-4 text-[15px] text-black outline-none placeholder:text-black/40 focus:border-navy";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginAs = (role: "petugas" | "pengelola" | "pimpinan") => {
    try {
      window.localStorage.setItem("kms-role", role);
    } catch {
      /* abaikan: penyimpanan diblokir (mode privat/iframe), tetap lanjut login */
    }
    /* full reload: tidak bergantung pada client router */
    window.location.assign("/dashboard");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mail = email.toLowerCase();
    if (mail.includes("pimpinan")) loginAs("pimpinan");
    else if (mail.includes("kelola")) loginAs("pengelola");
    else loginAs("petugas");
  };

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-black">
      <a href="#login" className="sr-only focus:not-sr-only focus:bg-navy focus px-4 py-2 text-white">
        Lewati ke konten
      </a>
      <div className="bg-navy-deep text-white">
        <p className="mx-auto w-full max-w-[1200px] px-4 py-1.5 text-center text-xs sm:px-6">
          Prototype KMS — seluruh data bersifat dummy, bukan sistem resmi
        </p>
      </div>
      <header className="bg-navy text-white">
        <div className="mx-auto flex w-full max-w-[1200px] items-center justify-center px-4 py-4 sm:px-6">
          <span className="leading-tight">
            <span className="tracking-undip block text-base font-semibold">KMS TEMBALANG</span>
            <span className="block text-xs text-white/75">Kelurahan Tembalang, Kota Semarang</span>
          </span>
        </div>
      </header>

      <main id="login" className="mx-auto grid w-full max-w-[1200px] flex-1 items-start gap-8 px-4 py-10 sm:px-6 lg:grid-cols-2">
        <section aria-labelledby="sambut-h">
          <h1 id="sambut-h" className="text-2xl font-bold tracking-tight sm:text-[28px]">Selamat Datang di KMS Pelayanan Publik</h1>
          <hr className="mt-3 border-t-2 border-navy" />
          <p className="mt-4 text-[15px] leading-relaxed text-black/75">
            Sistem pendukung pengelolaan pengetahuan pelayanan publik dalam rangka <em>Smart Governance</em>{" "}
            Kelurahan Tembalang. KMS memuat acuan resmi — SOP, persyaratan, regulasi, panduan kasus, dan FAQ —
            yang dibutuhkan petugas pada tahap pemeriksaan, verifikasi, dan validasi dokumen.
          </p>
          <h2 className="mt-6 text-lg font-semibold">Cakupan Knowledge</h2>
          <hr className="mt-2 border-t border-surface-muted" />
          <ul className="mt-3 divide-y divide-surface-muted text-[15px]">
            {[["SOP Pelayanan", "2 dokumen"], ["Persyaratan Layanan", "2 dokumen"], ["Regulasi", "1 dokumen"], ["Panduan Kasus", "2 dokumen"], ["FAQ Layanan", "2 dokumen"]].map(([a, b], i) => (
              <li key={a} className="flex items-center justify-between py-2">
                <span><span className="mr-2 text-black/40">{i + 1}.</span><strong className="font-semibold">{a}</strong></span>
                <span className="text-black/60">{b}</span>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="masuk-h" className="rounded-[5px] bg-white shadow-[0_1px_6px_rgba(0,0,0,0.12)] ring-1 ring-black/10">
          <h2 id="masuk-h" className="rounded-t-[5px] bg-navy px-5 py-3 text-lg font-semibold text-white">Login Pengguna</h2>
          <form onSubmit={handleSubmit} className="space-y-4 p-5">
            <div>
              <label className="tracking-undip mb-1 block text-sm font-semibold" htmlFor="email">Email / Username</label>
              <input id="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="cth: petugas@tembalang.id" autoComplete="username" className={inputCls} />
            </div>
            <div>
              <label className="tracking-undip mb-1 block text-sm font-semibold" htmlFor="password">Password</label>
              <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" autoComplete="current-password" className={inputCls} />
            </div>
            <button type="submit" className="min-h-[44px] w-full rounded-[5px] bg-navy text-[15px] font-semibold text-white transition-opacity hover:opacity-90">
              Login
            </button>
          </form>
          <div className="border-t border-surface-muted p-5">
            <p className="tracking-undip text-xs font-semibold uppercase text-black/50">Pintasan demo — tanpa password</p>
            <div className="mt-2 grid gap-2">
              {([["petugas", "Petugas Pelayanan"], ["pengelola", "Pengelola KMS"], ["pimpinan", "Pimpinan / Approver"]] as const).map(([r, label]) => (
                <button key={r} type="button" onClick={() => loginAs(r)} className="flex min-h-[44px] items-center rounded-[5px] border border-navy/30 px-4 text-left text-sm font-semibold transition-colors hover:bg-navy hover:text-white">
                  Masuk sebagai {label} <span aria-hidden className="ml-auto">→</span>
                </button>
              ))}
            </div>
            <Link href="/" className="tombol-geser mt-3 inline-flex min-h-[44px] items-center gap-1 text-sm font-semibold text-navy">
              Informasi Publik (tanpa login) →
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-navy text-white">
        <p className="mx-auto w-full max-w-[1200px] px-4 py-3 text-center text-xs text-white/70 sm:px-6">
          Copyright © Kelurahan Tembalang | 2026 — Prototype KMS untuk presentasi &amp; usability testing.
        </p>
      </footer>
    </div>
  );
}
