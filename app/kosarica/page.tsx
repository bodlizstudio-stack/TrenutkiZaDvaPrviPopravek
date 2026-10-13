"use client";

import { useCartHydrated } from "@/hooks/useCartHydrated";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { formatPrice, unitPrice } from "@/lib/product";
import { useCartStore } from "@/store/cartStore";

export default function CartPage() {
  const { items, updateQuantity, removeItem } = useCartStore();
  const hydrated = useCartHydrated();

  if (!hydrated) {
    return <div className="min-h-[50vh] bg-ivory" />;
  }

  if (items.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <ShoppingBag className="h-12 w-12 text-muted" />
        <h1 className="mt-4 font-serif text-3xl text-ink">Košarica je prazna</h1>
        <Button asChild className="mt-6" size="lg">
          <Link href="/100-nepozabnih-trenutkov">Oglejta si knjigo</Link>
        </Button>
      </div>
    );
  }

  const subtotal = items.reduce((sum, item) => sum + unitPrice(item) * item.quantity, 0);

  return (
    <div className="bg-ivory py-8 md:py-14">
      <div className="container-wide max-w-3xl">
        <h1 className="font-serif text-3xl text-ink">Košarica</h1>
        <ul className="mt-6 space-y-4">
          {items.map((item) => {
            const price = unitPrice(item);
            return (
              <li
                key={item.id}
                className="flex flex-col gap-4 rounded-2xl border border-line bg-white p-4 sm:flex-row sm:items-center"
              >
                <div className="relative h-28 w-24 shrink-0 overflow-hidden rounded-lg bg-cream">
                  {item.image ? (
                    <Image src={item.image} alt="" fill sizes="96px" className="object-cover" />
                  ) : null}
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="font-sans text-base font-medium text-ink">{item.name}</h2>
                  <button
                    type="button"
                    className="mt-1 min-h-11 text-sm text-muted underline underline-offset-4"
                    onClick={() => removeItem(item.id)}
                  >
                    Odstrani
                  </button>
                </div>
                <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                  <p className="font-medium text-ink">{formatPrice(price * item.quantity)}</p>
                  <div className="inline-flex items-center rounded-full border border-line">
                    <button
                      type="button"
                      className="inline-flex h-11 w-11 items-center justify-center disabled:opacity-40"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      aria-label="Zmanjšaj količino"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="min-w-6 text-center text-sm tabular-nums">{item.quantity}</span>
                    <button
                      type="button"
                      className="inline-flex h-11 w-11 items-center justify-center"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      aria-label="Povečaj količino"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="mt-6 rounded-2xl border border-line bg-white p-5 sm:ml-auto sm:max-w-sm">
          <div className="flex items-center justify-between">
            <span>Vmesna vsota</span>
            <span className="font-serif text-2xl">{formatPrice(subtotal)}</span>
          </div>
          <p className="mt-1 text-xs text-muted">Dostava se prišteje na blagajni.</p>
          <Button asChild size="lg" className="mt-4 w-full">
            <Link href="/blagajna">Na blagajno</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
