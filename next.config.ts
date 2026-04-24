import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  allowedDevOrigins: [
    'localhost:3000', 
    '192.168.0.156:3000', 
    '192.168.0.156',
    '192.168.100.135:3000',
    '192.168.100.135'
  ],
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
