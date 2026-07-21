import { SearchIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  icon: SearchIcon,
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: "metaTitle",
      title: "Meta title",
      type: "string",
      description: "Overrides the page title used for search engines and browser tabs.",
      validation: (Rule) => Rule.max(60).warning("Longer titles may be truncated in search results."),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.max(160).warning("Longer descriptions may be truncated in search results."),
    }),
    defineField({
      name: "ogImage",
      title: "Social share image",
      description: "Shown when this page is shared on social media (Open Graph image).",
      type: "image",
      options: { hotspot: true },
    }),
  ],
});
