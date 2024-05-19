import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from '@storybook/preview-api';
import Checkbox, { type CheckboxProps } from "./Checkbox";
import { colors } from "~/styles";

const meta: Meta = {
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  component: Checkbox
}

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Light: Story = {
  args: {
    checked: false,
  },
  render: function Render(args: CheckboxProps): JSX.Element {
    const [{ checked }, updateArgs] = useArgs<CheckboxProps>();
    return (
      <Checkbox
        {...args}
        checked={checked}
        setChecked={(checked: boolean): void => {
          updateArgs({ checked });
        }}
      />
    )
  }
}

export const Dark: Story = {
  args: {
    checked: false,
  },
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: colors.darkGray }]
    }
  },
  render: function Render(args: CheckboxProps): JSX.Element {
    const [{ checked }, updateArgs] = useArgs<CheckboxProps>();
    return (
      <div className="dark">
        <Checkbox
          {...args}
          checked={checked}
          setChecked={(checked: boolean): void => {
            updateArgs({ checked });
          }}
        />
      </div>
    )
  }
}
