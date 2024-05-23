import { redirect } from "next/navigation";
import React from "react";
import type { ColourName } from "~/components/atoms/bubble/Bubble";
import ProjectPage from "~/components/pages/project/Project";
import type { Project } from "~/components/types";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";
export default async function Page({ params }: { params: { projectId: string } }) {
  const session = await getServerAuthSession()
  if (!session) {
    redirect('/login')
  }
  if (!params.projectId) {
    redirect('/')
  }

  const projectsData = await db.project.findMany({
    where: {
      // TODO: Enable this when we can create projects or see projects that we are attached to users
      // users: {
      //   some: {
      //     id: session.user.id
      //   }
      // }
    },
    include: {
      columns: {
        include: {
          tasks: {
            include: {
              subtasks: true
            }
          }
        }
      }
    }
  })

  const projects: Project[] = projectsData.map((project) => {
    return {
      id: project.id,
      title: project.title,
      description: project.description,
      columns: project.columns.map((column) => {
        return {
          id: column.id,
          title: column.title,
          colour: column.colour as ColourName,
          position: column.position,
          tasks: column.tasks.map((task) => {
            return {
              id: task.id,
              title: task.title,
              description: task.description,
              position: task.position,
              columnId: task.columnId,
              columnTitle: task.columnTitle,
              subtasks: task.subtasks.map((subtask) => {
                return {
                  id: subtask.id,
                  title: subtask.title,
                  taskId: subtask.taskId,
                  completed: subtask.completed
                }
              })
            }
          })
        }
      })
    }
  });

  const project = projects.find((project: Project): boolean => project.id === params.projectId)

  if (!project) {
    redirect('/')
  }

  return (
    <div>
      <ProjectPage
        project={project}
        projects={projects}
      />
    </div>
  );
}

