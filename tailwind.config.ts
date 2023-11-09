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
          "100%": { left: "-20%" },
        },
        // slideOut2: {
        //   "0%": { left: "50%" },
        //   "100%": { left: "-20%" },
        // },
        // appear: {
        //   "0%": { opacity: "0" },
        //   // "50%": { opacity: "0" },
        //   "100%": { opacity: "1" },
        // },
        // disappear: {
        //   "100%": { width: "100vw" },
        // },
      },
      animation: {
        slideOut: "slideOut 4s forwards",
        slideOut2: "slideOut2 4s forwards",
        appear: "appear 6s forwards",
        disappear: "disappear 4s forwards",
      },
    },
  },
  plugins: [],
} satisfies Config;
