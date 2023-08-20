import type { IColumnModel, IProjectModel, ITaskModel } from "~/models/ProjectsStore";
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
  const [name, setName] = React.useState(project.name)
  const [columns, setColumns] = React.useState<string[]>(cols)
  const [subTasks, setSubTasks] = React.useState<string[]>([])
  const [editBoardFormOpen, setEditBoardFormOpen] = React.useState(false)
  const [newColumnName, setNewColumnName] = React.useState('')
  const [valid, setValid] = React.useState(false)
  const { projects } = useStores()
  const ctx = api.useContext()
  const $styles = useStyles()
  const { mutate: updateTaskPositions } = api.projects.updateTaskPositions.useMutation({
    onSuccess: () => {
      toast.success('Task positions updated')
    },
    onError: (e): void => {
      if (e.data?.zodError?.fieldErrors?.name) {
        e.data.zodError.fieldErrors.name.forEach((err: string) => toast.error(err))
      }
    }
  })

  window.onbeforeunload = () => {
    const tasks: { taskId: number, position: number, columnId: number }[] = []
    projects.getCurrentProject().columns.forEach((column: IColumnModel) => {
      column.tasks.forEach((task: ITaskModel) => {
        tasks.push({
          taskId: parseInt(task.id),
          position: task.position,
          columnId: parseInt(column.id)
        })
      })
    })
    toast('Saving task positions...')
    updateTaskPositions({ tasks })
  }
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
    return () => {
      const tasks: { taskId: number, position: number, columnId: number }[] = []
      projects.getCurrentProject().columns.forEach((column: IColumnModel) => {
        column.tasks.forEach((task: ITaskModel) => {
          tasks.push({
            taskId: parseInt(task.id),
            position: task.position,
            columnId: parseInt(column.id)
          })
        })
      })
      toast('Saving task positions...')
      updateTaskPositions({ tasks })

    }
  }, [projects, updateTaskPositions])

  React.useEffect(() => {
    toast('Board updated!')
  }, [projects, projects.currentProjectIndex])


  const addNewColumn = () => {
    setEditBoardFormOpen(true)
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
    name,
    setName,
    columns,
    setColumns,
    subTasks,
    setSubTasks,
    editBoardFormOpen,
    setEditBoardFormOpen,
    newColumnName,
    valid,
    $styles,
    isProjectUpdating,
    setNewColumnName,
  }
}
