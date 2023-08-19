import {
  observer
} from 'mobx-react-lite'
import React from 'react'
import { useStores } from '~/models'
import { colors } from '~/styles/colors'
import { typography } from '~/styles/typography'

interface TextFieldProps {
  width?: string,
  height?: string,
  placeholder?: string,
  value: string,
  setValue: (value: string) => void,
  isValid?: (text: string) => boolean,
  maxLength?: number,
  disabled?: boolean
  canBeEmpty: boolean
}

export const TextField = observer(({ width, height, placeholder, value, setValue, maxLength, disabled, canBeEmpty }: TextFieldProps) => {
  const { theme } = useStores()
  if (canBeEmpty) return (
    <div className='items-center justify-end flex' style={{
      width: width ? width : '350px',
      height: height ? height : '40px',
    }}>
      <input
        maxLength={maxLength ? maxLength : undefined}
        disabled={disabled ? disabled : false}
        onInvalid={() => console.log("invalid")}
        type='text'
        placeholder={placeholder ? placeholder : 'Enter task name'}
        className={'w-full h-full border-2 border-linesLight rounded-md p-2 outline-none'}
        style={typography.body.L}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  )
  return (
    <div className='items-center justify-end flex' style={{
      width: width ? width : '350px',
      height: height ? height : '40px',
      backgroundColor: theme.darkMode ? colors.veryDarkGrey : colors.white,
    }}>
      <input
        maxLength={maxLength ? maxLength : undefined}
        disabled={disabled ? disabled : false}
        onInvalid={() => console.log("invalid")}
        type='text'
        placeholder={placeholder ? placeholder : 'Enter task name'}
        className={'w-full h-full border-2 rounded-md p-2 outline-none'}
        style={{ ...typography.body.L, backgroundColor: theme.darkMode ? colors.veryDarkGrey : colors.white, color: theme.darkMode ? colors.white : colors.black, borderColor: value.length > 0 ? theme.darkMode ? colors.linesDark : colors.linesLight : colors.redHover }}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {
        value.length < 1 ?
          <div
            style={{ color: colors.red, ...typography.body.M }}
            className='absolute items-center justify-center flex mr-6'
          >
            <p>Cant be empty</p>
          </div>
          : null
      }
    </div>
  )
})
