"use client";

import { useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useCartHydrated } from "@/hooks/useCartHydrated";
import { useDialog } from "@/hooks/useDialog";
import { formatPrice, unitPrice } from "@/lib/product";
import { useCartStore } from "@/store/cartStore";

export function CartDrawer() {
  const { isOpen, setIsOpen, items, updateQuantity, removeItem } = useCartStore();
  const hydrated = useCartHydrated();
  const ref = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setIsOpen(false), [setIsOpen]);
  const open = hydrated && isOpen;
  useDialog(open, close, ref);

  if (!open) return null;

  const subtotal = items.reduce((sum, item) => sum + unitPrice(item) * item.quantity, 0);

  return (
    <div className="vt-cart fixed inset-0 z-[70]">
      <button
        type="button"
        className="absolute inset-0 bg-ink/40"
        aria-label="Zapri košarico"
        onClick={close}
      />
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-ivory shadow-soft"
      >
        <div className="flex h-14 items-center justify-between border-b border-line px-4">
          <h2 id="cart-title" className="flex items-center gap-2 font-serif text-xl text-ink">
            <ShoppingBag className="h-5 w-5" />
            Košarica
          </h2>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full"
            onClick={close}
            aria-label="Zapri košarico"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
              <ShoppingBag className="h-10 w-10 text-muted" />
              <p className="text-muted">Košarica je prazna.</p>
              <Button asChild variant="outline" onClick={close}>
                <Link href="/100-nepozabnih-trenutkov">Oglejta si knjigo</Link>
              </Button>
            </div>
          ) : (
            <ul className="space-y-5">
              {items.map((item) => {
                const price = unitPrice(item);
                return (
                  <li key={item.id} className="flex gap-3">
                    <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-lg bg-cream">
                      {item.image ? (
                        <Image src={item.image} alt="" fill sizes="80px" className="object-cover" />
                      ) : null}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-sans text-sm font-medium text-ink">{item.name}</h3>
                      <p className="mt-1 text-sm text-muted">{formatPrice(price)}</p>
                      <div className="mt-3 flex items-center justify-between gap-3">
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
                        <button
                          type="button"
                          className="min-h-11 text-sm text-muted underline underline-offset-4"
                          onClick={() => removeItem(item.id)}
                        >
                          Odstrani
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {items.length > 0 ? (
          <div className="border-t border-line bg-white px-4 pt-4 safe-bottom">
            <div className="flex items-center justify-between text-ink">
              <span>Vmesna vsota</span>
              <span className="font-medium">{formatPrice(subtotal)}</span>
            </div>
            <p className="mt-1 text-xs text-muted">Dostava se prišteje na blagajni.</p>
            <Button asChild className="mt-4 w-full" size="lg" onClick={close}>
              <Link href="/blagajna">Na blagajno</Link>
            </Button>
            <button
              type="button"
              className="mt-2 min-h-11 w-full text-sm text-muted"
              onClick={close}
            >
              Nadaljuj z brskanjem
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
