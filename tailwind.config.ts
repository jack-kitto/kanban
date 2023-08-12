import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      'black': '#000112',
      'veryDarkGrey': '#20212C',
      'darkGrey': '#2B2C37',
      'linesDark': '#3E3F4E',
      'mediumGrey': '#828FA3',
      'mediumDarkGrey': '#383d4a',
      'linesLight': '#E4EBFA',
      'lightGrey': '#F4F7FD',
      'white': '#FFFFFF',
      'mainPurple': '#635FC7',
      'mainPurpleHover': '#A8A4FF',
      'red': '#EA5555',
      'redHover': '#FF9898',
      'btnSecondary': 'rgba(99, 95, 199, 0.1)',
      'btnSecondaryHover': 'rgba(99, 95, 199, 0.25)',
      'cardColLight': '#eef2fb',
    },
    extend: {
    },
  },
  plugins: [],
} satisfies Config;
