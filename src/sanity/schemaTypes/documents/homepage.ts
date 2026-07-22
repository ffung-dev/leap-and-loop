import { HomeIcon } from "@/sanity/lib/icons";
import { defineField, defineType } from "sanity";

const exploreCard = (name: string, title: string, defaultTitle: string, defaultDescription: string) =>
  defineField({
    name,
    title,
    type: "object",
    group: "explore",
    fields: [
      defineField({ name: "title", title: "Title", type: "string", initialValue: defaultTitle }),
      defineField({
        name: "description",
        title: "Description",
        type: "text",
        rows: 2,
        initialValue: defaultDescription,
      }),
    ],
  });

export default defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  icon: HomeIcon,
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "about", title: "About & mission" },
    { name: "featured", title: "Featured work" },
    { name: "explore", title: "Keep exploring section" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "heroTitle",
      title: "Hero title",
      type: "string",
      group: "hero",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero subtitle",
      type: "text",
      rows: 2,
      group: "hero",
    }),
    defineField({
      name: "heroImage",
      title: "Hero image",
      type: "imageWithAlt",
      group: "hero",
    }),
    defineField({
      name: "heroCtaLabel",
      title: "Hero primary button label",
      type: "string",
      group: "hero",
      initialValue: "See what we're making",
    }),
    defineField({
      name: "heroCtaLink",
      title: "Hero primary button link",
      description: "e.g. /events or /contact",
      type: "string",
      group: "hero",
      initialValue: "/events",
    }),
    defineField({
      name: "heroSecondaryCtaLabel",
      title: "Hero secondary button label",
      type: "string",
      group: "hero",
      initialValue: "Get in touch",
    }),
    defineField({
      name: "heroSecondaryCtaLink",
      title: "Hero secondary button link",
      type: "string",
      group: "hero",
      initialValue: "/contact",
    }),
    defineField({
      name: "aboutEyebrow",
      title: "About section caption",
      description: "The small label shown above the About heading.",
      type: "string",
      group: "about",
      initialValue: "Our story",
    }),
    defineField({
      name: "aboutTitle",
      title: "About section heading",
      type: "string",
      group: "about",
      initialValue: "Who we are",
    }),
    defineField({
      name: "aboutText",
      title: "About text",
      type: "array",
      of: [{ type: "block" }],
      group: "about",
    }),
    defineField({
      name: "communityHighlightLabel",
      title: "Community highlight caption",
      description: "The small label shown above the community highlight card.",
      type: "string",
      group: "about",
      initialValue: "Community involvement",
    }),
    defineField({
      name: "communityHighlight",
      title: "Community highlight",
      description: "A featured story or image about Leap & Loop's community work.",
      type: "galleryHighlight",
      group: "about",
    }),
    defineField({
      name: "featuredEventsEyebrow",
      title: "Upcoming events caption",
      type: "string",
      group: "featured",
      initialValue: "What's next",
    }),
    defineField({
      name: "featuredEventsTitle",
      title: "Upcoming events heading",
      type: "string",
      group: "featured",
      initialValue: "Upcoming events",
    }),
    defineField({
      name: "featuredEventsCtaLabel",
      title: "Upcoming events button label",
      type: "string",
      group: "featured",
      initialValue: "See all events",
    }),
    defineField({
      name: "featuredProjectsEyebrow",
      title: "Featured projects caption",
      type: "string",
      group: "featured",
      initialValue: "Our work",
    }),
    defineField({
      name: "featuredProjectsTitle",
      title: "Featured projects heading",
      type: "string",
      group: "featured",
      initialValue: "A few of our favorites",
    }),
    defineField({
      name: "featuredProjects",
      title: "Featured projects",
      description: "A hand-picked selection of crochet work to showcase on the homepage.",
      type: "array",
      group: "featured",
      of: [{ type: "galleryHighlight" }],
    }),
    defineField({
      name: "exploreTitle",
      title: "\"Keep exploring\" heading",
      type: "string",
      group: "explore",
      initialValue: "Keep exploring",
    }),
    exploreCard(
      "exploreLocationsCard",
      "Locations card",
      "Find a location",
      "See where to find our work in person and when we're there."
    ),
    exploreCard(
      "exploreFiberArtsCard",
      "Fiber Arts Club card",
      "GNSHS Fiber Arts Club",
      "Meet the school club behind Leap & Loop and get involved."
    ),
    exploreCard(
      "exploreContactCard",
      "Contact card",
      "Say hello",
      "Have a commission idea or a question? We'd love to hear it."
    ),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      group: "seo",
    }),
  ],
  preview: {
    select: { title: "heroTitle", media: "heroImage.image" },
    prepare({ title, media }) {
      return { title: title || "Homepage", media };
    },
  },
});
