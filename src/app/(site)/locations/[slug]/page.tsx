import { Clock, ExternalLink, MapPin } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ImageGallery } from "@/components/gallery/ImageGallery";
import { PortableTextRenderer } from "@/components/ui/PortableTextRenderer";
import { RoundedImage } from "@/components/ui/RoundedImage";
import { buildMetadata } from "@/lib/seo";
import { getLocationBySlug, getLocationSlugs } from "@/sanity/lib/data";

export async function generateStaticParams() {
  const slugs = await getLocationSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const location = await getLocationBySlug(slug);
  if (!location) return {};

  return buildMetadata({
    seo: location.seo,
    fallbackTitle: location.name,
    fallbackDescription: location.address,
    path: `/locations/${slug}`,
  });
}

export default async function LocationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const location = await getLocationBySlug(slug);
  if (!location) notFound();

  const heroImage = location.images?.[0];
  const galleryImages = location.images?.slice(1);

  return (
    <div>
      <div className="gradient-hero">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-20 lg:px-8">
          <div>
            <Link href="/locations" className="text-sm font-semibold text-green-700 hover:underline">
              &larr; All locations
            </Link>
            <h1 className="mt-4 font-display text-4xl text-brown-900 sm:text-5xl">{location.name}</h1>
            {location.address && (
              <p className="mt-4 flex items-start gap-2 text-brown-600">
                <MapPin size={18} className="mt-0.5 shrink-0" aria-hidden />
                {location.address}
              </p>
            )}
            {location.mapUrl && (
              <a
                href={location.mapUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-green-700 hover:underline"
              >
                Get directions <ExternalLink size={14} aria-hidden />
              </a>
            )}

            {location.description && (
              <div className="mt-6">
                <PortableTextRenderer value={location.description} />
              </div>
            )}
          </div>

          <div className="relative aspect-[4/3] w-full">
            <RoundedImage image={heroImage} fallbackAlt={location.name} rounded="3xl" priority />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {galleryImages && galleryImages.length > 0 && (
              <div>
                <h2 className="font-display text-2xl text-brown-900">Photos</h2>
                <div className="mt-5">
                  <ImageGallery images={galleryImages} />
                </div>
              </div>
            )}

            {location.additionalInfo && (
              <div className="mt-10">
                <h2 className="font-display text-2xl text-brown-900">Good to know</h2>
                <div className="mt-4">
                  <PortableTextRenderer value={location.additionalInfo} />
                </div>
              </div>
            )}
          </div>

          {location.schedule && location.schedule.length > 0 && (
            <div className="h-fit rounded-3xl border border-tan-200 bg-tan-50 p-6">
              <h2 className="flex items-center gap-2 font-display text-xl text-brown-900">
                <Clock size={18} aria-hidden />
                Schedule
              </h2>
              <ul className="mt-4 space-y-3">
                {location.schedule.map((item, i) => (
                  <li key={i} className="flex items-center justify-between gap-4 text-sm">
                    <span className="font-medium text-brown-800">{item.label}</span>
                    <span className="text-brown-600">{item.hours}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
