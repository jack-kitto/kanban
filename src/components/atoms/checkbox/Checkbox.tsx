import { ChangeEvent } from "react";

export interface CheckboxProps {
  checked: boolean;
  setChecked: (checked: boolean) => void;
}

export default function Checkbox(props: CheckboxProps): JSX.Element {
  return (
    <input
      className="bg-white accent-mainPurple appearance-none checked:appearance-auto hover:accent-mainPurple hover:brightness-100 brightness-100  checked:border-none border-2 border-linesLight hover:border-linesLight rounded-sm h-4 w-4 highlight-none active:scale-90 transition-transform hover:scale-125 hover:duration-150 ease-in-out select-none checked:bg-mainPurple "
      type="checkbox"
      checked={props.checked}
      onChange={(e: ChangeEvent<HTMLInputElement>): void => props.setChecked(e.target.checked)}
    />
  )
}
