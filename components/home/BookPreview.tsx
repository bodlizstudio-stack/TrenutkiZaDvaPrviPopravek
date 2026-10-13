import { BookFlip } from "@/components/home/BookFlip";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export function BookPreview() {
  return (
    <section id="predogled" className="reveal scroll-mt-24 bg-ivory py-14 md:py-20">
      <div className="container-wide">
        <SectionHeading
          eyebrow="Notranjost"
          title="Poglejta, kako se začne vajina zgodba."
          text="Obrnite stran in poglejte, kako je knjiga narejena."
        />
        <div className="mt-8 min-w-0">
          <BookFlip />
        </div>
        <div className="mt-6 text-center">
          <Button asChild size="lg">
            <a href="#nakup">Želiva ustvariti svojo zgodbo</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
