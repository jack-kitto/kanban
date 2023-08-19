import { useRouter } from 'next/router'
import { z } from 'zod'
import { PageLayout } from '~/components/layout'
import { useStores } from '~/models'
import React from 'react'
import type { IProjectModel } from '~/models/ProjectsStore'
import { Board } from '~/components'
import { api } from '~/utils/api'

export default function Project() {
  const router = useRouter()
  const { projectId } = router.query
  const { projects } = useStores()
  const id = z.string().safeParse(projectId)
  const [project, setProject] = React.useState<IProjectModel>(projects.getCurrentProject())
  const { data, isLoading: isLoading } = api.projects.getProjectById.useQuery({ id: id.success ? id.data : '', })

  React.useEffect(() => {
    if (!projects.currentProjectIndex && data) {
      projects.addProject(data)
      projects.openProjectById(data.id)
      setProject(projects.getCurrentProject())
    } else {
      setProject(projects.getCurrentProject())
    }
  }, [projects.currentProjectIndex, projects, data, isLoading])


  if (!id.success) {
    return <PageLayout />
  }
  if (!project) return <PageLayout />
  return (
    <PageLayout>
      <Board project={project} />
    </PageLayout>
  )
}
