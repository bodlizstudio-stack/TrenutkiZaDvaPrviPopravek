import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Pišite na info@trenutkizadva.si za vprašanja o knjigi, naročilu ali dostavi.",
  alternates: { canonical: "/kontakt" },
};

export default function ContactPage() {
  return <ContactForm />;
}
