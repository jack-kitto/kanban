import type { Meta, StoryObj } from '@storybook/react';
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import TaskList from './TaskList';
import type { Task as TaskType } from '~/components/types';
import { colors } from '~/styles';

const meta = {
  component: TaskList,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof TaskList>;
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

const tasks: TaskType[] = Array.from({ length: 10 }, (_, i) => ({
  title: `Task ${i}`,
  id: `${i}`,
  currentColumn: "To Do",
  description: `Description for task ${i}`,
  subtasks: Array.from({ length: 3 }, (_, j) => ({
    completed: j % 2 === 0,
    title: `Task ${i} Subtask ${j}`,
    id: `${j}`
  }))
}))

export const Light: Story = {
  args: {
    tasks: tasks,
    columns: columns,
    column: { id: "To Do", title: "To Do" },
    updateTask: (): void => { console.log("updateTask") },
    onDeleteTask: (): void => { console.log("onDeleteTask") }
  },
  parameters: {
    backgrounds: {
      default: 'light',
      values: [{ name: 'light', value: colors.linesLight }],
    },
  },
  render: (args) => (

    <div className="w-96">
      <DragDropContext onDragEnd={() => { console.log('drag end') }}>
        <TaskList {...args} />
      </DragDropContext>
    </div>
  )
};
