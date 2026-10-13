export const faqs = [
  {
    q: "Kaj vsebuje knjiga?",
    a: "100 različnih idej za zmenke in skupne aktivnosti. Ob aktivnosti je prostor za datum, lokacijo, fotografijo in zapis najlepšega trenutka. Na posnetkih notranjosti sta med drugim strani Ljubezen iz gline in Portret ljubezni.",
  },
  {
    q: "Za kakšne pare je primerna?",
    a: "Za pare, ki si želita več skupnega časa: za tiste, ki se šele spoznavata, in za tiste, ki že dolgo delita vsakdan in želita razbiti rutino.",
  },
  {
    q: "Ali so zmenki primerni tudi za manjši proračun?",
    a: "Veliko idej je preprostih in jih lahko izvedeta doma ali v bližini. Nekatere zahtevajo malo več načrtovanja. Knjiga ne določa enotnega zneska za posamezen zmenek.",
  },
  {
    q: "Ali lahko zmenke izvajava v poljubnem vrstnem redu?",
    a: "Da. Knjigo lahko odpreta na kateri koli strani in izbereta idejo glede na čas, vreme ali razpoloženje.",
  },
  {
    q: "Ali ima knjiga prostor za fotografije?",
    a: "Da. Na notranjih straneh je okvir za fotografijo ter vrstice za datum, lokacijo in najlepši trenutek.",
  },
  {
    q: "Ali je primerna za darilo?",
    a: "Da. Podarite jo lahko za obletnico, rojstni dan, Valentinovo ali brez posebnega razloga. Ločenega darilnega zavijanja ali posvetila v naročilu ni.",
  },
  {
    q: "Kakšna je dostava?",
    a: "Knjigo pošljemo po Sloveniji. Na blagajni se dostavi prišteje 3,50 €. Naslov in telefon vnesete na varni strani Stripe. Rok dostave na strani ni objavljen.",
  },
  {
    q: "Kako lahko plačam?",
    a: "Plačilo teče prek Stripe, s kartico ali PayPalom. Podatkov o kartici ne shranjujemo na tej strani.",
  },
] as const;

export const steps = [
  {
    num: "01",
    title: "Izberita zmenek",
    text: "Odprita knjigo in izberita eno izmed 100 idej.",
    image: "/images/book-intro.png",
    alt: "Odprta knjiga z naslovnico 100 nepozabnih trenutkov",
    width: 1024,
    height: 768,
  },
  {
    num: "02",
    title: "Doživita ga skupaj",
    text: "Odpravita se na dogodivščino ali ostaneta pri preprostem trenutku doma.",
    image: "/images/book-photo-6.jpg",
    alt: "Knjiga na leseni ploščadi ob gorskem jezeru",
    width: 1024,
    height: 764,
  },
  {
    num: "03",
    title: "Shranita spomin",
    text: "Dodajta fotografijo, datum in zapis, ki vaju bo še dolgo spominjal na ta dan.",
    image: "/images/book-inside.png",
    alt: "Stran knjige s prostorom za fotografijo in zapis najlepšega trenutka",
    width: 1024,
    height: 768,
  },
] as const;

export const dateExamples = [
  {
    id: "doma",
    label: "Doma in sproščeno",
    title: "Večer brez načrta",
    text: "Del knjige so tudi tihi, preprosti trenutki, ki ne zahtevajo izleta. To je razpoloženjski primer, ne natančen naslov strani.",
    badge: "Ilustrativni primer",
    image: "/images/book-photo-8.jpg",
    alt: "Zaprta knjiga na kavarniški mizi",
    width: 1024,
    height: 764,
  },
  {
    id: "ustvarjalno",
    label: "Ustvarjalno",
    title: "Ljubezen iz gline",
    text: "Stran iz knjige vaju povabi k ustvarjanju iz gline. Zraven je Portret ljubezni. Obe imata prostor za fotografijo, datum, lokacijo in zapis.",
    badge: "Stran iz knjige",
    image: "/images/book-inside.png",
    alt: "Strani Ljubezen iz gline in Portret ljubezni",
    width: 1024,
    height: 768,
  },
  {
    id: "pustolovsko",
    label: "Pustolovsko",
    title: "Dan zunaj",
    text: "Med idejami so tudi doživetja, ki vaju popeljejo ven iz rutine. To je razpoloženjski primer, ne zagotovljen naslov posamezne strani.",
    badge: "Ilustrativni primer",
    image: "/images/book-photo-6.jpg",
    alt: "Knjiga v naravi ob jezeru in gorah",
    width: 1024,
    height: 764,
  },
] as const;
