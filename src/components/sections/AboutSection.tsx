import { SectionHeading } from "@/components/ui/SectionHeading";
import { PortableTextRenderer } from "@/components/ui/PortableTextRenderer";
import { RoundedImage } from "@/components/ui/RoundedImage";
import type { Homepage } from "@/types/sanity";

export function AboutSection({ homepage }: { homepage: Homepage }) {
  const { communityHighlight } = homepage;

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeading
            eyebrow={homepage.aboutEyebrow || "Our story"}
            title={homepage.aboutTitle || "Who we are"}
          />
          <div className="mt-6">
            <PortableTextRenderer value={homepage.aboutText} />
          </div>
        </div>

        {communityHighlight && (
          <div className="overflow-hidden rounded-3xl border border-tan-300 bg-white shadow-sm">
            <div className="relative aspect-[16/10] w-full">
              <RoundedImage
                image={communityHighlight.image}
                fallbackAlt={communityHighlight.title}
                rounded="md"
                className="h-full w-full rounded-b-none"
              />
            </div>
            <div className="p-6">
              <p className="text-sm font-semibold uppercase tracking-wide text-pink-600">
                Community involvement
              </p>
              <h3 className="mt-1.5 font-subheading text-xl text-brown-900">
                {communityHighlight.title}
              </h3>
              {communityHighlight.description && (
                <p className="mt-2.5 text-sm leading-relaxed text-brown-600">
                  {communityHighlight.description}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
