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
        // Main color palette
        primary: {
          DEFAULT: '#10B981', // Green-500
          hover: '#059669', // Green-600
          light: '#34D399', // Green-400
          lighter: '#6EE7B7', // Green-300
          dark: '#047857', // Green-700
        },
        // Background colors
        dark: {
          DEFAULT: '#111827', // Dark gray
          lighter: '#1F2937',
          card: '#1E293B',
          border: '#374151', // Border color
        },
        // Text colors
        text: {
          primary: '#FFFFFF', // White
          secondary: '#E2E8F0', // Gray-300
          muted: '#A0AEC0', // Gray-500
          heading: '#34D399', // Green-400 for headings (matches primary-light)
        },
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#E2E8F0',
            h1: {
              color: '#34D399',
            },
            h2: {
              color: '#34D399',
            },
            h3: {
              color: '#34D399',
            },
            h4: {
              color: '#34D399',
            },
            strong: {
              color: '#34D399',
            },
            a: {
              color: '#34D399',
              '&:hover': {
                color: '#059669',
              },
            },
            ul: {
              li: {
                '&::before': {
                  color: '#10B981',
                }
              }
            },
            img: {
              marginLeft: 'auto',
              marginRight: 'auto',
              borderRadius: '0.5rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
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
