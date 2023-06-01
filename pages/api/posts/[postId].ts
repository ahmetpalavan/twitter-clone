import { NextApiRequest, NextApiResponse } from "next/types";
import { toast } from "react-hot-toast";
import prisma from "../../../libs/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  try {
    const { postId } = req.query;
    if (!postId) {
      return res.status(400).json({ message: "Missing postId" });
    }
    const post = await prisma.post.findUnique({
      where: {
        id: postId as string,
      },
      include: {
        user: true,
        comments: {
          include: {
            user: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });
    return res.status(200).json(post);
  } catch (error: any) {
    toast.error(error.message);
  }
}
