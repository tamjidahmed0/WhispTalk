/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          // {
          //   protocol: 'http',
          //   hostname: 'localhost',
          //   pathname: '**',
          //   port:'1000'
          // },
          {
            protocol: 'https',
            hostname: process.env.NEXT_PUBLIC_API,
            pathname: '**',
          },
        ],
      },

      poweredByHeader: false

};

export default nextConfig;
