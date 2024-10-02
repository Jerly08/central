import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const activationKeys = await prisma.activationKey.findMany();
      res.status(200).json(activationKeys);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch activation keys" });
    }
  } else if (req.method === "POST") {
    const { companyId, expiresInDays } = req.body;
    const key = uuidv4();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + expiresInDays);

    try {
      const activationKey = await prisma.activationKey.create({
        data: {
          key,
          expiresAt,
          company_id: companyId,
        },
      });
      res.status(201).json(activationKey);
    } catch (error) {
      res.status(500).json({ error: "Failed to create activation key" });
    }
  } else if (req.method === "DELETE") {
    const { id } = req.body;

    try {
      await prisma.activationKey.delete({
        where: { id },
      });
      res.status(200).json({ message: "Activation key deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete activation key" });
    }
  } else {
    res.status(405).end();
  }
}