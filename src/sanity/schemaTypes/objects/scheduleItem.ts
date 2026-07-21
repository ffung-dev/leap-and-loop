import { ClockIcon } from "@/sanity/lib/icons";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "scheduleItem",
  title: "Schedule item",
  type: "object",
  icon: ClockIcon,
  fields: [
    defineField({
      name: "label",
      title: "Day / label",
      description: "e.g. \"Saturdays\" or \"Every other Sunday\"",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "hours",
      title: "Hours",
      description: "e.g. \"10:00 AM – 2:00 PM\"",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "hours" },
  },
});
