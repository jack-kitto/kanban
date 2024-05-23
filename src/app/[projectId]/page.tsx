import { redirect } from "next/navigation";
import React from "react";
import { ColourName } from "~/components/atoms/bubble/Bubble";
import ProjectPage from "~/components/pages/project/Project";
import { Project } from "~/components/types";
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
  const project = await db.project.findFirst({
    where: {
      id: `${params.projectId}`,
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
  if (!project) {
    redirect('/')
  }
  const project_: Project = {
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
            position: column.position,
            columnId: task.columnId,
            columnTitle: column.title,
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

  return (
    <div>
      <ProjectPage
        project={project_}
        projects={[]}
      />
    </div>
  );
}

