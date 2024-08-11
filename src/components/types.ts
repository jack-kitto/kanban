import { z } from "zod"
import { zocker } from "zocker";

export const subtaskSchema = z.object({
  completed: z.boolean(),
  title: z.string(),
  id: z.string()
})
export type Subtask = z.infer<typeof subtaskSchema>

export const taskTypeSchema = z.object({
  title: z.string(),
  description: z.string(),
  subtasks: z.array(subtaskSchema),
  id: z.string(),
  columnTitle: z.string(),
  columnId: z.string(),
  position: z.string()
})
export type TaskType = z.infer<typeof taskTypeSchema>

export const columnTypeSchema = z.object({
  title: z.string(),
  id: z.string(),
  colour: z.string(),
  position: z.string(),
  tasks: z.array(taskTypeSchema)
})
export type ColumnType = z.infer<typeof columnTypeSchema>

export const projectSchema = z.object({
  title: z.string(),
  description: z.string(),
  columns: z.array(columnTypeSchema),
  id: z.string()
})
export type Project = z.infer<typeof projectSchema>
export const fakeProject = (): Project => zocker(projectSchema).generate()
export const fakeProjects = (): Project[] => zocker(projectSchema).generateMany(10)

export const dndItemSchema = z.object({
  position: z.string(),
  id: z.string()
})
export type DndItem = z.infer<typeof dndItemSchema>
