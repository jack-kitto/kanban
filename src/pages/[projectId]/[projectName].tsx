import { useRouter } from 'next/router'
import { toast } from 'react-hot-toast'
import { z } from 'zod'
import { PageLayout } from '~/components/layout'
import { useStores } from '~/models'
import React from 'react'
import EmptyState from './components/EmptyState'
import Form from '~/components/form/Form'
import { IProjectModel } from '~/models/ProjectsStore'
import { api } from '~/utils/api'

export default function Project() {
  const router = useRouter()
  const { projectId } = router.query
  const { projects } = useStores()
  const id = z.string().safeParse(projectId)
  const [name, setName] = React.useState('')
  const [columns, setColumns] = React.useState<string[]>([])
  const [editBoardFormOpen, setEditBoardFormOpen] = React.useState(false)
  const [newColumnName, setNewColumnName] = React.useState('')
  const [valid, setValid] = React.useState(false)
  const [project, setProject] = React.useState<IProjectModel>()
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
    console.log('useEffect')
    if (!id.success) return () => { projects.setProp('currentProjectIndex', null) }
    const project_ = projects.projects.find(project => project.id === id.data)
    if (!project_) return () => { projects.setProp('currentProjectIndex', null) }
    setProject(project_)
    projects.openProjectById(project_.id)
    setName(project_.name)
    setColumns(project_.columns.map(column => column.name))
    return () => { projects.setProp('currentProjectIndex', null) }
  }, [router, router.isReady, router.query])

  React.useEffect(() => {
    if (columns.length === 0) return setValid(false)
    if (name.length === 0) return setValid(false)
    setValid(true)
  }, [columns, name])

  const onSubmitEditBoard = () => {
    if (!project) return
    mutate({
      name: name,
      columns: columns,
      id: project?.id
    })
  }
  if (!id.success) {
    toast('Invalid ID')
    return <PageLayout />
  }
  if (!project) return <PageLayout />
  return (
    <PageLayout>
      <div className='w-full h-full flex'>
        {
          project.columns.length > 0
            ? project.columns.map((column) => (
              <>
                <div>-------------------</div>
                <h1>{column.name}</h1>
              </>
            ))
            : (
              <div className='w-full h-full flex justify-center items-center'>
                <EmptyState onAddNewColumn={() => setEditBoardFormOpen(true)} />
              </div>
            )
        }
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
    </PageLayout>
  )
}
