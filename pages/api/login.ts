import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';
import { prisma } from '../../lib/prisma';
import { useTranslation } from 'react-i18next';

const JWT_SECRET = process.env.JWT_SECRET || 'testtest';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { t } = useTranslation('common');

  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: t('invalid_credentials') });
  }

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '2h' });

  res.setHeader('Set-Cookie', serialize('auth', token, {
    path: '/',
    httpOnly: false,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production' || false,
    maxAge: 3600,
  }));

  res.status(200).json({ message: t('login_success') });
}
