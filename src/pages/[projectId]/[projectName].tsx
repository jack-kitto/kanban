import { useRouter } from 'next/router'
import { toast } from 'react-hot-toast'
import { z } from 'zod'
import { PageLayout } from '~/components/layout'
import { Loading } from '~/components/loading'
import { useStores } from '~/models'
import type { IColumn, IProject, ISubTask, ITask } from '~/models/ProjectsStore'
import { api } from '~/utils/api'
export default function Project() {
  const router = useRouter()
  const { projectId } = router.query
  const { projects } = useStores()
  const id = z.string().safeParse(projectId)
  if (!id.success) {
    toast('Invalid ID')
    return null
  }
  const { data, isLoading, error, isError } = api.projects.getProjectById.useQuery({ id: id.data })
  if (isError) {
    toast(`Error: ${error?.message}`)
    return null
  }

  if (!data && !isLoading) {
    toast(`No project found.`)
    return null
  }

  if (isLoading) return <Loading />
  if (!data) return null
  let columns: IColumn[] = []
  if (data.columns) {
    columns = data.columns.map((columnData) => {
      let tasks: ITask[] = []
      if (columnData.tasks) {
        tasks = columnData.tasks.map((taskData) => {
          let subTasks: ISubTask[] = []
          if (taskData.subtasks) {
            subTasks = taskData.subtasks.map((subtaskData) => {
              const subtask: ISubTask = {
                id: `${subtaskData.id}`,
                name: subtaskData.name,
                isCompleted: subtaskData.isCompleted
              }
              return subtask
            })
          }
          const task: ITask = {
            id: `${taskData.id}`,
            name: taskData.name,
            description: taskData.description ? taskData.description : '',
            subTasks: subTasks,
          }
          return task
        })
      }
      const column: IColumn = {
        id: `${columnData.id}`,
        name: columnData.name,
        color: columnData.color,
        tasks: tasks,
      }
      return column
    })
  }
  const project: IProject = {
    id: data.id,
    name: data.name,
    columns: columns,
  }
  projects.openProject(project)
  return (
    <PageLayout>
      <div>
        <div>projectId {projects.currentProject?.id}</div>
        <div>projectName {projects.currentProject?.name}</div>
      </div>
    </PageLayout>
  )
}
