"use client";

import { CalendarX2 } from "lucide-react";
import { useMemo, useState } from "react";

import { EventCard } from "@/components/cards/EventCard";
import { EVENT_TYPE_LABELS } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { EventDoc, EventType } from "@/types/sanity";

const FILTERS: { label: string; value: EventType | "all" }[] = [
  { label: "All", value: "all" },
  ...(Object.entries(EVENT_TYPE_LABELS) as [EventType, string][]).map(([value, label]) => ({
    label,
    value,
  })),
];

export function EventsExplorer({ events }: { events: EventDoc[] }) {
  const [filter, setFilter] = useState<EventType | "all">("all");
  // Computed once at mount (not on every render) so filtering stays a pure function of props/state.
  const [now] = useState(() => Date.now());

  const { upcoming, past } = useMemo(() => {
    const filtered = events.filter((e) => filter === "all" || e.eventType === filter);
    return {
      upcoming: filtered
        .filter((e) => new Date(e.date).getTime() >= now)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()),
      past: filtered
        .filter((e) => new Date(e.date).getTime() < now)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    };
  }, [events, filter, now]);

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter events by type">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            type="button"
            onClick={() => setFilter(f.value)}
            aria-pressed={filter === f.value}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-colors",
              filter === f.value
                ? "bg-green-600 text-white"
                : "bg-white text-brown-700 ring-1 ring-tan-300 hover:bg-tan-50"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <section className="mt-10">
        <h2 className="font-display text-2xl text-brown-900">Upcoming</h2>
        {upcoming.length > 0 ? (
          <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {upcoming.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        ) : (
          <EmptyState message="No upcoming events match this filter yet." />
        )}
      </section>

      <section className="mt-14">
        <h2 className="font-display text-2xl text-brown-900">Past events</h2>
        {past.length > 0 ? (
          <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {past.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        ) : (
          <EmptyState message="No past events to show yet." />
        )}
      </section>
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="mt-5 flex flex-col items-center gap-3 rounded-3xl border border-dashed border-tan-300 bg-white px-6 py-12 text-center">
      <CalendarX2 className="text-tan-400" size={28} aria-hidden />
      <p className="text-brown-500">{message}</p>
    </div>
  );
}
