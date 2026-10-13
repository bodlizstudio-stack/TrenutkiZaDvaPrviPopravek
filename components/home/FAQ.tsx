"use client";

import { useId, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { faqs } from "@/lib/content";
import { cn } from "@/lib/utils";

type FAQProps = {
  showHeading?: boolean;
};

export function FAQ({ showHeading = true }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();

  return (
    <section id="vprasanja" className="reveal scroll-mt-24 bg-white py-14 md:py-20">
      <div className="container-wide max-w-3xl">
        {showHeading ? (
          <h2 className="text-center text-[clamp(1.75rem,4vw,3rem)] text-ink">
            Pogosta vprašanja
          </h2>
        ) : null}
        <div className={cn("space-y-3", showHeading && "mt-8")}>
          {faqs.map((faq, index) => {
            const open = openIndex === index;
            const panelId = `${baseId}-panel-${index}`;
            const buttonId = `${baseId}-button-${index}`;
            return (
              <div key={faq.q} className="rounded-2xl border border-line bg-ivory">
                <h3 className="font-sans text-base font-medium">
                  <button
                    id={buttonId}
                    type="button"
                    className="flex min-h-12 w-full items-center justify-between gap-4 px-4 py-3 text-left text-ink"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(open ? null : index)}
                  >
                    <span>{faq.q}</span>
                    {open ? (
                      <Minus className="h-5 w-5 shrink-0 text-burgundy" aria-hidden />
                    ) : (
                      <Plus className="h-5 w-5 shrink-0 text-burgundy" aria-hidden />
                    )}
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  aria-hidden={!open}
                  inert={!open}
                  className={cn(
                    "grid transition-[grid-template-rows,opacity] duration-300 ease-out",
                    open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  )}
                >
                  <div
                    className={cn(
                      "overflow-hidden px-4 text-sm leading-relaxed text-muted",
                      open ? "pb-4" : "pb-0"
                    )}
                  >
                    {faq.a}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
