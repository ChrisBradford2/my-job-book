// pages/api/register.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { prisma } from '../../lib/prisma';

interface RegisterRequest {
  email: string;
  password: string;
}

export default async function register(req: NextApiRequest, res: NextApiResponse, err: Error) {
  const { email, password }: RegisterRequest = req.body;

  // Vérifier si l'utilisateur existe déjà
  const existingUser = await prisma.user.findUnique({
    where: { email }
  });

  if (existingUser) {
    return res.status(409).json({ message: "User already exists" });
  }

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({ message: "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special character" });
  }

  // Hasher le mot de passe
  const hashedPassword = await bcrypt.hash(password, 10);

  // Créer le nouvel utilisateur
  const newUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    }
  });

  if (newUser) {
    return res.status(201).json({ message: "User registered successfully" });
  } else {
    return res.status(500).json({ message: "Failed to register user", error: err.message });
  }
}
