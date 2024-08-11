"use client"
import toast from 'react-hot-toast';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Modal } from "~/components/atoms";
import { updateTaskInListOfColumns } from "~/components/helpers";
import { Board, BoardDetail, Navbar, TaskDetail } from "~/components/organisms";
import Sidebar from "~/components/organisms/sidebar/Sidebar";
import { MainLayout } from "~/components/templates";
import type { ColumnType, Project, TaskType } from "~/components/types";
import { api } from "~/trpc/react";
import { Confirmation } from '~/components/molecules';

export interface ProjectPageProps {
  projects: Project[]
  project: Project
}

export default function ProjectPage(props: ProjectPageProps): JSX.Element {
  const [currentProject, setCurrentProject] = useState<Project | null>(props.project)
  const [isClient, setIsClient] = useState(false)
  const [createProjectOpen, setCreateProjectOpen] = useState<boolean>(false)
  const [columns, setColumns] = useState<ColumnType[]>([])
  const [sidebarHidden, setSidebarHidden] = useState<boolean>(false)
  const [showTaskDetail, setShowTaskDetail] = useState<boolean>(false)
  const [editing, setEditing] = useState<boolean>(true)
  const [newTask, setNewTask] = useState<boolean>(true)
  const [confirmDeleteProjectOpen, setConfirmDeleteProjectOpen] = useState<boolean>(false)
  const router = useRouter()

  const createProjectMutation = api.project.create.useMutation({
    onError: (e) => {
      console.error(e)
      toast(`🤦 ${e.message}`)
    },
    onSuccess: () => {
      toast('🔥 Successfully saved new project')
      setCreateProjectOpen(false)
    }
  })

  const createTaskMutation = api.task.create.useMutation({
    onError: (e) => {
      console.error(e)
      toast(`🤦 ${e.message}`)
    },
    onSuccess: () => {
      toast('🔥 Successfully saved task')
    }
  })

  const deleteTaskMutation = api.task.delete.useMutation({
    onError: (e) => {
      console.error(e)
      toast(`🤦 ${e.message}`)
    },
    onSuccess: () => {
      toast('✅ Successfully removed task')
    }
  })

  const deleteProjectMutation = api.project.delete.useMutation({
    onError: (e) => {
      console.error(e)
      toast(`🤦 ${e.message}`)
    },
    onSuccess: () => {
      toast('✅ Successfully deleted project')
    }
  })

  const updateTaskMutation = api.task.update.useMutation({
    onError: (e) => {
      console.error(e)
      toast(`🤦 ${e.message}`)
    },
    onSuccess: () => {
      toast('🔥 Successfully saved task')
    }
  })

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
    setColumns(data)
    document.title = currentProject?.title ?? "Kanban"
  }, [currentProject])

  useEffect(() => {
    setIsClient(true)
  }, [])

  function openTaskDetail() {
    if (!currentProject?.columns[0]) return toast('Please create a column before creating a task.');
    setShowTaskDetail(true)
  }

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
            console.info("creating task", task)
            createTaskMutation.mutate(task)

            //
            // TODO: make sure to caculate the new position based on the column chosen and the last task in that column
            //

          }}
        />
      </Modal>
      <Modal open={confirmDeleteProjectOpen} close={() => setConfirmDeleteProjectOpen(false)}>
        <Confirmation
          title='Delete this board?'
          message={`Are you sure you want to delete the '${currentProject.title}' board? This action will remove all columns and task and cannot be reversed.`}
          confirmText='Delete'
          cancelText='Cancel'
          onCancel={() => setConfirmDeleteProjectOpen(false)}
          onConfirm={() => { setConfirmDeleteProjectOpen(false); deleteProjectMutation.mutate(currentProject.id); router.push('/') }}
        />
      </Modal>
      <Modal open={createProjectOpen} close={() => setCreateProjectOpen(false)}>
        <BoardDetail
          newBoard={true}
          loading={createProjectMutation.isPending}
          editing={true}
          saveChanges={createProjectMutation.mutate}
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
            createProject={createProjectMutation.mutate}
            sidebarOpen={!sidebarHidden}
            project={currentProject}
            openTaskDetail={openTaskDetail}
            deleteProject={() => setConfirmDeleteProjectOpen(true)}
          />
        }
      >
        <div className="w-full h-full p-6 bg-lightGray dark:bg-veryDarkGray">
          <Board
            updateTask={(task: TaskType): void => {
              updateTaskInListOfColumns(task, columns, (newColumns: ColumnType[]): void => setColumns(newColumns))
              updateTaskMutation.mutate(task)
            }}
            onDeleteTask={(task: TaskType): void => {
              setColumns(columns.map((c: ColumnType): ColumnType => c.id === task.columnId ? { ...c, tasks: c.tasks.filter((t: TaskType): boolean => t.id !== task.id) } : c))
              deleteTaskMutation.mutate(task.id)
            }}
            updateColumns={(columns: ColumnType[]): void => {
              setColumns(columns)
            }}
            columns={columns}
          />
        </div>
      </MainLayout>
    </>
  )
}
