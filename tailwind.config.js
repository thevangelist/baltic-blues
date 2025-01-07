/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'info-1': '#00a2f0',
        'info-2': '#f1f1e6',
        'dark-1': '#142e3b',
        'dark-2': '#18323f',
        'blue-1': '#568099',
        'blue-2': '#324B59',
        'green-1': '#9ede7e',
        'green-2': '#23707d',
        'yellow-1': '#f9f871',
        'yellow-2': '#fff7d6',
        'orange-1': '#ee982b',
        'orange-2': '#763500',
        'red-1': '#6f3645',
        'red-2': '#887281',
      },
    },
  },
  plugins: [],
}
