"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import type { Knowledge } from "@/lib/data";

function Chevron({ dir }: { dir: "prev" | "next" }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      {dir === "prev" ? (
        <path d="M12.5 4 7 10l5.5 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <path d="M7.5 4 13 10l-5.5 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      )}
    </svg>
  );
}

/* Hero slideshow: fade, 16:6, min 400px, tanpa autoplay */
export default function HeroSlider({ slides }: { slides: Knowledge[] }) {
  const [idx, setIdx] = useState(0);
  const slide = slides[idx];

  const go = (d: 1 | -1) => setIdx((i) => (i + d + slides.length) % slides.length);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Sorotan knowledge"
      className="relative overflow-hidden bg-navy text-white"
    >
      <div className="relative mx-auto w-full max-w-[1200px]">
        <div className="relative flex min-h-[320px] items-end py-10 sm:aspect-[16/6] sm:min-h-[400px] sm:py-0">
          {/* Foto latar gedung + overlay gelap */}
          <Image
            src="/foto-gedung.jpg"
            alt=""
            fill
            sizes="100vw"
            className="z-0 object-cover"
            priority
          />
          <div className="pointer-events-none absolute inset-0 z-[1] bg-black/55" aria-hidden />
          <div
            key={slide.id}
            className="relative z-10 w-full px-4 pb-24 pt-4 sm:px-6 sm:pb-20 sm:pt-10"
            aria-roledescription="slide"
            aria-label={`${idx + 1} dari ${slides.length}: ${slide.title}`}
          >
            <p>
              <span className="tracking-undip inline-block rounded-[3px] bg-white-20 px-2 py-1 text-xs font-medium">
                {slide.type}
              </span>
            </p>
            <h1 className="mt-3 max-w-3xl text-2xl font-bold leading-tight sm:text-4xl lg:text-[44px] lg:leading-[1.15]">
              <span className="opacity-80">{slide.title.split(" ").slice(0, 1).join(" ")} </span>
              <Link href={`/knowledge/${slide.id}`} className="hover:underline">
                {slide.title.split(" ").slice(1).join(" ")}
              </Link>
            </h1>
            <p className="mt-3 line-clamp-3 max-w-2xl text-sm text-white/80 sm:line-clamp-none sm:text-[15px]">
              {slide.description} — Versi {slide.version}, diperbarui {slide.updatedAt}.
            </p>
          </div>
        </div>

        <div className="absolute bottom-5 right-4 z-20 flex items-center gap-2 sm:right-6">
          <span className="tracking-undip mr-1 text-xs font-medium text-white/70" aria-hidden>
            {idx + 1} / {slides.length}
          </span>
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Slide sebelumnya"
            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/40 transition-colors hover:bg-white hover:text-navy"
          >
            <Chevron dir="prev" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Slide berikutnya"
            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/40 transition-colors hover:bg-white hover:text-navy"
          >
            <Chevron dir="next" />
          </button>
        </div>
      </div>
    </section>
  );
}
