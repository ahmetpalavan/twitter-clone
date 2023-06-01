import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../libs/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.status(405).end();
    return;
  }

  try {
    const { userId } = req.query;
    if (!userId || typeof userId !== "string") {
      throw new Error("Invalid user ID");
    }

    const exists = await prisma?.user.findUnique({
      where: {
        id: userId,
      },
    });
    const followersCount = await prisma?.user.count({
      where: {
        followingIds: {
          has: userId,
        },
      },
    });
    return res.status(200).json({
      ...exists,
      followersCount,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}
