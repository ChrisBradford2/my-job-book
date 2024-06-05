import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';
import { authMiddleware } from '../../../lib/auth';

async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { userId } = req.user;
    const jobOffers = await prisma.jobOffer.findMany({
      where: {
        userId
      }
    });
    res.json(jobOffers);
  } else if (req.method === 'POST') {
    const { title, company, link, status } = req.body;
    const { userId } = req.user;

    const jobOffer = await prisma.jobOffer.create({
      data: {
        title,
        company,
        link,
        status: status || 'Ready to send',
        userId
      }
    });
    res.status(201).json(jobOffer);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default authMiddleware(handle);
