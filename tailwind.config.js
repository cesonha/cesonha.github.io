/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Main color palette - Retro orange theme
        primary: {
          DEFAULT: '#FF6B35', // Main orange from image
          hover: '#E85A2B', // Darker orange for hover states
          light: '#FF8B5A', // Lighter orange variant
          lighter: '#FF8B5A', // Even lighter orange
          dark: '#D4421A', // Dark orange
        },
        // Background colors
        dark: {
          DEFAULT: '#F5F1E8', // Light cream/beige background from image
          lighter: '#F0EBE0', // Even lighter cream
          card: '#F0EBE0', // Slightly darker cream for cards
          border: '#E8DFD0', // Border color in cream tone
        },
        // Text colors
        text: {
          primary: '#2D1810', // Dark brown from image (not pure black)
          secondary: '#5D4037', // Medium brown for secondary text
          muted: '#8D6E63', // Lighter brown for muted text
          heading: '#FF6B35', // Orange for headings (matches primary)
        },
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#2D1810', // Dark brown text
            h1: {
              color: '#FF6B35', // Orange headings
            },
            h2: {
              color: '#FF6B35',
            },
            h3: {
              color: '#FF6B35',
            },
            h4: {
              color: '#FF6B35',
            },
            strong: {
              color: '#FF6B35', // Orange for emphasis
            },
            a: {
              color: '#FF6B35',
              '&:hover': {
                color: '#E85A2B',
              },
            },
            ul: {
              li: {
                '&::before': {
                  color: '#FF6B35',
                }
              }
            },
            img: {
              marginLeft: 'auto',
              marginRight: 'auto',
              borderRadius: '0.5rem',
              boxShadow: '0 4px 6px -1px rgba(255, 107, 53, 0.1), 0 2px 4px -1px rgba(255, 107, 53, 0.06)',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}