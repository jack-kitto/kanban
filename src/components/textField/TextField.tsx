import React from 'react'
import { isValid } from 'zod'
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
}

export const TextField = ({ width, height, placeholder, value, setValue, isValid, maxLength }: TextFieldProps) => {
  return (
    <div className='items-center justify-end flex' style={{
      width: width ? width : '350px',
      height: height ? height : '40px',
    }}>
      <input
        maxLength={maxLength ? maxLength : undefined}
        onInvalid={() => console.log("invalid")}
        type='text'
        placeholder={placeholder ? placeholder : 'Enter task name'}
        className={value.length > 0 ? 'w-full h-full border-2 border-linesLight rounded-md p-2 outline-none' : 'w-full h-full border-2 border-redHover rounded-md p-2 outline-none'}
        style={typography.body.L}
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
}
