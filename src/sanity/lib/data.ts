import { sanityFetch } from "@/sanity/lib/fetch";
import {
  contactQuery,
  eventsQuery,
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
  return sanityFetch<EventDoc[]>({
    query: upcomingEventsQuery,
    tags: ["event"],
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
