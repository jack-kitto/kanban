const buttonTypes = ['primary', 'secondary', 'destructive'] as const
export type ButtonType = typeof buttonTypes[number]

export interface ButtonProps {
  text: string
  style?: React.CSSProperties
  type: ButtonType
  btn?: React.ButtonHTMLAttributes<HTMLButtonElement>
  size?: 'sm' | 'lg'
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
  return (
    <button {...props.btn} className={`${bgMap[props.type]} ${hoverBgMap[props.type]} ${textMap[props.type]} px-5 prose-hm max-w-[255px] ${sizeMap[props.size ?? 'sm']} w-full ${roundMap[props.size ?? 'sm']} transition hover-duration-150 ease-in-out hover:scale-125 active:scale-90 select-none`}>
      {props.text}
    </button>
  )
}
