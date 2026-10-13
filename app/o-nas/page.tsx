import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "O nas",
  description:
    "Trenutki za dva ustvarjajo premišljene izdelke, ki paroma pomagajo nameniti čas drug drugemu in shraniti skupne spomine.",
  alternates: { canonical: "/o-nas" },
};

export default function AboutPage() {
  return (
    <article className="reveal bg-ivory">
      <div className="container-wide grid items-center gap-8 py-10 md:grid-cols-2 md:py-16">
        <div>
          <p className="eyebrow">O nas</p>
          <h1 className="mt-3 text-[clamp(2rem,5vw,3.6rem)] text-ink">
            Za trenutke, ki jih vsakdan prehitro pozabi.
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
            Trenutki za dva so nastali iz preproste ideje: za lep odnos niso vedno potrebne
            velike geste. Pogosto največ pomenijo majhni trenutki, ko si zavestno vzamemo čas
            drug za drugega.
          </p>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line bg-[#F3EBE0]">
          <Image
            src="/images/book-photo-8.jpg"
            alt="Knjiga Trenutki za dva na mizi ob kavi"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 520px"
            className="object-cover"
          />
        </div>
      </div>

      <section className="reveal bg-cream py-12 md:py-16">
        <div className="container-wide grid gap-8 md:grid-cols-[1fr_0.8fr] md:items-start">
          <div className="max-w-xl space-y-4 text-[15px] leading-relaxed text-muted md:text-base">
            <h2 className="font-serif text-3xl text-ink">Zakaj skupni čas</h2>
            <p>
              V svetu, kjer nenehno hitimo, hitro pozabimo na resnično bližino. Knjiga obstaja
              zato, da paru ni treba vedno znova iskati idej, kaj bi počela.
            </p>
            <p>
              Poslanstvo je ustvarjati premišljene izdelke, ki vabijo k novim doživetjem,
              pogovorom in spominom, ki ostanejo zabeleženi.
            </p>
          </div>
          <ul className="space-y-3 rounded-2xl border border-line bg-white p-6 text-ink">
            <li>Nova doživetja, ki razbijejo rutino.</li>
            <li>Pogovori namesto površnega klepeta.</li>
            <li>Skupni rituali in iskrena bližina.</li>
            <li>Spomini, ki ostanejo v knjigi.</li>
          </ul>
        </div>
      </section>

      <section className="reveal bg-ivory py-12 md:py-16">
        <div className="container-wide max-w-3xl">
          <blockquote className="font-serif text-[clamp(1.6rem,3vw,2.4rem)] leading-snug text-ink">
            »Naš cilj ni napolniti polic. Naš cilj je napolniti vajino zgodbo.«
          </blockquote>
          <Button asChild className="mt-8" size="lg">
            <Link href="/100-nepozabnih-trenutkov">Poglejta knjigo</Link>
          </Button>
        </div>
      </section>
    </article>
  );
}
