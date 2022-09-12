/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    API_KEY: ADD_API_KEY
  },
  images: {
    domains: ['images.data.gov.sg']
  },
}

module.exports = nextConfig
