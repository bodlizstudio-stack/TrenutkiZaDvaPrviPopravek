"use client";

import { useCallback, useRef } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useDialog } from "@/hooks/useDialog";
import { isActivePath, mainNav } from "@/lib/site";
import { cn } from "@/lib/utils";

type MobileNavProps = {
  open: boolean;
  pathname: string;
  onClose: () => void;
};

export function MobileNav({ open, pathname, onClose }: MobileNavProps) {
  const ref = useRef<HTMLDivElement>(null);
  const close = useCallback(() => onClose(), [onClose]);
  useDialog(open, close, ref);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] lg:hidden">
      <button
        type="button"
        className="absolute inset-0 bg-ink/40"
        aria-label="Zapri meni"
        onClick={onClose}
      />
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label="Meni"
        className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-ivory shadow-soft"
      >
        <div className="flex h-14 items-center justify-between border-b border-line px-4">
          <p className="font-script text-2xl text-ink">Trenutki za dva</p>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full"
            onClick={onClose}
            aria-label="Zapri meni"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto px-3 py-3" aria-label="Mobilna navigacija">
          {mainNav.map((item) => {
            const active = isActivePath(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex min-h-12 items-center rounded-xl px-3 text-lg",
                  active ? "bg-cream text-burgundy" : "text-ink"
                )}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-line p-4 safe-bottom">
          <Button asChild className="w-full" size="lg">
            <Link href="/100-nepozabnih-trenutkov" onClick={onClose}>
              Naroči knjigo
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
