// pages/api/register.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { prisma } from '../../lib/prisma';
import i18n from '../../i18n';

interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
}

export default async function register(req: NextApiRequest, res: NextApiResponse) {
  await i18n.changeLanguage(req.headers['accept-language'] || 'en'); // Change language based on request header or default to 'en'
  const { t } = i18n;

  const { firstName, lastName, email, phoneNumber, password }: RegisterRequest = req.body;

  // Vérifier si l'utilisateur existe déjà
  const existingUser = await prisma.user.findUnique({
    where: { email }
  });

  if (existingUser) {
    return res.status(409).json({ message: t('user_already_exists') });
  }

  // Vérifier les champs requis
  if (!firstName) {
    return res.status(400).json({ message: t('first_name_required') });
  }

  if (!lastName) {
    return res.status(400).json({ message: t('last_name_required') });
  }

  if (!email) {
    return res.status(400).json({ message: t('email_required') });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: t('invalid_email') });
  }

  if (!phoneNumber) {
    return res.status(400).json({ message: t('phone_number_required') });
  }

  const phoneRegex = /^\+[1-9]\d{1,14}$/;
  if (!phoneRegex.test(phoneNumber)) {
    return res.status(400).json({ message: t('invalid_phone_number_format') });
  }

  if (!password) {
    return res.status(400).json({ message: t('password_required') });
  }

  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({ message: t('invalid_password_format') });
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

    return res.status(201).json({ message: t('user_registered') });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
}
