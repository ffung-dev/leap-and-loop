import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  /** Use "h1" when this is the page's main title (e.g. Locations, Events, Contact). Defaults to "h2" for in-page subsections. */
  as?: "h1" | "h2";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  as = "h2",
}: SectionHeadingProps) {
  const Heading = as;

  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-green-700">
          {eyebrow}
        </p>
      )}
      <Heading
        className={cn(
          "text-brown-900",
          as === "h1"
            ? "font-title text-4xl sm:text-5xl"
            : "font-subheading text-3xl sm:text-4xl"
        )}
      >
        {title}
      </Heading>
      {description && <p className="mt-3 text-base text-brown-600">{description}</p>}
    </div>
  );
}
