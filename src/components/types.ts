import { ColourName } from "./atoms/bubble/Bubble";

export type Subtask = {
  completed: boolean;
  title: string;
  id: string;
}

export type Task = {
  title: string;
  description: string;
  subtasks: Subtask[];
  id: string;
  currentColumn: string;
}

export type Column = {
  title: string;
  id: string;
  colour: ColourName;
}

export type Project = {
  title: string;
  description: string;
  columns: Column[];
  id: string;
}

