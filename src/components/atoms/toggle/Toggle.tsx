import type { ChangeEvent } from "react";

export interface ToggleProps {
  checked: boolean;
  setChecked: (checked: boolean) => void;
}

export default function Toggle(props: ToggleProps): JSX.Element {
  return (
    <label className="relative inline-flex cursor-pointer items-center">
      <input id="switch" type="checkbox" className="peer sr-only" onChange={(e: ChangeEvent<HTMLInputElement>): void => props.setChecked(e.target.checked)} checked={props.checked} />
      <label htmlFor="switch" className="hidden"></label>
      <div className="peer h-6 w-11 rounded-full  bg-mainPurple after:absolute after:left-[8px] after:top-[5px] after:h-[14px] after:w-[14px] after:rounded-full  after:bg-white after:transition-all after:content-[''] peer-checked:bg-mainPurple peer-checked:after:translate-x-full peer-checked:after:border-white outline-none"></div>
    </label>
  );
}
