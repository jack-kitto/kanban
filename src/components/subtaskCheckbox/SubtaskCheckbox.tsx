import { observer } from 'mobx-react-lite';
import React from 'react'
import { useStores } from '~/models';
import { typography } from '~/styles/typography';
import { Icon } from '../icon';
interface SubtaskCheckboxProps {
  text: string;
  height?: string;
  checked: boolean;
  setChecked: (checked: boolean) => void;
}
export const SubtaskCheckbox = observer(({ text, checked, setChecked }: SubtaskCheckboxProps) => {
  const { theme } = useStores()

  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    if (theme.darkMode) {
      return (
        <button onClick={() => setChecked(!checked)} className='w-full outline-none group h-10 flex hover:opacity-25 flex-row items-center justify-start rounded-md bg-linesDark hover:bg-mainPurpleHover'>
          {children}
        </button>
      )

    } return (
      <button onClick={() => setChecked(!checked)} className='w-full h-10 group outline-none flex flex-row items-center justify-start rounded-md bg-linesLight hover:bg-mainPurpleHover'>
        {children}
      </button>
    )

  }
  return (
    <Wrapper>
      <div className='ml-4 mr-4'>
        {
          checked
            ? <Icon icon='checkedBox' size='normal' />
            : theme.darkMode ? <div className='w-4 h-4 hover:bg-veryDarkGrey bg-darkGrey rounded-sm' />
              : <div className='w-4 h-4 bg-white rounded-sm' />
        }
      </div>
      <p style={{
        fontFamily: typography.fontFamily,
        ...typography.bold,
        color: theme.darkMode ? 'white' : 'black',
      }} className={checked ? 'line-through opacity-50 group-hover:opacity-100' : undefined}>{text}</p>
    </Wrapper>
  )
})
