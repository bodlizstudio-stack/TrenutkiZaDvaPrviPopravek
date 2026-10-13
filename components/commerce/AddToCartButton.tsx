"use client";

import { useState } from "react";
import { Button, type ButtonProps } from "@/components/ui/Button";
import { PRODUCT } from "@/lib/product";
import { useCartStore } from "@/store/cartStore";

type AddToCartButtonProps = {
  quantity?: number;
  label?: string;
  className?: string;
  size?: ButtonProps["size"];
  variant?: ButtonProps["variant"];
};

export function AddToCartButton({
  quantity = 1,
  label = "Dodaj v košarico",
  className,
  size = "lg",
  variant = "default",
}: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  const handleClick = () => {
    if (busy) return;
    setBusy(true);
    addItem({
      id: PRODUCT.id,
      name: PRODUCT.name,
      price: PRODUCT.price,
      quantity,
      image: PRODUCT.cartImage,
    });
    setMessage(
      quantity > 1
        ? `${quantity}× ${PRODUCT.name} je v košarici.`
        : `${PRODUCT.name} je v košarici.`
    );
    window.setTimeout(() => setBusy(false), 450);
  };

  return (
    <>
      <Button
        type="button"
        size={size}
        variant={variant}
        className={className}
        onClick={handleClick}
        disabled={busy}
        aria-busy={busy}
      >
        {busy ? "Dodajam …" : label}
      </Button>
      <span className="sr-only" aria-live="polite">
        {message}
      </span>
    </>
  );
}
