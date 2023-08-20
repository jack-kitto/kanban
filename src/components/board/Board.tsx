import { DragDropContext, Droppable, Draggable, type DraggableProvided, type DraggableStateSnapshot } from "react-beautiful-dnd";
import { observer } from "mobx-react-lite";
import type { IColumnModel, IProjectModel, ITaskModel } from "~/models/ProjectsStore";
import { AddColumn, AddTask, Task } from "./components";
import { Form } from "../form/Form";
import React from "react";
import { useStores } from "~/models";
import { colors } from "~/styles/colors";
import { typography } from "~/styles/typography";
import { useBoard } from "./useBoard";
import { useStyles } from "./styles";
import { AddTaskButton } from "./components/addTaskButton";

export const Board = observer(({ project }: { project: IProjectModel }) => {
  const { projects } = useStores()
  const $styles = useStyles()
  const {
    onDragEnd,
    onSubmitEditBoard,
    addNewColumn,
    name,
    setName,
    columns,
    setColumns,
    editBoardFormOpen,
    setEditBoardFormOpen,
    setNewColumnName,
    newColumnName,
    valid,
    isProjectUpdating,
  } = useBoard(project)

  return (
    <div className="h-full w-full flex">
      <DragDropContext onDragEnd={onDragEnd}>
        {projects.getCurrentProject().columns && projects.getCurrentProject().columns.map((column: IColumnModel, ind: number) => (
          <div key={column.id} className="flex flex-col h-full">
            <div style={$styles.title}>
              <div className="flex flex-col items-center justify-center h-full">
                <div className="flex flex-row items-center justify-center h-full">
                  <div style={{ backgroundColor: colors.pallette['grey'].value }} className="w-4 h-4 rounded-full mr-2" />
                  <div>
                    <p style={{ ...typography.heading.S, color: colors.mediumGrey }}>{column.name.toUpperCase()}</p>
                  </div>
                </div>
                <div className="group/addTask h-4 w-full my-2 px-4 outline-none">
                  <AddTaskButton
                    position={1}
                    columnId={column.id}
                    Children={({ onPress }) => <AddTask onPress={onPress} />}
                  />
                </div>
              </div>
            </div>
            <Droppable key={ind} droppableId={`${column.id}`}>
              {(provided) => (
                <div
                  style={$styles.col}
                  className="flex=1 flex-col px-4"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {column.tasks.slice().sort((a, b) => a.position - b.position).map((task: ITaskModel, index: number) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id}
                      index={index}
                    >
                      {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) =>
                        <Task
                          index={index}
                          provided={provided}
                          snapshot={snapshot}
                          task={task}
                          column={column}
                        />
                      }
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </DragDropContext>
      <AddColumn onPress={addNewColumn} />
      <Form
        title={name}
        setTitle={setName}
        type='Board'
        action='Edit'
        open={editBoardFormOpen}
        setOpen={setEditBoardFormOpen}
        onClose={() => setEditBoardFormOpen(false)}
        items={columns}
        isLoading={isProjectUpdating}
        newItemName={newColumnName}
        setNewItemName={setNewColumnName}
        onSubmit={() => onSubmitEditBoard()}
        addItem={() => {
          setColumns([...columns, newColumnName])
          setNewColumnName('')
        }}
        valid={valid}
        removeItemByIndex={(index: number) => {
          setColumns(prev => prev.filter((_, i) => i !== index))
        }}
      />
    </div>
  )
})
