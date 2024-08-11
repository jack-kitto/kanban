import type { Meta, StoryObj } from '@storybook/react';
import Navbar, { NavbarProps } from './Navbar';
import { MainLayout } from '~/components/templates';
import { fakeProject } from 'prisma/fake-data';
import { Project } from '@prisma/client';
import { } from '@nextui-org/react';

const meta = {
  component: Navbar,
} satisfies Meta<typeof Navbar>;

export default meta;

type Story = StoryObj<typeof meta>;
export const ProjectView: Story = {
  args: {
    project: fakeProject() as any,
    createProject: (p: Project) => { console.log("p", p) },
    updateTask: (): void => { console.log("updateTask") },
    onDeleteTask: (): void => { console.log("onDeleteTask") },
  },
  render: (args: NavbarProps) => {
    return (
      <MainLayout
        sidebarHidden={false}
        navbar={
          <Navbar
            {...args}
            updateTask={(): void => { console.log("updateTask") }}
            onDeleteTask={(): void => { console.log("onDeleteTask") }}
          />
        }
        sidebar={<div className='w-full flex items-center justify-center h-full bg-lime-300'>Sidebar</div>}
      >
        <div className='w-full flex items-center justify-center h-full bg-teal-400'>Children</div>
      </MainLayout>
    )
  }
};

export const HomeView: Story = {
  args: {
    updateTask: (): void => { console.log("updateTask") },
    onDeleteTask: (): void => { console.log("onDeleteTask") },
    createProject: (): void => { console.log("onDeleteTask") },
  },
  render: (args: NavbarProps) => {
    return (
      <MainLayout
        sidebarHidden={false}
        navbar={
          <Navbar
            {...args}
            updateTask={(): void => { console.log("updateTask") }}
            onDeleteTask={(): void => { console.log("onDeleteTask") }}
          />
        }
        sidebar={<div className='w-full flex items-center justify-center h-full bg-lime-300'>Sidebar</div>}
      >
        <div className='w-full flex items-center justify-center h-full bg-teal-400'>Children</div>
      </MainLayout>
    )
  }
};
