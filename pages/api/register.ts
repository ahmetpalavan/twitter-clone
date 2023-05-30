import { hash } from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../libs/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    const { email, name, password, username } = req.body;
    const hashedPassword = await hash(password, 12);

    const user = await prisma?.user.create({
      data: {
        email,
        name,
        hashedPassword,
      },
    });
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
