import type { Meta, StoryObj } from '@storybook/react';
import AddTaskButton from './AddTaskButton';
import type { ColumnType } from '~/components/types';
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
