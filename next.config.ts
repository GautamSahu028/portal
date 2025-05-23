import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        path: false,
        os: false,
        zlib: false,
        stream: false,
        buffer: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
};

export default nextConfig;
