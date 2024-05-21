import type { Meta, StoryObj } from '@storybook/react';

import ProjectCard from './ProjectCard';
import { generateNKeysBetween } from 'fractional-indexing';
import { createId } from '@paralleldrive/cuid2';
import { ColumnType, Project, TaskType } from '~/components/types';
import { colors } from '~/styles';

const meta = {
  component: ProjectCard,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ProjectCard>;

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
const project: Project = {
  id: createId(),
  columns: columns,
  title: 'Project 1',
  description: 'This is a project',
}

export const Light: Story = {
  args: {
    project,
  },
  parameters: {
    backgrounds: {
      default: 'light',
      values: [{ name: 'light', value: colors.linesLight }],
    },
  },
  render: (args) => (
    <div className='min-w-[400px]'>
      <ProjectCard {...args} />
    </div>
  ),


};

export const Dark: Story = {
  args: {
    project,
  },
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: colors.veryDarkGray }]
    },
  },
  render: (args) => (
    <div className='min-w-[400px] dark'>
      <ProjectCard {...args} />
    </div>
  ),


};
