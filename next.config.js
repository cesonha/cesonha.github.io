/** @type {import('next').NextConfig} */
const nextConfig = {
  // Only use export in production
  ...(process.env.NODE_ENV === 'production' ? {
    output: 'export',
  } : {}),
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

console.log(`Running in ${process.env.NODE_ENV} mode - output: ${process.env.NODE_ENV === 'production' ? 'export' : 'server'}`);

module.exports = nextConfig
