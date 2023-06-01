import serverAuth from "@/libs/serverAuthnext-13";
import { NextApiRequest, NextApiResponse } from "next";
import { toast } from "react-hot-toast";
import prisma from "../../libs/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }
  try {
    const { currentUser } = await serverAuth(req, res);
    const { postId } = req.query;
    const { body } = req.body;
    if (!postId || typeof postId !== "string") {
      throw new Error("Invalid post id");
    }
    const comment = await prisma.comment.create({
      data: {
        body,
        postId,
        userId: currentUser.id,
      },
    });
    try {
      const post = await prisma.post.findUnique({
        where: {
          id: postId,
        },
      });
      if (post?.userId) {
        await prisma.notification.create({
          data: {
            body: "Someone commented on your tweet!",
            userId: post.userId,
          },
        });
        await prisma.user.update({
          where: {
            id: post.userId,
          },
          data: {
            hasNotification: true,
          },
        });
      }
    } catch (error) {
      toast.error("error.message");
    }
    return res.status(200).json(comment);
  } catch (error: any) {
    toast.error(error.message);
  }
}
