import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';
import Sidebar, { type SidebarProps } from './Sidebar';
import { createId } from '@paralleldrive/cuid2';
import type { Project, TaskType } from '~/components/types';
import { MainLayout } from '~/components/templates';
import { Modal } from '~/components/atoms';

const meta = {
  component: Sidebar,
} satisfies Meta<typeof Sidebar>;

export default meta;

type Story = StoryObj<typeof meta>;


const projects: Project[] = Array.from({ length: 5 }, (_, i) => {
  return {
    id: createId(),
    title: `Project ${i}`,
    description: `Description for project ${i}`,
    columns: Array.from({ length: 3 }, (_, j) => {
      const id = createId()
      return {
        id: id,
        title: `Column ${j}`,
        colour: 'Violet',
        position: `${j}`,
        updateColumn: (tasks: TaskType[]): void => { console.log("updateColumn", tasks) },
        tasks: Array.from({ length: 10 }, (_, k) => ({
          title: `Task ${k}`,
          id: createId(),
          columnTitle: `Column ${j}`,
          columnId: id,
          position: `${k}`,
          description: `Description for task ${k}`,
          subtasks: Array.from({ length: 3 }, (_, l) => ({
            completed: l % 2 === 0,
            title: `Task ${k} Subtask ${l}`,
            id: `${l}`
          }))
        }))
      }
    })
  }
})

export const Default: Story = {
  args: {
    setSidebarHidden: () => { console.log("hideSidebar") },
    sidebarHidden: false,
    projects,
    setCreateProjectOpen: () => { console.log("setCreateProjectOpen") },
    onClickProject: (project: Project) => { console.log("onClickProject", project) },
    currentProject: projects[0]!
  },
  render: (args) => {
    const [{ currentProject, sidebarHidden }, updateArgs] = useArgs<SidebarProps>();
    return (
      <>
        <MainLayout
          {...args}
          sidebarHidden={sidebarHidden}
          navbar={<div>Nav</div>}
          sidebar={
            <Sidebar
              {...args}
              setCreateProjectOpen={(t: boolean) => console.log("setCreateProjectOpen", t)}
              sidebarHidden={sidebarHidden}
              setSidebarHidden={(t: boolean) => updateArgs({ sidebarHidden: t })}
              currentProject={currentProject}
              onClickProject={(project: Project) => updateArgs({ currentProject: project })}
            />
          }
        >
          <div>Content</div>
        </MainLayout>
      </>
    )
  }
};

export const Popup: Story = {
  args: {
    setSidebarHidden: () => { console.log("hideSidebar") },
    setCreateProjectOpen: () => { console.log("setCreateProjectOpen") },
    sidebarHidden: false,
    projects,
    onClickProject: (project: Project) => { console.log("onClickProject", project) },
    currentProject: projects[0]!
  },
  render: (args) => {
    const [{ currentProject }, updateArgs] = useArgs<SidebarProps>();
    return (
      <Modal open={true} close={() => { console.log("CLOSE") }}>
        <Sidebar
          {...args}
          modal={true}
          currentProject={currentProject}
          onClickProject={(project: Project) => updateArgs({ currentProject: project })}
        />
      </Modal>
    )
  }
};
