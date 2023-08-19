import { DragDropContext, Droppable, Draggable, DraggableProvided, DraggableStateSnapshot } from "react-beautiful-dnd";
import { observer } from "mobx-react-lite";
import type { IColumnModel, IProjectModel, ITaskModel } from "~/models/ProjectsStore";
import { AddColumn, AddTask, Task } from "./components";
import { EmptyState } from "./components/emptyState";
import { Form } from "../form/Form";
import React from "react";
import { useStores } from "~/models";
import { colors } from "~/styles/colors";
import { typography } from "~/styles/typography";
import { useBoard } from "./useBoard";
import { Button } from "../button";
import { useStyles } from "./styles";

export const Board = observer(({ project }: { project: IProjectModel }) => {
  const { projects } = useStores()
  const $styles = useStyles()
  const {
    onDragEnd,
    onSubmitEditBoard,
    addNewColumn,
    addNewTask,
    description,
    setDescription,
    name,
    setName,
    newTaskName,
    setNewTaskName,
    setNewTaskPosition,
    columns,
    setColumns,
    subTasks,
    setSubTasks,
    editBoardFormOpen,
    setEditBoardFormOpen,
    addTaskFormOpen,
    setNewColumnName,
    setAddTaskFormOpen,
    newColumnName,
    newSubTaskName,
    setNewSubTaskName,
    valid,
    newTaskValid,
    isTaskCreating,
    isProjectUpdating,
  } = useBoard(project)

  const grid = 8;

  return (
    <div className="h-full w-full flex">
      <DragDropContext onDragEnd={onDragEnd}>
        {projects.getCurrentProject().columns.map((column: IColumnModel, ind: number) => (
          <div className="flex flex-col h-full">
            <div style={$styles.title}>
              <div className="flex flex-col items-center justify-center h-full">
                <div className="flex flex-row items-center justify-center h-full">
                  <div style={{ backgroundColor: colors.pallette['grey'].value }} className="w-4 h-4 rounded-full mr-2" />
                  <div>
                    <p style={{ ...typography.heading.S, color: colors.mediumGrey }}>{column.name.toUpperCase()}</p>
                  </div>
                </div>
                <div className="group/addTask h-4 w-full my-2 px-4">
                  <AddTask
                    onPress={() => {
                      setNewTaskPosition(0)
                      setAddTaskFormOpen(column.id)
                    }}
                  />
                </div>
              </div>
            </div>
            <Droppable key={ind} droppableId={`${ind}`}>
              {(provided, snapshot) => (
                <div
                  style={$styles.col}
                  className="flex=1 flex-col px-4"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {column.tasks.map((task: ITaskModel, index: number) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id}
                      index={index}
                    >
                      {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) =>
                        <Task
                          provided={provided}
                          snapshot={snapshot}
                          task={task}
                          setAddTaskFormOpen={setAddTaskFormOpen}
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
        columnId={addTaskFormOpen}
        setColumnId={setAddTaskFormOpen}
        title={newTaskName}
        setTitle={setNewTaskName}
        type='Task'
        action='Add'
        open={addTaskFormOpen !== ''}
        setOpen={() => setAddTaskFormOpen('')}
        description={description}
        setDescription={setDescription}
        onClose={() => setAddTaskFormOpen('')}
        items={subTasks}
        isLoading={isTaskCreating}
        newItemName={newSubTaskName}
        setNewItemName={setNewSubTaskName}
        onSubmit={addNewTask}
        addItem={() => {
          setSubTasks(prev => [...prev, newSubTaskName])
          setNewSubTaskName('')
        }}
        valid={!newTaskValid}
        removeItemByIndex={(index: number) => {
          setSubTasks(prev => prev.filter((_, i) => i !== index))
        }}
      />
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

  // return (
  //   <div style={$styles.container}>
  //     {project?.columns?.length < 1 && <EmptyState onAddNewColumn={addNewColumn} />}
  //     {project?.columns?.length > 0 && (
  //       <div style={$styles.columns}>
  //         {
  //           projects.getCurrentProject()?.columns?.slice().sort((a, b) => a.position - b.position).map((column) => (
  //             <div key={column.id} style={$styles.col(column.position)} className="group">
  //               <div style={$styles.title}>
  //                 <div className="flex flex-col items-center justify-center h-full">
  //                   <div className="flex flex-row items-center justify-center h-full">
  //                     <div style={{ backgroundColor: colors.pallette['grey'].value }} className="w-4 h-4 rounded-full mr-2" />
  //                     <div>
  //                       <p style={{ ...typography.heading.S, color: colors.mediumGrey }}>{column.name}</p>
  //                     </div>
  //                   </div>
  //                   <div className="group/addTask h-4 w-full">
  //                     <AddTask
  //                       onPress={() => {
  //                         setNewTaskPosition(0)
  //                         setAddTaskFormOpen(column.id)
  //                       }}
  //                     />
  //                   </div>
  //                 </div>
  //               </div>
  //               {
  //                 column.tasks?.slice().sort((a, b) => a.position - b.position).map((task: ITaskModel, index: number) =>
  //                   <Task
  //                     column={column}
  //                     setAddTaskFormOpen={(id) => {
  //                       setNewTaskPosition(index + 1)
  //                       setAddTaskFormOpen(id)
  //                     }}
  //                     key={task.id}
  //                     task={task}
  //                   />
  //                 )
  //               }
  //             </div>
  //           ))
  //         }
  //       </div>
  //     )}
  // )
// })
