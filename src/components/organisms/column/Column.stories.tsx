import type { Meta, StoryObj } from '@storybook/react';
import { generateKeyBetween, generateNKeysBetween } from 'fractional-indexing';
import { useArgs } from '@storybook/preview-api';
import { DragDropContext, type DropResult } from "react-beautiful-dnd"
import type { TaskType as TaskType } from '~/components/types';
import { colors } from '~/styles';
import { type ColumnProps, Column } from './Column';
import type { ColumnType as ColumnType } from '~/components/types';

const meta = {
  component: Column,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof Column>;
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
    columnId: `column-${i}`,
    position: `${taskPositions[j]}`,
    description: `Description for task ${j}`,
    subtasks: Array.from({ length: 3 }, (_, k) => ({
      completed: k % 2 === 0,
      title: `Task ${j} Subtask ${k}`,
      id: `${k}`
    }))
  }))
}))


const positions = generateNKeysBetween(null, null, 10)
const tasks: TaskType[] = Array.from({ length: 10 }, (_, i) => ({
  title: `Task ${i}`,
  id: `${i}`,
  columnTitle: "To Do",
  columnId: 'columnId',
  position: `${positions[i]}`,
  description: `Description for task ${i}`,
  subtasks: Array.from({ length: 3 }, (_, j) => ({
    completed: j % 2 === 0,
    title: `Task ${i} Subtask ${j}`,
    id: `${j}`
  }))
}))

export const Light: Story = {
  args: {
    index: 0,
    id: "1",
    tasks: tasks,
    columns: columns,
    column: columns[0]!,
    updateTask: (): void => { console.log("updateTask") },
    onDeleteTask: (): void => { console.log("onDeleteTask") }
  },
  parameters: {
    backgrounds: {
      default: 'light',
      values: [{ name: 'light', value: colors.linesLight }],
    },
  },
  render: (args) => {
    const [{ tasks }, updateArgs] = useArgs<ColumnProps>();
    return (
      <div className="w-96">
        <DragDropContext
          onDragEnd={(result: DropResult): void => {
            const task = tasks.find(t => t.id === result.draggableId);
            console.log("Dropped task", task?.title)
            const currentIndex = result.source.index
            const index = result.destination?.index
            if (currentIndex === undefined || index === undefined) return
            if (currentIndex === index) return
            const movedDown = index > currentIndex
            const aboveTask = movedDown ? tasks[index] : tasks[index - 1]
            const belowTask = movedDown ? tasks[index + 1] : tasks[index]
            if (!aboveTask && !belowTask) return
            const a = aboveTask?.position ?? null
            const b = belowTask?.position ?? null
            const newPosition = generateKeyBetween(a, b)
            console.log("newPosition", newPosition)
            updateArgs({ tasks: tasks.map(t => t.id === task?.id ? { ...task, position: newPosition } : t) })
            console.log("Moved task", task?.title, movedDown ? "down" : "up", "between", aboveTask?.title ?? 'the start', "and", belowTask?.title ?? "the end")
          }}
        >
          <Column
            {...args}
            tasks={tasks}
            updateTask={(task: TaskType): void => updateArgs({ tasks: tasks.map(t => t.id === task.id ? task : t) })}
            onDeleteTask={(task: TaskType): void => updateArgs({ tasks: tasks.filter(t => t.id !== task.id) })}
          />
        </DragDropContext>
      </div>
    )
  }
};
