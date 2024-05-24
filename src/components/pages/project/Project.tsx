"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Modal } from "~/components/atoms";
import { updateTaskInListOfColumns } from "~/components/helpers";
import { Board, Navbar, TaskDetail } from "~/components/organisms";
import Sidebar from "~/components/organisms/sidebar/Sidebar";
import { MainLayout } from "~/components/templates";
import type { ColumnType, Project, TaskType } from "~/components/types";

export interface ProjectPageProps {
  projects: Project[]
  project: Project
}

export default function ProjectPage(props: ProjectPageProps): JSX.Element {
  const [currentProject, setCurrentProject] = useState<Project | null>(props.project)
  const [isClient, setIsClient] = useState(false)
  const [, setCreateProjectOpen] = useState<boolean>(false)
  const [columns, setColumns] = useState<ColumnType[]>([])
  const [sidebarHidden, setSidebarHidden] = useState<boolean>(false)
  const [showTaskDetail, setShowTaskDetail] = useState<boolean>(false)
  const [editing, setEditing] = useState<boolean>(true)
  const [newTask, setNewTask] = useState<boolean>(true)
  const router = useRouter()

  useEffect(() => {
    const data = currentProject?.columns.map((column) => ({
      // trim to  10 characters
      title: column.title.length > 20 ? column.title.slice(0, 20) + "..." : column.title,
      id: column.id,
      position: column.position,
      colour: column.colour,
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

  if (!currentProject) {
    return (<></>)
  }
  return (
    <>
      <Modal
        open={showTaskDetail}
        close={(): void => {
          setShowTaskDetail(false)
          setEditing(true)
          setNewTask(true)
        }}
      >
        <TaskDetail
          columns={columns}
          newTask={newTask}
          editing={editing}
          setEditing={setEditing}
          menuOptions={[]}
          saveChanges={(task: TaskType): void => {
            updateTaskInListOfColumns(task, columns, (newColumns: ColumnType[]): void => setColumns(newColumns))
            setShowTaskDetail(false)
            setNewTask(false)

            //
            // TODO: make sure to caculate the new position based on the column chosen and the last task in that column
            //

          }}
        />
      </Modal>
      <MainLayout
        sidebarHidden={sidebarHidden}
        sidebar={
          <Sidebar
            currentProject={currentProject}
            projects={props.projects}
            onClickProject={(project: Project): void => setCurrentProject(project)}
            setCreateProjectOpen={setCreateProjectOpen}
            setSidebarHidden={setSidebarHidden}
            sidebarHidden={sidebarHidden}
            onLogoClick={() => router.push('/')}
          />
        }
        navbar={
          <Navbar
            onAddTask={(): void => setShowTaskDetail(true)}
            sidebarOpen={!sidebarHidden}
            project={currentProject}
            updateTask={(task: TaskType): void => updateTaskInListOfColumns(task, columns, (newColumns: ColumnType[]): void => setColumns(newColumns))}
            onDeleteTask={(task: TaskType): void => setColumns(columns.map((c: ColumnType): ColumnType => c.id === task.columnId ? { ...c, tasks: c.tasks.filter((t: TaskType): boolean => t.id !== task.id) } : c))}
          />
        }
      >
        <div className="w-full h-full p-6 bg-lightGray dark:bg-veryDarkGray">
          <Board
            updateTask={(task: TaskType): void => updateTaskInListOfColumns(task, columns, (newColumns: ColumnType[]): void => setColumns(newColumns))}
            onDeleteTask={(task: TaskType): void => setColumns(columns.map((c: ColumnType): ColumnType => c.id === task.columnId ? { ...c, tasks: c.tasks.filter((t: TaskType): boolean => t.id !== task.id) } : c))}
            updateColumns={(columns: ColumnType[]): void => setColumns(columns)}
            columns={columns}
          />
        </div>
      </MainLayout>
    </>
  )
}
