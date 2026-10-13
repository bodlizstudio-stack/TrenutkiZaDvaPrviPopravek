"use client";

import { useState } from "react";
import Image from "next/image";
import { dateExamples } from "@/lib/content";
import { cn } from "@/lib/utils";

export function DateExplorer() {
  const [active, setActive] = useState<(typeof dateExamples)[number]["id"]>(
    dateExamples[1].id
  );
  const current = dateExamples.find((item) => item.id === active) ?? dateExamples[1];

  return (
    <section className="bg-ivory py-14 md:py-20" aria-labelledby="zmenek-naslov">
      <div className="container-wide">
        <h2 id="zmenek-naslov" className="rise text-[clamp(1.75rem,4vw,3rem)] text-ink md:text-center">
          Kakšen zmenek bi izbrala danes?
        </h2>
        <div
          className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap"
          role="tablist"
          aria-label="Vrsta zmenka"
        >
          {dateExamples.map((item) => {
            const selected = item.id === current.id;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                id={`tab-${item.id}`}
                aria-selected={selected}
                aria-controls="zmenek-kartica"
                onClick={() => setActive(item.id)}
                className={cn(
                  "min-h-11 rounded-full px-4 text-sm font-medium transition-transform duration-200 active:scale-[0.98]",
                  selected ? "bg-burgundy text-ivory" : "bg-cream text-ink hover:bg-white"
                )}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <article
          key={current.id}
          id="zmenek-kartica"
          role="tabpanel"
          aria-labelledby={`tab-${current.id}`}
          className="swap-in mt-4 overflow-hidden rounded-2xl border border-line bg-white shadow-soft md:grid md:grid-cols-2"
        >
          <div className="relative aspect-[4/3] bg-[#F3EBE0]">
            <Image
              key={current.image}
              src={current.image}
              alt={current.alt}
              fill
              sizes="(max-width: 768px) 100vw, 480px"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center p-5 md:p-8">
            <p className="text-xs font-semibold tracking-wide text-burgundy uppercase">
              {current.badge}
            </p>
            <h3 className="mt-2 font-serif text-3xl text-ink">{current.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">{current.text}</p>
            <a href="#predogled" className="mt-5 inline-flex min-h-11 items-center text-sm font-medium text-burgundy underline underline-offset-4">
              Prelistaj knjigo
            </a>
          </div>
        </article>
      </div>
    </section>
  );
}
