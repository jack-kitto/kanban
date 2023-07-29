import { z } from "zod";
import { createTRPCRouter, publicProcedure, privateProcedure } from "~/server/api/trpc";

export const projectsRouter = createTRPCRouter({
  create: privateProcedure
    .input(z.object({
      name: z.string().min(1).max(32),
      columns: z.optional(z.array(z.string().min(1).max(32))),
    }))
    .mutation(async ({ ctx, input }) => {
      const response = await ctx.prisma.project.create({
        data: {
          name: input.name,
          userId: ctx.userId,
          columns: {
            create: input.columns?.map((column) => {
              return {
                name: column,
              }
            }),
          }
        },
      })
      return response
    }),
  getAll: privateProcedure.query(async ({ ctx }) => {
    const response = await ctx.prisma.project.findMany({
      where: {
        userId: ctx.userId,
      },
    })
    return response
  }),
  getProjectById: privateProcedure
    .input(z.object({
      id: z.number().int(),
    }))
    .query(async ({ ctx, input }) => {
      console.log("ID: ", input.id)
      const response = await ctx.prisma.project.findUnique({
        where: {
          id: input.id,
        },
      })
      console.log("res", response)
      return response
    }),
})
