import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  setCurrentProject: protectedProcedure
    .input(z.string().min(1))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.user.update({
        where: {
          id: ctx.session.user.id
        },
        data: {
          currentProjectId: input
        }
      })
    }),
  setDarkTheme: protectedProcedure
    .input(z.boolean())
    .mutation(async ({ ctx, input }) => {
      return ctx.db.user.update({
        where: {
          id: ctx.session.user.id
        },
        data: {
          darkTheme: input
        }
      })
    }),
});
