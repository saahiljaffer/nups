import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        slideOut: {
          "0%": { left: "0" },
          "100%": { left: "100%" },
        },
        appear: {
          "0%": { opacity: "0" },
          "90%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        slideOut: "slideOut 4s forwards",
        appear: "appear 3s forwards",
      },
    },
  },
  plugins: [],
} satisfies Config;
