import React from "react";
import TaskList from "../taskList/TaskList";
import { Column as ColumnType, Task } from "~/components/types";
import { Tag } from "~/components/molecules";

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
  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex py-6">
        <Tag colour={props.column.colour} label={`${props.column.title} (${props.tasks.length})`.toUpperCase()} />
      </div>
      <div className="h-[800px] overflow-auto no-scrollbar rounded-lg scroll-m-2">
        <TaskList
          tasks={props.tasks}
          columns={props.columns}
          column={props.column}
          updateTask={props.updateTask}
          onDeleteTask={props.onDeleteTask}
        />
      </div>
    </div>
  );
}
