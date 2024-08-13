import type { Project } from "~/components/types";
import { Button, MenuButton, TooltipMenu } from "~/components/atoms";
import { Icon } from "~/components/atoms/icon";
import { colors } from "~/styles";

export interface NavbarProps {
  project: Project | null
  onSidebarOpen?: () => void;
  sidebarOpen?: boolean;
  openTaskDetail?: () => void;
  deleteProject?: () => void
  setProjectDetailOpen?: (b: boolean) => void
  setNewProjectOpen?: (b: boolean) => void
  setNewBoard?: (b: boolean) => void
}

export default function Navbar(props: NavbarProps): JSX.Element {

  function handleAddProject() {
    if (props.setNewProjectOpen) props.setNewProjectOpen(true)
  }

  function deleteProject() {
    if (!props.deleteProject) return
    if (!props.project) return
    props.deleteProject()
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
          <TooltipMenu options={

            [
              {
                text: "Edit Board",
                onClick: () => {
                  if (props.setProjectDetailOpen) props.setProjectDetailOpen(true)
                }
              },
              {
                text: "Delete Board",
                onClick: deleteProject,
                destructive: true
              }]
          } >
            <MenuButton type="hover" />
          </TooltipMenu>
        }
      </div>
    </div>
  )
}
