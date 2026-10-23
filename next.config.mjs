import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

function hostingerRemotePatterns() {
  const patterns = [
    {
      protocol: "https",
      hostname: "**.hostingersite.com",
      pathname: "/**",
    },
    {
      protocol: "https",
      hostname: "**.hostinger.site",
      pathname: "/**",
    },
  ];

  const base = process.env.HOSTINGER_PUBLIC_BASE_URL?.trim();
  if (base) {
    try {
      const { hostname, protocol } = new URL(base);
      if (hostname && protocol.startsWith("http")) {
        patterns.unshift({
          protocol: protocol.replace(":", ""),
          hostname,
          pathname: "/**",
        });
      }
    } catch {
      /* ignore invalid env */
    }
  }

  return patterns;
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: projectRoot,
  experimental: {
    agentUpgrade: "security",
  },
  images: {
    remotePatterns: hostingerRemotePatterns(),
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    // Pre-merge CMS used basePath `/blogs`, so admin lived at `/blogs/admin`.
    return [
      {
        source: "/blogs/admin",
        destination: "/admin",
        permanent: true,
      },
      {
        source: "/blogs/admin/:path*",
        destination: "/admin/:path*",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
