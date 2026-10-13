export type FlipPage = {
  src: string;
  alt: string;
  label: string;
};

/** Opening of the printed book, rendered from the real pages. Not the full set of 100 dates. */
export const flipPages: FlipPage[] = [
  {
    src: "/images/flip/page-01.jpg",
    alt: "Naslovna stran knjige: 100 Nepozabnih trenutkov",
    label: "Naslovnica",
  },
  {
    src: "/images/flip/page-02.jpg",
    alt: "Kazalo knjige z razdelki od zime do prostora za vajine ideje",
    label: "Kazalo",
  },
  {
    src: "/images/flip/page-03.jpg",
    alt: "Uvodni zapis: knjiga je vajin dnevnik in zbirka spominov",
    label: "Uvod",
  },
  {
    src: "/images/flip/page-04.jpg",
    alt: "Stran To sva midva, s prostorom za fotografijo in kratke odgovore",
    label: "To sva midva",
  },
  {
    src: "/images/flip/page-05.jpg",
    alt: "Razdelilna stran z napisom Zima",
    label: "Zima",
  },
  {
    src: "/images/flip/page-06.jpg",
    alt: "Stran zmenka Midva v beli različici, s prostorom za datum, lokacijo, fotografijo in zapis",
    label: "Midva v beli različici",
  },
  {
    src: "/images/flip/page-07.jpg",
    alt: "Stran zmenka Skupaj na smučkah",
    label: "Skupaj na smučkah",
  },
  {
    src: "/images/flip/page-08.jpg",
    alt: "Stran zmenka Skupaj na konju iz razdelka Pomlad",
    label: "Skupaj na konju",
  },
  {
    src: "/images/flip/page-09.jpg",
    alt: "Stran zmenka Modna avantura",
    label: "Modna avantura",
  },
];
