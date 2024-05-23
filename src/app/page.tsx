import { redirect } from "next/navigation";
import React from "react";
import { ColourName } from "~/components/atoms/bubble/Bubble";
import { HomePage } from "~/components/pages";
import { Project } from "~/components/types";
import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";
export default async function Home() {
  const session = await getServerAuthSession()
  if (!session) {
    redirect('/login')
  }
  const projectsData = await db.project.findMany({
    where: {
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
  console.log(projectsData)

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
  });

  return (
    <HomePage projects={projects} />
  );
}

