import { Icon, type IconType } from "../icon"
import { ring } from 'ldrs'

ring.register()

const buttonTypes = ['primary', 'secondary', 'destructive', 'login'] as const
export type ButtonType = typeof buttonTypes[number]

export interface ButtonProps {
  text?: string
  style?: React.CSSProperties
  type?: ButtonType
  btn?: React.ButtonHTMLAttributes<HTMLButtonElement>
  size?: 'sm' | 'lg'
  children?: React.ReactNode
  disabled?: boolean
  icon?: IconType
  loading?: boolean
}

const bgMap: Record<ButtonType, string> = {
  primary: 'bg-mainPurple',
  login: 'bg-mainPurple rounded-[2px]',
  secondary: 'bg-mainPurple10',
  destructive: 'bg-red',
}

const hoverBgMap = {
  primary: 'hover:bg-mainPurpleHover',
  login: 'hover:bg-mainPurpleHover rounded-[2px]',
  secondary: 'hover:bg-mainPurple25',
  destructive: 'hover:bg-redHover',
}

const textMap = {
  primary: 'text-white',
  login: 'text-white',
  secondary: 'text-mainPurple',
  destructive: 'text-white',
}

const sizeMap = {
  sm: 'h-10',
  lg: 'h-12',
}

const roundMap = {
  sm: 'rounded-[40px]',
  lg: 'rounded-[40px]',
}

function Loader() {
  return (
    <div className="px-4 flex items-center justify-center">
      <l-ring
        size="20"
        stroke="2"
        bg-opacity="0"
        speed="2"
        color="white"
      ></l-ring>
    </div>

  )
}

export default function Button(props: ButtonProps): JSX.Element {
  if (props.children) {
    return (
      <button {...props.btn} disabled={props.loading ?? props.disabled} className={`transition outline-none hover-duration-150 ease-in-out hover:scale-105 active:scale-90 select-none`}>
        {!!props.loading && <Loader />}
        {!props.loading && props.children}
      </button>
    )
  }
  return (
    <button
      {...props.btn}
      className={`
                  p-4 w-fit h-fit outline-none px-5 prose-hm select-none
                  ${bgMap[props.type ?? 'primary']} 
                  ${!props.disabled && !props.loading && hoverBgMap[props.type ?? 'primary']} 
                  ${(props.disabled ?? props.loading) && 'cursor-default opacity-50'} 
                  ${textMap[props.type ?? 'primary']} 
                  ${sizeMap[props.size ?? 'sm']} 
                  ${roundMap[props.size ?? 'sm']} 
                  ${!props.disabled && !props.loading && 'transition hover-duration-150 ease-in-out hover:scale-105 active:scale-90'} 
              `}
      disabled={props.disabled ?? props.loading}
    >
      {!!props.loading && <Loader />}
      {!props.loading &&
        <>
          {
            props.icon
              ? <Icon color="white" icon={props.icon} />
              : props.text
          }
        </>
      }
    </button>
  )
}
