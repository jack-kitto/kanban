import React from "react";
import { DragDropContext, Draggable, type DraggableProvided, type DropResult, type DroppableProvided } from "react-beautiful-dnd";
import type { ColumnType as ColumnType, TaskType } from "~/components/types";
import { Column } from "../column/Column";
import { handleDragEnd, handleInsertItem, sortItems } from "~/components/helpers";
import { StrictModeDroppable } from "~/components/atoms/strictModeDroppable/StrictModeDroppable";

export interface BoardProps {
  columns: ColumnType[];
  updateTask: (task: TaskType) => void;
  updateColumnTasks: (columns: ColumnType[]) => void;
  onDeleteTask: (task: TaskType) => void;
}

export default function Board(props: BoardProps): JSX.Element {
  return (
    <DragDropContext
      onDragEnd={(result: DropResult): void => {
        try {
          if (result.type === 'COLUMN') {
            handleDragEnd<ColumnType>(result, props.columns, props.updateColumnTasks)
          } else {
            const sourceColumn = props.columns.find((c: ColumnType): boolean => c.id === result.source.droppableId)
            const destinationColumn = props.columns.find((c: ColumnType): boolean => c.id === result.destination?.droppableId)
            const draggedTask = sourceColumn?.tasks.find((task: TaskType): boolean => task.id === result.draggableId)
            if (!sourceColumn) throw new Error('sourceColumn is undefined')
            if (!destinationColumn) throw new Error('destinationColumn is undefined')
            if (!draggedTask) throw new Error('draggedTask is undefined')
            if (sourceColumn.id === destinationColumn.id) {
              handleDragEnd<TaskType>(result, sourceColumn.tasks, (tasks: TaskType[]): void => {
                sourceColumn.tasks = tasks
                props.updateColumnTasks(props.columns)
              })
              return
            }
            // Move task to another column 
            draggedTask.columnTitle = destinationColumn.title
            const destinationTasks = destinationColumn.tasks
            const destinationIndex = result.destination?.index
            if (destinationIndex === undefined) throw new Error('destinationIndex is undefined')
            const newDestinationTasks: TaskType[] = handleInsertItem<TaskType>(destinationTasks, draggedTask, destinationIndex)
            const newSourceTasks = sourceColumn.tasks.filter((task: TaskType): boolean => task.id !== draggedTask.id)
            props.updateColumnTasks(props.columns.map((column: ColumnType): ColumnType => {
              if (column.id === sourceColumn.id) {
                column.tasks = newSourceTasks
              }
              if (column.id === destinationColumn.id) {
                column.tasks = newDestinationTasks
              }
              return column
            }))
          }
        } catch (error) {
          console.error(error)
        }
      }}
    >
      <StrictModeDroppable
        droppableId={'columns'}
        type={'COLUMN'}
        isDropDisabled={false}
        isCombineEnabled={false}
        direction="horizontal"
      >
        {(dropProvided: DroppableProvided): JSX.Element => (
          <div
            className="flex w-full justify-normal items-center overflow-x-auto no-scrollbar"
            ref={dropProvided.innerRef}
            {...dropProvided.droppableProps}
          >
            {
              sortItems<ColumnType>(props.columns)
                .map((column: ColumnType, index: number): JSX.Element => (
                  <Draggable key={`${column.id}`} draggableId={`${column.id}`} index={index}>
                    {(dragProvided: DraggableProvided): JSX.Element => {
                      return (
                        <div
                          ref={dragProvided.innerRef}
                          {...dragProvided.draggableProps}
                          {...dragProvided.dragHandleProps}
                          style={{ ...dragProvided.draggableProps.style }}
                        >
                          <Column
                            key={column.id}
                            id={column.id}
                            index={index}
                            onDeleteTask={props.onDeleteTask}
                            updateTask={props.updateTask}
                            columns={props.columns}
                            tasks={column.tasks}
                            column={column}
                          />
                        </div>
                      )
                    }}
                  </Draggable>
                ))
            }
            {dropProvided.placeholder}
          </div>
        )}
      </StrictModeDroppable>

    </DragDropContext>
  );
}
