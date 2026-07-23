import { CalendarIcon } from "@/sanity/lib/icons";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "event",
  title: "Event",
  type: "document",
  icon: CalendarIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "date",
      options: { dateFormat: "YYYY-MM-DD" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "eventType",
      title: "Event type",
      description: "Manage the list of available types under \"Event Types\" in the sidebar.",
      type: "reference",
      to: [{ type: "eventType" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "location",
      title: "Location",
      description: "Which Leap & Loop location this event is associated with, if any.",
      type: "reference",
      to: [{ type: "location" }],
    }),
    defineField({
      name: "locationNote",
      title: "Location note",
      description: "Use for a one-off venue not listed under Locations (e.g. \"GNSHS Library\").",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [{ type: "imageWithAlt" }],
    }),
  ],
  orderings: [
    {
      title: "Date, upcoming first",
      name: "dateAsc",
      by: [{ field: "date", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", date: "date", media: "images.0.image", type: "eventType.name" },
    prepare({ title, date, media, type }) {
      return {
        title,
        subtitle: [type, date ? new Date(date).toLocaleDateString() : null]
          .filter(Boolean)
          .join(" · "),
        media,
      };
    },
  },
});
