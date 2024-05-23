"use client"
import { useEffect, useMemo, useState } from "react";
import { ColourName } from "~/components/atoms/bubble/Bubble";
import { updateTaskInListOfColumns } from "~/components/helpers";
import { Board, Navbar } from "~/components/organisms";
import Sidebar from "~/components/organisms/sidebar/Sidebar";
import { MainLayout } from "~/components/templates";
import { ColumnType, Project, TaskType } from "~/components/types";

export interface ProjectPageProps {
  projects: Project[]
  project: Project
}

export default function ProjectPage(props: ProjectPageProps): JSX.Element {
  const [currentProject, setCurrentProject] = useState<Project | null>(props.project)
  const [isClient, setIsClient] = useState(false)
  const [columns, setColumns] = useState<ColumnType[]>([])

  useEffect(() => {
    const data = currentProject?.columns.map((column) => ({
      // trim to  10 characters
      title: column.title.length > 10 ? column.title.slice(0, 10) + "..." : column.title,
      id: column.id,
      position: column.position,
      colour: column.colour as ColourName,
      tasks: column.tasks.map((task) => ({
        title: task.title,
        columnId: column.id,
        columnTitle: column.title,
        description: task.description,
        id: task.id,
        position: task.position,
        subtasks: task.subtasks.map((subtask) => ({
          title: subtask.title,
          completed: subtask.completed,
          id: subtask.id,
        }))
      }))
    })) ?? []
    console.log(data)
    setColumns(data)
  }, [currentProject])

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (<></>)
  }
  return (
    <MainLayout
      sidebarHidden={false}
      sidebar={
        <Sidebar
          projects={props.projects}
          onClickProject={() => { }}
          setCreateProjectOpen={() => { }}
          setSidebarHidden={() => { }}
          sidebarHidden={false}
        />
      }
      navbar={
        <Navbar
          updateTask={() => { }}
          onDeleteTask={() => { }}
        />
      }
    >
      <div className="w-full h-full p-6 bg-linesLight">
        <Board
          updateTask={(task: TaskType): void => updateTaskInListOfColumns(task, columns, (newColumns: ColumnType[]): void => setColumns(newColumns))}
          onDeleteTask={(task: TaskType): void => setColumns(columns.map((c: ColumnType): ColumnType => c.id === task.columnId ? { ...c, tasks: c.tasks.filter((t: TaskType): boolean => t.id !== task.id) } : c))}
          updateColumns={(columns: ColumnType[]): void => setColumns(columns)}
          columns={columns}
        />
      </div>
    </MainLayout>
  )
}
