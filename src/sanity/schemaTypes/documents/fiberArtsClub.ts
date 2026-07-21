import { HeartIcon } from "@/sanity/lib/icons";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "fiberArtsClub",
  title: "GNSHS Fiber Arts Club",
  type: "document",
  icon: HeartIcon,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "gallery", title: "Gallery" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Page title",
      type: "string",
      group: "content",
      initialValue: "GNSHS Fiber Arts Club",
    }),
    defineField({
      name: "mission",
      title: "Club mission",
      type: "text",
      rows: 3,
      group: "content",
    }),
    defineField({
      name: "description",
      title: "Description",
      description: "Explain the club and its connection to Leap & Loop.",
      type: "array",
      of: [{ type: "block" }],
      group: "content",
    }),
    defineField({
      name: "heroImage",
      title: "Header image",
      type: "imageWithAlt",
      group: "content",
    }),
    defineField({
      name: "activities",
      title: "Activities",
      type: "array",
      of: [{ type: "activityItem" }],
      group: "content",
    }),
    defineField({
      name: "communityProjects",
      title: "Community service projects",
      type: "array",
      of: [{ type: "galleryHighlight" }],
      group: "content",
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [{ type: "imageWithAlt" }],
      group: "gallery",
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      group: "seo",
    }),
  ],
  preview: {
    select: { title: "title", media: "heroImage.image" },
    prepare({ title, media }) {
      return { title: title || "GNSHS Fiber Arts Club", media };
    },
  },
});
