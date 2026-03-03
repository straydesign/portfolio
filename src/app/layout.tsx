import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Bungee } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-family-inter",
});

const bungee = Bungee({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-family-bungee",
  preload: false, // Don't preload 48K font — headings render with fallback, swap on load
});

export const metadata: Metadata = {
  title: {
    default: "Tom Sesler — Product Designer | Portfolio",
    template: "%s | Tom Sesler",
  },
  description:
    "Product designer creating end-to-end digital experiences. Case studies in merchandising systems, UX research, and AI-powered products.",
  metadataBase: new URL("https://straydesign.co"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    title: "Tom Sesler — Product Designer",
    description:
      "Product designer creating end-to-end digital experiences. Case studies in merchandising systems, UX research, and AI-powered products.",
    siteName: "Thomas Sesler Portfolio",
    url: "https://straydesign.co",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tom Sesler — Product Designer",
    description:
      "Product designer creating end-to-end digital experiences. Case studies in merchandising systems, UX research, and AI-powered products.",
  },
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
  keywords: [
    "UX Designer",
    "Product Designer",
    "UI Designer",
    "Tom Sesler",
    "Thomas Sesler",
    "Portfolio",
    "Figma",
    "User Experience",
    "New Hampshire",
    "Boston",
    "Remote UX Designer",
  ],
  authors: [{ name: "Tom Sesler" }],
  creator: "Tom Sesler",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Tom Sesler",
    alternateName: "Thomas Sesler",
    jobTitle: "Product Designer",
    description:
      "Product Designer — from ethnographic field research to interactive prototypes to live products.",
    url: "https://straydesign.co",
    sameAs: ["https://www.linkedin.com/in/tom-sesler/"],
    email: "tlsesler44@gmail.com",
    knowsAbout: [
      "UX Design",
      "UI Design",
      "Product Design",
      "Figma",
      "User Research",
      "Prototyping",
      "Design Systems",
    ],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "University of New Hampshire",
    },
  };

  return (
    <html lang="en" className={`${inter.variable} ${bungee.variable}`}>
      <head>
        {/* Preconnect to YouTube thumbnail CDN (used by LiteYouTube on home page) */}
        <link rel="preconnect" href="https://i.ytimg.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-FG26GM9ZVZ"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-FG26GM9ZVZ');
          `}
        </Script>

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
