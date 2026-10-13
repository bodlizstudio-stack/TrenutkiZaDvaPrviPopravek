import type { Metadata } from "next";
import { InfoPage, LegalNotice } from "@/components/layout/InfoPage";
import { contactEmail } from "@/lib/site";

export const metadata: Metadata = {
  title: "Vračila",
  description: "Pogoji vračila za Trenutki za dva še niso objavljeni. Pišite na info@trenutkizadva.si.",
  alternates: { canonical: "/vracila" },
};

export default function ReturnsPage() {
  return (
    <InfoPage
      title="Vračila"
      lede="Na strani ni objavljenega roka, stroška ali postopka vračila."
    >
      <LegalNotice />
      <p>
        Za vprašanje o naročilu pišite na{" "}
        <a className="text-ink underline underline-offset-4" href={`mailto:${contactEmail}`}>
          {contactEmail}
        </a>
        . V sporočilo vključite številko naročila, če jo imate.
      </p>
    </InfoPage>
  );
}
