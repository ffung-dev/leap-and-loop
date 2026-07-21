import { ImagesIcon } from "@/sanity/lib/icons";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "galleryHighlight",
  title: "Highlight",
  type: "object",
  icon: ImagesIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "imageWithAlt",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "description", media: "image.image" },
  },
});
