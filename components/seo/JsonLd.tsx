import { PRODUCT, productImages } from "@/lib/product";
import { siteName, siteUrl } from "@/lib/site";

export function WebsiteJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: siteUrl,
    inLanguage: "sl-SI",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function ProductJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: PRODUCT.name,
    description:
      "Fizična knjiga za pare s 100 idejami za zmenke ter prostorom za fotografije, datum in osebne zapiske.",
    image: productImages.slice(0, 4).map((image) => `${siteUrl}${image.src}`),
    brand: {
      "@type": "Brand",
      name: siteName,
    },
    sku: PRODUCT.id,
    offers: {
      "@type": "Offer",
      url: `${siteUrl}/100-nepozabnih-trenutkov`,
      priceCurrency: "EUR",
      price: PRODUCT.price.toFixed(2),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
