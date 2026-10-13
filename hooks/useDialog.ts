"use client";

import { useEffect, type RefObject } from "react";

let scrollLocks = 0;

function setScrollLocked(locked: boolean) {
  if (locked) {
    scrollLocks += 1;
    if (scrollLocks === 1) {
      document.documentElement.style.overflow = "hidden";
    }
    return;
  }

  scrollLocks = Math.max(0, scrollLocks - 1);
  if (scrollLocks === 0) {
    document.documentElement.style.overflow = "";
  }
}

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export function useDialog(
  open: boolean,
  onClose: () => void,
  containerRef: RefObject<HTMLElement | null>
) {
  useEffect(() => {
    if (!open) return;

    const node = containerRef.current;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const getItems = () =>
      Array.from(node?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []).filter(
        (el) => !el.hasAttribute("disabled") && el.tabIndex !== -1
      );

    const frame = window.requestAnimationFrame(() => {
      getItems()[0]?.focus();
    });

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;
      const items = getItems();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    setScrollLocked(true);
    document.addEventListener("keydown", onKey);

    return () => {
      window.cancelAnimationFrame(frame);
      document.removeEventListener("keydown", onKey);
      setScrollLocked(false);
      previouslyFocused?.focus?.();
    };
  }, [open, onClose, containerRef]);
}
