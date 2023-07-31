import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const partiesRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const parties = await ctx.prisma.party.findMany({
      include: {
        guests: true,
      },
      take: 100,
      orderBy: [{ createdAt: "desc" }],
    });

    return parties;
  }),
});
