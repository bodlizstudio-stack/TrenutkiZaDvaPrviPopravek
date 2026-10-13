import type { Metadata } from "next";
import { InfoPage } from "@/components/layout/InfoPage";
import { formatPrice, SHIPPING_EUR } from "@/lib/product";
import { contactEmail } from "@/lib/site";

export const metadata: Metadata = {
  title: "Dostava",
  description: "Dostava knjige 100 nepozabnih trenutkov po Sloveniji stane 3,50 €.",
  alternates: { canonical: "/dostava" },
};

export default function DeliveryPage() {
  return (
    <InfoPage
      title="Dostava"
      lede="Knjigo pošiljamo po Sloveniji. Naslov vnesete na varni blagajni Stripe."
    >
      <p>Strošek dostave je {formatPrice(SHIPPING_EUR)} in se na blagajni prišteje naročilu.</p>
      <p>Rok dostave na tej strani ni objavljen.</p>
      <p>
        Vprašanja o pošiljki:{" "}
        <a className="text-ink underline underline-offset-4" href={`mailto:${contactEmail}`}>
          {contactEmail}
        </a>
      </p>
    </InfoPage>
  );
}
