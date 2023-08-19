import { observer } from "mobx-react-lite";
import type { IProjectModel } from "~/models/ProjectsStore";
import { AddTask, Task } from "./components";
import { EmptyState } from "./components/emptyState";
import { Form } from "../form/Form";
import React from "react";
import { api } from "~/utils/api";
import { useStores } from "~/models";
import { toast } from "react-hot-toast";
import { useStyles } from "./styles";
import { colors } from "~/styles/colors";
import { typography } from "~/styles/typography";

export const Board = observer(({ project }: { project: IProjectModel }) => {
  const [description, setDescription] = React.useState('');
  const [name, setName] = React.useState(project.name)
  const [newTaskName, setNewTaskName] = React.useState('')
  const [columns, setColumns] = React.useState<string[]>([...project?.columns?.map((col) => col.name)])
  const [subTasks, setSubTasks] = React.useState<string[]>([])
  const [editBoardFormOpen, setEditBoardFormOpen] = React.useState(false)
  const [addTaskFormOpen, setAddTaskFormOpen] = React.useState('')
  const [newColumnName, setNewColumnName] = React.useState('')
  const [newSubTaskName, setNewSubTaskName] = React.useState('')
  const [valid, setValid] = React.useState(false)
  const { projects, theme } = useStores()
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

  const addNewColumn = () => {
    setEditBoardFormOpen(true)
  }

  const getTaskPosition = (): number => {
    if (!projects) return 0
    if (!addTaskFormOpen) return 0
    if (!projects.getCurrentProject()) return 0
    if (!projects.getCurrentProject().getColumnById(addTaskFormOpen)) return 0
    return projects.getCurrentProject().getColumnById(addTaskFormOpen)?.tasks.length || 0
  }

  const addNewTask = () => {
    createTask({
      name: newTaskName,
      position: getTaskPosition(),
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

  return (
    <div style={$styles.container}>
      {project?.columns?.length < 1 && <EmptyState onAddNewColumn={addNewColumn} />}
      {project?.columns?.length > 0 && (
        <div style={$styles.columns}>
          {
            projects.getCurrentProject()?.columns?.map((column) => (
              <div key={column.id} style={$styles.col(column.position)} className="group">
                <div style={$styles.title}>
                  <div className="flex flex-row items-center justify-center h-full">
                    <div style={{ backgroundColor: colors.pallette['grey'].value }} className="w-4 h-4 rounded-full mr-2" />
                    <div>
                      <p style={{ ...typography.heading.S, color: colors.mediumGrey }}>{column.name}</p>
                    </div>
                  </div>
                </div>
                {
                  column.tasks?.map((task) => <Task key={task.id} task={task} />)
                }
                <button onClick={() => setAddTaskFormOpen(column.id)} className="w-full p-4 h-full group cursor-pointer flex flex-col justify-start items-center">
                  <div className="hidden group-hover:block w-full">
                    <AddTask />
                  </div>
                </button>
              </div>
            ))
          }
          <div style={$styles.addColumn}>
            <button onClick={addNewColumn} className={`h-full items-center justify-center flex ml-4 cursor-pointer rounded-md shadow-lg border-2 border-${!theme.darkMode ? "linesLight" : "linesDark"} w-12`}>
              <p style={{ ...typography.heading.XL, color: colors.mainPurple }}>+</p>
            </button>
          </div>
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
        valid={valid}
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
