// pages/api/jobOffers/[id].ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';
import { authMiddleware } from '../../../lib/auth';

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
    const jobId = Number(req.query.id);

    if (req.method === 'PUT') {
        const { title, company, link, status, applicationDate, followUpDate } = req.body;
        const userId = req.user.id;  // Assurez-vous que le JWT contient l'userId

        // Vérifier que l'utilisateur actuel est le propriétaire de l'offre
        const existingJobOffer = await prisma.jobOffer.findUnique({
            where: { id: jobId }
        });

        if (!existingJobOffer || existingJobOffer.userId !== userId) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        const jobOffer = await prisma.jobOffer.update({
            where: { id: jobId },
            data: {
                title,
                company,
                link,
                status,
                applicationDate: new Date(applicationDate),
                followUpDate: followUpDate ? new Date(followUpDate) : null,
            }
        });
        return res.json(jobOffer);
    } else if (req.method === 'DELETE') {
        const userId = req.user.id;  // Assurez-vous que le JWT contient l'userId

        const existingJobOffer = await prisma.jobOffer.findUnique({
            where: { id: jobId }
        });

        if (!existingJobOffer || existingJobOffer.userId !== userId) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        await prisma.jobOffer.delete({
            where: { id: jobId }
        });
        return res.status(204).send("Job offer deleted");
    } else {
        res.setHeader('Allow', ['PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

export default authMiddleware(handle);
