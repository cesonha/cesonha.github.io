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
        primary: {
          DEFAULT: '#EF4444', // Red
          hover: '#DC2626',
        },
        accent: {
          DEFAULT: '#F97316', // Orange
          hover: '#EA580C',
        },
        dark: {
          DEFAULT: '#111827', // Dark gray
          lighter: '#1F2937',
          card: '#1E293B',
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.300'),
            h1: {
              color: theme('colors.red.400'),
            },
            h2: {
              color: theme('colors.red.400'),
            },
            h3: {
              color: theme('colors.red.400'),
            },
            strong: {
              color: theme('colors.orange.300'),
            },
            a: {
              color: theme('colors.red.300'),
              '&:hover': {
                color: theme('colors.red.200'),
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
