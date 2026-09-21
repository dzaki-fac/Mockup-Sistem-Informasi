"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { getKnowledge } from "@/lib/data";
import {
  SUGGESTED_QUESTIONS,
  answerQuestion,
  exampleConversation,
  summarizeDoc,
  type AssistantAnswer,
} from "@/lib/assistant";
import { SectionHead } from "@/components/AppShell";

interface ChatMsg {
  id: number;
  from: "user" | "ai";
  text: string;
  sources?: AssistantAnswer["sources"];
}

let nextId = 1;
const nid = () => nextId++;

function LoadingDots() {
  return (
    <span className="inline-flex items-center gap-1 py-2" role="status" aria-label="AI sedang mencari informasi">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-2 w-2 animate-bounce rounded-full bg-navy"
          style={{ animationDelay: `${i * 150}ms` }}
          aria-hidden
        />
      ))}
      <span className="ml-2 text-[13px] text-black/60">Mencari di knowledge base…</span>
    </span>
  );
}

function SourceBox({ sources }: { sources: AssistantAnswer["sources"] }) {
  if (sources.length === 0) return null;
  return (
    <div className="mt-3 rounded-[5px] bg-surface-muted/50 p-3">
      <p className="tracking-undip text-xs font-semibold uppercase text-black/60">Sumber Knowledge</p>
      <ul className="mt-2 space-y-1 text-sm">
        {sources.map((s) => (
          <li key={s.id}>
            <p className="font-semibold">{s.title}</p>
            <p className="tracking-undip text-xs font-medium text-black/50">
              Versi {s.version} • Diperbarui: {s.updatedAt} • {s.status}
            </p>
          </li>
        ))}
      </ul>
      {sources[0] && (
        <div className="mt-3 flex flex-wrap gap-2">
          <Link
            href={`/knowledge/${sources[0].id}`}
            className="inline-flex min-h-[44px] items-center rounded-[5px] bg-navy px-4 text-sm font-semibold text-white"
          >
            Lihat Dokumen
          </Link>
          <Link
            href="/knowledge"
            className="tombol-geser inline-flex min-h-[44px] items-center gap-1 rounded-[5px] border border-navy/30 px-4 text-sm font-semibold"
          >
            Buka Knowledge →
          </Link>
        </div>
      )}
    </div>
  );
}

