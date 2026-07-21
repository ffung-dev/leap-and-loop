import type { MetadataRoute } from "next";

import { getLocationSlugs } from "@/sanity/lib/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const slugs = await getLocationSlugs();

  const staticRoutes = ["", "/locations", "/events", "/fiber-arts-club", "/contact"].map(
    (path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
    })
  );

  const locationRoutes = slugs.map((slug) => ({
    url: `${baseUrl}/locations/${slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...locationRoutes];
}
