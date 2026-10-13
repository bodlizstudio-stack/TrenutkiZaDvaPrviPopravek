export const PRODUCT = {
  id: "100-trenutkov-book",
  name: "100 nepozabnih trenutkov",
  price: 34.99,
  cartImage: "/images/book-intro.png",
} as const;

/** Charged as its own Stripe line item in app/api/checkout. */
export const SHIPPING_EUR = 3.5;

export const SHIPPING_LABEL = "Dostava po Sloveniji";

export type MediaImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  label: string;
};

export const productImages: MediaImage[] = [
  {
    src: "/images/book-intro.png",
    alt: "Odprta knjiga 100 nepozabnih trenutkov: uvod O knjigi in naslovnica s parom na gugalnici",
    width: 1024,
    height: 768,
    label: "Naslovnica",
  },
  {
    src: "/images/book-inside.png",
    alt: "Notranjost knjige, strani 55 in 56: Ljubezen iz gline in Portret ljubezni, s prostorom za fotografijo, datum in zapis",
    width: 1024,
    height: 768,
    label: "Notranjost",
  },
  {
    src: "/images/book-page1.png",
    alt: "Naslovna stran z napisom 100 Nepozabnih trenutkov",
    width: 702,
    height: 934,
    label: "Naslovna stran",
  },
  {
    src: "/images/book-photo-4.jpg",
    alt: "Odprta knjiga na kamniti polici, vidni sta strani Ljubezen iz gline in Portret ljubezni",
    width: 1024,
    height: 764,
    label: "Strani v knjigi",
  },
  {
    src: "/images/book-photo-8.jpg",
    alt: "Zaprta knjiga 100 nepozabnih trenutkov na leseni mizi ob kavi",
    width: 1024,
    height: 764,
    label: "Za mizo",
  },
  {
    src: "/images/book-photo-9.jpg",
    alt: "Knjiga 100 nepozabnih trenutkov na platneni odeji med travo in cvetlicami",
    width: 1024,
    height: 764,
    label: "Na odeji",
  },
  {
    src: "/images/book-photo-6.jpg",
    alt: "Odprta knjiga na leseni ploščadi ob gorskem jezeru",
    width: 1024,
    height: 764,
    label: "Ob jezeru",
  },
  {
    src: "/images/book-photo-1.jpg",
    alt: "Odprta knjiga na klopi ob Blejskem jezeru, na desni strani je naslovnica",
    width: 1024,
    height: 764,
    label: "Bled",
  },
];

export const bookPages: MediaImage[] = [
  productImages[0],
  productImages[1],
  productImages[2],
  productImages[3],
  {
    src: "/images/book-photo-2.jpg",
    alt: "Odprta knjiga na klopi ob jezeru, notranje strani s prostorom za fotografijo",
    width: 1024,
    height: 764,
    label: "Listanje",
  },
];

export function formatPrice(value: number) {
  const [euros, cents] = value.toFixed(2).split(".");
  const grouped = euros.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `${grouped},${cents} \u20ac`;
}

export function unitPrice(item: { id: string; price: number }) {
  return item.id === PRODUCT.id ? PRODUCT.price : item.price;
}
