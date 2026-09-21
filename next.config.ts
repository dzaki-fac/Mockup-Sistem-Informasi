import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [{ source: "/publik", destination: "/", permanent: false }];
  },
};

export default nextConfig;
