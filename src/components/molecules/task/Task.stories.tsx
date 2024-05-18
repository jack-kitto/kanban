import type { Meta, StoryObj } from '@storybook/react';

import Task from './Task';
import { colors } from '~/styles';

const meta = {
  component: Task,
  tags: ["autodocs"],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Task>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {
    title: "Title",
    subtitle: "Subtitle"
  }
};

export const Dark: Story = {
  args: {
    title: "Title",
    subtitle: "Subtitle"
  },
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: colors.veryDarkGray }]
    }
  },
  render: function Render(args) {
    return (
      <div className="dark">
        <Task {...args} />
      </div>
    )
  }
};
