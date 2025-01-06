/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: '**', // Akceptuj wszystkie hosty
          },
        ],
      },
};

export default nextConfig;
