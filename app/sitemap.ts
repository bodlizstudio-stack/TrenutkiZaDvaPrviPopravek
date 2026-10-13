import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

const paths = [
  "/",
  "/100-nepozabnih-trenutkov",
  "/trgovina",
  "/o-nas",
  "/kontakt",
  "/dostava",
  "/vracila",
  "/pogosta-vprasanja",
  "/splosni-pogoji",
  "/politika-zasebnosti",
  "/piskotki",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return paths.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" || path === "/100-nepozabnih-trenutkov" ? 1 : 0.6,
  }));
}
