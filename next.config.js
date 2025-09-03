/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
    dangerouslyAllowSVG: true, // Allow SVG optimization
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;", // Security policy for SVGs
  },
};

module.exports = nextConfig;