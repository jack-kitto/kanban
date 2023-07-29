import { useRouter } from 'next/router'
import { toast } from 'react-hot-toast'
import { z } from 'zod'
import { Loading } from '~/components/loading'
import { api } from '~/utils/api'
export default function Project() {
  const router = useRouter()
  const { projectId } = router.query
  const id = z.number().safeParse(parseInt(`${projectId}`))
  if (!id.success) {
    toast('Invalid ID')
    return null
  }
  const { data, isLoading } = api.projects.getProjectById.useQuery({ id: id.data })
  console.log(data)
  if (!data) {
    toast('No project found')
    return null
  }
  if (isLoading) return <Loading />
  console.log(data)
  return (
    <div>
      <div>projectId {projectId}</div>
    </div>
  )
}
