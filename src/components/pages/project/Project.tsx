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
  project?: Project
}

export default function ProjectPage(props: ProjectPageProps): JSX.Element {
  const [currentProject, setCurrentProject] = useState<Project | null>(props.project ?? null)
  const [projects, setProjects] = useState<Project[]>(props.projects)
  const [isClient, setIsClient] = useState(false)
  const [createProjectOpen, setCreateProjectOpen] = useState<boolean>(false)
  const [columns, setColumns] = useState<ColumnType[]>([])
  const [sidebarHidden, setSidebarHidden] = useState<boolean>(false)
  const [showTaskDetail, setShowTaskDetail] = useState<boolean>(false)
  const [editing, setEditing] = useState<boolean>(true)
  const [newTask, setNewTask] = useState<boolean>(true)
  const [confirmDeleteProjectOpen, setConfirmDeleteProjectOpen] = useState<boolean>(false)
  const [projectDetailOpen, setProjectDetailOpen] = useState<boolean>(false)
  const [editingBoard, setEditingBoard] = useState<boolean>(true)
  const [newBoard, setNewBoard] = useState<boolean>(false)
  const [newProject, setNewProject] = useState<Project | null>(null)
  const router = useRouter()
  useEffect(() => {
    if (!props.project) setCreateProjectOpen(true)
  }, [props.project])

  const deleteColumnMutation = api.column.delete.useMutation({
    onError: (e) => {
      console.error(e)
      toast(`🤦 ${e.message}`)
    },
    onSuccess: () => {
      toast('🔥 Successfully saved project')
      setCreateProjectOpen(false)
    }
  })

  const updateProjectMutation = api.project.update.useMutation({
    onError: (e) => {
      console.error(e)
      toast(`🤦 ${e.message}`)
    },
    onSuccess: () => {
      toast('🔥 Successfully saved project')
      setCreateProjectOpen(false)
    }
  })

  const createProjectMutation = api.project.create.useMutation({
    onError: (e) => {
      console.error(e)
      toast(`🤦 ${e.message}`)
    },
    onSuccess: () => {
      toast('🔥 Successfully saved new project')
      setCreateProjectOpen(false)
      setCurrentProject(newProject)
      setProjects((prev: Project[]): Project[] => prev.concat(newProject!))
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

  const updateColumnTasksMutation = api.column.update.useMutation({
    onError: (e) => {
      console.error(e)
      toast(`🤦 ${e.message}`)
    },
    onSuccess: () => {
      toast('🔥 Successfully updated board')
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

  const setCurrentProjectMutation = api.user.setCurrentProject.useMutation({
    onError: (e) => {
      console.error(e)
      toast(`🤦 ${e.message}`)
    },
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
      {
        currentProject &&
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
      }
      <Modal open={createProjectOpen} close={() => setCreateProjectOpen(false)}>
        <BoardDetail
          project={null}
          newBoard={true}
          loading={createProjectMutation.isPending}
          editing={true}
          saveChanges={(project: Project) => {
            setNewProject(project)
            createProjectMutation.mutate(project);
          }}
        />
      </Modal>
      <Modal open={projectDetailOpen} close={() => setProjectDetailOpen(false)}>
        <BoardDetail
          project={currentProject}
          newBoard={newBoard}
          setNewBoard={setNewBoard}
          editing={editingBoard}
          setEditing={setEditingBoard}
          saveChanges={(project: Project, removedColumns?: string[]) => {
            updateProjectMutation.mutate(project)
            setCurrentProject(project)
            setColumns((prev: ColumnType[]): ColumnType[] => prev.filter((c: ColumnType): boolean => !removedColumns?.includes(c.id)))
            setProjects((prev: Project[]): Project[] => prev.map((p: Project): Project => p.id === project.id ? project : p))
            if (removedColumns && removedColumns?.length > 0) deleteColumnMutation.mutate(removedColumns)
          }}
          menuOptions={[
            {
              text: 'Edit Project',
              onClick: () => { console.log('Edit Project') }
            },
            {
              text: 'Delete Project',
              destructive: true,
              onClick: () => { console.log('Delete Project') }
            }
          ]}
        />
      </Modal>
      <MainLayout
        sidebarHidden={sidebarHidden}
        sidebar={
          <Sidebar
            currentProject={currentProject}
            projects={projects}
            onClickProject={(project: Project): void => { setCurrentProject(project); setCurrentProjectMutation.mutate(project.id) }}
            setCreateProjectOpen={setCreateProjectOpen}
            setSidebarHidden={setSidebarHidden}
            sidebarHidden={sidebarHidden}
            onLogoClick={() => router.push('/')}
          />
        }
        navbar={
          <Navbar
            createProject={(project: Project) => {
              setNewProject(project)
              createProjectMutation.mutate(project)
            }}
            sidebarOpen={!sidebarHidden}
            project={currentProject}
            openTaskDetail={openTaskDetail}
            deleteProject={() => setConfirmDeleteProjectOpen(true)}
            setProjectDetailOpen={setProjectDetailOpen}
            setNewBoard={setNewBoard}
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
            updateColumnTasks={(columns: ColumnType[]): void => {
              setColumns(columns)
              updateColumnTasksMutation.mutate(columns)
            }}
            columns={columns}
          />
        </div>
      </MainLayout>
    </>
  )
}
