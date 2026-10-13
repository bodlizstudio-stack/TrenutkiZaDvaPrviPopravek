import Image from "next/image";
import { steps } from "@/lib/content";

export function HowItWorks() {
  return (
    <section id="kako-deluje" className="scroll-mt-24 bg-cream py-14 md:py-20">
      <div className="container-wide">
        <h2 className="rise mx-auto max-w-2xl text-center text-[clamp(1.75rem,4vw,3rem)] text-ink">
          Kako nastanejo vajini nepozabni trenutki?
        </h2>
        <ol className="relative mt-8 grid gap-6 md:mt-12 md:grid-cols-3 md:gap-8">
          <span
            aria-hidden
            className="absolute top-3 bottom-3 left-[1.15rem] w-px bg-burgundy/25 md:top-7 md:right-16 md:bottom-auto md:left-16 md:h-px md:w-auto"
          />
          {steps.map((step) => (
            <li key={step.num} className="rise relative pl-12 md:pl-0">
              <span className="absolute top-0 left-0 inline-flex h-10 w-10 items-center justify-center rounded-full bg-burgundy font-serif text-sm text-ivory md:static">
                {step.num}
              </span>
              <div className="group relative mt-0 aspect-[4/3] overflow-hidden rounded-2xl border border-line bg-[#F3EBE0] md:mt-5">
                <Image
                  src={step.image}
                  alt={step.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 340px"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </div>
              <h3 className="mt-4 font-serif text-2xl text-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted md:text-base">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
