import type { ReactNode } from "react";

type InfoPageProps = {
  title: string;
  lede: string;
  children: ReactNode;
};

export function InfoPage({ title, lede, children }: InfoPageProps) {
  return (
    <article className="container-wide max-w-3xl py-10 md:py-16">
      <h1 className="text-[clamp(2rem,5vw,3.25rem)] text-ink">{title}</h1>
      <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">{lede}</p>
      <div className="mt-8 space-y-4 text-[15px] leading-relaxed text-muted">{children}</div>
    </article>
  );
}

export function LegalNotice() {
  return (
    <p className="rounded-2xl border border-line bg-white px-4 py-3 text-sm leading-relaxed text-ink">
      To ni popoln pravni dokument. V projektu manjkajo podatki o podjetju, naslovu in davčni
      številki. Spodaj so samo dejstva o tem, kako stran deluje. Pred objavo jih mora dopolniti
      lastnik trgovine.
    </p>
  );
}
