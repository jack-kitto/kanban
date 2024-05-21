import { useState } from "react";
import { Toggle } from "~/components/atoms";
import { Icon } from "~/components/atoms/icon";

export interface DarkModeToggleProps {
  darkMode?: boolean;
  setDarkMode?: (darkMode: boolean) => void;
}

export default function DarkModeToggle(props: DarkModeToggleProps): JSX.Element {
  const [darkMode, setDarkMode] = useState<boolean>(props.darkMode ?? false);

  return (
    <div className="flex  gap-6 rounded-md py-[14px] items-center justify-center bg-linesLight dark:bg-veryDarkGray">
      <Icon icon="LightMode" />
      <Toggle
        checked={darkMode}
        setChecked={setDarkMode}
        onChecked={() => {
          window.localStorage.setItem('darkMode', 'true');
          props.setDarkMode && props.setDarkMode(true);
        }}
        onUnchecked={() => {
          window.localStorage.setItem('darkMode', 'false');
          props.setDarkMode && props.setDarkMode(false);
        }}
      />
      <Icon icon="DarkMode" />
    </div>
  )
}
