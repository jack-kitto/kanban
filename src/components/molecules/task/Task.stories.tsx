import type { Meta, StoryObj } from '@storybook/react';

import Task from './Task';

const meta = {
  component: Task,
  tags: ["autodocs"],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Task>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Title",
    subtitle: "Subtitle"
  }
};
