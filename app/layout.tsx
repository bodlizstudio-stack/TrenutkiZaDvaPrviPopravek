import type { Metadata, Viewport } from "next";
import { Great_Vibes, Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileStickyPurchaseBar } from "@/components/commerce/MobileStickyPurchaseBar";
import { PageTurn } from "@/components/motion/PageTurn";
import { ReadingRibbon } from "@/components/motion/ReadingRibbon";
import { WebsiteJsonLd } from "@/components/seo/JsonLd";
import { siteName, siteUrl } from "@/lib/site";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  variable: "--font-playfair",
  display: "swap",
});

const script = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-script",
  display: "swap",
});

const description =
  "Fizična knjiga za pare: 100 idej za zmenke, prostor za fotografije in zapiske. Ustvarita knjigo vajinih spominov. 34,99 €.";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#F6F1E8",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | 100 nepozabnih trenutkov`,
    template: `%s | ${siteName}`,
  },
  description,
  applicationName: siteName,
  authors: [{ name: siteName }],
  openGraph: {
    type: "website",
    locale: "sl_SI",
    siteName,
    title: `${siteName} | 100 nepozabnih trenutkov`,
    description,
    images: [
      {
        url: "/images/book-photo-8.jpg",
        width: 1024,
        height: 764,
        alt: "Knjiga 100 nepozabnih trenutkov na leseni mizi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} | 100 nepozabnih trenutkov`,
    description,
    images: ["/images/book-photo-8.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="sl"
      className={`${inter.variable} ${playfair.variable} ${script.variable}`}
    >
      <body className="flex min-h-screen flex-col bg-ivory font-sans text-ink antialiased">
        <WebsiteJsonLd />
        <a
          href="#vsebina"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[90] focus:rounded-full focus:bg-white focus:px-4 focus:py-2"
        >
          Preskoči na vsebino
        </a>
        <PageTurn />
        <Header />
        <ReadingRibbon />
        <main id="vsebina" className="flex-1 pt-14">
          {children}
        </main>
        <Footer />
        <CartDrawer />
        <MobileStickyPurchaseBar />
      </body>
    </html>
  );
}
