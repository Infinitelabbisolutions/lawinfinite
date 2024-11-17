/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#07142b',
          50: '#f0f4f8',
          100: '#d9e2ed',
          200: '#b3c5db',
          300: '#8da8c9',
          400: '#678bb7',
          500: '#416ea5',
          600: '#345884',
          700: '#274263',
          800: '#1a2c42',
          900: '#07142b',
        },
      },
    },
  },
  plugins: [],
};