import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        olive: "#6B705C",
        "olive-dark": "#484C3D",
        cream: "#F5F5F0",
        paper: "#FDFBF7",
        charcoal: "#1A1A1A",
        stone: "#E6E2DD",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
      letterSpacing: {
        "widest-xl": "0.2em",
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/container-queries")],
} satisfies Config;
