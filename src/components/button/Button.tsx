import React from 'react';
import { colors } from '~/styles/colors';
interface ButtonProps {
  theme: 'light' | 'dark',
  type: 'primary' | 'secondary' | 'destructive',
  text: string,
  size: 'sm' | 'lg'
  height?: number,
  width?: number,
  borderRadius?: string
  fillContainer?: boolean,
  disabled?: boolean,
  onPress: () => void
}
export const Button = ({ theme, type, text, width, borderRadius, height, size, onPress, fillContainer, disabled }: ButtonProps) => {
  const styles = {
    sm: {
      width: fillContainer ? "100%" : width ? width : "255px",
      height: height ? height : "40px",
      borderRadius: borderRadius ? borderRadius : "24px",
    },
    lg: {
      width: fillContainer ? "100%" : width ? width : "255px",
      height: height ? height : "48px",
      borderRadius: borderRadius ? borderRadius : "24px",
    },
    primary: {
      container: 'bg-mainPurple hover:bg-mainPurpleHover',
      text: {
        fontFamily: 'Plus Jakarta Sans',
        fontWeight: 700,
        fontSize: '15px',
        lineHeight: '18.9px',
        color: 'white'
      }
    },
    secondary: {
      container: 'bg-btnSecondary hover:bg-btnSecondaryHover',
      text: {
        fontFamily: 'Plus Jakarta Sans',
        fontWeight: 700,
        fontSize: '15px',
        lineHeight: '18.9px',
        color: colors.mainPurple
      },
    },
    destructive: {
      container: 'bg-red hover:bg-redHover',
      text: {
        fontFamily: 'Plus Jakarta Sans',
        fontWeight: 700,
        fontSize: '15px',
        lineHeight: '18.9px',
        color: 'white'
      }
    },
  }
  return (
    <div style={styles[size]} className={styles[type].container}>
      <button disabled={disabled} onClick={onPress} className='items-center justify-center flex w-full h-full'>
        <div style={styles[type].text} className={'h-full w-full flex justify-center items-center'}>{text}</div>
      </button>
    </div>
  )
}
