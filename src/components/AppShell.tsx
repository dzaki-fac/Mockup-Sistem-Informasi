"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { NOTIFICATIONS } from "@/lib/data";

export type Role = "petugas" | "pengelola" | "pimpinan";

const ROLE_LABEL: Record<Role, string> = {
  petugas: "Petugas Pelayanan",
  pengelola: "Pengelola KMS",
  pimpinan: "Pimpinan / Approver",
};

const MENU: { href: string; label: string; roles: Role[] }[] = [
  { href: "/dashboard", label: "Beranda", roles: ["petugas", "pengelola", "pimpinan"] },
  { href: "/knowledge", label: "Knowledge Center", roles: ["petugas", "pengelola", "pimpinan"] },
  { href: "/ajukan", label: "Ajukan Knowledge", roles: ["petugas", "pengelola"] },
  { href: "/review", label: "Review & Approval", roles: ["pengelola", "pimpinan"] },
  { href: "/riwayat", label: "Riwayat", roles: ["petugas", "pengelola", "pimpinan"] },
  { href: "/", label: "Informasi Publik", roles: ["petugas", "pengelola", "pimpinan"] },
];

function getInitialRole(): Role {
  if (typeof window === "undefined") return "petugas";
  const saved = window.localStorage.getItem("kms-role");
  if (saved === "pengelola" || saved === "pimpinan" || saved === "petugas") return saved;
  return "petugas";
}

/* Badge kategori kecil di atas judul — bukan pewarna kartu */
export function StatusBadge({ status }: { status: string }) {
  const aktif = status === "Aktif" || status === "Disetujui";
  return (
    <span
      className={`tracking-undip inline-flex min-h-[28px] items-center rounded-[3px] px-2 py-0.5 text-xs font-medium ${
        aktif ? "bg-navy text-white" : "border border-navy bg-white text-black"
      }`}
    >
      {status}
    </span>
  );
}

export function TypeBadge({ type }: { type: string }) {
  return (
    <span className="tracking-undip inline-flex min-h-[28px] items-center rounded-[3px] bg-surface-muted px-2 py-0.5 text-xs font-medium text-black">
      {type}
    </span>
  );
}

export function VersionPill({ version }: { version: string }) {
  return (
    <span className="tracking-undip inline-flex min-h-[28px] items-center px-1 text-xs font-medium text-black/60">
      v{version}
    </span>
  );
}

/* Pola section: H2 + divider + tombol lihat semua */
export function SectionHead({
  title,
  moreHref,
  moreLabel,
}: {
  title: string;
  moreHref?: string;
  moreLabel?: string;
}) {
  return (
    <div className="mb-6">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <h2 className="text-2xl font-bold tracking-tight text-black sm:text-[28px]">{title}</h2>
        {moreHref && (
          <Link
            href={moreHref}
            className="tombol-geser inline-flex min-h-[44px] items-center gap-1 text-sm font-semibold text-navy"
          >
            {moreLabel ?? "Lihat Semua"} <span aria-hidden>→</span>
          </Link>
        )}
      </div>
      <hr className="mt-3 border-t-2 border-navy" />
    </div>
  );
}

/* Kartu event: blok tanggal navy/abu 20% + judul 80% */
export function EventCard({
  month,
  year,
  day,
  title,
  desc,
  href,
}: {
  month: string;
  year: string;
  day: string;
  title: string;
  desc: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="hover-angkat flex gap-5 rounded-[5px] bg-white p-4 shadow-[0_1px_6px_rgba(0,0,0,0.12)] ring-1 ring-black/5 sm:gap-[20px]"
    >
      <div className="w-[20%] min-w-[72px] shrink-0">
        <p className="event-month">
          {month}, {year}
        </p>
        <p className="event-day">{day}</p>
      </div>
      <div className="min-w-0 flex-1">
        <p className="event-title text-black">{title}</p>
        <p className="mt-2 line-clamp-2 text-sm text-black/70">{desc}</p>
      </div>
    </Link>
  );
}

