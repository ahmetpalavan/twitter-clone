import serverAuth from "@/libs/serverAuthnext-13";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../libs/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET" && req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    if (req.method === "POST") {
      const { currentUser } = await serverAuth(req, res);
      const { body } = req.body;
      const post = await prisma.post.create({
        data: {
          body,
          userId: currentUser.id,
        },
      });
      return res.status(200).json(post);
    }

    if (req.method === "GET") {
      const { userId } = req.query;

      let posts;
      if (userId && typeof userId === "string") {
        posts = await prisma.post.findMany({
          where: {
            userId,
          },
          include: {
            user: true,
            comments: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        });
      } else {
        posts = await prisma.post.findMany({
          include: {
            user: true,
            comments: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        });
      }
      return res.status(200).json(posts);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
