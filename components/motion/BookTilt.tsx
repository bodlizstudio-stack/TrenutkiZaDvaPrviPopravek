"use client";

import { useEffect, useRef } from "react";

export function BookTilt({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const fine = window.matchMedia("(hover: hover) and (prefers-reduced-motion: no-preference)");
    if (!fine.matches) return;

    const onMove = (event: PointerEvent) => {
      const box = node.getBoundingClientRect();
      if (!box.width || !box.height) return;
      const x = (event.clientX - box.left) / box.width - 0.5;
      const y = (event.clientY - box.top) / box.height - 0.5;
      node.style.transform = `rotateY(${x * 9}deg) rotateX(${-y * 7}deg)`;
    };
    const reset = () => {
      node.style.transform = "";
    };

    node.addEventListener("pointermove", onMove);
    node.addEventListener("pointerleave", reset);
    return () => {
      node.removeEventListener("pointermove", onMove);
      node.removeEventListener("pointerleave", reset);
    };
  }, []);

  return (
    <div className="[perspective:900px]">
      <div ref={ref} className="transition-transform duration-200 ease-out">
        {children}
      </div>
    </div>
  );
}
