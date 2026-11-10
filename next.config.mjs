/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  poweredByHeader: false,
  agentRules: false,
  allowedDevOrigins: (process.env.NEXT_DEV_ALLOWED_ORIGINS || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
