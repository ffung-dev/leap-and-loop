import { Footer } from "@/components/layout/Footer";
import { FunFactPanel } from "@/components/layout/FunFactPanel";
import { Navbar } from "@/components/layout/Navbar";
import { getLocations, getSiteSettings } from "@/sanity/lib/data";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [siteSettings, locations] = await Promise.all([getSiteSettings(), getLocations()]);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-green-600 focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <Navbar
        siteTitle={siteSettings?.siteTitle || "Leap & Loop"}
        logo={siteSettings?.logo}
        locations={locations}
      />
      <div className="flex flex-1 flex-col lg:flex-row">
        <FunFactPanel
          intro={siteSettings?.funFactsIntro}
          funFacts={siteSettings?.funFacts}
          socialLinks={siteSettings?.socialLinks}
        />
        <main id="main-content" className="min-w-0 flex-1">
          {children}
        </main>
      </div>
      <Footer siteSettings={siteSettings} />
    </>
  );
}
