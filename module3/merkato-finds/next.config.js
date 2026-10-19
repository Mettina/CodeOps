/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Product photos are Unsplash URLs; next/image may only optimise hosts listed here.
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
};
module.exports = nextConfig;
