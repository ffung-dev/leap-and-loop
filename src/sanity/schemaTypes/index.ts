import type { SchemaTypeDefinition } from "sanity";

import activityItem from "./objects/activityItem";
import funFact from "./objects/funFact";
import galleryHighlight from "./objects/galleryHighlight";
import imageWithAlt from "./objects/imageWithAlt";
import scheduleItem from "./objects/scheduleItem";
import seo from "./objects/seo";
import socialLink from "./objects/socialLink";

import contact from "./documents/contact";
import contactSubmission from "./documents/contactSubmission";
import event from "./documents/event";
import fiberArtsClub from "./documents/fiberArtsClub";
import homepage from "./documents/homepage";
import location from "./documents/location";
import siteSettings from "./documents/siteSettings";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Documents
    homepage,
    location,
    event,
    fiberArtsClub,
    contact,
    siteSettings,
    contactSubmission,
    // Objects
    imageWithAlt,
    seo,
    socialLink,
    funFact,
    scheduleItem,
    activityItem,
    galleryHighlight,
  ],
};
