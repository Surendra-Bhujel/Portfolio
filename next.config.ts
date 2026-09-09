import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // 👈 This is the key change
  images: {
    unoptimized: true, // Required for static export if you use Next.js Image component
  },
  // Add any other config options you need here
};

export default nextConfig;