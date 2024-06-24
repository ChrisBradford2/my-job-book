import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';
import { authMiddleware } from '../../lib/auth';
import bcrypt from 'bcryptjs';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      include: { JobOffer: true }, // Inclure les offres d'emploi associées
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } else if (req.method === 'PUT') {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    if (password && password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    const updatedData: any = { firstName, lastName, email };
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updatedData.password = hashedPassword;
    }

    const updatedUser = await prisma.user.update({
      where: { id: req.user.userId },
      data: updatedData,
    });

    res.status(200).json(updatedUser);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};

export default authMiddleware(handler);
