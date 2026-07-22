"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

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

const DROPDOWN_TRANSITION = { duration: 0.18, ease: "easeOut" as const };
const PANEL_TRANSITION = { duration: 0.25, ease: "easeInOut" as const };

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export function Navbar({ siteTitle, logo, locations }: NavbarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [locationsOpen, setLocationsOpen] = useState(false);
  const [mobileLocationsOpen, setMobileLocationsOpen] = useState(false);
  const locationsRef = useRef<HTMLDivElement>(null);

  function closeMobileMenu() {
    setMobileOpen(false);
    setMobileLocationsOpen(false);
  }

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (locationsRef.current && !locationsRef.current.contains(e.target as Node)) {
        setLocationsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

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
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500 text-lg font-title text-white">
              L
            </span>
          )}
          <span className="hidden font-title text-xl text-brown-800 sm:block">
            {siteTitle}
          </span>
        </Link>

        <SearchBar className="hidden max-w-sm flex-1 md:block" />

        <nav aria-label="Primary" className="ml-auto hidden items-center gap-1 lg:flex">
          <Link
            href="/"
            className={cn(
              "rounded-full px-3 py-2 text-sm font-medium transition-colors hover:bg-tan-100 hover:text-green-700",
              isActive(pathname, "/") && pathname === "/" ? "text-green-700" : "text-brown-700"
            )}
          >
            Home
          </Link>

          <div className="relative" ref={locationsRef}>
            <button
              type="button"
              onClick={() => setLocationsOpen((o) => !o)}
              aria-expanded={locationsOpen}
              className={cn(
                "flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium transition-colors hover:bg-tan-100 hover:text-green-700",
                isActive(pathname, "/locations") ? "text-green-700" : "text-brown-700"
              )}
            >
              Locations
              <motion.span
                animate={{ rotate: locationsOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="flex"
              >
                <ChevronDown size={14} aria-hidden />
              </motion.span>
            </button>
            <AnimatePresence>
              {locationsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.97 }}
                  transition={DROPDOWN_TRANSITION}
                  className="absolute left-0 top-full pt-2"
                >
                  <div className="w-56 rounded-2xl border border-tan-200 bg-white p-2 shadow-lg">
                    {locations.length === 0 && (
                      <p className="px-3 py-2 text-sm text-brown-400">Locations coming soon</p>
                    )}
                    {locations.map((loc) => (
                      <Link
                        key={loc._id}
                        href={`/locations/${loc.slug}`}
                        onClick={() => setLocationsOpen(false)}
                        className="block rounded-xl px-3 py-2 text-sm text-brown-700 transition-colors hover:bg-tan-100 hover:text-green-700"
                      >
                        {loc.name}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {NAV_LINKS.slice(1).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-full px-3 py-2 text-sm font-medium transition-colors hover:bg-tan-100 hover:text-green-700",
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
          className="ml-auto flex h-10 w-10 items-center justify-center rounded-full text-brown-700 hover:bg-tan-100 lg:hidden"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={mobileOpen ? "close" : "open"}
              initial={{ opacity: 0, rotate: -45, scale: 0.7 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 45, scale: 0.7 }}
              transition={{ duration: 0.15 }}
              className="flex"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.span>
          </AnimatePresence>
        </button>
      </div>

      <SearchBar className="px-4 pb-3 md:hidden" />

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={PANEL_TRANSITION}
            className="overflow-hidden border-t border-tan-200 bg-white lg:hidden"
          >
            <nav aria-label="Mobile" className="flex flex-col gap-1 px-4 py-3">
              <Link
                href="/"
                onClick={closeMobileMenu}
                className="rounded-xl px-3 py-2.5 text-sm font-medium text-brown-700 transition-colors hover:bg-tan-100"
              >
                Home
              </Link>
              <button
                type="button"
                onClick={() => setMobileLocationsOpen((o) => !o)}
                aria-expanded={mobileLocationsOpen}
                className="flex items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm font-medium text-brown-700 transition-colors hover:bg-tan-100"
              >
                Locations
                <motion.span
                  animate={{ rotate: mobileLocationsOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex"
                >
                  <ChevronDown size={14} aria-hidden />
                </motion.span>
              </button>
              <AnimatePresence>
                {mobileLocationsOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={PANEL_TRANSITION}
                    className="ml-3 overflow-hidden border-l border-tan-200 pl-3"
                  >
                    <div className="flex flex-col gap-1 py-1">
                      {locations.length === 0 && (
                        <p className="px-3 py-1.5 text-sm text-brown-400">Locations coming soon</p>
                      )}
                      {locations.map((loc) => (
                        <Link
                          key={loc._id}
                          href={`/locations/${loc.slug}`}
                          onClick={closeMobileMenu}
                          className="rounded-xl px-3 py-1.5 text-sm text-brown-600 transition-colors hover:bg-tan-100"
                        >
                          {loc.name}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              {NAV_LINKS.slice(1).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMobileMenu}
                  className="rounded-xl px-3 py-2.5 text-sm font-medium text-brown-700 transition-colors hover:bg-tan-100"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
