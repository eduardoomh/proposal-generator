import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", 'sans-serif'],
        inter: ["Inter", 'sans-serif'],
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      },
      colors: {
        primary: 'oklch(71.18% 0.199 243.19)',
        hoverPrimary: 'oklch(80.9% 0.105 251.813)',
        secondary: 'oklch(98.4% 0.003 247.858)'
      },
    },
  },
  plugins: [],
} satisfies Config;
