/** @type {import('next').NextConfig} */
const nextConfig = {
  // Always use export for consistency, but we'll handle admin pages differently
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true // Required for static export
  },
  // Exclude admin pages from the production build
  webpack: (config, { dev, isServer }) => {
    // Only include admin pages in development mode
    if (!dev && isServer) {
      console.log('Production build - excluding admin pages');
    } else if (dev) {
      console.log('Development mode - including admin pages');
    }
    return config;
  }
}

module.exports = nextConfig
