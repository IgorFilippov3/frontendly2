/** @type {import('next').NextConfig} */
const nextConfig = {
  headers: () => [
    {
      source: '/',
      headers: [
        {
          key: 'Cache-Control',
          value: 'no-store',
        },
      ],
    },
  ],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'frontendly.s3.eu-central-1.amazonaws.com',
      },
    ],
  },
}

module.exports = nextConfig
