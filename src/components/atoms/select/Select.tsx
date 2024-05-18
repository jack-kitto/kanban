import React, { useCallback } from "react";

export interface SelectProps {
  label?: string;
  options: string[];
  selected: string;
  setSelected: (selected: string) => void;
}

export default function Select(props: SelectProps): JSX.Element {

  const handleChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>): void => {
    props.setSelected(e.target.value);
  }, [props.setSelected]);

  return (
    <div>
      {
        props.label && (
          <span className="prose-bm text-mediumGray">
            {props.label}
          </span>
        )
      }
      <select
        className="bg-white outline caret-mainPurple outline-linesLight border-transparent border-r-[14px] bg-blend-color-dodge prose-bl hover:outline-mainPurple accent-mainPurple px-4 min-h-10 max-h-10 min-w-64 max-w-md rounded h-10 w-full prose-hm transition-colors duration-300 ease-in-out"
        value={props.selected}
        onChange={handleChange}
      >
        {props.options.map((option, i) => (
          <option className="prose-bl" key={i} value={option}>{option}</option>
        ))}
      </select>
    </div>
  )
}
