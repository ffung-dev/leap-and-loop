import { SectionHeading } from "@/components/ui/SectionHeading";
import { RoundedImage } from "@/components/ui/RoundedImage";
import type { GalleryHighlight } from "@/types/sanity";

type FeaturedProjectsProps = {
  projects: GalleryHighlight[];
  eyebrow?: string;
  title?: string;
};

export function FeaturedProjects({ projects, eyebrow, title }: FeaturedProjectsProps) {
  if (!projects || projects.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow={eyebrow || "Our work"}
        title={title || "A few of our favorites"}
        align="center"
        className="mx-auto"
      />

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <div key={i} className="group overflow-hidden rounded-3xl border border-tan-300 bg-white shadow-sm">
            <div className="relative aspect-square w-full">
              <RoundedImage
                image={project.image}
                fallbackAlt={project.title}
                rounded="md"
                className="h-full w-full rounded-b-none transition-transform duration-300 group-hover:scale-[1.03]"
              />
            </div>
            <div className="p-5">
              <h3 className="font-subheading text-lg text-brown-900">{project.title}</h3>
              {project.description && (
                <p className="mt-1.5 text-sm leading-relaxed text-brown-600">{project.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
