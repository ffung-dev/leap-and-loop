import type { PortableTextBlock } from "@portabletext/react";
import type { Image } from "sanity";

export type ImageWithAlt = {
  image: Image;
  alt: string;
  caption?: string;
};

export type SocialPlatform =
  | "instagram"
  | "tiktok"
  | "facebook"
  | "pinterest"
  | "youtube"
  | "etsy"
  | "email"
  | "other";

export type SocialLink = {
  platform: SocialPlatform;
  url: string;
  label?: string;
};

export type FunFact = {
  emoji?: string;
  fact: string;
};

export type ScheduleItem = {
  label: string;
  hours: string;
};

export type ActivityItem = {
  title: string;
  description?: string;
  image?: ImageWithAlt;
};

export type GalleryHighlight = {
  title: string;
  description?: string;
  image: ImageWithAlt;
};

export type Seo = {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: Image;
};

export type SiteSettings = {
  siteTitle: string;
  tagline?: string;
  logo?: Image;
  email?: string;
  funFactsIntro?: string;
  funFacts?: FunFact[];
  socialLinks?: SocialLink[];
  seo?: Seo;
};

export type Homepage = {
  heroTitle: string;
  heroSubtitle?: string;
  heroImage?: ImageWithAlt;
  heroCtaLabel?: string;
  heroCtaLink?: string;
  aboutTitle?: string;
  aboutText?: PortableTextBlock[];
  communityHighlight?: GalleryHighlight;
  featuredProjects?: GalleryHighlight[];
  seo?: Seo;
};

export type LocationSummary = {
  _id: string;
  name: string;
  slug: string;
  address?: string;
  order?: number;
};

export type LocationDoc = LocationSummary & {
  mapUrl?: string;
  description?: PortableTextBlock[];
  images?: ImageWithAlt[];
  schedule?: ScheduleItem[];
  additionalInfo?: PortableTextBlock[];
  seo?: Seo;
};

export type EventType =
  | "workshop"
  | "market"
  | "club-event"
  | "community-service"
  | "pop-up";

export type EventDoc = {
  _id: string;
  title: string;
  date: string;
  eventType: EventType;
  location?: { name: string; slug: string } | null;
  locationNote?: string;
  description?: PortableTextBlock[];
  images?: ImageWithAlt[];
};

export type FiberArtsClub = {
  title?: string;
  mission?: string;
  description?: PortableTextBlock[];
  heroImage?: ImageWithAlt;
  activities?: ActivityItem[];
  communityProjects?: GalleryHighlight[];
  gallery?: ImageWithAlt[];
  seo?: Seo;
};

export type ContactPage = {
  title?: string;
  intro?: string;
  email: string;
  instagramUrl?: string;
  instagramHandle?: string;
  commissionInquiryTitle?: string;
  commissionInquiryText?: PortableTextBlock[];
};
