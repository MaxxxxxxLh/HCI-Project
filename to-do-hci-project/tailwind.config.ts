// tailwind.config.js
const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './node_modules/flowbite-react/**/*.js',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        darkGray: '#333333',
        darkBlue: '#1a202c',
      },
    },
  },
  darkMode: 'class',
  plugins: [require('flowbite/plugin')],
};
