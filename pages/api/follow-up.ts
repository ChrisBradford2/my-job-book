import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';
const today = new Date().toISOString().split('T')[0];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const jobOffers = await prisma.jobOffer.findMany({
    where: { followUpDate: today },
    include: { user: true },
  });

  for (const jobOffer of jobOffers) {
    const message = `It's time to follow up on your application for ${jobOffer.title} at ${jobOffer.company}.`;
    await fetch('/api/send-sms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ to: jobOffer.user.phoneNumber, message }),
    });
  }

  res.status(200).json({ message: 'Reminders sent successfully' });
}
