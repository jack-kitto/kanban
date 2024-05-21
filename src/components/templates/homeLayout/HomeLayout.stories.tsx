import type { Meta, StoryObj } from '@storybook/react';
import HomeLayout from './HomeLayout';


const meta = {
  component: HomeLayout,
} satisfies Meta<typeof HomeLayout>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    navbar: <div className='w-full flex items-center justify-center h-full bg-purple-300'>Navbar</div>,
    children: <div className='w-full flex items-center justify-center h-full bg-teal-400'>Children</div>
  }
};
