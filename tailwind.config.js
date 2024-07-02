/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "light": "#EEF0F5",
        "primary": "#FD2A23",
      },
      dropShadow: {
        "slider": "3px 3px 11px #FD251E",
      }
    },
  },
  plugins: [],
}

