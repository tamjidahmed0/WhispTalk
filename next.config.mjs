/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'http',
            hostname: 'localhost',
            pathname: '**',
            port:'1000'
          },
        ],
      },

      poweredByHeader: false

};

export default nextConfig;
