"use client";

import { Minus, Plus } from "lucide-react";

type QuantitySelectorProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
};

export function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 10,
}: QuantitySelectorProps) {
  return (
    <div className="inline-flex items-center rounded-full border border-line bg-white">
      <button
        type="button"
        className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink disabled:opacity-40"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="Zmanjšaj količino"
      >
        <Minus className="h-4 w-4" />
      </button>
      <span className="min-w-8 text-center text-sm font-medium tabular-nums" aria-live="polite">
        <span className="sr-only">Količina </span>
        {value}
      </span>
      <button
        type="button"
        className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink disabled:opacity-40"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label="Povečaj količino"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}
