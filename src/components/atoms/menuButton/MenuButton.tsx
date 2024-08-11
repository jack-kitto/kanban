import React from 'react'

export interface MenuButtonProps {
  btn?: React.ButtonHTMLAttributes<HTMLButtonElement>
  type: 'hover' | 'click'
}

function Dot(): JSX.Element {
  return (
    <div className="h-[5px] w-[5px] bg-mediumGray rounded-full" />
  )
}

export default function MenuButton(props: MenuButtonProps): JSX.Element {
  if (!props.btn) {
    return (
      <div className={`flex flex-col gap-[3px] ${props.type === 'click' && 'transition hover-duration-150 ease-in-out hover:scale-125 active:scale-90'}`}>
        <Dot />
        <Dot />
        <Dot />
      </div>
    )
  }
  return (
    <button  {...props.btn} className={`flex flex-col gap-[3px] ${props.type === 'click' && 'transition hover-duration-150 ease-in-out hover:scale-125 active:scale-90'}`}>
      <Dot />
      <Dot />
      <Dot />
    </button>
  )
}
