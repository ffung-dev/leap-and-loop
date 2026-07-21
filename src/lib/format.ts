import type { EventType } from "@/types/sanity";

export const EVENT_TYPE_LABELS: Record<EventType, string> = {
  workshop: "Workshop",
  market: "Market",
  "club-event": "Club Event",
  "community-service": "Community Service",
  "pop-up": "Pop-Up",
};

export const EVENT_TYPE_COLORS: Record<EventType, string> = {
  workshop: "bg-green-100 text-green-800",
  market: "bg-tan-100 text-tan-800",
  "club-event": "bg-pink-100 text-pink-800",
  "community-service": "bg-brown-100 text-brown-800",
  "pop-up": "bg-pink-200 text-pink-900",
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
