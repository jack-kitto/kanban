import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';
import BoardDetail, { type BoardDetailProps } from './BoardDetail';
import { colors } from '~/styles';
import type { ColumnType, Project } from '~/components/types';
import { generateNKeysBetween } from 'fractional-indexing';

const meta = {
  component: BoardDetail,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs']
} satisfies Meta<typeof BoardDetail>;
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
    columnId: `column-${i}`,
    id: `${j}`,
    columnTitle: `Column ${i}`,
    position: `${taskPositions[j]}`,
    description: `Description for task ${j}`,
    subtasks: Array.from({ length: 3 }, (_, k) => ({
      completed: k % 2 === 0,
      title: `Task ${j} Subtask ${k}`,
      id: `${k}`
    }))
  }))
}))

const options = [
  {
    text: "Edit Board",
    onClick: () => { alert("Edit Board") }
  },
  {
    text: "Delete Board",
    onClick: () => { alert("Delete Board") },
    destructive: true
  },
]

const project: Project = {
  title: "Research pricing points of various competitors and trial different business models",
  id: "1",
  description: "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
  columns,
}

export const LightEditing: Story = {
  args: {
    project: project,
    menuOptions: options,
    newBoard: false,
    saveChanges: (): void => { console.log("saveChanges") },
    editing: true,
    setEditing: (): void => { console.log("setEditing") },
    setNewBoard: (): void => { console.log("Board") },
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
    const [{ project, editing }, updateArgs] = useArgs<BoardDetailProps>();
    return (
      <div className='w-full'>
        <BoardDetail
          {...props}
          project={project}
          newBoard={false}
          setNewBoard={(newBoard: boolean): void => { updateArgs({ newBoard }) }}
          saveChanges={(project: Project): void => {
            console.log("saveChanges", project)
            updateArgs({ project: project })
          }}
          setEditing={(editing: boolean): void => { updateArgs({ editing }) }}
          editing={editing}
          menuOptions={[
            {
              text: "Edit Board",
              onClick: () => {
                updateArgs({ editing: true })
              }
            },
            {
              text: "Delete Board",
              onClick: () => { alert("Delete Board") },
              destructive: true
            }]}
        />
      </div>
    )
  }
};

export const DarkEditing: Story = {
  args: {
    project: project,
    menuOptions: options,
    newBoard: false,
    saveChanges: (): void => { console.log("saveChanges") },
    editing: true,
    setEditing: (): void => { console.log("setEditing") },
    setNewBoard: (): void => { console.log("Board") },
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
    const [{ project, editing }, updateArgs] = useArgs<BoardDetailProps>();
    return (
      <div className='w-full dark'>
        <BoardDetail
          {...props}
          project={project}
          newBoard={false}
          setNewBoard={(newBoard: boolean): void => { updateArgs({ newBoard }) }}
          saveChanges={(project: Project): void => {
            console.log("saveChanges", project)
            updateArgs({ project: project })
          }}
          setEditing={(editing: boolean): void => { updateArgs({ editing }) }}
          editing={editing}
          menuOptions={[
            {
              text: "Edit Board",
              onClick: () => {
                updateArgs({ editing: true })
              }
            },
            {
              text: "Delete Board",
              onClick: () => { alert("Delete Board") },
              destructive: true
            }]}
        />
      </div>
    )
  }
};

export const NewBoardLight: Story = {
  args: {
    project: null,
    menuOptions: options,
    newBoard: true,
    saveChanges: (): void => { console.log("saveChanges") },
    editing: true,
    setEditing: (): void => { console.log("setEditing") },
    setNewBoard: (): void => { console.log("setNewBoard") },
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
    const [{ editing, newBoard }, updateArgs] = useArgs<BoardDetailProps>();
    return (
      <div className='w-full'>
        <BoardDetail
          {...props}
          newBoard={newBoard}
          setNewBoard={(newBoard: boolean): void => { updateArgs({ newBoard }) }}
          saveChanges={(project: Project): void => {
            console.log("saveChanges", project)
            updateArgs({ project: project })
          }}
          setEditing={(editing: boolean): void => { updateArgs({ editing }) }}
          editing={editing}
          menuOptions={[
            {
              text: "Edit Board",
              onClick: () => {
                updateArgs({ editing: true })
              }
            },
            {
              text: "Delete Board",
              onClick: () => { alert("Delete Board") },
              destructive: true
            }]}
        />
      </div>
    )
  }
};

export const NewBoardDark: Story = {
  args: {
    menuOptions: options,
    project: null,
    newBoard: true,
    saveChanges: (): void => { console.log("saveChanges") },
    editing: true,
    setEditing: (): void => { console.log("setEditing") },
    setNewBoard: (): void => { console.log("setNewBoard") },
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
    const [{ editing, newBoard }, updateArgs] = useArgs<BoardDetailProps>();
    return (
      <div className='w-full dark'>
        <BoardDetail
          {...props}
          newBoard={newBoard}
          setNewBoard={(newBoard: boolean): void => { updateArgs({ newBoard }) }}
          saveChanges={(project: Project): void => {
            console.log("saveChanges", project)
            updateArgs({ project: project })
          }}
          setEditing={(editing: boolean): void => { updateArgs({ editing }) }}
          editing={editing}
          menuOptions={[
            {
              text: "Edit Board",
              onClick: () => {
                updateArgs({ editing: true })
              }
            },
            {
              text: "Delete Board",
              onClick: () => { alert("Delete Board") },
              destructive: true
            }]}
        />
      </div>
    )
  }
};
