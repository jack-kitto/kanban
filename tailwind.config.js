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
        black: '#000000',
        veryDarkGray: '#20212C',
        darkGray: '#2B2C37',
        linesDark: '#3E3F4E',
        mediumGray: '#828FA3',
        linesLight: '#E4EBFA',
        lightGray: '#F4F7FD',
        white: '#FFFFFF',
        mainPurple: '#635FC7',
        mainPurple10: '#EFEFF9',
        mainPurple25: '#D8D7F1',
        mainPurpleHover: '#A8A4FF',
        red: '#EA5555',
        redHover: '#FF9898'
      },
      fontFamily: {
        plusJakartaSans: ['var(--font-plus-jakarta-sans)'],
      },
      typography: {

        'hxl': {
          css: {
            fontSize: 24,
            fontWeight: '700',
            fontFamily: 'var(--font-plus-jakarta-sans)',
            lineHeight: '30px',
          }
        },

        'hl': {
          css: {
            fontSize: 18,
            fontWeight: '700',
            fontFamily: 'var(--font-plus-jakarta-sans)',
            lineHeight: '23px',
          }
        },

        'hm': {
          css: {
            fontSize: 15,
            fontWeight: '700',
            fontFamily: 'var(--font-plus-jakarta-sans)',
            lineHeight: '19px',
          }
        },

        'hs': {
          css: {
            fontSize: 12,
            fontWeight: '700',
            fontFamily: 'var(--font-plus-jakarta-sans)',
            lineHeight: '12px',
            letterSpacing: '2.4px',
            color: '#828FA3'
          }
        },

        'bl': {
          css: {
            fontSize: 13,
            fontWeight: '500',
            fontFamily: 'var(--font-plus-jakarta-sans)',
            lineHeight: '23px',
            color: '#2B2C37'
          }
        },

        'bm': {
          css: {
            fontSize: 12,
            fontWeight: '700',
            fontFamily: 'var(--font-plus-jakarta-sans)',
            lineHeight: '15px',
            color: '#2B2C37'
          }
        },

      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

