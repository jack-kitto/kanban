import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { ThemeStore } from "./ThemeStore"
/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
  theme: ThemeStore,
})

export type RootStore = Instance<typeof RootStoreModel>

/**
 * The data of a RootStore.
 */
export type RootStoreSnapshot = SnapshotOut<typeof RootStoreModel>
