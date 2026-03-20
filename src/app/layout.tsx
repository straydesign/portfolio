import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Bungee, Playfair_Display } from "next/font/google";
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

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-family-playfair",
  preload: false,
});

export const metadata: Metadata = {
  title: {
    default: "Tom Sesler — Product Designer",
    template: "%s | Tom Sesler",
  },
  description:
    "Product designer building digital experiences. Research-driven UX, interface design, and live products.",
  metadataBase: new URL("https://straydesign.co"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    title: "Tom Sesler — Product Designer",
    description:
      "Product designer building web and mobile experiences. Research-driven UX, interface design, and live shipped products.",
    siteName: "Tom Sesler — Product Designer",
    url: "https://straydesign.co",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Tom Sesler — Product Designer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tom Sesler — Product Designer",
    description:
      "Product designer building web and mobile experiences. Research-driven UX, interface design, and live shipped products.",
    images: ["/opengraph-image"],
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
    "product designer",
    "UX designer",
    "UI designer",
    "product design portfolio",
    "UX research",
    "interface design",
    "Tom Sesler",
    "Thomas Sesler",
    "heuristic evaluation",
    "usability research",
    "design case study",
    "web application design",
    "mobile app design",
    "user experience design",
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
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": "https://straydesign.co/#business",
        name: "Tom Sesler — Product Design",
        alternateName: "Stray Design Co",
        description:
          "Product design, UX research, and interface design. Research-driven UX, live shipped products, and case studies.",
        url: "https://straydesign.co",
        email: "tom@straydesign.co",
        image: "https://straydesign.co/images/about-photo.jpg",
        areaServed: {
          "@type": "Country",
          name: "United States",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Product Design Services",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Product Design",
                description: "End-to-end product design from research through shipped interfaces.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "UX Research & Design",
                description: "User experience research, prototyping, and interface design.",
              },
            },
          ],
        },
        sameAs: ["https://www.linkedin.com/in/tom-sesler/"],
      },
      {
        "@type": "Person",
        "@id": "https://straydesign.co/#person",
        name: "Tom Sesler",
        alternateName: "Thomas Sesler",
        jobTitle: "Product Designer",
        description:
          "Product designer — from ethnographic field research to interactive prototypes to live products.",
        url: "https://straydesign.co",
        sameAs: ["https://www.linkedin.com/in/tom-sesler/"],
        email: "tom@straydesign.co",
        knowsAbout: [
          "Product Design",
          "UX Research",
          "UX Design",
          "UI Design",
          "Heuristic Evaluation",
          "Figma",
          "React",
          "Next.js",
        ],
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: "University of New Hampshire",
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://straydesign.co/#website",
        url: "https://straydesign.co",
        name: "Tom Sesler — Product Designer",
        description: "Product design portfolio. Research-driven UX, interface design, and live shipped products.",
        publisher: { "@id": "https://straydesign.co/#person" },
      },
    ],
  };

  return (
    <html lang="en" className={`${inter.variable} ${bungee.variable} ${playfair.variable}`}>
      <head>
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
