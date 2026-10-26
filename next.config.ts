import type { NextConfig } from "next";

const isNetlify = process.env.NETLIFY === "true";

const nextConfig: NextConfig = {
  // Di sandbox/lokal: standalone (server bun). Di Netlify: static export
  // ke folder `out/` — semua data (pesan + foto) menempel di hash link,
  // jadi tidak ada API route/serverless yang diperlukan.
  ...(isNetlify ? { output: "export" as const } : { output: "standalone" as const }),
  images: { unoptimized: true },
  allowedDevOrigins: ["*.space-z.ai", "*.space-z.ai:443"],
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
