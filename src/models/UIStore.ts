import { types, SnapshotIn, Instance } from "mobx-state-tree";

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

export interface IUIStore extends Instance<typeof UIStore> { }
