import { Icon } from '../icon'
import { Button } from '../button'
import { toast } from 'react-hot-toast'
import { MainModal } from '../mainModal'
import { typography } from '~/styles/typography'
import { useState } from 'react'
import { api } from '~/utils/api'
import { observer } from 'mobx-react-lite'
import { useStores } from '~/models'
import { useRouter } from 'next/router'
export const RightContent = observer(() => {
  const [open, setOpen] = useState(false)
  const { projects } = useStores()
  const router = useRouter()

  const { mutate, isLoading } = api.projects.deleteProjectById.useMutation({
    onSuccess: () => {
      deleteProject()
    },
    onError: (e) => {
      if (!e.data?.zodError?.fieldErrors?.content) return toast('Something went wrong')
      const errorMessage: string[] = e.data?.zodError?.fieldErrors.content;
      errorMessage.forEach((error) => {
        toast(error)
      })
    },
  });
  if (projects.currentProjectIndex == null) return null
  const project = projects.projects[projects.currentProjectIndex]
  if (!project) return null

  const deleteProject = () => {
    projects.setProp('currentProjectIndex', null)
    projects.setProp('projects', projects.projects.filter((p) => p.id !== project.id))
    setOpen(false)
    router.push('/').catch((e: Error) => toast(e.message))
  }

  const onDelete = () => {
    mutate({ id: project.id })
  }

  return (
    <div className='flex flex-row w-full items-center justify-end'>
      <div>
        <Button fitText type='primary' size='lg' text='+ Add New Task' onPress={() => toast("Adding new task")} />
      </div>
      <div className='m-4 hover:opacity-50 cursor-pointer'>
        <button onClick={() => setOpen(true)} className='cursor-pointer'>
          <Icon icon="options" size='xxxs' />
        </button>
        <MainModal size='2xl' open={open} setOpen={setOpen} onClose={() => setOpen(false)}
          header={
            <div className='mt-6'>
              <p style={typography.heading.L} className='text-red'>Delete this board?</p>
            </div>
          }
          body={
            <div>
              <p>Are you sure you want to delete the ‘Platform Launch’ board? This action will remove all columns and tasks and cannot be reversed.</p>
              <div className='flex flex-row flex-1 mt-8 mb-12'>
                <div className='flex flex-col flex-1'>
                  <Button loading={isLoading} type='destructive' size='lg' text='Delete Board' onPress={onDelete} />
                </div>
                <div className='flex flex-col flex-1'>
                  <Button disabled={isLoading} type='secondary' size='lg' text='Cancel' onPress={() => setOpen(false)} />
                </div>
              </div>
            </div>
          } />
      </div>
    </div>
  )
});
