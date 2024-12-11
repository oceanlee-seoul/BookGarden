/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: new URL(process.env.NEXT_PUBLIC_SUPABASE_URL || '').hostname,
        port: '',
        pathname: '/storage/v1/object/public/image/**',
      },
    ],
  },
};

module.exports = nextConfig;
