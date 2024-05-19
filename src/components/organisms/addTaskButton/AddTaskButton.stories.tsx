import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';
import AddTaskButton, { type AddTaskButtonProps } from './AddTaskButton';
import type { Task as TaskType } from '~/components/types';
import { colors } from '~/styles';

const meta = {
  component: AddTaskButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs']
} satisfies Meta<typeof AddTaskButton>;
export default meta;
type Story = StoryObj<typeof meta>;

const subtasks = [
  { completed: false, title: "subtask 1", id: "1" },
  { completed: true, title: "subtask 2", id: "2" },
  { completed: false, title: "subtask 3", id: "3" }
]
const columns = [
  "To Do",
  "In Progress",
  "Done"
]
const task: TaskType = {
  title: "Research pricing points of various competitors and trial different business models",
  id: "1",
  currentColumn: "To Do",
  description: "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
  subtasks,
}

export const Light: Story = {
  args: {
    task: task,
    updateTask: (): void => { console.log("updateTask") },
    onDeleteTask: (): void => { console.log("onDeleteTask") },
    columns: columns
  },
  parameters: {
    backgrounds: {
      default: 'light',
      values: [{ name: 'light', value: colors.linesLight }],
    },
  },
  render: (args) => {
    const [{ task }, updateArgs] = useArgs<AddTaskButtonProps>();
    return (
      <div className="">
        <AddTaskButton
          {...args}
          task={task}
          updateTask={(task: TaskType): void => updateArgs({ task })}
        />
      </div>
    )
  }
};
