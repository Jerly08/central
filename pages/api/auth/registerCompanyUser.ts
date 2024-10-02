import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { companyId, username, password } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 10);

  try {
    const user = await prisma.companyUser.create({
      data: {
        username,
        password: hashedPassword,
        role: {
          connect: { name: "admin" },
        },
        company: {
          connect: { id: companyId },
        },
      },
    });
    res.status(201).json({ userId: user.id });
  } catch (error) {
    res.status(500).json({ error: "User already exists or other error" });
  }
}