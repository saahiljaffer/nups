import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";

export const partiesRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.party.findMany({
      include: {
        guests: true,
      },
      orderBy: [{ createdAt: "desc" }],
    });
  }),
  create: publicProcedure
    .input(
      z.object({
        guests: z.array(
          z.object({
            firstName: z.string(),
            lastName: z.string(),
            email: z.string(),
            gender: z.enum(["MALE", "FEMALE"]),
            mendhi: z.enum(["YES", "NO"]),
          })
        ),
        inviter: z.enum(["BRIDE", "GROOM"]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const party = await ctx.prisma.party.create({
        data: {
          ...input,
          guests: {
            create: input.guests.map((guest) => ({
              ...guest,
              mendhi: guest.mendhi === "YES",
            })),
          },
        },
      });

      return party;
    }),
  delete: publicProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
    const party = await ctx.prisma.party.delete({
      where: {
        id: input,
      },
    });

    return party;
  }),
});
