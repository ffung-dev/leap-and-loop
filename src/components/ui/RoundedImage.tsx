import Image from "next/image";

import { urlFor } from "@/sanity/lib/image";
import { cn } from "@/lib/utils";
import type { ImageWithAlt } from "@/types/sanity";

type RoundedImageProps = {
  image?: ImageWithAlt | null;
  fallbackAlt?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  rounded?: "md" | "lg" | "xl" | "2xl" | "3xl" | "full";
  /** Fills the nearest `position: relative` ancestor — the caller must size that ancestor (e.g. `relative aspect-[4/3]`). */
  fill?: boolean;
  width?: number;
  height?: number;
};

const ROUNDING = {
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  "3xl": "rounded-3xl",
  full: "rounded-full",
};

export function RoundedImage({
  image,
  fallbackAlt = "",
  className,
  sizes = "(min-width: 1024px) 33vw, 100vw",
  priority,
  rounded = "2xl",
  fill = true,
  width,
  height,
}: RoundedImageProps) {
  const src = image?.image ? urlFor(image.image)?.width(1200).fit("max").auto("format").url() : undefined;

  if (!src) {
    const placeholder = (
      <>
        <span className="text-3xl" aria-hidden>
          🧶
        </span>
        <span className="text-xs font-medium text-tan-600">Photo coming soon</span>
      </>
    );
    const placeholderClasses =
      "flex flex-col items-center justify-center gap-2 border-2 border-dashed border-tan-400 bg-tan-100 text-tan-500";

    if (fill) {
      return (
        <div
          className={cn("absolute inset-0 overflow-hidden", placeholderClasses, ROUNDING[rounded], className)}
          role="img"
          aria-label={image?.alt || fallbackAlt}
        >
          {placeholder}
        </div>
      );
    }

    return (
      <div
        className={cn(placeholderClasses, ROUNDING[rounded], className)}
        style={{ width: width || 800, height: height || 600 }}
        role="img"
        aria-label={image?.alt || fallbackAlt}
      >
        {placeholder}
      </div>
    );
  }

  if (fill) {
    return (
      <div className={cn("absolute inset-0 overflow-hidden", ROUNDING[rounded], className)}>
        <Image
          src={src}
          alt={image?.alt || fallbackAlt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={image?.alt || fallbackAlt}
      width={width || 800}
      height={height || 600}
      sizes={sizes}
      priority={priority}
      className={cn("overflow-hidden object-cover", ROUNDING[rounded], className)}
    />
  );
}
