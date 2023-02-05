/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'theme': "#1FC3A4",
        'theme-half': "#D4F8F1"
      },
    },
  },
  plugins: [require("daisyui")],
}
