import type { EventTypeColor } from "@/types/sanity";

// Tailwind needs full literal class names to statically detect them, so this
// maps each Studio-selectable color option to a fixed, complete class string.
export const EVENT_TYPE_COLOR_CLASSES: Record<EventTypeColor, string> = {
  green: "bg-green-600 text-white",
  brown: "bg-brown-600 text-white",
  tan: "bg-tan-600 text-white",
  pink: "bg-pink-600 text-white",
};

export function formatEventDate(iso: string) {
  const date = new Date(iso);
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function formatEventTime(iso: string) {
  const date = new Date(iso);
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

export function isPastEvent(iso: string) {
  return new Date(iso).getTime() < Date.now();
}
