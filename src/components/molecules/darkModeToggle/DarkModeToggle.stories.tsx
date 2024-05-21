import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';

import DarkModeToggle, { type DarkModeToggleProps } from './DarkModeToggle';

const meta = {
  component: DarkModeToggle,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof DarkModeToggle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    darkMode: false,
    setDarkMode: () => { console.log("setDarkMode") }
  },
  render: () => {
    const [{ darkMode }, updateArgs] = useArgs<DarkModeToggleProps>();
    return (
      <div className={`w-[300px] ${darkMode && 'dark'}`}>
        <DarkModeToggle
          darkMode={darkMode}
          setDarkMode={(darkMode: boolean) => { updateArgs({ darkMode }) }}
        />
      </div>
    )
  }

};
