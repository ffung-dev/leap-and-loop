import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schema } from "./src/sanity/schemaTypes";
import { SINGLETON_TYPES, structure } from "./src/sanity/structure";

export default defineConfig({
  name: "leap-and-loop",
  title: "Leap & Loop",

  projectId,
  dataset,
  basePath: "/studio",

  schema,

  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],

  document: {
    // Singletons: no "duplicate", no "delete", no "create new" from the global menu.
    actions: (input, context) =>
      SINGLETON_TYPES.has(context.schemaType)
        ? input.filter(({ action }) => action && !["duplicate", "delete"].includes(action))
        : input,
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === "global") {
        return prev.filter((template) => !SINGLETON_TYPES.has(template.templateId));
      }
      return prev;
    },
  },
});
