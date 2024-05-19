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
        onClick: (): void => { console.log("Option 1") }
      },
      {
        text: 'Option 2',
        onClick: (): void => { console.log("Option 2") },
        destructive: true
      }
    ],
    children: <MenuButton type='hover' />
  },
};
