import React from 'react';

interface DropdownProps {
  options: string[];
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  width?: string;
  height?: string;
}
export const Dropdown = ({ options, selected, setSelected, width, height }: DropdownProps) => {
  const [active, setActive] = React.useState(false);
  return (
    <div className='customer-select' style={{
      width: width ? width : '350px',
      height: height ? height : '40px',
    }}>
      <select
        value={selected}
        onBlur={() => setActive(false)}
        onClick={() => setActive(!active)}
        onChange={(e) => setSelected(e.target.value)}
        className={
          active
            ? 'outline-none border-mainPurple border-2 rounded-md w-full h-full'
            : 'outline-none border-linesLight border-2 rounded-md w-full h-full selection:bg-none select-none'
        }
      >
        {
          options.map((option) => {
            return (
              <option className='bg-none hover:bg-none active:bg-none select-none' key={option} value={option}>{option}</option>
            )
          })
        }
      </select>
    </div>
  )
}
