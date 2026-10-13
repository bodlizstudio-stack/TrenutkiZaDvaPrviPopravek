"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { useCartHydrated } from "@/hooks/useCartHydrated";
import { formatPrice, SHIPPING_EUR, unitPrice } from "@/lib/product";
import { useCartStore } from "@/store/cartStore";

export default function CheckoutPage() {
  const { items } = useCartStore();
  const hydrated = useCartHydrated();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (!hydrated) {
    return <div className="min-h-[50vh] bg-ivory" />;
  }

  if (items.length === 0) {
    return (
      <div className="px-4 py-20 text-center">
        <h1 className="font-serif text-3xl text-ink">Košarica je prazna</h1>
        <Button asChild className="mt-6">
          <Link href="/100-nepozabnih-trenutkov">Nazaj h knjigi</Link>
        </Button>
      </div>
    );
  }

  const subtotal = items.reduce((sum, item) => sum + unitPrice(item) * item.quantity, 0);
  const total = subtotal + SHIPPING_EUR;

  const handleCheckout = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({
            id: item.id,
            name: item.name,
            price: unitPrice(item),
            quantity: item.quantity,
            image: item.image,
          })),
          origin: window.location.origin,
        }),
      });

      const data = await response.json();

      if (response.ok && data.url) {
        window.location.href = data.url;
        return;
      }

      setError("Plačila trenutno ni mogoče začeti. Poskusite znova.");
      setIsSubmitting(false);
    } catch {
      setError("Povezava s plačilnim sistemom ni uspela.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-ivory py-8 md:py-14">
      <div className="container-wide max-w-xl">
        <h1 className="text-center font-serif text-3xl text-ink">Blagajna</h1>
        <div className="mt-6 rounded-2xl border border-line bg-white p-5 md:p-8">
          <h2 className="font-serif text-xl text-ink">Povzetek</h2>
          <ul className="mt-4 space-y-4">
            {items.map((item) => (
              <li key={item.id} className="flex items-center gap-3">
                <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-lg bg-cream">
                  {item.image ? (
                    <Image src={item.image} alt="" fill sizes="64px" className="object-cover" />
                  ) : null}
                  <span className="absolute -top-1 -right-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-ink px-1 text-[11px] text-ivory">
                    {item.quantity}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-ink">{item.name}</p>
                  <p className="text-sm text-muted">
                    {formatPrice(unitPrice(item) * item.quantity)}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <dl className="mt-6 space-y-2 border-t border-line pt-4 text-sm">
            <div className="flex justify-between text-muted">
              <dt>Vmesna vsota</dt>
              <dd>{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between text-muted">
              <dt>Dostava po Sloveniji</dt>
              <dd>{formatPrice(SHIPPING_EUR)}</dd>
            </div>
            <div className="flex justify-between border-t border-line pt-3 font-serif text-2xl text-ink">
              <dt>Skupaj</dt>
              <dd>{formatPrice(total)}</dd>
            </div>
          </dl>

          {error ? (
            <p role="alert" className="mt-4 rounded-xl bg-cream px-3 py-2 text-sm text-burgundy">
              {error}
            </p>
          ) : null}

          <Button
            type="button"
            onClick={handleCheckout}
            size="lg"
            className="mt-6 w-full"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
          >
            {isSubmitting ? "Pripravljam varno blagajno …" : "Nadaljuj na plačilo"}
          </Button>
          <p className="mt-4 text-center text-xs leading-relaxed text-muted">
            Naslov in telefon vnesete na Stripe. Plačilo je možno s kartico ali PayPalom.
          </p>
        </div>
      </div>
    </div>
  );
}
