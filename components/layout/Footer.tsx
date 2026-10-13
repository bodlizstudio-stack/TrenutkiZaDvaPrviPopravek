import Link from "next/link";
import { PaymentMarks } from "@/components/layout/PaymentMarks";
import { contactEmail, mainNav } from "@/lib/site";

const support = [
  { name: "Kontakt", href: "/kontakt" },
  { name: "Dostava", href: "/dostava" },
  { name: "Vračila", href: "/vracila" },
  { name: "Pogosta vprašanja", href: "/pogosta-vprasanja" },
];

const legal = [
  { name: "Splošni pogoji", href: "/splosni-pogoji" },
  { name: "Politika zasebnosti", href: "/politika-zasebnosti" },
  { name: "Piškotki", href: "/piskotki" },
];

export function Footer() {
  return (
    <footer className="vt-footer border-t border-line bg-ink text-ivory">
      <div className="container-wide grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-script text-3xl text-ivory">Trenutki za dva</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-ivory/75">
            Knjiga, ki paroma pomaga najti skupen čas in ga shraniti.
          </p>
        </div>

        <div>
          <h2 className="font-sans text-sm font-semibold tracking-wide text-ivory">Raziskujta</h2>
          <ul className="mt-3 space-y-2">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-ivory/75 hover:text-ivory">
                  {item.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/#kako-deluje" className="text-sm text-ivory/75 hover:text-ivory">
                Kako deluje
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-sans text-sm font-semibold tracking-wide text-ivory">Pomoč</h2>
          <ul className="mt-3 space-y-2">
            {support.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-ivory/75 hover:text-ivory">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-sans text-sm font-semibold tracking-wide text-ivory">Pravno</h2>
          <ul className="mt-3 space-y-2">
            {legal.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-ivory/75 hover:text-ivory">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          <a
            href={`mailto:${contactEmail}`}
            className="mt-4 inline-flex min-h-11 items-center text-sm text-ivory underline decoration-ivory/30 underline-offset-4"
          >
            {contactEmail}
          </a>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-wide flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-ivory/60">© {new Date().getFullYear()} Trenutki za dva</p>
          <div className="flex flex-col gap-2 sm:items-end">
            <PaymentMarks />
            <p className="text-xs text-ivory/60">Plačilo prek Stripe</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
