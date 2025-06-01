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
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.text.secondary'),
            backgroundColor: theme('colors.dark.DEFAULT'),
            h1: {
              color: theme('colors.text.heading'),
            },
            h2: {
              color: theme('colors.text.heading'),
            },
            h3: {
              color: theme('colors.text.heading'),
            },
            h4: {
              color: theme('colors.text.heading'),
            },
            strong: {
              color: theme('colors.primary.light'),
            },
            a: {
              color: theme('colors.primary.light'),
              '&:hover': {
                color: theme('colors.primary.hover'),
              },
            },
            ul: {
              li: {
                '&::before': {
                  color: theme('colors.primary.DEFAULT'),
                }
              }
            },
            img: {
              marginLeft: 'auto',
              marginRight: 'auto',
              borderRadius: theme('borderRadius.lg'),
              boxShadow: theme('boxShadow.md'),
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
