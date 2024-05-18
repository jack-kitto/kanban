export type TooltipMenuOption = {
  text: string
  onClick: () => void
  destructive?: boolean
}

export interface TooltipMenuProps {
  options: TooltipMenuOption[]
  children: JSX.Element
  angle: "NE" | "NW" | "SE" | "SW" | "E" | "W" | "N" | "S"
}

const angleMap = {
  NE: "bottom-2",
  NW: "bottom-2 right-0 ",
  SE: "right-bottom",
  SW: "right-0",
  E: "bottom-[-220%] left-0",
  W: "right-0 top-[-220%]",
  N: "bottom-4 right-[-90px]",
  S: "top-2 right-[-90px]",
}


export default function TooltipMenu(props: TooltipMenuProps): JSX.Element {
  return (
    <div className="relative">
      <div className="peer w-fit h-fit">
        {props.children}
      </div>
      <div className={`absolute bg-white dark:bg-veryDarkGray hidden peer-hover:flex hover:flex flex-col shadow-md rounded-md px-[17px] py-5 min-w-[192px] items-start ${angleMap[props.angle]}`}>
        {props.options.map((option: TooltipMenuOption, index: number): JSX.Element => (
          <button key={index} onClick={option.onClick} className={`bg-white dark:bg-veryDarkGray p-2 select-none prose-bl ${option.destructive ? 'text-red' : 'text-mediumGray dark:text-white'}`}>
            {option.text}
          </button>
        ))}
      </div>
    </div>
  )
}
