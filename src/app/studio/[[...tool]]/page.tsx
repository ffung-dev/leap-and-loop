import type { Metadata, Viewport } from "next";

import StudioClient from "@/components/studio/StudioClient";

export const dynamic = "force-static";

// Mirrors next-sanity/studio's defaults, inlined so this Server Component
// never statically imports the studio package (which pulls in client-only
// deps that break Turbopack's server bundle — see StudioClient.tsx).
export const metadata: Metadata = {
  referrer: "same-origin",
  robots: "noindex",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function StudioPage() {
  return <StudioClient />;
}
