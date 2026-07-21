import { SparklesIcon } from "@/sanity/lib/icons";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "funFact",
  title: "Fun fact",
  type: "object",
  icon: SparklesIcon,
  fields: [
    defineField({
      name: "emoji",
      title: "Emoji",
      description: "A single emoji shown next to the fact, e.g. \"🧶\"",
      type: "string",
      validation: (Rule) => Rule.max(4),
    }),
    defineField({
      name: "fact",
      title: "Fact",
      type: "text",
      rows: 2,
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: "fact", subtitle: "emoji" },
    prepare({ title, subtitle }) {
      return { title, subtitle: subtitle ?? "🧶" };
    },
  },
});
