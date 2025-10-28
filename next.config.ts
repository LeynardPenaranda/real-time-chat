import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["img.clerk.com"], // ✅ Allow Clerk-hosted images
  },
};

export default nextConfig;
