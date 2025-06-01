/** @type {import('next').NextConfig} */
const nextConfig = {
  // Only use export in production
  ...(process.env.NODE_ENV === 'production' && {
    output: 'export',
  }),
  trailingSlash: true,
  images: {
    unoptimized: true // Required for static export
  },
  // Exclude admin pages from the production build
  pageExtensions: process.env.NODE_ENV === 'production' 
    ? ['js', 'jsx', 'ts', 'tsx'].map(ext => 
        `(?!admin\\/.*\\.${ext}$).*\\.${ext}$`
      )
    : ['js', 'jsx', 'ts', 'tsx']
}

// Force Next.js to recognize environment correctly
if (process.env.NODE_ENV !== 'production') {
  console.log('Running in development mode - admin pages should be available');
}

module.exports = nextConfig
