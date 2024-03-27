/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    '*.{html,js}',
    '*/*.{html,js}'
  ],
  theme: {
    extend: {
      spacing: {
        'c': 'unset'
      },
      fontFamily: {
        'c': ['roboto-medium', 'sans-serif'],
      },
      letterSpacing: {
        'c': '.25em'
      }
    },
  },
  plugins: [
    require('tailwindcss-image-rendering')()
  ],
}

