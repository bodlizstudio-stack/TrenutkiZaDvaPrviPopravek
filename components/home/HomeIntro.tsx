import Image from "next/image";
import { ChevronDown } from "lucide-react";

export function HomeIntro() {
  return (
    <section className="flex min-h-[calc(100svh-3.5rem)] flex-col bg-ivory">
      <div className="container-wide flex flex-1 flex-col justify-center py-8 text-center sm:py-10">
        <p className="hero-in font-script text-[clamp(2rem,6vw,3.25rem)] leading-none text-ink">
          Trenutki za dva
        </p>
        <h1 className="hero-in mx-auto mt-4 max-w-3xl text-[clamp(1.85rem,5.2vw,3.6rem)] text-ink">
          Za trenutke, ki jih vsakdan prehitro pozabi.
        </h1>
        <p className="hero-in-delay mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-muted md:text-lg">
          Lep odnos ne potrebuje vedno velike geste. Pogosto največ pomeni majhen trenutek, ko
          si zavestno vzameta čas drug za drugega.
        </p>
      </div>

      <div className="hero-in-delay relative mx-auto h-[34svh] w-full max-w-5xl overflow-hidden sm:h-[40svh] lg:mb-2 lg:h-[42svh] lg:max-w-[1100px] lg:rounded-2xl lg:border lg:border-line">
        <Image
          src="/images/book-photo-8.jpg"
          alt="Zaprta knjiga na kavarniški mizi ob skodelici kave"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 1100px"
          className="object-cover object-[center_58%]"
        />
      </div>

      <a
        href="#knjiga"
        className="inline-flex min-h-12 items-center justify-center gap-1.5 py-3 text-sm text-muted hover:text-ink"
      >
        Listaj naprej
        <ChevronDown className="h-4 w-4" aria-hidden />
      </a>
    </section>
  );
}
