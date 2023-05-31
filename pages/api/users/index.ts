import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../libs/prismadb"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  try {
    const users = await prisma?.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
}
