import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import { BookTilt } from "@/components/motion/BookTilt";
import { Button } from "@/components/ui/Button";
import { formatPrice, PRODUCT } from "@/lib/product";

const labels = [
  "100 idej za zmenke",
  "Prostor za fotografije",
  "Vajini zapiski in spomini",
];

export function Hero() {
  const price = formatPrice(PRODUCT.price);

  return (
    <section id="knjiga" className="scroll-mt-14 bg-ivory">
      <div className="container-wide grid grid-cols-1 gap-4 py-4 lg:grid-cols-2 lg:items-center lg:gap-14 lg:py-16">
        <div className="order-1">
          <p className="eyebrow hero-in">Knjiga za pare</p>
          <h2 className="hero-in mt-2 text-[clamp(1.85rem,5.4vw,4.15rem)] text-ink lg:mt-3">
            100 zmenkov. Ena knjiga. Vajina zgodba.
          </h2>
        </div>

        <div className="order-2 lg:col-start-2 lg:row-start-1 lg:row-span-4">
          <BookTilt>
            <div className="hero-photo relative mx-auto h-[clamp(128px,26svh,240px)] w-full overflow-hidden rounded-2xl border border-line bg-[#F3EBE0] shadow-soft lg:h-auto lg:aspect-[4/3] lg:max-h-[560px]">
              <Image
                src="/images/book-intro.png"
                alt="Odprta knjiga 100 nepozabnih trenutkov z naslovnico para na gugalnici"
              fill
              sizes="(max-width: 1024px) 100vw, 520px"
                className="object-contain"
              />
            </div>
          </BookTilt>
        </div>

        <div className="order-4 lg:order-3">
          <p className="hero-in-delay text-[15px] leading-relaxed text-muted md:text-lg">
            Odkrijta 100 idej za skupna doživetja. Dodajta fotografije, zapišita najlepše
            trenutke in ustvarita knjigo vajinih spominov.
          </p>
        </div>

        <div className="order-3 lg:order-4">
          <p className="hero-in-delay font-serif text-3xl text-ink">{price}</p>
          <div className="hero-in-delay mt-3 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href="/100-nepozabnih-trenutkov">Naroči knjigo — {price}</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
              <Link href="/100-nepozabnih-trenutkov#predogled">Prelistaj knjigo</Link>
            </Button>
          </div>
        </div>

        <ul className="order-5 flex flex-col gap-1.5">
          {labels.map((label) => (
            <li key={label} className="flex items-center gap-2 text-sm text-muted">
              <Check className="h-4 w-4 shrink-0 text-burgundy" aria-hidden />
              {label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
