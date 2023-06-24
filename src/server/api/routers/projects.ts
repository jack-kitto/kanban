import { z } from "zod";
import { createTRPCRouter, publicProcedure, privateProcedure } from "~/server/api/trpc";

export const projectsRouter = createTRPCRouter({
  create: privateProcedure
    .input(z.object({
      name: z.string().min(1).max(32),
    }))
    .mutation(async ({ ctx, input }) => {
      const response = await ctx.prisma.project.create({
        data: {
          name: input.name,
          userId: ctx.userId,
        },
      })
      return response
    })
})
