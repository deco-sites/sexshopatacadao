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

        "success-500": "#4da630",
        "success-600": "#3f8e25",

        "gray-100": "#f2f4f5",
        "gray-200": "#f0f0f0",
        "gray-400": "#e3e3e3",
        // "gray-500": "#1a1a1a",
        "gray-700": "#888888",
        "gray-800": "#2e2e2e",
        "gray-900": "#0d0d0d",
      },
      fontFamily: {
        sans: ["Ubuntu", "sans-serif"],
        serif: ["inherit", "serif"],
        montserrat: ["Montserrat", "Ubuntu", "sans-serif"],
      },
    },
  },
};
