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
  const [valid, setValid] = React.useState<boolean>(true)
  const ref = React.useRef<HTMLInputElement>(null)
  return (
    <div className='items-center justify-end flex' style={{
      width: width ? width : '350px',
      height: height ? height : '40px',
    }}>
      <input
        ref={ref}
        maxLength={maxLength ? maxLength : undefined}
        onInvalid={() => console.log("invalid")}
        type='text'
        placeholder={placeholder ? placeholder : 'Enter task name'}
        className={value.length > 0 ? 'w-full h-full border-2 border-linesLight rounded-md p-2 outline-none' : 'w-full h-full border-2 border-redHover rounded-md p-2 outline-none'}
        style={typography.body.L}
        value={value}
        onChange={(e) => {
          if (isValid) {
            setValid(isValid(e.target.value))
          }
          setValue(e.target.value)
        }}
      />
      {value.length < 1 ? <div style={{
        color: colors.red, ...typography.body.M,
        // fontSize: typography.body.L.fontSize, 
        // fontFamily: typography.body.L.fontFamily,
      }} className='absolute items-center justify-center flex mr-6'>Can't be empty</div> : null}
    </div>
  )
}
