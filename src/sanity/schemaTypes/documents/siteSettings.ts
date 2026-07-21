import { CogIcon } from "@/sanity/lib/icons";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  icon: CogIcon,
  groups: [
    { name: "general", title: "General", default: true },
    { name: "funFacts", title: "Fun facts panel" },
    { name: "social", title: "Social links" },
    { name: "seo", title: "Default SEO" },
  ],
  fields: [
    defineField({
      name: "siteTitle",
      title: "Site title",
      type: "string",
      group: "general",
      initialValue: "Leap & Loop",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      description: "A short line used in the footer and browser tab.",
      type: "string",
      group: "general",
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      group: "general",
      options: { hotspot: true },
    }),
    defineField({
      name: "email",
      title: "Contact email",
      type: "string",
      group: "general",
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: "funFactsIntro",
      title: "Panel heading",
      description: "Heading shown above the fun facts in the collapsible side panel.",
      type: "string",
      group: "funFacts",
      initialValue: "Fun facts about us",
    }),
    defineField({
      name: "funFacts",
      title: "Fun facts",
      description: "Rotates through the collapsible side panel across the site.",
      type: "array",
      group: "funFacts",
      of: [{ type: "funFact" }],
    }),
    defineField({
      name: "socialLinks",
      title: "Social links",
      description: "Powers the social icons in the side panel and footer.",
      type: "array",
      group: "social",
      of: [{ type: "socialLink" }],
    }),
    defineField({
      name: "seo",
      title: "Default SEO",
      description: "Used as a fallback whenever a page doesn't set its own SEO fields.",
      type: "seo",
      group: "seo",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site Settings" };
    },
  },
});
