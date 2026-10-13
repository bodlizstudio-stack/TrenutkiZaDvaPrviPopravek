"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

const order = ["/", "/100-nepozabnih-trenutkov", "/o-nas", "/kontakt"];

type Turn = { finished: Promise<void> };

function destination(anchor: HTMLAnchorElement, currentPath: string) {
  if (anchor.target && anchor.target !== "_self") return null;
  if (anchor.hasAttribute("download")) return null;
  if (anchor.closest("nextjs-portal")) return null;
  const raw = anchor.getAttribute("href");
  if (!raw || raw.startsWith("#") || raw.startsWith("mailto:") || raw.startsWith("tel:")) return null;

  let url: URL;
  try {
    url = new URL(anchor.href, window.location.href);
  } catch {
    return null;
  }
  if (url.origin !== window.location.origin) return null;
  if (url.pathname === currentPath && url.search === window.location.search) return null;
  return `${url.pathname}${url.search}${url.hash}`;
}

function direction(from: string, to: string) {
  const start = order.indexOf(from);
  const end = order.indexOf(to.split("?")[0].split("#")[0]);
  if (start === -1 || end === -1 || end >= start) return "next";
  return "prev";
}

export function PageTurn() {
  const pathname = usePathname();
  const router = useRouter();
  const pathRef = useRef(pathname);
  const routerRef = useRef(router);
  const waiters = useRef<Array<() => void>>([]);

  routerRef.current = router;

  useEffect(() => {
    if (pathRef.current === pathname) return;
    pathRef.current = pathname;
    const pending = waiters.current.splice(0);
    pending.forEach((finish) => finish());
  }, [pathname]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as Element | null)?.closest("a");
      if (!anchor) return;
      const href = destination(anchor, pathRef.current);
      if (!href) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const start = (
        document as Document & {
          startViewTransition?: (update: () => Promise<void> | void) => Turn;
        }
      ).startViewTransition;
      if (reduced || !start) return;

      event.preventDefault();
      event.stopPropagation();
      document.documentElement.dataset.turn = direction(pathRef.current, href);

      const clearTurn = () => {
        delete document.documentElement.dataset.turn;
      };

      try {
        const transition = start(() => {
          return new Promise<void>((resolve) => {
            let settled = false;
            const finish = () => {
              if (settled) return;
              settled = true;
              resolve();
            };
            waiters.current.push(finish);
            window.setTimeout(finish, 1500);
            routerRef.current.push(href);
          });
        });
        transition.finished.finally(clearTurn);
      } catch {
        clearTurn();
        routerRef.current.push(href);
      }
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
