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
  locationsEyebrow?: string;
  locationsPageTitle?: string;
  locationsPageDescription?: string;
  eventsEyebrow?: string;
  eventsPageTitle?: string;
  eventsPageDescription?: string;
  footerExploreLabel?: string;
  footerContactLabel?: string;
  footerCopyrightText?: string;
  seo?: Seo;
};

export type ExploreCardContent = {
  title?: string;
  description?: string;
};

export type Homepage = {
  heroTitle: string;
  heroSubtitle?: string;
  heroImage?: ImageWithAlt;
  heroCtaLabel?: string;
  heroCtaLink?: string;
  heroSecondaryCtaLabel?: string;
  heroSecondaryCtaLink?: string;
  aboutEyebrow?: string;
  aboutTitle?: string;
  aboutText?: PortableTextBlock[];
  communityHighlightLabel?: string;
  communityHighlight?: GalleryHighlight;
  featuredEventsEyebrow?: string;
  featuredEventsTitle?: string;
  featuredEventsCtaLabel?: string;
  featuredProjectsEyebrow?: string;
  featuredProjectsTitle?: string;
  featuredProjects?: GalleryHighlight[];
  exploreTitle?: string;
  exploreLocationsCard?: ExploreCardContent;
  exploreFiberArtsCard?: ExploreCardContent;
  exploreContactCard?: ExploreCardContent;
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

export type EventTypeColor = "green" | "brown" | "tan" | "pink";

export type EventTypeDoc = {
  _id: string;
  name: string;
  slug: string;
  color: EventTypeColor;
};

export type EventDoc = {
  _id: string;
  title: string;
  date: string;
  endDate?: string;
  eventType: EventTypeDoc | null;
  location?: { name: string; slug: string } | null;
  locationNote?: string;
  description?: PortableTextBlock[];
  images?: ImageWithAlt[];
};

export type FiberArtsClub = {
  heroEyebrow?: string;
  title?: string;
  mission?: string;
  ctaLabel?: string;
  description?: PortableTextBlock[];
  heroImage?: ImageWithAlt;
  activitiesEyebrow?: string;
  activitiesTitle?: string;
  activities?: ActivityItem[];
  communityProjectsEyebrow?: string;
  communityProjectsTitle?: string;
  communityProjects?: GalleryHighlight[];
  galleryEyebrow?: string;
  galleryTitle?: string;
  gallery?: ImageWithAlt[];
  seo?: Seo;
};

export type ContactPage = {
  eyebrow?: string;
  title?: string;
  intro?: string;
  email?: string;
  instagramUrl?: string;
  instagramHandle?: string;
  commissionInquiryTitle?: string;
  commissionInquiryText?: PortableTextBlock[];
};
