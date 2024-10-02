import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    const companies = await prisma.company.findMany();
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch companies" });
  }
}