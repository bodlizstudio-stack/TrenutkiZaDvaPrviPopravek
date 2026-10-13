import type { Metadata } from "next";
import { Suspense } from "react";
import { OrderSuccess } from "@/components/commerce/OrderSuccess";

export const metadata: Metadata = {
  title: "Naročilo sprejeto",
  robots: { index: false, follow: false },
};

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-[50vh] bg-ivory" />}>
      <OrderSuccess />
    </Suspense>
  );
}
