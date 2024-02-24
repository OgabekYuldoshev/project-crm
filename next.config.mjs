/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    missingSuspenseWithCSRBailout: false
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/auth',
        permanent: true
      }
    ];
  }
};

export default nextConfig;
