import type { Meta, StoryObj } from '@storybook/react';
import { createId } from '@paralleldrive/cuid2';
import { generateNKeysBetween } from 'fractional-indexing';
import { useArgs } from '@storybook/preview-api';
import type { ColumnType, TaskType as TaskType } from '~/components/types';
import { colors } from '~/styles';
import Board, { type BoardProps } from './Board';
import { updateTaskInListOfColumns } from '~/components/helpers';

const meta = {
  component: Board,
  tags: ['autodocs']
} satisfies Meta<typeof Board>;
export default meta;
type Story = StoryObj<typeof meta>;


const taskPositions = generateNKeysBetween(null, null, 10)
const columnPositions = generateNKeysBetween(null, null, 3)
const columns: ColumnType[] = Array.from({ length: 3 }, (_, i) => {
  const id = createId()
  return {
    id: id,
    title: `Column ${i}`,
    colour: 'Violet',
    position: `${columnPositions[i]}`,
    updateColumn: (tasks: TaskType[]): void => { console.log("updateColumn", tasks) },
    tasks: Array.from({ length: 10 }, (_, j) => ({
      title: `Task ${j}`,
      id: createId(),
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

const column: ColumnType = columns[0]!

export const Light: Story = {
  args: {
    index: 0,
    updateColumn: (): void => { console.log("updateColumn") },
    updateColumns: (): void => { console.log("updateColumns") },
    id: "1",
    columns: columns,
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
    const [{ columns }, updateArgs] = useArgs<BoardProps>();
    return (
      <div className="min-w-[100vh] min-h-[100vh]">
        <Board
          {...args}
          updateTask={(task: TaskType): void => updateTaskInListOfColumns(task, columns, (newColumns: ColumnType[]): void => updateArgs({ columns: newColumns }))}
          onDeleteTask={(task: TaskType): void => updateArgs({ columns: columns.map((c: ColumnType): ColumnType => c.id === task.columnId ? { ...c, tasks: c.tasks.filter((t: TaskType): boolean => t.id !== task.id) } : c) })}
          updateColumn={(tasks: TaskType[]): void => updateArgs({ columns: columns.map((c: ColumnType): ColumnType => c.id === column.id ? { ...c, tasks } : c) })}
          updateColumns={(columns: ColumnType[]): void => updateArgs({ columns })}
          columns={columns}
        />
      </div>
    )
  }
};
