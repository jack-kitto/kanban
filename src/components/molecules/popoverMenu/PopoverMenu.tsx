import React from "react";
import { Popover, type PopoverProps, PopoverTrigger, PopoverContent, Button } from "@nextui-org/react";
import { MenuButton } from "~/components/atoms";
export type PopoverMenuOption = {
  text: string
  onClick: () => void
  destructive?: boolean
}

export interface PopoverMenuProps {
  options: PopoverMenuOption[]
  position: PopoverProps['placement']
}

export default function PopoverMenu(props: PopoverMenuProps): JSX.Element {
  return (
    <div className="flex justify-end items-end">
      <Popover placement="left-start" showArrow={true}>
        <PopoverTrigger>
          <Button className="bg-transparent">
            <MenuButton type="click" />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className={`flex flex-col px-[17px] py-5 min-w-[192px] items-start`}>
            {props.options.map((option: PopoverMenuOption, index: number): JSX.Element => (
              <Button key={index} onMouseDown={option.onClick} className={`bg-white w-full justify-start dark:bg-veryDarkGray p-2 select-none prose-bl ${option.destructive ? 'text-red' : 'text-mediumGray dark:text-white'}`}>
                {option.text}
              </Button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

