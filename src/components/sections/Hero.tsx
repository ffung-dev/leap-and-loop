import { Sparkles } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { RoundedImage } from "@/components/ui/RoundedImage";
import { WiggleOnHover } from "@/components/ui/WiggleOnHover";
import type { Homepage } from "@/types/sanity";

export function Hero({ homepage }: { homepage: Homepage }) {
  return (
    <section className="gradient-hero">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:py-24 lg:px-8">
        <div className="max-w-xl">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-green-700 shadow-sm ring-1 ring-pink-200">
            <Sparkles size={15} aria-hidden />
            Handmade with heart
          </span>
          <WiggleOnHover
            as="h1"
            className="font-title text-4xl leading-tight text-brown-900 sm:text-5xl lg:text-6xl"
          >
            {homepage.heroTitle}
          </WiggleOnHover>
          {homepage.heroSubtitle && (
            <p className="mt-5 text-lg leading-relaxed text-brown-600">{homepage.heroSubtitle}</p>
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
