/** @type {import('tailwindcss').Config} */
const tailwind = {
  darkMode: ['class'],
  // purge: ['./src/**/*.{js,ts,jsx,tsx}', "./pages/**/*.{js,ts,jsx,tsx}"],
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/layouts/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      animation: {
        blob: 'blob 4s infinite',
      },
      keyframes: {
        blob: {
          '0%': {
            transform: 'scale(1)',
          },
          '33%': {
            transform: 'scale(2)',
          },
          '66%': {
            transform: 'scale(0.9)',
          },
          '100%': {
            transform: 'scale(1)',
          },
        },
      },
    },
    container: {
      center: true,
      screens: {
        lg: '960px',
        xl: '1140px',
        '2xl': '1200px',
      },
      padding: '15px',
    },
    typography: (theme) => ({}),
    extend: {},
  },
  variants: {},
  plugins: [require('@tailwindcss/typography')],
};

module.exports = tailwind;
