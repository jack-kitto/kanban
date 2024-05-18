import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';

import Subtask, { SubtaskProps } from './Subtask';

const meta = {
  component: Subtask,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Subtask>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    checked: true,
    setChecked: () => { },
    text: "text"
  },
  render: function Render(args: SubtaskProps): JSX.Element {
    const [{ checked }, updateArgs] = useArgs();
    return (
      <Subtask
        {...args}
        checked={checked}
        setChecked={(checked: boolean) => {
          updateArgs({ checked });
        }}
      />
    )
  }
};
