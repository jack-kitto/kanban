/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#635FC7',
        primaryLight: '#A8A4FF',
        primaryDark: '#20212C',

        secondary: '#828FA3',
        secondaryLight: '#E4EBFA',
        secondaryDark: '#3E3F4E',

        textPrimary: '#000112',
        textSecondary: '#2B2C37',
        textLight: '#F4F7FD',

        backgroundLight: '#F4F7FD',
        backgroundDark: '#000112',
        backgroundMuted: '#2B2C37',

        accentRed: '#EA5555',
        accentRedLight: '#FF9898',

        error: '#EA5555',
        warning: '#FF9898',

        white: '#FFFFFF',
        gray: '#828FA3',
        grayLight: '#E4EBFA',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

