import type { ColourName } from "./atoms/bubble/Bubble";

export type Subtask = {
  completed: boolean;
  title: string;
  id: string;
}

export type TaskType = {
  title: string;
  description: string;
  subtasks: Subtask[];
  id: string;
  columnTitle: string
  columnId: string;
  position: string;
}

export type ColumnType = {
  title: string;
  id: string;
  colour: ColourName;
  position: string;
  tasks: TaskType[];
}

export type Project = {
  title: string;
  description: string;
  columns: ColumnType[];
  id: string;
}

export type DndItem = {
  position: string;
  id: string;
}
