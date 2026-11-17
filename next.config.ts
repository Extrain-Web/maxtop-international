
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,

  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },

  // The Express API (backend/) is reached through the same domain:
  //   /api/*     → API routes (admin login, inquiries, dashboard data)
  //   /uploads/* → images uploaded from the admin panel
  // On the VPS, Nginx can route these straight to the API instead.
  async rewrites() {
    const api = (process.env.API_URL || "http://127.0.0.1:5000").replace(/\/$/, "");
    return [
      { source: "/api/:path*", destination: `${api}/api/:path*` },
      { source: "/uploads/:path*", destination: `${api}/uploads/:path*` },
    ];
  },
};

export default nextConfig;
