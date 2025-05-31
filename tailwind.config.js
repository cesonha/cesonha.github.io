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
          DEFAULT: '#8B5CF6', // Purple
          hover: '#7C3AED',
        },
        accent: {
          DEFAULT: '#2DD4BF', // Teal
          hover: '#14B8A6',
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
              color: theme('colors.purple.300'),
            },
            h2: {
              color: theme('colors.purple.300'),
            },
            h3: {
              color: theme('colors.purple.300'),
            },
            strong: {
              color: theme('colors.teal.300'),
            },
            a: {
              color: theme('colors.cyan.400'),
              '&:hover': {
                color: theme('colors.cyan.300'),
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
