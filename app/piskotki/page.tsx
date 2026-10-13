import type { Metadata } from "next";
import { InfoPage, LegalNotice } from "@/components/layout/InfoPage";

export const metadata: Metadata = {
  title: "Piškotki",
  description: "Stran Trenutki za dva v brskalniku shrani košarico in ne uporablja oglasnih piškotkov.",
  alternates: { canonical: "/piskotki" },
};

export default function CookiesPage() {
  return (
    <InfoPage
      title="Piškotki"
      lede="Stran ne vstavlja oglasnih ali analitičnih piškotkov."
    >
      <LegalNotice />
      <p>
        Košarica se shrani lokalno v brskalniku pod ključem cart-storage, da izbrani izdelek
        ostane tudi po zaprtju zavihka. To ni oglasno sledenje.
      </p>
      <p>Plačilno stran Stripe lahko nastavi lastne piškotke, ko zapustite to trgovino.</p>
    </InfoPage>
  );
}
