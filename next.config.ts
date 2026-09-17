import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['lucide-react', '@react-three/drei', 'framer-motion', 'three'],
  },
  /* Both OG card routes read the display face off disk at request time with
     `join(process.cwd(), 'src/app/fonts/…')`. Next's tracer does resolve that
     today — checked with a control build, the .ttf is in both
     `opengraph-image/route.js.nft.json` files without this — but it resolves it
     by constant-folding a string, and the day someone builds that path from a
     variable it stops, silently: the card 500s only in production, because
     `next start` runs inside the repo where the file is there either way.
     Pinned to the two routes that need it rather than to `/**`, which would
     post a 70KB font into robots.txt and the icons as well. */
  outputFileTracingIncludes: {
    '/opengraph-image': ['./src/app/fonts/**'],
    '/[slug]/opengraph-image': ['./src/app/fonts/**'],
  },
  async redirects() {
    return [
      // The About page merged into the homepage as an anchor section.
      { source: '/about', destination: '/#about', permanent: true },
      { source: '/work', destination: '/#work', permanent: true },
    ];
  },
};

export default withSentryConfig(nextConfig, {
  org: "stray-design-nm",
  project: "javascript-nextjs",
  widenClientFileUpload: true,
  tunnelRoute: "/monitoring",
  silent: !process.env.CI,
});
