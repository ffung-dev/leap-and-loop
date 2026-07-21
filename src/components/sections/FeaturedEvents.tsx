import { CalendarHeart } from "lucide-react";

import { EventCard } from "@/components/cards/EventCard";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { EventDoc } from "@/types/sanity";

export function FeaturedEvents({ events }: { events: EventDoc[] }) {
  return (
    <section className="bg-tan-100 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow="What's next" title="Upcoming events" />
          <Button href="/events" variant="secondary">
            See all events
          </Button>
        </div>

        {events.length > 0 ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        ) : (
          <div className="mt-10 flex flex-col items-center gap-3 rounded-3xl border border-dashed border-tan-400 bg-white px-6 py-14 text-center">
            <CalendarHeart className="text-tan-400" size={32} aria-hidden />
            <p className="text-brown-500">
              No upcoming events right now — check back soon or follow us for updates!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
