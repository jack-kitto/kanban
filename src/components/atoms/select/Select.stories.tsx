import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';

import Select from './Select';

const meta = {
  component: Select,
  tags: ["autodocs"],
  parameters: {
    layout: 'centered',
  },

} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    options: ["Todo", "Doing", "Done"],
    selected: "selected",
    setSelected: () => { }
  },
  render: function Render(args) {
    const [{ options, selected }, updateArgs] = useArgs();
    return <Select {...args} options={options} selected={selected} setSelected={(selected: string) => { updateArgs({ selected }) }} />;
  }
};
