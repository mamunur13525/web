import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.licdn.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'visionic.agency',
        pathname: '/**'
      }
    ]
  }
  /* config options here */
};

export default nextConfig;
