import type { Metadata } from "next";
import Link from "next/link";
import { BenefitsStrip } from "@/components/home/BenefitsStrip";
import { GiftSection } from "@/components/home/GiftSection";
import { Hero } from "@/components/home/Hero";
import { HomeIntro } from "@/components/home/HomeIntro";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  description:
    "Trenutki za dva. Knjiga za pare s sto idejami za skupna doživetja, fotografijami in zapiski.",
};

export default function HomePage() {
  return (
    <>
      <HomeIntro />
      <Hero />
      <BenefitsStrip />
      <HowItWorks />
      <GiftSection />
      <section className="reveal bg-ink py-14 text-ivory md:py-20">
        <div className="container-wide max-w-3xl text-center">
          <h2 className="text-[clamp(1.8rem,4vw,3rem)] text-ivory">
            Knjiga ima svojo stran. Tu je samo začetek.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-ivory/75">
            Predogled, cena in naročilo so na strani knjige. Za vprašanja pa pišita na kontakt.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild variant="light" size="lg">
              <Link href="/100-nepozabnih-trenutkov">Na stran knjige</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-ivory/30 text-ivory hover:bg-white/10"
            >
              <Link href="/kontakt">Kontakt</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
