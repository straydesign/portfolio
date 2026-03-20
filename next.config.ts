import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['lucide-react', '@react-three/drei', 'framer-motion', 'three'],
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
