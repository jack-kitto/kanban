import { useEffect, useState } from "react";
import { Toggle } from "~/components/atoms";
import { Icon } from "~/components/atoms/icon";

export interface DarkModeToggleProps {
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
}

export default function DarkModeToggle(props: DarkModeToggleProps): JSX.Element {
  return (
    <div className="flex  gap-6 rounded-md py-[14px] items-center justify-center bg-linesLight dark:bg-veryDarkGray">
      <Icon icon="LightMode" />
      <Toggle checked={props.darkMode} setChecked={props.setDarkMode} />
      <Icon icon="DarkMode" />
    </div>
  )
}
