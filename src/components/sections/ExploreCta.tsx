import { Heart, Mail, MapPin } from "lucide-react";
import Link from "next/link";

import type { ExploreCardContent } from "@/types/sanity";

type ExploreCtaProps = {
  title?: string;
  locationsCard?: ExploreCardContent;
  fiberArtsCard?: ExploreCardContent;
  contactCard?: ExploreCardContent;
};

export function ExploreCta({ title, locationsCard, fiberArtsCard, contactCard }: ExploreCtaProps) {
  const cards = [
    {
      href: "/locations",
      icon: MapPin,
      title: locationsCard?.title || "Find a location",
      description: locationsCard?.description || "See where to find our work in person and when we're there.",
    },
    {
      href: "/fiber-arts-club",
      icon: Heart,
      title: fiberArtsCard?.title || "GNSHS Fiber Arts Club",
      description: fiberArtsCard?.description || "Meet the school club behind Leap & Loop and get involved.",
    },
    {
      href: "/contact",
      icon: Mail,
      title: contactCard?.title || "Say hello",
      description: contactCard?.description || "Have a commission idea or a question? We'd love to hear it.",
    },
  ];

  return (
    <section className="gradient-card border-t border-tan-300">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="font-subheading text-3xl text-brown-900 sm:text-4xl">{title || "Keep exploring"}</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {cards.map(({ href, icon: Icon, title: cardTitle, description }) => (
            <Link
              key={href}
              href={href}
              className="group flex flex-col gap-3 rounded-3xl border border-tan-300 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-green-100 text-green-700">
                <Icon size={20} aria-hidden />
              </span>
              <h3 className="font-subheading text-lg text-brown-900">{cardTitle}</h3>
              <p className="text-sm text-brown-600">{description}</p>
              <span className="mt-auto text-sm font-semibold text-green-700 group-hover:underline">
                Explore &rarr;
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
