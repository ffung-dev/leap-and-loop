import { groq } from "next-sanity";
import { NextResponse } from "next/server";

import { client } from "@/sanity/lib/client";

export const dynamic = "force-dynamic";

type SearchResult = {
  id: string;
  title: string;
  href: string;
  kind: "Event" | "Location";
  meta?: string;
};

const searchQuery = groq`
  {
    "events": *[_type == "event" && title match $term][0...5]{ _id, title, date },
    "locations": *[_type == "location" && name match $term][0...5]{ _id, name, "slug": slug.current }
  }
`;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim() ?? "";

  if (q.length < 2) {
    return NextResponse.json({ results: [] satisfies SearchResult[] });
  }

  try {
    const { events, locations } = await client.fetch<{
      events: { _id: string; title: string; date?: string }[];
      locations: { _id: string; name: string; slug: string }[];
    }>(searchQuery, { term: `${q}*` });

    const results: SearchResult[] = [
      ...events.map((e) => ({
        id: e._id,
        title: e.title,
        href: `/events#${e._id}`,
        kind: "Event" as const,
        meta: e.date ? new Date(e.date).toLocaleDateString() : undefined,
      })),
      ...locations.map((l) => ({
        id: l._id,
        title: l.name,
        href: `/locations/${l.slug}`,
        kind: "Location" as const,
      })),
    ];

    return NextResponse.json({ results });
  } catch {
    return NextResponse.json({ results: [] satisfies SearchResult[] });
  }
}
