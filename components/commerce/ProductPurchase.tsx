"use client";

import { useState } from "react";
import { AddToCartButton } from "@/components/commerce/AddToCartButton";
import { ProductGallery } from "@/components/commerce/ProductGallery";
import { QuantitySelector } from "@/components/commerce/QuantitySelector";
import { formatPrice, PRODUCT, productImages, SHIPPING_EUR, SHIPPING_LABEL } from "@/lib/product";

type ProductPurchaseProps = {
  titleAs?: "h1" | "h2";
  priority?: boolean;
  id?: string;
};

export function ProductPurchase({
  titleAs = "h2",
  priority = false,
  id = "nakup",
}: ProductPurchaseProps) {
  const [quantity, setQuantity] = useState(1);
  const Title = titleAs;
  const price = formatPrice(PRODUCT.price);

  return (
    <section id={id} className="scroll-mt-24 bg-ivory py-14 md:py-20">
      <div className="container-wide grid min-w-0 items-start gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14">
        <ProductGallery images={productImages} priority={priority} />

        <div className="min-w-0">
          <p className="eyebrow">Fizična knjiga za pare</p>
          <Title className="mt-3 text-[clamp(2rem,4vw,3.25rem)] text-ink">
            {PRODUCT.name}
          </Title>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted md:text-base">
            Sto idej za skupna doživetja, ob vsaki pa prostor za fotografijo in vajin zapis.
            Knjiga z uporabo postane zbirka vajinih spominov.
          </p>

          <p className="mt-6 font-serif text-4xl text-ink">{price}</p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <QuantitySelector value={quantity} onChange={setQuantity} />
            <div data-purchase-cta className="min-w-[12rem] flex-1">
              <AddToCartButton
                quantity={quantity}
                label={`Dodaj v košarico — ${price}`}
                className="w-full"
              />
            </div>
          </div>

          <ul className="mt-6 space-y-2 border-t border-line pt-5 text-sm text-muted">
            <li>{SHIPPING_LABEL}: {formatPrice(SHIPPING_EUR)}</li>
            <li>Visa, Mastercard, American Express ali PayPal prek Stripe</li>
            <li>Naslov za dostavo vnesete na varni blagajni</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
