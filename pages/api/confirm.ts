// pages/api/confirm.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';

export default async function confirm(req: NextApiRequest, res: NextApiResponse) {
  const { token } = req.query;

  if (!token || typeof token !== 'string') {
    return res.status(400).json({ message: "Invalid token" });
  }

  const user = await prisma.user.findFirst({ where: { confirmationToken: token } });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      isConfirmed: true,
      confirmationToken: null,
    },
  });

  res.writeHead(302, { Location: '/confirmation-success' });
  res.end();
}
