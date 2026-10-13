import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function GiftSection() {
  return (
    <section id="darilo" className="reveal scroll-mt-24 bg-ivory py-14 md:py-20">
      <div className="container-wide grid items-center gap-6 md:grid-cols-2 md:gap-12">
        <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-line bg-[#F3EBE0]">
          <Image
            src="/images/book-photo-9.jpg"
            alt="Knjiga 100 nepozabnih trenutkov na odeji med travniškimi cvetlicami"
            fill
            sizes="(max-width: 768px) 100vw, 520px"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        </div>
        <div>
          <p className="eyebrow">Za darilo</p>
          <h2 className="mt-3 text-[clamp(1.75rem,4vw,3rem)] text-ink">
            Ne podari samo knjige. Podari 100 skupnih trenutkov.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-muted md:text-base">
            Za obletnico, rojstni dan, Valentinovo ali preprosto zato, ker si želita več časa zase.
          </p>
          <Button asChild size="lg" className="mt-6">
            <Link href="/100-nepozabnih-trenutkov#nakup">Podari knjigo</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
