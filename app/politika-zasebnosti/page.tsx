import type { Metadata } from "next";
import { InfoPage, LegalNotice } from "@/components/layout/InfoPage";
import { contactEmail } from "@/lib/site";

export const metadata: Metadata = {
  title: "Politika zasebnosti",
  description: "Kako spletna stran Trenutki za dva obravnava podatke iz košarice, obrazca in plačila.",
  alternates: { canonical: "/politika-zasebnosti" },
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <InfoPage
      title="Politika zasebnosti"
      lede="Spodaj je opis tega, kar stran dejansko počne s podatki. To ni popolna pravna politika."
    >
      {/* TODO: dopolni z upravljavcem, pravnimi podlagami in roki hrambe. */}
      <LegalNotice />
      <p>
        Košarica se shrani v brskalniku, da izdelki ostanejo tudi po osvežitvi strani. Plačilo
        in naslov za dostavo vnesete pri Stripe, ne v obrazec na tej strani.
      </p>
      <p>
        Kontaktni obrazec pošlje ime, e-pošto, zadevo in sporočilo na poštni predal trgovine,
        da lahko odgovorimo. Ob uspešni oddaji prejmete tudi samodejni odgovor.
      </p>
      <p>
        Za vprašanja o podatkih pišite na{" "}
        <a className="text-ink underline underline-offset-4" href={`mailto:${contactEmail}`}>
          {contactEmail}
        </a>
        .
      </p>
    </InfoPage>
  );
}
