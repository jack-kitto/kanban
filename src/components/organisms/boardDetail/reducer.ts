import type { ColumnType, Project } from "~/components/types";

export const ActionTypes = {
  SET_TITLE: 'SET_TITLE',
  ADD_COLUMN: 'ADD_COLUMN',
  REMOVE_COLUMN: 'REMOVE_COLUMN',
  UPDATE_COLUMN: 'UPDATE_COLUMN',
  SET_PROJECT: 'SET_PROJECT'
} as const

export type ActionTypes = typeof ActionTypes[keyof typeof ActionTypes];
export type PayloadTypes = {
  [ActionTypes.SET_TITLE]: string;
  [ActionTypes.ADD_COLUMN]: ColumnType;
  [ActionTypes.REMOVE_COLUMN]: string;
  [ActionTypes.UPDATE_COLUMN]: ColumnType;
  [ActionTypes.SET_PROJECT]: Project;
}
export type Action = {
  type: ActionTypes;
  payload: PayloadTypes[ActionTypes];
}

export function reducer(state: Project, action: Action): Project {
  switch (action.type) {
    case ActionTypes.SET_TITLE:
      const project: Project = {
        ...state,
        title: action.payload as string
      }
      return project;
    case ActionTypes.ADD_COLUMN:
      return {
        ...state,
        columns: [...state.columns, action.payload as ColumnType]
      }
    case ActionTypes.REMOVE_COLUMN:
      return {
        ...state,
        columns: state.columns.filter((column: ColumnType): boolean => column.id !== action.payload)
      }
    case ActionTypes.UPDATE_COLUMN:
      return {
        ...state,
        columns: state.columns.map((column: ColumnType): ColumnType => {
          const _column: ColumnType = action.payload as ColumnType
          if (column.id === _column.id) {
            console.log('column.id', column.id)
            console.log('title', _column.title)
            return {
              ...column,
              title: _column.title
            }
          }
          return column;
        })
      }
    case ActionTypes.SET_PROJECT:
      return action.payload as Project
    default:
      return state;
  }
}


