/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'theme': "#1FC3A4",
        'theme-half': "#D4F8F1"
      },

      keyframes: {
        push: {
          "0%": {
            transform: "translateX(100%)"
          },
          "100%": {
            transform: "translateX(-100%)"
          }
        },
      },
      animation: {
        "push": "push 15s linear forwards",
      },
      
    }
  },
  plugins: [require("daisyui")],
}
