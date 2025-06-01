import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    GOOGLE_PRIVATE_KEY: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  }
};

export default nextConfig; 