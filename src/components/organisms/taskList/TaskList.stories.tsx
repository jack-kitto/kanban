import { generateNKeysBetween } from 'fractional-indexing';
import type { Meta, StoryObj } from '@storybook/react';
import type { ColumnType } from '~/components/types';
import { useArgs } from '@storybook/preview-api';
import { DragDropContext, type DropResult } from "react-beautiful-dnd";
import { type TaskListProps, TaskList } from './TaskList';
import type { TaskType as TaskType } from '~/components/types';
import { colors } from '~/styles';
import { handleDragEnd } from '~/components/helpers';
import { createId } from '@paralleldrive/cuid2';

const meta = {
  component: TaskList,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof TaskList>;
export default meta;
type Story = StoryObj<typeof meta>;

const taskPositions = generateNKeysBetween(null, null, 5)
const columnPositions = generateNKeysBetween(null, null, 3)
const columns: ColumnType[] = Array.from({ length: 3 }, (_, i) => {
  const id = createId()
  return {
    id,
    title: `Column ${i}`,
    colour: 'Violet',
    position: `${columnPositions[i]}`,
    tasks: Array.from({ length: 5 }, (_, j) => ({
      title: `Task ${j}`,
      id: `${j}`,
      columnTitle: `Column ${i}`,
      columnId: id,
      position: `${taskPositions[j]}`,
      description: `Description for task ${j}`,
      subtasks: Array.from({ length: 3 }, (_, k) => ({
        completed: k % 2 === 0,
        title: `Task ${j} Subtask ${k}`,
        id: `${k}`
      }))
    }))
  }
})



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

const column: ColumnType = columns[0]!

export const Light: Story = {
  args: {
    tasks: tasks,
    columns: columns,
    column,
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
    const [{ tasks }, updateArgs] = useArgs<TaskListProps>();
    return (
      <div className="w-96">
        <DragDropContext
          onDragEnd={(result: DropResult): void => {
            handleDragEnd(result, tasks, (newTasks) => updateArgs({ tasks: newTasks }))
            // const task = tasks.find(t => t.id === result.draggableId);
            // console.log("Dropped task", task?.title)
            // const currentIndex = result.source.index
            // const index = result.destination?.index
            // const movedDown = index! > currentIndex
            // const aboveTask = movedDown ? tasks[index!] : tasks[index! - 1]
            // const belowTask = movedDown ? tasks[index! + 1] : tasks[index!]
            // if (!aboveTask || !belowTask) return
            // const newPosition = generateKeyBetween(aboveTask.position, belowTask.position)
            // updateArgs({ tasks: tasks.map(t => t.id === task?.id ? { ...task, position: newPosition } : t) })
            // console.log("Moved task", task?.title, movedDown ? "down" : "up", "between", aboveTask.title, "and", belowTask.title)
          }}
        >
          <TaskList
            {...args}
            updateTask={(task: TaskType): void => updateArgs({ tasks: tasks.map(t => t.id === task.id ? task : t) })}
            onDeleteTask={(task: TaskType): void => updateArgs({ tasks: tasks.filter(t => t.id !== task.id) })}
            tasks={tasks}
          />
        </DragDropContext>
      </div>
    )
  }
};
