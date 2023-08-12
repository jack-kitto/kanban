import { useRouter } from 'next/router'
import { toast } from 'react-hot-toast'
import { z } from 'zod'
import { PageLayout } from '~/components/layout'
import { useStores } from '~/models'
import React from 'react'

export default function Project() {
  const router = useRouter()
  const { projectId } = router.query
  const { projects } = useStores()
  const id = z.string().safeParse(projectId)
  if (!id.success) {
    toast('Invalid ID')
    return <PageLayout />
  }
  projects.openProjectById(id.data)
  const project = projects.projects.find((p) => p.id === id.data)
  if (!project) return <PageLayout />
  return (
    <PageLayout>
      <div>
        <div>projectId {project.id}</div>
        <div>projectName {project.name}</div>
        <div>-------------------</div>
        {project.columns.map((column) => (
          <>
            <div>-------------------</div>
            <h1>{column.name}</h1>
          </>
        ))}
      </div>
    </PageLayout>
  )
}
