import { InboxIcon } from "@/sanity/lib/icons";
import { defineField, defineType } from "sanity";

/**
 * Written server-side by the /api/contact route so form submissions land
 * somewhere the studio user can see them without needing a third-party
 * email service configured.
 */
export default defineType({
  name: "contactSubmission",
  title: "Contact Submission",
  type: "document",
  icon: InboxIcon,
  readOnly: true,
  fields: [
    defineField({ name: "name", title: "Name", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "message", title: "Message", type: "text" }),
    defineField({
      name: "isCommissionInquiry",
      title: "Commission inquiry?",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "submittedAt",
      title: "Submitted at",
      type: "datetime",
    }),
  ],
  orderings: [
    {
      title: "Newest first",
      name: "submittedAtDesc",
      by: [{ field: "submittedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "name", subtitle: "email", date: "submittedAt" },
    prepare({ title, subtitle, date }) {
      return {
        title: title || "Anonymous",
        subtitle: [subtitle, date ? new Date(date).toLocaleString() : null]
          .filter(Boolean)
          .join(" · "),
      };
    },
  },
});
