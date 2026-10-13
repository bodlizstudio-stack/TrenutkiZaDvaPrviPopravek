"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AddToCartButton } from "@/components/commerce/AddToCartButton";
import { formatPrice, PRODUCT } from "@/lib/product";
import { purchasePaths } from "@/lib/site";
import { useCartStore } from "@/store/cartStore";
import { useUiStore } from "@/store/uiStore";
import { cn } from "@/lib/utils";

export function MobileStickyPurchaseBar() {
  const pathname = usePathname();
  const cartOpen = useCartStore((state) => state.isOpen);
  const menuOpen = useUiStore((state) => state.isNavOpen);
  const [ctaInView, setCtaInView] = useState(true);
  const enabled = purchasePaths.includes(pathname);

  useEffect(() => {
    if (!enabled) return;
    const nodes = Array.from(document.querySelectorAll("[data-purchase-cta]"));
    if (nodes.length === 0) return;

    const seen = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) seen.add(entry.target);
          else seen.delete(entry.target);
        }
        setCtaInView(seen.size > 0);
      },
      { threshold: 0.35 }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [enabled, pathname]);

  const visible = enabled && !ctaInView && !cartOpen && !menuOpen;

  return (
    <>
      <div aria-hidden className={cn("lg:hidden", visible ? "h-[4.75rem]" : "h-0")} />
      <div
        className={cn(
          "vt-buybar fixed inset-x-0 bottom-0 z-40 border-t border-line bg-ivory/95 backdrop-blur-md transition-transform duration-200 lg:hidden",
          visible ? "translate-y-0" : "pointer-events-none translate-y-full"
        )}
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        aria-hidden={!visible}
        inert={!visible}
      >
        <div className="flex items-center gap-3 px-4 py-2.5">
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-ink">{PRODUCT.name}</p>
            <p className="text-sm text-burgundy">{formatPrice(PRODUCT.price)}</p>
          </div>
          <AddToCartButton label="Dodaj v košarico" size="sm" className="shrink-0 px-4" />
        </div>
      </div>
    </>
  );
}
