import type { Meta, StoryObj } from '@storybook/react';

import MainLayout from './MainLayout';

const meta = {
  component: MainLayout,
} satisfies Meta<typeof MainLayout>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Light: Story = {
  args: {
    sidebarHidden: false,
    sidebar: <div className='w-full flex items-center justify-center h-full bg-lime-300'>Sidebar</div>,
    navbar: <div className='w-full flex items-center justify-center h-full bg-purple-300'>Navbar</div>,
    children: <div className='w-full flex items-center justify-center h-full bg-teal-400'>Children</div>
  }
};

export const SidebarHidden: Story = {
  args: {
    sidebarHidden: true,
    sidebar: <div className='w-full flex items-center justify-center h-full bg-lime-300'>Sidebar</div>,
    navbar: <div className='w-full flex items-center justify-center h-full bg-purple-300'>Navbar</div>,
    children: <div className='w-full flex items-center justify-center h-full bg-teal-400'>Children</div>
  }
};

export const Dark: Story = {
  args: {
    sidebar: <div className='w-full flex items-center justify-center h-full bg-lime-300'>Sidebar</div>,
    sidebarHidden: false,
    navbar: <div className='w-full flex items-center justify-center h-full bg-purple-300'>Navbar</div>,
    children: <div className='w-full flex items-center justify-center h-full bg-teal-400'>Children</div>
  },
  render: (args) => {
    return (
      <div className='dark'>
        <MainLayout {...args} />
      </div>
    )
  }
};
