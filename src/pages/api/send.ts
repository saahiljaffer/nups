/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import type { NextApiRequest, NextApiResponse } from "next";
import { EmailTemplate } from "src/components/email-template";
import { Resend } from "resend";
import { z } from "zod";
import { type RouterOutputs, api, type RouterInputs } from "~/utils/api";
import { PrismaClient } from "@prisma/client";

const resend = new Resend(process.env.RESEND_API_KEY);

const Token = z.object({
  object: z.literal("sign_in_token"),
  id: z.string(),
  user_id: z.string(),
  token: z.string(),
  status: z.literal("pending"),
  url: z.string(),
  created_at: z.number(),
  updated_at: z.number(),
});

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const prisma = new PrismaClient();
    const data = await prisma.guest.findMany({
      where: {
        status: "NEW",
      },
      orderBy: [{ createdAt: "desc" }],
    });
    data.forEach(async (guest) => {
      if (guest.email) {
        const response = await fetch(
          "https://api.clerk.com/v1/sign_in_tokens",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user_id: guest.clerkId,
            }),
          }
        );
        const token = Token.parse(await response.json());
        await resend.emails.send({
          from: "Saahil and Fatimah <admin@nups.us>",
          to: [guest.email],
          subject: "You're invited!",
          react: EmailTemplate({ firstName: "Saahil", token: token.url }),
        });
      }
    });
    res.status(200).json({});
  } catch (error) {
    console.log("error", error);
    res.status(400).json(error);
  }
};
