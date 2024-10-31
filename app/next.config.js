const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        port: '',
        pathname: '/**',
      },
    ],
  },
  staticPageGenerationTimeout: 10 * 60, // 10 minutes,
};

module.exports = nextConfig;
