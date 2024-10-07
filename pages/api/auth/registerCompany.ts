import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import crypto from 'crypto'; // Ganti require dengan import

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { companyName, username, password } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 10);

  try {
    const company = await prisma.company.create({
      data: {
        name: companyName,
        token: generateToken(), // Generate a unique token
        users: {
          create: {
            username,
            password: hashedPassword,
            role: {
              connect: { name: "admin" },
            },
          },
        },
      },
    });
    res.status(201).json({ companyId: company.id, token: company.token });
  } catch (error) {
    res.status(500).json({ error: "Company or user already exists or other error" });
  }
}

function generateToken() {
  return crypto.randomBytes(16).toString('hex'); // Gunakan import crypto
}