import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["lh3.googleusercontent.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "secondvibe.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "secondvibe.s3.ap-southeast-2.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
