import { Button } from "~/components/atoms";
import { Icon } from "~/components/atoms/icon";
import { DarkModeToggle, SidebarItem } from "~/components/molecules";
import type { Project } from "~/components/types";

export interface SidebarProps {
  projects: Project[]
  onClickProject: (project: Project) => void
  currentProject?: Project
  modal?: boolean
  setSidebarHidden: (hidden: boolean) => void
  sidebarHidden: boolean
  setCreateProjectOpen: (open: boolean) => void
  onLogoClick?: () => void
}

export default function Sidebar(props: SidebarProps): JSX.Element {

  if (props.sidebarHidden) {
    return (
      <button onMouseDown={() => props.setSidebarHidden(false)} className="absolute bottom-8 left-0 h-12 flex justify-center items-center rounded-r-full z-50 bg-mainPurple w-[56px] transition outline-none hover-duration-150 ease-in-out hover:scale-105 active:scale-100 select-none">
        <Icon icon="Eye" />
      </button>
    );
  }

  return (
    <div className="bg-white dark:bg-darkGray rounded-lg flex flex-col justify-between h-full">
      <div>
        {
          props.modal ?? (
            <button onMouseDown={props.onLogoClick} className="flex pt-8 pl-[34px] outline-none pb-14">
              <div className="pr-4">
                <Icon icon="Logo" size="medium" />
              </div>
              <h1 className="prose-hxl dark:text-white">{'Kanban'}</h1>
            </button>
          )
        }
        <div className={`pl-8 pb-[22px] ${props.modal && 'pt-[19px]'}`}>
          <h1 className="prose-hs">ALL BOARDS {`(${props.projects.length})`}</h1>
        </div>
        {
          props.projects.map((project: Project, index: number): JSX.Element => (
            <SidebarItem key={`${project.id} ${index}`} checked={props.currentProject?.id === project.id} label={project.title} onClick={() => props.onClickProject(project)} />
          ))
        }
        <div>
          <SidebarItem type="button" checked={false} label={'+ Create New Board'} onClick={() => { props.setCreateProjectOpen(true) }} />
        </div>
      </div>
      <div className="p-4">
        <DarkModeToggle />
        {
          props.modal ?? (
            <Button btn={{ onMouseDown: () => props.setSidebarHidden(true) }}>
              <div className=" flex gap-4 pb-12 pt-[26px]">
                <Icon icon="EyeSlash" />
                <h1 className="prose-hm text-mediumGray">Hide Sidebar</h1>
              </div>
            </Button>
          )
        }
      </div>
    </div>
  );
}
