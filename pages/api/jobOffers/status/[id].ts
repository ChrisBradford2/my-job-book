// pages/api/jobOffers/status/[id].ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../lib/prisma';
import { authMiddleware } from '../../../../lib/auth';

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  const jobId = Number(req.query.id);
  const userId = req.user.userId; // Assurez-vous que le JWT contient l'userId

  if (req.method === 'PUT') {
    const { status, applicationDate, followUpDate, interviewDate } = req.body;

    const existingJobOffer = await prisma.jobOffer.findUnique({
      where: { id: jobId },
    });

    if (!existingJobOffer || existingJobOffer.userId !== userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const updatedData: any = { status };

    if (applicationDate) {
      updatedData.applicationDate = new Date(applicationDate);
    }

    if (followUpDate) {
      updatedData.followUpDate = new Date(followUpDate);
    }

    if (interviewDate) {
      updatedData.interviewDate = new Date(interviewDate);
    }

    const jobOffer = await prisma.jobOffer.update({
      where: { id: jobId },
      data: updatedData,
    });
    return res.json(jobOffer);
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default authMiddleware(handle);
