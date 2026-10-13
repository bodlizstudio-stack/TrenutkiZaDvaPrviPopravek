import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Trgovina",
  description: "Knjiga 100 nepozabnih trenutkov je na svoji strani za naročilo.",
  alternates: { canonical: "/100-nepozabnih-trenutkov" },
};

export default function ShopPage() {
  redirect("/100-nepozabnih-trenutkov");
}
