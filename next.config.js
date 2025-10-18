/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removido output: 'export' para permitir SSR y API routes
  images: {
    unoptimized: false, // Optimización de imágenes habilitada
    domains: ['monserratenses.org.ar'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'monserratenses.org.ar',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: '*.railway.app', // Para Railway
        pathname: '/uploads/**',
      },
    ],
  },
}

module.exports = nextConfig
