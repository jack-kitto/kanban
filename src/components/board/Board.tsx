import { observer } from "mobx-react-lite";
import type { IColumnModel, IProjectModel } from "~/models/ProjectsStore";
import { AddColumn, Column } from "./components";
import { EmptyState } from "./components/emptyState";
import Form from "../form/Form";
import React from "react";
import { api } from "~/utils/api";
import { useStores } from "~/models";
import { toast } from "react-hot-toast";


export const Board = observer(({ project }: { project: IProjectModel }) => {
  const [name, setName] = React.useState(project.name)
  const [columns, setColumns] = React.useState<string[]>(project.columns.map((col) => col.name))
  const [editBoardFormOpen, setEditBoardFormOpen] = React.useState(false)
  const [newColumnName, setNewColumnName] = React.useState('')
  const [valid, setValid] = React.useState(false)
  const { projects } = useStores()
  const ctx = api.useContext()
  const { mutate, isLoading } = api.projects.update.useMutation({
    onSuccess: (res): void => {
      if (!res) return
      projects.removeProjectById(res?.id)
      projects.addProject(res)
      ctx.projects.getAll.invalidate().catch((e: Error) => console.error(e.message))
    },
    onError: (e): void => {
      if (e.data?.zodError?.fieldErrors?.name) {
        e.data.zodError.fieldErrors.name.forEach((err: string) => toast.error(err))
      }
    },
  });

  React.useEffect(() => {
    if (columns.length === 0) return setValid(false)
    if (name.length === 0) return setValid(false)
    setValid(true)
  }, [columns, name])

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

  return (
    <div className="flex items-start justify-center h-full w-full">
      <div className="flex h-full flex-nowrap w-full">
        {project.columns.length < 1 && <EmptyState onAddNewColumn={addNewColumn} />}
        {project.columns.length > 0 && project.columns.map((column: IColumnModel, index: number) => (
          <Column key={`${column.id} ${index}`} column={column} />
        ))}
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
          isLoading={isLoading}
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
    </div>
  )
})