export default function AssistantChat({ docId }: { docId?: string }) {
  const contextDoc = docId ? getKnowledge(docId) : undefined;
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    return () => {
      window.clearTimeout(timerRef.current);
    };
  }, []);

  const ask = (question: string) => {
    const q = question.trim();
    if (!q || loading) return;
    setMessages((m) => [...m, { id: nid(), from: "user", text: q }]);
    setInput("");
    setLoading(true);
    timerRef.current = window.setTimeout(() => {
      const ai =
        contextDoc && /poin penting/i.test(q)
          ? summarizeDoc(contextDoc.id)
          : answerQuestion(q);
      setMessages((m) => [...m, { id: nid(), from: "ai", text: ai.text, sources: ai.sources }]);
      setLoading(false);
    }, 900);
  };

  const loadExample = () => {
    if (loading || messages.length > 0) return;
    const ex = exampleConversation();
    setLoading(true);
    setMessages([{ id: nid(), from: "user", text: ex.user }]);
    timerRef.current = window.setTimeout(() => {
      setMessages((m) => [...m, { id: nid(), from: "ai", text: ex.ai.text, sources: ex.ai.sources }]);
      setLoading(false);
    }, 900);
  };

  const empty = messages.length === 0 && !loading;

  return (
    <div className="mx-auto w-full max-w-[800px] px-4 py-10 sm:px-6">
      <SectionHead title="AI Knowledge Assistant" />
      <p className="mt-[-8px] max-w-2xl text-[15px] text-black/70">
        Tanyakan informasi pelayanan berdasarkan knowledge yang tersedia di KMS. Khusus petugas pelayanan —
        jawaban selalu mencantumkan sumber dokumennya.
      </p>

      {contextDoc && (
        <div className="mt-4 flex flex-col gap-2 rounded-[5px] bg-navy p-4 text-white sm:flex-row sm:items-center">
          <p className="text-sm">
            <span className="tracking-undip text-xs font-medium text-white/70">Membahas dokumen:</span>
            <br />
            <strong className="font-semibold">{contextDoc.title}</strong> (v{contextDoc.version})
          </p>
          <button
            type="button"
            onClick={() => ask(`Apa poin penting dari ${contextDoc.title} ini?`)}
            className="inline-flex min-h-[44px] shrink-0 items-center justify-center rounded-[5px] bg-white px-4 text-sm font-semibold text-navy sm:ml-auto"
          >
            Tanyakan poin penting →
          </button>
        </div>
      )}

      <div
        className="mt-6 rounded-[5px] bg-white p-4 shadow-[0_1px_6px_rgba(0,0,0,0.12)] ring-1 ring-black/5 sm:p-6"
        aria-live="polite"
        aria-label="Percakapan dengan AI Knowledge Assistant"
      >
        {empty && (
          <div className="py-4 text-center">
            <p className="tracking-undip inline-block rounded-[3px] bg-surface-muted px-2 py-1 text-xs font-medium">
              Belum ada percakapan
            </p>
            <p className="mx-auto mt-3 max-w-md text-sm text-black/60">
              Mulai dengan salah satu pertanyaan contoh, atau lihat contoh percakapan terlebih dahulu.
            </p>
            <button
              type="button"
              onClick={loadExample}
              className="tombol-geser mt-3 inline-flex min-h-[44px] items-center gap-1 rounded-[5px] border border-navy/30 px-5 text-sm font-semibold"
            >
              Lihat contoh percakapan →
            </button>
          </div>
        )}

        <div className="space-y-4">
          {messages.map((m) =>
            m.from === "user" ? (
              <div key={m.id} className="flex justify-end">
                <p className="max-w-[85%] rounded-[5px] rounded-br-none bg-navy px-4 py-3 text-[15px] text-white">
                  {m.text}
                </p>
              </div>
            ) : (
              <div key={m.id} className="flex justify-start">
                <div className="max-w-[90%] rounded-[5px] rounded-bl-none border border-navy/20 bg-white px-4 py-3">
                  <p className="tracking-undip text-xs font-semibold uppercase text-black/50">AI Assistant</p>
                  <p className="mt-1 text-[15px] leading-relaxed">{m.text}</p>
                  {m.sources && <SourceBox sources={m.sources} />}
                </div>
              </div>
            )
          )}
          {loading && (
            <div className="flex justify-start">
              <div className="rounded-[5px] rounded-bl-none border border-navy/20 px-4">
                <LoadingDots />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {!empty && (
          <div className="mt-6 border-t border-surface-muted pt-4">
            <p className="tracking-undip text-xs font-semibold uppercase text-black/50">Coba tanyakan juga</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {SUGGESTED_QUESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => ask(s)}
                  disabled={loading}
                  className="min-h-[44px] rounded-[5px] border border-navy/25 bg-white px-3 text-left text-[13px] font-medium transition-colors hover:border-navy disabled:opacity-50"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {empty && (
        <div className="mt-4">
          <p className="tracking-undip text-xs font-semibold uppercase text-black/50">Pertanyaan contoh</p>
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            {SUGGESTED_QUESTIONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => ask(s)}
                className="min-h-[44px] rounded-[5px] border border-navy/25 bg-white px-4 text-left text-sm font-medium transition-colors hover:border-navy"
              >
                “{s}”
              </button>
            ))}
          </div>
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          ask(input);
        }}
        className="sticky bottom-4 mt-4 flex gap-2 rounded-[5px] bg-white p-2 shadow-[0_1px_6px_rgba(0,0,0,0.15)] ring-1 ring-black/10"
      >
        <label htmlFor="asisten-q" className="sr-only">Tanyakan tentang SOP, persyaratan, prosedur, atau regulasi</label>
        <input
          id="asisten-q"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Tanyakan tentang SOP, persyaratan, prosedur, atau regulasi..."
          autoComplete="off"
          className="min-h-[44px] w-full rounded-[5px] px-3 text-[15px] text-black outline-none placeholder:text-black/40"
        />
        <button
          type="submit"
          disabled={loading || input.trim().length === 0}
          className="min-h-[44px] shrink-0 rounded-[5px] bg-navy px-6 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-40"
        >
          {loading ? "…" : "Kirim"}
        </button>
      </form>
      <p className="mt-2 text-center text-xs text-black/50">
        Asisten dummy untuk prototype — jawaban disusun dari knowledge KMS, bukan AI sungguhan.
      </p>
    </div>
  );
}
