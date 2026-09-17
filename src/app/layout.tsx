import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { IBM_Plex_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";

// Body. A grotesque with real character — not the default sans.
const plex = IBM_Plex_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-family-body",
});

// The one display face. Preloaded — it sets the hero, so it is the LCP text.
const instrument = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-family-display",
});

const HOME_DESCRIPTION =
  "Product designer building web and mobile experiences — interface design, design systems, and live, shipped products.";

export const metadata: Metadata = {
  title: {
    default: "Tom Sesler — Product Designer",
    template: "%s | Tom Sesler",
  },
  /* One sentence, used everywhere. The meta description and the og:description
     were two drafts of the same line — "digital experiences" in search,
     "web and mobile experiences" in a link preview — which is a sentence
     nobody proofread twice. */
  description: HOME_DESCRIPTION,
  metadataBase: new URL("https://straydesign.co"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    title: "Tom Sesler — Product Designer",
    description: HOME_DESCRIPTION,
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
    description: HOME_DESCRIPTION,
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
    "design systems",
    "interface design",
    "Tom Sesler",
    "Thomas Sesler",
    "heuristic evaluation",
    "shipped products",
    "design case study",
    "web application design",
    "mobile app design",
    "user experience design",
  ],
  authors: [{ name: "Tom Sesler" }],
  creator: "Tom Sesler",
};

export const viewport: Viewport = {
  themeColor: "#f7f7f7",
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
          "Product design, interface design, and design systems — live shipped products and case studies.",
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
                description: "End-to-end product design from concept through shipped interfaces.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "UX & Interface Design",
                description: "Interface design, prototyping, and design systems.",
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
          "Product designer — from interactive prototypes to live, shipped products.",
        url: "https://straydesign.co",
        sameAs: ["https://www.linkedin.com/in/tom-sesler/"],
        email: "tom@straydesign.co",
        knowsAbout: [
          "Product Design",
          "Design Systems",
          "UX Design",
          "UI Design",
          "Heuristic Evaluation",
          "Figma",
          "Responsive Design",
          "Design Systems",
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
        description: "Product design portfolio. Interface design, design systems, and live shipped products.",
        publisher: { "@id": "https://straydesign.co/#person" },
      },
    ],
  };

  return (
    <html lang="en" className={`${plex.variable} ${instrument.variable}`} suppressHydrationWarning>
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
        {/* framer-motion bakes the pre-animation state into the server HTML,
            so with scripting off every revealed block would render at opacity
            0 and never come back. The reduced-motion twin of this rule lives
            in globals.css. */}
        <noscript>
          <style>{'[data-reveal]{opacity:1!important;transform:none!important}'}</style>
        </noscript>
      </head>
      <body className={plex.className}>
        {children}
      </body>
    </html>
  );
}
