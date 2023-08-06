import { types } from "mobx-state-tree";
import type { Instance, SnapshotIn } from "mobx-state-tree";

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
  subTasks: types.array(SubTaskModel),
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
  tasks: ITask[];
}
const ColumnModel = types.model("ColumnModel", {
  id: types.string,
  name: types.string,
  color: types.string,
  tasks: types.array(TaskModel),
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
}
export const ProjectModel = types.model("ProjectModel", {
  id: types.string,
  name: types.string,
  columns: types.array(ColumnModel),
}).actions((self) => ({
  setProp<
    K extends keyof SnapshotIn<typeof self>,
    V extends SnapshotIn<typeof self>[K]
  >(field: K, newValue: V) {
    self[field] = newValue;
  }
}));

export const ProjectsStore = types.model("ProjectsStore", {
  currentProject: types.maybeNull(ProjectModel),
  projects: types.array(ProjectModel),
}).actions((self) => ({
  setProp<
    K extends keyof SnapshotIn<typeof self>,
    V extends SnapshotIn<typeof self>[K]
  >(field: K, newValue: V) {
    self[field] = newValue;
  },
  openProject(project: IProject) {
    console.log("openProject", project);
    self.currentProject = project as IProjectModel;
    if (!self.projects.find(p => p.id === project.id)) {
      self.projects.push(project);
    }
  },
  deleteCurrentProject() {
    const newProjects = self.projects.filter(p => p.id !== self.currentProject?.id) as IProjectModel[];
    this.setProp("projects", newProjects);
  },
}));

export type IProjectsStore = Instance<typeof ProjectsStore>
export type IProjectModel = Instance<typeof ProjectModel>
export type IColumnModel = Instance<typeof ColumnModel>
export type ITaskModel = Instance<typeof TaskModel>
export type ISubTaskModel = Instance<typeof SubTaskModel>

