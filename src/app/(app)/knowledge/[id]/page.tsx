import Link from "next/link";
import { notFound } from "next/navigation";
import { HISTORY, KNOWLEDGE, getKnowledge } from "@/lib/data";
import { SectionHead, StatusBadge, TypeBadge, VersionPill } from "@/components/AppShell";
import KnowledgeCard from "@/components/KnowledgeCard";

export function generateStaticParams() {
  return KNOWLEDGE.map((k) => ({ id: k.id }));
}

export default async function KnowledgeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = getKnowledge(id);
  if (!item) notFound();

  const history = HISTORY.filter((h) => h.knowledgeId === item.id);
  const related = KNOWLEDGE.filter((k) => k.id !== item.id && k.type === item.type).slice(0, 2);

  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 py-10 sm:px-6">
      <Link href="/knowledge" className="tombol-geser inline-flex min-h-[44px] items-center gap-1 text-sm font-semibold text-navy">
        ← Knowledge Center
      </Link>

      <div className="mt-4 overflow-hidden rounded-[5px] bg-navy text-white">
        <div className="bg-black/45 px-5 py-8 sm:px-8">
          <p>
            <span className="tracking-undip inline-block rounded-[3px] bg-white-20 px-2 py-1 text-xs font-medium">
              {item.type}
            </span>
          </p>
          <h1 className="mt-3 max-w-3xl text-3xl font-bold leading-tight sm:text-4xl">{item.title}</h1>
          <p className="mt-3 max-w-2xl text-sm text-white/80 sm:text-[15px]">{item.description}</p>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="tracking-undip rounded-[3px] bg-white px-2 py-1 text-xs font-semibold text-navy">{item.status}</span>
            <span className="tracking-undip text-xs font-medium text-white/75">v{item.version}</span>
            {item.docNumber && (
              <span className="tracking-undip text-xs font-medium text-white/75">{item.docNumber}</span>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-3">
        <article className="lg:col-span-2">
          <SectionHead title="Isi Knowledge" />
          <div className="flex flex-wrap items-center gap-2">
            <TypeBadge type={item.type} />
            <StatusBadge status={item.status} />
            <VersionPill version={item.version} />
          </div>
          <ol className="mt-4 list-decimal space-y-3 pl-6 text-[15px] leading-relaxed">
            {item.content.map((c, i) => (
              <li key={i} className="border-b border-surface-muted pb-3 last:border-0">{c}</li>
            ))}
          </ol>
          <p className="mt-4 rounded-[5px] bg-surface-muted/40 p-4 text-sm text-black/75">
            <strong className="text-black">Keterkaitan knowledge gap:</strong> {item.gap}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button className="inline-flex min-h-[44px] items-center rounded-[5px] bg-navy px-5 text-sm font-semibold text-white">
              Unduh Dokumen (dummy)
            </button>
            <Link href="/ajukan" className="tombol-geser inline-flex min-h-[44px] items-center gap-1 rounded-[5px] border border-navy/30 px-5 text-sm font-semibold">
              Usulkan Perubahan →
            </Link>
            <Link href={`/asisten?dokumen=${item.id}`} className="inline-flex min-h-[44px] items-center rounded-[5px] bg-navy px-5 text-sm font-semibold text-white transition-opacity hover:opacity-90">
              Tanyakan ke AI
            </Link>
          </div>

          <div className="mt-10">
            <SectionHead title="Riwayat Perubahan" moreHref="/riwayat" moreLabel="Lihat Semua" />
            {history.length === 0 ? (
              <p className="text-sm text-black/60">Belum ada riwayat versi untuk dokumen ini.</p>
            ) : (
              <div className="overflow-x-auto rounded-[5px] ring-1 ring-black/10">
                <table className="w-full bg-white text-left text-sm">
                  <thead>
                    <tr className="bg-surface-muted/50 text-left">
                      <th scope="col" className="tracking-undip px-4 py-2 text-xs font-semibold uppercase">Versi</th>
                      <th scope="col" className="tracking-undip px-4 py-2 text-xs font-semibold uppercase">Perubahan</th>
                      <th scope="col" className="tracking-undip px-4 py-2 text-xs font-semibold uppercase">Oleh</th>
                      <th scope="col" className="tracking-undip px-4 py-2 text-xs font-semibold uppercase">Tanggal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.map((h) => (
                      <tr key={h.id} className="border-t border-surface-muted">
                        <td className="px-4 py-2.5 font-semibold">v{h.version}</td>
                        <td className="px-4 py-2.5">{h.change}</td>
                        <td className="px-4 py-2.5 text-black/70">{h.by}</td>
                        <td className="px-4 py-2.5 text-black/70">{h.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </article>

        <aside className="space-y-6">
          <div className="rounded-[5px] bg-surface-muted/40 p-5">
            <h2 className="tracking-undip text-sm font-semibold uppercase text-black/60">Data Dokumen</h2>
            <dl className="mt-3 space-y-2 text-sm">
              {[
                ["Sumber", item.source],
                ["Pemilik", item.owner],
                ["Status", item.status],
                ["Versi", `v${item.version}`],
                ["Diperbarui", item.updatedAt],
                ["Review berikut", item.reviewDate],
                ["Akses publik", item.isPublic ? "Ya" : "Internal"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-3 border-b border-surface-muted pb-2 last:border-0 last:pb-0">
                  <dt className="text-black/60">{k}</dt>
                  <dd className="text-right font-semibold">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          {related.length > 0 && (
            <div>
              <h2 className="tracking-undip text-sm font-semibold uppercase text-black/60">Terkait</h2>
              <div className="mt-3 grid gap-[35px]">
                {related.map((r) => (
                  <KnowledgeCard key={r.id} item={r} />
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
