import { BoardDetail } from "~/components/organisms";
import type { Project } from "~/components/types";
import { Button, Modal } from "~/components/atoms";
import { Icon } from "~/components/atoms/icon";
import { colors } from "~/styles";
import { useState } from "react";
import PopoverMenu from "~/components/molecules/popoverMenu/PopoverMenu";

export interface NavbarProps {
  project: Project | null
  onSidebarOpen?: () => void;
  sidebarOpen?: boolean;
  openTaskDetail?: () => void;
  createProject?: (p: Project) => void
  deleteProject?: (id: string) => void
  setProjectDetailOpen?: (b: boolean) => void
  setNewBoard?: (b: boolean) => void
}

export default function Navbar(props: NavbarProps): JSX.Element {
  const [createProjectOpen, setCreateProjectOpen] = useState<boolean>(false)

  function handleAddProject() {
    setCreateProjectOpen(true)
  }

  function createProject(p: Project) {
    try {
      setCreateProjectOpen(false)
      if (props.createProject) props.createProject(p)
    } catch (error) {
      console.error(error)
    }
  }

  function deleteProject() {
    if (!props.deleteProject) return
    if (!props.project) return
    props.deleteProject(props.project.id)
  }

  return (

    <div className="w-full h-full bg-white dark:bg-darkGray flex justify-between items-center px-8">
      <div className="flex justify-center items-center">
        <div className="pr-4 sm:hidden">
          <Icon icon="Logo" color={colors.mainPurple} size="medium" />
        </div>
        <button className="flex  gap-2 justify-center items-center transition outline-none hover-duration-300 ease-in-out hover:opacity-50 active:scale-90 select-none">
          <h1 className="prose-hxl dark:text-white">{props.project?.title ?? 'Kanban'}</h1>
          <div className="pr-4 sm:hidden">
            <Icon icon={props.sidebarOpen ? "KeyboardArrowUpIcon" : "KeyboardArrowDownIcon"} color={colors.mainPurple} size="medium" />
          </div>
        </button>
      </div>
      <div className="flex gap-6 justify-center items-center">
        <div className="sm:hidden">
          {
            !!props.project ||
            <Button
              btn={{ onMouseDown: handleAddProject }}
              type="primary"
              icon="AddIcon"
            />
          }
          {
            props.project &&
            <Button
              btn={{ onMouseDown: props.openTaskDetail }}
              type="primary"
              icon="AddIcon"
            />
          }
        </div>
        <div className="max-sm:hidden">
          {
            !!props.project ||
            <Button
              btn={{ onMouseDown: handleAddProject }}
              text="+ Add New Project"
              type="primary"
            />
          }
          {
            props.project &&
            <Button
              btn={{ onMouseDown: props.openTaskDetail }}
              disabled={false}
              text="+ Add New Task"
              type="primary"
            />
          }
        </div>
        {
          props.project &&
          <PopoverMenu
            position="bottom-start"
            options={[
              {
                text: 'Edit Project',
                onClick: (): void => { if (props.setProjectDetailOpen) props.setProjectDetailOpen(true) }
              },
              {
                text: 'Delete Project',
                destructive: true,
                onClick: deleteProject
              }
            ]}
          />
        }
      </div>
      {
        !!props.project ||
        <Modal open={createProjectOpen} close={() => setCreateProjectOpen(false)}>
          <BoardDetail
            project={props.project}
            newBoard={true}
            setNewBoard={props.setNewBoard}
            editing={true}
            saveChanges={createProject}
          />
        </Modal>
      }
    </div>
  )
}
