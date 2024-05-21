import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';
import Toggle, { type ToggleProps } from './Toggle';

const meta = {
  component: Toggle,
  parameters: {
    layout: 'centered',
  }
} satisfies Meta<typeof Toggle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    checked: true,
    setChecked: () => { console.log("setChecked") }
  },
  render: (args) => {
    const [{ checked }, updateArgs] = useArgs<ToggleProps>();
    return (
      <Toggle
        {...args}
        checked={checked}
        setChecked={(checked: boolean) => { updateArgs({ checked }) }}
      />
    )
  }
};
