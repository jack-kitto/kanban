"use client"
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Navbar, ProjectCardList } from "~/components/organisms";
import HomeLayout from "~/components/templates/homeLayout/HomeLayout";
import type { Project } from "~/components/types";
import { api } from "~/trpc/react";

export interface HomePageProps {
  projects: Project[]
}

export default function HomePage(props: HomePageProps) {
  const router = useRouter()
  const createProjectMutation = api.project.create.useMutation({
    onError: (e) => {
      console.error(e)
      toast(`🤦 ${e.message}`)
    },
    onSuccess: () => {
      toast('🔥 Successfully saved new project')
    }
  })

  return (
    <HomeLayout
      navbar={<Navbar createProject={createProjectMutation.mutate} />}
    >
      <div className="w-full h-full p-4">
        <ProjectCardList onClick={(project: Project) => { router.push(`/${project.id}`) }} projects={props.projects} />
        <div className="">
        </div>
      </div>
    </HomeLayout>
  )
}
