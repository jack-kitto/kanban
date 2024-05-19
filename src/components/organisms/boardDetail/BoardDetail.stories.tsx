import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';
import BoardDetail, { type BoardDetailProps } from './BoardDetail';
import { colors } from '~/styles';
import type { Column, Project } from '~/components/types';

const meta = {
  component: BoardDetail,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs']
} satisfies Meta<typeof BoardDetail>;
export default meta;
type Story = StoryObj<typeof meta>;
const columns: Column[] = [
  { title: "Todo", id: "1", colour: "Aquamarine" },
  { title: "Doing", id: "2", colour: "Violet" },
  { title: "Done", id: "3", colour: "Jordy Blue" }
]
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
