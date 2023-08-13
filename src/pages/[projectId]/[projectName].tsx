import { useRouter } from 'next/router'
import { toast } from 'react-hot-toast'
import { z } from 'zod'
import { PageLayout } from '~/components/layout'
import { useStores } from '~/models'
import React from 'react'
import type { IProjectModel } from '~/models/ProjectsStore'
import { Board } from '~/components'

export default function Project() {
  const router = useRouter()
  const { projectId } = router.query
  const { projects } = useStores()
  const id = z.string().safeParse(projectId)
  const [project, setProject] = React.useState<IProjectModel>(projects.getCurrentProject())

  React.useEffect(() => {
    setProject(projects.getCurrentProject())
  }, [projects.currentProjectIndex, projects])


  if (!id.success) {
    toast('Invalid ID')
    return <PageLayout />
  }
  if (!project) return <PageLayout />
  return (
    <PageLayout>
      <Board project={project} />
    </PageLayout>
  )
}
