"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const states = [
  {
    id: "before",
    label: "Na začetku",
    src: "/images/book-inside.png",
    alt: "Prazni strani knjige s prostorom za fotografijo in zapis",
    width: 1024,
    height: 768,
  },
  {
    id: "after",
    label: "Ko postane vajina",
    src: "/images/book-photo-5.jpg",
    alt: "Ilustracija izpolnjenih strani. Fotografiji v okvirjih nista oddaji strank.",
    width: 1024,
    height: 764,
  },
] as const;

export function MemoryComparison() {
  const [active, setActive] = useState<(typeof states)[number]["id"]>("before");
  const current = states.find((state) => state.id === active) ?? states[0];

  return (
    <section className="bg-cream py-14 md:py-20">
      <div className="container-wide">
        <h2 className="rise max-w-3xl text-[clamp(1.75rem,4vw,3rem)] text-ink md:mx-auto md:text-center">
          Na začetku knjiga. Čez čas vajina najlepša zgodba.
        </h2>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted md:mx-auto md:text-center md:text-base">
          Vsak zmenek doda novo poglavje. Fotografije, zapiski in majhne zgodbe počasi ustvarijo
          nekaj, kar je samo vajino.
        </p>

        <div className="mt-5 flex gap-2 md:hidden" role="tablist" aria-label="Stanje strani">
          {states.map((state) => (
            <button
              key={state.id}
              type="button"
              role="tab"
              aria-selected={active === state.id}
              onClick={() => setActive(state.id)}
              className={cn(
                "min-h-11 flex-1 rounded-full px-3 text-sm font-medium",
                active === state.id ? "bg-burgundy text-ivory" : "bg-white text-ink"
              )}
            >
              {state.label}
            </button>
          ))}
        </div>

        <div className="mt-4 md:hidden">
          <figure key={current.id} className="swap-in overflow-hidden rounded-2xl border border-line bg-[#F3EBE0]">
            <div className="relative aspect-[4/3]">
              <Image
                key={current.src}
                src={current.src}
                alt={current.alt}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>
            <figcaption className="px-4 py-3 text-sm text-muted">{current.label}</figcaption>
          </figure>
        </div>

        <div className="mt-8 hidden gap-6 md:grid md:grid-cols-2">
          {states.map((state) => (
            <figure key={state.id} className="hover-lift overflow-hidden rounded-2xl border border-line bg-[#F3EBE0]">
              <div className="relative aspect-[4/3]">
                <Image
                  src={state.src}
                  alt={state.alt}
                  width={state.width}
                  height={state.height}
                  className="h-full w-full object-contain"
                  sizes="480px"
                />
              </div>
              <figcaption className="bg-ivory px-4 py-3 text-sm font-medium text-ink">
                {state.label}
              </figcaption>
            </figure>
          ))}
        </div>

        <p className="mt-4 text-xs leading-relaxed text-muted md:text-center">
          Desni prikaz je ilustracija izpolnjene strani. Fotografiji v okvirjih nista oddaji
          strank, obrabljen rob papirja pa ni opis končne dodelave knjige.
        </p>
      </div>
    </section>
  );
}
