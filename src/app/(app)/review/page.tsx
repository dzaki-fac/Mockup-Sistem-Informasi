import Link from "next/link";
import { SUBMISSIONS } from "@/lib/data";
import { EventCard, SectionHead, StatusBadge, TypeBadge } from "@/components/AppShell";

export default function ReviewPage() {
  const waiting = SUBMISSIONS.filter((s) => s.status === "Menunggu Review").length;

  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 py-10 sm:px-6">
      <SectionHead title="Review & Approval" />
      <p className="mt-[-8px] max-w-3xl text-[15px] text-black/70">
        Pengelola memeriksa kelengkapan, Pimpinan memberi persetujuan akhir. Hanya knowledge resmi yang menjadi
        acuan bersama (Task 4 usability).
      </p>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <EventCard month="September" year="2026" day={String(waiting)} title={`${waiting} pengajuan menunggu review`} desc="Perlu diperiksa kelengkapan dan kesesuaiannya oleh Pengelola KMS." href="/review/sub-01" />
        <EventCard month="September" year="2026" day="1" title="1 pengajuan perlu revisi" desc="Dikembalikan ke pengusul untuk dilengkapi nomor regulasi acuan." href="/review/sub-03" />
      </div>

      <div className="mt-10">
        <SectionHead title="Daftar Pengajuan" />
        <ul className="grid gap-x-8 gap-y-4 md:grid-cols-2">
          {SUBMISSIONS.map((s) => (
            <li key={s.id} className="border-b border-surface-muted pb-4">
              <div className="flex flex-wrap items-center gap-2">
                <TypeBadge type={s.type} />
                <StatusBadge status={s.status} />
              </div>
              <Link href={`/review/${s.id}`} className="mt-2 block text-[17px] font-semibold leading-snug text-black hover:text-navy hover:underline">
                {s.title}
              </Link>
              <p className="tracking-undip mt-1 text-xs font-medium text-black/50">
                {s.submitter} ({s.role}) • {s.date} • {s.version}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
