import type { Metadata } from "next";

import { urlFor } from "@/sanity/lib/image";
import type { Seo } from "@/types/sanity";

export function buildMetadata({
  seo,
  fallbackTitle,
  fallbackDescription,
  path,
}: {
  seo?: Seo | null;
  fallbackTitle: string;
  fallbackDescription?: string;
  path?: string;
}): Metadata {
  const title = seo?.metaTitle || fallbackTitle;
  const description = seo?.metaDescription || fallbackDescription;
  const ogImageUrl = seo?.ogImage ? urlFor(seo.ogImage)?.width(1200).height(630).fit("crop").url() : undefined;

  return {
    title,
    description,
    alternates: path ? { canonical: path } : undefined,
    openGraph: {
      title,
      description,
      type: "website",
      ...(path ? { url: path } : {}),
      ...(ogImageUrl ? { images: [{ url: ogImageUrl, width: 1200, height: 630 }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(ogImageUrl ? { images: [ogImageUrl] } : {}),
    },
  };
}
