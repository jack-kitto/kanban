import { AddTaskButton } from "~/components/organisms";
import type { Project, TaskType } from "~/components/types";
import { MenuButton, TooltipMenu } from "~/components/atoms";

export interface NavbarProps {
  project?: Project;
  updateTask: (task: TaskType) => void;
  onDeleteTask: (task: TaskType) => void;
}

export default function Navbar(props: NavbarProps): JSX.Element {
  return (
    <div className="w-full h-full flex justify-between items-center px-8">
      <h1 className="prose-hxl">{props.project?.title ?? 'Kanban'}</h1>
      <div className="flex gap-6 justify-center items-center">
        <AddTaskButton
          columns={props.project?.columns ?? []}
          updateTask={props.updateTask}
          onDeleteTask={props.onDeleteTask}
        />
        <TooltipMenu
          angle="SW"
          options={[
            {
              text: 'Edit Project',
              onClick: (): void => { console.log('Edit Project') }
            },
            {
              text: 'Delete Project',
              destructive: true,
              onClick: (): void => { console.log('Delete Project') }
            }
          ]}
        >
          <MenuButton type="hover" />
        </TooltipMenu>
      </div>
    </div>
  )
}
