import Link from "next/link";
import Image from "next/image";
import type { Knowledge } from "@/lib/data";
import { StatusBadge, TypeBadge } from "@/components/AppShell";

function excerpt(text: string, words = 15): string {
  const parts = text.split(" ");
  return parts.length > words ? parts.slice(0, words).join(" ") + "…" : text;
}

/* Kartu berita: thumbnail → badge → judul → excerpt → tanggal */
export default function KnowledgeCard({ item }: { item: Knowledge }) {
  return (
    <Link
      href={`/knowledge/${item.id}`}
      className="hover-angkat block overflow-hidden rounded-[5px] bg-white shadow-[0_1px_6px_rgba(0,0,0,0.12)] ring-1 ring-black/5"
    >
      <div className="relative flex min-h-[140px] items-end p-4">
        <Image
          src="/foto-gedung.jpg"
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/55" aria-hidden />
        <div className="relative">
          <p className="tracking-undip text-xs font-medium text-white/70">{item.type}</p>
          <p className="tracking-undip mt-1 text-2xl font-semibold text-white">
            {item.docNumber ?? `v${item.version}`}
          </p>
        </div>
        <span className="tracking-undip relative ml-auto text-xs font-medium text-white/70">{item.updatedAt}</span>
      </div>
      <div className="p-4">
        <div className="flex flex-wrap items-center gap-2">
          <TypeBadge type={item.type} />
          <StatusBadge status={item.status} />
        </div>
        <h3 className="mt-2 text-lg font-semibold leading-snug text-black">{item.title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-black/70">{excerpt(item.description)}</p>
        <p className="tracking-undip mt-3 text-xs font-medium text-black/50">
          {item.updatedAt} • Versi {item.version}
        </p>
      </div>
    </Link>
  );
}
