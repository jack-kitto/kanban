import type { Meta, StoryObj } from '@storybook/react';

import Main from './Main';

const meta = {
  component: Main,
} satisfies Meta<typeof Main>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    sidebar: <div className='w-full flex items-center justify-center h-full bg-lime-300'>Sidebar</div>,
    navbar: <div className='w-full flex items-center justify-center h-full bg-purple-300'>Navbar</div>,
    children: <div className='w-full flex items-center justify-center h-full bg-teal-400'>Children</div>
  }
};
