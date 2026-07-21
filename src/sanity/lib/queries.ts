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
    aboutTitle,
    aboutText,
    communityHighlight,
    featuredProjects,
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
    eventType,
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
    eventType,
    "location": location->{ name, "slug": slug.current },
    locationNote,
    description,
    images
  }
`;

export const fiberArtsClubQuery = groq`
  *[_type == "fiberArtsClub"][0]{
    title,
    mission,
    description,
    heroImage,
    activities,
    communityProjects,
    gallery,
    seo
  }
`;

export const contactQuery = groq`
  *[_type == "contact"][0]{
    title,
    intro,
    email,
    instagramUrl,
    instagramHandle,
    commissionInquiryTitle,
    commissionInquiryText
  }
`;
