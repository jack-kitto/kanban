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
      console.log(input)
      const promises: Promise<any>[] = []
      for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input.length; j++) {
          if (!input[i]?.tasks[j]?.id) continue
          if (input[i]?.tasks.length === 0) continue
          promises.push(ctx.db.task.update({
            where: {
              id: input[i]?.tasks[j]?.id
            },
            data: {
              column: {
                connect: {
                  id: input[i]?.id
                }
              },
              position: input[i]?.tasks[j]?.position
            }
          }))
        }
        promises.push(ctx.db.column.update({
          where: {
            id: input[i]?.id,
          },
          data: {
            position: input[i]?.position
          }
        }))
      }
      return Promise.all(promises)
    })
});
