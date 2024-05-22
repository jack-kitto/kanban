import type { Meta, StoryObj } from '@storybook/react';
import Navbar from './Navbar';
import { MainLayout } from '~/components/templates';

const meta = {
  component: Navbar,
} satisfies Meta<typeof Navbar>;

export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
  args: {
    updateTask: (): void => { console.log("updateTask") },
    onDeleteTask: (): void => { console.log("onDeleteTask") },
  },
  render: () => {
    return (
      <MainLayout
        sidebarHidden={false}
        navbar={
          <Navbar
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
