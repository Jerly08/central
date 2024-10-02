import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    const companyUsers = await prisma.companyUser.findMany();
    res.status(200).json(companyUsers);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch company users" });
  }
}