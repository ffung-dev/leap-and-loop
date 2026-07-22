import { TagIcon } from "@/sanity/lib/icons";
import { defineField, defineType } from "sanity";

export const EVENT_TYPE_COLOR_OPTIONS = [
  { title: "Green", value: "green" },
  { title: "Brown", value: "brown" },
  { title: "Tan", value: "tan" },
  { title: "Pink", value: "pink" },
] as const;

export default defineType({
  name: "eventType",
  title: "Event Type",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      description: "e.g. \"Workshop\" or \"Market\" — shown as a badge on events and as a filter chip.",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "color",
      title: "Badge color",
      type: "string",
      options: { list: [...EVENT_TYPE_COLOR_OPTIONS], layout: "radio" },
      initialValue: "green",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "order",
      title: "Display order",
      description: "Lower numbers appear first in the events filter bar.",
      type: "number",
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: "Display order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "name", subtitle: "color" },
  },
});
