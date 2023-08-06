import { types } from "mobx-state-tree"
import type { Instance, SnapshotOut } from "mobx-state-tree";
import { ThemeStore } from "./ThemeStore"
import { UIStore } from "./UIStore"
import { ProjectsStore } from "./ProjectsStore"
/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
  theme: ThemeStore,
  uiState: UIStore,
  projects: ProjectsStore,
})

export type RootStore = Instance<typeof RootStoreModel>

/**
 * The data of a RootStore.
 */
export type RootStoreSnapshot = SnapshotOut<typeof RootStoreModel>
