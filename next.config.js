/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  images: {
    unoptimized: true,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fakestoreapi.com',
        port: '',
        pathname: '/img/**',
      },
    ],
  },
}
