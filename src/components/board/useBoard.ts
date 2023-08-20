import type { IProjectModel } from "~/models/ProjectsStore";
import React from "react";
import { api } from "~/utils/api";
import { useStores } from "~/models";
import { toast } from "react-hot-toast";
import { useStyles } from "./styles";
import type { DropResult } from "react-beautiful-dnd";
import { getSnapshot } from "mobx-state-tree";

export const useBoard = (project: IProjectModel) => {
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
      position: newTaskPosition + 1,
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

  const onDragEnd = (result: DropResult) => {
    if (!projects.getCurrentProject()) return
    if (!result.destination?.droppableId) return
    const to_column = projects.getCurrentProject().getColumnById(result.destination?.droppableId)
    const from_column = projects.getCurrentProject().getColumnById(result.source?.droppableId)
    if (!to_column) return
    if (!from_column) return
    const draggedTask = from_column.tasks.find((task) => task.id == result.draggableId)
    if (!draggedTask) return
    to_column.tasks.slice().sort((a, b) => a.position - b.position).forEach((task) => console.log(getSnapshot(task)))
    from_column.removeTaskById(draggedTask.id)
    const to_position = result.destination.index == 0 ? 1 : result.destination.index + 1
    to_column.addTaskToPosition(draggedTask, to_position)
    to_column.tasks.slice().sort((a, b) => a.position - b.position).forEach((task) => console.log(getSnapshot(task)))

  }
  return {
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
    setAddTaskFormOpen,
    newColumnName,
    newSubTaskName,
    setNewSubTaskName,
    valid,
    newTaskValid,
    $styles,
    isTaskCreating,
    isProjectUpdating,
    setNewColumnName,
  }
}
