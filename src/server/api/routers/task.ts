import { z } from "zod";
import { type Subtask, taskTypeSchema } from "~/components/types";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const taskRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  create: protectedProcedure
    .input(taskTypeSchema)
    .mutation(async ({ ctx, input }) => {
      ctx.session.user.id
      return ctx.db.task.create({
        data: {
          title: input.title,
          description: input.description,
          id: input.id,
          columnTitle: input.columnTitle,
          columnId: input.columnId,
          position: input.position,
          subtasks: {
            create: input.subtasks.map((s: Subtask) => ({
              title: s.title,
              id: s.id,
              completed: s.completed
            }))
          }
        },
      });
    }),
});
