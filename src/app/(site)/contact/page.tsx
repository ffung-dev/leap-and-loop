import { Mail } from "lucide-react";
import type { Metadata } from "next";

import { SocialIcon } from "@/components/icons/SocialIcons";
import { ContactForm } from "@/components/forms/ContactForm";
import { PortableTextRenderer } from "@/components/ui/PortableTextRenderer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buildMetadata } from "@/lib/seo";
import { getContact } from "@/sanity/lib/data";

export async function generateMetadata(): Promise<Metadata> {
  const contact = await getContact();
  return buildMetadata({
    fallbackTitle: contact?.title || "Contact",
    fallbackDescription: contact?.intro || "Get in touch with Leap & Loop for questions, workshops, or custom commissions.",
    path: "/contact",
  });
}

export default async function ContactPage() {
  const contact = await getContact();
  const hasDirectContact = Boolean(contact?.email || contact?.instagramUrl);

  return (
    <div className="gradient-hero">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <SectionHeading
          as="h1"
          eyebrow={contact?.eyebrow || "We'd love to hear from you"}
          title={contact?.title || "Get in touch"}
          description={
            contact?.intro ||
            "Questions about a workshop, want to bring us to your event, or ready to start a custom commission? Send us a message."
          }
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-3 rounded-3xl border border-tan-300 bg-white p-6 shadow-sm sm:p-8">
            <ContactForm email={contact?.email} />
          </div>

          <div className="flex flex-col gap-6 lg:col-span-2">
            {hasDirectContact && (
              <div className="rounded-3xl border border-tan-300 bg-white p-6 shadow-sm">
                <h2 className="font-subheading text-lg text-brown-900">Reach us directly</h2>
                {contact?.email && (
                  <a
                    href={`mailto:${contact.email}`}
                    className="mt-4 flex items-center gap-2.5 text-sm text-brown-700 hover:text-green-700"
                  >
                    <Mail size={16} aria-hidden />
                    {contact.email}
                  </a>
                )}
                {contact?.instagramUrl && (
                  <a
                    href={contact.instagramUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="mt-2.5 flex items-center gap-2.5 text-sm text-brown-700 hover:text-green-700"
                  >
                    <SocialIcon platform="instagram" className="h-4 w-4" />
                    {contact.instagramHandle || "Instagram"}
                  </a>
                )}
              </div>
            )}

            {contact?.commissionInquiryText && (
              <div className="rounded-3xl border border-pink-200 bg-pink-50 p-6">
                <h2 className="font-subheading text-lg text-brown-900">
                  {contact.commissionInquiryTitle || "Custom commissions"}
                </h2>
                <div className="mt-3 text-sm">
                  <PortableTextRenderer value={contact.commissionInquiryText} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
