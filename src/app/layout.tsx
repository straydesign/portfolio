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
    default: "Tom Sesler — Web Design & Product Design | Erie, PA",
    template: "%s | Tom Sesler — Erie, PA",
  },
  description:
    "Professional web design in Erie, PA. Custom websites, UX design, and SEO for Erie businesses. Fast, responsive, and built to convert. Free consultation — (814) 964-0081.",
  metadataBase: new URL("https://straydesign.co"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    title: "Tom Sesler — Professional Web Design in Erie, PA",
    description:
      "Custom web design and development for Erie, PA businesses. Modern, fast, SEO-optimized websites that convert visitors into customers.",
    siteName: "Tom Sesler — Web Design Erie PA",
    url: "https://straydesign.co",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tom Sesler — Web Design Erie, PA",
    description:
      "Professional web design for Erie, PA businesses. Custom websites, UX design, SEO, and digital marketing.",
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
    "web design Erie PA",
    "web designer Erie Pennsylvania",
    "professional web design Erie",
    "website design Erie PA",
    "web development Erie PA",
    "SEO Erie PA",
    "UX designer Erie PA",
    "product designer Erie",
    "Tom Sesler",
    "Thomas Sesler",
    "web design Northwestern PA",
    "Erie PA web developer",
    "custom website Erie",
    "small business web design Erie",
    "responsive web design Erie PA",
    "Figma designer Erie",
    "UI UX design Erie PA",
  ],
  authors: [{ name: "Tom Sesler" }],
  creator: "Tom Sesler",
  other: {
    "geo.region": "US-PA",
    "geo.placename": "Erie",
    "geo.position": "42.1292;-80.0851",
    "ICBM": "42.1292, -80.0851",
  },
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
        name: "Tom Sesler — Web Design",
        alternateName: "Stray Design Co",
        description:
          "Professional web design and development services in Erie, PA. Custom websites, UX/UI design, SEO, and digital marketing for local businesses.",
        url: "https://straydesign.co",
        telephone: "+1-814-964-0081",
        email: "tlsesler44@gmail.com",
        priceRange: "$$",
        image: "https://straydesign.co/images/about-photo.jpg",
        areaServed: [
          {
            "@type": "City",
            name: "Erie",
            containedInPlace: {
              "@type": "State",
              name: "Pennsylvania",
            },
          },
          {
            "@type": "AdministrativeArea",
            name: "Northwestern Pennsylvania",
          },
        ],
        geo: {
          "@type": "GeoCoordinates",
          latitude: 42.1292,
          longitude: -80.0851,
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Erie",
          addressRegion: "PA",
          addressCountry: "US",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Web Design Services",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Custom Website Design",
                description: "Hand-crafted, responsive website design and development for Erie, PA businesses.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "SEO & Digital Marketing",
                description: "Search engine optimization and digital marketing for Erie area businesses.",
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
        jobTitle: "Web Designer & Product Designer",
        description:
          "Professional web designer in Erie, PA — from ethnographic field research to interactive prototypes to live products.",
        url: "https://straydesign.co",
        sameAs: ["https://www.linkedin.com/in/tom-sesler/"],
        email: "tlsesler44@gmail.com",
        telephone: "+1-814-964-0081",
        knowsAbout: [
          "Web Design",
          "Web Development",
          "UX Design",
          "UI Design",
          "Product Design",
          "SEO",
          "Figma",
          "React",
          "Next.js",
        ],
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: "University of New Hampshire",
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Erie",
          addressRegion: "PA",
          addressCountry: "US",
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://straydesign.co/#website",
        url: "https://straydesign.co",
        name: "Tom Sesler — Web Design Erie PA",
        description: "Professional web design and development in Erie, Pennsylvania.",
        publisher: { "@id": "https://straydesign.co/#person" },
      },
    ],
  };

  return (
    <html lang="en" className={`${inter.variable} ${bungee.variable} ${playfair.variable}`}>
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
