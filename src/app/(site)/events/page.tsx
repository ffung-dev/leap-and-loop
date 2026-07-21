import type { Metadata } from "next";

import { EventsExplorer } from "@/components/sections/EventsExplorer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buildMetadata } from "@/lib/seo";
import { getEvents } from "@/sanity/lib/data";

export function generateMetadata(): Metadata {
  return buildMetadata({
    fallbackTitle: "Events",
    fallbackDescription:
      "Workshops, markets, pop-ups, and community service events from Leap & Loop.",
    path: "/events",
  });
}

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <div>
      <div className="gradient-hero">
        <div className="mx-auto px-4 py-14 sm:px-6 lg:px-8">
          <SectionHeading
            as="h1"
            eyebrow="Get involved"
            title="Events"
            description="Workshops, markets, pop-ups, and community service — see what we're up to and where to find us next."
          />
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <EventsExplorer events={events} />
      </div>
    </div>
  );
}
