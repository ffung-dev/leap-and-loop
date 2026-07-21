import { createClient } from "next-sanity";
import { NextResponse } from "next/server";

import { apiVersion, dataset, projectId, writeToken } from "@/sanity/env";

export async function POST(request: Request) {
  let body: { name?: string; email?: string; message?: string; isCommissionInquiry?: boolean };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = body.name?.trim();
  const email = body.email?.trim();
  const message = body.message?.trim();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
  }

  if (!writeToken) {
    console.warn("[contact] SANITY_API_WRITE_TOKEN is not set — cannot store submission.");
    return NextResponse.json(
      { error: "The contact form isn't fully configured yet. Please email us directly." },
      { status: 503 }
    );
  }

  const writeClient = createClient({
    projectId,
    dataset,
    apiVersion,
    token: writeToken,
    useCdn: false,
  });

  try {
    await writeClient.create({
      _type: "contactSubmission",
      name,
      email,
      message,
      isCommissionInquiry: Boolean(body.isCommissionInquiry),
      submittedAt: new Date().toISOString(),
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[contact] Failed to save submission:", error);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
