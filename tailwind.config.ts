import daisyui from "daisyui";
import tailwindScrollbar from "tailwind-scrollbar";

export default {
  plugins: [daisyui, tailwindScrollbar({ nocompatible: true })],
  daisyui: { themes: [], logs: false },
  content: ["./**/*.tsx"],
  theme: {
    container: { center: true },
    extend: {
      colors: {
        "primary-500": "#e5067c",
        "primary-600": "#b90565",
        "primary-650": "#b20260",

        "success-400": "#7fbd61",
        "success-500": "#4da630",
        "success-600": "#3f8e25",

        "danger-500": "#d33232",

        "warning-500": "#ffd165",
        "warning-600": "#ffc12f",

        "gray-100": "#f2f4f5",
        "gray-200": "#f0f0f0",
        "gray-300": "#eeeeee",
        "gray-400": "#e3e3e3",
        "gray-450": "#cacbcc",
        // "gray-500": "#1a1a1a",
        "gray-700": "#888888",
        "gray-750": "#333333",
        "gray-800": "#2e2e2e",
        "gray-900": "#0d0d0d",
      },
      fontFamily: {
        sans: ["Ubuntu", "sans-serif"],
        serif: ["inherit", "serif"],
        montserrat: ["Montserrat", "Ubuntu", "sans-serif"],
        lobster: ["Lobster", "cursive", "serif"],
        satisfy: ["Satisfy", "cursive", "serif"],
        lato: ["Lato", "cursive", "serif"],
      },

      screens: {
        lg: "1025px", // Consider big tablets as mobile

        xs: "440px",
      },

      animation: {
        "blink-primary": "blink-primary 2s linear infinite",
      },

      keyframes: {
        "blink-primary": {
          "0%": { color: "#fff" },
          "50%": { color: "#fff" },
          "51%": { color: "#e5067c" },
          "100%": { color: "#e5067c" },
        },
      },
    },
  },
};
