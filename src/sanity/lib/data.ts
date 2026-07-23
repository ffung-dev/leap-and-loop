import { sanityFetch } from "@/sanity/lib/fetch";
import {
  contactQuery,
  eventsQuery,
  eventTypesQuery,
  fiberArtsClubQuery,
  homepageQuery,
  locationBySlugQuery,
  locationSlugsQuery,
  locationsIndexQuery,
  locationsListQuery,
  siteSettingsQuery,
  upcomingEventsQuery,
} from "@/sanity/lib/queries";
import type {
  ContactPage,
  EventDoc,
  EventTypeDoc,
  FiberArtsClub,
  Homepage,
  LocationDoc,
  LocationSummary,
  SiteSettings,
} from "@/types/sanity";

export function getSiteSettings() {
  return sanityFetch<SiteSettings | null>({
    query: siteSettingsQuery,
    tags: ["siteSettings"],
    fallback: null,
  });
}

export function getHomepage() {
  return sanityFetch<Homepage | null>({
    query: homepageQuery,
    tags: ["homepage"],
    fallback: null,
  });
}

export function getLocations() {
  return sanityFetch<LocationSummary[]>({
    query: locationsListQuery,
    tags: ["location"],
    fallback: [],
  });
}

export function getLocationsIndex() {
  return sanityFetch<LocationDoc[]>({
    query: locationsIndexQuery,
    tags: ["location"],
    fallback: [],
  });
}

export function getLocationSlugs() {
  return sanityFetch<string[]>({
    query: locationSlugsQuery,
    tags: ["location"],
    fallback: [],
  });
}

export function getLocationBySlug(slug: string) {
  return sanityFetch<LocationDoc | null>({
    query: locationBySlugQuery,
    params: { slug },
    tags: ["location"],
    fallback: null,
  });
}

export function getEvents() {
  return sanityFetch<EventDoc[]>({
    query: eventsQuery,
    tags: ["event"],
    fallback: [],
  });
}

export function getUpcomingEvents() {
  // "en-CA" formats as YYYY-MM-DD, matching the Sanity date field's format.
  const today = new Intl.DateTimeFormat("en-CA", { timeZone: "America/New_York" }).format(new Date());
  return sanityFetch<EventDoc[]>({
    query: upcomingEventsQuery,
    params: { today },
    tags: ["event"],
    fallback: [],
  });
}

export function getEventTypes() {
  return sanityFetch<EventTypeDoc[]>({
    query: eventTypesQuery,
    tags: ["eventType"],
    fallback: [],
  });
}

export function getFiberArtsClub() {
  return sanityFetch<FiberArtsClub | null>({
    query: fiberArtsClubQuery,
    tags: ["fiberArtsClub"],
    fallback: null,
  });
}

export function getContact() {
  return sanityFetch<ContactPage | null>({
    query: contactQuery,
    tags: ["contact"],
    fallback: null,
  });
}
