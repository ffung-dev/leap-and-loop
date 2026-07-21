import { MapPin } from "lucide-react";
import Link from "next/link";

import { RoundedImage } from "@/components/ui/RoundedImage";
import type { LocationDoc } from "@/types/sanity";

export function LocationCard({ location }: { location: Pick<LocationDoc, "name" | "slug" | "address" | "images"> }) {
  return (
    <Link
      href={`/locations/${location.slug}`}
      className="group flex flex-col overflow-hidden rounded-3xl border border-tan-200 bg-white shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-[4/3] w-full">
        <RoundedImage
          image={location.images?.[0]}
          fallbackAlt={location.name}
          rounded="md"
          className="h-full w-full rounded-b-none transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-5">
        <h3 className="font-display text-lg text-brown-900">{location.name}</h3>
        {location.address && (
          <p className="flex items-start gap-1.5 text-sm text-brown-500">
            <MapPin size={14} className="mt-0.5 shrink-0" aria-hidden />
            {location.address}
          </p>
        )}
        <span className="mt-2 text-sm font-semibold text-green-700 group-hover:underline">
          View location &rarr;
        </span>
      </div>
    </Link>
  );
}
