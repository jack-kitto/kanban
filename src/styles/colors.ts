export const colors = {
  black: '#000000',
  veryDarkGray: '#20212C',
  darkGray: '#2B2C37',
  darkGray50: '',
  linesDark: '#3E3F4E',
  mediumGray: '#828FA3',
  linesLight: '#E4EBFA',
  lightGray: '#F4F7FD',
  white: '#FFFFFF',
  mainPurple: '#635FC7',
  mainPurpleHover: '#A8A4FF',
  mainPurple10: '#EFEFF9',
  mainPurple25: '#D8D7F1',
  red: '#EA5555',
  redHover: '#FF9898',
  lightHover: '#979797',
} as const

export type Colors = keyof typeof colors
