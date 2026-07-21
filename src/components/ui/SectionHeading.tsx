import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-green-700">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl text-brown-900 sm:text-4xl">{title}</h2>
      {description && <p className="mt-3 text-base text-brown-600">{description}</p>}
    </div>
  );
}
