import type { Meta, StoryObj } from '@storybook/react';
import AddTaskButton from './AddTaskButton';
import type { ColumnType, TaskType as TaskType } from '~/components/types';
import { colors } from '~/styles';
import { generateNKeysBetween } from 'fractional-indexing';

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
const task: TaskType = {
  title: "Research pricing points of various competitors and trial different business models",
  id: "1",
  position: "a0",
  columnTitle: "To Do",
  columnId: 'columnId',
  description: "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
  subtasks,
}

const taskPositions = generateNKeysBetween(null, null, 5)
const columnPositions = generateNKeysBetween(null, null, 3)
const columns: ColumnType[] = Array.from({ length: 3 }, (_, i) => ({
  id: `column-${i}`,
  title: `Column ${i}`,
  colour: 'Violet',
  position: `${columnPositions[i]}`,
  tasks: Array.from({ length: 5 }, (_, j) => ({
    title: `Task ${j}`,
    id: `${j}`,
    columnTitle: `Column ${i}`,
    position: `${taskPositions[j]}`,
    description: `Description for task ${j}`,
    columnId: `column-${i}`,
    subtasks: Array.from({ length: 3 }, (_, k) => ({
      completed: k % 2 === 0,
      title: `Task ${j} Subtask ${k}`,
      id: `${k}`
    }))
  }))
}))


export const Light: Story = {
  args: {
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
    return (
      <div className="">
        <AddTaskButton
          {...args}
        />
      </div>
    )
  }
};
