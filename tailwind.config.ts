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
          "0%": { left: "50%" },
          "100%": { left: "-10%" },
        },
        slideIn: {
          "0%": { opacity: "0" },
          "99%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        slideOut: "slideOut 4s forwards",
        slideIn: "slideIn 4s forwards",
      },
    },
  },
  plugins: [],
} satisfies Config;
