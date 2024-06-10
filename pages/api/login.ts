import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';
import { prisma } from '../../lib/prisma';
import i18n from '../../i18n';

const JWT_SECRET = process.env.JWT_SECRET || 'testtest';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  await i18n.changeLanguage(req.headers['accept-language'] || 'en');
  const { t } = i18n;

  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: t('invalid_credentials') });
  }

  if (!user.isConfirmed) {
    return res.status(403).json({ message: t('account_not_confirmed') });
  }

  const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '2h' });

  res.setHeader('Set-Cookie', serialize('auth', token, {
    path: '/',
    httpOnly: false,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production' || false,
    maxAge: 3600,
  }));

  res.status(200).json({ message: t('login_success') });
}
