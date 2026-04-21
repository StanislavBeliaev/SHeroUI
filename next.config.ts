import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'test3.salon.balinasoft.com',
      },
      {
        protocol: 'https',
        hostname: 'salonpro.online',
      },
    ],
  },
};

export default nextConfig;
