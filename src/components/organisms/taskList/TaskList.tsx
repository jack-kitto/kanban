import type { Column, Task as TaskType } from "~/components/types";
import Task from "~/components/organisms/task/Task";
import { Droppable } from 'react-beautiful-dnd';

export interface TaskListProps {
  tasks: TaskType[]
  columns: string[]
  updateTask: (task: TaskType) => void
  onDeleteTask: (task: TaskType) => void
  column: Column
}

export default function TaskList(props: TaskListProps): JSX.Element {
  return (
    <Droppable
      droppableId={'tasks'}
      type={'TASK'}
      isDropDisabled={false}
      isCombineEnabled={false}
    >
      {(dropProvided, dropSnapshot) => (
        <div
          className="flex flex-col"
          ref={dropProvided.innerRef}
          {...dropProvided.droppableProps}
        >
          {
            props.tasks.map((task: TaskType, index: number): JSX.Element => (
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
    </Droppable>

  );
}
