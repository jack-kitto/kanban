import { observer } from 'mobx-react-lite';
import React from 'react';
import { useStores } from '~/models';
import { colors } from '~/styles/colors';

interface DropdownProps {
  options: string[];
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  width?: string;
  height?: string;
  transformOptionText?: (text: string) => string
}
export const Dropdown = observer(({ options, selected, setSelected, width, height, transformOptionText }: DropdownProps) => {
  const [active, setActive] = React.useState(false);
  const { theme } = useStores()
  return (
    <div className='customer-select' style={{
      width: width ? width : '100%',
      height: height ? height : '40px',
    }}>
      <select
        value={selected}
        onBlur={() => setActive(false)}
        onClick={() => setActive(!active)}
        onChange={(e) => setSelected(e.target.value)}
        style={{ color: theme.darkMode ? 'white' : "black" }}
        className={
          active
            ? `outline-none bg-${theme.darkMode ? 'darkGrey' : 'white'} border-mainPurple border-2 rounded-md w-full h-full`
            : `outline-none bg-${theme.darkMode ? 'darkGrey' : 'white'} border-lines${!theme.darkMode ? 'Light' : "Dark"} border-2 rounded-md w-full h-full selection:bg-none select-none`
        }
      >
        {
          options.map((option) => {
            return (
              <option className='bg-none hover:bg-none active:bg-none select-none' key={option} value={option}>
                <p style={{ color: theme.darkMode ? colors.white : 'black' }}>{transformOptionText ? transformOptionText(option) : option}</p>
              </option>
            )
          })
        }
      </select>
    </div>
  )
})
