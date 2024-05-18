import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';

import TaskDetail from './TaskDetail';
import { colors } from '~/styles';

const meta = {
  component: TaskDetail,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs']
} satisfies Meta<typeof TaskDetail>;

export default meta;

type Story = StoryObj<typeof meta>;

const subtasks = [
  { completed: false, title: "subtask 1", id: "1" },
  { completed: true, title: "subtask 2", id: "2" },
  { completed: false, title: "subtask 3", id: "3" }
]

const options = [
  {
    text: "Edit Task",
    onClick: () => { alert("Edit Task") }
  },
  {
    text: "Delete Task",
    onClick: () => { alert("Delete Task") },
    destructive: true
  },
]

const columns = [
  "To Do",
  "In Progress",
  "Done"
]

export const Light: Story = {
  args: {
    menuOptions: options,
    title: "Research pricing points of various competitors and trial different business models",
    id: "1",
    currentColumn: "To Do",
    columns,
    setCurrentColumn: () => { },
    description: "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
    subtasks,
    onSubtaskToggle: () => { }
  },
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: colors.linesLight }
      ],
    }
  },
  render: (props) => {
    const [{ subtasks }, updateArgs] = useArgs();
    return (
      <div className='w-full'>
        <TaskDetail
          {...props}
          subtasks={subtasks}
          onSubtaskToggle={(id: string) => {
            const newSubtasks = subtasks.map((subtask: any) => {
              if (subtask.id === id) {
                return {
                  ...subtask,
                  completed: !subtask.completed
                }
              }
              return subtask
            })
            updateArgs({ subtasks: newSubtasks })

          }}
          setCurrentColumn={(column: string) => {
            updateArgs({ currentColumn: column })
          }}
        />
      </div>
    )
  }
};

export const Dark: Story = {
  args: {
    id: "1",
    menuOptions: options,
    currentColumn: "To Do",
    columns,
    setCurrentColumn: () => { },
    title: "Research pricing points of various competitors and trial different business models",
    description: "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
    subtasks,
    onSubtaskToggle: () => { }
  },
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: colors.veryDarkGray },
      ],
    }
  },
  render: (props) => {
    const [{ subtasks, currentColumn }, updateArgs] = useArgs();
    return (
      <div className='dark w-full'>
        <TaskDetail
          {...props}
          subtasks={subtasks}
          onSubtaskToggle={(id: string) => {
            const newSubtasks = subtasks.map((subtask: any) => {
              if (subtask.id === id) {
                return {
                  ...subtask,
                  completed: !subtask.completed
                }
              }
              return subtask
            })
            updateArgs({ subtasks: newSubtasks })

          }}
          setCurrentColumn={(column: string) => {
            updateArgs({ currentColumn: column })
          }}
        />
      </div>
    )
  }
};
