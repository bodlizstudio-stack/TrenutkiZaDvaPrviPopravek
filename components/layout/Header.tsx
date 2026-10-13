"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ShoppingBag } from "lucide-react";
import { MobileNav } from "@/components/layout/MobileNav";
import { Button } from "@/components/ui/Button";
import { isActivePath, mainNav } from "@/lib/site";
import { useCartHydrated } from "@/hooks/useCartHydrated";
import { useCartStore } from "@/store/cartStore";
import { useUiStore } from "@/store/uiStore";
import { cn } from "@/lib/utils";

function countLabel(count: number) {
  if (count === 1) return "1 izdelek";
  if (count === 2) return "2 izdelka";
  if (count === 3 || count === 4) return `${count} izdelki`;
  return `${count} izdelkov`;
}

export function Header() {
  const pathname = usePathname();
  const hydrated = useCartHydrated();
  const cartCount = useCartStore((state) => state.getCartCount());
  const setCartOpen = useCartStore((state) => state.setIsOpen);
  const menuOpen = useUiStore((state) => state.isNavOpen);
  const setMenuOpen = useUiStore((state) => state.setNavOpen);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname, setMenuOpen]);

  const count = hydrated ? cartCount : 0;

  return (
    <header className="vt-header fixed inset-x-0 top-0 z-50 border-b border-line bg-ivory/95 backdrop-blur-md">
      <div className="container-wide flex h-14 items-center justify-between gap-3">
        <Link href="/" className="min-w-0 font-script text-[clamp(1.35rem,4.6vw,1.9rem)] leading-none text-ink">
          Trenutki za dva
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Glavna navigacija">
          {mainNav.map((item) => {
            const active = isActivePath(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative text-sm transition-colors after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:origin-left after:bg-current after:transition-transform after:duration-200 hover:text-burgundy",
                  active ? "text-burgundy after:scale-x-100" : "text-ink after:scale-x-0 hover:after:scale-x-100"
                )}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1">
          <Button asChild className="hidden lg:inline-flex" size="sm">
            <Link href="/100-nepozabnih-trenutkov">Naroči knjigo</Link>
          </Button>
          <button
            type="button"
            className="relative inline-flex h-11 w-11 items-center justify-center rounded-full text-ink"
            onClick={() => {
              setMenuOpen(false);
              setCartOpen(true);
            }}
            aria-label={count > 0 ? `Košarica, ${countLabel(count)}` : "Košarica"}
          >
            <ShoppingBag className="h-5 w-5" />
            {count > 0 ? (
              <span className="absolute top-1 right-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-burgundy px-1 text-[10px] font-semibold text-ivory">
                {count}
              </span>
            ) : null}
          </button>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink lg:hidden"
            aria-label="Odpri meni"
            aria-expanded={menuOpen}
            aria-controls="mobilni-meni"
            onClick={() => setMenuOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div id="mobilni-meni">
        <MobileNav open={menuOpen} pathname={pathname} onClose={() => setMenuOpen(false)} />
      </div>
    </header>
  );
}
