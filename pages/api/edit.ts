import serverAuth from "@/libs/serverAuthnext-13";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../libs/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "PATCH") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { currentUser } = await serverAuth(req, res);
    const { name, username, bio, profileImage, coverImage } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name and username are required" });
    }
    const updatedUser = await prisma.user.update({
      where: { id: currentUser.id },
      data: {
        name,
        bio,
        profileImage,
        coverImage,
      },
    });
    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}
