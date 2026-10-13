import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BookPreview } from "@/components/home/BookPreview";
import { DateExplorer } from "@/components/home/DateExplorer";
import { FAQ } from "@/components/home/FAQ";
import { FinalCTA } from "@/components/home/FinalCTA";
import { HowItWorks } from "@/components/home/HowItWorks";
import { MemoryComparison } from "@/components/home/MemoryComparison";
import { ProductPurchase } from "@/components/commerce/ProductPurchase";
import { ProductJsonLd } from "@/components/seo/JsonLd";
import { formatPrice, PRODUCT, SHIPPING_EUR, SHIPPING_LABEL } from "@/lib/product";
import { contactEmail } from "@/lib/site";

export const metadata: Metadata = {
  title: "100 nepozabnih trenutkov",
  description:
    "Fizična knjiga za pare s 100 idejami za zmenke, prostorom za fotografije in zapiske. Cena 34,99 €, dostava po Sloveniji.",
  alternates: { canonical: "/100-nepozabnih-trenutkov" },
  openGraph: {
    title: "100 nepozabnih trenutkov",
    description: "Knjiga, ki jo par odpre, doživi in postopoma napolni s svojimi spomini.",
    images: ["/images/book-inside.png"],
  },
};

const inside = [
  "100 idej za zmenke in skupne aktivnosti",
  "Okvir za fotografijo na strani doživetja",
  "Mesto za datum, lokacijo in najlepši trenutek",
  "Zmenke lahko izbereta v poljubnem vrstnem redu",
];

export default function ProductPage() {
  return (
    <>
      <ProductJsonLd />
      <div className="container-wide pt-6 text-sm text-muted">
        <Link href="/" className="hover:text-burgundy">
          Domov
        </Link>
        <span aria-hidden> / </span>
        <span className="text-ink">{PRODUCT.name}</span>
      </div>
      <ProductPurchase titleAs="h1" priority />

      <section className="reveal bg-cream py-12 md:py-16">
        <div className="container-wide grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line bg-[#F3EBE0]">
            <Image
              src="/images/book-inside.png"
              alt="Notranji strani Ljubezen iz gline in Portret ljubezni"
              fill
              sizes="(max-width: 768px) 100vw, 480px"
              className="object-contain"
            />
          </div>
          <div>
            <h2 className="text-[clamp(1.7rem,3vw,2.6rem)] text-ink">Kaj je v knjigi?</h2>
            <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted md:text-base">
              {inside.map((item) => (
                <li key={item} className="border-b border-line pb-2">
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Na fotografijah notranjosti sta strani 55 in 56, Kreativni trenutki: Ljubezen iz
              gline in Portret ljubezni. Mere, gramatura in število listov v projektu niso
              navedeni.
            </p>
          </div>
        </div>
      </section>

      <BookPreview />
      <HowItWorks />
      <DateExplorer />
      <MemoryComparison />

      <section className="reveal bg-ivory py-12 md:py-16">
        <div className="container-wide grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-line bg-white p-6">
            <h2 className="font-serif text-2xl text-ink">Za darilo</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Primerna je za obletnico, rojstni dan ali Valentinovo. V naročilu ni ločenega
              darilnega zavijanja ali posvetila.
            </p>
            <a
              href="#nakup"
              className="mt-4 inline-flex min-h-11 items-center text-sm font-medium text-burgundy underline underline-offset-4"
            >
              Podari knjigo
            </a>
          </div>
          <div className="rounded-2xl border border-line bg-white p-6">
            <h2 className="font-serif text-2xl text-ink">Dostava in plačilo</h2>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted">
              <li>
                {SHIPPING_LABEL}: {formatPrice(SHIPPING_EUR)}
              </li>
              <li>Visa, Mastercard, American Express ali PayPal prek Stripe</li>
              <li>Rok dostave in pogoji vračila niso objavljeni</li>
              <li>
                Vprašanja:{" "}
                <Link className="underline underline-offset-4" href="/kontakt">
                  kontakt
                </Link>{" "}
                ali{" "}
                <a className="underline underline-offset-4" href={`mailto:${contactEmail}`}>
                  {contactEmail}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <FAQ />
      <FinalCTA />
    </>
  );
}
