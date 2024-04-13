/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  // darkMode: "class",
  // darkMode: 'media',
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
          950: "#172554",
        },
      },
      height: {
        100: "28rem",
        120: "30rem",
        130: "35rem",
        140: "40rem",
        150: "45rem",
        160: "50rem",
        170: "55rem",
        180: "60rem",
        190: "65rem",
        200: "70rem",
      }
    },
    fontFamily: {
      roboto: ["Roboto", "sans-serif"],
    },
  },
  plugins: [require("flowbite/plugin")],
};

