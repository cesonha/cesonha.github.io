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
          heading: '#FC8181', // Red-300 for headings
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.300'),
            h1: {
              color: theme('colors.red.500'),
            },
            h2: {
              color: theme('colors.red.500'),
            },
            h3: {
              color: theme('colors.red.500'),
            },
            strong: {
              color: theme('colors.red.300'),
            },
            a: {
              color: theme('colors.red.400'),
              '&:hover': {
                color: theme('colors.red.300'),
              },
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
