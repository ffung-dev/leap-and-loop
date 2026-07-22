import { CalendarIcon, CogIcon, EnvelopeIcon, HeartIcon, HomeIcon, InboxIcon, PinIcon, TagIcon } from "@/sanity/lib/icons";
import type { StructureResolver } from "sanity/structure";

export const SINGLETON_TYPES = new Set([
  "homepage",
  "siteSettings",
  "contact",
  "fiberArtsClub",
]);

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Leap & Loop")
    .items([
      S.listItem()
        .title("Homepage")
        .icon(HomeIcon)
        .child(S.document().schemaType("homepage").documentId("homepage")),
      S.listItem()
        .title("GNSHS Fiber Arts Club")
        .icon(HeartIcon)
        .child(S.document().schemaType("fiberArtsClub").documentId("fiberArtsClub")),
      S.listItem()
        .title("Contact Page")
        .icon(EnvelopeIcon)
        .child(S.document().schemaType("contact").documentId("contact")),
      S.listItem()
        .title("Site Settings")
        .icon(CogIcon)
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      S.divider(),
      S.documentTypeListItem("location").title("Locations").icon(PinIcon),
      S.documentTypeListItem("event").title("Events").icon(CalendarIcon),
      S.documentTypeListItem("eventType").title("Event Types").icon(TagIcon),
      S.divider(),
      S.documentTypeListItem("contactSubmission")
        .title("Contact Submissions")
        .icon(InboxIcon),
    ]);
