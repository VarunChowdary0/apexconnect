/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow dynamic routes during development and server rendering
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;
