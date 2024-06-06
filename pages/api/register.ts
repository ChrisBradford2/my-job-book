// pages/api/register.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { prisma } from '../../lib/prisma';

interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
}

export default async function register(req: NextApiRequest, res: NextApiResponse) {
  const { firstName, lastName, email, phoneNumber, password }: RegisterRequest = req.body;

  // Vérifier si l'utilisateur existe déjà
  const existingUser = await prisma.user.findUnique({
    where: { email }
  });

  if (existingUser) {
    return res.status(409).json({ message: "User already exists" });
  }

  // Vérifier les champs requis
  if (!firstName) {
    return res.status(400).json({ message: "First name is required" });
  }

  if (!lastName) {
    return res.status(400).json({ message: "Last name is required" });
  }

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email address" });
  }

  if (!phoneNumber) {
    return res.status(400).json({ message: "Phone number is required" });
  }

  const phoneRegex = /^\+[1-9]\d{1,14}$/;
  if (!phoneRegex.test(phoneNumber)) {
    return res.status(400).json({ message: "Invalid phone number, must begin with a '+' sign followed by the country code and the phone number" });
  }

  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }

  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({ message: "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special character" });
  }

  // Hasher le mot de passe
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        phoneNumber,
        password: hashedPassword,
      }
    });

    return res.status(201).json({ message: "User registered successfully" });
  } catch (err: any) {
    return res.status(500).json({ message: "Failed to register user", error: err.message });
  }
}
