const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      ...colors,
      'cornflower-blue': {
        '50': '#f6fbff',
        '100': '#eef6ff',
        '200': '#d4eaff',
        '300': '#bbddff',
        '400': '#87c3ff',
        '500': '#54a9ff',
        '600': '#4c98e6',
        '700': '#3f7fbf',
        '800': '#326599',
        '900': '#29537d'
      }
    }
  },
  plugins: [],
}
