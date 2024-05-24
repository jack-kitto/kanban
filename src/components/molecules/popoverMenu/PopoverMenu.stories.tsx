import type { Meta, StoryObj } from '@storybook/react';

import PopoverMenu from './PopoverMenu';

const meta = {
  component: PopoverMenu,
} satisfies Meta<typeof PopoverMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    position: 'left-start',
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
  }
};
