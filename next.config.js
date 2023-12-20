/** @type {import('next').NextConfig} */
const nextConfig = {
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
