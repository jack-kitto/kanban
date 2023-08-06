import { z } from "zod";
import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";

export const projectsRouter = createTRPCRouter({
  create: privateProcedure
    .input(z.object({
      name: z.string().min(1).max(32),
      id: z.string(),
      columns: z.optional(z.array(z.string().min(1).max(32))),
    }))
    .mutation(async ({ ctx, input }) => {
      const response = await ctx.prisma.project.create({
        data: {
          id: input.id,
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
      id: z.string()
    }))
    .query(async ({ ctx, input }) => {
      const response = await ctx.prisma.project.findUnique({
        where: {
          id: input.id,
        },
        include: {
          columns: {
            include: {
              tasks: {
                include: {
                  subtasks: true,
                }
              }
            }
          },
        },
      })

      return response
    }),
  getColumnById: privateProcedure
    .input(z.object({
      id: z.number()
    }))
    .query(async ({ ctx, input }) => {
      const response = await ctx.prisma.column.findUnique({
        where: {
          id: input.id,
        },
      })
      return response
    }),
  getTaskById: privateProcedure
    .input(z.object({
      id: z.number()
    }))
    .query(async ({ ctx, input }) => {
      const response = await ctx.prisma.task.findUnique({
        where: {
          id: input.id,
        },
      })
      return response
    }),
  getSubTaskById: privateProcedure
    .input(z.object({
      id: z.number()
    }))
    .query(async ({ ctx, input }) => {
      const response = await ctx.prisma.subtask.findUnique({
        where: {
          id: input.id,
        },
      })
      return response
    }),
  deleteProjectById: privateProcedure
    .input(z.object({
      id: z.string()
    }))
    .mutation(async ({ ctx, input }) => {
      const response = await ctx.prisma.project.delete({
        where: { id: input.id },
      })
      return response
    }),
  deleteColumnById: privateProcedure
    .input(z.object({
      id: z.number()
    }))
    .mutation(async ({ ctx, input }) => {
      const response = await ctx.prisma.column.delete({
        where: { id: input.id },
      })
      return response
    }),
  deleteTaskById: privateProcedure
    .input(z.object({
      id: z.number()
    }))
    .mutation(async ({ ctx, input }) => {
      const response = await ctx.prisma.task.delete({
        where: { id: input.id },
      })
      return response
    }),
})
