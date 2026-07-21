import Link from "next/link";

import { SocialIcon } from "@/components/icons/SocialIcons";
import type { SiteSettings } from "@/types/sanity";

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "Locations", href: "/locations" },
  { label: "Events", href: "/events" },
  { label: "GNSHS Fiber Arts Club", href: "/fiber-arts-club" },
  { label: "Contact", href: "/contact" },
];

export function Footer({ siteSettings }: { siteSettings: SiteSettings | null }) {
  const siteTitle = siteSettings?.siteTitle || "Leap & Loop";
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-tan-200 bg-tan-100">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <p className="font-title text-2xl text-brown-800">{siteTitle}</p>
          {siteSettings?.tagline && (
            <p className="mt-2 max-w-xs text-sm text-brown-600">{siteSettings.tagline}</p>
          )}
          {siteSettings?.socialLinks && siteSettings.socialLinks.length > 0 && (
            <div className="mt-5 flex gap-2.5">
              {siteSettings.socialLinks.map((link) => (
                <a
                  key={`${link.platform}-${link.url}`}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={link.label || link.platform}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-green-700 shadow-sm ring-1 ring-tan-200 transition-colors hover:bg-green-500 hover:text-white"
                >
                  <SocialIcon platform={link.platform} className="h-4.5 w-4.5" />
                </a>
              ))}
            </div>
          )}
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-brown-500">Explore</p>
          <ul className="mt-4 space-y-2.5">
            {QUICK_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-brown-700 hover:text-green-700">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-brown-500">Get in touch</p>
          {siteSettings?.email && (
            <a
              href={`mailto:${siteSettings.email}`}
              className="mt-4 block text-sm text-brown-700 hover:text-green-700"
            >
              {siteSettings.email}
            </a>
          )}
          <Link
            href="/contact"
            className="mt-2 inline-block text-sm text-brown-700 hover:text-green-700"
          >
            Send us a message &rarr;
          </Link>
        </div>
      </div>

      <div className="border-t border-tan-200 px-4 py-5 text-center text-xs text-brown-500 sm:px-6 lg:px-8">
        &copy; {year} {siteTitle}. Handmade with care by our teen crocheters.
      </div>
    </footer>
  );
}
