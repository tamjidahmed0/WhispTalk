/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'http',
            hostname: 'localhost',
            pathname: '**',
            port:'1024'
          },
          {
            protocol: 'https',
            hostname: process.env.NEXT_PUBLIC_IMAGE_DOMAINS,
            pathname: '**',
          },
        ],
      },

      poweredByHeader: false

};

export default nextConfig;
