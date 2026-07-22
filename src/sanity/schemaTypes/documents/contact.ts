import { EnvelopeIcon } from "@/sanity/lib/icons";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "contact",
  title: "Contact Page",
  type: "document",
  icon: EnvelopeIcon,
  fields: [
    defineField({
      name: "eyebrow",
      title: "Page caption",
      description: "The small label shown above the page title.",
      type: "string",
      initialValue: "We'd love to hear from you",
    }),
    defineField({
      name: "title",
      title: "Page title",
      type: "string",
      initialValue: "Get in touch",
    }),
    defineField({
      name: "intro",
      title: "Intro text",
      description: "Shown above the contact form.",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "email",
      title: "Contact email",
      description:
        "Optional — leave blank if you don't have one yet. The contact form works either way; messages are always saved under \"Contact Submissions\" in this Studio.",
      type: "string",
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: "instagramUrl",
      title: "Instagram URL",
      type: "url",
      validation: (Rule) => Rule.uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "instagramHandle",
      title: "Instagram handle",
      description: "e.g. \"@leapandloop\"",
      type: "string",
    }),
    defineField({
      name: "commissionInquiryTitle",
      title: "Commission section heading",
      type: "string",
      initialValue: "Custom commissions",
    }),
    defineField({
      name: "commissionInquiryText",
      title: "Commission inquiry info",
      description: "Explain how visitors can request a custom commission.",
      type: "array",
      of: [{ type: "block" }],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Contact Page" };
    },
  },
});
