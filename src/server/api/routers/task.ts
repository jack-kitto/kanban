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
  delete: protectedProcedure
    .input(z.string().min(1))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.task.delete({
        where: {
          id: input
        }
      })
    }),
  update: protectedProcedure
    .input(taskTypeSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.task.update({
        where: {
          id: input.id
        },
        data: {
          title: input.title,
          description: input.description,
          columnId: input.columnId,
          columnTitle: input.columnTitle,
          position: input.position,
        }
      })
      const promises: Promise<boolean>[] = []
      for (const subtask of input.subtasks) {
        promises.push(ctx.db.subtask.upsert({
          where: {
            id: `${subtask.id}`,
          },
          update: {
            title: subtask.title,
            completed: subtask.completed,
          },
          create: {
            title: subtask.title,
            completed: subtask.completed,
            task: {
              connect: {
                id: input.id
              }
            }
          }
        }).then(() => true).catch(() => false))
      }
      return Promise.all(promises)
    })
});
