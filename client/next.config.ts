import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",  // REQUIRED for Render

  images: {
    domains: ["lh3.googleusercontent.com"],
  },

  typescript: {
    ignoreBuildErrors: true,
  },

  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
