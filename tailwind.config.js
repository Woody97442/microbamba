/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#2E8B57",
          "secondary": "#191E8F",
          "accent": "#00ffff",
          "neutral": "#ff00ff",
          "base-100": "#ffffff",
          "info": "#0000ff",
          "success": "#00ff00",
          "warning": "#00ff00",
          "error": "#ff0000",
          "--rounded-btn": "0.4rem",
        },
      },
    ],
  },
  theme: {
    extend: {
      fontFamily: {
        primary: ["Moul", "sans-serif"],
        secondary: ["Open Sans", "sans-serif"],
      },
      boxShadow: {
        "inner-xl": "inset 0 4px 4px 0 rgb(0 0 0 / 0.2)",
      },
    },
  },
  plugins: [require("daisyui")],
};
