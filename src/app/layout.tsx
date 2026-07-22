import type { Metadata } from "next";
import { Elsie, Montserrat, Patrick_Hand_SC } from "next/font/google";

import "./globals.css";

const patrickHandSC = Patrick_Hand_SC({
  variable: "--font-patrick-hand",
  subsets: ["latin"],
  weight: ["400"],
});

const elsie = Elsie({
  variable: "--font-elsie",
  subsets: ["latin"],
  weight: ["400", "900"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
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
      className={`${patrickHandSC.variable} ${elsie.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">{children}</body>
    </html>
  );
}
