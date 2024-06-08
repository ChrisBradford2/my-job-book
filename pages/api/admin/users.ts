import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';
import { adminMiddleware } from '../../../lib/auth';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        JobOffer: true,
      },
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

export default adminMiddleware(handler);