"use client";

import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { SearchBar } from "@/components/layout/SearchBar";
import { urlFor } from "@/sanity/lib/image";
import { cn } from "@/lib/utils";
import type { LocationSummary } from "@/types/sanity";
import type { Image as SanityImage } from "sanity";

type NavbarProps = {
  siteTitle: string;
  logo?: SanityImage;
  locations: LocationSummary[];
};

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Events", href: "/events" },
  { label: "GNSHS Fiber Arts Club", href: "/fiber-arts-club" },
  { label: "Contact", href: "/contact" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export function Navbar({ siteTitle, logo, locations }: NavbarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [locationsOpen, setLocationsOpen] = useState(false);
  const [mobileLocationsOpen, setMobileLocationsOpen] = useState(false);

  function closeMobileMenu() {
    setMobileOpen(false);
    setMobileLocationsOpen(false);
  }

  const logoUrl = logo ? urlFor(logo)?.width(96).height(96).fit("crop").url() : undefined;

  return (
    <header className="sticky top-0 z-40 border-b border-tan-200/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          {logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={logoUrl}
              alt={siteTitle}
              className="h-10 w-10 rounded-full object-cover"
            />
          ) : (
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500 text-lg font-display text-white">
              L
            </span>
          )}
          <span className="hidden font-display text-xl text-brown-800 sm:block">
            {siteTitle}
          </span>
        </Link>

        <SearchBar className="hidden max-w-sm flex-1 md:block" />

        <nav aria-label="Primary" className="ml-auto hidden items-center gap-1 lg:flex">
          <Link
            href="/"
            className={cn(
              "rounded-full px-3 py-2 text-sm font-medium transition-colors hover:bg-tan-50 hover:text-green-700",
              isActive(pathname, "/") && pathname === "/" ? "text-green-700" : "text-brown-700"
            )}
          >
            Home
          </Link>

          <div
            className="relative"
            onMouseEnter={() => setLocationsOpen(true)}
            onMouseLeave={() => setLocationsOpen(false)}
          >
            <button
              type="button"
              onClick={() => setLocationsOpen((o) => !o)}
              aria-expanded={locationsOpen}
              className={cn(
                "flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium transition-colors hover:bg-tan-50 hover:text-green-700",
                isActive(pathname, "/locations") ? "text-green-700" : "text-brown-700"
              )}
            >
              Locations
              <ChevronDown size={14} className={cn("transition-transform", locationsOpen && "rotate-180")} aria-hidden />
            </button>
            {locationsOpen && (
              <div className="absolute left-0 top-full pt-2">
                <div className="w-56 rounded-2xl border border-tan-200 bg-white p-2 shadow-lg">
                  {locations.length === 0 && (
                    <p className="px-3 py-2 text-sm text-brown-400">Locations coming soon</p>
                  )}
                  {locations.map((loc) => (
                    <Link
                      key={loc._id}
                      href={`/locations/${loc.slug}`}
                      onClick={() => setLocationsOpen(false)}
                      className="block rounded-xl px-3 py-2 text-sm text-brown-700 hover:bg-tan-50 hover:text-green-700"
                    >
                      {loc.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {NAV_LINKS.slice(1).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-full px-3 py-2 text-sm font-medium transition-colors hover:bg-tan-50 hover:text-green-700",
                isActive(pathname, link.href) ? "text-green-700" : "text-brown-700"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setMobileOpen((o) => !o)}
          aria-expanded={mobileOpen}
          aria-label="Toggle menu"
          className="ml-auto flex h-10 w-10 items-center justify-center rounded-full text-brown-700 hover:bg-tan-50 lg:hidden"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <SearchBar className="px-4 pb-3 md:hidden" />

      {mobileOpen && (
        <div className="border-t border-tan-200 bg-white px-4 py-3 lg:hidden">
          <nav aria-label="Mobile" className="flex flex-col gap-1">
            <Link
              href="/"
              onClick={closeMobileMenu}
              className="rounded-xl px-3 py-2.5 text-sm font-medium text-brown-700 hover:bg-tan-50"
            >
              Home
            </Link>
            <button
              type="button"
              onClick={() => setMobileLocationsOpen((o) => !o)}
              aria-expanded={mobileLocationsOpen}
              className="flex items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm font-medium text-brown-700 hover:bg-tan-50"
            >
              Locations
              <ChevronDown size={14} className={cn("transition-transform", mobileLocationsOpen && "rotate-180")} aria-hidden />
            </button>
            {mobileLocationsOpen && (
              <div className="ml-3 flex flex-col gap-1 border-l border-tan-200 pl-3">
                {locations.length === 0 && (
                  <p className="px-3 py-1.5 text-sm text-brown-400">Locations coming soon</p>
                )}
                {locations.map((loc) => (
                  <Link
                    key={loc._id}
                    href={`/locations/${loc.slug}`}
                    onClick={closeMobileMenu}
                    className="rounded-xl px-3 py-1.5 text-sm text-brown-600 hover:bg-tan-50"
                  >
                    {loc.name}
                  </Link>
                ))}
              </div>
            )}
            {NAV_LINKS.slice(1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMobileMenu}
                className="rounded-xl px-3 py-2.5 text-sm font-medium text-brown-700 hover:bg-tan-50"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
