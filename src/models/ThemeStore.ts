import { types, SnapshotIn, Instance } from "mobx-state-tree";

export const ThemeStore = types.model("ThemeStore", {
  type: types.optional(types.enumeration(["light", "dark"]), "light"),
}).actions((self) => ({
  setProp<
    K extends keyof SnapshotIn<typeof self>,
    V extends SnapshotIn<typeof self>[K]
  >(field: K, newValue: V) {
    self[field] = newValue;
  }
}));

export interface IThemeStore extends Instance<typeof ThemeStore> { }
