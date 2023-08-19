import { observer } from 'mobx-react-lite';
import { MoonLoader } from "react-spinners";
import React from 'react';
import { colors } from '~/styles/colors';
import { useStores } from '~/models';
interface ButtonProps {
  type: 'primary' | 'secondary' | 'destructive',
  text: string,
  size: 'sm' | 'lg'
  height?: number,
  width?: number,
  borderRadius?: string
  fillContainer?: boolean,
  disabled?: boolean,
  fitText?: boolean,
  onPress: () => void,
  loading?: boolean,
}
const ButtonComponent = ({ fitText, type, text, width, borderRadius, height, size, onPress, fillContainer, disabled, loading }: ButtonProps) => {
  const { theme } = useStores()
  const styles = {
    sm: {
      width: fitText ? undefined : fillContainer ? "100%" : width ? width : "255px",
      height: height ? height : "40px",
      borderRadius: borderRadius ? borderRadius : "24px",
      padding: fitText ? "16px" : undefined,
    },
    lg: {
      width: fitText ? undefined : fillContainer ? "100%" : width ? width : "255px",
      height: height ? height : "48px",
      borderRadius: borderRadius ? borderRadius : "24px",
      padding: fitText ? "16px" : undefined,
    },
    primary: {
      container: disabled ? "bg-mainPurple opacity-50" : 'bg-mainPurple hover:bg-mainPurpleHover cursor-pointer',
      text: {
        fontFamily: 'Plus Jakarta Sans',
        fontWeight: 700,
        fontSize: '15px',
        lineHeight: '18.9px',
        color: 'white'
      }
    },
    secondary: {
      container: disabled ? `bg-${theme.darkMode ? 'white' : 'linesLight'} opacity-50` : `bg-${theme.darkMode ? 'white' : 'linesLight'} hover:opacity-50`,
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
        <div style={styles[type].text} className={'h-full w-full flex justify-center items-center'}>
          {loading ? <MoonLoader size={16} color={'white'} />
            : text
          }
        </div>
      </button>
    </div>
  )
}
export const Button = observer(ButtonComponent)
