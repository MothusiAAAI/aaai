// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: { turbo: {} },

  // Skip ESLint during CI builds (we’ll clean up types later)
  eslint: { ignoreDuringBuilds: true },

  // Optional: if you ever see TS build errors you want to bypass temporarily
  // typescript: { ignoreBuildErrors: true },
};

export default nextConfig;