import { groq } from "next-sanity";

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0]{
    siteTitle,
    tagline,
    logo,
    email,
    funFactsIntro,
    funFacts,
    socialLinks,
    locationsEyebrow,
    locationsPageTitle,
    locationsPageDescription,
    eventsEyebrow,
    eventsPageTitle,
    eventsPageDescription,
    footerExploreLabel,
    footerContactLabel,
    footerCopyrightText,
    seo
  }
`;

export const homepageQuery = groq`
  *[_type == "homepage"][0]{
    heroTitle,
    heroSubtitle,
    heroImage,
    heroCtaLabel,
    heroCtaLink,
    heroSecondaryCtaLabel,
    heroSecondaryCtaLink,
    aboutEyebrow,
    aboutTitle,
    aboutText,
    communityHighlightLabel,
    communityHighlight,
    featuredEventsEyebrow,
    featuredEventsTitle,
    featuredEventsCtaLabel,
    featuredProjectsEyebrow,
    featuredProjectsTitle,
    featuredProjects,
    exploreTitle,
    exploreLocationsCard,
    exploreFiberArtsCard,
    exploreContactCard,
    seo
  }
`;

export const locationsListQuery = groq`
  *[_type == "location"] | order(order asc, name asc){
    _id,
    name,
    "slug": slug.current,
    address,
    order
  }
`;

export const locationsIndexQuery = groq`
  *[_type == "location"] | order(order asc, name asc){
    _id,
    name,
    "slug": slug.current,
    address,
    images
  }
`;

export const locationSlugsQuery = groq`
  *[_type == "location" && defined(slug.current)][].slug.current
`;

export const locationBySlugQuery = groq`
  *[_type == "location" && slug.current == $slug][0]{
    _id,
    name,
    "slug": slug.current,
    address,
    mapUrl,
    description,
    images,
    schedule,
    additionalInfo,
    order,
    seo
  }
`;

export const eventsQuery = groq`
  *[_type == "event"] | order(date desc){
    _id,
    title,
    date,
    "eventType": eventType->{ _id, name, "slug": slug.current, color },
    "location": location->{ name, "slug": slug.current },
    locationNote,
    description,
    images
  }
`;

export const upcomingEventsQuery = groq`
  *[_type == "event" && date >= now()] | order(date asc)[0...3]{
    _id,
    title,
    date,
    "eventType": eventType->{ _id, name, "slug": slug.current, color },
    "location": location->{ name, "slug": slug.current },
    locationNote,
    description,
    images
  }
`;

export const eventTypesQuery = groq`
  *[_type == "eventType"] | order(order asc, name asc){
    _id,
    name,
    "slug": slug.current,
    color
  }
`;

export const fiberArtsClubQuery = groq`
  *[_type == "fiberArtsClub"][0]{
    heroEyebrow,
    title,
    mission,
    ctaLabel,
    description,
    heroImage,
    activitiesEyebrow,
    activitiesTitle,
    activities,
    communityProjectsEyebrow,
    communityProjectsTitle,
    communityProjects,
    galleryEyebrow,
    galleryTitle,
    gallery,
    seo
  }
`;

export const contactQuery = groq`
  *[_type == "contact"][0]{
    eyebrow,
    title,
    intro,
    email,
    instagramUrl,
    instagramHandle,
    commissionInquiryTitle,
    commissionInquiryText
  }
`;
