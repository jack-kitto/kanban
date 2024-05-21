import type { Meta, StoryObj } from '@storybook/react';
import SidebarItem from './SidebarItem';

const meta = {
  component: SidebarItem,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof SidebarItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Selected: Story = {
  args: {
    label: "label",
    checked: true,
    onClick: () => { console.log("onClick") },
    setChecked: () => { console.log("setChecked") }
  },
  render: () => {
    return (
      <div className={`w-[300px] border-2 border-linesLight`}>
        <SidebarItem
          label="label"
          checked={true}
          setChecked={() => { console.log("setChecked") }}
          onClick={() => { console.log("onClick") }}
        />
      </div>
    )
  }
};

export const Unselected: Story = {
  args: {
    label: "label",
    onClick: () => { console.log("onClick") },
    checked: true,
    setChecked: () => { console.log("setChecked") }
  },
  render: () => {
    return (
      <div className={`w-[300px] border-2 border-linesLight`}>
        <SidebarItem
          label="label"
          onClick={() => { console.log("onClick") }}
          checked={false}
          setChecked={() => { console.log("setChecked") }}
        />
      </div>
    )
  }
};

export const Button: Story = {
  args: {
    label: "label",
    onClick: () => { console.log("onClick") },
    checked: true,
    setChecked: () => { console.log("setChecked") }
  },
  render: () => {
    return (
      <div className={`w-[300px] border-2 border-linesLight`}>
        <SidebarItem
          label="+ Create New Board"
          onClick={() => { console.log("onClick") }}
          type='button'
          checked={false}
          setChecked={() => { console.log("setChecked") }}
        />
      </div>
    )
  }
};
