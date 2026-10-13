export const siteName = "Trenutki za dva";

/**
 * Canonical origin. Set NEXT_PUBLIC_APP_URL when a custom domain replaces
 * the current Vercel address.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_APP_URL || "https://trenutkizadva.vercel.app"
).replace(/\/$/, "");

export const contactEmail = "info@trenutkizadva.si";

export const mainNav = [
  { name: "Domov", href: "/" },
  { name: "Knjiga", href: "/100-nepozabnih-trenutkov" },
  { name: "O nas", href: "/o-nas" },
  { name: "Kontakt", href: "/kontakt" },
] as const;

export const purchasePaths = ["/100-nepozabnih-trenutkov"];

export function isActivePath(pathname: string, href: string) {
  if (href.startsWith("/#")) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
