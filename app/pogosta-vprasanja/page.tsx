import type { Metadata } from "next";
import { FAQ } from "@/components/home/FAQ";

export const metadata: Metadata = {
  title: "Pogosta vprašanja",
  description:
    "Odgovori o knjigi 100 nepozabnih trenutkov, dostavi po Sloveniji in plačilu prek Stripe.",
  alternates: { canonical: "/pogosta-vprasanja" },
};

export default function FaqPage() {
  return (
    <div className="bg-white pt-8">
      <div className="container-wide max-w-3xl">
        <h1 className="text-[clamp(2rem,5vw,3.25rem)] text-ink">Pogosta vprašanja</h1>
      </div>
      <FAQ showHeading={false} />
    </div>
  );
}
