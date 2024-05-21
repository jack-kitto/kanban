import React, { type ChangeEvent } from "react";

export type SelectOption = {
  label: string;
  id: string;
}
export interface SelectProps {
  label?: string;
  options: SelectOption[];
  selected: string;
  setSelected: (selectedOptionId: string) => void;
}

function handleChange(e: React.ChangeEvent<HTMLSelectElement>, setSelected: (selected: string) => void): void {
  setSelected(e.target.value);
}

export default function Select(props: SelectProps): JSX.Element {
  return (
    <div>
      {
        props.label && (
          <span className="prose-bm text-mediumGray dark:text-white">
            {props.label}
          </span>
        )
      }
      <select
        className="bg-white dark:bg-darkGray outline caret-mainPurple dark:text-white outline-linesLight dark:outline-linesDark border-transparent border-r-[14px] bg-blend-color-dodge prose-bl hover:outline-mainPurple accent-mainPurple px-4 min-h-10 max-h-10 min-w-40 max-w-md rounded h-10 w-full prose-hm transition-colors duration-300 ease-in-out"
        value={props.selected}
        onChange={(e: ChangeEvent<HTMLSelectElement>): void => handleChange(e, props.setSelected)}
      >
        {props.options.map((option: SelectOption, i: number): JSX.Element => (
          <option className="prose-bl" key={i} value={option.id}>{option.label}</option>
        ))}
      </select>
    </div>
  )
}
