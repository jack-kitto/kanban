import { Meta, StoryObj } from "@storybook/react";
import { useArgs } from '@storybook/preview-api';
import Checkbox, { CheckboxProps } from "./Checkbox";

const meta: Meta = {
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  component: Checkbox
}

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    checked: false,
    setChecked: (_: boolean): void => { },
  },
  render: function Render(args: CheckboxProps): JSX.Element {
    const [{ checked }, updateArgs] = useArgs();
    return (
      <Checkbox
        {...args}
        checked={checked}
        setChecked={(checked: boolean) => {
          updateArgs({ checked });
        }}
      />
    )
  }
}