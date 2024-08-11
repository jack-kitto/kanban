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
      console.log(input)
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
      const promises: Promise<any>[] = []
      for (let i = 0; i < input.subtasks.length; i++) {
        promises.push(ctx.db.subtask.upsert({
          where: {
            id: `${input.subtasks[i]?.id}`,
          },
          update: {
            title: input.subtasks[i]?.title ?? '',
            completed: input.subtasks[i]?.completed ?? false,
          },
          create: {
            title: input.subtasks[i]?.title ?? 'New subtask',
            completed: input.subtasks[i]?.completed ?? false,
            task: {
              connect: {
                id: input.id
              }
            }
          }
        }))
      }
      return Promise.all(promises)
    })
});
