import { getSnapshot, types } from "mobx-state-tree";
import type { inferRouterOutputs } from '@trpc/server';
import type { Instance, SnapshotIn } from "mobx-state-tree";
import type { AppRouter } from "~/server/api/root";
type RouterOutput = inferRouterOutputs<AppRouter>;
type ProjectCreateOutput = RouterOutput["projects"]["create"];
type getColumnByIdOutput = RouterOutput["projects"]['getColumnById'];

export interface ISubTask {
  id: string;
  name: string;
  isCompleted: boolean;
}
const SubTaskModel = types.model("SubTaskModel", {
  id: types.string,
  name: types.string,
  isCompleted: types.boolean,
}).actions((self) => ({
  setProp<
    K extends keyof SnapshotIn<typeof self>,
    V extends SnapshotIn<typeof self>[K]
  >(field: K, newValue: V) {
    self[field] = newValue;
  }
}));

export interface ITask {
  id: string;
  name: string;
  description: string;
  subTasks: ISubTask[];
}
const TaskModel = types.model("TaskModel", {
  id: types.string,
  name: types.string,
  description: types.string,
  subTasks: types.optional(types.array(SubTaskModel), []),
}).actions((self) => ({
  setProp<
    K extends keyof SnapshotIn<typeof self>,
    V extends SnapshotIn<typeof self>[K]
  >(field: K, newValue: V) {
    self[field] = newValue;
  }
}));

export interface IColumn {
  id: string;
  name: string;
  color: string;
  projectId: string;
  tasks: ITask[];
}
const ColumnModel = types.model("ColumnModel", {
  id: types.string,
  name: types.string,
  projectId: types.string,
  color: types.string,
  tasks: types.optional(types.array(TaskModel), []),
}).actions((self) => ({
  setProp<
    K extends keyof SnapshotIn<typeof self>,
    V extends SnapshotIn<typeof self>[K]
  >(field: K, newValue: V) {
    self[field] = newValue;
  }
}));

export interface IProject {
  id: string;
  name: string;
  columns: IColumn[];
  userId: string;
}
export const ProjectModel = types.model("ProjectModel", {
  id: types.string,
  name: types.string,
  columns: types.optional(types.array(ColumnModel), []),
  userId: types.string,
}).actions((self) => ({
  setProp<
    K extends keyof SnapshotIn<typeof self>,
    V extends SnapshotIn<typeof self>[K]
  >(field: K, newValue: V) {
    self[field] = newValue;
  }
}));

export const ProjectsStore = types.model("ProjectsStore", {
  currentProjectIndex: types.maybeNull(types.number),
  projects: types.array(ProjectModel),
}).actions((self) => ({
  setProp<
    K extends keyof SnapshotIn<typeof self>,
    V extends SnapshotIn<typeof self>[K]
  >(field: K, newValue: V) {
    self[field] = newValue;
  },
  openProjectById(projectId: string) {
    self.currentProjectIndex = self.projects.findIndex((p) => p.id === projectId);
  },
  storeProjects(projects: IProject[]) {
    projects.forEach(p => {
      if (!self.projects.find(p2 => p2.id === p.id)) {
        self.projects.push(p as IProjectModel)
      }
    })
  },
  addProject(project: ProjectCreateOutput) {
    console.log("addProject", project);
    if (!project) return;
    const isUnique = !self.projects.find(p => p.id === project.id);
    if (!isUnique) return;
    const newProject = ProjectModel.create({
      id: project.id,
      name: project.name,
      userId: project.userId
    } as any)
    let columns = project.columns.map(c => {
      const tasks = c.tasks.map(t => {
        const subTasks = t.subtasks.map(st => {
          return SubTaskModel.create({
            id: `${st.id}`,
            name: st.name,
            isCompleted: st.isCompleted
          });
        })
        const task = TaskModel.create({
          id: `${t.id}`,
          name: t.name,
          description: t.description ? t.description : "",
        })
        task.setProp('subTasks', subTasks)
        return task;
      })
      const column = ColumnModel.create({
        id: `${c.id}`,
        name: c.name,
        projectId: project.id,
        color: c.color
      })
      column.setProp("tasks", tasks)
      return column;
    });
    newProject.setProp("columns", columns);
    self.projects.push(newProject);
    console.log("self.projects: ", getSnapshot(self.projects));
  },
}));

const buildTasksFromColumn = (column: getColumnByIdOutput) => {
  return ColumnModel.create()
}

export type IProjectsStore = Instance<typeof ProjectsStore>
export type IProjectModel = Instance<typeof ProjectModel>
export type IColumnModel = Instance<typeof ColumnModel>
export type ITaskModel = Instance<typeof TaskModel>
export type ISubTaskModel = Instance<typeof SubTaskModel>

