import { Button } from "@/components/ui/Button";
import { RoundedImage } from "@/components/ui/RoundedImage";
import { HeroTitle } from "@/components/sections/HeroTitle";
import type { Homepage } from "@/types/sanity";

export function Hero({ homepage }: { homepage: Homepage }) {
  return (
    <section className="gradient-hero">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:py-24 lg:px-8">
        <div>
          <HeroTitle text={homepage.heroTitle} className="font-title leading-none text-brown-900" />
          {homepage.heroSubtitle && (
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-brown-600">{homepage.heroSubtitle}</p>
          )}
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={homepage.heroCtaLink || "/events"} size="lg">
              {homepage.heroCtaLabel || "See what we're making"}
            </Button>
            <Button href="/contact" variant="secondary" size="lg">
              Get in touch
            </Button>
          </div>
        </div>

        <div className="relative aspect-[4/3] w-full lg:aspect-square">
          <RoundedImage
            image={homepage.heroImage}
            fallbackAlt={homepage.heroTitle}
            rounded="3xl"
            priority
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="shadow-lg shadow-brown-900/10"
          />
        </div>
      </div>
    </section>
  );
}
