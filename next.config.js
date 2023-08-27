/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
          {
            source: '/',
            destination: '/Signup',
            permanent: true,
          },
        ]
      },
}

module.exports = nextConfig
