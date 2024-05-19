import { Subtask, Task } from "./TaskDetail";

export const ActionTypes = {
  SET_TITLE: 'SET_TITLE',
  SET_DESCRIPTION: 'SET_DESCRIPTION',
  ADD_SUBTASK: 'ADD_SUBTASK',
  REMOVE_SUBTASK: 'REMOVE_SUBTASK',
  UPDATE_SUBTASK: 'UPDATE_SUBTASK',
  SET_COLUMN: 'SET_COLUMN',
  SET_TASK: 'SET_TASK',
  TOGGLE_SUBTASK: 'TOGGLE_SUBTASK'
} as const

export type ActionTypes = typeof ActionTypes[keyof typeof ActionTypes];
export type PayloadTypes = {
  [ActionTypes.SET_TITLE]: string;
  [ActionTypes.SET_DESCRIPTION]: string;
  [ActionTypes.ADD_SUBTASK]: Subtask;
  [ActionTypes.REMOVE_SUBTASK]: string;
  [ActionTypes.UPDATE_SUBTASK]: Subtask;
  [ActionTypes.SET_COLUMN]: string;
  [ActionTypes.SET_TASK]: Task;
  [ActionTypes.TOGGLE_SUBTASK]: string;
}
export type Action = {
  type: ActionTypes;
  payload: PayloadTypes[ActionTypes];
}

export function reducer(state: Task, action: Action): Task {
  switch (action.type) {
    case ActionTypes.SET_TITLE:
      const task: Task = {
        ...state,
        title: `${action.payload}`
      }
      return task;
    case ActionTypes.SET_DESCRIPTION:
      return {
        ...state,
        description: `${action.payload}`
      }
    case ActionTypes.ADD_SUBTASK:
      return {
        ...state,
        subtasks: [...state.subtasks, action.payload as Subtask]
      }
    case ActionTypes.REMOVE_SUBTASK:
      return {
        ...state,
        subtasks: state.subtasks.filter((subtask: Subtask): boolean => subtask.id !== action.payload)
      }
    case ActionTypes.UPDATE_SUBTASK:
      return {
        ...state,
        subtasks: state.subtasks.map((subtask: Subtask): Subtask => {
          const _subtask: Subtask = action.payload as Subtask
          if (subtask.id === _subtask.id) {
            console.log('subtask.id', subtask.id)
            console.log('title', _subtask.title)
            return {
              ...subtask,
              title: _subtask.title
            }
          }
          return subtask;
        })
      }
    case ActionTypes.SET_COLUMN:
      return {
        ...state,
        currentColumn: action.payload as string
      }
    case ActionTypes.SET_TASK:
      return action.payload as Task
    case ActionTypes.TOGGLE_SUBTASK:
      return {
        ...state,
        subtasks: state.subtasks.map((subtask: Subtask): Subtask => {
          if (subtask.id === action.payload) {
            return {
              ...subtask,
              completed: !subtask.completed
            }
          }
          return subtask;
        })
      }
    default:
      return state;
  }
}


