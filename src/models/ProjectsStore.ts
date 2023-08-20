import { applySnapshot, getSnapshot, types } from "mobx-state-tree";
import type { inferRouterOutputs } from '@trpc/server';
import type { Instance, SnapshotIn } from "mobx-state-tree";
import type { AppRouter } from "~/server/api/root";
type RouterOutput = inferRouterOutputs<AppRouter>;
type ProjectCreateOutput = RouterOutput["projects"]["create"];
type getAllProjectsOutput = RouterOutput["projects"]['getAll'];

export interface ISubTask {
  id: string;
  name: string;
  position: number,
  isCompleted: boolean;
}
const SubTaskModel = types.model("SubTaskModel", {
  id: types.string,
  name: types.string,
  position: types.number,
  isCompleted: types.boolean,
}).actions((self) => ({
  setProp<K extends keyof SnapshotIn<typeof self>, V extends SnapshotIn<typeof self>[K]>(field: K, newValue: V) {
    applySnapshot(self[field], newValue); // Here we use applySnapshot to update the property
  },
}));

export interface ITask {
  id: string;
  name: string;
  description: string;
  position: number,
  subTasks: ISubTask[];
}
const TaskModel = types.model("TaskModel", {
  id: types.string,
  name: types.string,
  description: types.string,
  position: types.number,
  subTasks: types.optional(types.array(SubTaskModel), []),
}).actions((self) => ({
  setProp<K extends keyof SnapshotIn<typeof self>, V extends SnapshotIn<typeof self>[K]>(field: K, newValue: V) {
    // applySnapshot(self[field], newValue); // Here we use applySnapshot to update the property
    self[field] = newValue as any;
  },
}));

export interface IColumn {
  id: string;
  name: string;
  color: string;
  projectId: string;
  position: number,
  tasks: ITask[];
}
const ColumnModel = types.model("ColumnModel", {
  id: types.string,
  name: types.string,
  projectId: types.string,
  color: types.string,
  position: types.number,
  tasks: types.optional(types.array(TaskModel), []),
}).actions((self) => ({
  setProp<K extends keyof SnapshotIn<typeof self>, V extends SnapshotIn<typeof self>[K]>(field: K, newValue: V) {
    applySnapshot(self[field], newValue); // Here we use applySnapshot to update the property
  },
  removeTaskById(taskId: string) {
    if (!taskId) return;
    const foundTask = self.tasks.find((task) => task.id === taskId);
    if (!foundTask) return;
    self.tasks.remove(foundTask);

  },
  addTaskToPosition(task: ITaskModel, position: number) {
    const taskExists = self.tasks.find((t) => t.id === task.id);
    const newTask = TaskModel.create({ ...getSnapshot(task), position })
    self.tasks.forEach((t) => {
      if (t.position >= newTask.position) {
        t.setProp("position", t.position + 1);
      }
    });
    if (!taskExists) self.tasks.push(newTask);
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
  },
  getColumnById(id: string) {
    return self.columns.find((column) => column.id === id);
  },
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
  setCurrentProjectById(id: string) {
    const projectIndex = self.projects.findIndex((p) => p.id === id);
    if (projectIndex === -1) return;
    self.currentProjectIndex = projectIndex;
  },
  getCurrentProject(): IProjectModel {
    if (self.currentProjectIndex === null) {
      return {} as IProjectModel
    }
    const project = self.projects[self.currentProjectIndex];
    if (!project) {
      return {} as IProjectModel
    }
    return project;
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
  syncProjects(projects: getAllProjectsOutput) {
    //remove projects that are not in the server
    this.setProp('projects', self.projects.filter(p => projects.find(p2 => p2.id === p.id)))
    projects.forEach(p => {
      this.addProject(p)
    })
  },
  removeProjectById(projectId: string) {
    this.setProp('projects', self.projects.filter(p => p.id !== projectId))
  },
  addProject(project: ProjectCreateOutput) {
    if (!project) return;
    const isUnique = !self.projects.find(p => p.id === project.id);
    if (!isUnique) return;
    const newProject: IProjectModel = ProjectModel.create({
      id: project.id,
      name: project.name,
      userId: project.userId
    })
    const columns: IColumnModel[] = project.columns.map(c => {
      const tasks = c.tasks.map(t => {
        const subTasks: ISubTaskModel[] = t.subtasks.map(st => {
          return SubTaskModel.create({
            id: `${st.id}`,
            name: st.name,
            position: st.position,
            isCompleted: st.isCompleted
          });
        })
        const task: ITaskModel = TaskModel.create({
          id: `${t.id}`,
          name: t.name,
          position: t.position,
          description: t.description ? t.description : "",
        })
        task.setProp('subTasks', subTasks)
        return task;
      })
      const column: IColumnModel = ColumnModel.create({
        id: `${c.id}`,
        name: c.name,
        position: c.position,
        projectId: project.id,
        color: c.color
      })
      column.setProp("tasks", tasks)
      return column;
    });
    newProject.setProp("columns", columns);
    self.projects.push(newProject);
  },
}));

export type IProjectsStore = Instance<typeof ProjectsStore>
export type IProjectModel = Instance<typeof ProjectModel>
export type IColumnModel = Instance<typeof ColumnModel>
export type ITaskModel = Instance<typeof TaskModel>
export type ISubTaskModel = Instance<typeof SubTaskModel>

