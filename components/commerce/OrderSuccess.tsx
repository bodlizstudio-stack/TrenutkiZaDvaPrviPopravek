"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { useCartStore } from "@/store/cartStore";

export function OrderSuccess() {
  const clearCart = useCartStore((state) => state.clearCart);
  const params = useSearchParams();
  const demo = params.get("session_id") === "demo_mode_12345";

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="px-4 py-16 text-center">
      <div className="mx-auto max-w-xl">
        <p className="eyebrow">Naročilo</p>
        <h1 className="mt-3 font-serif text-4xl text-ink">Hvala.</h1>
        <p className="mt-4 text-muted">
          {demo
            ? "V tem okolju plačilni sistem ni povezan, zato je to samo prikaz zaključka. Košarica je izpraznjena."
            : "Če je Stripe potrdil plačilo, potrdilo prejmete po e-pošti. Košarica je izpraznjena."}
        </p>
        <Button asChild className="mt-8">
          <Link href="/">Nazaj na domačo stran</Link>
        </Button>
      </div>
    </div>
  );
}
