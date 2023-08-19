import { observer } from "mobx-react-lite";
import type { IProjectModel, ITaskModel } from "~/models/ProjectsStore";
import { AddColumn, AddTask, Task } from "./components";
import { EmptyState } from "./components/emptyState";
import { Form } from "../form/Form";
import React from "react";
import { api } from "~/utils/api";
import { useStores } from "~/models";
import { toast } from "react-hot-toast";
import { useStyles } from "./styles";
import { colors } from "~/styles/colors";
import { typography } from "~/styles/typography";
import { getSnapshot } from "mobx-state-tree";

export const Board = observer(({ project }: { project: IProjectModel }) => {
  let cols: string[] = [];
  if (project.columns) {
    cols = [...project?.columns?.map((col) => col.name)]
  }
  const [description, setDescription] = React.useState('');
  const [name, setName] = React.useState(project.name)
  const [newTaskName, setNewTaskName] = React.useState('')
  const [newTaskPosition, setNewTaskPosition] = React.useState(1)
  const [columns, setColumns] = React.useState<string[]>(cols)
  const [subTasks, setSubTasks] = React.useState<string[]>([])
  const [editBoardFormOpen, setEditBoardFormOpen] = React.useState(false)
  const [addTaskFormOpen, setAddTaskFormOpen] = React.useState('')
  const [newColumnName, setNewColumnName] = React.useState('')
  const [newSubTaskName, setNewSubTaskName] = React.useState('')
  const [valid, setValid] = React.useState(false)
  const [newTaskValid, setNewTaskValid] = React.useState(false)
  const { projects } = useStores()
  const ctx = api.useContext()
  const $styles = useStyles()
  const { mutate: createTask, isLoading: isTaskCreating } = api.projects.createTask.useMutation({
    onSuccess: (res): void => {
      if (!res) return
      console.log(res)
      projects.removeProjectById(res?.id)
      projects.addProject(res)
      ctx.projects.getAll.invalidate().catch((e: Error) => console.error(e.message))
      setAddTaskFormOpen('')
      setNewTaskName('')
      setNewTaskPosition(1)
      setDescription('')
      setSubTasks([])
    },
    onError: (e): void => {
      if (e.data?.zodError?.fieldErrors?.name) {
        e.data.zodError.fieldErrors.name.forEach((err: string) => toast.error(err))
      }
    },
  });
  const { mutate, isLoading: isProjectUpdating } = api.projects.update.useMutation({
    onSuccess: (res): void => {
      if (!res) return
      projects.removeProjectById(res?.id)
      projects.addProject(res)
      ctx.projects.getAll.invalidate().catch((e: Error) => console.error(e.message))
      setEditBoardFormOpen(false)
    },
    onError: (e): void => {
      if (e.data?.zodError?.fieldErrors?.name) {
        e.data.zodError.fieldErrors.name.forEach((err: string) => toast.error(err))
      }
    },
  });

  React.useEffect(() => {
    if (columns?.length === 0) return setValid(false)
    if (name?.length === 0) return setValid(false)
    setValid(true)
  }, [columns, name])

  React.useEffect(() => {
    if (!editBoardFormOpen) return
    if (!project) return
    if (newTaskName.length === 0) return
    if (description.length === 0) return
    setNewTaskValid(true)

  }, [newTaskPosition, newTaskName, description, subTasks, editBoardFormOpen, project])


  const addNewColumn = () => {
    setEditBoardFormOpen(true)
  }

  const addNewTask = () => {
    createTask({
      name: newTaskName,
      position: newTaskPosition,
      description,
      columnId: parseInt(addTaskFormOpen),
      subTasks: subTasks,
      projectId: projects.getCurrentProject()?.id
    })

  }

  const onSubmitEditBoard = () => {
    if (!project) return
    mutate({
      name: name,
      columns: columns,
      id: project?.id
    })
  }
  console.log(getSnapshot(projects.getCurrentProject()))

  return (
    <div style={$styles.container}>
      {project?.columns?.length < 1 && <EmptyState onAddNewColumn={addNewColumn} />}
      {project?.columns?.length > 0 && (
        <div style={$styles.columns}>
          {
            projects.getCurrentProject()?.columns?.slice().sort((a, b) => a.position - b.position).map((column) => (
              <div key={column.id} style={$styles.col(column.position)} className="group">
                <div style={$styles.title}>
                  <div className="flex flex-col items-center justify-center h-full">
                    <div className="flex flex-row items-center justify-center h-full">
                      <div style={{ backgroundColor: colors.pallette['grey'].value }} className="w-4 h-4 rounded-full mr-2" />
                      <div>
                        <p style={{ ...typography.heading.S, color: colors.mediumGrey }}>{column.name}</p>
                      </div>
                    </div>
                    <div className="group/addTask h-4 w-full">
                      <AddTask
                        onPress={() => {
                          setNewTaskPosition(0)
                          setAddTaskFormOpen(column.id)
                        }}
                      />
                    </div>
                  </div>
                </div>
                {
                  column.tasks?.slice().sort((a, b) => a.position - b.position).map((task: ITaskModel, index: number) =>
                    <Task
                      column={column}
                      setAddTaskFormOpen={(id) => {
                        setNewTaskPosition(index + 1)
                        setAddTaskFormOpen(id)
                      }}
                      key={task.id}
                      task={task}
                    />
                  )
                }
              </div>
            ))
          }
          <AddColumn onPress={addNewColumn} />
        </div>
      )}
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
