import type { Meta, StoryObj } from '@storybook/react';

import TooltipMenu from './TooltipMenu';
import MenuButton from '../menuButton/MenuButton';

const meta = {
  component: TooltipMenu,
  parameters: {
    layout: 'centered',
  }
} satisfies Meta<typeof TooltipMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Left: Story = {
  args: {
    angle: 'NW',
    options: [
      {
        text: 'Option 1',
        onClick: () => { }
      },
      {
        text: 'Option 2',
        onClick: () => { },
        destructive: true
      }
    ],
    children: <MenuButton type='hover' />
  },
};
