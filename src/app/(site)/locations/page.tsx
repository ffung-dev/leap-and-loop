import { MapPinned } from "lucide-react";
import type { Metadata } from "next";

import { LocationCard } from "@/components/cards/LocationCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buildMetadata } from "@/lib/seo";
import { getLocationsIndex, getSiteSettings } from "@/sanity/lib/data";

export function generateMetadata(): Metadata {
  return buildMetadata({
    fallbackTitle: "Locations",
    fallbackDescription: "Find Leap & Loop at these Long Island locations.",
    path: "/locations",
  });
}

export default async function LocationsPage() {
  const [locations, siteSettings] = await Promise.all([getLocationsIndex(), getSiteSettings()]);

  return (
    <div className="gradient-hero">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow={siteSettings?.locationsEyebrow || "Find us"}
          title={siteSettings?.locationsPageTitle || "Our locations"}
          description={
            siteSettings?.locationsPageDescription ||
            "Every place you can find Leap & Loop in person — pick one to see photos, hours, and details."
          }
        />

        {locations.length > 0 ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {locations.map((location) => (
              <LocationCard key={location._id} location={location} />
            ))}
          </div>
        ) : (
          <div className="mt-10 flex flex-col items-center gap-3 rounded-3xl border border-dashed border-tan-400 bg-white px-6 py-14 text-center">
            <MapPinned className="text-tan-400" size={32} aria-hidden />
            <p className="text-brown-500">Locations are coming soon — check back shortly!</p>
          </div>
        )}
      </div>
    </div>
  );
}
