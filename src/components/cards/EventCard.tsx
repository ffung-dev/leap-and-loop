"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Calendar, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { useState } from "react";

import { RoundedImage } from "@/components/ui/RoundedImage";
import { EVENT_TYPE_COLOR_CLASSES, formatEventDate, isPastEvent } from "@/lib/format";
import { toPlainText } from "@/lib/portableText";
import { cn } from "@/lib/utils";
import type { EventDoc } from "@/types/sanity";

export function EventCard({ event }: { event: EventDoc }) {
  const locationLabel = event.location?.name || event.locationNote;
  const past = isPastEvent(event.date, event.endDate);
  const images = event.images ?? [];
  const [activeIndex, setActiveIndex] = useState(0);

  function showPrev() {
    setActiveIndex((i) => (i - 1 + images.length) % images.length);
  }

  function showNext() {
    setActiveIndex((i) => (i + 1) % images.length);
  }

  return (
    <article
      id={event._id}
      className={cn(
        "group flex scroll-mt-28 flex-col overflow-hidden rounded-3xl border border-tan-300 bg-white shadow-sm transition-shadow hover:shadow-md",
        past && "opacity-70"
      )}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-b-none">
        <AnimatePresence initial={false}>
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0"
          >
            <RoundedImage image={images[activeIndex]} fallbackAlt={event.title} rounded="md" className="h-full w-full rounded-b-none" />
          </motion.div>
        </AnimatePresence>

        {event.eventType && (
          <span
            className={cn(
              "absolute left-3 top-3 z-10 rounded-full px-3 py-1 text-xs font-semibold shadow-sm",
              EVENT_TYPE_COLOR_CLASSES[event.eventType.color]
            )}
          >
            {event.eventType.name}
          </span>
        )}
        {past && (
          <span className="absolute right-3 top-3 z-10 rounded-full bg-brown-800/80 px-3 py-1 text-xs font-semibold text-white">
            Past
          </span>
        )}

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={showPrev}
              aria-label="Previous photo"
              className="absolute left-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-brown-800 shadow-sm transition-colors hover:bg-white"
            >
              <ChevronLeft size={16} aria-hidden />
            </button>
            <button
              type="button"
              onClick={showNext}
              aria-label="Next photo"
              className="absolute right-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-brown-800 shadow-sm transition-colors hover:bg-white"
            >
              <ChevronRight size={16} aria-hidden />
            </button>
            <div className="absolute bottom-2.5 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
              {images.map((_, i) => (
                <span
                  key={i}
                  className={cn(
                    "h-1.5 w-1.5 rounded-full transition-colors",
                    i === activeIndex ? "bg-white" : "bg-white/50"
                  )}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="font-subheading text-lg text-brown-900">{event.title}</h3>

        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-brown-500">
          <span className="flex items-center gap-1.5">
            <Calendar size={14} aria-hidden />
            {formatEventDate(event.date, event.endDate)}
          </span>
          {locationLabel && (
            <span className="flex items-center gap-1.5">
              <MapPin size={14} aria-hidden />
              {locationLabel}
            </span>
          )}
        </div>

        {event.description && (
          <p className="mt-1 text-sm leading-relaxed text-brown-600">
            {toPlainText(event.description, 140)}
          </p>
        )}
      </div>
    </article>
  );
}
