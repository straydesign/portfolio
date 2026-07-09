import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['lucide-react', '@react-three/drei', 'framer-motion', 'three'],
  },
  async redirects() {
    return [
      // The About page merged into the homepage as an anchor section.
      { source: '/about', destination: '/#about', permanent: true },
      { source: '/work', destination: '/#work', permanent: true },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [],
      afterFiles: [],
      fallback: [
        {
          source: '/:path*',
          destination: '/',
        },
      ],
    };
  },
};

export default withSentryConfig(nextConfig, {
  org: "stray-design-nm",
  project: "javascript-nextjs",
  widenClientFileUpload: true,
  tunnelRoute: "/monitoring",
  silent: !process.env.CI,
});
