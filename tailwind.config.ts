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
      },
      fontFamily: {
        sans: ["Ubuntu", "sans-serif"],
        serif: ["inherit", "serif"],
      },
    },
  },
};
