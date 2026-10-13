"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Lightbox } from "@/components/commerce/Lightbox";
import type { MediaImage } from "@/lib/product";
import { cn } from "@/lib/utils";

type ProductGalleryProps = {
  images: MediaImage[];
  priority?: boolean;
  framed?: boolean;
};

export function ProductGallery({ images, priority = false, framed = true }: ProductGalleryProps) {
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const start = useRef<{ x: number; y: number } | null>(null);
  const image = images[index];

  const go = (direction: -1 | 1) => {
    setIndex((current) => (current + direction + images.length) % images.length);
  };

  return (
    <div className="min-w-0">
      <div
        className={cn(
          "relative overflow-hidden bg-[#F3EBE0]",
          framed && "rounded-2xl border border-line shadow-soft"
        )}
      >
        <div
          className="relative aspect-[4/3] cursor-zoom-in"
          onPointerDown={(event) => {
            if (event.pointerType === "mouse" && event.button !== 0) return;
            start.current = { x: event.clientX, y: event.clientY };
          }}
          onPointerUp={(event) => {
            if (!start.current) return;
            const dx = event.clientX - start.current.x;
            const dy = event.clientY - start.current.y;
            start.current = null;
            if (Math.abs(dx) < 10 && Math.abs(dy) < 10) {
              setLightbox(true);
              return;
            }
            if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) return;
            go(dx < 0 ? 1 : -1);
          }}
          onPointerCancel={() => {
            start.current = null;
          }}
        >
          <Image
            key={image.src}
            src={image.src}
            alt={image.alt}
            fill
            priority={priority && index === 0}
            sizes="(max-width: 1024px) 100vw, 540px"
            className="object-contain"
          />
        </div>
        <button
          type="button"
          className="absolute top-1/2 left-2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink shadow-soft"
          onClick={() => go(-1)}
          aria-label="Prejšnja slika"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          className="absolute top-1/2 right-2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink shadow-soft"
          onClick={() => go(1)}
          aria-label="Naslednja slika"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
        <p className="pointer-events-none absolute right-3 bottom-3 rounded-full bg-white/90 px-2.5 py-1 text-xs text-ink">
          {index + 1} / {images.length}
        </p>
      </div>

      <div className="mt-3 flex w-full min-w-0 gap-2 overflow-x-auto overscroll-x-contain pb-1" role="tablist" aria-label="Sličice izdelka">
        {images.map((item, itemIndex) => {
          const selected = itemIndex === index;
          return (
            <button
              key={item.src}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-label={item.label}
              onClick={() => setIndex(itemIndex)}
              className={cn(
                "relative h-16 w-[4.6rem] shrink-0 overflow-hidden rounded-lg border bg-[#F3EBE0]",
                selected ? "border-burgundy" : "border-line"
              )}
            >
              <Image
                src={item.src}
                alt=""
                fill
                sizes="74px"
                className="object-cover"
              />
            </button>
          );
        })}
      </div>
      <p className="sr-only" aria-live="polite">
        {image.label}, slika {index + 1} od {images.length}
      </p>

      {lightbox ? (
        <Lightbox
          images={images}
          index={index}
          onIndexChange={setIndex}
          onClose={() => setLightbox(false)}
        />
      ) : null}
    </div>
  );
}
