import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [68, 70, 75],
  },
  // Hostinger Application Hosting exposes the host machine CPU count to Next.js.
  // Limit worker pools so the app stays within shared-hosting process limits.
  experimental: {
    cpus: 1,
    workerThreads: false,
  },
};

export default nextConfig;
