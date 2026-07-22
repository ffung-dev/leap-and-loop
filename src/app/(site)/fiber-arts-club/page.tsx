import type { Metadata } from "next";

import { ImageGallery } from "@/components/gallery/ImageGallery";
import { Button } from "@/components/ui/Button";
import { PortableTextRenderer } from "@/components/ui/PortableTextRenderer";
import { RoundedImage } from "@/components/ui/RoundedImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buildMetadata } from "@/lib/seo";
import { getFiberArtsClub } from "@/sanity/lib/data";

const FALLBACK_TITLE = "GNSHS Fiber Arts Club";
const FALLBACK_MISSION =
  "The Great Neck South High School Fiber Arts Club is where Leap & Loop began — a group of students learning, creating, and giving back through fiber arts.";

export async function generateMetadata(): Promise<Metadata> {
  const club = await getFiberArtsClub();
  return buildMetadata({
    seo: club?.seo,
    fallbackTitle: FALLBACK_TITLE,
    fallbackDescription: club?.mission || FALLBACK_MISSION,
    path: "/fiber-arts-club",
  });
}

export default async function FiberArtsClubPage() {
  const club = await getFiberArtsClub();

  const title = club?.title || FALLBACK_TITLE;
  const mission = club?.mission || FALLBACK_MISSION;

  return (
    <div>
      <div className="gradient-hero">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-20 lg:px-8">
          <div>
            <span className="mb-4 inline-block rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-green-700 shadow-sm ring-1 ring-pink-200">
              {club?.heroEyebrow || "Where it all started"}
            </span>
            <h1 className="font-title text-4xl text-brown-900 sm:text-5xl">{title}</h1>
            <p className="mt-5 text-lg leading-relaxed text-brown-600">{mission}</p>
            <div className="mt-8">
              <Button href="/contact">{club?.ctaLabel || "Get involved"}</Button>
            </div>
          </div>
          <div className="relative aspect-[4/3] w-full">
            <RoundedImage image={club?.heroImage} fallbackAlt={title} rounded="3xl" priority />
          </div>
        </div>
      </div>

      {club?.description && (
        <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
          <PortableTextRenderer value={club.description} />
        </div>
      )}

      {club?.activities && club.activities.length > 0 && (
        <section className="bg-tan-100 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow={club?.activitiesEyebrow || "What we do"}
              title={club?.activitiesTitle || "Club activities"}
            />
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {club.activities.map((activity, i) => (
                <div key={i} className="overflow-hidden rounded-3xl border border-tan-300 bg-white shadow-sm">
                  {activity.image && (
                    <div className="relative aspect-[16/10] w-full">
                      <RoundedImage image={activity.image} fallbackAlt={activity.title} rounded="md" className="h-full w-full rounded-b-none" />
                    </div>
                  )}
                  <div className="p-5">
                    <h3 className="font-subheading text-lg text-brown-900">{activity.title}</h3>
                    {activity.description && (
                      <p className="mt-1.5 text-sm leading-relaxed text-brown-600">{activity.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {club?.communityProjects && club.communityProjects.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow={club?.communityProjectsEyebrow || "Giving back"}
            title={club?.communityProjectsTitle || "Community service projects"}
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {club.communityProjects.map((project, i) => (
              <div key={i} className="overflow-hidden rounded-3xl border border-tan-300 bg-white shadow-sm">
                <div className="relative aspect-[16/10] w-full">
                  <RoundedImage image={project.image} fallbackAlt={project.title} rounded="md" className="h-full w-full rounded-b-none" />
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
      )}

      {club?.gallery && club.gallery.length > 0 && (
        <section className="bg-tan-100 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow={club?.galleryEyebrow || "Gallery"}
              title={club?.galleryTitle || "From the club"}
            />
            <div className="mt-10">
              <ImageGallery images={club.gallery} />
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
