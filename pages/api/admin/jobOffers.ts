import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';
import { adminMiddleware } from '../../../lib/auth';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const jobOffers = await prisma.jobOffer.findMany({
      include: { user: true },
    });
    res.status(200).json(jobOffers);
  } catch (error) {
    res.status(500).json({ message: "An error occurred while fetching job offers." });
  }
};

export default adminMiddleware(handler);
