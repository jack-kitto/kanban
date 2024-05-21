import type { Meta, StoryObj } from '@storybook/react';

import ProjectCardList from './ProjectCardList';
import { generateNKeysBetween } from 'fractional-indexing';
import { createId } from '@paralleldrive/cuid2';
import { ColumnType, Project, TaskType } from '~/components/types';
import { colors } from '~/styles';

const meta = {
  component: ProjectCardList,
} satisfies Meta<typeof ProjectCardList>;

export default meta;

type Story = StoryObj<typeof meta>;

// const taskPositions = generateNKeysBetween(null, null, 10)
// const columnPositions = generateNKeysBetween(null, null, 3)
// const columns: ColumnType[] = Array.from({ length: 3 }, (_, i) => {
//   const id = createId()
//   return {
//     id: id,
//     title: `Column ${i}`,
//     colour: 'Violet',
//     position: `${columnPositions[i]}`,
//     updateColumn: (tasks: TaskType[]): void => { console.log("updateColumn", tasks) },
//     tasks: Array.from({ length: 10 }, (_, j) => ({
//       title: `Task ${j}`,
//       id: createId(),
//       columnTitle: `Column ${i}`,
//       columnId: id,
//       position: `${taskPositions[j]}`,
//       description: `Description for task ${j}`,
//       subtasks: Array.from({ length: 3 }, (_, k) => ({
//         completed: k % 2 === 0,
//         title: `Task ${j} Subtask ${k}`,
//         id: `${k}`
//       }))
//     }))
//   }
// })
//
// const column: ColumnType = columns[0]!
// const project: Project = {
//   id: createId(),
//   columns: columns,
//   title: 'Project 1',
//   description: 'This is a project',
// }


const projects: Project[] = Array.from({ length: 5 }, (_, i) => {
  return {
    id: createId(),
    title: `Project ${i}`,
    description: `Description for project ${i}`,
    columns: Array.from({ length: 3 }, (_, j) => {
      const id = createId()
      return {
        id: id,
        title: `Column ${j}`,
        colour: 'Violet',
        position: `${j}`,
        updateColumn: (tasks: TaskType[]): void => { console.log("updateColumn", tasks) },
        tasks: Array.from({ length: 10 }, (_, k) => ({
          title: `Task ${k}`,
          id: createId(),
          columnTitle: `Column ${j}`,
          columnId: id,
          position: `${k}`,
          description: `Description for task ${k}`,
          subtasks: Array.from({ length: 3 }, (_, l) => ({
            completed: l % 2 === 0,
            title: `Task ${k} Subtask ${l}`,
            id: `${l}`
          }))
        }))
      }
    })
  }
})


export const Light: Story = {
  args: {
    projects,
  },
  parameters: {
    backgrounds: {
      default: 'light',
      values: [{ name: 'light', value: colors.linesLight }],
    },
  }
};


export const Dark: Story = {
  args: {
    projects,
  },
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: colors.veryDarkGray }],
    },
  },
  render: (args) => (
    <div className='min-w-[400px] dark'>
      <ProjectCardList {...args} />
    </div>
  )
};
