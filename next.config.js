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

module.exports = nextConfig
