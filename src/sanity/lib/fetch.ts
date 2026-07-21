import type { QueryParams } from "next-sanity";

import { client } from "@/sanity/lib/client";

/**
 * Wraps `client.fetch` so a not-yet-connected Sanity project (no project id,
 * empty dataset, network hiccup) degrades to an empty fallback instead of
 * crashing page rendering or `next build`.
 */
export async function sanityFetch<T>({
  query,
  params = {},
  tags,
  fallback,
}: {
  query: string;
  params?: QueryParams;
  tags?: string[];
  fallback: T;
}): Promise<T> {
  try {
    const result = await client.fetch<T>(query, params, {
      next: { revalidate: 60, tags },
    });
    return result ?? fallback;
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[sanity] fetch failed, returning fallback:", error);
    }
    return fallback;
  }
}
