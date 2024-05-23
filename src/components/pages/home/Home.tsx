"use client"
import { useRouter } from "next/navigation";
import { Navbar, ProjectCardList } from "~/components/organisms";
import HomeLayout from "~/components/templates/homeLayout/HomeLayout";
import type { Project } from "~/components/types";

export interface HomePageProps {
  projects: Project[]
}

export default function HomePage(props: HomePageProps) {
  const router = useRouter()
  function updateTask() { console.log('update task') }
  function deleteTask() { console.log('delete task') }
  return (
    <HomeLayout
      navbar={<Navbar updateTask={updateTask} onDeleteTask={deleteTask} />}
    >
      <div className="w-full h-full p-4">
        <ProjectCardList onClick={(project: Project) => { router.push(`/${project.id}`) }} projects={props.projects} />
      </div>
    </HomeLayout>
  )
}
