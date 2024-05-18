import type { Meta, StoryObj } from '@storybook/react';

import Tag from './Tag';

const meta = {
  component: Tag,
  tags: ["autodocs"],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Tag>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    colour: 'Aqua Blue',
    label: "label"
  }
};
