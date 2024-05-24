import { BoardDetail } from "~/components/organisms";
import type { Project, TaskType } from "~/components/types";
import { Button, Modal } from "~/components/atoms";
import { Icon } from "~/components/atoms/icon";
import { colors } from "~/styles";
import { useState } from "react";
import PopoverMenu from "~/components/molecules/popoverMenu/PopoverMenu";

export interface NavbarProps {
  project?: Project;
  updateTask: (task: TaskType) => void;
  onDeleteTask: (task: TaskType) => void;
  onSidebarOpen?: () => void;
  sidebarOpen?: boolean;
  onAddTask?: () => void;
}

export default function Navbar(props: NavbarProps): JSX.Element {
  const [projectDetailOpen, setProjectDetailOpen] = useState<boolean>(false)
  const [editing, setEditing] = useState<boolean>(true)
  const [newBoard, setNewBoard] = useState<boolean>(false)
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
          <Button
            btn={{ onMouseDown: (): void => props.onAddTask && props.onAddTask() }}
            type="primary"
            icon="AddIcon"
          />
        </div>
        <div className="max-sm:hidden">
          <Button
            btn={{ onMouseDown: (): void => props.onAddTask && props.onAddTask() }}
            text="+ Add New Task"
            type="primary"
          />
        </div>
        <PopoverMenu
          position="bottom-start"
          options={[
            {
              text: 'Edit Project',
              onClick: (): void => { setProjectDetailOpen(true) }
            },
            {
              text: 'Delete Project',
              destructive: true,
              onClick: (): void => { console.log('Delete Project') }
            }
          ]}
        />
      </div>
      <Modal open={projectDetailOpen} close={() => setProjectDetailOpen(false)}>
        <BoardDetail
          newBoard={newBoard}
          setNewBoard={setNewBoard}
          editing={editing}
          setEditing={setEditing}
          saveChanges={(project: Project) => { console.log(project) }}
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
    </div>
  )
}
