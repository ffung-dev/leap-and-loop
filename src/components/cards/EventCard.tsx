import { Calendar, MapPin } from "lucide-react";

import { RoundedImage } from "@/components/ui/RoundedImage";
import { EVENT_TYPE_COLORS, EVENT_TYPE_LABELS, formatEventDate, formatEventTime, isPastEvent } from "@/lib/format";
import { toPlainText } from "@/lib/portableText";
import { cn } from "@/lib/utils";
import type { EventDoc } from "@/types/sanity";

export function EventCard({ event }: { event: EventDoc }) {
  const locationLabel = event.location?.name || event.locationNote;
  const past = isPastEvent(event.date);

  return (
    <article
      id={event._id}
      className={cn(
        "group flex scroll-mt-28 flex-col overflow-hidden rounded-3xl border border-tan-200 bg-white shadow-sm transition-shadow hover:shadow-md",
        past && "opacity-70"
      )}
    >
      <div className="relative aspect-[4/3] w-full">
        <RoundedImage image={event.images?.[0]} fallbackAlt={event.title} rounded="md" className="h-full w-full rounded-b-none" />
        <span
          className={cn(
            "absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold shadow-sm",
            EVENT_TYPE_COLORS[event.eventType]
          )}
        >
          {EVENT_TYPE_LABELS[event.eventType]}
        </span>
        {past && (
          <span className="absolute right-3 top-3 rounded-full bg-brown-800/80 px-3 py-1 text-xs font-semibold text-white">
            Past
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="font-display text-lg text-brown-900">{event.title}</h3>

        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-brown-500">
          <span className="flex items-center gap-1.5">
            <Calendar size={14} aria-hidden />
            {formatEventDate(event.date)} &middot; {formatEventTime(event.date)}
          </span>
          {locationLabel && (
            <span className="flex items-center gap-1.5">
              <MapPin size={14} aria-hidden />
              {locationLabel}
            </span>
          )}
        </div>

        {event.description && (
          <p className="mt-1 text-sm leading-relaxed text-brown-600">
            {toPlainText(event.description, 140)}
          </p>
        )}
      </div>
    </article>
  );
}
