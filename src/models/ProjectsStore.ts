import { types, SnapshotIn, Instance } from "mobx-state-tree";

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

const ColumnModel = types.model("ColumnModel", {
  id: types.string,
  name: types.string,
  color: types.string,
  tasts: types.array(TaskModel),
}).actions((self) => ({
  setProp<
    K extends keyof SnapshotIn<typeof self>,
    V extends SnapshotIn<typeof self>[K]
  >(field: K, newValue: V) {
    self[field] = newValue;
  }
}));

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
  }
}));

export interface IProjectsStore extends Instance<typeof ProjectsStore> { }

