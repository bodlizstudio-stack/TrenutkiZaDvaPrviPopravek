import { AddToCartButton } from "@/components/commerce/AddToCartButton";
import { Button } from "@/components/ui/Button";
import { formatPrice, PRODUCT } from "@/lib/product";

export function FinalCTA() {
  const price = formatPrice(PRODUCT.price);

  return (
    <section className="reveal bg-ink py-16 text-ivory md:py-24">
      <div className="container-wide max-w-3xl text-center">
        <h2 className="text-[clamp(1.9rem,4.5vw,3.4rem)] text-ivory">
          Naslednji skupni trenutek lahko začneta z eno knjigo.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-ivory/75">
          {PRODUCT.name} — {price}. Ideje, fotografije in zapiski ostanejo v isti knjigi.
        </p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <div data-purchase-cta>
            <AddToCartButton label={`Naroči knjigo — ${price}`} variant="light" />
          </div>
          <Button asChild variant="outline" size="lg" className="border-ivory/30 text-ivory hover:bg-white/10">
            <a href="#predogled">Prelistaj knjigo</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
