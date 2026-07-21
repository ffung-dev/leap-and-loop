import { LinkIcon } from "@/sanity/lib/icons";
import { defineField, defineType } from "sanity";

export const SOCIAL_PLATFORMS = [
  { title: "Instagram", value: "instagram" },
  { title: "TikTok", value: "tiktok" },
  { title: "Facebook", value: "facebook" },
  { title: "Pinterest", value: "pinterest" },
  { title: "YouTube", value: "youtube" },
  { title: "Etsy", value: "etsy" },
  { title: "Email", value: "email" },
  { title: "Other", value: "other" },
] as const;

export default defineType({
  name: "socialLink",
  title: "Social link",
  type: "object",
  icon: LinkIcon,
  fields: [
    defineField({
      name: "platform",
      title: "Platform",
      type: "string",
      options: { list: [...SOCIAL_PLATFORMS] },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "url",
      title: "URL",
      type: "url",
      validation: (Rule) =>
        Rule.required().uri({ scheme: ["http", "https", "mailto"] }),
    }),
    defineField({
      name: "label",
      title: "Display label",
      description: "Optional — e.g. \"@leapandloop\"",
      type: "string",
    }),
  ],
  preview: {
    select: { title: "platform", subtitle: "url" },
  },
});
