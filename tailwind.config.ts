import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    main: {
      blue: {
        100: "#E4EBFA",
        200: "#A8A4FF",
        300: "#635FC7"
      }
    },
    extend: {},
  },
  plugins: [],
} satisfies Config;
