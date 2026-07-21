export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-06-01";

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  "Missing environment variable: NEXT_PUBLIC_SANITY_DATASET"
);

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  "Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID"
);

export const revalidateSecret = process.env.SANITY_REVALIDATE_SECRET;
export const writeToken = process.env.SANITY_API_WRITE_TOKEN;

/**
 * Falls back to a placeholder id/dataset so `next build` and local dev
 * never hard-crash before a real Sanity project has been connected.
 * Real values should always be set in `.env.local` — see README.md.
 */
function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`[sanity] ${errorMessage} — using placeholder value.`);
    }
    return "placeholder" as unknown as T;
  }
  return v;
}
