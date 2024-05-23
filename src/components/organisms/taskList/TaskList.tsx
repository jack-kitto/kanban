import type { ColumnType, TaskType as TaskType } from "~/components/types";
import { Task } from "~/components/organisms/task/Task";
import { type DroppableProvided } from 'react-beautiful-dnd';
import { memo } from "react";
import { sortItems } from "~/components/helpers";
import { StrictModeDroppable } from "~/components/atoms/strictModeDroppable/StrictModeDroppable";

export interface TaskListProps {
  tasks: TaskType[]
  columns: ColumnType[]
  updateTask: (task: TaskType) => void
  onDeleteTask: (task: TaskType) => void
  column: ColumnType
}

const TaskListComponent = (props: TaskListProps): JSX.Element => {
  return (
    <StrictModeDroppable
      droppableId={props.column.id}
      type={'TASK'}
      isDropDisabled={false}
      isCombineEnabled={false}
      direction="vertical"
    >
      {(dropProvided: DroppableProvided): JSX.Element => (
        <div
          className="flex flex-col"
          ref={dropProvided.innerRef}
          {...dropProvided.droppableProps}
        >
          {
            sortItems<TaskType>(props.tasks)
              .map((task: TaskType, index: number): JSX.Element => (
                <Task
                  key={task.id}
                  id={task.id}
                  index={index}
                  onDeleteTask={props.onDeleteTask}
                  updateTask={props.updateTask}
                  columns={props.columns}
                  task={task}
                />
              ))
          }
          {dropProvided.placeholder}
        </div>
      )}
    </StrictModeDroppable>

  );
}
export const TaskList = memo(TaskListComponent)
