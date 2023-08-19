import { observer } from "mobx-react-lite";
import type { IProjectModel } from "~/models/ProjectsStore";
import { AddTask } from "./components";
import { EmptyState } from "./components/emptyState";
import Form from "../form/Form";
import React from "react";
import { api } from "~/utils/api";
import { useStores } from "~/models";
import { toast } from "react-hot-toast";
import { useStyles } from "./styles";
import { colors } from "~/styles/colors";
import { typography } from "~/styles/typography";


export const Board = observer(({ project }: { project: IProjectModel }) => {
  const [name, setName] = React.useState(project.name)
  const [columns, setColumns] = React.useState<string[]>(project?.columns?.map((col) => col.name))
  const [editBoardFormOpen, setEditBoardFormOpen] = React.useState(false)
  const [newColumnName, setNewColumnName] = React.useState('')
  const [valid, setValid] = React.useState(false)
  const { projects } = useStores()
  const ctx = api.useContext()
  const $styles = useStyles()
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
    if (columns?.length === 0) return setValid(false)
    if (name?.length === 0) return setValid(false)
    setValid(true)
  }, [columns, name])

  const addNewColumn = () => {
    setEditBoardFormOpen(true)
  }

  const addNewTask = (columnId: string) => {
    toast(columnId)
  }

  const onSubmitEditBoard = () => {
    if (!project) return
    mutate({
      name: name,
      columns: columns,
      id: project?.id
    })
  }

  const getCols = () => {
    return project?.columns?.sort((a, b) => a.position - b.position)
  }

  return (
    <div style={$styles.container}>
      {project?.columns?.length < 1 && <EmptyState onAddNewColumn={addNewColumn} />}
      {project?.columns?.length > 0 && (
        <div style={$styles.columns}>
          {
            getCols().map((column, index) => (
              <div key={column.id} style={$styles.col(index++)} className="group">
                <div style={$styles.title}>
                  <div className="flex flex-row items-center justify-center h-full">
                    <div style={{ backgroundColor: colors.pallette['grey'].value }} className="w-4 h-4 rounded-full mr-2" />
                    <div>
                      <p style={{ ...typography.heading.S, color: colors.mediumGrey }}>{column.name}</p>
                    </div>
                  </div>
                </div>
                <button onClick={() => addNewTask(column.id)} className="w-full p-4 h-full group cursor-pointer flex flex-col justify-start items-center">
                  <div className="hidden group-hover:block w-full">
                    <AddTask />
                  </div>
                </button>
              </div>
            ))
          }
          <div style={$styles.addColumn}>
            <button onClick={addNewColumn} className="h-full items-center justify-center flex ml-4 cursor-pointer rounded-md shadow-lg border-2 border-linesLight w-12">
              <p style={{ ...typography.heading.XL, color: colors.mainPurple }}>+</p>
            </button>
          </div>
        </div>
      )}
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
  )
})
