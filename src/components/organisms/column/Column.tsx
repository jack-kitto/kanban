import React from "react";
import { Draggable, DraggableProvided, DraggableStateSnapshot } from "react-beautiful-dnd";
import TaskList from "../taskList/TaskList";
import { Column as ColumnType, Task } from "~/components/types";

export interface ColumnProps {
  index: number;
  id: string;
  tasks: Task[];
  columns: string[];
  column: ColumnType;
  updateTask: (task: Task) => void;
  onDeleteTask: (task: Task) => void;
}

export default function Column(props: ColumnProps): JSX.Element {
  const index = props.index;
  return (
    <TaskList
      tasks={props.tasks}
      columns={props.columns}
      column={props.column}
      updateTask={props.updateTask}
      onDeleteTask={props.onDeleteTask}
    />
  );
}
