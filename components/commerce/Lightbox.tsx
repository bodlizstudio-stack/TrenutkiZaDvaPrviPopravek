"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from "lucide-react";
import { useDialog } from "@/hooks/useDialog";
import type { MediaImage } from "@/lib/product";

type LightboxProps = {
  images: MediaImage[];
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
};

export function Lightbox({ images, index, onIndexChange, onClose }: LightboxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const close = useCallback(() => onClose(), [onClose]);
  useDialog(true, close, ref);
  const image = images[index];
  const [zoom, setZoom] = useState({ index, scale: 1 });
  const scale = zoom.index === index ? zoom.scale : 1;
  const setScale = (next: number | ((value: number) => number)) => {
    setZoom((current) => {
      const base = current.index === index ? current.scale : 1;
      return { index, scale: typeof next === "function" ? next(base) : next };
    });
  };

  const go = (direction: -1 | 1) => {
    onIndexChange((index + direction + images.length) % images.length);
  };

  return (
    <div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label="Povečan predogled"
      className="fixed inset-0 z-[80] flex flex-col bg-ink/95 text-ivory"
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") go(1);
        if (event.key === "ArrowLeft") go(-1);
      }}
    >
      <div className="flex items-center justify-between px-3 py-2 safe-bottom">
        <p className="pl-2 text-sm text-ivory/80">
          {index + 1} / {images.length}
          <span className="sr-only">, {image.alt}</span>
        </p>
        <div className="flex items-center gap-1">
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full hover:bg-white/10"
            onClick={() => setScale((value) => (value > 1 ? 1 : 1.8))}
            aria-label={scale > 1 ? "Pomanjšaj" : "Povečaj"}
          >
            {scale > 1 ? <ZoomOut className="h-5 w-5" /> : <ZoomIn className="h-5 w-5" />}
          </button>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full hover:bg-white/10"
            onClick={onClose}
            aria-label="Zapri predogled"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="relative min-h-0 flex-1">
        <div className="absolute inset-0 overflow-auto">
          <div
            className="flex min-h-full items-center justify-center p-3"
            style={{ transform: `scale(${scale})`, transformOrigin: "center center" }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              className="h-auto max-h-[78vh] w-auto max-w-full object-contain"
              sizes="100vw"
              priority
            />
          </div>
        </div>
        <button
          type="button"
          className="absolute top-1/2 left-2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10"
          onClick={() => go(-1)}
          aria-label="Prejšnja slika"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          className="absolute top-1/2 right-2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10"
          onClick={() => go(1)}
          aria-label="Naslednja slika"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
