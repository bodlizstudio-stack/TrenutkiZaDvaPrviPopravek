import { Camera, Gift, Lightbulb } from "lucide-react";

const benefits = [
  {
    icon: Lightbulb,
    title: "100 idej za zmenke",
    text: "Od preprostih večerov doma do novih dogodivščin.",
  },
  {
    icon: Camera,
    title: "Spomini na enem mestu",
    text: "Dodajta fotografije in vajine zapiske.",
  },
  {
    icon: Gift,
    title: "Darilo z zgodbo",
    text: "Podarita doživetja, ki jih bosta ustvarila skupaj.",
  },
];

export function BenefitsStrip() {
  return (
    <section className="reveal border-y border-line bg-cream" aria-label="Zakaj knjiga">
      <div className="container-wide grid gap-3 py-5 md:grid-cols-3 md:gap-8 md:py-8">
        {benefits.map((benefit) => {
          const Icon = benefit.icon;
          return (
            <article key={benefit.title} className="hover-lift flex gap-3 rounded-2xl bg-ivory/70 px-3 py-3 md:bg-transparent md:px-0 md:hover:bg-ivory/80">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-burgundy">
                <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden />
              </span>
              <div>
                <h2 className="font-sans text-base font-medium text-ink">{benefit.title}</h2>
                <p className="text-sm leading-relaxed text-muted">{benefit.text}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
