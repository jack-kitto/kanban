import { z } from "zod";
import { type ColumnType, projectSchema } from "~/components/types";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const projectRouter = createTRPCRouter({
  create: protectedProcedure
    .input(projectSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.project.create({
        data: {
          title: input.title,
          description: input.description,
          id: input.id,
          users: {
            connect: {
              id: ctx.session.user.id
            }
          },
          columns: {
            create: input.columns.map((c: ColumnType) => ({
              colour: c.colour,
              title: c.title,
              id: c.id,
              position: c.position,
            }))
          }
        },
      });
    }),
  delete: protectedProcedure
    .input(z.string().min(1))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.project.delete({
        where: {
          id: input
        }
      })
    }),
  update: protectedProcedure
    .input(projectSchema)
    .mutation(async ({ ctx, input }) => {
      const promises: Promise<boolean>[] = []
      promises.push(ctx.db.project.update({
        where: {
          id: input.id
        },
        data: {
          title: input.title,
          description: input.description,
        }
      }).then(() => true))
      for (const column of input.columns) {
        promises.push(ctx.db.project.update({
          where: {
            id: input.id,
          },
          data: {
            columns: {
              connectOrCreate: {
                where: {
                  id: column.id
                },
                create: {
                  id: column.id,
                  title: column.title,
                  colour: column.colour,
                  position: column.position
                }
              }
            }
          }
        }).then(() => true))
      }
    })
});
