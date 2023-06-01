import serverAuth from "@/libs/serverAuthnext-13";
import { NextApiRequest, NextApiResponse } from "next";
import { toast } from "react-hot-toast";
import prisma from "../../libs/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST" && req.method !== "DELETE") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  try {
    const { postId } = req.body;
    const { currentUser } = await serverAuth(req, res);
    if (!postId || typeof postId !== "string") {
      throw new Error("Missing postId");
    }
    const post = await prisma.post.findUnique({
      where: {
        id: postId as string,
      },
    });
    if (!post) {
      throw new Error("Post not found");
    }
    let updatedLike = [...(post.likedIds || [])];
    if (req.method === "POST") {
      updatedLike.push(currentUser?.id);
      try {
        const post = await prisma.post.findUnique({
          where: {
            id: postId,
          },
        });

        if (post?.userId) {
          await prisma.notification.create({
            data: {
              body: "Someone liked your tweet!",
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
    }
    if (req.method === "DELETE") {
      updatedLike = updatedLike.filter((id) => id !== currentUser?.id);
    }

    const updatedPost = await prisma.post.update({
      where: {
        id: postId as string,
      },
      data: {
        likedIds: updatedLike,
      },
    });

    return res.status(200).json(updatedPost);
  } catch (error: any) {
    toast.error(error.message);
  }
}
