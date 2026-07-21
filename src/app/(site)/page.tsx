import type { Metadata } from "next";

import { AboutSection } from "@/components/sections/AboutSection";
import { ExploreCta } from "@/components/sections/ExploreCta";
import { FeaturedEvents } from "@/components/sections/FeaturedEvents";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Hero } from "@/components/sections/Hero";
import { buildMetadata } from "@/lib/seo";
import { getHomepage, getUpcomingEvents } from "@/sanity/lib/data";
import type { Homepage } from "@/types/sanity";

const FALLBACK_DESCRIPTION =
  "Leap & Loop is a teen-run crochet business creating handmade accessories, custom commissions, and community fiber arts events on Long Island.";

export async function generateMetadata(): Promise<Metadata> {
  const homepage = await getHomepage();
  return buildMetadata({
    seo: homepage?.seo,
    fallbackTitle: "Leap & Loop | Handmade crochet, made by teens",
    fallbackDescription: homepage?.heroSubtitle || FALLBACK_DESCRIPTION,
    path: "/",
  });
}

export default async function HomePage() {
  const [homepage, upcomingEvents] = await Promise.all([getHomepage(), getUpcomingEvents()]);

  const fallbackHomepage: Homepage = {
    heroTitle: "Handmade crochet, made with heart by teens",
    heroSubtitle:
      "Leap & Loop crafts one-of-a-kind crochet accessories and custom commissions while giving back through workshops and community fiber arts events.",
  };

  const home = homepage ?? fallbackHomepage;

  return (
    <>
      <Hero homepage={home} />
      <AboutSection homepage={home} />
      {home.featuredProjects && <FeaturedProjects projects={home.featuredProjects} />}
      <FeaturedEvents events={upcomingEvents} />
      <ExploreCta />
    </>
  );
}
