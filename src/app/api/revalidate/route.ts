import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

import { revalidateSecret } from "@/sanity/env";

/**
 * Wire this up as a Sanity webhook (Settings → API → Webhooks) pointing at
 * /api/revalidate?secret=<SANITY_REVALIDATE_SECRET> so edits go live instantly
 * instead of waiting for the default 60s ISR window.
 */
export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");

  if (!revalidateSecret || secret !== revalidateSecret) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  let body: { _type?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid payload" }, { status: 400 });
  }

  if (!body._type) {
    return NextResponse.json({ message: "Missing _type" }, { status: 400 });
  }

  revalidateTag(body._type, "max");
  return NextResponse.json({ revalidated: true, type: body._type, now: Date.now() });
}
