import { HomeIcon } from "@/sanity/lib/icons";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  icon: HomeIcon,
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "about", title: "About & mission" },
    { name: "featured", title: "Featured work" },
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
      title: "Hero button label",
      type: "string",
      group: "hero",
      initialValue: "See what we're making",
    }),
    defineField({
      name: "heroCtaLink",
      title: "Hero button link",
      description: "e.g. /events or /contact",
      type: "string",
      group: "hero",
      initialValue: "/events",
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
      name: "communityHighlight",
      title: "Community highlight",
      description: "A featured story or image about Leap & Loop's community work.",
      type: "galleryHighlight",
      group: "about",
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
