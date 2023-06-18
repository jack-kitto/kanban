import React from 'react'
import { typography } from '~/styles/typography';
interface SubtaskCheckboxProps {
  text: string;
  width?: string;
  height?: string;
  checked: boolean;
  setChecked: (checked: boolean) => void;
}
export const SubtaskCheckbox = ({ text, width, height, checked, setChecked }: SubtaskCheckboxProps) => {
  return (
    <button onClick={() => setChecked(!checked)} className='hover:opacity-25 flex flex-row items-center justify-start rounded-md bg-linesLight hover:bg-mainPurpleHover' style={{
      width: width ? width : '350px',
      height: height ? height : '40px',
    }}>
      <input className='ml-4 mr-4' type='checkbox' checked={checked} onChange={() => setChecked(!checked)} />
      <p style={{
        fontFamily: typography.fontFamily,
        ...typography.bold
      }} className={checked ? 'line-through opacity-50' : undefined}>{text}</p>
    </button>
  )
}
