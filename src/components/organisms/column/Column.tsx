import React, { memo } from "react";
import { TaskList } from "../taskList/TaskList";
import type { ColumnType, TaskType } from "~/components/types";
import { Tag } from "~/components/molecules";

export interface ColumnProps {
  index: number;
  id: string;
  tasks: TaskType[];
  columns: ColumnType[];
  column: ColumnType;
  updateTask: (task: TaskType) => void;
  onDeleteTask: (task: TaskType) => void;
}

const ColumnComponent = (props: ColumnProps): JSX.Element => {
  //TODO: Make it so that changing the amount of tasks in a column doesn't affect the width of the column
  return (
    <div className="flex flex-col pr-5 max-w-[500px] justify-center items-center">
      <div className="w-full flex pb-6">
        <Tag colour={props.column.colour} label={`${`${props.column.title} (${props.tasks.length})`.toUpperCase()}`} />
      </div>
      <div className="h-[800px] min-w-[280px] overflow-auto no-scrollbar rounded-lg scroll-m-2">
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
export const Column = memo(ColumnComponent);
