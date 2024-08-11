import type { Meta, StoryObj } from '@storybook/react';
import Navbar, { type NavbarProps } from './Navbar';
import { MainLayout } from '~/components/templates';
import { fakeProject } from '~/components/types';

const meta = {
  component: Navbar,
} satisfies Meta<typeof Navbar>;

export default meta;

type Story = StoryObj<typeof meta>;
export const ProjectView: Story = {
  args: {
    project: fakeProject(),
  },
  render: (args: NavbarProps) => {
    return (
      <MainLayout
        sidebarHidden={false}
        navbar={<Navbar {...args} />}
        sidebar={<div className='w-full flex items-center justify-center h-full bg-lime-300'>Sidebar</div>}
      >
        <div className='w-full flex items-center justify-center h-full bg-teal-400'>Children</div>
      </MainLayout>
    )
  }
};

export const HomeView: Story = {
  args: {
  },
  render: (args: NavbarProps) => {
    return (
      <MainLayout
        sidebarHidden={false}
        navbar={<Navbar {...args} />}
        sidebar={<div className='w-full flex items-center justify-center h-full bg-lime-300'>Sidebar</div>}
      >
        <div className='w-full flex items-center justify-center h-full bg-teal-400'>Children</div>
      </MainLayout>
    )
  }
};
