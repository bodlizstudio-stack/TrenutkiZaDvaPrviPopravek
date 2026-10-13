import type { Metadata } from "next";
import { InfoPage, LegalNotice } from "@/components/layout/InfoPage";
import { formatPrice, PRODUCT, SHIPPING_EUR } from "@/lib/product";
import { contactEmail } from "@/lib/site";

export const metadata: Metadata = {
  title: "Splošni pogoji",
  description: "Osnovna dejstva o nakupu knjige Trenutki za dva. Popolni pogoji poslovanja še niso objavljeni.",
  alternates: { canonical: "/splosni-pogoji" },
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <InfoPage
      title="Splošni pogoji"
      lede="Popolni pogoji poslovanja bodo objavljeni, ko bodo znani podatki o podjetju."
    >
      {/* TODO: dopolni s firmo, naslovom, DDV in pravnim besedilom, preden gre stran v produkcijo. */}
      <LegalNotice />
      <p>
        V trgovini je na voljo {PRODUCT.name} za {formatPrice(PRODUCT.price)}. Dostava po
        Sloveniji stane {formatPrice(SHIPPING_EUR)}.
      </p>
      <p>
        Plačilo izvedete na Stripe. Ta stran ne shranjuje številke kartice. Naročilo je
        oddano, ko Stripe potrdi plačilo.
      </p>
      <p>
        Kontakt:{" "}
        <a className="text-ink underline underline-offset-4" href={`mailto:${contactEmail}`}>
          {contactEmail}
        </a>
      </p>
    </InfoPage>
  );
}
