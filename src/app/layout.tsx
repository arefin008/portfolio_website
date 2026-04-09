import type { Metadata } from "next";
import { IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
const metadataBase = siteUrl ? new URL(siteUrl) : undefined;
const siteTitle = "Nasimul Arafin Rounok | Full Stack Software Engineer";
const siteDescription =
  "Portfolio of Nasimul Arafin Rounok, a full stack software engineer building responsive web applications, APIs, and database-driven systems with React, Next.js, TypeScript, and practical backend architecture.";
const socialImages = [
  {
    url: "/logo.png",
    alt: "Nasimul Arafin Rounok portfolio logo",
  },
];

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: siteTitle,
    template: "%s | Nasimul Arafin Rounok",
  },
  description: siteDescription,
  applicationName: "Nasimul Arafin Rounok Portfolio",
  referrer: "origin-when-cross-origin",
  keywords: [
    "Nasimul Arafin Rounok",
    "full stack developer",
    "software engineer portfolio",
    "React developer",
    "Next.js developer",
    "TypeScript developer",
    "frontend developer",
    "backend developer",
    "API development",
    "web application developer",
    "Dhaka Bangladesh developer",
  ],
  authors: [{ name: "Nasimul Arafin Rounok" }],
  creator: "Nasimul Arafin Rounok",
  publisher: "Nasimul Arafin Rounok",
  category: "technology",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  ...(metadataBase
    ? {
        alternates: {
          canonical: "/",
        },
      }
    : {}),
  ...(metadataBase
    ? {
        openGraph: {
          type: "website" as const,
          locale: "en_US",
          url: "/",
          title: siteTitle,
          description: siteDescription,
          siteName: "Nasimul Arafin Rounok Portfolio",
          images: socialImages,
        },
        twitter: {
          card: "summary_large_image" as const,
          title: siteTitle,
          description: siteDescription,
          images: socialImages.map((image) => image.url),
        },
      }
    : {}),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${ibmPlexMono.variable} relative h-full`}>
      <body className="relative min-h-full bg-[var(--color-page)] text-[var(--color-ink)] antialiased">
        {children}
      </body>
    </html>
  );
}
