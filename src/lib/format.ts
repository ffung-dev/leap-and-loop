import type { EventTypeColor } from "@/types/sanity";

// Tailwind needs full literal class names to statically detect them, so this
// maps each Studio-selectable color option to a fixed, complete class string.
export const EVENT_TYPE_COLOR_CLASSES: Record<EventTypeColor, string> = {
  green: "bg-green-600 text-white",
  brown: "bg-brown-600 text-white",
  tan: "bg-tan-600 text-white",
  pink: "bg-pink-600 text-white",
};

// Event dates are date-only ("YYYY-MM-DD"). `new Date(dateOnlyString)` parses
// as UTC midnight, which can shift a day in either direction depending on the
// viewer's timezone — parse the parts directly into a local-midnight Date instead.
export function parseEventDate(dateOnly: string) {
  const [year, month, day] = dateOnly.split("-").map(Number);
  return new Date(year, month - 1, day);
}

const eventDateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

export function formatEventDate(dateOnly: string, endDateOnly?: string) {
  const start = parseEventDate(dateOnly);
  if (endDateOnly && endDateOnly !== dateOnly) {
    return eventDateFormatter.formatRange(start, parseEventDate(endDateOnly));
  }
  return eventDateFormatter.format(start);
}

export function isPastEvent(dateOnly: string, endDateOnly?: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const effectiveEnd = endDateOnly ? parseEventDate(endDateOnly) : parseEventDate(dateOnly);
  return effectiveEnd.getTime() < today.getTime();
}
