import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';

import Select, { SelectOption, type SelectProps } from './Select';
import { colors } from '~/styles';

const meta = {
  component: Select,
  tags: ["autodocs"],
  parameters: {
    layout: 'centered',
  },

} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

const options: SelectOption[] = [
  { label: "Todo", id: "todo" },
  { label: "Doing", id: "doing" },
  { label: "Done", id: "done" }
]
export const Light: Story = {
  args: {
    options,
    label: "label",
    selected: "selected",
    setSelected: (): void => { console.log("selected") }
  },
  render: function Render(args) {
    const [{ options, selected }, updateArgs] = useArgs<SelectProps>();
    return <Select {...args} options={options} selected={selected} setSelected={(selected: string) => { updateArgs({ selected }) }} />;
  }
};

export const Dark: Story = {
  args: {
    options,
    label: "label",
    selected: "selected",
    setSelected: (): void => { console.log("selected") }
  },
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: colors.darkGray }]
    }
  },
  render: function Render(args) {
    const [{ options, selected }, updateArgs] = useArgs<SelectProps>();
    return (
      <div className="dark">
        <Select {...args} options={options} selected={selected} setSelected={(selected: string) => { updateArgs({ selected }) }} />
      </div>
    )
  }
};
