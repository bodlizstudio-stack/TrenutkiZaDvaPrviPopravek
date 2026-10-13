"use client";

import { useRef, useState, type AnimationEvent } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { flipPages, type FlipPage } from "@/lib/flipPages";

function PageFace({ page }: { page: FlipPage }) {
  return (
    <Image
      src={page.src}
      alt=""
      fill
      draggable={false}
      sizes="(max-width: 1024px) 90vw, 420px"
      className="object-cover"
    />
  );
}

export function BookFlip() {
  const [index, setIndex] = useState(0);
  const [turn, setTurn] = useState<{ dir: 1 | -1; from: number } | null>(null);
  const start = useRef<{ x: number; y: number } | null>(null);
  const sound = useRef<HTMLAudioElement | null>(null);
  const timer = useRef<number | null>(null);
  const page = flipPages[index];
  const left = index > 0 ? flipPages[index - 1] : null;

  const play = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!sound.current) {
      sound.current = new Audio("/sounds/page-flip.mp3");
      sound.current.volume = 0.35;
    }
    sound.current.currentTime = 0;
    sound.current.play().catch(() => undefined);
  };

  const settle = (from: number, dir: 1 | -1) => {
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = null;
    setIndex(from + dir);
    setTurn(null);
  };

  const go = (dir: 1 | -1) => {
    if (turn) return;
    const next = index + dir;
    if (next < 0 || next >= flipPages.length) return;
    play();
    const from = index;
    setTurn({ dir, from });
    timer.current = window.setTimeout(() => settle(from, dir), 760);
  };

  const finish = (event: AnimationEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget || !turn) return;
    settle(turn.from, turn.dir);
  };

  const destination = turn ? flipPages[turn.from + turn.dir] : page;
  const front = turn ? flipPages[turn.dir === 1 ? turn.from : turn.from - 1] : null;
  const back = turn ? flipPages[turn.dir === 1 ? turn.from + 1 : turn.from] : null;

  return (
    <div>
      <div
        className="mx-auto flex max-w-5xl touch-pan-y items-stretch justify-center"
        onPointerDown={(event) => {
          if (event.pointerType === "mouse" && event.button !== 0) return;
          start.current = { x: event.clientX, y: event.clientY };
        }}
        onPointerUp={(event) => {
          if (!start.current) return;
          const dx = event.clientX - start.current.x;
          const dy = event.clientY - start.current.y;
          start.current = null;
          if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy)) return;
          go(dx < 0 ? 1 : -1);
        }}
        onPointerCancel={() => {
          start.current = null;
        }}
      >
        <div className="relative hidden aspect-[744/1043] h-[min(68svh,620px)] overflow-hidden rounded-l-md border border-r-0 border-[#e4d6c6] bg-[#f3ebe0] shadow-soft lg:block">
          {left ? (
            <PageFace page={left} />
          ) : (
            <div className="h-full w-full bg-[#f3ebe0]" />
          )}
          <span className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-black/10 to-transparent" />
        </div>

        <div
          className="book-leaf relative aspect-[744/1043] h-[min(62svh,620px)] w-auto max-w-[92vw] [perspective:1400px] lg:h-[min(68svh,620px)] lg:max-w-none"
          tabIndex={0}
          role="group"
          aria-label="Predogled knjige. Uporabite puščici, da obrnete stran."
          onKeyDown={(event) => {
            if (event.key === "ArrowRight") {
              event.preventDefault();
              go(1);
            }
            if (event.key === "ArrowLeft") {
              event.preventDefault();
              go(-1);
            }
          }}
        >
          <div className="absolute inset-0 overflow-hidden rounded-r-md border border-[#e4d6c6] bg-[#f3ebe0] shadow-soft lg:rounded-l-none">
            {destination ? <PageFace page={destination} /> : null}
            <span className="page-stack" aria-hidden />
            <span className="page-spine" aria-hidden />
          </div>

          {turn && front && back ? (
            <div
              className={turn.dir === 1 ? "book-sheet turn-next" : "book-sheet turn-prev"}
              onAnimationEnd={finish}
            >
              <div className="book-face front">
                <PageFace page={front} />
              </div>
              <div className="book-face back">
                <PageFace page={back} />
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <div className="mx-auto mt-4 flex max-w-md items-center justify-between gap-3">
        <button
          type="button"
          className="inline-flex h-11 min-w-11 items-center justify-center gap-1 rounded-full border border-line bg-white px-3 text-sm text-ink disabled:opacity-40"
          onClick={() => go(-1)}
          disabled={index === 0 || turn !== null}
          aria-label="Prejšnja stran"
        >
          <ChevronLeft className="h-5 w-5" />
          <span className="pr-1">Nazaj</span>
        </button>
        <p className="text-sm text-muted" aria-live="polite">
          {page.label}
          <span className="sr-only">, </span>
          <span aria-hidden> · </span>
          {index + 1} / {flipPages.length}
        </p>
        <button
          type="button"
          className="inline-flex h-11 min-w-11 items-center justify-center gap-1 rounded-full border border-line bg-white px-3 text-sm text-ink disabled:opacity-40"
          onClick={() => go(1)}
          disabled={index === flipPages.length - 1 || turn !== null}
          aria-label="Naslednja stran"
        >
          <span className="pl-1">Naprej</span>
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
      <p className="mt-3 text-center text-xs text-muted">
        Obrnite stran s prstom, miško ali puščicama. To je predogled odprtja knjige, ne vseh sto zmenkov.
      </p>
      <p className="sr-only">{page.alt}</p>
    </div>
  );
}
