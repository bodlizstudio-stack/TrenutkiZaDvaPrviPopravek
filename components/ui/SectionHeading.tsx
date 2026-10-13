import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  text?: string;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2";
};

export function SectionHeading({
  eyebrow,
  title,
  text,
  align = "center",
  className,
  as = "h2",
}: SectionHeadingProps) {
  const Title = as;
  return (
    <header
      className={cn(
        "rise max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {eyebrow ? <p className="eyebrow mb-3">{eyebrow}</p> : null}
      <Title className="text-[clamp(1.75rem,4vw,3rem)] text-ink">{title}</Title>
      {text ? (
        <p className="mt-3 text-[15px] leading-relaxed text-muted md:text-base">{text}</p>
      ) : null}
    </header>
  );
}
