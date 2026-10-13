import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Stran ne obstaja",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-16 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-3 max-w-lg text-[clamp(2rem,5vw,3.4rem)] text-ink">
        Ta stran se je izgubila.
      </h1>
      <p className="mt-4 max-w-md text-muted">
        Povezava ne vodi do obstoječe vsebine. Knjiga je še vedno na voljo.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Button asChild size="lg">
          <Link href="/">Na domačo stran</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/100-nepozabnih-trenutkov">Poglejta knjigo</Link>
        </Button>
      </div>
    </div>
  );
}
