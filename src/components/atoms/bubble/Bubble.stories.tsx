import type { Meta, StoryObj } from '@storybook/react';

import Bubble from './Bubble';

const meta = {
  component: Bubble,
  parameters: {
    layout: 'centered',
  },
  tags: ["autodocs"]
} satisfies Meta<typeof Bubble>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    colour: 'Aqua Blue'
  }
};
