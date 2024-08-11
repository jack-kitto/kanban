"use client"
import { useRouter } from "next/navigation";
import { Navbar, ProjectCardList } from "~/components/organisms";
import HomeLayout from "~/components/templates/homeLayout/HomeLayout";
import type { Project } from "~/components/types";
import { api } from "~/trpc/react";

export interface HomePageProps {
  projects: Project[]
}

export default function HomePage(props: HomePageProps) {
  const router = useRouter()
  function updateTask() { console.log('update task') }
  function deleteTask() { console.log('delete task') }

  const createProjectMutation = api.project.create.useMutation({
    onError: (e) => {
      console.error(e)
    },
    onSuccess: (d) => {
      console.log("Success", d)
    }
  })

  return (
    <HomeLayout
      navbar={<Navbar updateTask={updateTask} createProject={createProjectMutation.mutate} onDeleteTask={deleteTask} />}
    >
      <div className="w-full h-full p-4">
        <ProjectCardList onClick={(project: Project) => { router.push(`/${project.id}`) }} projects={props.projects} />
        <div className="">
        </div>
      </div>
    </HomeLayout>
  )
}
