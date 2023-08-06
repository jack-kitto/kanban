import { types } from "mobx-state-tree";
import type { Instance, SnapshotIn } from "mobx-state-tree";

export const UIStore = types.model("ThemeStore", {
  sidebarOpen: types.boolean,
}).actions((self) => ({
  setProp<
    K extends keyof SnapshotIn<typeof self>,
    V extends SnapshotIn<typeof self>[K]
  >(field: K, newValue: V) {
    self[field] = newValue;
  }
}));

export type IUIStore = Instance<typeof UIStore>