/* Ubin tautan cepat: ikon di atas, judul rata tengah */
export function TileGrid({ tiles }: { tiles: { label: string; href: string; icon: string }[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {tiles.map((t) => (
        <Link
          key={t.label}
          href={t.href}
          className="hover-angkat flex min-h-[120px] flex-col items-center justify-center gap-2 rounded-[5px] bg-white p-4 text-center shadow-[0_1px_6px_rgba(0,0,0,0.12)] ring-1 ring-black/5"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-[5px] bg-navy text-lg font-semibold text-white" aria-hidden>
            {t.icon}
          </span>
          <span className="tracking-undip text-[13px] font-semibold text-black">{t.label}</span>
        </Link>
      ))}
    </div>
  );
}

function IkonCari() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.6" />
      <path d="m12.5 12.5 3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [role, setRole] = useState<Role>(getInitialRole);
  const [showNotif, setShowNotif] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  /* Tutup popup profil saat klik di luar / tekan Escape */
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setShowNotif(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowNotif(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const changeRole = (r: Role) => {
    setRole(r);
    try {
      window.localStorage.setItem("kms-role", r);
    } catch {
      /* abaikan bila penyimpanan diblokir */
    }
    if (r === "petugas" && pathname === "/review") router.push("/dashboard");
    if (r === "pimpinan" && pathname === "/ajukan") router.push("/dashboard");
  };

  const visibleMenu = MENU.filter((m) => m.roles.includes(role));
  const unread = NOTIFICATIONS.filter((n) => n.unread).length;

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-black">
      <a href="#konten" className="sr-only focus:not-sr-only focus:bg-navy focus px-4 py-2 text-white">
        Lewati ke konten
      </a>

      {/* Bar utama: logo — menu — cari */}
      <header className="sticky top-0 z-40 bg-navy text-white">
        <div className="mx-auto flex w-full max-w-[1200px] items-center gap-4 px-4 py-3 sm:px-6">
          <Link href="/dashboard" className="flex shrink-0 items-center" aria-label="KMS Tembalang — Beranda">
            <span className="leading-tight">
              <span className="tracking-undip block text-base font-semibold">KMS TEMBALANG</span>
              <span className="block text-xs text-white/75">Kelurahan Tembalang, Kota Semarang</span>
            </span>
          </Link>

          <nav className="mx-auto hidden items-center lg:flex" aria-label="Navigasi utama">
            {visibleMenu.map((m) => {
              const active =
                pathname === m.href ||
                (m.href !== "/dashboard" && m.href !== "/" && pathname?.startsWith(m.href));
              return (
                <Link
                  key={m.href}
                  href={m.href}
                  aria-current={active ? "page" : undefined}
                  className={`tracking-undip flex min-h-[44px] items-center px-4 text-sm font-medium transition-opacity hover:opacity-75 ${
                    active ? "underline decoration-2 underline-offset-8" : ""
                  }`}
                >
                  {m.label}
                </Link>
              );
            })}
          </nav>

          <div className="ml-auto flex shrink-0 items-center gap-2 lg:ml-0">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Buka pencarian"
              aria-expanded={searchOpen}
              className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-[5px] transition-colors hover:bg-white-20"
            >
              <IkonCari />
            </button>
            <Link
              href="/ajukan"
              className="tracking-undip hidden min-h-[44px] items-center rounded-[5px] bg-white-20 px-3 py-[5px] text-sm font-medium transition-colors hover:bg-white hover:text-navy sm:inline-flex"
            >
              + Ajukan
            </Link>
            <div className="relative" ref={profileRef}>
              <button
                type="button"
                onClick={() => setShowNotif(!showNotif)}
                aria-label={`Profil ${ROLE_LABEL[role]}, ${unread} notifikasi belum dibaca`}
                aria-expanded={showNotif}
                aria-haspopup="menu"
                className="flex min-h-[44px] items-center gap-2 rounded-[5px] py-1 pl-1 pr-2 transition-colors hover:bg-white-20"
              >
                <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white text-base font-bold text-navy" aria-hidden>
                  {ROLE_LABEL[role].charAt(0)}
                  {unread > 0 && (
                    <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-white px-1 text-[10px] font-bold text-navy ring-2 ring-navy">
                      {unread}
                    </span>
                  )}
                </span>
                <span className="tracking-undip hidden text-left text-sm font-medium leading-tight md:block">
                  {ROLE_LABEL[role]}
                </span>
              </button>
              {showNotif && (
                <div role="menu" className="absolute right-0 z-50 mt-2 w-[min(20rem,calc(100vw-2rem))] overflow-hidden rounded-[5px] bg-white text-black shadow-lg ring-1 ring-black/10">
                  <div className="flex items-center gap-3 border-b border-surface-muted bg-surface-muted/40 px-4 py-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy text-lg font-bold text-white" aria-hidden>
                      {ROLE_LABEL[role].charAt(0)}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">{ROLE_LABEL[role]}</p>
                      <p className="text-xs text-black/50">Kelurahan Tembalang (akun dummy)</p>
                    </div>
                  </div>
                  <p className="tracking-undip border-b border-surface-muted px-4 py-2 text-xs font-semibold uppercase text-black/50">
                    Notifikasi ({unread} baru)
                  </p>
                  {NOTIFICATIONS.map((n) => (
                    <div key={n.id} className="border-b border-surface-muted px-4 py-3 last:border-0">
                      <p className="text-sm font-semibold">{n.title}</p>
                      <p className="mt-1 text-[13px] text-black/70">{n.desc}</p>
                      <p className="mt-1 text-xs text-black/50">{n.time}</p>
                    </div>
                  ))}
                  <Link
                    href="/review"
                    onClick={() => setShowNotif(false)}
                    className="block border-b border-surface-muted px-4 py-3 text-center text-sm font-semibold text-navy hover:underline"
                  >
                    Buka Review &amp; Approval →
                  </Link>
                  <div className="px-4 py-3">
                    <p id="role-menu-label" className="tracking-undip text-xs font-semibold uppercase text-black/50">
                      Peran demo
                    </p>
                    <div className="mt-2 grid gap-1" role="group" aria-labelledby="role-menu-label">
                      {(Object.keys(ROLE_LABEL) as Role[]).map((r) => (
                        <button
                          key={r}
                          onClick={() => changeRole(r)}
                          aria-pressed={role === r}
                          className={`flex min-h-[44px] items-center rounded-[5px] px-3 text-left text-sm font-medium transition-colors ${
                            role === r ? "bg-navy text-white" : "hover:bg-surface-muted/50"
                          }`}
                        >
                          {ROLE_LABEL[r]}
                          {role === r && <span aria-hidden className="ml-auto">✓</span>}
                        </button>
                      ))}
                    </div>
                  </div>
                  <Link
                    href="/login"
                    className="block bg-navy px-4 py-3 text-center text-sm font-semibold text-white"
                  >
                    Keluar
                  </Link>
                </div>
              )}
            </div>
            <button
              className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-[5px] hover:bg-white-20 lg:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu Toggle"
              aria-expanded={mobileOpen}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                <path d="M2 5h16M2 10h16M2 15h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Bar cari (JetSearch) */}
        {searchOpen && (
          <div className="border-t border-white/15">
            <form action="/search" method="get" role="search" className="mx-auto flex w-full max-w-[1200px] gap-2 px-4 py-3 sm:px-6">
              <label htmlFor="nav-q" className="sr-only">Cari knowledge (minimal 2 karakter)</label>
              <input
                id="nav-q"
                name="q"
                minLength={2}
                placeholder="Cari ..."
                className="min-h-[44px] w-full rounded-[5px] border border-white/30 bg-white px-4 text-sm text-black outline-none placeholder:text-black/40"
              />
              <button type="submit" className="min-h-[44px] shrink-0 rounded-[5px] bg-white px-5 text-sm font-semibold text-navy">
                Cari
              </button>
            </form>
          </div>
        )}

        {mobileOpen && (
          <nav className="border-t border-white/15 px-4 py-2 lg:hidden" aria-label="Navigasi seluler">
            {visibleMenu.map((m) => (
              <Link
                key={m.href}
                href={m.href}
                onClick={() => setMobileOpen(false)}
                className={`tracking-undip flex min-h-[44px] items-center rounded-[5px] px-3 text-sm font-medium ${
                  pathname === m.href ? "bg-white text-navy" : "hover:bg-white-20"
                }`}
              >
                {m.label}
              </Link>
            ))}
            <div className="flex items-center gap-2 py-2">
              <label htmlFor="role-m" className="text-xs font-medium">Peran:</label>
              <select
                id="role-m"
                value={role}
                onChange={(e) => changeRole(e.target.value as Role)}
                className="min-h-[44px] flex-1 rounded-[5px] bg-white-20 px-2 text-sm font-medium [&>option]:text-black"
              >
                {(Object.keys(ROLE_LABEL) as Role[]).map((r) => (
                  <option key={r} value={r}>{ROLE_LABEL[r]}</option>
                ))}
              </select>
              <Link href="/login" className="flex min-h-[44px] items-center rounded-[5px] bg-white px-4 text-sm font-semibold text-navy">
                Keluar
              </Link>
            </div>
          </nav>
        )}
      </header>

      <main id="konten" className="flex-1">{children}</main>

      {/* Footer 3 kolom + bar copyright */}
      <footer className="bg-navy text-white">
        <div className="mx-auto grid w-full max-w-[1200px] gap-8 px-4 py-10 sm:px-6 md:grid-cols-3">
          <div>
            <p className="tracking-undip text-sm font-semibold uppercase">Media Sosial</p>
            <div className="mt-3 flex gap-2" aria-label="Media sosial (dummy)">
              {["f", "▶", "𝕏", "◎", "♪", "in"].map((s) => (
                <span key={s} className="flex h-9 w-9 items-center justify-center rounded-full border border-white/40 text-xs font-semibold" aria-hidden>
                  {s}
                </span>
              ))}
            </div>
            <p className="mt-3 text-[13px] text-white/70">Akun resmi (tautan dummy untuk prototype).</p>
          </div>
          <div>
            <p className="tracking-undip text-sm font-semibold uppercase">Kontak</p>
            <ul className="mt-3 space-y-2 text-[13px] text-white/85">
              <li>⌖ Jl. Sirojudin No. 1, Tembalang, Kota Semarang (alamat dummy)</li>
              <li>✆ (024) 000-0000 (nomor dummy)</li>
              <li>✉ info@tembalang-dummy.id (email dummy)</li>
            </ul>
          </div>
          <div>
            <p className="tracking-undip text-sm font-semibold uppercase">Jam Layanan</p>
            <ul className="mt-3 space-y-2 text-[13px] text-white/85">
              <li>Senin–Kamis: 07.30–16.00 WIB (istirahat 12.00–13.00)</li>
              <li>Jumat: 07.30–16.30 WIB (istirahat 11.30–13.00)</li>
              <li className="text-white/60">(jadwal dummy)</li>
            </ul>
          </div>
        </div>
        <div className="bg-navy-deep">
          <p className="mx-auto w-full max-w-[1200px] px-4 py-3 text-center text-xs text-white/70 sm:px-6">
            Copyright © Kelurahan Tembalang | 2026 — Prototype KMS, seluruh data dummy.
          </p>
        </div>
      </footer>
    </div>
  );
}
