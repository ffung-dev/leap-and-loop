import type { EventType } from "@/types/sanity";

export const EVENT_TYPE_LABELS: Record<EventType, string> = {
  workshop: "Workshop",
  market: "Market",
  "club-event": "Club Event",
  "community-service": "Community Service",
  "pop-up": "Pop-Up",
};

export const EVENT_TYPE_COLORS: Record<EventType, string> = {
  workshop: "bg-green-600 text-white",
  market: "bg-tan-600 text-white",
  "club-event": "bg-pink-500 text-white",
  "community-service": "bg-brown-600 text-white",
  "pop-up": "bg-pink-700 text-white",
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
