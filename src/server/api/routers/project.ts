import { z } from "zod";
import { type ColumnType, projectSchema } from "~/components/types";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const projectRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: protectedProcedure
    .input(projectSchema)
    .mutation(async ({ ctx, input }) => {
      ctx.session.user.id
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
});
