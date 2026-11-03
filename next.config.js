/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // static export for Cloudflare Workers assets (no server features are used)
  output: 'export',
  images: { unoptimized: true },
};

module.exports = nextConfig;
