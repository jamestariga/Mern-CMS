/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{ts,tsx}',
    'node_modules/daisyui/dist/**/*.js',
    'node_modules/react-daisyui/dist/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        blurred: 'rgba(255, 255, 255, 0.25)',
      },
      screens: {
        '3xl': '1629px',
        '4xl': '2560px',
      },
    },
  },
  daisyui: {
    themes: ['light', 'dark', 'corporate', 'garden'],
  },
  plugins: [require('daisyui')],
}
