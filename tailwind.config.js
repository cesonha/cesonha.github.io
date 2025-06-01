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
          DEFAULT: '#E53E3E', // Red-600
          hover: '#C53030', // Red-700
        },
        accent: {
          DEFAULT: '#FC8181', // Red-300
          hover: '#F56565', // Red-400
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
