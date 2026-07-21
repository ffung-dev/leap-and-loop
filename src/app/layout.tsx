import type { Metadata } from "next";
import { Birthstone_Bounce, Elsie, Karla } from "next/font/google";

import "./globals.css";

const birthstoneBounce = Birthstone_Bounce({
  variable: "--font-birthstone",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const elsie = Elsie({
  variable: "--font-elsie",
  subsets: ["latin"],
  weight: ["400", "900"],
});

const karla = Karla({
  variable: "--font-karla",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "Leap & Loop",
    template: "%s | Leap & Loop",
  },
  description:
    "Leap & Loop is a teen-run crochet business creating handmade accessories, custom commissions, and community fiber arts events on Long Island.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${birthstoneBounce.variable} ${elsie.variable} ${karla.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">{children}</body>
    </html>
  );
}
