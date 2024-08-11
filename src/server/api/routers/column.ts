import { z } from "zod";
import { columnTypeSchema } from "~/components/types";
import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const columnRouter = createTRPCRouter({
  update: protectedProcedure
    .input(z.array(columnTypeSchema))
    .mutation(async ({ ctx, input }) => {
      const promises: Promise<boolean>[] = []
      for (const column of input) {
        for (const task of column.tasks) {
          promises.push(ctx.db.task.update({
            where: {
              id: task.id
            },
            data: {
              column: {
                connect: {
                  id: column.id
                }
              },
              position: task.position
            }
          }).then(() => true).catch(() => false))
        }
        promises.push(ctx.db.column.update({
          where: {
            id: column.id,
          },
          data: {
            position: column.position
          }
        }).then(() => true).catch(() => false))
      }
      return Promise.all(promises)
    })
});
