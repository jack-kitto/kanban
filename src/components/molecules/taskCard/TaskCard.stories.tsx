import type { Meta, StoryObj } from '@storybook/react';

import TaskCard from './TaskCard';
import { colors } from '~/styles';

const meta = {
  component: TaskCard,
  tags: ["autodocs"],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof TaskCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {
    title: "Title",
    index: 0,
    subtitle: "Subtitle"
  }
};

export const Dark: Story = {
  args: {
    title: "Title",
    index: 0,
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
        <TaskCard {...args} />
      </div>
    )
  }
};
