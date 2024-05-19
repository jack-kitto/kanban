const buttonTypes = ['primary', 'secondary', 'destructive'] as const
export type ButtonType = typeof buttonTypes[number]

export interface ButtonProps {
  text?: string
  style?: React.CSSProperties
  type?: ButtonType
  btn?: React.ButtonHTMLAttributes<HTMLButtonElement>
  size?: 'sm' | 'lg'
  children?: React.ReactNode
  disabled?: boolean
}

const bgMap: Record<ButtonType, string> = {
  primary: 'bg-mainPurple',
  secondary: 'bg-mainPurple10',
  destructive: 'bg-red',
}

const hoverBgMap = {
  primary: 'hover:bg-mainPurpleHover',
  secondary: 'hover:bg-mainPurple25',
  destructive: 'hover:bg-redHover',
}

const textMap = {
  primary: 'text-white',
  secondary: 'text-mainPurple',
  destructive: 'text-white',
}

const sizeMap = {
  sm: 'h-10',
  lg: 'h-12',
}

const roundMap = {
  sm: 'rounded-[20px]',
  lg: 'rounded-[24px]',
}

export default function Button(props: ButtonProps): JSX.Element {

  if (props.children) {
    return (
      <button {...props.btn} className={`transition outline-none hover-duration-150 ease-in-out hover:scale-105 active:scale-90 select-none`}>
        {props.children}
      </button>
    )
  }
  return (
    <button
      {...props.btn}
      className={`${bgMap[props.type ?? 'primary']} outline-none ${!props.disabled && hoverBgMap[props.type ?? 'primary']} ${props.disabled && 'cursor-default opacity-50'} ${textMap[props.type ?? 'primary']} px-5 prose-hm ${sizeMap[props.size ?? 'sm']} w-full ${roundMap[props.size ?? 'sm']} ${!props.disabled && 'transition hover-duration-150 ease-in-out hover:scale-105 active:scale-90'} select-none`}
      disabled={props.disabled}
    >
      {props.text}
    </button>
  )
}
