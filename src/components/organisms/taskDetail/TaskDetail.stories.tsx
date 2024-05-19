import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';
import TaskDetail, { type Subtask, type TaskDetailProps } from './TaskDetail';
import { colors } from '~/styles';

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
const columns = [
  "To Do",
  "In Progress",
  "Done"
]

export const Light: Story = {
  args: {
    menuOptions: options,
    newTask: false,
    saveChanges: (): void => { console.log("saveChanges") },
    editing: false,
    createSubtask: (): void => { console.log("createSubtask") },
    setEditing: (): void => { console.log("setEditing") },
    setNewTask: (): void => { console.log("setNewTask") },
    title: "Research pricing points of various competitors and trial different business models",
    id: "1",
    currentColumn: "To Do",
    columns,
    setCurrentColumn: (): void => { console.log("setCurrentColumn") },
    description: "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
    subtasks,
    onSubtaskToggle: (): void => { console.log("onSubtaskToggle") }
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
    const [{ subtasks, editing }, updateArgs] = useArgs<TaskDetailProps>();
    return (
      <div className='w-full'>
        <TaskDetail
          {...props}
          subtasks={subtasks}
          setNewTask={(newTask: boolean): void => { updateArgs({ newTask }) }}
          onSubtaskToggle={(id: string): void => {
            console.log("TOGGLE", id)
            const newSubtasks = subtasks?.map((subtask: Subtask): Subtask => {
              console.log("SUBTASK", subtask)
              if (subtask.id === id) {
                return {
                  ...subtask,
                  completed: !subtask.completed
                }
              }
              return subtask
            })
            updateArgs({ subtasks: newSubtasks })
          }}
          setCurrentColumn={(column: string): void => {
            updateArgs({ currentColumn: column })
          }}
          setEditing={(editing: boolean): void => { updateArgs({ editing }) }}
          editing={editing}
          createSubtask={(title?: string): void => {
            const arr = subtasks ?? []
            const newSubtask: Subtask = { title: `${title}`, completed: false, id: `${arr.length}` }
            updateArgs({ subtasks: [...arr, newSubtask] })
          }}
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
//
// export const Dark: Story = {
//   args: {
//     id: "1",
//     newTask: false,
//     editing: false,
//     saveChanges: (): void => { console.log("saveChanges") },
//     createSubtask: (): void => { console.log("createSubtask") },
//     setNewTask: (): void => { console.log("setNewTask") },
//     setEditing: (): void => { console.log("setEditing") },
//     menuOptions: options,
//     currentColumn: "To Do",
//     columns,
//     setCurrentColumn: (): void => { console.log("setCurrentColumn") },
//     title: "Research pricing points of various competitors and trial different business models",
//     description: "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
//     subtasks,
//     onSubtaskToggle: (): void => { console.log("onSubtaskToggle") }
//   },
//   parameters: {
//     backgrounds: {
//       default: 'light',
//       values: [
//         { name: 'light', value: colors.veryDarkGray },
//       ],
//     }
//   },
//   render: (props) => {
//     const [{ subtasks, editing }, updateArgs] = useArgs<TaskDetailProps>();
//     return (
//       <div className='dark w-full'>
//         <TaskDetail
//           {...props}
//           subtasks={subtasks}
//           onSubtaskToggle={(id: string): void => {
//             const newSubtasks = subtasks?.map((subtask: Subtask): Subtask => {
//               if (subtask.id === id) {
//                 return {
//                   ...subtask,
//                   completed: !subtask.completed
//                 }
//               }
//               return subtask
//             })
//             updateArgs({ subtasks: newSubtasks })
//           }}
//           setNewTask={(newTask: boolean): void => { updateArgs({ newTask }) }}
//           createSubtask={(title?: string): void => {
//             const arr = subtasks ?? []
//             const newSubtask: Subtask = { title: `${title}`, completed: false, id: `${arr.length}` }
//             updateArgs({ subtasks: [...arr, newSubtask] })
//           }}
//           setCurrentColumn={(column: string): void => {
//             updateArgs({ currentColumn: column })
//           }}
//           setEditing={(editing: boolean): void => { updateArgs({ editing }) }}
//           editing={editing}
//           menuOptions={[
//             {
//               text: "Edit Task",
//               onClick: (): void => { updateArgs({ editing: true }) }
//             },
//             {
//               text: "Delete Task",
//               onClick: (): void => { alert("Delete Task") },
//               destructive: true
//             }]}
//         />
//       </div>
//     )
//   }
// };
//
// export const NewTaskLight: Story = {
//   args: {
//     saveChanges: (): void => { console.log("saveChanges") },
//     menuOptions: options,
//     newTask: true,
//     editing: true,
//     createSubtask: (): void => { console.log("createSubtask") },
//     columns,
//     setNewTask: (): void => { console.log("setNewTask") },
//     currentColumn: "To Do",
//     setEditing: (): void => { console.log("setEditing") },
//   },
//   parameters: {
//     backgrounds: {
//       default: 'light',
//       values: [
//         { name: 'light', value: colors.linesLight }
//       ],
//     }
//   },
//   render: (props) => {
//     const [{ subtasks, title, currentColumn, description }, updateArgs] = useArgs<TaskDetailProps>();
//     return (
//       <div className='w-full'>
//         <TaskDetail
//           {...props}
//           subtasks={subtasks}
//           title={title}
//           description={description}
//           saveChanges={(title: string, description: string, subtasks: Subtask[], column: string): void => {
//             updateArgs({ title, description, subtasks, currentColumn: column })
//           }}
//           currentColumn={currentColumn}
//           createSubtask={(title?: string): void => {
//             const arr = subtasks ?? []
//             const newSubtask: Subtask = { title: `${title}`, completed: false, id: `${arr.length}` }
//             updateArgs({ subtasks: [...arr, newSubtask] })
//           }}
//           setNewTask={(newTask: boolean): void => { updateArgs({ newTask }) }}
//           onSubtaskToggle={(id: string): void => {
//             const newSubtasks = subtasks?.map((subtask: Subtask): Subtask => {
//               if (subtask.id === id) {
//                 return {
//                   ...subtask,
//                   completed: !subtask.completed
//                 }
//               }
//               return subtask
//             })
//             updateArgs({ subtasks: newSubtasks })
//           }}
//           setCurrentColumn={(column: string): void => {
//             updateArgs({ currentColumn: column })
//           }}
//           setEditing={(editing: boolean): void => { updateArgs({ editing }) }}
//         />
//       </div>
//     )
//   }
// };
//
// export const NewTaskDark: Story = {
//   args: {
//     saveChanges: (): void => { console.log("saveChanges") },
//     menuOptions: options,
//     newTask: true,
//     currentColumn: "To Do",
//     editing: true,
//     createSubtask: (): void => { console.log("createSubtask") },
//     setEditing: (): void => { console.log("setEditing") },
//     setNewTask: (): void => { console.log("setNewTask") },
//     columns,
//   },
//   parameters: {
//     backgrounds: {
//       default: 'dark',
//       values: [
//         { name: 'dark', value: colors.veryDarkGray }
//       ],
//     }
//   },
//   render: (props) => {
//     const [{ subtasks, title, currentColumn, description }, updateArgs] = useArgs<TaskDetailProps>();
//     return (
//       <div className='dark w-full'>
//         <TaskDetail
//           {...props}
//           subtasks={subtasks}
//           title={title}
//           description={description}
//           setNewTask={(newTask: boolean): void => { updateArgs({ newTask }) }}
//           createSubtask={(title?: string): void => {
//             const arr = subtasks ?? []
//             const newSubtask: Subtask = { title: `${title}`, completed: false, id: `${arr.length}` }
//             updateArgs({ subtasks: [...arr, newSubtask] })
//           }}
//           currentColumn={currentColumn}
//           onSubtaskToggle={(id: string): void => {
//             console.log("TOGGLE", id)
//             const newSubtasks = subtasks?.map((subtask: Subtask): Subtask => {
//               if (subtask.id === id) {
//                 return {
//                   ...subtask,
//                   completed: !subtask.completed
//                 }
//               }
//               return subtask
//             })
//             updateArgs({ subtasks: newSubtasks })
//           }}
//           setCurrentColumn={(column: string): void => {
//             updateArgs({ currentColumn: column })
//           }}
//           setEditing={(editing: boolean): void => { updateArgs({ editing }) }}
//           saveChanges={(title: string, description: string, subtasks: Subtask[], column: string): void => {
//             updateArgs({ title, description, subtasks, currentColumn: column })
//           }}
//         />
//       </div>
//     )
//   }
// };
