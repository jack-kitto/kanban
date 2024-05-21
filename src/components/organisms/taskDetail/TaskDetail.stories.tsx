import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';
import TaskDetail, { type TaskDetailProps } from './TaskDetail';
import { colors } from '~/styles';
import type { ColumnType, TaskType } from '~/components/types';
import { generateNKeysBetween } from 'fractional-indexing';

const meta = {
  component: TaskDetail,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs']
} satisfies Meta<typeof TaskDetail>;
export default meta;
type Story = StoryObj<typeof meta>;
const subtasks = [
  { completed: false, title: "subtask 1", id: "1" },
  { completed: true, title: "subtask 2", id: "2" },
  { completed: false, title: "subtask 3", id: "3" }
]
const options = [
  {
    text: "Edit Task",
    onClick: () => { alert("Edit Task") }
  },
  {
    text: "Delete Task",
    onClick: () => { alert("Delete Task") },
    destructive: true
  },
]

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

const task: TaskType = {
  title: "Research pricing points of various competitors and trial different business models",
  position: "a0",
  id: "1",
  columnId: 'columnId',
  columnTitle: "To Do",
  description: "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
  subtasks,
}

export const Light: Story = {
  args: {
    task,
    menuOptions: options,
    newTask: false,
    columns,
    saveChanges: (): void => { console.log("saveChanges") },
    editing: false,
    setEditing: (): void => { console.log("setEditing") },
    setNewTask: (): void => { console.log("setNewTask") },
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
    const [{ task, editing }, updateArgs] = useArgs<TaskDetailProps>();
    return (
      <div className='w-full'>
        <TaskDetail
          {...props}
          task={task}
          newTask={false}
          setNewTask={(newTask: boolean): void => { updateArgs({ newTask }) }}
          saveChanges={(task: TaskType): void => {
            console.log("saveChanges", task)
            updateArgs({ task })
          }}
          setEditing={(editing: boolean): void => { updateArgs({ editing }) }}
          editing={editing}
          menuOptions={[
            {
              text: "Edit Task",
              onClick: () => {
                updateArgs({ editing: true })
              }
            },
            {
              text: "Delete Task",
              onClick: () => { alert("Delete Task") },
              destructive: true
            }]}
        />
      </div>
    )
  }
};

export const Dark: Story = {
  args: {
    task,
    menuOptions: options,
    columns,
    newTask: false,
    saveChanges: (): void => { console.log("saveChanges") },
    editing: false,
    setEditing: (): void => { console.log("setEditing") },
    setNewTask: (): void => { console.log("setNewTask") },
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
    const [{ task, editing }, updateArgs] = useArgs<TaskDetailProps>();
    return (
      <div className='w-full dark'>
        <TaskDetail
          {...props}
          task={task}
          newTask={false}
          setNewTask={(newTask: boolean): void => { updateArgs({ newTask }) }}
          saveChanges={(task: TaskType): void => {
            console.log("saveChanges", task)
            updateArgs({ task })
          }}
          setEditing={(editing: boolean): void => { updateArgs({ editing }) }}
          editing={editing}
          menuOptions={[
            {
              text: "Edit Task",
              onClick: () => {
                updateArgs({ editing: true })
              }
            },
            {
              text: "Delete Task",
              onClick: () => { alert("Delete Task") },
              destructive: true
            }]}
        />
      </div>
    )
  }
};

export const NewTaskLight: Story = {
  args: {
    menuOptions: options,
    newTask: true,
    columns,
    saveChanges: (): void => { console.log("saveChanges") },
    editing: true,
    setEditing: (): void => { console.log("setEditing") },
    setNewTask: (): void => { console.log("setNewTask") },
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
    const [{ task, editing, newTask }, updateArgs] = useArgs<TaskDetailProps>();
    return (
      <div className='w-full'>
        <TaskDetail
          {...props}
          task={task}
          newTask={newTask}
          setNewTask={(newTask: boolean): void => { updateArgs({ newTask }) }}
          saveChanges={(task: TaskType): void => {
            console.log("saveChanges", task)
            updateArgs({ task })
          }}
          setEditing={(editing: boolean): void => { updateArgs({ editing }) }}
          editing={editing}
          menuOptions={[
            {
              text: "Edit Task",
              onClick: () => {
                updateArgs({ editing: true })
              }
            },
            {
              text: "Delete Task",
              onClick: () => { alert("Delete Task") },
              destructive: true
            }]}
        />
      </div>
    )
  }
};

export const NewTaskDark: Story = {
  args: {
    menuOptions: options,
    newTask: true,
    columns,
    saveChanges: (): void => { console.log("saveChanges") },
    editing: true,
    setEditing: (): void => { console.log("setEditing") },
    setNewTask: (): void => { console.log("setNewTask") },
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
    const [{ task, editing, newTask }, updateArgs] = useArgs<TaskDetailProps>();
    return (
      <div className='w-full dark'>
        <TaskDetail
          {...props}
          task={task}
          newTask={newTask}
          setNewTask={(newTask: boolean): void => { updateArgs({ newTask }) }}
          saveChanges={(task: TaskType): void => {
            console.log("saveChanges", task)
            updateArgs({ task })
          }}
          setEditing={(editing: boolean): void => { updateArgs({ editing }) }}
          editing={editing}
          menuOptions={[
            {
              text: "Edit Task",
              onClick: () => {
                updateArgs({ editing: true })
              }
            },
            {
              text: "Delete Task",
              onClick: () => { alert("Delete Task") },
              destructive: true
            }]}
        />
      </div>
    )
  }
};
