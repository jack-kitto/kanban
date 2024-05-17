const buttonTypes = ['primary', 'secondary', 'destructive'] as const
export type ButtonType = typeof buttonTypes[number]

export interface ButtonProps {
  text: string
  style?: React.CSSProperties
  type: ButtonType
  btn?: React.ButtonHTMLAttributes<HTMLButtonElement>
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

export default function Button(props: ButtonProps): JSX.Element {
  return (
    <button {...props.btn} className={`${bgMap[props.type]} ${hoverBgMap[props.type]} ${textMap[props.type]} px-5 prose-hm max-w-[255px] h-10 w-full rounded-[20px] transition hover-duration-150 ease-in-out hover:scale-125 active:scale-90 select-none`}>
      {props.text}
    </button>
  )
}
