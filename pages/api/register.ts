// pages/api/register.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { prisma } from '../../lib/prisma';
import i18n from '../../i18n';
import { sendEmail} from '@/lib/nodemailer';
import crypto from 'crypto';

interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
}

export default async function register(req: NextApiRequest, res: NextApiResponse) {
  await i18n.changeLanguage(req.headers['accept-language'] || 'en');
  const { t } = i18n;

  const { firstName, lastName, email, phoneNumber, password }: RegisterRequest = req.body;

  const existingUser = await prisma.user.findUnique({
    where: { email }
  });

  if (existingUser) {
    return res.status(409).json({ message: t('user_already_exists') });
  }

  if (!firstName || !lastName || !email || !phoneNumber || !password) {
    return res.status(400).json({ message: t('all_fields_required') });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: t('invalid_email') });
  }

  const phoneRegex = /^\+[1-9]\d{1,14}$/;
  const phoneRegexCorrect = /^0\d{9}$/;
  
  let formattedPhoneNumber = phoneNumber;
  
  if (!phoneRegex.test(phoneNumber)) {
    if (phoneRegexCorrect.test(phoneNumber)) {
      formattedPhoneNumber = `+33${phoneNumber.slice(1)}`;
    } else {
      return res.status(400).json({ message: t('invalid_phone_number_format') });
    }
  }

  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({ message: t('invalid_password_format') });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const confirmationToken = crypto.randomBytes(32).toString('hex');

  try {
    await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        phoneNumber,
        password: hashedPassword,
        confirmationToken,
      }
    });

    const confirmationLink = `${process.env.BASE_URL}/api/confirm?token=${confirmationToken}`;
    const textContent = `Thank you for registering. Click the following link to confirm your email: ${confirmationLink}`;
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
        <h2 style="color: #333;">Confirm your email</h2>
        <p>Thank you for registering. Click the following link to confirm your email:</p>
        <a
          href="${confirmationLink}"
          style="
            display: inline-block;
            padding: 10px 20px;
            margin: 20px 0;
            background-color: #007BFF;
            color: white;
            text-decoration: none;
            border-radius: 5px;
          "
        >
          Confirm Email
        </a>
        <p>If you did not register, please ignore this email.</p>
        <p>Thank you,<br>Your Company Name</p>
      </div>
    `;

    await sendEmail(email, 'Confirm your email', textContent, htmlContent);

    return res.status(201).json({ message: t('user_registered') });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
}
